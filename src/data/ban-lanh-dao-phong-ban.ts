// BAN LÃNH ĐẠO + CÁC PHÒNG BAN — dữ liệu dùng chung cho trang /giao-vien (thẻ tab "Ban Lãnh Đạo" và các thẻ phòng ban).
// Trang /ban-lanh-dao cũ đã gộp vào /giao-vien (09/11/2026, theo yêu cầu của Văn); mảng banLanhDao dưới đây chép nguyên
// từ bghMembers của trang đó. Sửa tên/chức danh/ảnh ở ĐÂY, đừng sửa trong giao-vien.astro.
export const banLanhDao = [
  {
    name: 'Nguyễn Mạnh Dương',
    title: 'Chủ Tịch',
    org: 'Hệ Thống Trường Việt Anh',
    role: 'chairman',
    initials: 'NMD',
    photo: '/nguyen-manh-duong.jpg',
    description: 'Người sáng lập, Chủ tịch Hội đồng trường Việt Anh. Phụ trách tầm nhìn, chiến lược và định hướng phát triển toàn hệ thống.',
  },
  {
    name: 'Phạm Thị Cẩm Tú',
    title: 'Phó Chủ Tịch',
    org: 'Hội Đồng Trường Việt Anh',
    role: 'vice-chairman',
    initials: 'PTCT',
    photo: '/pham-thi-cam-tu.jpg',
    description: 'Phó Chủ tịch Hội đồng trường Việt Anh. Phụ trách phát triển kinh doanh và mở rộng hệ thống.',
  },
  {
    name: 'Nguyễn Thùy Anh',
    title: 'Viện Trưởng',
    org: 'Viện Nghiên Cứu và Phát Triển MERDI',
    role: 'research',
    initials: 'NTA',
    photo: '/nguyen-thuy-anh.jpg',
    description: 'Dẫn dắt nghiên cứu và phát triển chương trình, phương pháp giáo dục cho toàn hệ thống Việt Anh từ Mầm non đến THPT theo triết lý Whole Child, đồng thời xây dựng tiêu chuẩn kiểm tra – đánh giá để đảm bảo chất lượng nhất quán.',
    mission: 'Sứ mệnh của tôi là tạo ra những trải nghiệm hạnh phúc và ý nghĩa cho gia đình, người thân và truyền cảm hứng cho giáo viên, học sinh.',
  },
  {
    name: 'Trần Thị Ngọc Tuyền',
    title: 'Hiệu Trưởng',
    org: 'Trường TH - THCS - THPT Việt Anh',
    role: 'principal',
    initials: 'TTNT',
    photo: '/tran-thi-ngoc-tuyen.jpg',
    description: 'Quản lý chất lượng và vận hành hoạt động giáo dục toàn Trường TH - THCS - THPT Việt Anh.',
    mission: 'Giáo dục là nuôi dưỡng và kiến tạo. Tôi chọn đồng hành cùng mỗi gia đình trên hành trình nuôi dạy con lớn lên với sức bật tinh thần, nội lực vững vàng và khả năng tìm thấy ý nghĩa sống của chính mình.',
  },
  {
    name: 'Nguyễn Thị Ái Hoa',
    title: 'Phó Hiệu Trưởng',
    org: 'Trường TH - THCS - THPT Việt Anh',
    role: 'vice-principal',
    initials: 'NTAH',
    photo: '/nguyen-thi-ai-hoa.jpg',
    description: 'Đảm bảo mọi hoạt động dạy và học tại cơ sở vận hành trơn tru, để mỗi giáo viên được hỗ trợ tốt nhất và mỗi học sinh được phát triển đúng tiềm năng của mình.',
    mission: 'Tôi tin rằng một ngôi trường tốt được xây từ những điều nhỏ được làm đúng mỗi ngày — tôi chọn kiên trì với điều đó.',
  },
  {
    name: 'Nguyễn Thị Lan',
    title: 'Phó Hiệu Trưởng',
    org: 'Trường TH - THCS - THPT Việt Anh',
    role: 'vice-principal',
    initials: 'NTL',
    photo: '/nguyen-thi-lan.jpg',
    description: '"Với vai trò là phó hiệu trưởng trường Việt Anh, tôi luôn tâm niệm sống với tuyên ngôn sứ mệnh của mình – Yêu thương và trách nhiệm."',
    quote: true,
  },
  {
    name: 'Nguyễn Duy Khải',
    title: 'Regional Manager',
    org: 'Khu Vực Cần Giuộc',
    role: 'regional-manager',
    initials: 'NDK',
    photo: '/nguyen-duy-khai.jpg',
    description: 'Dẫn dắt và phát triển các cơ sở giáo dục của hệ thống Trường Việt Anh tại khu vực Cần Giuộc, xây dựng đội ngũ vững mạnh và kiến tạo môi trường học tập hạnh phúc, an toàn, chất lượng để mỗi học sinh được phát triển toàn diện.',
    mission: 'Tôi tồn tại để kiến tạo những ngôi trường mà mỗi đứa trẻ muốn đến, mỗi giáo viên tự hào cống hiến và mỗi gia đình an tâm gửi gắm tương lai của con.',
  },
];

