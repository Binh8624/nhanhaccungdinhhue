/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * DỮ LIỆU TRUNG TÂM TƯ LIỆU SỐ CHUYÊN SÂU - GIAI ĐOẠN 3 (DIGITAL ARCHIVE)
 * Dự án: Bảo tàng Di sản số Học thuật – Nhã nhạc Cung đình Huế
 * Tác giả: Trần Thanh Bình (MSSV: PH61165 - Lớp: D02)
 * Địa bàn trọng tâm: Thành phố Huế, Việt Nam
 * 
 * Cung cấp dữ liệu chuẩn hóa cho 6 phân hệ:
 * 1. Digital Manuscript Viewer (IIIF Presentation 3.0)
 * 2. High-resolution Image Viewer (Deep Zoom & Hotspot Annotations)
 * 3. Audio Archive (Waveform, Phân loại, Metadata)
 * 4. Video Archive (Nghi lễ, Diễn xướng, Bản quyền)
 * 5. Transcription Workspace (Phiên âm Hán Nôm song song)
 * 6. Source Comparison (Đối chiếu dị bản khách quan)
 */

export interface ManuscriptPage {
  pageNumber: number;
  label: string; // Tờ 14a, Tờ 14b...
  imageUrl: string;
  thumbnailUrl: string;
  width: number;
  height: number;
  hanNomText: string;
  transcriptionVi: string;
  translationVi: string;
  notes: string[];
}

export interface DigitalManuscript {
  id: string;
  code: string; // HMC-MSS-01
  title: string;
  originalTitle: string; // Chữ Hán
  era: string;
  year: string;
  authorOrCompiler: string;
  holdingRepository: string;
  totalLeaves: number;
  bindingType: string; // Khâu chỉ cổ, đóng tập bản thảo
  iiifManifestUri: string;
  citationFactId: string;
  pages: ManuscriptPage[];
  provenance: 'Ảnh tư liệu thật' | 'Ảnh phục dựng học thuật';
  rights: string;
}

export interface ImageAnnotationHotspot {
  id: string;
  xPercent: number; // Tọa độ tương đối 0-100%
  yPercent: number;
  title: string;
  description: string;
  organologicalCategory: string; // Cấu trúc âm học, chất liệu, hoa văn
}

export interface HighResArtifactImage {
  id: string;
  code: string;
  title: string;
  era: string;
  museumCollection: string;
  imageUrl: string;
  deepZoomLevels: number;
  dimensionsActual: string;
  materials: string;
  hotspots: ImageAnnotationHotspot[];
  iiifImageServiceUrl: string;
  license: string;
}

export interface AudioRecord {
  id: string;
  code: string;
  title: string;
  repertoireCategory: 'Đại Nhạc' | 'Tiểu Nhạc' | 'Nhạc Lễ Miếu Điện' | 'Nhạc Thính Phòng' | 'Điền Dã Truyền Khẩu';
  recordedYear: string;
  recordingLocation: string;
  performers: string[];
  instrumentsFeatured: string[];
  durationMinutes: string;
  audioSampleUrl: string;
  waveformPattern: number[]; // Dữ liệu đỉnh sóng trực quan
  historicalSignificance: string;
  soundType: 'Bản ghi âm gốc' | 'Âm thanh phục dựng' | 'Âm thanh mô phỏng';
  license: string;
}

export interface VideoRecord {
  id: string;
  code: string;
  title: string;
  ritualContext: string;
  location: string;
  recordedYear: string;
  productionUnit: string;
  durationMinutes: string;
  thumbnailUrl: string;
  videoUrl: string;
  description: string;
  keyMoments: { timeCode: string; description: string }[];
  rightsCategory: string;
}

export interface TranscriptionRecord {
  id: string;
  manuscriptId: string;
  pageNumber: number;
  originalHanNomLines: string[];
  sinoVietnameseLines: string[];
  modernVietnameseTranslation: string[];
  criticalApparatus: { term: string; explanation: string }[];
  lastEditedBy: string;
  lastEditedAt: string;
  reviewStatus: 'Đã thẩm định' | 'Chờ phản biện' | 'Bản nháp';
}

