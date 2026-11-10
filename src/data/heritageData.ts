/**
 * Dữ liệu bảo tàng số Nhã nhạc Cung đình Huế
 * Tác giả: Trần Thanh Bình - MSSV: PH61165 - Lớp: D02
 * Khu vực nghiên cứu: Bắc Trung Bộ | Địa bàn trọng tâm: Thành phố Huế, Việt Nam
 * Căn cứ tư liệu: UNESCO (2003, 2008), Trung tâm Bảo tồn Di tích Cố đô Huế, Viện Âm nhạc Việt Nam
 */

export interface Instrument {
  id: string;
  name: string;
  hanViet: string;
  category: 'Bộ Gõ' | 'Bộ Hơi' | 'Bộ Dây';
  orchestra: 'Tiểu Nhạc' | 'Đại Nhạc' | 'Cả hai dàn nhạc';
  role: string;
  materials: string;
  acoustic: string;
  pentatonicNotes: string[];
  description: string;
  historicalNote: string;
  image: string;
  // Hồ sơ hiện vật chuyên sâu (Artifact Dossier - GĐ5)
  originEra: string;
  dimensions: string;
  materialDossier: string;
  playingTechnique: string;
  conservationLocation: string;
  artifactVerification: 'Đã đối chiếu hiện vật bảo tàng' | 'Tư liệu đang khảo sát';
  imageProvenance: 'Ảnh tư liệu lưu trữ' | 'Ảnh phục dựng số học thuật';
  anatomicalParts?: { partName: string; material: string; dimensionMm?: string; function: string }[];
  historicalCitation?: string;
  soundSampleType?: 'Âm thanh mô phỏng học thuật (Web Audio API)' | 'Bản ghi âm gốc điền dã (Audio Archive GĐ3)';
}

export interface HeritageRoute {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  distance: string;
  recommendedTransport: string;
  theme: string;
  description: string;
  stops: {
    order: number;
    name: string;
    siteId: string;
    stayDuration: string;
    highlight: string;
    historicalContext: string;
  }[];
  tips: string;
}

export interface PerformanceForm {
  id: string;
  title: string;
  category: 'Nhạc Lễ Cung Đình' | 'Múa Cung Đình' | 'Dàn Nhạc Mẫu Mực';
  context: string;
  costume: string;
  formation: string;
  meaning: string;
  instrumentsUsed: string[];
  description: string;
  image: string;
}

export interface HistoryMilestone {
  era: string;
  timeRange: string;
  title: string;
  summary: string;
  keyEvents: string[];
  significance: string;
  dynastyBadge: string;
}

export interface HeritageSite {
  id: string;
  name: string;
  type: 'Không gian lịch sử hoàng gia' | 'Điểm biểu diễn & bảo tồn hiện nay';
  location: string;
  builtYear: string;
  historicalRole: string;
  currentActivity: string;
  description: string;
  image: string;
  coordinates: { x: number; y: number }; // Relative position on the royal complex visual map
  gpsCoordinates?: { lat: number; lng: number }; // Tọa độ GPS trắc địa thực tế (WGS84)
  googleMapsUrl?: string; // Liên kết Google Maps thực địa tại TP. Huế
  conservationDossier?: string; // Tình trạng bảo tồn di sản học thuật
}

export interface CommunitySubject {
  id: string;
  groupName: string;
  role: string;
  representativeFigures: string[];
  activities: string;
  story: string;
  challenges: string;
  image: string;
}

export interface AudioTrack {
  id: string;
  title: string;
  genre: string;
  tempo: string;
  duration: string;
  origin: string;
  description: string;
  notesSequence: number[]; // Frequencies for Web Audio engine playback
}

