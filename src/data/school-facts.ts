// =====================================================================
// SỐ LIỆU CHUẨN TOÀN SITE — Trường Việt Anh
// Một nguồn sự thật duy nhất. Sửa ở đây, dùng nhất quán mọi nơi.
// Chuẩn hoá site-wide 24/06/2026 (PR #147). Đừng hard-code lại số ở trang khác.
// =====================================================================

export const schoolFacts = {
  // Lịch sử
  foundedYear: 2011,
  yearsRunning: 15, // thành lập 2011 → 15 năm K-12

  // Quy mô
  // ── CƠ SỞ: 3 NHÓM — anh Dương chốt 03/11/2026 "để người ta khỏi bắt bẻ" ──────
  // Pháp lý chỉ 2 cơ sở là của Trường Việt Anh. 6 trường còn lại có quyết định riêng:
  //   1) Cơ sở chính thức: Việt Anh Gò Vấp (VAGV), Việt Anh Bình Tân (VABT) — TP.HCM
  //   2) Cơ sở cùng chủ đầu tư: MN Việt Anh (Gò Vấp), MN Nhân Lễ, MN Thái Sơn, TH Thái Sơn
  //   3) Cơ sở phụ trách vận hành: MN + TH Mekong Xanh (Rạch Giá, An Giang)
  // ĐỪNG viết lại "Trường Việt Anh có 6 cơ sở" / "hệ thống 6 cơ sở" / "8 trường" gộp chung.
  // Dùng coSoNgan / coSoVua / coSoDayDu bên dưới. Danh sách hiển thị: src/data/cong-khai.ts (nhomCoSo).
  campuses: 2, // số CƠ SỞ CHÍNH THỨC — badge "2 cơ sở" phải kèm chữ "chính thức"/"tại TP.HCM"
  coSoNgan: '2 cơ sở chính thức tại TP.HCM',
  coSoVua: '2 cơ sở chính thức tại TP.HCM, cùng các trường cùng chủ đầu tư (TP.HCM, Tây Ninh) và trường do Việt Anh phụ trách vận hành (An Giang)',
  coSoDayDu: 'Trường Việt Anh có 2 cơ sở chính thức tại TP.HCM: cơ sở Gò Vấp (160/72 Phan Huy Ích) và cơ sở Bình Tân. Cùng chủ đầu tư với Trường Việt Anh có 4 trường: Mầm non Việt Anh (Gò Vấp), Mầm non Nhân Lễ, Mầm non và Tiểu học Thái Sơn (Cần Giuộc, Tây Ninh). Trường Việt Anh còn phụ trách vận hành Mầm non và Tiểu học Mekong Xanh (Rạch Giá, An Giang).',
  schools: 8, // tổng số trường của cả 3 nhóm — CHỈ dùng nội bộ, đừng hiển thị "8 trường"
  studentsTotal: '3.000+', // tổng học sinh/gia đình đã đồng hành (mọi khẳng định TỔNG)
  currentEnrollment: '1.000+', // học sinh đang học mỗi năm (metric khác với tổng)

  // Đầu ra học thuật
  ielts: '6.0+', // anh Dương chốt: KHÔNG nêu dải 6.0–8.0 hay trung bình 6.5 (khớp hồ sơ trường v2)
  ieltsFloor: '6.0', // sàn cam kết — xem ieltsWarranty, ĐỪNG nêu trần trụi

  // ── Bảo hành đầu ra IELTS — anh Văn xác nhận 18/09/2026 ──────────────────
  // CAM KẾT LÀ CÓ THẬT, ghi trong hợp đồng ký với từng học sinh. Nên chữ
  // "cam kết" dùng được, KHÔNG phải hạ xuống thành "mục tiêu".
  //
  // Nhưng đây là cam kết CÓ ĐIỀU KIỆN. Nguyên văn anh Văn:
  //   "giáo viên giao bài học sinh không học không làm mà muốn được 6.0 đến
  //    8.0 được" — nên điều kiện phải đi kèm MỌI LẦN nêu cam kết.
  //
  // VÌ SAO ĐỂ Ở ĐÂY: điều kiện này trước nay chỉ nằm trong chữ của vài trang
  // lớp 10, KHÔNG có trong file canon — nên bài blog chép lại cam kết mà rụng
  // mất điều kiện. Riêng vế "làm hết bài tập" thì trước 18/09 không trang nào
  // trong src/ có. Từ nay trích từ đây, đừng gõ lại.
  // Câu thống nhất toàn site (anh Dương duyệt B3 31/10/2026, Văn chốt thêm dòng điều kiện 01/11):
  // "Bảo hành đầu ra IELTS 6.0+ ghi trong hợp đồng — không đạt trường kèm miễn phí cho đến khi đạt
  // (theo điều kiện trong hợp đồng)." KHÔNG nêu dải 6.0–8.0, trung bình 6.5 hay tỷ lệ 85%/35%/10%.
  ieltsWarranty: {
    conditions: [
      'đi học đủ',
      'dự đủ các buổi kèm bổ sung',
      'làm hết bài tập giáo viên giao',
    ],
    // Câu ngắn — dùng ngay sau mỗi lần nêu cam kết, kể cả trong excerpt.
    short: 'theo điều khoản bảo hành: đi học đủ, dự đủ các buổi kèm và làm hết bài tập giáo viên giao',
    // Câu đầy đủ — dùng ở trang chính sách, FAQ, chỗ có không gian giải thích.
    full: 'Cam kết đầu ra IELTS ghi trong hợp đồng ký với từng học sinh. Đây là cam kết về đào tạo: nếu con chưa đạt sau kỳ thi chính thức, trường kèm tiếp miễn phí đến khi đạt. Điều kiện đi kèm là con đi học đủ, dự đủ các buổi kèm bổ sung và làm hết bài tập giáo viên giao.',
  },
  // 31/10/2026: anh Dương BỎ mọi tỷ lệ % vào đại học (bảng quyết định B4). ĐỪNG hiển thị
  // lại; TT09 Điều 9.2.c đòi SỐ LƯỢNG trúng tuyển — chờ nhà trường cấp số thật.
  collegeRate: '100%',
  universitiesCount: '50+', // số trường ĐH trong & ngoài nước tiếp nhận
  awards: '120', // giải thưởng các loại năm 2025–2026 (hồ sơ trường v2)

  // Uy tín xã hội
  rating: '4.9', // điểm đánh giá trung bình /5
  reviewCount: '300+', // số lượt đánh giá
} as const;

