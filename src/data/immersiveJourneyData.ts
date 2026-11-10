/**
 * Trải nghiệm mô phỏng giáo dục: "Một ngày trong không gian Cung đình Huế"
 * Căn cứ khảo cứu: Khâm Định Đại Nam Hội Điển Sự Lệ & Nghi thức Đại triều thời Nguyễn
 */

export interface JourneyStep {
  stepNumber: number;
  timeOfDay: string;
  phaseTitle: string;
  imperialSpace: string;
  focusArea: 'Không gian nghi lễ' | 'Trang phục & Mão mũ' | 'Biên chế dàn nhạc' | 'Nhạc khí diễn xướng' | 'Âm luật & Điển lễ';
  description: string;
  curatorialDetails: string[];
  audioCue: {
    instrument: 'drum' | 'wind' | 'string' | 'bell';
    noteName: string;
    freq: number;
  };
  image: string;
  simulationNote: string;
}

export const IMMERSIVE_JOURNEY_STEPS: JourneyStep[] = [
  {
    stepNumber: 1,
    timeOfDay: '04:30 Sáng (Canh Năm - Rạng Đông)',
    phaseTitle: 'Khai Mở Cửa Ngọ Môn & Chuẩn Bị Nghi Thức Hoàng Triều',
    imperialSpace: 'Kỳ Đài, Cửa Ngọ Môn và Sân Đại Triều Nghi',
    focusArea: 'Không gian nghi lễ',
    description: 'Khi hồi chuông lệnh trên gác Ngũ Phụng của Cửa Ngọ Môn cất lên trong màn sương mờ xứ Huế, cờ quạt bát cửu được cắm nghiêm cẩn trên hai tầng sân rồng Điện Thái Hòa. Hàng trăm văn võ bá quan theo thứ bậc cửu phẩm tề tựu chờ giờ hoàng đạo khai triều.',
    curatorialDetails: [
      'Không gian kiến trúc chia làm hai khu vực: Trên điện (ngai vàng) và Dưới sân (phẩm sơn phân chia văn tả võ hữu).',
      'Đại triều nghi được cử hành định kỳ vào ngày mùng một (sóc) và ngày rằm (vọng) hàng tháng.',
      'Sự yên lặng tuyệt đối là quy định bắt buộc trước khi phát xuất hồi trống lệnh đầu tiên.'
    ],
    audioCue: {
      instrument: 'bell',
      noteName: 'Hồi chuông Ngọ Môn (Kim khí)',
      freq: 440
    },
    image: '/src/assets/images/hero_nha_nhac_hue_1793928492915.jpg',
    simulationNote: 'Mô phỏng giáo dục dựa trên quy chế canh phòng và chuẩn bị đại triều quy định trong Đại Nam Hội Điển.'
  },
  {
    stepNumber: 2,
    timeOfDay: '05:45 Sáng (Giờ Mão - Bình Minh)',
    phaseTitle: 'Chỉnh Túc Nhạc Phục & Mão Cánh Chuồn Thất Bảo',
    imperialSpace: 'Tả Vu & Hữu Vu (Hành lang chực ban phía sau điện)',
    focusArea: 'Trang phục & Mão mũ',
    description: 'Các nhạc công và vũ sinh kiểm tra lần cuối nhạc phục. Nhạc sinh Đại nhạc khoác áo bào dài gấm đỏ son thêu hoa văn mây lửa; nhạc sinh Tiểu nhạc mặc áo gấm lam hoặc xanh thanh thiên; đầu đội mão cánh chuồn nạm thất bảo; thắt lưng lụa đính ngọc bài.',
    curatorialDetails: [
      'Màu đỏ son biểu trưng cho khí thế Dương cương của Đại nhạc ngoài sân điện.',
      'Màu xanh lam và tím biểu trưng cho sự nhu thuận, thanh tao của Tiểu nhạc trong sảnh điện.',
      'Mão cánh chuồn của nhạc công cung đình được làm từ lông đuôi ngựa bện kỹ và sơn then mạ vàng trang nghiêm.'
    ],
    audioCue: {
      instrument: 'drum',
      noteName: 'Nhịp gõ phách giữ hàng ngũ',
      freq: 180
    },
    image: '/src/assets/images/master_artisan_portrait_1793928495965.jpg',
    simulationNote: 'Mô phỏng giáo dục về quy chế sắc phục nhã nhạc quy định bởi Bộ Lễ thời vua Minh Mạng.'
  },
  {
    stepNumber: 3,
    timeOfDay: '06:30 Sáng (Giờ Thìn - Khai Triều)',
    phaseTitle: 'Bố Trí Dàn Nhạc: Đại Xuy Đả (Ngoài Sân) & Trúc Nhã Nhạc (Trong Điện)',
    imperialSpace: 'Thềm Điện Thái Hòa & Sân Rồng Cung Điện',
    focusArea: 'Biên chế dàn nhạc',
    description: 'Hoàng đế ngự giá lên ngai vàng. Toàn bộ ban nhạc vào vị trí đối xứng hoàn hảo: Dàn Đại Nhạc (Đại xuy đả) đứng hai bên sân rồng, gồm kèn bầu, trống chiến, não bạt; Dàn Tiểu Nhạc (Trúc nhã nhạc) túc trực hai bên thềm điện gồm tỳ bà, đàn nguyệt, đàn tranh, sáo và tam âm la.',
    curatorialDetails: [
      'Nguyên lý Âm Dương: Đại nhạc (Dương) âm vang ngoài trời đối ứng với Tiểu nhạc (Âm) trầm ấm trong nhà.',
      'Tính đối xứng nghiêm ngặt: Nhạc cụ luôn được bố trí thành từng cặp đăng đối tả - hữu.',
      'Người đánh trống bản đứng ở vị trí trung tâm để điều khiển toàn bộ tốc độ và phách nhịp.'
    ],
    audioCue: {
      instrument: 'wind',
      noteName: 'Kèn Bầu khai khúc',
      freq: 392
    },
    image: '/src/assets/images/duyet_thi_duong_theater_1793928493481.jpg',
    simulationNote: 'Mô phỏng giáo dục vị trí dàn nhạc theo quy chế Đường thượng chi nhạc và Đình hạ chi nhạc.'
  },
  {
    stepNumber: 4,
    timeOfDay: '07:15 Sáng (Đại Triều Nghi Thức)',
    phaseTitle: 'Tiếng Trống Lệnh & Khúc Kèn Bầu Hùng Tráng Xuyên Thấu Không Gian',
    imperialSpace: 'Sân Phẩm Thụ Trước Điện Thái Hòa',
    focusArea: 'Nhạc khí diễn xướng',
    description: 'Nhạc trưởng gõ ba tiếng trống bản dứt khoát. Tiếng kèn bầu vút lên lảnh lót lĩnh xướng giai điệu, tiếp đến là hồi trống chiến rền vang như sấm dậy, hòa cùng tiếng não bạt đồng rực lửa. Trăm quan văn võ theo nhịp nhạc đồng loạt quỳ lạy tung hô "Vạn tuế".',
    curatorialDetails: [
      'Kỹ thuật luồn hơi liên tục không ngắt quãng (circular breathing) của nghệ nhân kèn bầu.',
      'Sự kết hợp giữa nhịp trống chiến dồn dập (tam đoạn sơ - trung - vĩ) và tiếng khánh đồng thánh thót.',
      'Âm nhạc không chỉ làm đẹp nghi lễ mà còn giữ vai trò điều lệnh nhịp bước của hàng trăm quan viên.'
    ],
    audioCue: {
      instrument: 'drum',
      noteName: 'Hồi trống chiến tế lễ',
      freq: 85
    },
    image: '/src/assets/images/royal_instruments_still_life_1793928495633.jpg',
    simulationNote: 'Mô phỏng giáo dục kỹ thuật hòa tấu và vai trò chỉ huy nhịp điệu trong nghi lễ đại triều.'
  },
  {
    stepNumber: 5,
    timeOfDay: '08:00 Sáng (Hoàn Lễ & Yến Tiệc)',
    phaseTitle: 'Hòa Tấu Đăng Đàn Cung & Vũ Khúc Lục Cúng Hoa Đăng Tạ Ơn',
    imperialSpace: 'Điện Cần Chánh & Nhà Hát Duyệt Thị Đường',
    focusArea: 'Âm luật & Điển lễ',
    description: 'Nghi lễ triều chính hoàn tất, hoàng đế ban yến tiệc cho hoàng thân và các sứ thần. Dàn Tiểu nhạc tấu lên khúc ngự Đăng Đàn Cung và Lưu Thủy Kim Tiền êm dịu. Các vũ sinh dâng hoa sen thắp nến lung linh qua điệu Lục Cúng Hoa Đăng, khép lại một buổi diễn xướng cung đình mẫu mực.',
    curatorialDetails: [
      'Giai điệu chuyển từ hào sảng uy nghiêm của Điệu Khách sang sâu lắng, trữ tình của Điệu Nam.',
      'Vũ khúc Lục Cúng Hoa Đăng dâng 6 phẩm vật cầu chúc quốc thái dân an, thiên hạ thanh bình.',
      'Khẳng định triết lý cốt lõi của Nhã nhạc: Âm nhạc là phương tiện tối cao để giáo hóa lòng người và gìn giữ hòa khí quốc gia.'
    ],
    audioCue: {
      instrument: 'string',
      noteName: 'Đàn Tỳ Bà & Đàn Tranh dâng điệu',
      freq: 523
    },
    image: '/src/assets/images/luc_cung_hoa_dang_dance_1793928496126.jpg',
    simulationNote: 'Mô phỏng giáo dục yến tiệc và múa cung đình tại nhà hát Duyệt Thị Đường triều Nguyễn.'
  }
];