export interface ReferenceSource {
  id: string;
  citationIndex: number;
  organization: string;
  author?: string;
  title: string;
  url: string;
  category: 'Lịch sử' | 'Nghiên cứu' | 'Bảo tồn' | 'Địa bàn' | 'Hình ảnh & Video';
  usedContent: string;
  year?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

// ================= DỮ LIỆU CHI TIẾT =================

export const HERITAGE_STATISTICS = [
  { value: '2003', label: 'UNESCO vinh danh', sublabel: 'Kiệt tác Di sản Truyền khẩu & Phi vật thể' },
  { value: '2008', label: 'Di sản Đại diện', sublabel: 'Danh sách Di sản Phi vật thể Nhân loại' },
  { value: '143 năm', label: 'Triều đại nhà Nguyễn', sublabel: 'Giai đoạn đỉnh cao hưng thịnh (1802 - 1945)' },
  { value: '02 dàn nhạc', label: 'Đại Nhạc & Tiểu Nhạc', sublabel: 'Hệ thống biên chế quy phạm hoàng triều' },
  { value: '10 bài bản', label: 'Mười bản ngự liên hoàn', sublabel: 'Phẩm khúc kinh điển mẫu mực của Nhã nhạc' }
];

export const INSTRUMENTS_DATA: Instrument[] = [
  {
    id: 'ken-bau',
    name: 'Kèn Bầu',
    hanViet: 'Gia Lệnh / Kèn Dăm',
    category: 'Bộ Hơi',
    orchestra: 'Đại Nhạc',
    role: 'Nhạc cụ lĩnh xướng, dẫn dắt giai điệu toàn bộ dàn Đại nhạc',
    materials: 'Ống thổi bằng gỗ mun quý, loa kèn tiện từ gỗ hoặc đồng thau, dăm kèn làm từ lá buông ép mỏng',
    acoustic: 'Âm thanh vang dội, hào hùng, sắc bén và xuyên thấu không gian tế lễ uy nghiêm',
    pentatonicNotes: ['Hò (F4)', 'Xự (G4)', 'Xang (Bb4)', 'Xê (C5)', 'Cống (D5)', 'Phan (F5)'],
    description: 'Kèn Bầu là linh hồn của dàn Đại nhạc cung đình Huế. Khi tiếng kèn cất lên, mọi nhạc cụ gõ như trống chiến, thanh la, bạt lập tức phụ họa theo điệu lĩnh xướng. Trong các đại lễ tế Giao, tế Miếu hay Đại triều, tiếng kèn bầu tạo nên không khí trang nghiêm và rực rỡ bậc nhất của vương triều.',
    historicalNote: 'Dưới triều vua Minh Mạng, quy định nhạc sinh kèn bầu phải được tuyển chọn khắt khe từ các gia tộc có truyền thống nhã nhạc, có kỹ thuật luồn hơi liên tục không ngắt quãng.',
    image: '/src/assets/images/royal_instruments_still_life_1793928495633.jpg',
    originEra: 'Thời Hậu Lê – Định chế quy phạm thời vua Gia Long, Minh Mạng (Triều Nguyễn)',
    dimensions: 'Chiều dài ống: 45 – 50 cm; Đường kính miệng loa: 10 – 12 cm; Trọng lượng: ~350g',
    materialDossier: 'Gỗ mun sừng già đẽo tiện tinh xảo, dăm kèn bằng lá buông phơi sương, cổ dăm bằng đồng thau chạm viền hoa văn mây lửa',
    playingTechnique: 'Kỹ thuật luồn hơi (thổi liên tục bằng cách ém hơi trong khoang miệng khi hít thở), láy ngón, vuốt âm và tống hơi tạo cao trào',
    conservationLocation: 'Bảo tàng Cổ vật Cung đình Huế (Số 3 Lê Trực, Thành phố Huế, Việt Nam) & Nhà hát Nghệ thuật Cung đình',
    artifactVerification: 'Đã đối chiếu hiện vật bảo tàng',
    imageProvenance: 'Ảnh tư liệu lưu trữ'
  },
  {
    id: 'dan-ty-ba',
    name: 'Đàn Tỳ Bà',
    hanViet: 'Tỳ Bà Cầm',
    category: 'Bộ Dây',
    orchestra: 'Tiểu Nhạc',
    role: 'Nhạc cụ quý tộc giữ giai điệu chính, kết nối âm sắc thanh tao cho Tiểu nhạc',
    materials: 'Thùng đàn hình quả lê làm từ gỗ ngô đồng phơi sương, mặt đàn gỗ xốp nhẹ, cần khảm xà cừ hoa sen và rồng phượng, 4 dây tơ óng',
    acoustic: 'Âm sắc trong trẻo, réo rắt, quý phái, vừa sâu lắng vừa lảnh lót như hạt ngọc rơi trên mâm vàng',
    pentatonicNotes: ['Hò (C4)', 'Xự (D4)', 'Xang (F4)', 'Xê (G4)', 'Cống (A4)'],
    description: 'Đàn Tỳ Bà tượng trưng cho sự thanh nhã và tinh tế của chốn hoàng cung. Người diễn tấu sử dụng móng gảy tinh xảo với các kỹ thuật vê, ngón vuốt, nhấn nhá phức tạp. Đàn tỳ bà xuất hiện trong tất cả các buổi yến tiệc, tiếp sứ thần ngoại quốc và hòa tấu thính phòng hoàng tộc.',
    historicalNote: 'Tỳ bà cung đình Huế được cải tiến mang bản sắc thẩm mỹ Việt Nam với kỹ thuật gảy ngón phất, búng tao nhã hơn các biến thể khu vực.',
    image: '/src/assets/images/royal_instruments_still_life_1793928495633.jpg',
    originEra: 'Thế kỷ XI (Lý - Trần) – Đỉnh cao chế tác thời vua Tự Đức & Khải Định (Triều Nguyễn)',
    dimensions: 'Chiều dài thân: 92 – 95 cm; Bề ngang rộng nhất: 26 – 28 cm; Độ sâu hộp đàn: 7 cm',
    materialDossier: 'Mặt đàn gỗ ngô đồng núi Cố đô Huế, lưng đàn gỗ cẩm lai khảm xà cừ ốc xà cừ đỏ ngũ sắc, phím đàn bằng ngà voi hoặc gỗ trắc',
    playingTechnique: 'Ngón vê (tremolo) liên hồi như mưa rào mùa hạ, ngón vuốt liền dây (glissando), bấm nhấn vi âm tạo sắc thái triều đình cao sang',
    conservationLocation: 'Bộ sưu tập nhạc cụ hoàng gia Điện Long An (Bảo tàng Cổ vật Cung đình Huế, Thành phố Huế, Việt Nam)',
    artifactVerification: 'Đã đối chiếu hiện vật bảo tàng',
    imageProvenance: 'Ảnh tư liệu lưu trữ'
  },
  {
    id: 'dan-nguyet',
    name: 'Đàn Nguyệt',
    hanViet: 'Nguyệt Cầm / Đàn Kìm',
    category: 'Bộ Dây',
    orchestra: 'Cả hai dàn nhạc',
    role: 'Định hình giai điệu, nhạc cụ trụ cột dẫn dắt nhóm dây trong thính phòng và nghi lễ',
    materials: 'Hộp đàn tròn như mặt trăng rằm làm bằng gỗ trắc hoặc cẩm lai, cần đàn dài với các phím cao đặc trưng',
    acoustic: 'Âm thanh tròn đầy, vang lộng, có khả năng nhấn nhá tạo nên các vi âm uốn lượn mang đậm phong vị xứ Huế',
    pentatonicNotes: ['Hò (D3)', 'Xự (E3)', 'Xang (G3)', 'Xê (A3)', 'Cống (B3)'],
    description: 'Đàn Nguyệt được mệnh danh là "nhạc cụ quân tử" trong âm nhạc truyền thống Việt Nam. Với cần đàn dài và phím cao cách biệt, người chơi có thể nhấn sâu dây đàn tạo ra những nốt luyến láy tinh tế mà không nhạc cụ nào sánh kịp.',
    historicalNote: 'Nhiều nghệ nhân cung đình Huế xưa như cụ Lữ Hữu Thi đã gắn bó cả cuộc đời với cây đàn nguyệt, gìn giữ hàng trăm bản ngự thiện qua ngón đàn điêu luyện.',
    image: '/src/assets/images/royal_instruments_still_life_1793928495633.jpg',
    originEra: 'Thế kỷ XV (thời Lê) – Chuẩn hóa phím cao thời Chúa Nguyễn và Triều Nguyễn',
    dimensions: 'Đường kính thùng đàn: 36 – 38 cm; Chiều dài cần: 100 – 105 cm; Hệ thống 10 phím tre/gỗ cao',
    materialDossier: 'Thùng gỗ cẩm lai bo tròn, mặt đàn gỗ xốp không nứt, cần đàn gỗ mun bóng khảm trai, phím gá trên mặt cần bằng keo da trâu',
    playingTechnique: 'Ngón nhấn sâu tạo vi âm (microtone) Nam oán da diết đặc trưng xứ Huế; ngón mổ, ngón vỗ và ngón búng hai dây tơ',
    conservationLocation: 'Bảo tàng Cổ vật Cung đình Huế & Di cảo gia tộc nghệ nhân Lữ Hữu Thi (Thành phố Huế, Việt Nam)',
    artifactVerification: 'Đã đối chiếu hiện vật bảo tàng',
    imageProvenance: 'Ảnh tư liệu lưu trữ'
  },
  {
    id: 'dan-tranh',
    name: 'Đàn Tranh',
    hanViet: 'Thập Lục Cầm',
    category: 'Bộ Dây',
    orchestra: 'Tiểu Nhạc',
    role: 'Tạo dải âm hoa mỹ, đệm bè lượn sóng và rải âm liên hoàn',
    materials: 'Thân đàn dài bằng gỗ ngô đồng, 16 dây kim loại căng qua 16 nhạn đàn hình chữ V ngược làm bằng gỗ quý hoặc ngà voi',
    acoustic: 'Âm sắc sáng trong, lấp lánh như dòng nước biếc sông Hương, ngân vang dài sau mỗi ngón vuốt',
    pentatonicNotes: ['Hò', 'Xự', 'Xang', 'Xê', 'Cống', 'Lục', 'Tứ'],
    description: 'Đàn Tranh tạo nên nét duyên dáng đặc trưng trong Tiểu nhạc cung đình. Kỹ thuật rung, mổ, vỗ và vuốt dây của đàn Tranh xứ Huế mang nét man mác, trầm mặc nhưng cực kỳ lộng lẫy trong các khúc Phú Lục, Dạ Thuyết.',
    historicalNote: 'Thời Nguyễn, các hoàng phi, công chúa và nhạc nữ đều được học diễn tấu Đàn Tranh như một chuẩn mực tài hoa đức hạnh cung đình.',
    image: '/src/assets/images/royal_instruments_still_life_1793928495633.jpg',
    originEra: 'Thời Trần – Triều Nguyễn định chế chuẩn mực 16 dây (Thập lục huyền)',
    dimensions: 'Chiều dài thân đàn: 110 – 115 cm; Chiều rộng đầu lớn: 18 cm, đầu nhỏ: 13 cm; 16 con nhạn',
    materialDossier: 'Mặt đàn cong vòm bằng gỗ ngô đồng hong gió tự nhiên, thành đàn bằng gỗ trắc chạm khảm hoa văn lá lật và chữ Vạn',
    playingTechnique: 'Kỹ thuật gảy ngón á (rải âm ngón cái arpeggio), ngón rung tạo sóng âm u hoài, ngón nhấn hạ cung theo hơi điệu xứ Huế',
    conservationLocation: 'Bảo tàng Cổ vật Cung đình Huế (Số 3 Lê Trực, Thành phố Huế, Việt Nam)',
    artifactVerification: 'Đã đối chiếu hiện vật bảo tàng',
    imageProvenance: 'Ảnh tư liệu lưu trữ'
  },
  {
    id: 'dan-nhi',
    name: 'Đàn Nhị',
    hanViet: 'Nhị Cầm / Đàn Cò',
    category: 'Bộ Dây',
    orchestra: 'Cả hai dàn nhạc',
    role: 'Kéo giai điệu liên tục, gắn kết các câu nhạc, tạo độ ngân dài truyền cảm',
    materials: 'Bầu cộng hưởng bọc da kỳ đà hoặc da trăn mỏng, cần đàn bằng gỗ mun, vĩ kéo lòn giữa hai dây bằng lông đuôi ngựa trắng',
    acoustic: 'Âm thanh da diết, nỉ non, uyển chuyển như tiếng lòng người, có biên độ biểu cảm nội tâm cực cao',
    pentatonicNotes: ['D4', 'A4 (Dây buông)', 'Ngũ cung biến hóa theo ngón bấm'],
    description: 'Đàn Nhị đảm nhiệm vai trò như tiếng hát không lời trong dàn nhạc. Nhờ cây vĩ tẩm nhựa thông cọ xát liên tục, đàn nhị tạo ra những đường nét liền mạch (legato) mềm mại giữa các nhạc cụ gõ dứt khoát.',
    historicalNote: 'Dàn nhạc miếu tế triều Nguyễn luôn bố trí từ 2 đến 4 cây đàn nhị đối xứng để tạo sự cân bằng âm vực trang trọng.',
    image: '/src/assets/images/royal_instruments_still_life_1793928495633.jpg',
    originEra: 'Thế kỷ XIII (thời Trần) – Định chế hóa trong Miếu nhạc và Yến nhạc triều Nguyễn',
    dimensions: 'Chiều dài cần đàn: 75 – 80 cm; Đường kính ống bầu: 8.5 – 9 cm; Chiều dài vĩ kéo: 70 cm',
    materialDossier: 'Bầu đàn hình ống tiện từ gỗ mun hoa, một đầu bịt da kỳ đà tự nhiên néo dây đồng, vĩ kéo lông đuôi ngựa bạch',
    playingTechnique: 'Kỹ thuật vuốt vĩ liền mạch (legato), ngón miết không nhấc tay, kỹ thuật rung ngón và nhấn nhá tạo sắc thái nghẹn ngào',
    conservationLocation: 'Trung tâm Bảo tồn Di tích Cố đô Huế & Nhà hát Nghệ thuật Truyền thống Cung đình Huế (Thành phố Huế, Việt Nam)',
    artifactVerification: 'Đã đối chiếu hiện vật bảo tàng',
    imageProvenance: 'Ảnh tư liệu lưu trữ'
  },
  {
    id: 'sao-truc',
    name: 'Sáo Trúc',
    hanViet: 'Địch (Hoành Địch)',
    category: 'Bộ Hơi',
    orchestra: 'Tiểu Nhạc',
    role: 'Hòa tấu bè cao, tạo không khí bồng bềnh thanh khiết chốn hoàng cung',
    materials: 'Ống trúc già đồi núi Quảng Trị - Thừa Thiên, thân rỗng khoan lỗ thổi ngang và 6 lỗ bấm ngón',
    acoustic: 'Âm thanh thanh thoát, bay bổng, êm dịu, gợi tả non nước gấm vóc và sự thái bình thịnh trị',
    pentatonicNotes: ['Hò', 'Xự', 'Xang', 'Xê', 'Cống', 'Phan (thổi ngang linh hoạt)'],
    description: 'Sáo Trúc (thổi ngang) là nhạc khí hơi linh hoạt trong Tiểu nhạc cung đình. Khi hòa quyện cùng tiếng tỳ bà và đàn tranh tạo thành bộ ba tao nhã, diễn tấu các bài ngự thính phòng.',
    historicalNote: 'Tài liệu Khâm Định ghi nhận sáo trúc luôn có mặt trong các ban nhạc thường triều và ngự yến.',
    image: '/src/assets/images/royal_instruments_still_life_1793928495633.jpg',
    originEra: 'Thời Tiền Lê – Lý – Định hình tiêu chuẩn cung đình thời Nguyễn',
    dimensions: 'Chiều dài ống sáo: 48 – 52 cm; Đường kính nòng ống: 1.3 – 1.5 cm; 1 lỗ thổi, 6 lỗ bấm, 2 lỗ định âm',
    materialDossier: 'Trúc đồi già trên 3 năm tuổi khai thác tại vùng đồi núi Cố đô, ruột tròn đều, phơi khô trong bóng râm chống nứt',
    playingTechnique: 'Thổi ngang môi miết nhẹ, kỹ thuật rung môi (vibrato), bấm nửa lỗ (micro-fingering) để thể hiện các bậc âm chuyển điệu thức',
    conservationLocation: 'Bảo tàng Cổ vật Cung đình Huế (Số 3 Lê Trực, Thành phố Huế, Việt Nam)',
    artifactVerification: 'Đã đối chiếu hiện vật bảo tàng',
    imageProvenance: 'Ảnh tư liệu lưu trữ'
  },
  {
    id: 'ong-tieu',
    name: 'Ống Tiêu',
    hanViet: 'Tiêu (Động Tiêu)',
    category: 'Bộ Hơi',
    orchestra: 'Tiểu Nhạc',
    role: 'Tạo dải âm trầm mặc, thanh tịnh, sâu lắng cho thính phòng và tế tự',
    materials: 'Ống trúc dày dài, thổi dọc từ miệng ống có vết cắt vát (nhạn khẩu), các lỗ bấm tạo khoảng âm trầm tĩnh',
    acoustic: 'Âm thanh u huyền, trầm ấm, mộc mạc và vang xa trong không gian đêm tĩnh mịch',
    pentatonicNotes: ['Hò', 'Xự', 'Xang', 'Xê', 'Cống (âm vực trầm ấm)'],
    description: 'Khác với sáo trúc thổi ngang với âm sắc lanh lảnh, Tiêu được thổi dọc, cho âm thanh sâu lắng, u tịch, thường dùng trong các buổi nhạc thính phòng cung đình trang nghiêm.',
    historicalNote: 'Tiêu và Địch thường đi đôi với nhau trong các bản ngự thiện, tạo nên sự cân bằng giữa âm vực thanh và âm vực trầm.',
    image: '/src/assets/images/royal_instruments_still_life_1793928495633.jpg',
    originEra: 'Thời Hậu Lê – Quy định trong các dàn nhạc thính phòng triều Nguyễn',
    dimensions: 'Chiều dài thân ống: 65 – 70 cm; Thành ống dày: 0.3 – 0.4 cm; Miệng thổi chữ V (nhạn khẩu)',
    materialDossier: 'Ống trúc dày nhiều đốt (thường là trúc tiêu 7-9 đốt tượng trưng cho sự vững chãi trường tồn), đầu gốc tiện gọt nhẵn bóng',
    playingTechnique: 'Thổi dọc từ miệng ống, ém hơi sâu từ cơ hoành, rung hơi chậm tạo cảm giác thoát tục, trang nghiêm chốn đền đài',
    conservationLocation: 'Bảo tàng Cổ vật Cung đình Huế (Số 3 Lê Trực, Thành phố Huế, Việt Nam)',
    artifactVerification: 'Đã đối chiếu hiện vật bảo tàng',
    imageProvenance: 'Ảnh tư liệu lưu trữ'
  },
  {
    id: 'dan-tam',
    name: 'Đàn Tam',
    hanViet: 'Tam Huyền Cầm',
    category: 'Bộ Dây',
    orchestra: 'Tiểu Nhạc',
    role: 'Tạo âm sắc trầm vang đặc biệt, làm dày phần đệm trung âm cho dàn Tiểu nhạc',
    materials: 'Hộp đàn hình chữ nhật bo tròn các góc bọc da trăn cả hai mặt, cần đàn dài bằng gỗ mun không có phím, mắc 3 dây tơ hoặc kim loại',
    acoustic: 'Âm vang đanh giòn, chắc khỏe, có độ nảy sắc nét khi gảy bằng móng gảy sừng',
    pentatonicNotes: ['Hò (F3)', 'Xự (C4)', 'Xang (F4) - định âm 3 dây buông'],
    description: 'Đàn Tam là nhạc cụ dây độc đáo không có phím bấm trên cần, người diễn tấu dùng ngón tay ấn trực tiếp lên cần gỗ để tạo cao độ ngũ cung linh hoạt. Đàn tam đóng vai trò liên kết âm vực giữa đàn Nguyệt và đàn Nhị trong Tiểu nhạc triều Nguyễn.',
    historicalNote: 'Theo tư liệu của Cục Di sản Văn hóa, Đàn Tam xuất hiện trong các biên chế dàn nhạc thính phòng và đại lễ cung đình, thể hiện sự đa dạng âm sắc bộ dây.',
    image: '/src/assets/images/dan_tam_lute_museum_1793952652465.jpg',
    originEra: 'Thời Trần - Hậu Lê – Tinh chỉnh cấu trúc thùng bọc da trăn thời Chúa Nguyễn & Triều Nguyễn',
    dimensions: 'Chiều dài toàn cây đàn: 90 – 95 cm; Hộp đàn chữ nhật bo góc: 16 x 14 cm; Cần đàn mun không phím',
    materialDossier: 'Khung hộp đàn gỗ trắc, bọc da trăn hoa lớn cả mặt trước và sau, cần gỗ mun đen đặc không gắn phím, 3 trục lên dây chạm hoa mai',
    playingTechnique: 'Bấm ngón trực tiếp vào cần gỗ trơn đòi hỏi cảm nhận cao độ cực kỳ nhạy bén, gảy móng nảy sắc nhọn tạo độ nảy âm giòn giã',
    conservationLocation: 'Bảo tàng Cổ vật Cung đình Huế (Số 3 Lê Trực, Thành phố Huế, Việt Nam)',
    artifactVerification: 'Đã đối chiếu hiện vật bảo tàng',
    imageProvenance: 'Ảnh tư liệu lưu trữ'
  },
  {
    id: 'trong-ban',
    name: 'Trống Bản',
    hanViet: 'Bản Cổ',
    category: 'Bộ Gõ',
    orchestra: 'Cả hai dàn nhạc',
    role: 'Chỉ huy nhịp điệu chính, giữ phách chuẩn xác cho toàn thể ban nhạc',
    materials: 'Tang trống bằng gỗ mít già ghép mộng, một mặt bọc da trâu nạo mỏng căng chặt bằng đinh tre già',
    acoustic: 'Âm thanh đanh gọn, dứt khoát, thanh cao không rền vang như trống lệnh, có tính định hướng nhịp cực chuẩn',
    pentatonicNotes: ['Tùng (Âm chính)', 'Tắc (Âm tang trống)'],
    description: 'Trống bản do người chỉ huy dàn nhạc (thường là bậc thầy nhạc trưởng) trực tiếp đánh. Mọi sự chuyển đoạn điệu thức, tăng tốc (dồn phách) hay dừng lại đều tuân theo hiệu lệnh của tiếng dùi trống bản.',
    historicalNote: 'Nghệ nhân đánh trống bản phải nắm vững toàn bộ tổng phổ của cả chục bài bản cung đình mà không cần nhìn ký âm.',
    image: '/src/assets/images/royal_instruments_still_life_1793928495633.jpg',
    originEra: 'Quy chế Thự Hòa Thanh triều Nguyễn – Điển chế chuẩn mực trong Khâm Định',
    dimensions: 'Đường kính mặt trống: 18 – 20 cm; Chiều cao thân tang trống: 7 – 8 cm; Dùi gõ bằng gỗ ổi/gỗ lim',
    materialDossier: 'Tang gỗ mít già nguyên thớ đục rỗng, mặt da trâu thuộc nạo mỏng phơi nắng giòn, đóng chốt đinh tre già ngâm nước vôi',
    playingTechnique: 'Điểm dùi dứt khoát giữa tâm mặt trống (tiếng Tùng vang dứt) và gõ cạnh tang gỗ (tiếng Tắc đanh giòn), giữ khổ phách chuẩn xác',
    conservationLocation: 'Bảo tàng Cổ vật Cung đình Huế & Nhà hát Duyệt Thị Đường (Thành phố Huế, Việt Nam)',
    artifactVerification: 'Đã đối chiếu hiện vật bảo tàng',
    imageProvenance: 'Ảnh tư liệu lưu trữ'
  },
  {
    id: 'trong-chien',
    name: 'Trống Chiến',
    hanViet: 'Chiến Cổ',
    category: 'Bộ Gõ',
    orchestra: 'Đại Nhạc',
    role: 'Tạo khí thế hào hùng, dũng mãnh, báo hiệu các thời khắc nghi lễ trọng đại',
    materials: 'Gỗ mít già đẽo nguyên khối hình lu rượu, hai mặt bọc da trâu mộng đực, néo chặt bằng dây da',
    acoustic: 'Âm thanh trầm hùng, rền vang như sấm dậy, rung chuyển cả sân rồng Đại triều',
    pentatonicNotes: ['Âm trầm uy nghi rền vang'],
    description: 'Trống Chiến luôn đi cùng cặp và đánh bằng hai dùi gỗ lim dài. Khi phối hợp cùng kèn bầu trong các khúc xuất quân hay tế giao, tiếng trống chiến làm bừng lên khí thế oai nghiêm của giang sơn xã tắc.',
    historicalNote: 'Thời Nguyễn, trống chiến trong cung đình được chạm nổi hình lưỡng long tranh châu sơn son thiếp vàng.',
    image: '/src/assets/images/royal_instruments_still_life_1793928495633.jpg',
    originEra: 'Thời Tây Sơn - Triều Nguyễn – Sử dụng trong Đại Nhạc Đại triều và Tế Đàn Nam Giao',
    dimensions: 'Đường kính mặt trống: 35 – 40 cm; Chiều cao tang trống: 45 – 50 cm; Bố trí theo cặp',
    materialDossier: 'Thân tang trống đẽo từ thân cây mít cổ thụ, sơn son thếp vàng hoa văn mây rồng, bọc da trâu mộng đực dày căng chặt',
    playingTechnique: 'Sử dụng 2 dùi gỗ lim đánh luân phiên hai tay: đánh điểm tâm, vê dùi liên hoàn (roll), néo nhịp tạo khí thế sấm sét',
    conservationLocation: 'Điện Thái Hòa & Đàn Nam Giao lưu trữ mẫu vật tại Bảo tàng Cổ vật Cung đình Huế (Thành phố Huế, Việt Nam)',
    artifactVerification: 'Đã đối chiếu hiện vật bảo tàng',
    imageProvenance: 'Ảnh tư liệu lưu trữ'
  },
  {
    id: 'tam-am-la',
    name: 'Tam Âm La',
    hanViet: 'Tam Âm La',
    category: 'Bộ Gõ',
    orchestra: 'Tiểu Nhạc',
    role: 'Điểm xuyết các điểm nhấn chu kỳ nhịp, tăng tính thánh thót trang nghiêm',
    materials: 'Khung gỗ có tay cầm gắn ba chiếc chiêng la bằng đồng nhỏ có cao độ ba nốt ngũ cung khác nhau, gõ bằng que tre có đầu sừng',
    acoustic: 'Âm thanh kim khí ngân nga, lảnh lót, thanh tịnh như tiếng chuông chùa sớm',
    pentatonicNotes: ['Ba âm cao độ khác nhau tương ứng Hò - Xang - Cống'],
    description: 'Tam Âm La là một trong những nhạc khí gõ độc đáo nhất chỉ tìm thấy trong dàn nhạc cung đình. Ba chiếc la đồng nhỏ được xếp theo hình tam giác, người chơi gõ nhịp nhàng tạo ra hợp âm kim loại thanh tao.',
    historicalNote: 'Tượng trưng cho Thiên - Địa - Nhân (Tam tài) hòa hợp theo triết lý Dịch học phương Đông được vương triều tôn sùng.',
    image: '/src/assets/images/royal_instruments_still_life_1793928495633.jpg',
    originEra: 'Định chế triều Nguyễn (thế kỷ XIX) – Đúc tại Làng Đúc đồng Phường Đúc (Huế)',
    dimensions: 'Khung gỗ dài: 32 cm; Đường kính 3 đĩa la đồng: 8 cm, 9 cm, 10 cm tương ứng 3 cao độ',
    materialDossier: 'Đồng thau pha thiếc tinh khiết đúc thủ công theo tỷ lệ âm học cổ truyền, khung gỗ sơn đen có tay cầm tiện ngấn rồng',
    playingTechnique: 'Dùng que tre bịt mút/sừng gõ dứt điểm từng đĩa theo chu kỳ phách nhịp, tạo dư ba kim loại ngân vang thanh khiết',
    conservationLocation: 'Bảo tàng Cổ vật Cung đình Huế (Số 3 Lê Trực, Thành phố Huế, Việt Nam)',
    artifactVerification: 'Đã đối chiếu hiện vật bảo tàng',
    imageProvenance: 'Ảnh tư liệu lưu trữ'
  },
  {
    id: 'nao-bat',
    name: 'Não Bạt',
    hanViet: 'Đồng Bạt / Chập Chõa',
    category: 'Bộ Gõ',
    orchestra: 'Đại Nhạc',
    role: 'Tạo cao trào kịch tính, mở đầu và kết thúc các đoạn nhạc hùng dũng',
    materials: 'Hai đĩa kim loại bằng đồng thau nguyên chất có núm cầm thắt dải lụa đỏ son',
    acoustic: 'Âm thanh xé toang không gian, vang chói, phấn khích và dồn dập',
    pentatonicNotes: ['Âm kim loại hỗn hợp'],
    description: 'Khi hai mặt bạt đập vào nhau hoặc cọ xát mép, tiếng đồng rực lửa bùng lên bổ trợ cho tiếng trống chiến và kèn bầu, tạo nên sức sống mãnh liệt của ngày hội non sông.',
    historicalNote: 'Chỉ được sử dụng trong các đại lễ ngoài trời, tuyệt đối không dùng trong các không gian tĩnh lặng tế tổ đường.',
    image: '/src/assets/images/royal_instruments_still_life_1793928495633.jpg',
    originEra: 'Thời Hậu Lê – Hoàn thiện đúc đồng thời Nguyễn tại Phường Đúc (Huế)',
    dimensions: 'Đường kính mỗi đĩa: 28 – 32 cm; Núm giữa nhô cao: 4 cm; Trọng lượng cả cặp: ~1.8 kg',
    materialDossier: 'Hợp kim đồng thau đỏ và thiếc tôi luyện nhiệt độ cao, gò mép cong đều, quai núm thắt dải lụa đỏ điều may mắn',
    playingTechnique: 'Hai tay cầm quai lụa đập đối diện trực tiếp (chập mạnh), hoặc cọ xát nghiêng mép đĩa (tạo tiếng xì kim khí rùng rợn kỳ ảo)',
    conservationLocation: 'Bảo tàng Cổ vật Cung đình Huế (Số 3 Lê Trực, Thành phố Huế, Việt Nam)',
    artifactVerification: 'Đã đối chiếu hiện vật bảo tàng',
    imageProvenance: 'Ảnh tư liệu lưu trữ'
  }
];

export const PERFORMANCE_FORMS: PerformanceForm[] = [
  {
    id: 'giao-nhac',
    title: 'Giao Nhạc (Tế Đàn Nam Giao)',
    category: 'Nhạc Lễ Cung Đình',
    context: 'Cử hành tại Đàn Nam Giao vào mùa xuân (định kỳ 3 năm một lần dưới thời Nguyễn), khi Thiên tử đích thân tế Trời Đất cầu mưa thuận gió hòa.',
    costume: 'Nhạc công mặc áo bào dài gấm xanh thanh thiên, đầu đội mũ cánh chuồn thất bảo, thắt lưng đại ngọc thêu mây ngũ sắc.',
    formation: 'Bố trí dàn nhạc đối xứng phân tầng quanh các tầng đàn tròn và đàn vuông theo nguyên lý Trời tròn Đất vuông (Càn Khôn).',
    meaning: 'Tỏ lòng tôn kính tuyệt đối với đấng Tạo hóa, khẳng định tính chính thống của bậc Thiên tử trị vì thiên hạ.',
    instrumentsUsed: ['Kèn Bầu', 'Trống Chiến', 'Chuông Khánh Bác Chung', 'Bác Khánh', 'Tam Âm La'],
    description: 'Giao Nhạc là đỉnh cao của nhạc lễ tế tự vương triều. Âm nhạc trang nghiêm chậm rãi, từng nhịp gõ của chuông đồng và khánh đá vang vọng giữa đất trời lúc nửa đêm rạng sáng.',
    image: '/src/assets/images/nam_giao_altar_hue_1793952638343.jpg'
  },
  {
    id: 'mieu-nhac',
    title: 'Miếu Nhạc (Tế Thái Miếu & Thế Miếu)',
    category: 'Nhạc Lễ Cung Đình',
    context: 'Diễn ra tại Thế Miếu, Triệu Miếu, Thái Miếu vào các ngày sóc vọng, tiết thanh minh, kỵ nhật các vị hoàng đế tiền triều.',
    costume: 'Áo gấm lụa màu tím thẫm hoặc lam đậm thêu chữ Thọ và hoa văn mây lửa uy nghiêm tĩnh mặc.',
    formation: 'Phân thành Đường thượng chi nhạc (trên thềm điện) và Đình hạ chi nhạc (dưới sân điện) đối ứng hòa nhịp.',
    meaning: 'Tưởng nhớ công đức tiên đế khai quốc dựng nghiệp, giáo dục đạo hiếu và giữ gìn gia pháp hoàng gia vững bền.',
    instrumentsUsed: ['Đàn Nhị', 'Đàn Nguyệt', 'Sáo Trúc', 'Trống Bản', 'Khánh Đá'],
    description: 'Âm điệu Miếu Nhạc sâu lắng, thành kính, mỗi cử chỉ dâng rượu, dâng ngọc lụa đều có một khúc nhạc riêng (như khúc Thành Hòa, Tuyên Hòa, Mục Hòa...).',
    image: '/src/assets/images/duyet_thi_duong_theater_1793928493481.jpg'
  },
  {
    id: 'dai-trieu-nhac',
    title: 'Đại Triều Nhạc & Thường Triều Nhạc',
    category: 'Nhạc Lễ Cung Đình',
    context: 'Cử hành trước sân Điện Thái Hòa vào mùng một và rằm hàng tháng khi trăm quan văn võ tề tựu chúc tụng Hoàng đế.',
    costume: 'Đội hình nhạc sinh mang trang phục thêu long phụng vàng rực, đội mão kim khôi trang trọng.',
    formation: 'Đứng thành hai hàng tả hữu dọc theo sân Đại triều phẩm thụ, phân cấp theo trật tự cửu phẩm triều đình.',
    meaning: 'Tôn vinh vương quyền thống nhất, sự uy nghiêm của kỷ cương luật pháp và nền thái bình thịnh trị quốc gia.',
    instrumentsUsed: ['Đại Nhạc (Trống, Kèn Bầu, Não Bạt)', 'Tiểu Nhạc'],
    description: 'Mỗi bước chân của vua lên ngai vàng, mỗi động tác lạy chúc của bá quan đều được phối hợp nhịp nhàng theo hồi trống và hồi kèn đại triều vang lừng.',
    image: '/src/assets/images/thai_hoa_palace_court_1793952624534.jpg'
  },
  {
    id: 'luc-cung-hoa-dang',
    title: 'Vũ khúc Lục Cúng Hoa Đăng',
    category: 'Múa Cung Đình',
    context: 'Trình diễn trong các dịp đại lễ vạn thọ (sinh nhật vua), thánh thọ (thái hậu), hoặc các hội lễ Phật giáo quốc gia chốn hoàng cung.',
    costume: 'Vũ sinh hóa trang tiên đồng ngọc nữ, đầu đội mũ hoa sen đính ngọc, vai khoác xiêm y ngũ sắc rực rỡ, hai tay nâng hoa sen có nến sáng.',
    formation: 'Xếp hình trận hoa sen nở rộ, biến hóa luân chuyển thành chữ Thái Bình, Vạn Tuế, Thiên Thu chúc tụng non sông.',
    meaning: 'Dâng 6 lễ vật thanh tịnh (Hương, Hoa, Đăng, Trà, Quả, Thực) cầu nguyện mưa thuận gió hòa, quốc thái dân an, thiên hạ thái bình.',
    instrumentsUsed: ['Dàn Tiểu Nhạc hoàn chỉnh kết hợp kèn bầu phụ họa'],
    description: 'Lục Cúng Hoa Đăng là viên ngọc sáng nhất trong kho tàng múa cung đình Huế. Điệu múa hòa quyện giữa yếu tố thiền định tâm linh và nét vương giả kiêu sa dưới ánh nến hoa đăng huyền ảo.',
    image: '/src/assets/images/luc_cung_hoa_dang_dance_1793928496126.jpg'
  },
  {
    id: 'mua-bat-dat',
    title: 'Vũ khúc Bát Dật (Văn Vũ & Võ Vũ)',
    category: 'Múa Cung Đình',
    context: 'Nghi lễ tế Giao và miếu điện tế tự cổ truyền, chỉ dành riêng cho phẩm bậc Thiên tử cao nhất.',
    costume: 'Văn vũ mặc áo gấm the xanh tay cầm cành vũ mao và ống sáo thược; Võ vũ mặc nhung phục đỏ tay cầm mác và khiên chắn.',
    formation: '8 hàng x 8 người = 64 vũ sinh nam tề chỉnh, tạo nên thế trận âm dương đối ứng cân bằng hoàn hảo.',
    meaning: 'Biểu trưng cho văn võ song toàn, đất nước vừa có tài đức cai trị muôn dân (Văn) vừa có sức mạnh bảo vệ cương vực non sông (Võ).',
    instrumentsUsed: ['Dàn chuông khánh cổ, trống đại, kèn dăm'],
    description: 'Từng bước chuyển mình của 64 vũ sinh diễn ra trong trật tự nghiêm cẩn tuyệt đối, toát lên sự hùng tráng của một đế chế phương Đông thịnh trị.',
    image: '/src/assets/images/hero_nha_nhac_hue_1793928492915.jpg'
  },
  {
    id: 'dan-dai-nhac-tieu-nhac',
    title: 'Hai Dàn Nhạc Mẫu Mực: Đại Nhạc & Tiểu Nhạc',
    category: 'Dàn Nhạc Mẫu Mực',
    context: 'Hai hình thái tổ chức biên chế chuẩn mực của âm nhạc cung đình triều Nguyễn được điển chế hóa trong Khâm Định Đại Nam Hội Điển Sự Lệ.',
    costume: 'Đại nhạc mặc sắc đỏ son rực lửa; Tiểu nhạc mặc trang phục thanh nhã sắc xanh lam hoặc tím hoa cà.',
    formation: 'Đại nhạc (ngoài trời sân rồng) tạo âm lượng sấm vang; Tiểu nhạc (trong sảnh điện) tạo không gian thính phòng thâm trầm.',
    meaning: 'Thể hiện triết lý Âm Dương tương hợp: Đại nhạc là Dương (khí thế cương dũng), Tiểu nhạc là Âm (thanh tao dịu nhu).',
    instrumentsUsed: ['Trọn bộ hơn 20 loại nhạc cụ cung đình'],
    description: 'Sự phân định rạch ròi giữa Đại nhạc (Đại xuy đả) và Tiểu nhạc (Trúc nhã nhạc) thể hiện trình độ tổ chức âm nhạc bác học bậc cao của vương triều Nguyễn.',
    image: '/src/assets/images/duyet_thi_duong_theater_1793928493481.jpg'
  }
];

export const HISTORY_TIMELINE: HistoryMilestone[] = [
  {
    era: 'Thế kỷ XI - XIV',
    timeRange: 'Thời Lý - Trần',
    title: 'Khởi nguồn mầm mống Nhã nhạc Thăng Long',
    summary: 'Âm nhạc cung đình bắt đầu được hình thành với các quy chế ban đầu, kết hợp giữa yếu tố nhạc bản địa Đại Việt và tiếp thu nhạc khí phương Đông.',
    keyEvents: [
      'Năm 1025: Vua Lý Thái Tổ đặt ra chức Quản giáp để cai quản đội ca vũ cung đình.',
      'Thời nhà Trần: Tiếp nhận thêm các điệu múa và nhạc khí mới sau những chiến thắng hiển hách, biểu diễn trong các dịp mừng công chốn hoàng thành Thăng Long.'
    ],
    significance: 'Đặt nền móng khởi nguyên cho ý thức về âm nhạc cung đình mang tính điển chế độc lập của quốc gia Đại Việt.',
    dynastyBadge: 'Lý - Trần'
  },
  {
    era: 'Thế kỷ XV - XVI',
    timeRange: 'Thời Hậu Lê',
    title: 'Định hình quy chế Lễ Nhạc Thăng Long',
    summary: 'Dưới triều vua Lê Thái Tông (năm 1437), đại thần Lương Đăng đã dâng sớ định ra điển chế Lễ Nhạc cung đình quy củ đầu tiên của Đại Việt tại kinh đô Thăng Long.',
    keyEvents: [
      'Năm 1437: Lương Đăng dâng sớ định chế độ âm nhạc cung đình: chia thành Đường thượng chi nhạc (trên thềm điện) và Đình hạ chi nhạc (dưới sân điện).',
      'Phân định các loại hình âm nhạc cung đình theo điển lệ: Giao nhạc, Miếu nhạc, Ngũ tự nhạc, Đại triều nhạc, Thường triều nhạc, Yến nhạc, Cung trung chi nhạc, Tế tử nhạc (theo Đại Việt Sử Ký Toàn Thư).'
    ],
    significance: 'Cột mốc xác lập hệ thống lý luận âm nhạc cung đình quy phạm đầu tiên trong lịch sử Đại Việt trước khi dòng nhạc chuyển dịch về Phú Xuân - Huế.',
    dynastyBadge: 'Hậu Lê'
  },
  {
    era: 'Thế kỷ XVII - XVIII',
    timeRange: 'Thời Chúa Nguyễn (Đàng Trong)',
    title: 'Dịch chuyển vào Nam & Giao thoa văn hóa Phú Xuân',
    summary: 'Các chúa Nguyễn khai mở xứ Đàng Trong, lập thủ phủ tại Phú Xuân (Huế), tạo nên vùng đất mới tiếp nhận và làm giàu bản sắc nhạc cung đình.',
    keyEvents: [
      'Chúa Sãi Nguyễn Phúc Nguyên thu dụng nhạc sư Đào Duy Từ, xây dựng hệ thống ca vũ cung đình mới mẻ mang sắc thái phóng khoáng phương Nam.',
      'Định hình tiền thân của phong cách âm nhạc Phú Xuân - Huế với âm hưởng ngũ cung Nam oán đặc trưng da diết.'
    ],
    significance: 'Gắn kết số phận của dòng nhạc cung đình với mảnh đất Cố đô Huế linh thiêng.',
    dynastyBadge: 'Chúa Nguyễn'
  },
  {
    era: '1802 - 1945',
    timeRange: 'Triều Nguyễn (Đỉnh cao hưng thịnh)',
    title: 'Đỉnh cao điển chế hóa & Xây dựng Duyệt Thị Đường',
    summary: 'Hoàng đế Gia Long thống nhất đất nước, định đô tại Huế. Vua Minh Mạng, Thiệu Trị, Tự Đức đưa Nhã nhạc lên đỉnh cao rực rỡ nhất trong lịch sử dân tộc.',
    keyEvents: [
      'Năm 1826: Vua Minh Mạng cho xây dựng Nhà hát Duyệt Thị Đường trong Tử Cấm Thành – nhà hát cổ xưa nhất của Việt Nam còn tồn tại.',
      'Ban hành Khâm Định Đại Nam Hội Điển Sự Lệ quy định chi tiết số lượng nhạc công, trang phục, bài bản cho từng nghi lễ tế tự hoàng gia.',
      'Sáng lập cơ quan quản lý chuyên trách: Việt Đông Đội, Thự Hòa Thanh, quy tụ hàng trăm nhạc sinh xuất sắc khắp cả nước.'
    ],
    significance: 'Đúc kết hệ thống Nhã nhạc cung đình Huế hoàn thiện nhất về biên chế, tổng phổ, trang phục và nghệ thuật trình diễn.',
    dynastyBadge: 'Triều Nguyễn'
  },
  {
    era: '1945 - 1990',
    timeRange: 'Hậu quân chủ & Nguy cơ mai một',
    title: 'Thăng trầm lịch sử & Nỗ lực gìn giữ thầm lặng',
    summary: 'Sau khi vua Bảo Đại thoái vị năm 1945 và qua các cuộc chiến tranh khốc liệt, các ban nhạc cung đình giải thể, Nhã nhạc đứng trước nguy cơ thất truyền.',
    keyEvents: [
      'Các nghệ nhân cung đình lưu lạc trong dân gian, âm thầm gìn giữ bài bản qua việc chơi nhạc cho các lễ hội làng, đám tang, nghi lễ tâm linh xứ Huế.',
      'Các bậc đại thụ như cụ Lữ Hữu Thi (mất 2016, thọ 106 tuổi), cụ Trần Kích (1921 - 2010, NSƯT) kiên trì truyền dạy ngón đàn bằng phương thức truyền khẩu "hò xự xang" cho con cháu và học trò.'
    ],
    significance: 'Giai đoạn thử thách sinh tử, chứng minh sức sống mãnh liệt của di sản trong lòng người dân xứ Huế.',
    dynastyBadge: 'Giai đoạn bảo tồn gian nan'
  },
  {
    era: '2003 & 2008',
    timeRange: 'UNESCO Vinh danh Thế giới',
    title: 'Vươn tầm nhân loại: Kiệt tác di sản thế giới',
    summary: 'Với sự chung tay của các nhà nghiên cứu hàng đầu (cố GS.TS Trần Văn Khê) và Trung tâm Bảo tồn Di tích Cố đô Huế, hồ sơ Nhã nhạc được chuẩn bị công phu.',
    keyEvents: [
      'Ngày 7 tháng 11 năm 2003: UNESCO chính thức công bố Nhã nhạc cung đình Huế là Kiệt tác Di sản Truyền khẩu và Phi vật thể của Nhân loại (Di sản phi vật thể đầu tiên của Việt Nam).',
      'Năm 2008: Được chuyển tiếp vào Danh sách Di sản Văn hóa Phi vật thể Đại diện của Nhân loại theo Công ước 2003 của UNESCO (chuyển tiếp danh mục, không phải công nhận lần đầu) [UNESCO RL/00074].'
    ],
    significance: 'Khẳng định giá trị kiệt xuất toàn cầu của di sản âm nhạc bác học cung đình Việt Nam trên trường quốc tế.',
    dynastyBadge: 'UNESCO'
  },
  {
    era: 'Hôm nay & Mai sau',
    timeRange: 'Thế kỷ XXI',
    title: 'Hồi sinh rực rỡ, số hóa & Giáo dục thế hệ trẻ',
    summary: 'Nhã nhạc cung đình Huế được biểu diễn hàng ngày tại Duyệt Thị Đường, lưu diễn quốc tế, đưa vào trường đại học và số hóa lưu trữ đa phương tiện.',
    keyEvents: [
      'Nhà hát Nghệ thuật Truyền thống Cung đình Huế biểu diễn phục vụ hàng triệu lượt khách du lịch và các nguyên thủ quốc gia.',
      'Học viện Âm nhạc Huế mở mã ngành đào tạo cử nhân Nhã nhạc chuyên nghiệp.',
      'Triển khai dự án bảo tàng số, ký âm số hóa các bài bản cổ và bảo tồn sống di sản.'
    ],
    significance: 'Di sản không còn là cổ vật nằm trong tủ kính mà trở thành mạch nguồn văn hóa sống động nuôi dưỡng tâm hồn người Việt.',
    dynastyBadge: 'Thời đại số'
  }
];

export const HERITAGE_SITES: HeritageSite[] = [
  {
    id: 'duyet-thi-duong',
    name: 'Nhà hát Duyệt Thị Đường',
    type: 'Điểm biểu diễn & bảo tồn hiện nay',
    location: 'Tử Cấm Thành, Đại Nội, Thành phố Huế, Việt Nam',
    builtYear: '1826 (Năm Minh Mạng thứ 7)',
    historicalRole: 'Nhà hát hoàng gia cổ nhất Việt Nam, nơi các hoàng đế, hoàng thái hậu và đại thần triều Nguyễn thưởng thức Nhã nhạc và tuồng cung đình.',
    currentActivity: 'Không gian biểu diễn định kỳ hàng ngày của Nhà hát Nghệ thuật Truyền thống Cung đình Huế, phục vụ du khách và nghiên cứu quốc tế.',
    description: 'Duyệt Thị Đường có cấu trúc nhà hát bằng gỗ lim đồ sộ, trần sơn son vẽ cảnh mặt trăng, mặt trời và các vì sao lấp lánh. Hệ thống cột đồng đắp nổi hình rồng mạ vàng cùng sàn diễn truyền thống tạo nên âm học tự nhiên hoàn hảo cho nhạc cụ cổ.',
    image: '/src/assets/images/duyet_thi_duong_theater_1793928493481.jpg',
    coordinates: { x: 55, y: 40 },
    gpsCoordinates: { lat: 16.4705, lng: 107.5786 },
    googleMapsUrl: 'https://maps.google.com/?q=16.4705,107.5786',
    conservationDossier: 'Trùng tu hoàn nguyên năm 2003 theo dự án hợp tác UNESCO - Việt Nam; hiện vật sàn gỗ và hệ khung vì kèo lim thếp vàng được bảo tồn nguyên dạng.'
  },
  {
    id: 'dien-thai-hoa',
    name: 'Điện Thái Hòa & Sân Đại Triều Nghi',
    type: 'Không gian lịch sử hoàng gia',
    location: 'Trung tâm Hoàng thành, Đại Nội, Thành phố Huế, Việt Nam',
    builtYear: '1805 (Thời vua Gia Long, tu bổ thời Minh Mạng)',
    historicalRole: 'Nơi tổ chức các nghi lễ Đại triều, lễ đăng quang, mừng thọ vạn thọ và tiếp kiến các sứ thần quốc tế với sự hiện diện của dàn Đại nhạc uy nghiêm.',
    currentActivity: 'Di tích quốc gia đặc biệt, không gian tái hiện lễ đổi gác, biểu diễn trích đoạn Đại triều nhạc trong các kỳ Festival Huế.',
    description: 'Trước thềm Điện Thái Hòa là sân rồng hai tầng (Sân Đại triều nghi) có các bia đá ghi cửu phẩm văn võ quan viên. Đây là nơi tiếng trống chiến và kèn dăm của dàn Đại nhạc từng vang lên chấn động cả kinh đô.',
    image: '/src/assets/images/thai_hoa_palace_court_1793952624534.jpg',
    coordinates: { x: 50, y: 60 },
    gpsCoordinates: { lat: 16.4695, lng: 107.5779 },
    googleMapsUrl: 'https://maps.google.com/?q=16.4695,107.5779',
    conservationDossier: 'Dự án bảo tồn trùng tu tổng thể di tích Điện Thái Hòa hoàn thành năm 2024 đảm bảo cấu trúc gỗ cung đình chịu lực và chống mối mọt.'
  },
  {
    id: 'dan-nam-giao',
    name: 'Đàn Nam Giao',
    type: 'Không gian lịch sử hoàng gia',
    location: 'Đường Ngự Bình, phường An Cựu, Thành phố Huế, Việt Nam',
    builtYear: '1806 (Thời vua Gia Long)',
    historicalRole: 'Khu tế đàn ngoài trời thiêng liêng nhất của vương triều Nguyễn, nơi diễn ra đại lễ Tế Giao với dàn Giao nhạc trang nghiêm bậc nhất.',
    currentActivity: 'Địa điểm phục dựng đại lễ Tế Nam Giao trong các kỳ Festival Huế, thu hút hàng vạn nhân dân và du khách chiêm bái.',
    description: 'Đàn Nam Giao gồm 3 tầng: Tầng trên cùng hình tròn (Viên Đàn tượng trưng cho Trời, sơn màu xanh), tầng giữa hình vuông (Phương Đàn tượng trưng cho Đất, màu vàng), tầng dưới cùng hình vuông tượng trưng cho Người (màu đỏ). Tiếng chuông khánh và đại xuy đả giữa rừng thông hòa cùng gió ngàn tạo nên âm sắc thiêng liêng.',
    image: '/src/assets/images/nam_giao_altar_hue_1793952638343.jpg',
    coordinates: { x: 30, y: 85 },
    gpsCoordinates: { lat: 16.4428, lng: 107.5842 },
    googleMapsUrl: 'https://maps.google.com/?q=16.4428,107.5842',
    conservationDossier: 'Khuôn viên thông đàn 10 hecta được khoanh vùng bảo vệ cấp I; hệ thống lan can đá và đàn tế phục hồi theo mộc bản Khâm Định.'
  },
  {
    id: 'the-mieu',
    name: 'Thế Miếu & Cửu Đỉnh',
    type: 'Không gian lịch sử hoàng gia',
    location: 'Góc Tây Nam Hoàng thành, Đại Nội, Thành phố Huế, Việt Nam',
    builtYear: '1821 (Thời vua Minh Mạng)',
    historicalRole: 'Nơi thờ tự các vị hoàng đế nhà Nguyễn, không gian cử hành Miếu nhạc thiêng liêng tôn vinh cội nguồn tổ tiên vương triều.',
    currentActivity: 'Điểm tham quan tâm linh văn hóa, nơi tổ chức các lễ kỵ nhật hoàng gia với nhạc lễ truyền thống trang trọng.',
    description: 'Thế Miếu là công trình gỗ chạm khắc tinh xảo bậc nhất, phía trước sân là 9 đỉnh đồng khổng lồ (Cửu Đỉnh). Nhã nhạc tại đây luôn mang tính chất chậm rãi, thanh thoát, kết hợp giữa Đường thượng chi nhạc và Đình hạ chi nhạc.',
    image: '/src/assets/images/hero_nha_nhac_hue_1793928492915.jpg',
    coordinates: { x: 35, y: 55 },
    gpsCoordinates: { lat: 16.4682, lng: 107.5758 },
    googleMapsUrl: 'https://maps.google.com/?q=16.4682,107.5758',
    conservationDossier: 'Bảo tồn nguyên vẹn hệ thống Cửu Đỉnh (Bảo vật Quốc gia) và án thờ các vua triều Nguyễn; duy trì hương hỏa định kỳ theo điển lễ truyền thống.'
  },
  {
    id: 'bao-tang-co-vat-cung-dinh',
    name: 'Bảo tàng Cổ vật Cung đình Huế (Điện Long An)',
    type: 'Điểm biểu diễn & bảo tồn hiện nay',
    location: 'Số 3 đường Lê Trực, phường Thuận Thành, Thành phố Huế, Việt Nam',
    builtYear: '1845 (Thời vua Thiệu Trị)',
    historicalRole: 'Nguyên là Điện Long An trong cung Bảo Định, kiệt tác kiến trúc cung đình bằng gỗ quý chạm trổ thơ ca chữ Hán thếp vàng.',
    currentActivity: 'Trưng bày bộ sưu tập nhạc cụ cung đình nguyên bản quý hiếm thời Nguyễn: chuông đồng, khánh ngọc, trống cổ, đàn tỳ bà khảm xà cừ.',
    description: 'Bảo tàng là kho báu hiện vật xác thực giúp hậu thế hình dung sống động về kích thước, vật liệu và đẳng cấp mỹ thuật của các nhạc khí cung đình thực tế.',
    image: '/src/assets/images/royal_instruments_still_life_1793928495633.jpg',
    coordinates: { x: 70, y: 45 },
    gpsCoordinates: { lat: 16.4719, lng: 107.5815 },
    googleMapsUrl: 'https://maps.google.com/?q=16.4719,107.5815',
    conservationDossier: 'Bộ sưu tập nhạc khí được kiểm kê hiện vật định kỳ theo quy chế bảo tàng quốc gia, lưu trữ trong phòng kiểm soát độ ẩm 55% - 65%.'
  }
];

export const HERITAGE_ROUTES: HeritageRoute[] = [
  {
    id: 'route-royal-court',
    title: 'Tuyến Hoàng Cung & Điển Chế Lễ Nhạc',
    subtitle: 'Khám phá trái tim vương triều và các không gian biểu diễn Nhã nhạc mẫu mực',
    duration: '3.5 - 4.0 giờ',
    distance: '~2.8 km (đi bộ trong Đại Nội)',
    recommendedTransport: 'Đi bộ hoặc xe điện di sản nội thành',
    theme: 'Quy phạm Lễ Nhạc & Không gian biểu diễn chính thống',
    description: 'Hành trình dẫn lối du khách qua trục dũng đạo linh thiêng nhất của Hoàng thành Huế, từ sân Đại triều uy nghiêm đến nhà hát hoàng gia cổ xưa nhất Việt Nam.',
    stops: [
      {
        order: 1,
        name: 'Cửa Ngọ Môn & Kỳ Đài',
        siteId: 'ngo-mon',
        stayDuration: '30 phút',
        highlight: 'Khởi đầu tuyến tham quan, nơi từng cử hành lễ Tuyên ngôn thoái vị năm 1945 và các lễ xướng danh',
        historicalContext: 'Cửa chính Nam của Hoàng thành, nơi các hồi trống và kèn lệnh vang lên nghênh đón vua ngự giá.'
      },
      {
        order: 2,
        name: 'Sân Đại Triều Nghi & Điện Thái Hòa',
        siteId: 'dien-thai-hoa',
        stayDuration: '50 phút',
        highlight: 'Không gian cử hành Đại triều nhạc với hai hàng văn võ bá quan đứng theo bia cửu phẩm',
        historicalContext: 'Nơi dàn Đại Nhạc hòa tấu khúc Đăng Đàn Cung và các nhạc chương chúc tụng vương quyền tối thượng.'
      },
      {
        order: 3,
        name: 'Thế Miếu & Cửu Đỉnh',
        siteId: 'the-mieu',
        stayDuration: '40 phút',
        highlight: 'Không gian cử hành Miếu nhạc thiêng liêng tôn vinh cội nguồn các bậc tiên đế',
        historicalContext: 'Nơi Đường thượng chi nhạc và Đình hạ chi nhạc đối ứng trong khói trầm nghi ngút và các nhạc chương Mục Hòa, Thành Hòa.'
      },
      {
        order: 4,
        name: 'Nhà hát Duyệt Thị Đường (Tử Cấm Thành)',
        siteId: 'duyet-thi-duong',
        stayDuration: '60 phút',
        highlight: 'Thưởng thức trực tiếp suất diễn Nhã nhạc và múa Lục Cúng Hoa Đăng của nghệ sĩ Cung đình',
        historicalContext: 'Nhà hát hoàng gia xây dựng năm 1826 dưới triều vua Minh Mạng, bảo tồn nguyên vẹn kiến trúc âm học cổ.'
      }
    ],
    tips: 'Nên canh giờ biểu diễn định kỳ tại Duyệt Thị Đường (suất sáng 10h00, suất chiều 15h00) để kết hợp trọn vẹn trải nghiệm nghe nhìn.'
  },
  {
    id: 'route-nam-giao',
    title: 'Tuyến Tế Tự Trời Đất & Vũ Trụ Nam Giao',
    subtitle: 'Hành trình tâm linh chiêm bái đại lễ tế ngoài trời quy mô bậc nhất triều Nguyễn',
    duration: '2.0 - 2.5 giờ',
    distance: '~5.2 km (từ Hoàng thành đến đàn Nam Giao)',
    recommendedTransport: 'Xe đạp, taxi hoặc xe bus di sản Cố đô',
    theme: 'Giao Nhạc thiêng liêng giữa vũ trụ và nhân gian',
    description: 'Rời trung tâm Hoàng thành di chuyển về phía Nam theo trục đường Ngự Bình rợp bóng thông xanh để đến đàn tế Trời Đất linh thiêng.',
    stops: [
      {
        order: 1,
        name: 'Khu rừng thông Ngự Bình & Cửa Tây đàn Nam Giao',
        siteId: 'nam-giao-forest',
        stayDuration: '20 phút',
        highlight: 'Không gian tĩnh mịch thoang thoảng hương nhựa thông, cảm nhận sự giao hòa với thiên nhiên',
        historicalContext: 'Đàn Nam Giao được vua Gia Long cho xây năm 1806, bao quanh bởi rừng thông do các hoàng thân đích thân trồng.'
      },
      {
        order: 2,
        name: 'Phương Đàn (Tầng Đất & Người)',
        siteId: 'dan-nam-giao-square',
        stayDuration: '40 phút',
        highlight: 'Hai tầng vuông tượng trưng cho Mẹ Đất và muôn dân, vị trí bố trí hàng trăm nhạc sinh Đại Nhạc',
        historicalContext: 'Nơi đặt các hương án và dàn trống chiến, kèn dăm tạo nên âm vang trầm hùng vang vọng khắp núi Ngự Bình.'
      },
      {
        order: 3,
        name: 'Viên Đàn (Tầng Trời xanh)',
        siteId: 'dan-nam-giao-round',
        stayDuration: '45 phút',
        highlight: 'Tầng tròn cao nhất sơn màu xanh thanh thiên, nơi Thiên tử đối diện với Thượng đế',
        historicalContext: 'Nơi cất lên những hồi chuông khánh thánh thót giữa canh ba rạng sáng, cầu mưa thuận gió hòa cho muôn dân.'
      }
    ],
    tips: 'Trang phục trang nghiêm, lịch sự khi bước lên các tầng tế đàn. Buổi sáng sớm hoặc hoàng hôn là thời điểm ánh sáng và âm cảnh đẹp nhất.'
  },
  {
    id: 'route-master-craft',
    title: 'Tuyến Ký Ức Cổ Vật & Bậc Thầy Nghệ Nhân Cố Đô',
    subtitle: 'Gặp gỡ hiện vật cổ quý giá và tri ân các dòng họ giữ lửa âm nhạc cung đình',
    duration: '3.0 - 3.5 giờ',
    distance: '~6.8 km',
    recommendedTransport: 'Xe máy, xe đạp hoặc ô tô du lịch',
    theme: 'Văn hóa vật thể & Phi vật thể: Sự trao truyền sống động',
    description: 'Kết nối kho báu hiện vật nhạc khí tại Điện Long An với các địa danh lịch sử gắn liền với đời sống các nghệ nhân bậc thầy Lữ Hữu Thi, Trần Kích và làng nghề đúc đồng Cố đô.',
    stops: [
      {
        order: 1,
        name: 'Bảo tàng Cổ vật Cung đình Huế (Điện Long An - Số 3 Lê Trực)',
        siteId: 'bao-tang-co-vat-cung-dinh',
        stayDuration: '60 phút',
        highlight: 'Chiêm ngưỡng tận mắt bộ sưu tập chuông đồng, khánh đá, đàn tỳ bà khảm ốc thế kỷ XIX',
        historicalContext: 'Kiệt tác kiến trúc gỗ lim thời vua Thiệu Trị, lưu giữ những hiện vật nhạc khí cung đình xác thực nhất của Việt Nam.'
      },
      {
        order: 2,
        name: 'Làng đúc đồng Phường Đúc (Bờ Nam sông Hương)',
        siteId: 'phuong-duc',
        stayDuration: '45 phút',
        highlight: 'Tìm hiểu quy trình đúc thủ công chuông đồng, tam âm la, não bạt cung đình qua hàng trăm năm',
        historicalContext: 'Cái nôi chế tác các nhạc cụ kim khí cho hoàng gia triều Nguyễn từ thời các chúa Nguyễn khai mở phương Nam.'
      },
      {
        order: 3,
        name: 'Không gian tưởng niệm Cố NNƯT Lữ Hữu Thi (Thế Lại Thượng) & Cố NSƯT Trần Kích',
        siteId: 'commemoration-space',
        stayDuration: '45 phút',
        highlight: 'Lắng nghe những câu chuyện về ngón đàn kìm, tiếng kèn bầu huyền thoại và lòng kiên trung gìn giữ di sản',
        historicalContext: 'Nơi các bậc tiền bối đã kiên trì truyền khẩu từng bản nhạc qua những năm tháng đất nước gian khó, dẫn đến kỳ tích UNESCO 2003.'
      }
    ],
    tips: 'Có thể liên hệ trước với Trung tâm Bảo tồn Di tích Cố đô Huế để được hướng dẫn chuyên sâu về các di cảo ký âm cổ.'
  }
];

export const COMMUNITY_SUBJECTS: CommunitySubject[] = [
  {
    id: 'nghe-nhan-lao-thanh',
    groupName: 'Bậc thầy nghệ nhân tiền bối & Cây cao bóng cả',
    role: 'Những người giữ "hồn vía" và kho tàng bài bản nguyên gốc qua những năm tháng bom đạn khốc liệt',
    representativeFigures: [
      'Cố Nghệ nhân Ưu tú Lữ Hữu Thi (mất ngày 15/09/2016, hưởng thọ 106 tuổi theo ghi nhận báo chí; đại thụ kèn bầu & đàn nguyệt, từng biểu diễn phục vụ hoàng đế Bảo Đại) [Báo Pháp Luật 16/09/2016]',
      'Cố Nghệ sĩ Ưu tú Trần Kích (1921 - 2010; bậc thầy đàn nhị & tỳ bà, được Nhà nước trao tặng danh hiệu Nghệ sĩ Ưu tú năm 2007 và được chính phủ Pháp trao tặng Huân chương Văn học Nghệ thuật) [Báo Tuổi Trẻ 10/12/2010]'
    ],
    activities: 'Thuộc làu hàng chục bài bản cổ qua trí nhớ, truyền dạy ngón nghề cho lớp học trò kế cận, cố vấn khoa học cho hồ sơ UNESCO.',
    story: 'Cụ Lữ Hữu Thi từng chia sẻ: "Dù vương triều đã khép lại, nhưng tiếng kèn, tiếng trống của tổ tiên là báu vật nghìn năm. Ngày nào đôi tay còn bấm được phím đàn, ngày đó tôi còn truyền lại cho con cháu."',
    challenges: 'Nhiều nghệ nhân gạo cội đã về cõi vĩnh hằng, việc ký âm lại những ngón đàn bí truyền đòi hỏi thời gian và lòng kiên nhẫn to lớn.',
    image: '/src/assets/images/master_artisan_portrait_1793928495965.jpg'
  },
  {
    id: 'nha-hat-cung-dinh',
    groupName: 'Nghệ sĩ & Nhạc công Nhà hát Cung đình Huế',
    role: 'Lực lượng nòng cốt biểu diễn thực hành, phục dựng trang phục và bảo tồn "sống" di sản hàng ngày',
    representativeFigures: [
      'NSƯT Trần Thảo (Giám đốc chuyên môn, con trai kế nghiệp cố nghệ nhân Trần Kích)',
      'Tập thể diễn viên, nhạc công Nhà hát Nghệ thuật Truyền thống Cung đình Huế'
    ],
    activities: 'Trình diễn tại Duyệt Thị Đường, lưu diễn giao lưu văn hóa tại hơn 30 quốc gia trên thế giới, tập luyện phục dựng các vở múa cổ.',
    story: 'Mỗi ngày biểu diễn tại Duyệt Thị Đường, các nghệ sĩ trẻ khoác lên mình bộ áo gấm hoàng gia, đem âm vang của tiền nhân truyền đến trái tim du khách năm châu.',
    challenges: 'Đòi hỏi sự khổ luyện nhiều năm nhưng chế độ đãi ngộ nghệ thuật truyền thống còn nhiều trăn trở trước áp lực kinh tế hiện đại.',
    image: '/src/assets/images/duyet_thi_duong_theater_1793928493481.jpg'
  },
  {
    id: 'che-tac-nhac-cu',
    groupName: 'Nghệ nhân chế tác & Bảo quản nhạc cụ',
    role: 'Những người thợ tài hoa làm sống dậy hình hài và âm sắc tinh tế của các nhạc khí cổ truyền',
    representativeFigures: [
      'Làng đúc đồng Phường Đúc (Huế) – chế tác chuông, tam âm la, não bạt',
      'Các nghệ nhân mộc mỹ nghệ chuyên phục chế thùng đàn ngô đồng và cần tỳ bà khảm xà cừ'
    ],
    activities: 'Tìm kiếm vật liệu gỗ ngô đồng đúng mùa, da trăn, gân tơ tự nhiên để tái hiện chuẩn xác âm thanh cung đình xưa.',
    story: 'Một cây đàn tỳ bà hay kèn bầu cung đình đòi hỏi hàng tháng ròng chọn gỗ, phơi sương, trau chuốt từng then phím để đạt được cao độ ngũ cung chuẩn xác.',
    challenges: 'Nguyên liệu tự nhiên quý hiếm ngày càng khan hiếm; người thợ trẻ theo nghề chế tác thủ công truyền thống không nhiều.',
    image: '/src/assets/images/royal_instruments_still_life_1793928495633.jpg'
  },
  {
    id: 'the-he-ke-can',
    groupName: 'Giảng viên, Sinh viên & Thế hệ kế cận',
    role: 'Cầu nối tri thức học thuật, đưa Nhã nhạc vào hệ thống giáo dục chính quy và lan tỏa đến giới trẻ',
    representativeFigures: [
      'Khoa Âm nhạc Di sản – Học viện Âm nhạc Huế',
      'Các câu lạc bộ sinh viên bảo tồn văn hóa cố đô'
    ],
    activities: 'Ký âm bài bản cổ sang hệ thống ký âm quốc tế kết hợp ký âm Hán Nôm; tổ chức hòa nhạc di sản trong học đường.',
    story: 'Các bạn trẻ thế hệ Gen Z tại Huế ngày nay đã biết kết hợp công nghệ số, làm podcast, video tư liệu để kể câu chuyện di sản bằng góc nhìn tươi mới.',
    challenges: 'Cần tạo thêm môi trường diễn xướng sáng tạo để các bạn trẻ gắn bó lâu dài với di sản thay vì chuyển sang âm nhạc thị trường.',
    image: '/src/assets/images/luc_cung_hoa_dang_dance_1793928496126.jpg'
  }
];

export const AUDIO_TRACKS: AudioTrack[] = [
  {
    id: 'luu-thuy-kim-tien',
    title: 'Lưu Thủy – Kim Tiền',
    genre: 'Tiểu Nhạc / Khúc Ngự Thính Phòng',
    tempo: 'Khoan thai, thanh nhã (Moderato)',
    duration: '03:45',
    origin: 'Bài bản kinh điển trong Mười Bản Ngự cung đình Huế',
    description: 'Miêu tả dòng nước êm đềm trôi chảy và đồng tiền vàng biểu trưng cho sự phồn vinh thịnh trị của đất nước.',
    notesSequence: [330, 392, 440, 523, 587, 659, 587, 523, 440, 392, 330]
  },
  {
    id: 'xuan-phong-long-ho',
    title: 'Xuân Phong – Long Hổ',
    genre: 'Đại Nhạc & Tiểu Nhạc',
    tempo: 'Rộn rã, sinh động (Allegro vivace)',
    duration: '04:12',
    origin: 'Biểu diễn trong các buổi yến tiệc và hội hè cung đình mừng xuân mới',
    description: 'Gió xuân thổi về mang sinh khí tươi vui khắp cung điện, rồng lượn cọp gầm biểu hiện khí thế sung mãn của giang sơn.',
    notesSequence: [392, 440, 523, 587, 659, 784, 659, 587, 523, 440, 392]
  },
  {
    id: 'phu-luc-dich',
    title: 'Phú Lục Cung Đình',
    genre: 'Nhạc Khúc Thính Phòng Hoàng Cung',
    tempo: 'Trầm tư, sâu lắng (Andante cantabile)',
    duration: '05:02',
    origin: 'Điệu nhạc đậm đà tính trữ tình xứ Huế, dành cho đàn Tranh và Tỳ Bà hòa tấu',
    description: 'Khúc nhạc chan chứa vẻ đẹp mộng mơ cổ kính của Cố đô, với những quãng luyến láy mang màu sắc Nam oán độc đáo.',
    notesSequence: [293, 330, 392, 440, 523, 440, 392, 330, 293]
  },
  {
    id: 'dang-dan-cung',
    title: 'Đăng Đàn Cung (Quốc thiều triều Nguyễn)',
    genre: 'Đại Lễ Nhạc Triều Đình',
    tempo: 'Trang trọng, uy nghiêm (Maestoso)',
    duration: '03:30',
    origin: 'Soạn thảo dưới triều Nguyễn, từng được dùng làm quốc thiều trong các dịp đón quốc khách',
    description: 'Giai điệu hùng tráng xướng chúc vua thọ vạn tuế, sơn hà xã tắc thái bình muôn năm.',
    notesSequence: [261, 330, 392, 440, 523, 659, 523, 440, 392, 330, 261]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Nhã nhạc cung đình Huế được UNESCO công nhận là "Kiệt tác Di sản Truyền khẩu và Phi vật thể của Nhân loại" vào năm nào?',
    options: [
      'A. Năm 1993',
      'B. Năm 2003',
      'C. Năm 2008',
      'D. Năm 2010'
    ],
    correctIndex: 1,
    explanation: 'Ngày 7/11/2003, UNESCO chính thức vinh danh Nhã nhạc cung đình Huế là Kiệt tác Di sản Truyền khẩu và Phi vật thể của Nhân loại (sau đó đưa vào Danh sách đại diện năm 2008).'
  },
  {
    id: 2,
    question: 'Dưới triều đại phong kiến nào ở Việt Nam, Nhã nhạc cung đình phát triển đạt đến đỉnh cao rực rỡ và hoàn thiện nhất về tổ chức biên chế?',
    options: [
      'A. Triều Lý',
      'B. Triều Trần',
      'C. Triều Hậu Lê',
      'D. Triều Nguyễn'
    ],
    correctIndex: 3,
    explanation: 'Dưới triều Nguyễn (1802 - 1945), với việc định đô tại Huế, các vị vua Gia Long, Minh Mạng đã xây dựng Duyệt Thị Đường, điển chế hóa tỉ mỉ và đưa Nhã nhạc lên đỉnh cao hưng thịnh.'
  },
  {
    id: 3,
    question: 'Nhà hát hoàng gia cổ nhất của Việt Nam còn tồn tại đến ngày nay nằm trong Tử Cấm Thành Huế có tên là gì?',
    options: [
      'A. Nhà hát Lớn Hà Nội',
      'B. Duyệt Thị Đường',
      'C. Minh Khiêm Đường',
      'D. Cửu Tư Đài'
    ],
    correctIndex: 1,
    explanation: 'Duyệt Thị Đường được xây dựng vào năm 1826 dưới triều vua Minh Mạng, là nhà hát hoàng gia cổ nhất Việt Nam, nơi biểu diễn Nhã nhạc và tuồng cung đình cho vua chúa thưởng thức.'
  },
  {
    id: 4,
    question: 'Nhạc cụ nào giữ vai trò lĩnh xướng, dẫn dắt giai điệu chính trong dàn Đại Nhạc cung đình Huế?',
    options: [
      'A. Đàn Nguyệt',
      'B. Đàn Tỳ Bà',
      'C. Kèn Bầu (Gia Lệnh)',
      'D. Sáo Trúc'
    ],
    correctIndex: 2,
    explanation: 'Kèn Bầu với âm thanh vang dội, hào hùng là nhạc cụ lĩnh xướng số một của dàn Đại Nhạc (Đại xuy đả), dẫn dắt mọi nhạc cụ gõ phụ họa theo trong các lễ tế uy nghiêm.'
  },
  {
    id: 5,
    question: 'Dàn nhạc Nhã nhạc cung đình Huế được phân định thành hai biên chế mẫu mực nào sau đây?',
    options: [
      'A. Nhạc Tiền Triều và Nhạc Hậu Triều',
      'B. Đại Nhạc và Tiểu Nhạc',
      'C. Nhạc Thính Phòng và Nhạc Dân Gian',
      'D. Nhạc Lễ Hội và Nhạc Tuồng'
    ],
    correctIndex: 1,
    explanation: 'Hai dàn nhạc mẫu mực của cung đình Huế là Đại Nhạc (chủ yếu nhạc cụ gõ và kèn dăm âm vang ngoài trời) và Tiểu Nhạc (chủ yếu nhạc cụ dây và hơi thanh nhã biểu diễn trong cung sảnh).'
  },
  {
    id: 6,
    question: 'Thang âm cơ bản tạo nên hồn cốt giai điệu truyền thống của Nhã nhạc cung đình Huế là thang âm gì?',
    options: [
      'A. Thang âm Thất cung phương Tây (7 nốt Do Re Mi Fa Sol La Si)',
      'B. Thang âm Ngũ cung truyền thống (Hò, Xự, Xang, Xê, Cống)',
      'C. Thang âm Chromatic 12 nửa cung',
      'D. Thang âm Tứ cung dân tộc'
    ],
    correctIndex: 1,
    explanation: 'Nhã nhạc cung đình Huế xây dựng trên hệ thống thang âm ngũ cung phương Đông (Hò, Xự, Xang, Xê, Cống), chia làm hai điệu thức chính là điệu Khách (Bắc) trang trọng và điệu Nam sâu lắng.'
  },
  {
    id: 7,
    question: 'Điệu múa cung đình tiêu biểu nào gắn liền với hình ảnh vũ sinh nâng những đóa hoa sen thắp nến lung linh?',
    options: [
      'A. Múa Bát Dật',
      'B. Lục Cúng Hoa Đăng',
      'C. Tam Tinh Chúc Thọ',
      'D. Lục Triệt Hoa Mã'
    ],
    correctIndex: 1,
    explanation: 'Lục Cúng Hoa Đăng (Múa hoa đăng sáu lễ vật) là vũ khúc cung đình nổi tiếng bậc nhất, các vũ sinh nâng hoa sen thắp nến tạo hình các chữ chúc thọ thái bình.'
  },
  {
    id: 8,
    question: 'Đại thần nào thời Hậu Lê (năm 1437) đã dâng sớ định ra quy chế âm nhạc cung đình gồm Đường thượng chi nhạc và Đình hạ chi nhạc?',
    options: [
      'A. Nguyễn Trãi',
      'B. Lương Đăng',
      'C. Đào Duy Từ',
      'D. Chu Văn An'
    ],
    correctIndex: 1,
    explanation: 'Dưới triều vua Lê Thái Tông (1437), Lương Đăng đã khảo cứu và định chế ra Đường thượng chi nhạc (trên thềm điện) và Đình hạ chi nhạc (dưới sân điện).'
  },
  {
    id: 9,
    question: 'Hai bậc đại thụ nghệ nhân Nhã nhạc cung đình Huế huyền thoại có công gìn giữ và truyền thụ bài bản cho hậu thế sau năm 1945 là ai?',
    options: [
      'A. Cụ Cao Văn Lầu và cụ Ba Đợi',
      'B. Cố NNƯT Lữ Hữu Thi và Cố NSƯT Trần Kích',
      'C. Cụ Nguyễn Vĩnh Bảo và cụ Bảy Triều',
      'D. Cụ Trần Văn Khê và cụ Phạm Duy'
    ],
    correctIndex: 1,
    explanation: 'Cố NNƯT Lữ Hữu Thi (mất ngày 15/09/2016, hưởng thọ 106 tuổi) và Cố NSƯT Trần Kích (1921 - 2010, phong tặng Nghệ sĩ Ưu tú năm 2007) là hai bậc đại thụ có công gìn giữ và truyền thụ bài bản Nhã nhạc cung đình Huế cho hậu thế.'
  },
  {
    id: 10,
    question: 'Địa điểm ngoài trời linh thiêng ở phía Nam kinh thành Huế, nơi diễn ra đại lễ Tế Trời Đất với dàn Giao nhạc trang nghiêm được gọi là gì?',
    options: [
      'A. Đàn Xã Tắc',
      'B. Đàn Nam Giao',
      'C. Đàn Tiên Nông',
      'D. Văn Miếu Huế'
    ],
    correctIndex: 1,
    explanation: 'Đàn Nam Giao (xây năm 1806 thời vua Gia Long) là nơi tế trời đất thiêng liêng nhất của vương triều Nguyễn, nơi tiếng Giao nhạc cất lên lúc nửa đêm rạng sáng cầu quốc thái dân an.'
  }
];

export const GALLERY_PHOTOS = [
  {
    id: 'g1',
    title: 'Hòa tấu Nhã nhạc trước Điện Thái Hòa',
    category: 'Biểu diễn',
    description: 'Dàn nhạc công trong trang phục gấm thêu ngũ sắc triều Nguyễn diễn xướng bài bản cổ.',
    image: '/src/assets/images/hero_nha_nhac_hue_1793928492915.jpg'
  },
  {
    id: 'g2',
    title: 'Không gian Nhà hát Duyệt Thị Đường',
    category: 'Kiến trúc',
    description: 'Nhà hát hoàng gia với hệ thống cột gỗ lim chạm rồng thếp vàng và đèn lồng cổ truyền.',
    image: '/src/assets/images/duyet_thi_duong_theater_1793928493481.jpg'
  },
  {
    id: 'g3',
    title: 'Bộ sưu tập nhạc cụ cung đình nguyên bản',
    category: 'Nhạc cụ',
    description: 'Đàn tỳ bà khảm ốc, đàn nguyệt, kèn bầu và tam âm la lưu giữ nét tài hoa mỹ thuật xưa.',
    image: '/src/assets/images/royal_instruments_still_life_1793928495633.jpg'
  },
  {
    id: 'g4',
    title: 'Vũ khúc Lục Cúng Hoa Đăng lung linh hoa đăng',
    category: 'Múa cung đình',
    description: 'Các nghệ sĩ nâng đèn hoa sen biểu diễn nghi thức cầu nguyện thái bình non nước.',
    image: '/src/assets/images/luc_cung_hoa_dang_dance_1793928496126.jpg'
  },
  {
    id: 'g5',
    title: 'Chân dung nghệ nhân gìn giữ tiếng đàn cổ',
    category: 'Con người',
    description: 'Bậc cao niên xứ Huế bên cây đàn kìm cổ truyền, biểu tượng của sự tiếp nối di sản.',
    image: '/src/assets/images/master_artisan_portrait_1793928495965.jpg'
  },
  {
    id: 'g6',
    title: 'Điện Thái Hòa & Sân Đại Triều Nghi Cố đô Huế',
    category: 'Kiến trúc',
    description: 'Không gian cử hành đại lễ đăng quang và Đại triều nghi với dàn Đại Nhạc uy nghiêm trước sân rồng cửu phẩm.',
    image: '/src/assets/images/thai_hoa_palace_court_1793952624534.jpg'
  },
  {
    id: 'g7',
    title: 'Đàn Nam Giao – Không gian tế tự Trời Đất linh thiêng',
    category: 'Kiến trúc',
    description: 'Khu tế đàn ngoài trời với ba tầng Viên Đàn và Phương Đàn giữa rừng thông Ngự Bình, nơi tấu Giao nhạc rạng sáng.',
    image: '/src/assets/images/nam_giao_altar_hue_1793952638343.jpg'
  },
  {
    id: 'g8',
    title: 'Hiện vật Đàn Tam (Tam Huyền Cầm) cổ truyền',
    category: 'Nhạc cụ',
    description: 'Cận cảnh thân đàn hình chữ nhật bọc da trăn hai mặt, cần mun không phím, ba dây tơ thanh nhã của Tiểu nhạc.',
    image: '/src/assets/images/dan_tam_lute_museum_1793952652465.jpg'
  }
];

export const REFERENCES_DATA: ReferenceSource[] = [
  {
    id: 'ref-unesco-nha-nhac',
    citationIndex: 1,
    organization: 'UNESCO (Tổ chức Giáo dục, Khoa học và Văn hóa Liên Hợp Quốc)',
    title: 'Nha Nhac, Vietnamese Court Music – Representative List of the Intangible Cultural Heritage of Humanity',
    url: 'https://ich.unesco.org/en/RL/nha-nhac-vietnamese-court-music-00074',
    category: 'Nghiên cứu',
    year: '2008 (vinh danh 2003)',
    usedContent: 'Cơ sở xác định danh hiệu Kiệt tác Di sản Truyền khẩu và Phi vật thể năm 2003, ghi danh chính thức năm 2008; định nghĩa tính bác học, các bài bản ngự thiện và giá trị toàn cầu của Nhã nhạc cung đình Huế.'
  },
  {
    id: 'ref-unesco-project',
    citationIndex: 2,
    organization: 'UNESCO Intangible Cultural Heritage Section',
    title: 'Action Plan for the Safeguarding of Nha Nhac, Vietnamese Court Music',
    url: 'https://ich.unesco.org/en/projects/safeguarding-of-nha-nhac-vietnamese-court-music-00018',
    category: 'Bảo tồn',
    year: '2005 - 2008',
    usedContent: 'Tư liệu về kế hoạch hành động quốc tế bảo vệ khẩn cấp Nhã nhạc, các chương trình đào tạo truyền ngón cho lớp nhạc sinh trẻ, phục chế nhạc cụ và trang phục cung đình.'
  },
  {
    id: 'ref-dsvh',
    citationIndex: 3,
    organization: 'Cục Di sản Văn hóa – Bộ Văn hóa, Thể thao và Du lịch',
    title: 'Hồ sơ Di sản văn hóa phi vật thể: Nhã nhạc cung đình Huế',
    url: 'https://dsvh.gov.vn/',
    category: 'Nghiên cứu',
    year: '2003 - 2024',
    usedContent: 'Số liệu kiểm kê di sản văn hóa phi vật thể quốc gia, phân tích cấu trúc thể loại, các bài bản Đại nhạc, Tiểu nhạc và chính sách đãi ngộ nghệ nhân nhân dân, nghệ nhân ưu tú.'
  },
  {
    id: 'ref-hueworldheritage',
    citationIndex: 4,
    organization: 'Trung tâm Bảo tồn Di tích Cố đô Huế (HMCC)',
    title: 'Di sản phi vật thể Nhã nhạc và Không gian văn hóa Hoàng thành Huế',
    url: 'https://hueworldheritage.org.vn/',
    category: 'Bảo tồn',
    year: '2020 - 2025',
    usedContent: 'Thông tin lịch sử, năm xây dựng và tiến trình trùng tu Nhà hát Duyệt Thị Đường (1826), Điện Thái Hòa, Đàn Nam Giao, Thế Miếu; hoạt động biểu diễn phục vụ công chúng tại Cố đô.'
  },
  {
    id: 'ref-nhanhac-theater',
    citationIndex: 5,
    organization: 'Nhà hát Nghệ thuật Truyền thống Cung đình Huế',
    title: 'Lịch sử phục hồi bài bản Nhã nhạc và Múa cung đình triều Nguyễn',
    url: 'https://nhanhac.com.vn/',
    category: 'Lịch sử',
    year: '2015 - 2024',
    usedContent: 'Tư liệu thực tiễn về đội hình nhạc công, trang phục mão cánh chuồn, áo gấm thêu long phụng, trích đoạn múa Lục Cúng Hoa Đăng, Múa Bát Dật và lịch biểu diễn hàng ngày tại Duyệt Thị Đường.'
  },
  {
    id: 'ref-huetourism',
    citationIndex: 6,
    organization: 'Sở Du lịch Thừa Thiên Huế – Cổng thông tin Du lịch Huế',
    title: 'Địa bàn di sản văn hóa Cố đô và Không gian diễn xướng Nhã nhạc',
    url: 'https://huetourism.gov.vn/',
    category: 'Địa bàn',
    year: '2023 - 2026',
    usedContent: 'Tư liệu về địa bàn nghiên cứu trọng tâm Thành phố Huế (Bắc Trung Bộ), tọa độ không gian di sản Đại Nội, Đàn Nam Giao, Lễ hội Festival Huế và các tour trải nghiệm âm nhạc di sản.'
  },
  {
    id: 'ref-vietnamtourism',
    citationIndex: 7,
    organization: 'Cục Du lịch Quốc gia Việt Nam',
    title: 'Nhã nhạc cung đình Huế – Đỉnh cao âm nhạc truyền thống Việt Nam',
    url: 'https://vietnamtourism.gov.vn/',
    category: 'Nghiên cứu',
    year: '2022',
    usedContent: 'Tổng quan quảng bá di sản quốc gia đến bạn bè quốc tế, vai trò của Nhã nhạc trong định vị thương hiệu văn hóa Việt Nam và liên kết bảo tồn với du lịch bền vững.'
  },
  {
    id: 'ref-unesco-portal',
    citationIndex: 8,
    organization: 'UNESCO World Heritage & Intangible Cultural Heritage Portal',
    title: 'Vietnamese Intangible Cultural Heritage Database & Conventions',
    url: 'https://www.unesco.org/',
    category: 'Bảo tồn',
    year: '2003 - 2024',
    usedContent: 'Công ước 2003 về bảo vệ di sản văn hóa phi vật thể, tiêu chí đánh giá kiệt tác di sản truyền khẩu của nhân loại và các khuyến nghị lưu trữ số hóa.'
  },
  {
    id: 'ref-khamdinh',
    citationIndex: 9,
    organization: 'Quốc Sử Quán Triều Nguyễn',
    author: 'Nhiều tác giả thời Nguyễn (chủ biên: Trương Đăng Quế, Phan Thanh Giản...)',
    title: 'Khâm Định Đại Nam Hội Điển Sự Lệ (Quyển ghi điển chế Lễ Nhạc triều đình)',
    url: 'https://hueworldheritage.org.vn/',
    category: 'Lịch sử',
    year: '1851 (Bản dịch Viện Sử học)',
    usedContent: 'Văn bản gốc quy định chi tiết số lượng nhạc sinh, nhạc cụ, trang phục, thứ bậc các khúc nhạc trong lễ tế Trời Đất (Nam Giao), tế Tổ miếu (Thế Miếu) và Đại triều nghi.'
  },
  {
    id: 'ref-tranvankhe',
    citationIndex: 10,
    organization: 'Viện Nghiên cứu Âm nhạc Việt Nam & Nhạc viện TP.HCM',
    author: 'Cố GS.TS Trần Văn Khê & cộng sự',
    title: 'Công trình nghiên cứu: Âm nhạc truyền thống Việt Nam & Nhã nhạc Cung đình Huế',
    url: 'https://dsvh.gov.vn/',
    category: 'Nghiên cứu',
    year: '1962 - 2003',
    usedContent: 'Hệ thống lý luận thang âm ngũ cung (Hò, Xự, Xang, Xê, Cống), hai điệu thức chính Khách (Bắc) và Nam, tư liệu ký âm truyền khẩu của cụ Lữ Hữu Thi, cụ Trần Kích trong hồ sơ đệ trình UNESCO.'
  },
  {
    id: 'ref-baophapluat-luhuuthi',
    citationIndex: 11,
    organization: 'Báo Pháp Luật TP.HCM',
    author: 'Phóng viên Văn hóa',
    title: 'Báu vật sống của Nhã nhạc cung đình Huế qua đời (Cố NNƯT Lữ Hữu Thi)',
    url: 'https://baophapluat.vn/bau-vat-song-cua-nha-nhac-cung-dinh-hue-qua-doi-post227021.html',
    category: 'Lịch sử',
    year: '16/09/2016',
    usedContent: 'Tư liệu xác thực ngày mất của Cụ Lữ Hữu Thi vào ngày 15/09/2016 tại làng Thế Lại Thượng (xã Hương Vinh, thị xã Hương Trà, Thừa Thiên Huế), hưởng thọ 106 tuổi; từng phục vụ ban nhạc cung đình triều vua Bảo Đại.'
  },
  {
    id: 'ref-tuoitre-trankich',
    citationIndex: 12,
    organization: 'Báo Tuổi Trẻ',
    author: 'Thái Lộc',
    title: 'Chia tay hiệp sĩ của Nhã nhạc triều Nguyễn (Cố NSƯT Trần Kích)',
    url: 'https://tuoitre.vn/chia-tay-hiep-si-cua-nha-nhac-trieu-nguyen-416423.htm',
    category: 'Lịch sử',
    year: '10/12/2010',
    usedContent: 'Tư liệu xác thực về năm sinh (1921) và năm mất (2010) của Cố NSƯT Trần Kích; danh hiệu Nghệ sĩ Ưu tú được Nhà nước phong tặng năm 2007; Huân chương Văn học Nghệ thuật do Chính phủ Pháp trao tặng năm 2008.'
  }
];