// =====================================================================
// GIỜ ĐÓN KHÁCH & THAM QUAN TRƯỜNG — anh Dương chốt 31/08/2026
// Thứ 2 – Thứ 7: 07:00–19:00. Chủ Nhật: ngoài giờ, nhưng tham quan được nếu hẹn trước.
// Dùng openingHours cho MỌI schema LocalBusiness/EducationalOrganization.
// Chủ Nhật CỐ TÌNH không nằm trong openingHours: chỉ phục vụ khi có hẹn,
// không phải giờ mở cửa thường trực — khai báo sai sẽ sai thông tin trên Google.
// Nhãn nhóm cơ sở cho landing page dùng chung layout (MamNonHook, MamNonCamOn): trang mầm non
// và trang ở Cần Giuộc/Thái Sơn thuộc nhóm "cùng chủ đầu tư", Rạch Giá/Mekong Xanh thuộc nhóm
// "phụ trách vận hành", còn lại là 2 cơ sở chính thức. Xem chú thích campuses ở trên.
export function nhanNhomCoSo(location = '', schoolLevel = ''): string {
  if (/Rạch Giá|Mekong/i.test(location)) return 'Do Trường Việt Anh phụ trách vận hành';
  if (schoolLevel === 'mam-non' || /Cần Giuộc|Thái Sơn|Nhân Lễ|Long Hậu/i.test(location)) return 'Cùng chủ đầu tư với Trường Việt Anh';
  return schoolFacts.coSoNgan;
}

// =====================================================================
export const openingHours = {
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  opens: '07:00',
  closes: '19:00',
  // Câu mô tả chuẩn, dùng lại nguyên văn ở phần nội dung hiển thị cho phụ huynh.
  display: 'Thứ 2 – Thứ 7: 07:00 – 19:00',
  displayFull: 'Thứ 2 – Thứ 7: 07:00 – 19:00. Chủ Nhật: ngoài giờ làm việc, vẫn nhận tham quan nếu hẹn trước.',
  sundayNote: 'Chủ Nhật ngoài giờ làm việc — phụ huynh hẹn trước qua Hotline hoặc Zalo OA vẫn tham quan được.',
} as const;

export const openingHoursSpecification = {
  '@type': 'OpeningHoursSpecification',
  dayOfWeek: [...openingHours.days],
  opens: openingHours.opens,
  closes: openingHours.closes,
};

// Mã xác minh Google Search Console.
// TODO: thay bằng mã thật từ Search Console (đang để placeholder).
export const GOOGLE_SITE_VERIFICATION =
  import.meta.env.PUBLIC_GOOGLE_SITE_VERIFICATION || 'google-site-verification-placeholder';
