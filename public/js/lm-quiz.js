/* Quiz lead magnet dùng chung — Trường Việt Anh.
   Cấu hình đọc từ <script type="application/json" id="lm-config"> (xem src/pages/quiz-*.astro).
   Lead gửi về /api/lead giống mọi squeeze page: email · parent_name · phone · form_id ·
   funnel_code · school_level · utm_* (qua window.__vaUTM, nạp từ /js/va-utm.js).

   CHỦ ĐÍCH KHÔNG gửi quiz_score / quiz_level: worker coi mọi lead có quiz_score > 0 là
   "quiz trại hè" (thang 0–100, nhãn Tốt/Trung bình/Cần can thiệp). Điểm 0–12 của các quiz này
   sẽ bị gắn nhãn sai. Kết quả quiz đi trong `note` (GHL Note + Pancake ghi_chu) và `tags`.

   DOM cần có: #lm-wrap[data-phase] · #lm-root · #lm-pb (thanh tiến độ) · #lm-back · #lm-step. */
(function () {
  'use strict';
  var C = JSON.parse(document.getElementById('lm-config').textContent);
  var wrap = document.getElementById('lm-wrap');
  var root = document.getElementById('lm-root');
  var pb = document.getElementById('lm-pb');
  var backBtn = document.getElementById('lm-back');
  var stepLbl = document.getElementById('lm-step');
  var N = C.questions.length;
  var step = 0, ans = {}, res = null, sending = false, locked = false, phase = 'intro';
  var UTM = (window.__vaUTM ? window.__vaUTM() : {});
  var LETTERS = 'ABCDEFGHIJ';

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function fill(s, o) { return s.replace(/\{(\w+)\}/g, function (m, k) { return o[k] !== undefined ? o[k] : m; }); }
  function qById(id) { return C.questions.filter(function (q) { return q.id === id; })[0]; }
  function optLabel(id) {
    var q = qById(id), v = ans[id];
    if (!q || !q.o) return '';
    var o = q.o.filter(function (x) { return x[0] === v; })[0];
    return o ? o[1] : '';
  }
  function levelFor() { return (C.levelByYob && ans.yob && C.levelByYob[ans.yob]) || C.level || ''; }
  function gtm(evt, extra) {
    try {
      (window.dataLayer = window.dataLayer || []).push(Object.assign(
        { event: evt, form_id: C.formId, funnel_code: C.funnel, school_level: levelFor() }, UTM, extra || {}));
    } catch (e) {}
  }

  /* ---- hiển thị: đổi màn, đưa focus + cuộn đúng chỗ (không giật trên mobile) ---- */
  function show(html, ph, focusSel) {
    phase = ph; wrap.setAttribute('data-phase', ph);
    root.innerHTML = html;
    root.classList.remove('lm-body'); void root.offsetWidth; root.classList.add('lm-body');
    var card = root.closest('.lm-card');
    if (card && card.getBoundingClientRect().top < 56) {
      var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: card.getBoundingClientRect().top + window.pageYOffset - 64, behavior: reduce ? 'auto' : 'smooth' });
    }
    var f = focusSel && root.querySelector(focusSel);
    try { (f || root).focus({ preventScroll: true }); } catch (e) {}
  }

  function start() {
    step = 0; ans = {}; res = null; locked = false;
    pb.style.width = '0'; backBtn.hidden = true; stepLbl.textContent = '';
    show('<h2>Sẵn sàng bắt đầu?</h2>' +
      '<p>' + C.introText + '</p><div class="card">' + C.introCard + '</div>' +
      '<div class="acts"><button class="btn gold" type="button" id="lm-go">Bắt đầu (mất 2 phút)</button></div>' +
      '<p class="note">Kết quả chỉ mang tính tham khảo cho gia đình, không phải đánh giá chuyên môn.</p>', 'intro');
    document.getElementById('lm-go').addEventListener('click', function () { gtm('quiz_start'); render(); });
  }

  function render() {
    var q = C.questions[step];
    locked = false;
    pb.style.width = ((step) / N * 100) + '%';
    stepLbl.textContent = 'Câu ' + (step + 1) + '/' + N;
    backBtn.hidden = step === 0;
    var h = '<h2 tabindex="-1" id="lm-h">' + esc(q.t) + '</h2><p class="hint">' + esc(q.h || 'Chọn một đáp án') + '</p><div class="opts" role="' + (q.multi ? 'group' : 'radiogroup') + '" aria-labelledby="lm-h">';
    if (q.multi) {
      var cur = ans[q.id] || [];
      q.multi.forEach(function (s, i) {
        var on = cur.indexOf(i) > -1;
        h += '<button class="opt multi' + (on ? ' sel' : '') + '" type="button" data-i="' + i + '" role="checkbox" aria-checked="' + on + '"><span class="k" aria-hidden="true">' + (i + 1) + '</span><span>' + esc(s[0]) + '</span></button>';
      });
      h += '</div><div class="acts-sticky"><span class="cnt" id="lm-cnt">' + countText(q) + '</span><button class="btn" type="button" id="lm-next">' + (step === N - 1 ? 'Xem kết quả' : 'Tiếp tục') + '</button></div>';
    } else {
      q.o.forEach(function (o, i) {
        h += '<button class="opt' + (ans[q.id] === o[0] ? ' sel' : '') + '" type="button" data-v="' + esc(o[0]) + '" role="radio" aria-checked="' + (ans[q.id] === o[0]) + '"><span class="k" aria-hidden="true">' + LETTERS.charAt(i) + '</span><span>' + esc(o[1]) + '</span></button>';
      });
      h += '</div>';
    }
    show(h, 'quiz', '#lm-h');
    Array.prototype.forEach.call(root.querySelectorAll('.opt'), function (b) {
      b.addEventListener('click', function () {
        if (q.multi) toggle(+b.getAttribute('data-i'), b); else choose(b);
      });
    });
    var nx = document.getElementById('lm-next'); if (nx) nx.addEventListener('click', next);
  }

  function countText(q) {
    var n = (ans[q.id] || []).length;
    return n ? 'Đã chọn ' + n + ' / ' + q.multi.length : 'Có thể bỏ qua nếu chưa thấy điều nào';
  }
  function choose(btn) {
    if (locked) return; locked = true;
    var q = C.questions[step]; ans[q.id] = btn.getAttribute('data-v');
    Array.prototype.forEach.call(root.querySelectorAll('.opt'), function (b) { b.classList.toggle('sel', b === btn); b.setAttribute('aria-checked', b === btn); });
    setTimeout(function () {
      if (q.redirect && q.redirect[ans[q.id]]) return redirect(q.redirect[ans[q.id]]);
      next();
    }, 220);
  }
  function toggle(i, btn) {
    var q = C.questions[step], a = ans[q.id] || [];
    ans[q.id] = a.indexOf(i) > -1 ? a.filter(function (x) { return x !== i; }) : a.concat(i);
    var on = ans[q.id].indexOf(i) > -1;
    btn.classList.toggle('sel', on); btn.setAttribute('aria-checked', on);
    document.getElementById('lm-cnt').textContent = countText(q);
  }
  function next() { if (step < N - 1) { step++; render(); } else result(); }
  function back() { if (phase === 'quiz' && step > 0) { step--; render(); } }
  backBtn.addEventListener('click', back);

  /* phím tắt: 1–9 chọn đáp án, Enter = tiếp tục, ← quay lại */
  document.addEventListener('keydown', function (e) {
    if (phase !== 'quiz' || e.ctrlKey || e.metaKey || e.altKey) return;
    var t = e.target && e.target.tagName;
    if (t === 'INPUT' || t === 'TEXTAREA') return;
    var n = parseInt(e.key, 10);
    if (n >= 1 && n <= 9) {
      var b = root.querySelectorAll('.opt')[n - 1];
      if (b) { e.preventDefault(); b.click(); }
    } else if (e.key === 'Enter') {
      var nx = document.getElementById('lm-next');
      if (nx && document.activeElement !== nx) { e.preventDefault(); nx.click(); }
    } else if (e.key === 'ArrowLeft') { back(); }
  });

  function redirect(r) {
    pb.style.width = '0'; backBtn.hidden = true; stepLbl.textContent = '';
    show('<h2 tabindex="-1" id="lm-h">' + esc(r.t) + '</h2><p>' + esc(r.d) + '</p><div class="acts">' +
      (r.href ? '<a class="btn gold" href="' + esc(r.href) + '">' + esc(r.cta || 'Xem tài liệu phù hợp') + '</a>' : '') +
      '<button class="btn ghost" type="button" id="lm-again">Làm lại từ đầu</button></div>', 'intro', '#lm-h');
    document.getElementById('lm-again').addEventListener('click', start);
  }

  function result() {
    var sizes = C.groups.map(function () { return 0; }), cnt = C.groups.map(function () { return 0; });
    C.questions.forEach(function (q) {
      if (!q.multi) return;
      q.multi.forEach(function (s) { sizes[s[1]]++; });
      (ans[q.id] || []).forEach(function (i) { cnt[q.multi[i][1]]++; });
    });
    var total = cnt.reduce(function (a, b) { return a + b; }, 0);
    var max = sizes.reduce(function (a, b) { return a + b; }, 0);
    var ratio = cnt.map(function (c, i) { return c / sizes[i]; });
    var mn = Math.min.apply(null, ratio), weak = ratio.indexOf(mn);
    var pref = C.worryPref && C.worryPref[ans.worry];
    if (pref !== undefined && ratio[pref] === mn) weak = pref;
    var br = C.branches.filter(function (b) { return total >= b.min; })[0];
    var tier = (C.tier && C.tier[ans.when]) || 'lạnh';
    res = { total: total, max: max, cnt: cnt, sizes: sizes, weak: weak, br: br, tier: tier };
    pb.style.width = '100%'; backBtn.hidden = true; stepLbl.textContent = 'Hoàn thành';
    var g = C.groups[weak].toLowerCase();
    var bars = C.groups.map(function (n, i) {
      return '<div class="bar' + (i === weak ? ' weak' : '') + '"><em>' + esc(n) + '</em><div><i style="width:' + (cnt[i] / sizes[i] * 100) + '%"></i></div><span>' + cnt[i] + '/' + sizes[i] + '</span></div>';
    }).join('');
    show('<div class="res-top"><div class="ring" style="--p:' + Math.round(total / max * 100) + '" role="img" aria-label="' + total + ' trên ' + max + '"><b>' + total + '<small>/ ' + max + '</small></b></div>' +
      '<div><span class="tag">' + esc(br.tag) + '</span><h2 tabindex="-1" id="lm-h">Kết quả của bạn</h2><p class="hint" style="margin:0">' + total + '/' + max + ' ' + esc(C.scoreLabel) + '</p></div></div>' +
      '<div class="bars">' + bars + '</div>' +
      '<p>' + fill(br.desc, { g: '<b>' + esc(g) + '</b>' }) + '</p>' +
      '<div class="card gold"><b>Bước tiếp theo:</b> ' + fill(C.nextStep, { g: '<b>' + esc(g) + '</b>' }) + '</div>' +
      giftRow() +
      '<div class="acts-sticky"><button class="btn gold" type="button" id="lm-form">Nhận bản đầy đủ miễn phí</button></div>' +
      '<p class="note">Kết quả chỉ mang tính tham khảo, không phải đánh giá chuyên môn.</p>', 'result', '#lm-h');
    document.getElementById('lm-form').addEventListener('click', form);
    gtm('quiz_result', { quiz_branch: br.key, quiz_tier: tier });
  }

  function giftRow() {
    return '<div class="giftrow">' + (C.cover ? '<img src="' + esc(C.cover) + '" alt="" width="58" height="82" loading="lazy">' : '') +
      '<div><b>' + esc(C.name) + '</b><span>' + C.rewardText.charAt(0).toUpperCase() + C.rewardText.slice(1) + '</span></div></div>';
  }

  function okEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
  function okPhone(v) { v = String(v).replace(/[\s\-\.\(\)]/g, '').replace(/^\+?84/, '0'); return /^0[35789][0-9]{8}$/.test(v); }

  function form() {
    backBtn.hidden = true; stepLbl.textContent = '';
    show('<h2 tabindex="-1" id="lm-h">Gửi bản đầy đủ cho bạn</h2><p class="hint">Chỉ 3 thông tin. Tài liệu sẽ được gửi vào email của bạn.</p>' + giftRow() +
      '<div class="fld"><label for="lm-n">Tên phụ huynh</label><input type="text" id="lm-n" autocomplete="name" enterkeyhint="next" placeholder="Nguyễn Văn A"><div class="err-msg" id="lm-n-e"></div></div>' +
      '<div class="fld"><label for="lm-p">Số điện thoại</label><input type="tel" id="lm-p" autocomplete="tel" inputmode="tel" enterkeyhint="next" placeholder="09xx xxx xxx"><div class="err-msg" id="lm-p-e"></div></div>' +
      '<div class="fld"><label for="lm-e">Email</label><input type="email" id="lm-e" autocomplete="email" enterkeyhint="send" placeholder="ten@email.com"><div class="err-msg" id="lm-e-e"></div></div>' +
      '<label class="consent" for="lm-c"><input type="checkbox" id="lm-c"><span>Tôi đồng ý để Trường Việt Anh dùng thông tin này để gửi tài liệu và liên hệ tư vấn về việc học của con. Tôi có thể dừng nhận thông tin bất cứ lúc nào. <a href="/chinh-sach-bao-mat" target="_blank" rel="noopener">Chính sách bảo mật</a></span></label>' +
      '<div class="err-msg" id="lm-c-e"></div>' +
      '<div class="acts-sticky"><button class="btn gold" type="button" id="lm-send">Nhận tài liệu</button></div>' +
      '<div class="safe">Thông tin chỉ dùng để gửi tài liệu và tư vấn, không chia sẻ cho bên thứ ba.</div>', 'form', '#lm-h');
    document.getElementById('lm-send').addEventListener('click', submit);
    Array.prototype.forEach.call(root.querySelectorAll('input[type=text],input[type=tel],input[type=email]'), function (i) {
      i.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); submit(); } });
      i.addEventListener('input', function () { fieldErr(i.id, ''); });
    });
    gtm('lead_form_view');
  }

  function fieldErr(id, msg) {
    var i = document.getElementById(id), e = document.getElementById(id + '-e');
    if (i && i.tagName === 'INPUT' && i.type !== 'checkbox') { i.classList.toggle('err', !!msg); i.setAttribute('aria-invalid', !!msg); }
    if (e) { e.textContent = msg; e.classList.toggle('on', !!msg); }
  }

  function noteText() {
    var g = C.groups[res.weak];
    var parts = [
      'Quiz "' + C.name + '": ' + res.total + '/' + res.max + ' ' + C.scoreLabel + ' (' + res.br.tag + ')',
      'Nhóm cần chú ý: ' + g,
    ];
    var chi = res.cnt.map(function (c, i) { return C.groups[i] + ' ' + c + '/' + res.sizes[i]; }).join(', ');
    parts.push('Chi tiết: ' + chi);
    ['yob', 'worry', 'when', 'prio'].forEach(function (id) {
      var l = optLabel(id), q = qById(id);
      if (l && q) parts.push(q.t.replace(/\?$/, '') + ': ' + l);
    });
    parts.push('Tầng lead theo mốc nhập học: ' + res.tier);
    return parts.join(' | ');
  }

  function submit() {
    if (sending) return;
    var n = document.getElementById('lm-n').value.trim();
    var p = document.getElementById('lm-p').value.trim();
    var e = document.getElementById('lm-e').value.trim();
    var bad = null;
    ['lm-n', 'lm-p', 'lm-e', 'lm-c'].forEach(function (id) { fieldErr(id, ''); });
    if (n.length < 2) { fieldErr('lm-n', 'Vui lòng nhập tên.'); bad = bad || 'lm-n'; }
    if (!okPhone(p)) { fieldErr('lm-p', 'Số điện thoại chưa đúng (ví dụ 0912345678).'); bad = bad || 'lm-p'; }
    if (!okEmail(e)) { fieldErr('lm-e', 'Email chưa đúng.'); bad = bad || 'lm-e'; }
    if (!document.getElementById('lm-c').checked) { fieldErr('lm-c', 'Vui lòng đồng ý để nhận tài liệu.'); bad = bad || 'lm-c'; }
    if (bad) { document.getElementById(bad).focus(); return; }

    var tags = (C.tags || []).concat(['tier-' + ({ 'nóng': 'nong', 'ấm': 'am', 'lạnh': 'lanh' }[res.tier] || 'lanh')]);
    var body = Object.assign({
      email: e, parent_name: n, phone: p,
      form_id: C.formId, funnel_code: C.funnel, school_level: levelFor(),
      note: noteText(), tags: tags,
    }, C.grade ? { grade: C.grade } : {}, UTM);

    var btn = document.getElementById('lm-send');
    sending = true; btn.disabled = true; btn.textContent = 'Đang gửi...';
    fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      .then(function (r) {
        if (!r.ok) throw new Error('http ' + r.status);
        gtm('lead_submitted', { quiz_branch: res.br.key, quiz_tier: res.tier });
        try { localStorage.setItem('va_form_submitted', '1'); } catch (x) {}
        thanks(n, e);
      })
      .catch(function () {
        sending = false; btn.disabled = false; btn.textContent = 'Nhận tài liệu';
        fieldErr('lm-c', 'Chưa gửi được. Bạn thử lại sau ít phút hoặc gọi hotline ' + C.hotline + '.');
      });
  }

  function thanks(name, mail) {
    sending = false; pb.style.width = '100%';
    var tel = 'tel:' + String(C.hotline).replace(/[^\d+]/g, '');
    show('<div class="done-ic" aria-hidden="true"></div><h2 tabindex="-1" id="lm-h">Cảm ơn ' + esc(name) + '!</h2><p>Chúng tôi đã gửi tài liệu tới email <b>' + esc(mail) + '</b>. Bạn nhớ kiểm tra hộp thư đến và cả thư rác nhé.</p>' +
      giftRow() +
      '<div class="acts"><a class="btn gold" href="/dat-lich-tham-quan">Đặt lịch tham quan trường</a></div>' +
      '<p class="note">Chưa thấy email sau vài phút? Hãy kiểm tra thư rác hoặc gọi hotline <a href="' + tel + '">' + esc(C.hotline) + '</a> để được hỗ trợ.</p>' +
      '<div class="card" style="margin-top:16px"><p style="margin:0 0 8px">' + C.ctaText + '</p><div class="info">' +
      '<div><b>Cơ sở</b><span>' + esc(C.address) + '</span></div>' +
      '<div><b>Giờ tham quan</b><span>' + esc(C.hours) + '</span></div>' +
      '<div><b>Hotline</b><a href="' + tel + '">' + esc(C.hotline) + '</a></div>' +
      '<div><b>Fanpage</b><a href="https://www.facebook.com/truongvietanhhcm" target="_blank" rel="noopener">facebook.com/truongvietanhhcm</a></div></div></div>', 'done', '#lm-h');
  }

  start();
})();
