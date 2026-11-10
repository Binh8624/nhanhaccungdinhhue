/**
 * Dữ liệu Kho Lưu Trữ Số Di Sản (Digital Archive)
 * Phân loại: Văn bản Hán Nôm, Bài viết nghiên cứu, Bản thu âm thanh, Hình ảnh tư liệu, Video diễn xướng
 */

export interface ArchiveItem {
  id: string;
  archiveCode: string;
  title: string;
  category: 'Văn bản & Thư tịch cổ' | 'Hình ảnh tư liệu' | 'Bản thu âm thanh' | 'Video diễn xướng' | 'Nghiên cứu khoa học';
  era: 'Thời Hậu Lê' | 'Thời Chúa Nguyễn' | 'Triều Nguyễn (1802-1945)' | 'Thời kỳ phục hồi (1990-2003)' | 'Đương đại (Sau UNESCO)';
  location: string;
  authorOrSource: string;
  year: string;
  description: string;
  historicalValue: string;
  accessStatus: 'Công khai tra cứu' | 'Tư liệu lưu trữ bảo tồn' | 'Bản quyền số hóa';
  academicClassification: 'Dữ liệu lịch sử đã kiểm chứng' | 'Tư liệu phục dựng số' | 'Tư liệu khảo sát điền dã';
  preservationStatus: string;
  primarySourceCitation: string;
  tags: string[];
  image: string;
  imageProvenance: 'Ảnh tư liệu lưu trữ' | 'Ảnh phục dựng số học thuật';
}

