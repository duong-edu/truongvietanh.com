// =====================================================================
// CÔNG KHAI THEO THÔNG TƯ 09/2024/TT-BGDĐT — dữ liệu cho trang /cong-khai
//
// Mỗi mục bám một khoản của Thông tư (Điều 4–9). Trang chỉ ĐỌC từ file này,
// muốn thêm/sửa số liệu thì sửa ở đây.
//
//   trangThai 'co'      — đã có dữ liệu, lấy từ trang đang chạy trên site
//   trangThai 'xacnhan' — có một phần hoặc đang lệch giữa các trang, chờ cô Tuyền chốt
//   trangThai 'thieu'   — chưa có gì trên site, phải xin từ nhà trường
//
// BAN_NHAP = true: trang hiện băng "bản nháp" và nhãn trạng thái từng mục.
// Chỉ đặt false sau khi đủ 3 bước của MA: (1) đối chiếu số liệu cô Tuyền,
// (2) hai agent luật sư audit, (3) cô Tuyền kiểm lần cuối. Trước đó KHÔNG gắn link/menu.
// =====================================================================

export const BAN_NHAP = false;

// ĐĂNG ĐỢT 1 (11/11/2026, Văn: "mục nào có thể đăng thì đăng trước"). Chỉ các khoản có nguồn là
// văn bản chính thức của nhà trường (BC 009/BC-VA, TB 10/2026/TB-VA, các quyết định) mới nằm ở đây.
// Khoản không có trong tập này KHÔNG hiện ra trang (mục chưa có dữ liệu: 4.7.e, 5.1, 5.4, 6.x, 7.x, 9.1).
// Thêm khoản mới = thêm số khoản vào đây SAU KHI điền giaTri/cacDong. Ghi chú nội bộ (ghiChu) không bao giờ hiện.
export const CONG_BO = new Set<string>([
  '4.1', '4.2', '4.3', '4.4', '4.5', '4.6', '4.7.a', '4.7.b', '4.7.c', '4.7.d', '4.7.e', '4.8',
  '5.2', '5.3',
  '8.1', '8.2', '8.3', '8.4',
  '9.2.a–b', '9.2.b (thống kê)', '9.2.c', '9.3',
]);

export type TrangThai = 'co' | 'xacnhan' | 'thieu';

export interface MucCongKhai {
  /** Số khoản của Thông tư, vd "4.6" */
  khoan: string;
  nhan: string;
  /** Nội dung hiển thị; bỏ trống khi chưa có dữ liệu */
  giaTri?: string;
  /** Các dòng có nhãn, mỗi ý một dòng (vd Sứ mệnh / Tầm nhìn / Mục tiêu) */
  cacDong?: { nhan: string; noiDung: string }[];
  /** Danh sách hiển thị dưới giaTri (vd quyết định của từng trường) */
  danhSach?: string[];
  /** Link nội bộ dẫn tới trang đã có nội dung này */
  lien?: { text: string; href: string };
  trangThai: TrangThai;
  /** Ghi chú NỘI BỘ — chỉ hiện khi BAN_NHAP */
  ghiChu?: string;
}

export interface NhomCongKhai {
  id: string;
  dieu: string;
  tieuDe: string;
  moTa?: string;
  muc: MucCongKhai[];
}

export interface CoSoCongKhai {
  ten: string;
  cap: string;
  diaChi: string;
  dienThoai: string;
  tinh: string;
}

export interface NhomCoSo {
  id: string;
  tieuDe: string;
  moTa: string;
  coSo: CoSoCongKhai[];
  /** Ghi chú NỘI BỘ — chỉ hiện khi BAN_NHAP */
  ghiChu?: string;
}

// Anh Dương chốt 03/11/2026: chia 3 nhóm "để người ta khỏi bắt bẻ" — chỉ VAGV và VABT là
// cơ sở chính thức; các trường còn lại có pháp nhân/quyết định riêng. ĐỪNG gộp lại thành
// "6 cơ sở của Trường Việt Anh" trên trang này.
// Tên trường ghi theo quyết định cho phép hoạt động (mục 4.7.a). Địa chỉ và hotline lấy từ
// src/pages/co-so/*.astro (cùng nguồn với trang cơ sở).
export const nhomCoSo: NhomCoSo[] = [
  {
    id: 'co-so-chinh-thuc',
    tieuDe: 'Cơ sở chính thức',
    moTa: 'Hai cơ sở của Trường Việt Anh tại TP. Hồ Chí Minh.',
    coSo: [
      {
        ten: 'Trường TiH - THCS - THPT Việt Anh Gò Vấp',
        cap: 'Tiểu học · THCS · THPT',
        diaChi: '160/72 Phan Huy Ích, Phường An Hội Tây',
        dienThoai: '0916 961 409',
        tinh: 'TP. Hồ Chí Minh',
      },
      {
        ten: 'Trường TiH - THCS - THPT Việt Anh Bình Tân',
        cap: 'Tiểu học · THCS · THPT',
        diaChi: 'Số 7 Đường 38A, Phường Tân Tạo',
        dienThoai: '0916 961 409',
        tinh: 'TP. Hồ Chí Minh',
      },
    ],
    ghiChu: 'Bình Tân: anh Dương CHỐT 08/11 (đề nghị anh Tiến) gọi nước đôi "Trường TH-THCS-THPT Việt Anh cơ sở Bình Tân" — tránh vướng QĐ hoạt động THCS/THPT chưa có (hiện chỉ có QĐ Tiểu học 178 + QĐ thành lập Cơ sở 3 số 2583). Địa chỉ QĐ 2583 ghi 951/7 Tỉnh lộ 10 — chờ anh Trường xác nhận.',
  },
  {
    id: 'cung-chu-dau-tu',
    tieuDe: 'Cơ sở cùng chủ đầu tư',
    moTa: 'Các trường có quyết định cho phép hoạt động riêng, cùng chủ đầu tư với Trường Việt Anh.',
    coSo: [
      {
        ten: 'Trường Mầm non Việt Anh',
        cap: 'Mầm non',
        diaChi: '573 Đường Lê Đức Thọ, Phường An Hội Đông',
        dienThoai: '0774 588 988',
        tinh: 'TP. Hồ Chí Minh',
      },
      {
        ten: 'Trường Mầm non Nhân Lễ',
        cap: 'Mầm non',
        diaChi: '22 Đường D2, Khu Dân cư, Cần Giuộc',
        dienThoai: '0902 095 956',
        tinh: 'Tây Ninh',
      },
      {
        ten: 'Trường Mầm non tư thục Thái Sơn',
        cap: 'Mầm non',
        diaChi: 'Khu Dân cư Thái Sơn, Long Hậu, Cần Giuộc',
        dienThoai: '0902 095 956',
        tinh: 'Tây Ninh',
      },
      {
        ten: 'Trường Tiểu học tư thục Thái Sơn',
        cap: 'Tiểu học',
        diaChi: 'Khu Dân cư Thái Sơn, Long Hậu, Cần Giuộc',
        dienThoai: '0902 095 956',
        tinh: 'Tây Ninh',
      },
    ],
    ghiChu: 'Thái Sơn ghi "tư thục" theo đúng tên trên QĐ 5815/5816; anh Dương viết gọn "Mầm non Thái Sơn", "Tiểu học Thái Sơn".',
  },
  {
    id: 'phu-trach-van-hanh',
    tieuDe: 'Cơ sở phụ trách vận hành',
    moTa: 'Các trường do Trường Việt Anh phụ trách vận hành.',
    coSo: [
      {
        ten: 'Trường Mầm non Mekong Xanh',
        cap: 'Mầm non',
        diaChi: 'Lô E7, Khu đô thị Tây Bắc, TP. Rạch Giá',
        dienThoai: '0346 455 455',
        tinh: 'An Giang',
      },
      {
        ten: 'Trường Tiểu học Mekong Xanh',
        cap: 'Tiểu học',
        diaChi: 'Lô E7, Khu đô thị Tây Bắc, TP. Rạch Giá',
        dienThoai: '0346 455 455',
        tinh: 'An Giang',
      },
    ],
    ghiChu: 'Anh Dương viết "Tiểu học Quốc tế Mekong Xanh" nhưng QĐ 123/QĐ-PGDĐT ghi "Trường tiểu học Mekong Xanh" (không có chữ Quốc tế) → trang ghi theo QĐ. QĐ 67/QĐ-UBND (16/4/2020) cũng ghi "trường Mầm non Mekong Xanh" (không có chữ Quốc tế) → đã đổi tên mầm non theo QĐ (09/11), giống Tiểu học.',
  },
];