export interface SourceComparisonItem {
  id: string;
  workTitle: string; // Tên tác phẩm / bài bản
  repertoireCode: string;
  variantA: {
    sourceName: string;
    sourceCode: string;
    year: string;
    holdingBody: string;
    textExcerpt: string;
    pitchNotation: string[];
    instrumentation: string;
  };
  variantB: {
    sourceName: string;
    sourceCode: string;
    year: string;
    holdingBody: string;
    textExcerpt: string;
    pitchNotation: string[];
    instrumentation: string;
  };
  discrepancyAnalysis: {
    type: 'Dị biệt âm luật' | 'Dị biệt chữ Hán' | 'Dị biệt biên chế' | 'Dị biệt tiết tấu';
    note: string;
  }[];
  neutralCuratorialAssessment: string;
}

// ============================================================================
// DỮ LIỆU MẪU HỌC THUẬT ĐƯỢC KIỂM ĐỊNH (SCHOLARLY DIGITAL ARCHIVE DATA)
// ============================================================================

export const DIGITAL_MANUSCRIPTS: DigitalManuscript[] = [
  {
    id: 'mss-kham-dinh-96',
    code: 'HMC-MSS-1851-Q96',
    title: 'Khâm Định Đại Nam Hội Điển Sự Lệ – Quyển 96: Điển Chế Lễ Nhạc',
    originalTitle: '欽定大南會典事例 – 卷九十六 禮部 禮樂',
    era: 'Triều Nguyễn (Thời vua Tự Đức)',
    year: '1851 (Bản dịch Viện Sử học)',
    authorOrCompiler: 'Quốc Sử Quán Triều Nguyễn biên soạn',
    holdingRepository: 'Trung tâm Lưu trữ Quốc gia I & Thư viện Viện Sử học',
    totalLeaves: 4,
    bindingType: 'Bản khắc gỗ mộc bản triều Nguyễn, chỉ bồi giấy dó hoàng sa',
    iiifManifestUri: '/api/archive/iiif/mss-kham-dinh-96/manifest.json',
    citationFactId: 'FACT-HIST-003',
    provenance: 'Ảnh tư liệu thật',
    rights: 'Công bố phục vụ nghiên cứu phi thương mại',
    pages: [
      {
        pageNumber: 1,
        label: 'Tờ 14a',
        imageUrl: '/src/assets/images/duyet_thi_duong_theater_1793928493481.jpg',
        thumbnailUrl: '/src/assets/images/duyet_thi_duong_theater_1793928493481.jpg',
        width: 1600,
        height: 2200,
        hanNomText: '大樂：用大吹打。管、鼓、金、鈸、大銅鑼、小銅鑼。朝會大典、郊壇大祀用之。',
        transcriptionVi: 'Đại nhạc: Dụng Đại xuy đả. Quản, cổ, kim, bạt, đại đồng la, tiểu đồng la. Triều hội đại điển, Giao đàn đại tự dụng chi.',
        translationVi: 'Dàn Đại nhạc: Sử dụng Đại xuy đả. Nhạc cụ gồm có kèn dăm, trống lớn, chuông đồng, bạt, thanh la lớn, thanh la nhỏ. Được dùng trong các đại lễ triều hội và đại lễ tế Giao.',
        notes: [
          'Quản (管): Chỉ chung các loại kèn dăm, ở đây là kèn Bầu (Gia Lệnh).',
          'Đại xuy đả: Tổ hợp nhạc cụ bộ hơi và bộ gõ âm lượng lớn.'
        ]
      },
      {
        pageNumber: 2,
        label: 'Tờ 14b',
        imageUrl: '/src/assets/images/royal_instruments_still_life_1793928495633.jpg',
        thumbnailUrl: '/src/assets/images/royal_instruments_still_life_1793928495633.jpg',
        width: 1600,
        height: 2200,
        hanNomText: '細樂：用竹雅樂。琵琶、箏、月琴、二弦、三弦、笛、蕭、三音鑼。殿上宴享用之。',
        transcriptionVi: 'Tế nhạc (Tiểu nhạc): Dụng Trúc nhã nhạc. Tỳ bà, tranh, nguyệt cầm, nhị huyền, tam huyền, địch, tiêu, tam âm la. Điện thượng yến hưởng dụng chi.',
        translationVi: 'Dàn Tiểu nhạc: Sử dụng Trúc nhã nhạc. Nhạc cụ gồm có đàn tỳ bà, đàn tranh, đàn nguyệt, đàn nhị, đàn tam, sáo ngang, ống tiêu, tam âm la. Được tấu trên thềm điện trong các buổi ngự yến và tiếp sứ thần.',
        notes: [
          'Trúc nhã nhạc: Dàn nhạc lấy họ dây và họ hơi (làm từ trúc, gỗ ngô đồng, dây tơ) làm chủ đạo.',
          'Điện thượng: Không gian thính phòng bên trong điện sảnh uy nghiêm.'
        ]
      },
      {
        pageNumber: 3,
        label: 'Tờ 15a',
        imageUrl: '/src/assets/images/thai_hoa_palace_court_1793952624534.jpg',
        thumbnailUrl: '/src/assets/images/thai_hoa_palace_court_1793952624534.jpg',
        width: 1600,
        height: 2200,
        hanNomText: '樂生服飾：大樂着朱紅大袖錦袍，戴金花折角襆頭。細樂着青藍錦袍，戴折角烏紗襆頭。',
        transcriptionVi: 'Nhạc sinh phục sức: Đại nhạc trước chu hồng đại tụ cẩm bào, đới kim hoa chiết giác phốc đầu. Tế nhạc trước thanh lam cẩm bào, đới chiết giác ô sa phốc đầu.',
        translationVi: 'Trang phục nhạc sinh: Nhạc sinh dàn Đại nhạc mặc áo bào gấm tay rộng màu đỏ son, đội mũ cánh chuồn nẹp hoa vàng. Nhạc sinh dàn Tiểu nhạc mặc áo gấm màu xanh lam thanh khiết, đội mũ cánh chuồn sa đen.',
        notes: [
          'Màu đỏ son biểu tượng cho hành Hỏa và nguyên lý Dương ngoài sân điện.',
          'Màu xanh lam biểu tượng cho hành Mộc/Thủy và nguyên lý Âm nhu hòa trong điện.'
        ]
      },
      {
        pageNumber: 4,
        label: 'Tờ 15b',
        imageUrl: '/src/assets/images/nam_giao_altar_hue_1793952638343.jpg',
        thumbnailUrl: '/src/assets/images/nam_giao_altar_hue_1793952638343.jpg',
        width: 1600,
        height: 2200,
        hanNomText: '郊壇陳設：圜壇中層設大吹打樂，左右對列。發更初次奏豐和之章，迎神奏豫和之章。',
        transcriptionVi: 'Giao đàn trần thiết: Viên đàn trung tầng thiết Đại xuy đả nhạc, tả hữu đối liệt. Phát canh sơ thứ tấu Phong Hòa chi chương, nghênh thần tấu Dự Hòa chi chương.',
        translationVi: 'Bày trí tại Đàn Nam Giao: Tầng giữa của đàn tròn bố trí dàn nhạc Đại xuy đả, xếp thành hai hàng đối xứng tả - hữu. Khi đánh hồi canh đầu tiên tấu khúc Phong Hòa, khi đón rước thần linh tấu khúc Dự Hòa.',
        notes: [
          'Tất cả các khúc nhạc tế Giao đều tận cùng bằng chữ "Hòa" (Phong Hòa, Dự Hòa, Thành Hòa, Tuyên Hòa...) thể hiện khát vọng thiên hạ thái hòa.'
        ]
      }
    ]
  },
  {
    id: 'mss-ky-am-1995',
    code: 'HMC-MSS-1995-T01',
    title: 'Bản Ký Âm Chữ Hán Cung Đình: Mười Bản Ngự (Thập Thủ Liên Hoàn)',
    originalTitle: '宮廷十首連環記音草本',
    era: 'Thời kỳ phục hồi di sản (1990 - 2003)',
    year: '1995',
    authorOrCompiler: 'Cố NNƯT Lữ Hữu Thi & Cố NSƯT Trần Kích truyền khẩu ghi chép',
    holdingRepository: 'Gia tộc Cố NSƯT Trần Kích & Lưu trữ Viện Âm nhạc Việt Nam',
    totalLeaves: 2,
    bindingType: 'Bản chép tay bút mực trên giấy kẻ ly truyền thống',
    iiifManifestUri: '/api/archive/iiif/mss-ky-am-1995/manifest.json',
    citationFactId: 'FACT-ACOU-002',
    provenance: 'Ảnh tư liệu thật',
    rights: 'Bản quyền số hóa nghiên cứu di sản gia tộc',
    pages: [
      {
        pageNumber: 1,
        label: 'Tập 1 - Trang 1',
        imageUrl: '/src/assets/images/master_artisan_portrait_1793928495965.jpg',
        thumbnailUrl: '/src/assets/images/master_artisan_portrait_1793928495965.jpg',
        width: 1400,
        height: 2000,
        hanNomText: '品雪首節：合、士、乙、上、尺、工、凡、六。春風開曲：上、尺、工、六、五。',
        transcriptionVi: 'Phẩm Tuyết thủ tiết: Hò, Xự, Xang, Xê, Cống, Phan, Lục. Xuân Phong khai khúc: Xang, Xê, Cống, Lục, Oan.',
        translationVi: 'Đoạn mở đầu bản Phẩm Tuyết: Ký âm theo chữ nhạc cổ Hò, Xự, Xang, Xê, Cống. Bản Xuân Phong tiếp nối liền mạch tạo không khí mùa xuân tươi mới.',
        notes: [
          'Hệ ký âm chữ Hán cổ này tương đương với các bậc âm ngũ cung dân tộc Việt Nam.'
        ]
      },
      {
        pageNumber: 2,
        label: 'Tập 1 - Trang 2',
        imageUrl: '/src/assets/images/royal_instruments_still_life_1793928495633.jpg',
        thumbnailUrl: '/src/assets/images/royal_instruments_still_life_1793928495633.jpg',
        width: 1400,
        height: 2000,
        hanNomText: '十首連環無間斷奏法：品雪、元宵、胡廣、連環、平半、西梅、金錢、春風、龍虎、走馬。',
        transcriptionVi: 'Thập thủ liên hoàn vô gián đoạn tấu pháp: Phẩm Tuyết, Nguyên Tiêu, Hồ Quảng, Liên Hoàn, Bình Bán, Tây Mai, Kim Tiền, Xuân Phong, Long Hổ, Tẩu Mã.',
        translationVi: 'Phép tấu mười bản liên hoàn không ngắt quãng: Chuyển đoạn giữa các khúc bằng ngón vuốt đàn nguyệt và nhịp gõ phách trống bản.',
        notes: [
          'Đây là bản ghi âm đối chiếu quan trọng nhất giúp hồ sơ UNESCO 2003 được thông qua.'
        ]
      }
    ]
  }
];