export const ARCHIVE_ITEMS: ArchiveItem[] = [
  {
    id: 'arc-01',
    archiveCode: 'HMC-DOC-1851',
    title: 'Khâm Định Đại Nam Hội Điển Sự Lệ – Quyển Lễ Nhạc',
    category: 'Văn bản & Thư tịch cổ',
    era: 'Triều Nguyễn (1802-1945)',
    location: 'Điện Thái Hòa & Viện Cơ Mật, Thành phố Huế, Việt Nam',
    authorOrSource: 'Quốc Sử Quán Triều Nguyễn biên soạn (Năm Thiệu Trị thứ 3 - Tự Đức)',
    year: '1851 (Bản dịch Viện Sử học)',
    description: 'Bộ chính sử đồ sộ quy định chi tiết toàn bộ điển chế, biên chế nhạc công, thứ bậc phẩm hàm, sắc phục múa hát và danh mục các bản nhạc bắt buộc cho từng nghi lễ tế tự hoàng gia triều Nguyễn.',
    historicalValue: 'Căn cứ pháp lý và văn bản quy phạm gốc cao nhất để phục dựng chính xác các bài bản Nhã nhạc cung đình.',
    accessStatus: 'Công khai tra cứu',
    academicClassification: 'Dữ liệu lịch sử đã kiểm chứng',
    preservationStatus: 'Bảo quản bản gốc tại Trung tâm Lưu trữ Quốc gia I & Thư viện Viện Sử học',
    primarySourceCitation: 'Khâm Định Đại Nam Hội Điển Sự Lệ, Quyển 95-98 (Mục Lễ Nhạc và Nhạc Khí triều đình)',
    tags: ['Điển chế', 'Triều Nguyễn', 'Hán Nôm', 'Lễ nhạc'],
    image: '/src/assets/images/duyet_thi_duong_theater_1793928493481.jpg',
    imageProvenance: 'Ảnh tư liệu lưu trữ'
  },
  {
    id: 'arc-02',
    archiveCode: 'HMC-MSS-1995',
    title: 'Bản Ký Âm Ngũ Cung Truyền Khẩu: Mười Bản Ngự (Thập Thủ Liên Hoàn)',
    category: 'Văn bản & Thư tịch cổ',
    era: 'Thời kỳ phục hồi (1990-2003)',
    location: 'Thế Lại Thượng, Thành phố Huế, Việt Nam',
    authorOrSource: 'Cố NNƯT Lữ Hữu Thi & Cố NSƯT Trần Kích ký âm truyền khẩu',
    year: '1995',
    description: 'Bản ghi chép thủ công hệ thống ký âm chữ Hán (Hò, Xự, Xang, Xê, Cống, Phan, Lục) của mười bản ngự thiện cung đình: Phẩm Tuyết, Nguyên Tiêu, Hồ Quảng, Liên Hoàn, Bình Bán, Tây Mai, Kim Tiền, Xuân Phong, Long Hổ, Tẩu Mã.',
    historicalValue: 'Cứu vãn kho tàng bài bản bác học đứng trước nguy cơ thất truyền sau năm 1945.',
    accessStatus: 'Tư liệu lưu trữ bảo tồn',
    academicClassification: 'Dữ liệu lịch sử đã kiểm chứng',
    preservationStatus: 'Lưu trữ bản thảo tại Viện Âm nhạc Việt Nam & gia tộc nghệ nhân tại Huế',
    primarySourceCitation: 'Tập ký âm bài bản cổ truyền Cố đô Huế, Cố GS.TS Trần Văn Khê hiệu đính 1998',
    tags: ['Ký âm cổ', 'Mười bản ngự', 'Nghệ nhân', 'Ngũ cung'],
    image: '/src/assets/images/royal_instruments_still_life_1793928495633.jpg',
    imageProvenance: 'Ảnh tư liệu lưu trữ'
  },
  {
    id: 'arc-03',
    archiveCode: 'HMC-UNESCO-2003',
    title: 'Hồ Sơ Đệ Trình UNESCO Công Nhận Kiệt Tác Di Sản Thế Giới',
    category: 'Nghiên cứu khoa học',
    era: 'Thời kỳ phục hồi (1990-2003)',
    location: 'Paris (Pháp) & Cố đô Huế, Việt Nam',
    authorOrSource: 'Bộ Văn hóa Thông tin, Viện Âm nhạc & Cố GS.TS Trần Văn Khê',
    year: '2003',
    description: 'Hồ sơ khoa học toàn diện gồm luận chứng lịch sử, thẩm định âm học, băng ghi âm điền dã và danh sách nghệ nhân cung đình cuối cùng, dẫn đến quyết định lịch sử ngày 7/11/2003 vinh danh Nhã nhạc tại Paris.',
    historicalValue: 'Dấu mốc đưa di sản phi vật thể đầu tiên của Việt Nam vươn tầm thế giới.',
    accessStatus: 'Công khai tra cứu',
    academicClassification: 'Dữ liệu lịch sử đã kiểm chứng',
    preservationStatus: 'Lưu trữ công khai tại Cơ sở dữ liệu Di sản Phi vật thể UNESCO (RL/00074)',
    primarySourceCitation: 'UNESCO Nomination File No. 00074 for Inscription on the Representative List',
    tags: ['UNESCO', 'Hồ sơ khoa học', 'Trần Văn Khê', 'Di sản thế giới'],
    image: '/src/assets/images/hero_nha_nhac_hue_1793928492915.jpg',
    imageProvenance: 'Ảnh tư liệu lưu trữ'
  },
  {
    id: 'arc-04',
    archiveCode: 'HMC-AUD-2018',
    title: 'Hòa Tấu Đăng Đàn Cung Tại Duyệt Thị Đường (Bản Thu Mẫu Mực)',
    category: 'Bản thu âm thanh',
    era: 'Đương đại (Sau UNESCO)',
    location: 'Nhà hát Duyệt Thị Đường, Hoàng thành Huế, Việt Nam',
    authorOrSource: 'Nhà hát Nghệ thuật Truyền thống Cung đình Huế',
    year: '2018',
    description: 'Bản hòa âm phối khí đầy đủ hai dàn Đại nhạc và Tiểu nhạc, phục dựng nguyên bản quốc thiều triều Nguyễn với tiếng kèn bầu lĩnh xướng hùng tráng hòa nhịp cùng tiếng trống chiến và chuông đồng.',
    historicalValue: 'Chuẩn mực âm thanh tham chiếu cho các đoàn nghệ thuật truyền thống trong và ngoài nước.',
    accessStatus: 'Bản quyền số hóa',
    academicClassification: 'Tư liệu phục dựng số',
    preservationStatus: 'Kho âm thanh số độ phân giải cao tại Nhà hát Duyệt Thị Đường',
    primarySourceCitation: 'Chương trình bảo tồn âm thanh chuẩn mực Nhã nhạc Cung đình Huế (Dự án UNESCO 2005-2008 kế thừa)',
    tags: ['Đăng Đàn Cung', 'Âm thanh mẫu mực', 'Duyệt Thị Đường', 'Đại nhạc'],
    image: '/src/assets/images/duyet_thi_duong_theater_1793928493481.jpg',
    imageProvenance: 'Ảnh tư liệu lưu trữ'
  },
  {
    id: 'arc-05',
    archiveCode: 'HMC-VID-2022',
    title: 'Ghi Hình Phục Dựng Đại Lễ Tế Nam Giao (Giao Nhạc)',
    category: 'Video diễn xướng',
    era: 'Đương đại (Sau UNESCO)',
    location: 'Đàn Nam Giao, phường An Cựu, Thành phố Huế, Việt Nam',
    authorOrSource: 'Trung tâm Bảo tồn Di tích Cố đô Huế & Đài Truyền hình Việt Nam',
    year: '2022',
    description: 'Thước phim tư liệu phục dựng toàn cảnh lễ Tế Giao lúc rạng sáng, tái hiện vị trí đối xứng của hàng trăm nhạc sinh trên ba tầng đàn Viên Đàn, Phương Đàn theo nguyên lý Càn Khôn vũ trụ.',
    historicalValue: 'Tư liệu trực quan sống động nhất về đại lễ tế ngoài trời quy mô lớn nhất triều Nguyễn.',
    accessStatus: 'Công khai tra cứu',
    academicClassification: 'Tư liệu phục dựng số',
    preservationStatus: 'Lưu trữ tại Trung tâm Tư liệu Cố đô Huế & VTV',
    primarySourceCitation: 'Festival Huế 2022 – Đề án Phục dựng Lễ hội Cung đình Triều Nguyễn',
    tags: ['Đàn Nam Giao', 'Tế Giao', 'Video', 'Nghi lễ vương triều'],
    image: '/src/assets/images/nam_giao_altar_hue_1793952638343.jpg',
    imageProvenance: 'Ảnh tư liệu lưu trữ'
  },
  {
    id: 'arc-06',
    archiveCode: 'HMC-ART-1845',
    title: 'Bộ Sưu Tập Nhạc Khí Cung Đình Triều Nguyễn Tại Điện Long An',
    category: 'Hình ảnh tư liệu',
    era: 'Triều Nguyễn (1802-1945)',
    location: 'Bảo tàng Cổ vật Cung đình Huế (Số 3 Lê Trực, Thành phố Huế, Việt Nam)',
    authorOrSource: 'Bảo tàng Cổ vật Cung đình Huế',
    year: 'Thời vua Thiệu Trị – Khải Định (Thế kỷ XIX – XX)',
    description: 'Bộ ảnh hiện vật nguyên bản gồm: Trống chiến chạm rồng mạ vàng, Đàn tỳ bà khảm xà cừ hoa sen, Chuông đồng biên chung và Khánh đá biên khánh từ các đàn tế và miếu thờ hoàng tộc.',
    historicalValue: 'Minh chứng vật thể xác thực tuyệt đối về trình độ mỹ thuật và kỹ thuật đúc đồng chế tác nhạc khí Việt Nam thế kỷ XIX.',
    accessStatus: 'Công khai tra cứu',
    academicClassification: 'Dữ liệu lịch sử đã kiểm chứng',
    preservationStatus: 'Bảo quản hiện vật thực tế nghiêm ngặt tại Bảo tàng Cổ vật Cung đình Huế',
    primarySourceCitation: 'Danh mục Hiện vật Quốc gia – Bảo tàng Cổ vật Cung đình Huế (Điện Long An)',
    tags: ['Hiện vật', 'Bảo tàng Cổ vật', 'Điện Long An', 'Nhạc khí'],
    image: '/src/assets/images/royal_instruments_still_life_1793928495633.jpg',
    imageProvenance: 'Ảnh tư liệu lưu trữ'
  },
  {
    id: 'arc-07',
    archiveCode: 'HMC-SCI-1998',
    title: 'Khảo Cứu Âm Luật Ngũ Cung & Điệu Thức Xứ Huế',
    category: 'Nghiên cứu khoa học',
    era: 'Thời kỳ phục hồi (1990-2003)',
    location: 'Học viện Âm nhạc Huế & Nhạc viện Quốc gia, Thành phố Huế, Việt Nam',
    authorOrSource: 'Cố GS.TS Trần Văn Khê & các nhà nghiên cứu âm nhạc cổ truyền',
    year: '1998',
    description: 'Công trình phân tích khoa học về cao độ Hertz của các vi âm (microtones), kỹ thuật nhấn nhá rung ngón của đàn nguyệt và đàn tranh tạo nên sắc thái Nam oán độc nhất vô nhị của âm nhạc Cố đô.',
    historicalValue: 'Nền tảng lý luận âm nhạc học giúp bảo vệ tính xác thực của thang âm ngũ cung trước xu hướng bình quân luật hóa phương Tây.',
    accessStatus: 'Công khai tra cứu',
    academicClassification: 'Dữ liệu lịch sử đã kiểm chứng',
    preservationStatus: 'Ấn phẩm nghiên cứu lưu trữ tại Thư viện Quốc gia Việt Nam',
    primarySourceCitation: 'Trần Văn Khê, "Thang âm điệu thức truyền thống Việt Nam và Nhã nhạc Cung đình Huế", 1998',
    tags: ['Âm luật', 'Ngũ cung', 'Nam oán', 'Nghiên cứu'],
    image: '/src/assets/images/master_artisan_portrait_1793928495965.jpg',
    imageProvenance: 'Ảnh tư liệu lưu trữ'
  },
  {
    id: 'arc-08',
    archiveCode: 'HMC-DNC-1917',
    title: 'Vũ Đạo Lục Cúng Hoa Đăng: Bản Vẽ Đội Hình Chuyển Thế Chữ Hán',
    category: 'Văn bản & Thư tịch cổ',
    era: 'Triều Nguyễn (1802-1945)',
    location: 'Tử Cấm Thành, Thành phố Huế, Việt Nam',
    authorOrSource: 'Thự Hòa Thanh triều Nguyễn',
    year: '1917 (Triều vua Khải Định)',
    description: 'Bản vẽ đồ giải trận múa hoa sen chuyển đổi đội hình từ vòng hoa đăng nở rộ sang thế kết chữ "Thái Bình", "Vạn Tuế", "Thiên Thu" chúc thọ hoàng gia và quốc gia thái bình.',
    historicalValue: 'Cơ sở vũ đạo học duy nhất phục dựng chuẩn mực điệu múa hoa đăng mẫu mực.',
    accessStatus: 'Tư liệu lưu trữ bảo tồn',
    academicClassification: 'Dữ liệu lịch sử đã kiểm chứng',
    preservationStatus: 'Bảo quản tại Trung tâm Bảo tồn Di tích Cố đô Huế',
    primarySourceCitation: 'Hồ sơ Thự Hòa Thanh thời Khải Định – Lưu trữ Hoàng gia triều Nguyễn',
    tags: ['Múa cung đình', 'Lục Cúng Hoa Đăng', 'Đồ giải vũ đạo', 'Khải Định'],
    image: '/src/assets/images/luc_cung_hoa_dang_dance_1793928496126.jpg',
    imageProvenance: 'Ảnh tư liệu lưu trữ'
  }
];