/** Danh sách phẳng mọi trường (giữ cho chỗ nào cần đếm/duyệt hết) */
export const coSo: CoSoCongKhai[] = nhomCoSo.flatMap((n) => n.coSo);

export const nhomCongKhai: NhomCongKhai[] = [
  // ─────────────────────────────── Điều 4 ───────────────────────────────
  {
    id: 'thong-tin-chung',
    dieu: 'Điều 4',
    tieuDe: 'Thông tin chung về cơ sở giáo dục',
    muc: [
      {
        khoan: '4.1',
        nhan: 'Tên cơ sở giáo dục (kèm tên tiếng nước ngoài, nếu có)',
        giaTri: 'Trường Việt Anh gồm 2 cơ sở chính thức tại TP. Hồ Chí Minh (Gò Vấp và Bình Tân). Ngoài ra có 4 trường cùng chủ đầu tư và 2 trường do Trường Việt Anh phụ trách vận hành (danh sách ở đầu trang).',
        trangThai: 'xacnhan',
        ghiChu: 'Chia 3 nhóm theo anh Dương 03/11. Bình Tân: anh Dương CHỐT 08/11 (theo đề nghị anh Tiến) trình bày NƯỚC ĐÔI "Trường TH-THCS-THPT Việt Anh cơ sở Gò Vấp và cơ sở Bình Tân" — website đã dùng cách gọi này. Còn chờ: tên Mầm non Mekong Xanh (chờ QĐ); tên tiếng nước ngoài (BC ghi "Không").',
      },
      {
        khoan: '4.2',
        nhan: 'Địa chỉ trụ sở chính, địa chỉ hoạt động khác, điện thoại, thư điện tử, cổng thông tin',
        giaTri: 'Trụ sở: 160/72 Phan Huy Ích, Phường An Hội Tây, TP. Hồ Chí Minh · Hotline 0916 961 409 · hoc@truongvietanh.com · truongvietanh.com',
        trangThai: 'xacnhan',
        ghiChu: 'Email lệch: chân trang ghi hoc@, trang /lien-he ghi info@. Cần chốt một địa chỉ chính thức.',
      },
      {
        khoan: '4.3',
        nhan: 'Loại hình, cơ quan/tổ chức quản lý trực tiếp hoặc chủ sở hữu, nhà đầu tư, danh sách góp vốn',
        giaTri: 'Loại hình: trường phổ thông có nhiều cấp học, ngoài công lập, vốn đầu tư trong nước. Cơ quan quản lý trực tiếp: Sở Giáo dục và Đào tạo TP. Hồ Chí Minh. Chủ sở hữu, nhà đầu tư thành lập: Công ty Cổ phần Giáo dục Major Education (mã số doanh nghiệp 0310596706, đăng ký lần đầu ngày 20/01/2011). Danh sách tổ chức, cá nhân góp vốn: nhà đầu tư duy nhất là Công ty Cổ phần Giáo dục Major Education. Hồ sơ pháp lý: Quyết định số 260/QĐ-UBND ngày 21/01/2020 của UBND TP. Hồ Chí Minh; Quyết định số 1322/QĐ-GDĐT-TC ngày 21/10/2020.',
        trangThai: 'xacnhan',
        ghiChu: 'Nguồn: BC Thường niên số 009/BC-VA ngày 10/06/2026. Nhà đầu tư (theo Hội đồng trường): Nguyễn Mạnh Dương, Nguyễn Tiến Dũng, Nguyễn Thị Mỹ Linh. Danh sách cá nhân góp vốn là dữ liệu cá nhân — luật sư quyết có công khai danh tính hay không.',
      },
      {
        khoan: '4.4',
        nhan: 'Sứ mệnh, tầm nhìn, mục tiêu',
        // Anh Dương 03/11/2026: trình bày 3 ý, mỗi ý một dòng. Nội dung theo file đối chiếu TT09.
        cacDong: [
          { nhan: 'Sứ mệnh', noiDung: 'Xây dựng môi trường học tập vui vẻ và thực dụng.' },
          { nhan: 'Tầm nhìn', noiDung: 'Tất cả học sinh hạnh phúc, ra trường với 16 kỹ năng thế kỷ 21 và nền tảng tiếng Anh đủ du học.' },
          { nhan: 'Mục tiêu', noiDung: '100% học sinh tiến bộ so với chính mình qua từng năm học, xét trên 4 lĩnh vực phát triển toàn diện: Kiến thức, Kỹ năng lãnh đạo, Phẩm chất và Sức khoẻ.' },
        ],
        lien: { text: 'Giới thiệu nhà trường', href: '/gioi-thieu' },
        trangThai: 'co',
      },
      {
        khoan: '4.5',
        nhan: 'Tóm tắt quá trình hình thành và phát triển',
        giaTri: 'Thành lập năm 2011 tại TP. Hồ Chí Minh; nay có 2 cơ sở chính thức tại TP. Hồ Chí Minh, cùng các trường cùng chủ đầu tư và trường do Việt Anh phụ trách vận hành tại TP. Hồ Chí Minh, Tây Ninh và An Giang; dạy trẻ từ 1 đến 18 tuổi.',
        trangThai: 'co',
      },
      {
        khoan: '4.6',
        nhan: 'Người đại diện pháp luật / người phát ngôn / người đại diện để liên hệ (họ tên, chức vụ, nơi làm việc, điện thoại, email)',
        giaTri: 'Người đại diện / người phát ngôn: ông Nguyễn Mạnh Dương — Chủ tịch Hội đồng trường; làm việc tại trụ sở chính (160/72 Phan Huy Ích, Phường An Hội Tây, TP. Hồ Chí Minh). Liên hệ qua hotline 0916 961 409 hoặc hoc@truongvietanh.com.',
        trangThai: 'xacnhan',
        ghiChu: 'Nguồn: BC 009/BC-VA mục 6. KHÔNG mâu thuẫn: BC là của NĂM HỌC 2025–2026, khi đó Hiệu trưởng là Phạm Nguyễn Phương Duy (QĐ 2259 ngày 24/11/2025); cô Trần Thị Ngọc Tuyền lên Hiệu trưởng từ đầu năm học 2026–2027 (hiện tại, khớp /ban-lanh-dao). Khi công khai nêu rõ Hiệu trưởng HIỆN TẠI là cô Tuyền; cần bổ sung số QĐ bổ nhiệm cô Tuyền.',
      },
      {
        khoan: '4.7.a',
        nhan: 'Quyết định thành lập / cho phép thành lập / cho phép hoạt động giáo dục của từng trường',
        giaTri: 'Quyết định cho phép thành lập và cho phép hoạt động giáo dục của 2 cơ sở chính thức và các trường liên quan:',
        // Nguồn: anh Trường (HR) gửi 31/10/2026. Giữ nguyên tên trường và cơ quan như trên quyết định.
        // Xếp theo 3 nhóm anh Dương chốt 03/11: chính thức → cùng chủ đầu tư → phụ trách vận hành.
        danhSach: [
          'Trường Tiểu học, Trung học cơ sở và Trung học phổ thông Việt Anh: Quyết định số 1322/QĐ-GDĐT-TC ngày 09/7/2020 của Sở Giáo dục và Đào tạo Thành phố Hồ Chí Minh.',
          'Trường Tiểu học Việt Anh: Quyết định số 178/QĐ-GDĐT ngày 23/01/2024 của Phòng Giáo dục và Đào tạo quận Bình Tân.',
          'Trường Mầm non Việt Anh (loại hình tư thục): Quyết định số 863/QĐ-GDĐT ngày 30/8/2022 của Phòng Giáo dục và Đào tạo quận Gò Vấp.',
          'Trường Mầm non Nhân Lễ: Quyết định số 154/QĐ-PGDĐT ngày 24/01/2025 của Phòng Giáo dục và Đào tạo huyện Cần Giuộc.',
          'Trường Mầm non Mekong Xanh: Quyết định cho phép thành lập số 67/QĐ-UBND ngày 16/4/2020 của Chủ tịch Ủy ban nhân dân thành phố Rạch Giá.',
          'Trường Tiểu học Mekong Xanh: Quyết định số 123/QĐ-PGDĐT ngày 08/8/2022 của Phòng Giáo dục và Đào tạo thành phố Rạch Giá.',
        ],
        trangThai: 'xacnhan',
        ghiChu: '[13/11 Văn: ẨN 2 mục Thái Sơn (MN QĐ 5815, TH QĐ 5816, cùng ngày 07/10/2026 của UBND xã Cần Giuộc) — chưa có QĐ cho phép hoạt động giáo dục; chờ bản scan.] [13/11 Văn: ẨN mục Cơ sở 3 (QĐ thành lập 2583/QĐ-UBND ngày 29/4/2026, QĐ hoạt động giáo dục đang làm thủ tục) — chưa đăng cho tới khi có QĐ cho phép hoạt động.] Cập nhật 09/11 (Văn): QĐ Mầm non Mekong Xanh và QĐ 178 nhà trường ĐÃ CÓ nhưng bản scan chưa vào thư mục Desktop\\Giấy phép hoạt động — đã rà thư mục 09/11: QĐ 178 số/ngày ĐÃ có ở danh sách trên (chỉ thiếu bản scan, không chặn việc đăng); Mầm non Mekong Xanh: Văn bỏ file 09/11 = QĐ 67/QĐ-UBND ngày 16/4/2020 (Chủ tịch UBND TP Rạch Giá) cho phép THÀNH LẬP — đã thêm dòng (danh sách nay 9 dòng). CÒN THIẾU QĐ cho phép HOẠT ĐỘNG giáo dục của Phòng GD&ĐT TP Rạch Giá (Điều 2 QĐ 67 giao Phòng cho phép hoạt động khi đủ điều kiện trong 2 năm) — nếu trường đang đón trẻ thì phải có; hỏi Văn/anh Trường. QĐ cho phép hoạt động THCS/THPT Bình Tân: CHƯA có, dự kiến 01/2027 — vì vậy gọi nước đôi (anh Dương chốt 08/11); trên trang chỉ ghi "đang làm thủ tục", KHÔNG nêu mốc 01/2027. Cập nhật 02/11: đã có 7 QĐ cho phép hoạt động + 1 QĐ cho phép THÀNH LẬP (Cơ sở 3 Bình Tân). Cơ sở 3 (THCS/THPT Bình Tân) CHƯA có QĐ cho phép hoạt động — QĐ 2583 Điều 2.2 ghi phải chuẩn bị điều kiện "để được xem xét cho phép hoạt động"; site đang tuyển sinh THCS/THPT Bình Tân → anh Dương quyết cách ghi. Địa chỉ trong QĐ 2583 là 951/7 Tỉnh lộ 10, phường Tân Tạo — site ghi "Số 7 Đường 38A, Phường Tân Tạo": cần xác nhận cùng một nơi. QĐ 1322 chỉ có Gò Vấp + Phú Nhuận (đã đóng). Tên trên QĐ: "Trường tiểu học Mekong Xanh" (không có chữ Quốc tế). Bản scan 863 thiếu phần Điều 1 (địa chỉ) và Điều 2. Đã có scan: 1322, 154, 863, 5815, 5816, 123, 2583; còn thiếu 178.',
      },
      {
        khoan: '4.7.b',
        nhan: 'Quyết định công nhận hội đồng trường, chủ tịch và danh sách thành viên',
        giaTri: 'Hội đồng trường được thành lập và công nhận Chủ tịch theo Quyết định số 974/QĐ-SGDĐT ngày 27/04/2022 của Sở Giáo dục và Đào tạo TP. Hồ Chí Minh.',
        danhSach: [
          'Nguyễn Mạnh Dương — Chủ tịch Hội đồng trường (đại diện nhà đầu tư)',
          'Nguyễn Tiến Dũng — Thành viên Hội đồng trường (đại diện nhà đầu tư)',
          'Nguyễn Thị Mỹ Linh — Thành viên Hội đồng trường (đại diện nhà đầu tư)',
          'Nguyễn Thị Xuân Hương — Ủy viên Hội đồng trường',
          'Phạm Thị Cẩm Tú — Phó Chủ tịch Hội đồng trường',
        ],
        lien: { text: 'Ban lãnh đạo', href: '/giao-vien' },
        trangThai: 'xacnhan',
        ghiChu: 'Mới có tên từ trang /ban-lanh-dao. THIẾU số quyết định công nhận và danh sách thành viên đầy đủ.',
      },
      {
        khoan: '4.7.c',
        nhan: 'Quyết định bổ nhiệm, công nhận hiệu trưởng, phó hiệu trưởng',
        giaTri: 'Hiệu trưởng Trường TH - THCS - THPT Việt Anh: Phạm Nguyễn Phương Duy (bổ nhiệm theo Quyết định số 2259 ngày 24/11/2025). Phó Hiệu trưởng: Nguyễn Thị Ái Hoa và Nguyễn Thị Lan.',
        lien: { text: 'Ban lãnh đạo', href: '/giao-vien' },
        trangThai: 'xacnhan',
        ghiChu: '[10/11 anh Dương: anh Trường (Châu Thanh Trường) cung cấp QĐ bổ nhiệm Hiệu trưởng; "Tuyền chưa có thì cung cấp người cũ, và để tên họ lên tạm" — CÂU NÀY CÒN MƠ HỒ (tên người cũ Phạm Nguyễn Phương Duy, QĐ 2259, hay tên cô Tuyền?). Em đang hỏi lại anh Dương; trong lúc chờ KHÔNG ghi tên người cũ làm Hiệu trưởng hiện tại.] Hiệu trưởng HIỆN TẠI cô Trần Thị Ngọc Tuyền (lên từ đầu năm học 2026–2027; Văn xác nhận 07/11, khớp /ban-lanh-dao); Phó HT Nguyễn Thị Ái Hoa & Nguyễn Thị Lan. BC 009/BC-VA ghi Hiệu trưởng là Phạm Nguyễn Phương Duy (QĐ 2259 24/11/2025) — ĐÚNG cho năm học 2025–2026 của báo cáo, KHÔNG phải lỗi. THIẾU: số QĐ bổ nhiệm cô Tuyền, và hiệu trưởng các trường mầm non/Thái Sơn/Mekong Xanh.',
      },
      {
        khoan: '4.7.d',
        nhan: 'Quy chế tổ chức và hoạt động; chức năng, nhiệm vụ các đơn vị; sơ đồ tổ chức bộ máy',
        giaTri: 'Cơ cấu bộ máy: Hội đồng trường (5 thành viên); Hiệu trưởng và 2 Phó Hiệu trưởng; Hội đồng thi đua khen thưởng; các tổ chuyên môn (Toán; Lý – Sinh – Công nghệ; Hoá – KHTN; Ngữ văn; Lịch sử – Địa lí; GDCD – Mĩ thuật – Âm nhạc; Tiếng Anh; Tin học – GDTC); tổ Quản nhiệm; bộ phận văn phòng (kế toán, học vụ, hành chính nhân sự, y tế).',
        trangThai: 'xacnhan',
        ghiChu: 'Nguồn: BC 009/BC-VA mục 7.d. Còn thiếu: số/ngày quyết định ban hành Quy chế tổ chức – hoạt động và file sơ đồ tổ chức bộ máy.',
      },
      {
        khoan: '4.7.e',
        nhan: 'Họ tên, chức vụ, điện thoại, email, nơi làm việc của lãnh đạo nhà trường và các đơn vị',
        giaTri: 'Lãnh đạo nhà trường và các đơn vị. Nhà trường không công bố số điện thoại và email cá nhân của người lao động; mọi liên hệ với lãnh đạo xin gửi qua hotline 0916 961 409 hoặc hoc@truongvietanh.com (trụ sở chính: 160/72 Phan Huy Ích, Phường An Hội Tây, TP. Hồ Chí Minh).',
        cacDong: [
          { nhan: 'Phòng Nhân sự & Vận hành (HR&OP)', noiDung: 'Huỳnh Hoa Hải Đường (Senior); Châu Thanh Trường (Nhân viên); Cần Văn Hải (Nhân viên); Thập Anh Mười (Nhân viên); Phạm Hoàng Sơn (Nhân viên); Hoàng Quốc Bình (Tài xế); Dương Hữu Tài (Tài xế); Nguyễn Thành Nhân (Tài xế); Trần Vinh (Tài xế).' },
          { nhan: 'Phòng Tài chính (FI)', noiDung: 'Nguyễn Thị Tuyết Mai (Leader); Nguyễn Ngọc Bích Loan (Nhân viên); Đỗ Thị Sang (Nhân viên); Bạch Thị Hoà (Nhân viên).' },
          { nhan: 'Phòng Marketing (MA)', noiDung: 'Võ Song Hương (MA); Lương Văn Hùng (Video Editor); Nguyễn Hiếu Thịnh (Video Editor); Lê Như Ngọc (CTV); Nguyễn Thị Thiên Thanh (CTV); Nguyễn Yến Xuân (CTV); Nguyễn Thị Yến Nhi (CTV); Lê Nguyễn Phương Linh (CTV); Lê Nguyễn Bảo Ngân (CTV); Phạm Đức Nghĩa (MA).' },
        ],
        danhSach: [
          'Nguyễn Mạnh Dương — Chủ tịch Hội đồng trường, Hệ thống Trường Việt Anh.',
          'Phạm Thị Cẩm Tú — Phó Chủ tịch Hội đồng trường Việt Anh.',
          'Phạm Nguyễn Phương Duy — Hiệu trưởng, Trường TH - THCS - THPT Việt Anh.',
          'Nguyễn Thị Ái Hoa — Phó Hiệu trưởng, Trường TH - THCS - THPT Việt Anh.',
          'Nguyễn Thị Lan — Phó Hiệu trưởng, Trường TH - THCS - THPT Việt Anh.',
          'Nguyễn Thùy Anh — Viện trưởng, Viện Nghiên cứu và Phát triển MERDI.',
          'Nguyễn Duy Khải — Regional Manager, khu vực Cần Giuộc.',
          'Nguyễn Kim Hùng Tiến — HR&OP Manager, Phòng Nhân sự & Vận hành (HR&OP), Major Education.',
        ],
        lien: { text: 'Ban lãnh đạo và đội ngũ', href: '/giao-vien' },
        trangThai: 'xacnhan',
        ghiChu: 'Thông tư bắt buộc nêu cả điện thoại và email. Đây là dữ liệu cá nhân của người lao động — luật sư phải quyết dùng liên hệ chung của trường hay liên hệ riêng.',
      },
      {
        khoan: '4.8',
        nhan: 'Văn bản khác: chiến lược phát triển, quy chế dân chủ ở cơ sở, nghị quyết hội đồng trường, quy định quản lý hành chính – nhân sự – tài chính, chính sách thu hút đội ngũ, thông báo tuyển dụng',
        giaTri: 'Đã công bố: chính sách hoàn học phí 4 tuần, chính sách sử dụng AI, chính sách bảo mật, điều khoản sử dụng, quy trình khiếu nại.',
        lien: { text: 'Văn bản đã ban hành', href: '/van-ban' },
        trangThai: 'xacnhan',
        ghiChu: 'Nguồn BC 009/BC-VA mục 8 liệt kê đã ban hành: Kế hoạch chiến lược phát triển 2025–2030, Quy chế dân chủ ở cơ sở, Nghị quyết HĐT thông qua KHGD 2025–2026, Chính sách thu hút – phát triển đội ngũ + KH bồi dưỡng thường xuyên, Kế hoạch tuyển dụng, Chính sách sử dụng AI. Cần đưa file/đường dẫn lên /van-ban; luật sư chọn văn bản nào công khai toàn văn.',
      },
    ],
  },

  // ─────────────────────────────── Điều 5 ───────────────────────────────
  {
    id: 'tai-chinh',
    dieu: 'Điều 5',
    tieuDe: 'Thu, chi tài chính',
    muc: [
      {
        khoan: '5.1',
        nhan: 'Tình hình tài chính năm tài chính trước: cơ cấu các khoản thu (theo nguồn kinh phí) và chi (lương, cơ sở vật chất, hỗ trợ người học, chi khác)',
        trangThai: 'thieu',
        ghiChu: '[10/11 anh Dương: phía Kế toán "không cần gì khác ngoài chính sách học bổng" → KHÔNG xin số thu–chi/quỹ nữa; mục 5.1 và 5.4 chờ anh Dương quyết cách xử lý trên trang Công khai (TT09 vẫn đòi nêu).] Nguồn khung: BC 009/BC-VA mục VI (trường không dùng ngân sách nhà nước; dẫn Báo cáo tài chính năm 2025) — nhưng các số cơ cấu thu/chi còn để TRỐNG. Đây là mục nhạy cảm nhất với một công ty cổ phần — luật sư cho ý kiến mức độ chi tiết; nguồn số liệu phải là báo cáo tài chính đã quyết toán.',
      },
      {
        khoan: '5.2',
        nhan: 'Các khoản thu và mức thu đối với người học: học phí, lệ phí và TẤT CẢ khoản thu ngoài học phí, trong năm học và dự kiến cho từng năm học tiếp theo của cấp học, công khai TRƯỚC khi tuyển sinh',
        giaTri: 'Bảng học phí năm học 2026–2027 và dự kiến 2027–2028 theo từng khối (Thông báo số 10/2026/TB-VA ngày 12/10/2026). Các khoản thu ngoài học phí: phí dịch vụ đầu năm bắt buộc (tiểu học 13,4 triệu/năm; THCS–THPT 14,4 triệu/năm), phí ăn bán trú/nội trú, phí ký túc xá (Gò Vấp 2,5 triệu/tháng; Bình Tân 3,2 triệu/tháng), phí tăng cường tiếng Anh (Oxford license) 20 triệu/năm (tự chọn).',
        lien: { text: 'Bảng học phí', href: '/hoc-phi' },
        trangThai: 'xacnhan',
        ghiChu: 'Nguồn: TB 10/2026/TB-VA (có bảng phí 2026–27 và dự kiến 2027–28, học bổng, phí ăn, nội trú). Còn cần: rà câu ở /chinh-sach "không phát sinh chi phí bắt buộc" cho khớp đủ các khoản thu này. Phí ký túc xá/tăng cường tiếng Anh nêu theo Phan Huy Ích + Bình Tân — tùy quyết định phạm vi cơ sở.',
      },
      {
        khoan: '5.3',
        nhan: 'Chính sách và KẾT QUẢ thực hiện hằng năm về trợ cấp, miễn giảm học phí, học bổng',
        giaTri: 'Hệ thống học bổng năm học 2027–2028: GRIT (phẩm chất + sức khỏe), CHAMPIONS (thành tích học thuật), LEADERS (lãnh đạo), TALENTS (tuyển sinh), LOVE (đồng hành cùng gia đình gặp biến cố), cùng ưu đãi anh chị em ruột và học bổng giới thiệu (Thông báo số 10/2026/TB-VA). Kết quả thực hiện năm học 2025–2026 (số học sinh và giá trị học bổng): đang cập nhật.',
        lien: { text: 'Học bổng', href: '/hoc-bong' },
        trangThai: 'xacnhan',
        ghiChu: 'Nguồn chính sách: TB 10/2026/TB-VA. THIẾU KẾT QUẢ thực hiện: năm học 2025–2026 bao nhiêu học sinh được miễn/giảm/học bổng và tổng giá trị (BC 009/BC-VA mục V.5 để trống).',
      },
      {
        khoan: '5.4',
        nhan: 'Số dư các quỹ theo quy định, kể cả quỹ đặc thù (nếu có)',
        trangThai: 'thieu',
        ghiChu: 'BC 009/BC-VA mục VI.6 dẫn Báo cáo tài chính năm 2025 (đường dẫn công khai còn để trống). Cần cô Tuyền/kế toán xác nhận trường có quỹ nào phải công khai không (vd quỹ phụ huynh, quỹ học bổng).',
      },
    ],
  },

  // ─────────────────────────── Điều 6 — Mầm non ──────────────────────────
  {
    id: 'mam-non-dieu-kien',
    dieu: 'Điều 6',
    tieuDe: 'Giáo dục mầm non — điều kiện bảo đảm chất lượng',
    moTa: 'Áp dụng cho: Mầm non Việt Anh Gò Vấp, Mầm non Nhân Lễ, và khối mầm non của Thái Sơn, Mekong Xanh.',
    muc: [
      {
        khoan: '6.1',
        nhan: 'Đội ngũ giáo viên, cán bộ quản lý, nhân viên: số lượng theo vị trí và trình độ; số lượng, tỷ lệ đạt chuẩn nghề nghiệp; số lượng, tỷ lệ hoàn thành bồi dưỡng hằng năm',
        lien: { text: 'Đội ngũ giáo viên', href: '/giao-vien' },
        trangThai: 'thieu',
        ghiChu: 'Site có trang giới thiệu giáo viên nhưng KHÔNG có số liệu thống kê theo trình độ, chuẩn nghề nghiệp, bồi dưỡng. Cần bảng tổng hợp theo từng cơ sở.',
      },
      {
        khoan: '6.2',
        nhan: 'Cơ sở vật chất: diện tích đất và bình quân/trẻ so với mức tối thiểu; số lượng hạng mục các khối phòng; thiết bị, đồ dùng, đồ chơi; đồ chơi ngoài trời',
        trangThai: 'thieu',
        ghiChu: 'Chưa có số m² đất, sàn, số phòng. Cần theo từng cơ sở mầm non.',
      },
      {
        khoan: '6.3',
        nhan: 'Kết quả tự đánh giá và kiểm định chất lượng giáo dục; đạt chuẩn quốc gia; kế hoạch cải tiến',
        trangThai: 'thieu',
        ghiChu: 'Chưa thấy thông tin kiểm định ở bất kỳ trang nào. Nếu CHƯA kiểm định thì phải ghi đúng như vậy, đừng bỏ trống. Cần xác nhận từng trường.',
      },
      {
        khoan: '6.4',
        nhan: 'Chương trình nước ngoài / tích hợp: tên chương trình, quốc gia, đối tác liên kết, tổ chức kiểm định nước ngoài, ngôn ngữ giảng dạy',
        trangThai: 'thieu',
        ghiChu: 'ĐÃ GỠ giá trị cũ ("OIC kết hợp chương trình Bộ GD&ĐT"). Anh Hùng Tiến 03/11/2026 (file đối chiếu): CHƯA được quảng cáo dạy tích hợp vì chưa được thẩm định, cấp phép — Sở chưa tiếp nhận hồ sơ do chưa có quy định đơn vị thẩm định. Chờ anh Dương/anh Hùng chốt câu ghi ở mục này (vd "Không áp dụng"). Trước đây: Trang chủ ghi "Được công nhận & hợp tác bởi Franklin Covey, Oxford University Press". Thông tư đòi nêu ĐÚNG bản chất quan hệ (liên kết giáo dục? mua bản quyền?), quốc gia và văn bản phê duyệt. Cần hợp đồng/văn bản gốc.',
      },
    ],
  },

  // ─────────────────────────── Điều 7 — Mầm non ──────────────────────────
  {
    id: 'mam-non-ket-qua',
    dieu: 'Điều 7',
    tieuDe: 'Giáo dục mầm non — kế hoạch và kết quả hoạt động',
    muc: [
      {
        khoan: '7.1.a',
        nhan: 'Kế hoạch tuyển sinh: đối tượng, chỉ tiêu, phương thức, mốc thời gian',
        lien: { text: 'Tuyển sinh mầm non', href: '/tuyen-sinh/mam-non' },
        giaTri: 'Nhận trẻ từ 12 tháng tuổi.',
        trangThai: 'xacnhan',
        ghiChu: 'Có độ tuổi và phương thức đăng ký, THIẾU chỉ tiêu cụ thể theo cơ sở và mốc thời gian.',
      },
      {
        khoan: '7.1.b–đ',
        nhan: 'Kế hoạch nuôi dưỡng – chăm sóc – giáo dục; quy chế phối hợp với gia đình và xã hội; thực đơn hằng ngày; các dịch vụ mầm non',
        lien: { text: 'Chương trình mầm non', href: '/mam-non' },
        trangThai: 'xacnhan',
        ghiChu: 'Thực đơn hằng ngày phải đăng thường xuyên (trước thứ Bảy tuần trước), kế hoạch tháng trước ngày 25 tháng trước — cần quy trình/người phụ trách riêng, không đăng tay một lần.',
      },
      {
        khoan: '7.2',
        nhan: 'Kết quả năm học trước: tổng số trẻ, số nhóm lớp, bình quân trẻ/lớp; số trẻ học 02 buổi/ngày; số trẻ bán trú; số trẻ được theo dõi sức khỏe; kết quả phổ cập 5 tuổi; số trẻ khuyết tật',
        trangThai: 'thieu',
        ghiChu: 'Chưa có số liệu năm học 2025–2026. Cần theo từng cơ sở mầm non.',
      },
      {
        khoan: '7.3',
        nhan: 'Số trẻ đang học chia theo người Việt Nam và người nước ngoài (do có chương trình tích hợp)',
        trangThai: 'thieu',
        ghiChu: 'Chưa có.',
      },
    ],
  },

  // ─────────────────────────── Điều 8 — Phổ thông ────────────────────────
  {
    id: 'pho-thong-dieu-kien',
    dieu: 'Điều 8',
    tieuDe: 'Giáo dục phổ thông — điều kiện bảo đảm chất lượng',
    moTa: 'Số liệu dưới đây là của cơ sở Gò Vấp (trụ sở chính). Số liệu của các cơ sở và trường khác đang được cập nhật.',
    muc: [
      {
        khoan: '8.1',
        nhan: 'Đội ngũ giáo viên, cán bộ quản lý, nhân viên: số lượng theo nhóm vị trí và trình độ; tỷ lệ đạt chuẩn nghề nghiệp; tỷ lệ hoàn thành bồi dưỡng hằng năm',
        lien: { text: 'Đội ngũ giáo viên', href: '/giao-vien' },
        giaTri: 'Năm học 2025–2026: 84 cán bộ, giáo viên, nhân viên — 70 giáo viên cơ hữu người Việt Nam (đã gồm 3 cán bộ quản lý), 5 giáo viên người nước ngoài, 9 nhân viên; không có giáo viên thỉnh giảng. 100% giáo viên cơ hữu đủ chuẩn văn bằng, đạt chuẩn nghề nghiệp và tham gia BHXH; 5/5 giáo viên nước ngoài có giấy phép lao động còn hiệu lực. Trình độ giáo viên người Việt Nam: 56 đại học, 11 thạc sĩ; cán bộ quản lý: 1 đại học, 2 thạc sĩ.',
        cacDong: [
          { nhan: 'Cán bộ quản lý (Hiệu trưởng, Phó hiệu trưởng)', noiDung: '3 người; 100% đạt chuẩn trình độ đào tạo (1 đại học, 2 thạc sĩ).' },
          { nhan: 'Giáo viên người Việt Nam — tiểu học', noiDung: '16 người; 100% đạt chuẩn trình độ (15 đại học, 1 thạc sĩ).' },
          { nhan: 'Giáo viên người Việt Nam — THCS, THPT', noiDung: '51 người; 100% đạt chuẩn trình độ (41 đại học, 10 thạc sĩ).' },
          { nhan: 'Giáo viên người nước ngoài', noiDung: '5 người; 100% đạt chuẩn trình độ (5 đại học).' },
          { nhan: 'Nhân viên (kế toán, học vụ, hành chính nhân sự, y tế, phòng thí nghiệm)', noiDung: '9 người; 100% đạt chuẩn trình độ (9 đại học).' },
          { nhan: 'Chuẩn nghề nghiệp và bồi dưỡng', noiDung: 'Giáo viên được đánh giá hằng năm theo Thông tư 20/2018/TT-BGDĐT; Hiệu trưởng, Phó hiệu trưởng theo Thông tư 14/2018/TT-BGDĐT. 100% cán bộ quản lý và giáo viên đạt chuẩn nghề nghiệp, 100% hoàn thành bồi dưỡng thường xuyên. Trọng tâm bồi dưỡng năm học: ứng dụng trí tuệ nhân tạo trong dạy học, Kỷ luật tích cực, Giáo dục cảm xúc – xã hội, phương pháp Leader in Me.' },
        ],
        trangThai: 'co',
        ghiChu: 'Nguồn: BC 009/BC-VA mục II (cơ sở Gò Vấp). Chuẩn nghề nghiệp theo TT20/2018, chuẩn hiệu trưởng theo TT14/2018. Không đăng điện thoại/email cá nhân của giáo viên lên trang này.',
      },
      {
        khoan: '8.2',
        nhan: 'Cơ sở vật chất: diện tích đất và bình quân/học sinh so với mức tối thiểu; số lượng khối phòng học tập, hỗ trợ học tập, sân chơi thể thao; thiết bị dạy học; danh mục sách giáo khoa và xuất bản phẩm tham khảo',
        // CLB thể thao: anh Dương 03/11/2026 "CLB thể thao thì Văn đã có, bổ sung vào". Nguồn: Downloads/
        // 'TKB CLB Thể thao VAGV 2026-2027.xlsx' (tab Hướng dẫn — số sân/phòng anh Dương cung cấp 9/2026)
        // và 'CLB_The_Thao_Binh_Tan_va_Go_Vap.xlsx'; danh sách CLB Gò Vấp khớp bài chiêu sinh 6 CLB.
        cacDong: [
          { nhan: 'Cơ sở Gò Vấp (trụ sở chính)', noiDung: '160/72 Phan Huy Ích, phường An Hội Tây, TP. Hồ Chí Minh. Các số liệu dưới đây là của cơ sở này.' },
          { nhan: 'Diện tích', noiDung: 'Đất 2.150 m²; sàn xây dựng 10.000 m²; bình quân khoảng 18 m² sàn/học sinh (550 học sinh năm học 2026–2027).' },
          { nhan: 'Phòng học', noiDung: '22 phòng.' },
          { nhan: 'Phòng bộ môn', noiDung: '7 phòng (Lý, Hóa, Sinh, Công nghệ, Tin học, Ngoại ngữ, Âm nhạc, Mỹ thuật, STEM).' },
          { nhan: 'Khối hỗ trợ học tập', noiDung: '5 phòng (thư viện, thiết bị, tư vấn học đường, Đoàn – Đội).' },
          { nhan: 'Khối hành chính – quản trị', noiDung: '6 phòng (gồm phòng y tế).' },
          { nhan: 'Sân chơi, thể dục thể thao', noiDung: '2 khu, mỗi khu khoảng 700 m². Gồm 1 sân bóng đá 5 người; nhà thi đấu 3 sân cầu lông (dùng chung cho bóng rổ); 1 phòng tập gym; 1 sàn võ; 1 bàn bóng bàn; 1 phòng tập nhảy.' },
          { nhan: 'Khối phục vụ bán trú, nội trú', noiDung: '7 hạng mục (bếp, nhà ăn, phòng ở).' },
          { nhan: 'Giáo viên có chỗ làm việc riêng', noiDung: '100%.' },
          { nhan: 'Thiết bị dạy học', noiDung: 'Thiết bị dạy học tối thiểu các khối lớp được trang bị theo danh mục của Bộ Giáo dục và Đào tạo.' },
          { nhan: 'Câu lạc bộ thể thao ngoài giờ năm học 2026–2027', noiDung: 'Thứ Hai đến Thứ Sáu, sau giờ học (từ 16:15). Cơ sở Gò Vấp: bóng đá, bóng rổ, bóng chuyền, cầu lông, Brazilian Jiu-Jitsu (BJJ), yoga. Cơ sở Bình Tân: bóng đá, bơi, bóng bàn.' },
        ],
        giaTri: 'Nhà trường sử dụng bộ sách giáo khoa "Kết nối tri thức với cuộc sống"; danh mục sách giáo khoa và xuất bản phẩm tham khảo sẽ được công bố riêng.',
        trangThai: 'xacnhan',
        ghiChu: 'Nguồn: BC 009/BC-VA mục III (số liệu cơ sở Gò Vấp); danh mục SGK đầy đủ lớp 1–5 có trong BC. CÒN THIẾU: khối phục vụ sinh hoạt/ký túc xá chi tiết, danh mục thiết bị dạy học theo khối, số bản sách/học sinh ở thư viện; sân/phòng thể thao và CSVC cơ sở Bình Tân (nếu đưa Bình Tân vào — chờ chốt phạm vi cơ sở).',
      },
      {
        khoan: '8.3',
        nhan: 'Kết quả tự đánh giá và kiểm định chất lượng giáo dục; đạt chuẩn quốc gia; kế hoạch cải tiến',
        giaTri: 'Trường chưa đạt chuẩn quốc gia. Lần đánh giá ngoài gần nhất năm 2021: đạt kiểm định chất lượng giáo dục Cấp độ 1 theo Quyết định số 1574-98/QĐ-SGDĐT ngày 25/06/2021 của Sở GD&ĐT TP. Hồ Chí Minh. Tiêu chuẩn áp dụng: Thông tư 18/2018/TT-BGDĐT (THCS, THPT và trường phổ thông có nhiều cấp học) và 17/2018/TT-BGDĐT (tiểu học). Từ ngày 07/7/2026, nhà trường triển khai bảo đảm chất lượng theo Thông tư 57/2026/TT-BGDĐT: tự đánh giá hằng năm theo 4 tiêu chuẩn, 15 tiêu chí; Hội đồng tự đánh giá thông qua báo cáo trước ngày 15/6/2027. Báo cáo tự đánh giá, kế hoạch cải tiến và kết quả thực hiện sẽ được công khai trên cổng thông tin điện tử của trường. Mục tiêu: tích lũy đủ dữ liệu 3 năm học liên tiếp để đề nghị công nhận đạt chuẩn quốc gia.',
        trangThai: 'xacnhan',
        ghiChu: 'Nguồn: BC 009/BC-VA mục IV. Còn thiếu: bảng kết quả tự đánh giá năm học 2025–2026 theo mức (BC để trống) và kế hoạch cải tiến cụ thể.',
      },
      {
        khoan: '8.4',
        nhan: 'Chương trình nước ngoài / tích hợp: tên, quốc gia, đối tác liên kết, tổ chức kiểm định nước ngoài, ngôn ngữ',
        giaTri: 'Không áp dụng. Nhà trường thực hiện 100% Chương trình giáo dục phổ thông của Bộ GD&ĐT ở cả ba cấp học; không thực hiện chương trình giáo dục nước ngoài hay chương trình tích hợp. Tiếng Anh được tăng cường bằng học liệu quốc tế (Oxford, Cambridge) với vai trò học liệu bổ trợ, không phải chương trình tích hợp.',
        trangThai: 'co',
        ghiChu: 'Nguồn: BC 009/BC-VA mục I.7.e — khẳng định chính thức "trường không thực hiện chương trình nước ngoài hay chương trình tích hợp". Khớp ý anh Hùng Tiến 03/11. Giải quyết mục để trống trước đây (6.4/8.4).',
      },
    ],
  },

  // ─────────────────────────── Điều 9 — Phổ thông ────────────────────────
  {
    id: 'pho-thong-ket-qua',
    dieu: 'Điều 9',
    tieuDe: 'Giáo dục phổ thông — kế hoạch và kết quả hoạt động',
    moTa: 'Số liệu dưới đây là của cơ sở Gò Vấp (trụ sở chính).',
    muc: [
      {
        khoan: '9.1',
        nhan: 'Kế hoạch năm học: tuyển sinh (đối tượng, chỉ tiêu, phương thức, mốc thời gian); kế hoạch giáo dục; quy chế phối hợp với gia đình; các chương trình hỗ trợ học tập; thực đơn hằng ngày (nếu có)',
        lien: { text: 'Tuyển sinh', href: '/tuyen-sinh' },
        trangThai: 'xacnhan',
        ghiChu: 'Có trang tuyển sinh theo cấp, THIẾU chỉ tiêu cụ thể theo khối/cơ sở và kế hoạch giáo dục năm học.',
      },
      {
        khoan: '9.2.a–b',
        nhan: 'Kết quả tuyển sinh; tổng số học sinh theo khối; bình quân học sinh/lớp; nam/nữ; dân tộc thiểu số; khuyết tật; chuyển trường; thống kê kết quả đánh giá, lên lớp',
        cacDong: [
          { nhan: 'Quy mô năm học 2025–2026', noiDung: '35 lớp, 609 học sinh (344 nam, 265 nữ), bình quân 17,4 học sinh/lớp; 100% học sinh học 2 buổi/ngày; 17 học sinh dân tộc thiểu số; không có học sinh khuyết tật học hòa nhập; 9 học sinh chuyển đi, 7 học sinh chuyển đến.' },
          { nhan: 'Tuyển sinh đầu cấp 2025–2026', noiDung: 'Lớp 1: 21 học sinh; lớp 6: 55 học sinh; lớp 10: 29 học sinh.' },
          { nhan: 'Tiểu học — đánh giá theo Thông tư 27/2020/TT-BGDĐT', noiDung: 'Hoàn thành xuất sắc 56,6%; hoàn thành tốt 22,1%; hoàn thành 21,3%; chưa hoàn thành 0%.' },
          { nhan: 'THCS — đánh giá theo Thông tư 22/2021/TT-BGDĐT', noiDung: 'Lên lớp 100%; học sinh Xuất sắc 21,58%; học sinh Giỏi 40,25%; lưu ban 0%.' },
          { nhan: 'THPT — đánh giá theo Thông tư 22/2021/TT-BGDĐT', noiDung: 'Lên lớp 100%; học sinh Xuất sắc 21,57% (55 em); học sinh Giỏi 36,08% (92 em); lưu ban 0%.' },
        ],
        giaTri: 'Năm học 2026–2027 (cơ sở Gò Vấp): 37 lớp, 550 học sinh (300 nam, 250 nữ), bình quân 14,9 học sinh/lớp; tất cả các khối tổ chức bán trú, khối 6–12 có nội trú; không có học sinh khuyết tật học hòa nhập. Tốt nghiệp: lớp 9 được công nhận tốt nghiệp THCS 40 (2024–2025) và 65 (2025–2026); lớp 5 hoàn thành chương trình tiểu học 23/23.',
        trangThai: 'xacnhan',
        ghiChu: 'Nguồn: BC 009/BC-VA mục V (cơ sở Gò Vấp, theo biểu mẫu báo cáo Sở ngày 06/10/2026). Còn thiếu: số HS dân tộc thiểu số, chuyển trường đi/đến, thống kê kết quả đánh giá – lên lớp theo khối.',
      },
      {
        khoan: '9.2.c',
        nhan: 'Số học sinh hoàn thành chương trình, được cấp bằng tốt nghiệp; số trúng tuyển cơ sở giáo dục nghề nghiệp; số trúng tuyển đại học (cấp THPT)',
        giaTri: 'Lớp 12 tốt nghiệp THPT: 94 học sinh (2024–2025) và 110 học sinh (2025–2026), tỷ lệ tốt nghiệp 100%. Hoàn thành chương trình tiểu học (lớp 5): 23 học sinh; được công nhận tốt nghiệp THCS (lớp 9): 65 học sinh (năm học 2025–2026).',
        trangThai: 'xacnhan',
        ghiChu: '[10/11 anh Dương: số trúng tuyển đại học "chưa có thì ẩn đi" → giữ như hiện tại, không nêu số/tỷ lệ; cô Tuyền cung cấp số thì mới điền.] Nguồn: BC 009/BC-VA mục V.d — có số tốt nghiệp THPT (100%) nhưng CỘT TRÚNG TUYỂN ĐẠI HỌC ĐỂ TRỐNG, nên CHƯA có số gốc cho "vào đại học". Tỷ lệ "100%/99% vào đại học" ĐÃ gỡ khỏi trang chủ, /gioi-thieu, /trung-hoc-pho-thong. Còn sót (chờ gỡ): /oxford-pathway-go-vap (noindex) và tiêu đề "99% phụ huynh sai lầm" ở /tuyen-sinh/thcs-uu-dai-vang. Cần số trúng tuyển ĐH thật trước khi nêu tỷ lệ.',
      },
      {
        khoan: '9.2.b (thống kê)',
        nhan: 'Thống kê số học sinh, kết quả rèn luyện và học tập năm học 2025–2026 theo khối (cấp THCS và THPT)',
        cacDong: [
          { nhan: 'Khối 6', noiDung: '55 học sinh (24 nữ, 31 nam, 5 dân tộc thiểu số); rèn luyện: Tốt 55, Khá 0, Đạt 0; học tập: Tốt 42, Khá 10, Đạt 3, Chưa đạt 0.' },
          { nhan: 'Khối 7', noiDung: '56 học sinh (22 nữ, 34 nam); rèn luyện: Tốt 56, Khá 0, Đạt 0; học tập: Tốt 34, Khá 16, Đạt 6, Chưa đạt 0.' },
          { nhan: 'Khối 8', noiDung: '65 học sinh (28 nữ, 37 nam); rèn luyện: Tốt 65, Khá 0, Đạt 0; học tập: Tốt 43, Khá 20, Đạt 2, Chưa đạt 0.' },
          { nhan: 'Khối 9', noiDung: '65 học sinh (26 nữ, 39 nam, 1 dân tộc thiểu số); rèn luyện: Tốt 65, Khá 0, Đạt 0; học tập: Tốt 41, Khá 18, Đạt 6, Chưa đạt 0.' },
          { nhan: 'Tổng THCS', noiDung: '241 học sinh (100 nữ, 141 nam, 6 dân tộc thiểu số); rèn luyện: Tốt 241, Khá 0, Đạt 0; học tập: Tốt 160, Khá 64, Đạt 17, Chưa đạt 0.' },
          { nhan: 'Khối 10', noiDung: '29 học sinh (9 nữ, 20 nam); rèn luyện: Tốt 27, Khá 2, Đạt 0; học tập: Tốt 18, Khá 9, Đạt 2, Chưa đạt 0.' },
          { nhan: 'Khối 11', noiDung: '116 học sinh (52 nữ, 64 nam, 3 dân tộc thiểu số); rèn luyện: Tốt 110, Khá 3, Đạt 3; học tập: Tốt 71, Khá 38, Đạt 7, Chưa đạt 0.' },
          { nhan: 'Khối 12', noiDung: '110 học sinh (49 nữ, 61 nam, 7 dân tộc thiểu số); rèn luyện: Tốt 107, Khá 3, Đạt 0; học tập: Tốt 66, Khá 41, Đạt 3, Chưa đạt 0.' },
          { nhan: 'Tổng THPT', noiDung: '255 học sinh (110 nữ, 145 nam, 10 dân tộc thiểu số); rèn luyện: Tốt 244, Khá 8, Đạt 3; học tập: Tốt 155, Khá 88, Đạt 12, Chưa đạt 0.' },
        ],
        giaTri: 'Số liệu cuối năm học 2025–2026 theo biểu mẫu thống kê của nhà trường. Cấp tiểu học đang cập nhật.',
        trangThai: 'xacnhan',
        ghiChu: 'Nguồn: mau-thong-ke-2025-2026.xlsx (Văn bỏ vào Desktop\Giấy phép hoạt động 11/11). KHÔNG đăng cột "được lên lớp" vì Khối 9/10/12 mỗi khối có 1 em bỏ học nhưng số lên lớp = sĩ số. Chưa rõ phạm vi (Gò Vấp hay cả Bình Tân).',
      },
      {
        khoan: '9.3',
        nhan: 'Số học sinh đang học chia theo người Việt Nam và người nước ngoài',
        giaTri: 'Năm học 2026–2027 (cơ sở Gò Vấp): 7 học sinh mang quốc tịch nước ngoài (Ma-lai-xi-a, Úc, Trung Quốc, Vương quốc Anh, Liên bang Nga); các học sinh còn lại mang quốc tịch Việt Nam.',
        trangThai: 'co',
        ghiChu: 'Nguồn: BC 009/BC-VA mục V.',
      },
    ],
  },
];

