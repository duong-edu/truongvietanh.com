#!/usr/bin/env node
/**
 * Tạo post MỚI "7 câu hỏi nên hỏi trước khi chọn trường cấp 3 thời đại AI" rồi đăng.
 *
 *   node scripts/dang-bai-7-cau-hoi-cap-3.mjs          # chạy khô: kiểm + xuất HTML xem trước
 *   node scripts/dang-bai-7-cau-hoi-cap-3.mjs --that   # tạo post published trong Directus
 *
 * Bản thảo: docs/ban-thao-blog/7-cau-hoi-chon-truong-cap-3-thoi-dai-ai.md
 * Đây là bài RIÊNG, không thay bài #1428 (7-cau-hoi-truoc-khi-chon-truong-cap-3-thoi-dai-ai) —
 * Văn xác nhận 17/10/2026.
 *
 * Khác dang-3-bai-chinh-sach.mjs ở chỗ bài có nhúng video YouTube: dòng bắt đầu bằng "<"
 * được giữ nguyên là HTML, và link tương đối (/chinh-sach-ai/) cũng được chuyển thành <a>.
 *
 * CHỐT CHẶN — lỗi là dừng, không ghi gì:
 *   · slug đã có trong CMS · excerpt ngoài 140–160 · còn H1 · thiếu iframe video
 *   · mục FAQ không phải h2 + các h3 · còn Manchester / [CẦN… / JSON-LD / link Google Doc
 *   · published_at luôn là lúc chạy, không bao giờ ở tương lai
 *
 * SAU KHI CHẠY --that vẫn phải push lên main để build lại site (ảnh hero
 * public/images/blog/7-cau-hoi-chon-truong-cap-3-thoi-dai-ai.webp đi cùng lần push đó).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const GOC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const D = 'http://45.88.188.169:8055';
const THAT = process.argv.includes('--that');
const tok = (fs.readFileSync(path.join(GOC, '.env'), 'utf8')
  .match(/DIRECTUS[_A-Z]*TOKEN\s*=\s*(.+)/) || [])[1]?.trim();
const H = { Authorization: 'Bearer ' + tok, 'Content-Type': 'application/json' };

const FILE = 'docs/ban-thao-blog/7-cau-hoi-chon-truong-cap-3-thoi-dai-ai.md';
const ANH = 'https://truongvietanh.com/images/blog/7-cau-hoi-chon-truong-cap-3-thoi-dai-ai.webp';
const VIDEO_ID = 'U-3dzwoRUMs';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function md2html(md) {
  const dong = md.split(/\r?\n/);
  const ra = [];
  let ds = null, bang = false;
  const inline = (s) => esc(s)
    .replace(/\[([^\]]+)\]\(((?:https?:\/\/|\/)[^)\s]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');
  const xaDs = () => { if (ds) { ra.push(`</${ds}>`); ds = null; } };
  const xaBang = () => { if (bang) { ra.push('</tbody></table></div>'); bang = false; } };

  for (let i = 0; i < dong.length; i++) {
    const t = dong[i].trim();
    if (!t) { xaDs(); xaBang(); continue; }

    if (t.startsWith('<')) { xaDs(); xaBang(); ra.push(t); continue; }   // HTML thô (video)

    if (t.startsWith('|')) {
      if (/^\|[\s:|-]+\|$/.test(t)) continue;
      const o = t.replace(/^\||\|$/g, '').split('|').map((x) => x.trim());
      if (!bang) {
        ra.push('<div class="blog-table-wrap"><table><thead><tr>' + o.map((x) => `<th>${inline(x)}</th>`).join('') + '</tr></thead><tbody>');
        bang = true;
      } else {
        ra.push('<tr>' + o.map((x) => `<td>${inline(x)}</td>`).join('') + '</tr>');
      }
      continue;
    }
    xaBang();

    const h = /^(#{1,6})\s+(.*)$/.exec(t);
    if (h) { xaDs(); ra.push(`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`); continue; }

    const ol = /^\d+[.)]\s+(.*)$/.exec(t);
    if (ol) { if (ds !== 'ol') { xaDs(); ra.push('<ol>'); ds = 'ol'; } ra.push(`<li>${inline(ol[1])}</li>`); continue; }
    const ul = /^[-*+]\s+(.*)$/.exec(t);
    if (ul) { if (ds !== 'ul') { xaDs(); ra.push('<ul>'); ds = 'ul'; } ra.push(`<li>${inline(ul[1])}</li>`); continue; }
    xaDs();

    const gom = [t];
    while (i + 1 < dong.length) {
      const k = dong[i + 1].trim();
      if (!k || /^(#{1,6}\s|<|\||[-*+]\s|\d+[.)]\s)/.test(k)) break;
      gom.push(k); i++;
    }
    ra.push(`<p>${inline(gom.join(' '))}</p>`);
  }
  xaDs(); xaBang();
  return ra.join('\n');
}

// ── Tách bản thảo ───────────────────────────────────────────────────────────
const md = fs.readFileSync(path.join(GOC, FILE), 'utf8');
const title = (/\*\*Title[^\n]*?:\*\*[ \t]*(.+)/.exec(md) || [])[1]?.trim();
const slug = (/\*\*Slug:\*\*[ \t]*`?([a-z0-9-]+)`?/.exec(md) || [])[1];
const excerpt = (/\*\*Meta description[^\n]*?:\*\*[ \t]*\r?\n?[ \t]*(.+)/.exec(md) || [])[1]?.trim();
const than0 = md.split(/^## BÀI VIẾT\s*$/m)[1]?.split(/^## HẾT BÀI\s*$/m)[0];

const loi = [];
if (!title || !slug || !excerpt || !than0) loi.push(`thiếu META/thân bài (title=${!!title} slug=${!!slug} excerpt=${!!excerpt} than=${!!than0})`);
const mH1 = than0 && /^#\s+(.+)$/m.exec(than0);
if (!mH1) loi.push('không thấy H1 đầu thân bài');
const than = (than0 || '').replace(mH1?.[0] ?? '', '').trim();
if (/^#\s+/m.test(than)) loi.push('còn H1 sau khi bỏ');
const html = md2html(than);
const chu = `${title}\n${excerpt}\n${html}`;

if (excerpt && (excerpt.length < 140 || excerpt.length > 160)) loi.push(`excerpt ${excerpt.length} ký tự, ngoài 140–160`);
if (!html.includes(`youtube.com/embed/${VIDEO_ID}`)) loi.push('thiếu iframe video');
if (/Manchester/i.test(chu)) loi.push('còn chữ Manchester');
if (/\[CẦN|KIỂM CHỨNG\]/.test(chu)) loi.push('còn dấu [CẦN …] nội bộ');
if (/JSON-LD|"@context"/.test(html)) loi.push('còn khối JSON-LD');
if (/docs\.google\.com|drive\.google\.com|about:blank/.test(html)) loi.push('còn link Google Doc/Drive/about:blank');
if (/\]\(\//.test(html)) loi.push('còn link markdown chưa chuyển');

const faqKhoi = (html.split('<h2>Câu hỏi thường gặp</h2>')[1] || '').split('<h2>')[0];
const soH3 = (faqKhoi.match(/<h3>/g) || []).length;
const soP = (faqKhoi.match(/<p>/g) || []).length;
if (soH3 !== 5 || soP !== 5) loi.push(`mục FAQ có ${soH3} h3 / ${soP} p, cần 5/5`);

// ── Chặn trùng slug với TOÀN BỘ post ────────────────────────────────────────
const daCo = new Set();
for (let p = 1; p <= 10; p++) {
  const b = (await (await fetch(`${D}/items/posts?fields=slug&limit=500&page=${p}`, { headers: H })).json()).data;
  if (!b?.length) break;
  b.forEach((x) => daCo.add(x.slug));
}
if (daCo.has(slug)) loi.push(`slug "${slug}" ĐÃ CÓ trong CMS`);

// Link nội bộ phải sống
for (const [, u] of html.matchAll(/href="(\/[^"]*)"/g)) {
  const r = await fetch('https://truongvietanh.com' + u, { redirect: 'follow' }).catch(() => null);
  if (r?.status !== 200) loi.push(`link nội bộ ${u} trả ${r?.status ?? 'lỗi'}`);
}
const rAnh = await fetch(ANH, { method: 'GET' }).catch(() => null);
const anhSong = rAnh?.status === 200;

const tu = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().split(' ').length;
console.log(`\n  ${daCo.size} slug đang có trong CMS`);
console.log(`  title   : ${title} (${title?.length} ký tự)`);
console.log(`  slug    : ${slug}`);
console.log(`  excerpt : ${excerpt?.length} ký tự`);
console.log(`  thân bài: ${tu} từ · FAQ ${soH3} câu · đã bỏ H1 "${mH1?.[1]?.slice(0, 50)}"`);
console.log(`  video   : ${html.includes('youtube.com/embed/' + VIDEO_ID) ? 'có iframe ' + VIDEO_ID : 'THIẾU'}`);
console.log(`  ảnh hero: ${anhSong ? 'đã lên site' : 'CHƯA lên site — sẽ lên cùng lần push build lại'}`);

const xem = path.join(GOC, 'reports/xem-truoc-7-cau-hoi-cap-3.html');
fs.writeFileSync(xem, html);
console.log(`  HTML    : ${path.relative(GOC, xem)}`);

if (loi.length) { console.error('\n  ✘ DỪNG:\n    · ' + loi.join('\n    · ') + '\n'); process.exit(1); }
if (!THAT) { console.log('\n  ✔ Qua hết chốt chặn. (chạy khô — thêm --that để tạo và đăng)\n'); process.exit(0); }

// ── Tạo + đăng ──────────────────────────────────────────────────────────────
const nay = new Date().toISOString();
const r = await fetch(`${D}/items/posts`, {
  method: 'POST',
  headers: H,
  body: JSON.stringify({ title, slug, excerpt, content: html, status: 'published', published_at: nay, featured_image: ANH }),
});
const b = await r.json();
if (!r.ok) { console.error('  ✘ Directus từ chối:', JSON.stringify(b).slice(0, 400)); process.exit(1); }
fs.writeFileSync(path.join(GOC, `reports/dang-7-cau-hoi-cap-3-${Date.now()}.json`), JSON.stringify(b.data, null, 2));
console.log(`\n  ✔ Đã tạo post #${b.data.id} (published, published_at = ${nay})`);
console.log('  → Còn phải push lên main để build lại site. URL: https://truongvietanh.com/blog/' + slug + '/\n');