export const HIGH_RES_ARTIFACTS: HighResArtifactImage[] = [
  {
    id: 'art-ken-bau-1845',
    code: 'HMC-IMG-KB-1845',
    title: 'Kèn Bầu Cung Đình (Gia Lệnh) Thế Kỷ XIX – Điện Long An',
    era: 'Triều Nguyễn (Thời vua Thiệu Trị)',
    museumCollection: 'Bảo tàng Cổ vật Cung đình Huế (Số 3 Lê Trực, Thành phố Huế, Việt Nam)',
    imageUrl: '/src/assets/images/royal_instruments_still_life_1793928495633.jpg',
    deepZoomLevels: 5,
    dimensionsActual: 'Dài 48.5 cm; Đường kính miệng loa đồng 11.2 cm; Trọng lượng 360g',
    materials: 'Thân tiện gỗ mun sừng già, dăm lá buông ép phơi sương, loa đồng thau chạm rồng vờn mây',
    iiifImageServiceUrl: '/api/archive/iiif/images/ken-bau-1845/info.json',
    license: 'Giấy phép hiện vật Bảo tàng Cổ vật Cung đình Huế',
    hotspots: [
      {
        id: 'hs-1',
        xPercent: 35,
        yPercent: 22,
        title: 'Dăm kèn bằng lá buông ép mỏng',
        description: 'Dăm kèn kép làm từ lá cây buông rừng tự nhiên phơi qua sương đêm để tăng độ dẻo, cắm vào cổ dăm bằng đồng thau chạm viền hoa văn ngọn lửa.',
        organologicalCategory: 'Bộ phận phát thanh (Reed mechanism)'
      },
      {
        id: 'hs-2',
        xPercent: 48,
        yPercent: 45,
        title: 'Thân kèn tiện gỗ mun sừng 7 lỗ bấm',
        description: 'Ống gỗ mun đen nhánh, bóng tự nhiên qua hơn 150 năm tuổi, gồm 7 lỗ bấm ngón phía trên và 1 lỗ bấm ngón cái phía dưới tạo thang âm ngũ cung.',
        organologicalCategory: 'Hệ thống định âm (Tone holes)'
      },
      {
        id: 'hs-3',
        xPercent: 65,
        yPercent: 78,
        title: 'Miệng loa kèn bằng đồng thau đúc chạm',
        description: 'Miệng loa loe rộng giúp khuếch đại âm lượng sắc bén, xuyên thấu không gian tế đàn ngoài trời. Viền miệng loa khắc chìm hoa văn mây rồng và chữ Thọ.',
        organologicalCategory: 'Loa khuếch âm (Acoustic bell)'
      }
    ]
  },
  {
    id: 'art-dan-ty-ba-1885',
    code: 'HMC-IMG-TB-1885',
    title: 'Đàn Tỳ Bà Cung Đình Khảm Xà Cừ Ngũ Sắc Thế Kỷ XIX',
    era: 'Triều Nguyễn (Thời vua Đồng Khánh – Khải Định)',
    museumCollection: 'Bộ sưu tập Hoàng gia – Bảo tàng Cổ vật Cung đình Huế',
    imageUrl: '/src/assets/images/royal_instruments_still_life_1793928495633.jpg',
    deepZoomLevels: 5,
    dimensionsActual: 'Dài 94 cm; Bề ngang thùng 27.5 cm; Chiều sâu hộp đàn 7.2 cm',
    materials: 'Mặt gỗ ngô đồng núi Cố đô, lưng cẩm lai khảm ốc xà cừ đỏ ngũ sắc, 4 trục lên dây chạm hoa mai',
    iiifImageServiceUrl: '/api/archive/iiif/images/dan-ty-ba-1885/info.json',
    license: 'Di sản Quốc gia – Trung tâm Bảo tồn Di tích Cố đô Huế',
    hotspots: [
      {
        id: 'hs-tb-1',
        xPercent: 30,
        yPercent: 18,
        title: 'Đầu cần đàn chạm đầu rồng ngậm ngọc',
        description: 'Đầu cần uốn cong mềm mại, chạm nổi hình rồng ngậm hạt châu bằng ngà voi, 4 trục gỗ mun khảm ốc xà cừ.',
        organologicalCategory: 'Đầu đàn & Bộ trục (Pegbox & Headstock)'
      },
      {
        id: 'hs-tb-2',
        xPercent: 50,
        yPercent: 55,
        title: 'Mặt đàn gỗ ngô đồng phơi hong tự nhiên',
        description: 'Gỗ ngô đồng núi Huế nhẹ xốp, truyền dẫn sóng âm trong trẻo, réo rắt như giọt nước rơi trên mâm vàng.',
        organologicalCategory: 'Mặt cộng hưởng âm (Soundboard)'
      },
      {
        id: 'hs-tb-3',
        xPercent: 62,
        yPercent: 82,
        title: 'Lưng đàn khảm xà cừ tích "Long Phụng Triều Dương"',
        description: 'Mặt sau bằng gỗ cẩm lai nguyên khối được các nghệ nhân cung đình khảm ốc đỏ xà cừ mô tả rồng và chim phụng chầu về vầng thái dương.',
        organologicalCategory: 'Mỹ thuật cung đình (Inlay art)'
      }
    ]
  }
];