export const tongMuc = nhomCongKhai.flatMap((n) => n.muc).length;
export const thongKeTrangThai = nhomCongKhai
  .flatMap((n) => n.muc)
  .reduce(
    (acc, m) => {
      acc[m.trangThai] += 1;
      return acc;
    },
    { co: 0, xacnhan: 0, thieu: 0 } as Record<TrangThai, number>,
  );

// Lịch công khai theo Điều 14, 15 — hiển thị ở cuối trang.
export const lichCongKhai = [
  { moc: 'Trước 30/6 hằng năm', viec: 'Công bố nội dung công khai (Chương II) và báo cáo thường niên PDF của năm trước theo mẫu Phụ lục I.' },
  { moc: 'Trong 10 ngày làm việc', viec: 'Cập nhật khi thông tin thay đổi hoặc khi có thông tin chính thức.' },
  { moc: 'Trước ngày 25 hằng tháng', viec: 'Mầm non: công khai kế hoạch giáo dục của tháng sau.' },
  { moc: 'Trước thứ Bảy hằng tuần', viec: 'Mầm non và phổ thông: công khai dự kiến thực đơn của tuần sau; mầm non thêm kế hoạch giáo dục tuần, ngày.' },
  { moc: 'Tháng đầu năm học', viec: 'Phổ biến nội dung công khai tại họp cha mẹ học sinh hoặc phát tài liệu.' },
  { moc: 'Tối thiểu 05 năm', viec: 'Thời gian lưu thông tin công khai trên cổng thông tin điện tử.' },
];
