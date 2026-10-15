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
  // CƠ SỞ = địa điểm vật lý đang hoạt động. TRƯỜNG = pháp nhân/đơn vị trên giấy phép.
  // 8 trường nhưng chỉ 6 cơ sở, vì hai cặp trường dùng chung một khuôn viên:
  //   · Mầm Non + Tiểu Học Thái Sơn (Tây Ninh) — cùng một khuôn viên
  //   · Mầm Non + Tiểu Học Mekong Xanh (An Giang) — cùng một khuôn viên
  // Phân bố cơ sở: TP.HCM (3) · Tây Ninh (2) · An Giang (1). Anh Dương chốt 01/09/2026.
  // ĐỐI NGOẠI LUÔN DÙNG SỐ CƠ SỞ = 6. Chỉ nói "8 trường" khi có giải thích kèm theo.
  campuses: 6,
  schools: 8,
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
  collegeRate: '100%', // học sinh tốt nghiệp THPT và được tiếp nhận vào đại học (hồ sơ trường v2)
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