export const AUDIO_ARCHIVE_ITEMS: AudioRecord[] = [
  {
    id: 'aud-dang-dan-cung-2018',
    code: 'HMC-AUD-2018-DDC',
    title: 'Đăng Đàn Cung (Quốc thiều triều Nguyễn) – Hòa Tấu Tại Duyệt Thị Đường',
    repertoireCategory: 'Đại Nhạc',
    recordedYear: '2018',
    recordingLocation: 'Nhà hát Cung đình Duyệt Thị Đường, Thành phố Huế, Việt Nam',
    performers: ['NSƯT Trần Thảo (chỉ huy)', 'Dàn nhạc Nhà hát Nghệ thuật Truyền thống Cung đình Huế'],
    instrumentsFeatured: ['Kèn Bầu', 'Trống Chiến', 'Não Bạt', 'Đàn Nguyệt', 'Tam Âm La'],
    durationMinutes: '03:45',
    audioSampleUrl: '/audio/dang_dan_cung_master.mp3',
    waveformPattern: [15, 30, 45, 80, 95, 88, 72, 60, 45, 90, 100, 85, 70, 50, 40, 65, 85, 90, 75, 40, 20, 10],
    historicalSignificance: 'Bản hòa âm phối khí đầy đủ hai dàn nhạc Đại xuy đả và Trúc nhã nhạc, phục dựng theo bản ghi âm mẫu mực kế thừa từ dự án UNESCO 2005-2008.',
    soundType: 'Bản ghi âm gốc',
    license: 'Bản quyền số hóa: Nhà hát Nghệ thuật Cung đình Huế'
  },
  {
    id: 'aud-muoi-ban-ngu-1995',
    code: 'HMC-AUD-1995-TBN',
    title: 'Liên Hoàn Tấu Mười Bản Ngự – Bản Thu Điền Dã Nghệ Nhân Tiền Bối',
    repertoireCategory: 'Điền Dã Truyền Khẩu',
    recordedYear: '1995',
    recordingLocation: 'Làng Thế Lại Thượng, Thành phố Huế, Việt Nam',
    performers: ['Cố NNƯT Lữ Hữu Thi (Đàn Nguyệt & Kèn Bầu)', 'Cố NSƯT Trần Kích (Đàn Tỳ Bà & Nhị)'],
    instrumentsFeatured: ['Đàn Nguyệt', 'Đàn Tỳ Bà', 'Đàn Nhị'],
    durationMinutes: '08:20',
    audioSampleUrl: '/audio/muoi_ban_ngu_fieldwork_1995.mp3',
    waveformPattern: [10, 25, 35, 50, 65, 60, 55, 45, 70, 80, 75, 60, 50, 55, 65, 70, 60, 40, 30, 20],
    historicalSignificance: 'Bản thu âm điền dã lịch sử được GS.TS Trần Văn Khê ghi lại năm 1995, đóng vai trò chứng cứ vật thể then chốt trong hồ sơ đệ trình UNESCO công nhận di sản năm 2003.',
    soundType: 'Bản ghi âm gốc',
    license: 'Lưu trữ Viện Âm nhạc Việt Nam & Gia tộc nghệ nhân'
  },
  {
    id: 'aud-luu-thuy-kim-tien',
    code: 'HMC-AUD-2022-LTKT',
    title: 'Lưu Thủy – Kim Tiền: Khúc Nhạc Ngự Thính Phòng Cung Đình',
    repertoireCategory: 'Tiểu Nhạc',
    recordedYear: '2022',
    recordingLocation: 'Điện Kiến Trung, Đại Nội Huế',
    performers: ['Nhóm nhạc thính phòng cung đình Huế'],
    instrumentsFeatured: ['Đàn Tranh', 'Đàn Tỳ Bà', 'Sáo Trúc', 'Đàn Tam'],
    durationMinutes: '04:12',
    audioSampleUrl: '/audio/luu_thuy_kim_tien.mp3',
    waveformPattern: [20, 35, 50, 60, 70, 85, 80, 75, 65, 70, 75, 80, 70, 60, 50, 45, 35, 25],
    historicalSignificance: 'Diễn tả dòng nước trong xanh uốn lượn và sự thịnh vượng no ấm của giang sơn xã tắc triều Nguyễn.',
    soundType: 'Âm thanh phục dựng',
    license: 'CC BY-NC-ND 4.0'
  }
];