// Chức danh cho dữ liệu có cấu trúc (schema AboutPage) — chép nguyên từ trang /ban-lanh-dao cũ.
export const banLanhDaoSchema = [
  { name: 'Nguyễn Mạnh Dương', jobTitle: 'Chủ tịch Hội đồng trường' },
  { name: 'Phạm Thị Cẩm Tú', jobTitle: 'Phó Chủ tịch Hội đồng trường' },
  { name: 'Nguyễn Thùy Anh', jobTitle: 'Viện trưởng viện Nghiên cứu và Phát triển MERDI' },
  { name: 'Trần Thị Ngọc Tuyền', jobTitle: 'Hiệu trưởng Trường TH - THCS - THPT Việt Anh' },
  { name: 'Nguyễn Thị Ái Hoa', jobTitle: 'Phó Hiệu trưởng Trường TH - THCS - THPT Việt Anh' },
  { name: 'Nguyễn Thị Lan', jobTitle: 'Phó Hiệu trưởng Trường TH - THCS - THPT Việt Anh' },
  { name: 'Nguyễn Duy Khải', jobTitle: 'Regional Manager' },
];

// ── CÁC PHÒNG BAN (thẻ tab trên /giao-vien) — dựng 09/11/2026 ─────────────────
// Anh Dương giao (file đối chiếu TT09, mục 8.1a): Marketing, SO, FI, MERDI, HR&OP. SO = "Đội Ngũ Tư Vấn (SO)" đã có
// thẻ riêng ở /giao-vien nên KHÔNG lặp lại ở đây.
// KHUNG ĐỂ SẴN: Văn bổ sung ảnh + thông tin sau.
//   - Thêm người: nhét một dòng vào `thanhVien` ({ name, title, photo }). photo để '' thì trang hiện chữ cái đầu.
//   - Thêm ảnh: bỏ file vào public/ (vd /nguyen-kim-hung-tien.jpg, ảnh dọc 3:4) rồi điền `photo`.
//   - `choTrong` = số ô trống "Đang cập nhật" hiện thêm sau các thành viên; có đủ người thì đặt 0.
// KHÔNG ghi số điện thoại / email cá nhân (repo công khai).
// CÂU TRÍCH CỦA ANH TIẾN — CHƯA ĐƯA LÊN, chờ xác nhận: câu cuối nêu thành tích ("nhiều em đã nhận được những học bổng
// giá trị từ nhiều đại học hàng đầu thế giới") chưa có nguồn và "hàng đầu" thuộc nhóm cụm anh Dương đã bỏ (B10).
// Nguyên văn: "Hầu hết học sinh Việt Nam vừa khao khát vừa sợ hãi cơ hội du học. Vì vậy, trường Việt Anh được thiết kế để
// chuẩn bị tốt tiếng Anh và các phẩm chất, năng lực cần có. Nhờ đó, học sinh tự tin du học, nhiều em đã nhận được những học
// bổng giá trị từ nhiều đại học hàng đầu thế giới."
export interface ThanhVienPhongBan {
  name: string;
  title: string;
  photo: string;
}
export interface PhongBan {
  id: string;
  tab: string;
  icon: string;
  moTa: string;
  thanhVien: ThanhVienPhongBan[];
  choTrong: number;
}

export const phongBan: PhongBan[] = [
  {
    id: 'nhan-su-van-hanh',
    tab: 'Nhân sự & Vận hành (HR&OP)',
    icon: '🤝',
    moTa: 'Phòng Nhân sự & Vận hành (HR&OP) của Major Education.',
    thanhVien: [{ name: 'Nguyễn Kim Hùng Tiến', title: 'HR&OP Manager', photo: '' }],
    choTrong: 0,
  },
  {
    id: 'marketing',
    tab: 'Marketing (MA)',
    icon: '📣',
    moTa: 'Phòng Marketing gồm hai nhóm: Media và Content.',
    thanhVien: [
      { name: 'Phạm Đức Nghĩa', title: 'Trưởng nhóm Media', photo: '' },
      { name: 'Võ Song Hương', title: 'Trưởng nhóm Content', photo: '' },
      { name: 'Lương Văn Hùng', title: 'Nhân viên Media', photo: '' },
      { name: 'Nguyễn Hiếu Thịnh', title: 'Nhân viên Media', photo: '' },
    ],
    choTrong: 0,
  },
  {
    // Viện trưởng MERDI (Nguyễn Thùy Anh) hiện hiện ở thẻ Ban Lãnh Đạo.
    id: 'merdi',
    tab: 'MERDI',
    icon: '🔬',
    moTa: 'Viện Nghiên cứu và Phát triển MERDI.',
    thanhVien: [],
    choTrong: 2,
  },
  {
    id: 'tai-chinh',
    tab: 'Tài chính (FI)',
    icon: '💰',
    moTa: 'Phòng Tài chính của Major Education.',
    thanhVien: [],
    choTrong: 2,
  },
];
