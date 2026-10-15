/* Quiz lead magnet dùng chung — Trường Việt Anh.
   Cấu hình đọc từ <script type="application/json" id="lm-config"> (xem src/pages/quiz-*.astro).
   Lead gửi về /api/lead giống mọi squeeze page: email · parent_name · phone · form_id ·
   funnel_code · school_level · utm_* (qua window.__vaUTM, nạp từ /js/va-utm.js).

   CHỦ ĐÍCH KHÔNG gửi quiz_score / quiz_level: worker coi mọi lead có quiz_score > 0 là
   "quiz trại hè" (thang 0–100, nhãn Tốt/Trung bình/Cần can thiệp). Điểm 0–12 của các quiz này
   sẽ bị gắn nhãn sai. Kết quả quiz đi trong `note` (GHL Note + Pancake ghi_chu) và `tags`. */
(function () {
  'use strict';
  var C = JSON.parse(document.getElementById('lm-config').textContent);
  var root = document.getElementById('lm-root');
  var pb = document.getElementById('lm-pb');
  var N = C.questions.length;
  var step = 0, ans = {}, res = null, sending = false;
  var UTM = (window.__vaUTM ? window.__vaUTM() : {});

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function fill(s, o) { return s.replace(/\{(\w+)\}/g, function (m, k) { return o[k] !== undefined ? o[k] : m; }); }
  function view(h) { root.innerHTML = h; window.scrollTo(0, 0); }
  function gtm(evt, extra) {
    try {
      (window.dataLayer = window.dataLayer || []).push(Object.assign(
        { event: evt, form_id: C.formId, funnel_code: C.funnel, school_level: levelFor() }, UTM, extra || {}));
    } catch (e) {}
  }
  function qById(id) { return C.questions.filter(function (q) { return q.id === id; })[0]; }
  function optLabel(id) {
    var q = qById(id), v = ans[id];
    if (!q || !q.o) return '';
    var o = q.o.filter(function (x) { return x[0] === v; })[0];
    return o ? o[1] : '';
  }
  function levelFor() {
    return (C.levelByYob && ans.yob && C.levelByYob[ans.yob]) || C.level || '';
  }

  function start() {
    step = 0; ans = {}; res = null; pb.style.width = '0';
    view('<span class="tag">' + esc(C.introTag) + '</span><h1>' + esc(C.introTitle) + '</h1><p>' + C.introText +
      '</p><div class="card">' + C.introCard + '</div>' +
      '<button class="btn" type="button" id="lm-go">Bắt đầu</button>' +
      '<p class="note">Kết quả chỉ mang tính tham khảo cho gia đình, không phải đánh giá chuyên môn.</p>');
    document.getElementById('lm-go').addEventListener('click', function () { gtm('quiz_start'); render(); });
  }

  function render() {
    var q = C.questions[step];
    pb.style.width = (step / N * 100) + '%';
    var h = '<h2>' + esc(q.t) + '</h2><p class="hint">' + esc(q.h || ('Câu ' + (step + 1) + '/' + N)) + '</p>';
    if (q.multi) {
      var cur = ans[q.id] || [];
      q.multi.forEach(function (s, i) {
        h += '<button class="opt multi' + (cur.indexOf(i) > -1 ? ' sel' : '') + '" type="button" data-i="' + i + '" aria-pressed="' + (cur.indexOf(i) > -1) + '">' + esc(s[0]) + '</button>';
      });
      h += '<button class="btn" type="button" id="lm-next">' + (step === N - 1 ? 'Xem kết quả' : 'Tiếp tục') + '</button>';
    } else {
      q.o.forEach(function (o) {
        h += '<button class="opt' + (ans[q.id] === o[0] ? ' sel' : '') + '" type="button" data-v="' + esc(o[0]) + '">' + esc(o[1]) + '</button>';
      });
    }
    if (step > 0) h += '<button class="back" type="button" id="lm-back">← Quay lại</button>';
    view(h);
    Array.prototype.forEach.call(root.querySelectorAll('.opt'), function (b) {
      b.addEventListener('click', function () {
        if (q.multi) toggle(+b.getAttribute('data-i')); else pick(b.getAttribute('data-v'));
      });
    });
    var nx = document.getElementById('lm-next'); if (nx) nx.addEventListener('click', next);
    var bk = document.getElementById('lm-back'); if (bk) bk.addEventListener('click', function () { step = Math.max(0, step - 1); render(); });
  }

  function pick(v) {
    var q = C.questions[step]; ans[q.id] = v;
    if (q.redirect && q.redirect[v]) return redirect(q.redirect[v]);
    next();
  }
  function toggle(i) {
    var id = C.questions[step].id, a = ans[id] || [];
    ans[id] = a.indexOf(i) > -1 ? a.filter(function (x) { return x !== i; }) : a.concat(i);
    render();
  }
  function next() { if (step < N - 1) { step++; render(); } else result(); }

  function redirect(r) {
    pb.style.width = '0';
    view('<h2>' + esc(r.t) + '</h2><p>' + esc(r.d) + '</p>' +
      (r.href ? '<a class="btn gold" href="' + esc(r.href) + '">' + esc(r.cta || 'Xem tài liệu phù hợp') + '</a>' : '') +
      '<button class="back" type="button" id="lm-again">Làm lại</button>');
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
    pb.style.width = '100%';
    var g = C.groups[weak].toLowerCase();
    var bars = C.groups.map(function (n, i) {
      return '<div class="bar' + (i === weak ? ' weak' : '') + '"><em>' + esc(n) + '</em><div><i style="width:' + (cnt[i] / sizes[i] * 100) + '%"></i></div><span>' + cnt[i] + '/' + sizes[i] + '</span></div>';
    }).join('');
    view('<span class="tag">' + esc(br.tag) + '</span>' +
      '<div class="score"><b>' + total + '</b><span>/ ' + max + ' ' + esc(C.scoreLabel) + '</span></div>' +
      '<div class="bars">' + bars + '</div>' +
      '<p>' + fill(br.desc, { g: '<b>' + esc(g) + '</b>' }) + '</p>' +
      '<div class="card gold"><b>Bước tiếp theo:</b> ' + fill(C.nextStep, { g: '<b>' + esc(g) + '</b>' }) + '</div>' +
      '<div class="card"><b>Nhận bản đầy đủ miễn phí:</b> ' + C.rewardText + '</div>' +
      '<button class="btn gold" type="button" id="lm-form">Nhận bản đầy đủ</button>' +
      '<p class="note">Kết quả chỉ mang tính tham khảo, không phải đánh giá chuyên môn.</p>');
    document.getElementById('lm-form').addEventListener('click', form);
    gtm('quiz_result', { quiz_branch: br.key, quiz_tier: tier });
  }

  function okEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
  function okPhone(v) { v = String(v).replace(/[\s\-\.\(\)]/g, '').replace(/^\+?84/, '0'); return /^0[35789][0-9]{8}$/.test(v); }

  function form() {
    view('<h2>Gửi bản đầy đủ cho bạn</h2><p class="hint">Chỉ 3 thông tin. Tài liệu hiện ngay sau khi gửi.</p>' +
      '<label for="lm-n">Tên phụ huynh</label><input type="text" id="lm-n" autocomplete="name" placeholder="Nguyễn Văn A">' +
      '<label for="lm-p">Số điện thoại</label><input type="tel" id="lm-p" autocomplete="tel" inputmode="tel" placeholder="09xx xxx xxx">' +
      '<label for="lm-e">Email</label><input type="email" id="lm-e" autocomplete="email" placeholder="ten@email.com">' +
      '<div class="err-msg" id="lm-er" role="alert"></div>' +
      '<label class="consent" for="lm-c"><input type="checkbox" id="lm-c"><span>Tôi đồng ý để Trường Việt Anh dùng thông tin này để gửi tài liệu và liên hệ tư vấn về việc học của con. Tôi có thể dừng nhận thông tin bất cứ lúc nào. <a href="/chinh-sach-bao-mat" target="_blank" rel="noopener">Chính sách bảo mật</a></span></label>' +
      '<button class="btn" type="button" id="lm-send">Nhận tài liệu</button>');
    document.getElementById('lm-send').addEventListener('click', submit);
    gtm('lead_form_view');
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
    var er = document.getElementById('lm-er'), m = '';
    ['lm-n', 'lm-p', 'lm-e'].forEach(function (id) { document.getElementById(id).classList.remove('err'); });
    if (n.length < 2) { m = 'Vui lòng nhập tên.'; document.getElementById('lm-n').classList.add('err'); }
    else if (!okPhone(p)) { m = 'Số điện thoại chưa đúng (ví dụ 0912345678).'; document.getElementById('lm-p').classList.add('err'); }
    else if (!okEmail(e)) { m = 'Email chưa đúng.'; document.getElementById('lm-e').classList.add('err'); }
    else if (!document.getElementById('lm-c').checked) { m = 'Vui lòng đồng ý để nhận tài liệu.'; }
    if (m) { er.textContent = m; er.classList.add('on'); return; }
    er.classList.remove('on');

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
        thanks(n);
      })
      .catch(function () {
        sending = false; btn.disabled = false; btn.textContent = 'Nhận tài liệu';
        er.textContent = 'Chưa gửi được. Bạn thử lại sau ít phút hoặc gọi hotline ' + C.hotline + '.';
        er.classList.add('on');
      });
  }

  function thanks(name) {
    view('<span class="tag">Đã gửi</span><h2>Cảm ơn ' + esc(name) + '!</h2><p>Tài liệu của bạn đã sẵn sàng.</p>' +
      '<a class="btn gold" href="' + esc(C.pdf) + '" target="_blank" rel="noopener">Mở tài liệu (PDF)</a>' +
      '<div class="card">' + C.ctaText + '<br><br><b>Cơ sở:</b> ' + esc(C.address) + '<br><b>Giờ tham quan:</b> ' + esc(C.hours) +
      '<br><b>Hotline:</b> ' + esc(C.hotline) + '</div>' +
      '<a class="btn" href="/dat-lich-tham-quan">Đặt lịch tham quan</a>');
  }

  start();
})();