export const VIDEO_ARCHIVE_ITEMS: VideoRecord[] = [
  {
    id: 'vid-te-nam-giao-2022',
    code: 'HMC-VID-2022-TNG',
    title: 'Đại Lễ Tế Đàn Nam Giao (Phục Dựng Nguyên Bản Lễ Khai Canh & Giao Nhạc)',
    ritualContext: 'Đại lễ tế Trời Đất mùa xuân tại Đàn Nam Giao',
    location: 'Đồi Ngự Bình, Thành phố Huế, Việt Nam',
    recordedYear: '2022',
    productionUnit: 'Trung tâm Bảo tồn Di tích Cố đô Huế & VTV',
    durationMinutes: '14:35',
    thumbnailUrl: '/src/assets/images/nam_giao_altar_hue_1793952638343.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Placeholder URL
    description: 'Thước phim tư liệu phục dựng toàn bộ tiến trình cử hành Giao Nhạc trong nghi lễ Tế Giao, tái hiện vị trí đối xứng của hàng trăm nhạc sinh và vũ sinh Bát Dật trên ba tầng đàn Viên Đàn, Phương Đàn.',
    keyMoments: [
      { timeCode: '01:20', description: 'Đoàn ngự đạo xuất phát từ Đại Nội tiến về Đàn Nam Giao' },
      { timeCode: '04:50', description: 'Hồi chuông khánh đầu tiên cất lên giữa rừng thông canh ba' },
      { timeCode: '08:30', description: 'Dàn Đại Nhạc cử khúc Phong Hòa chi chương' },
      { timeCode: '12:10', description: 'Điệu múa Bát Dật 64 vũ sinh nam Văn vũ và Võ vũ' }
    ],
    rightsCategory: 'Bản quyền tư liệu phục dựng: Trung tâm Bảo tồn Di tích Cố đô Huế'
  },
  {
    id: 'vid-luc-cung-hoa-dang',
    code: 'HMC-VID-2023-LCHD',
    title: 'Vũ Khúc Cung Đình: Lục Cúng Hoa Đăng Tại Duyệt Thị Đường',
    ritualContext: 'Lễ Vạn Thọ và Đại tiệc Hoàng cung',
    location: 'Nhà hát Cung đình Duyệt Thị Đường',
    recordedYear: '2023',
    productionUnit: 'Nhà hát Nghệ thuật Truyền thống Cung đình Huế',
    durationMinutes: '09:45',
    thumbnailUrl: '/src/assets/images/luc_cung_hoa_dang_dance_1793928496126.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description: 'Nghi thức dâng 6 lễ vật thanh tịnh (Hương, Hoa, Đăng, Trà, Quả, Thực) hòa cùng tiếng đàn tỳ bà, sáo trúc và kèn bầu, tạo hình thế trận chữ Thái Bình chúc tụng non sông.',
    keyMoments: [
      { timeCode: '00:45', description: 'Đội hình tiên đồng ngọc nữ tiến vào sân khấu đèn sen lung linh' },
      { timeCode: '04:15', description: 'Chuyển thế trận xếp thành chữ "Thái Bình"' },
      { timeCode: '07:30', description: 'Chuyển thế trận kết thúc chữ "Vạn Tuế"' }
    ],
    rightsCategory: 'Được phép trình chiếu giáo dục bảo tàng số'
  }
];

export const TRANSCRIPTION_RECORDS: TranscriptionRecord[] = [
  {
    id: 'trn-kham-dinh-14a',
    manuscriptId: 'mss-kham-dinh-96',
    pageNumber: 1,
    originalHanNomLines: [
      '大樂：用大吹打。',
      '管、鼓、金、鈸、大銅鑼、小銅鑼。',
      '朝會大典、郊壇大祀用之。'
    ],
    sinoVietnameseLines: [
      'Đại nhạc: Dụng Đại xuy đả.',
      'Quản, cổ, kim, bạt, đại đồng la, tiểu đồng la.',
      'Triều hội đại điển, Giao đàn đại tự dụng chi.'
    ],
    modernVietnameseTranslation: [
      'Biên chế dàn Đại nhạc: Sử dụng hình thức Đại xuy đả.',
      'Gồm có: Kèn dăm (Kèn Bầu), trống chiến, chuông đồng, bạt (não bạt), thanh la lớn, thanh la nhỏ.',
      'Dàn nhạc này được tấu trong các nghi lễ Đại triều hội tại Điện Thái Hòa và đại lễ Tế Trời Đất tại Đàn Nam Giao.'
    ],
    criticalApparatus: [
      {
        term: 'Đại xuy đả (大吹打)',
        explanation: 'Khái niệm âm nhạc học cổ phương Đông chỉ biên chế dàn nhạc ngoài trời gồm nhạc cụ hơi công suất lớn (xuy - thổi) phối hợp với nhạc cụ gõ (đả - đánh).'
      },
      {
        term: 'Quản (管)',
        explanation: 'Ống thổi bằng gỗ hoặc trúc; trong ngữ cảnh Nhã nhạc triều Nguyễn chính là Kèn Bầu (Gia Lệnh).'
      }
    ],
    lastEditedBy: 'TS. Nguyễn Văn Bình (Chuyên gia Hán Nôm & Âm nhạc cổ)',
    lastEditedAt: '2026-11-06',
    reviewStatus: 'Đã thẩm định'
  }
];

export const SOURCE_COMPARISONS: SourceComparisonItem[] = [
  {
    id: 'cmp-pham-tuyet-01',
    workTitle: 'Phẩm khúc "Phẩm Tuyết" trong Mười Bản Ngự (Thập Thủ Liên Hoàn)',
    repertoireCode: 'REP-PT-10',
    variantA: {
      sourceName: 'Khâm Định Đại Nam Hội Điển Sự Lệ (Mộc bản triều Nguyễn 1851)',
      sourceCode: 'SRC-KHAM-DINH-1851',
      year: '1851',
      holdingBody: 'Quốc Sử Quán Triều Nguyễn / Trung tâm Lưu trữ Quốc gia I',
      textExcerpt: '品雪之章：氣象高嚴，如雪映寒松。用管、笛、弦、鈸。',
      pitchNotation: ['Hò', 'Xự', 'Xang', 'Xê', 'Cống', 'Lục', 'Oan'],
      instrumentation: 'Đại xuy đả kết hợp Trúc nhã nhạc tấu trước thềm điện'
    },
    variantB: {
      sourceName: 'Bản ký âm truyền khẩu gia tộc Cố NSƯT Trần Kích (1995)',
      sourceCode: 'SRC-KY-AM-1995',
      year: '1995',
      holdingBody: 'Gia tộc nghệ nhân tại Cố đô Huế (NSƯT Trần Thảo lưu giữ)',
      textExcerpt: 'Bản Phẩm Tuyết: Nhịp chiếc, điệu Khách (Bắc) trang trọng, ngón vê đàn tỳ bà và nhấn vi âm đàn nguyệt.',
      pitchNotation: ['Hò (F4)', 'Xự (G4)', 'Xang (Bb4)', 'Xê (C5)', 'Cống (D5)'],
      instrumentation: 'Dàn Tiểu nhạc thính phòng (Tỳ bà, Nguyệt, Tranh, Nhị, Tam âm la)'
    },
    discrepancyAnalysis: [
      {
        type: 'Dị biệt biên chế',
        note: 'Bản Khâm Định 1851 ghi nhận có sự tham gia của nhạc cụ bộ hơi và gõ (kèn, bạt) trong các đại lễ ngoài trời; trong khi bản chép tay 1995 của cụ Trần Kích ghi nhận bản Phẩm Tuyết thuần túy là khúc ngự thính phòng của dàn Tiểu nhạc dây - sáo.'
      },
      {
        type: 'Dị biệt âm luật',
        note: 'Bản 1851 dùng hệ ký âm chữ Hán chuẩn mực; bản 1995 bổ sung các ký hiệu vi âm (nhấn rung ngón) phản ánh thực tiễn diễn xướng sống động của nghệ nhân sau nhiều thế hệ truyền khẩu.'
      }
    ],
    neutralCuratorialAssessment: 'Cả hai dị bản đều có giá trị nghiên cứu lịch sử nguyên gốc. Bản 1851 đại diện cho văn bản quy phạm pháp luật của triều đình, trong khi bản 1995 đại diện cho thực tế truyền dạy ngón nghề sống động của nghệ nhân cung đình cuối cùng. Bảo tàng số giữ nguyên cả hai để nhà nghiên cứu tự do đối chiếu.'
  }
];
