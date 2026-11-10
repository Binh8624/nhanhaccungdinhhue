/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * MUSIC THEORY & HISTORICAL TUNING SYSTEM DATA: GIAI ĐOẠN 4
 * Dự án: Bảo tàng Di sản số Học thuật – Nhã nhạc Cung đình Huế
 * Tác giả: Trần Thanh Bình (MSSV: PH61165 - Lớp: D02)
 * 
 * Nguồn tài liệu học thuật:
 * - GS.TS Trần Văn Khê: "La Musique vietnamienne traditionnelle" (1962) & "Âm nhạc truyền thống Việt Nam"
 * - Khâm Định Đại Nam Hội Điển Sự Lệ - Quyển 96: Lễ Bộ - Điển chế Lễ Nhạc (1851)
 * - Hồ sơ đệ trình UNESCO: "Nha Nhac, Vietnamese Court Music" (2003, Masterpiece)
 * - Tư liệu điền dã của Nghệ nhân Nhân dân Trần Kích và Lữ Hữu Thi
 */

export interface PitchDegree {
  name: string;           // Tên chữ nhạc: Hò, Xự, Xang, Xê, Cống, Phan, Lục
  hanChar: string;        // Chữ Hán/Nôm: 𪛕, 𪛖, 𪛗, 𪛘, 𪛙, 𪛚, 𪛛
  role: string;           // Vai trò trong thang âm
  nominalFrequencies: {   // Tần số danh định theo 3 hệ quy chiếu nốt Hò
    hoF: { note: string; hz: number; cents: number };
    hoC: { note: string; hz: number; cents: number };
    hoD: { note: string; hz: number; cents: number };
  };
  technique: string;      // Kỹ thuật bấm / nhấn / vuốt / rung truyền thống
  acousticNote: string;   // Khảo tả âm học
  ornamentation: string;  // Hoa mỹ đặc thù
}

export interface MusicalMode {
  id: string;
  name: string;
  category: 'Điệu Khách' | 'Điệu Nam';
  chineseName: string;
  scaleFormula: string;   // Công thức quãng âm (cents)
  degrees: string[];      // Các bậc âm chính: Hò, Xự, Xang, Xê, Cống...
  emotionalAffect: string;// Sắc thái biểu cảm
  ornamentationRules: {
    rung: string[];       // Nốt nào được phép rung
    nhan: string[];       // Nốt nào phải nhấn (vi âm)
    khongRung: string[];  // Nốt buông giữ nguyên
  };
  ritualApplication: string; // Ứng dụng trong nghi lễ cung đình
  exemplarPieces: string[];  // Các bản nhạc tiêu biểu
  scholarlyAnalysis: string; // Phân tích học thuật của GS.TS Trần Văn Khê
}

export interface TraditionalScore {
  id: string;
  title: string;
  hanTitle: string;
  category: 'Mười Bản Ngự (Thập Thủ Liên Hoàn)' | 'Đại Nhạc Cung Đình' | 'Tiểu Nhạc Giao Duyên';
  sourceManuscript: string;  // Nguồn thư tịch
  meterPattern: string;      // Nhịp phách: Nhịp một (nhịp đôi), Nhịp tư
  tempo: string;             // Tốc độ diễn tấu
  structure: string;         // Cấu trúc đoản thiên
  courtContext: string;      // Bối cảnh tấu nhạc
  solmizationNotes: string[];// Chuỗi chữ nhạc truyền thống
  frequenciesF: number[];    // Tần số Hz tham chiếu (Hò = F4)
  curatorialNote: string;    // Ghi chú khảo dị giám tuyển
  verifiedStatus: 'verified' | 'peer_reviewed';
}

export interface TranscriptionRecord {
  id: string;
  title: string;
  repertoireRef: string;
  baseHoPitch: 'F' | 'C' | 'D';
  modeType: string;
  notesSequence: Array<{
    pitchName: string;
    duration: number; // 0.25 (móc đơn), 0.5 (đen), 1.0 (trắng)
    ornament?: 'rung' | 'nhan' | 'vuot' | 'mo' | 'none';
  }>;
  transcriber: string;
  notesJustification: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// 1. DỮ LIỆU CÁC BẬC ÂM TRUYỀN THỐNG (7 BẬC HỌC THUẬT)
// ============================================================================
export const PENTATONIC_DEGREES: PitchDegree[] = [
  {
    name: 'Hò',
    hanChar: '𪛕',
    role: 'Âm chủ (Tonic / Căn âm) – Điểm tựa nền tảng của toàn bộ hệ thống thang âm',
    nominalFrequencies: {
      hoF: { note: 'F4', hz: 349.23, cents: 0 },
      hoC: { note: 'C4', hz: 261.63, cents: 0 },
      hoD: { note: 'D4', hz: 293.66, cents: 0 }
    },
    technique: 'Dây buông hoặc bấm định âm cơ bản. Đòi hỏi âm vang đầy đặn, ngân vang tự nhiên, không rung lắc tùy tiện.',
    acousticNote: 'Là âm cơ bản để xác lập toàn bộ tương quan quãng của bản nhạc. Trong Nhã nhạc Huế, cao độ nốt Hò linh động theo kích thước nhạc cụ và tông giọng kèn.',
    ornamentation: 'Ngân thẳng, giữ độ trầm ấm và chuẩn xác tuyệt đối.'
  },
  {
    name: 'Xự',
    hanChar: '𪛖',
    role: 'Bậc 2 (Quãng hai) – Bậc âm biến hóa vi âm nhạy cảm nhất giữa Điệu Khách và Điệu Nam',
    nominalFrequencies: {
      hoF: { note: 'G4', hz: 392.00, cents: 200 },
      hoC: { note: 'D4', hz: 293.66, cents: 200 },
      hoD: { note: 'E4', hz: 329.63, cents: 200 }
    },
    technique: 'Trong điệu Khách: Bấm chính xác vào phím để có Xự cao (Major 2nd, ~200 cents). Trong điệu Nam: Nhấn chùng ngón tay để tạo Xự non (Neutral 2nd, ~150-170 cents).',
    acousticNote: 'Độ chênh vi âm của nốt Xự quyết định linh hồn bi - hoan của âm nhạc Cố đô.',
    ornamentation: 'Điệu Nam yêu cầu rung hạt lựu hoặc rung chậm nghẹn ngào.'
  },
  {
    name: 'Xang',
    hanChar: '𪛗',
    role: 'Bậc 3 (Quãng bốn) – Âm chuyển tiếp then chốt của giai điệu cung đình',
    nominalFrequencies: {
      hoF: { note: 'Bb4', hz: 466.16, cents: 500 },
      hoC: { note: 'F4', hz: 349.23, cents: 500 },
      hoD: { note: 'G4', hz: 392.00, cents: 500 }
    },
    technique: 'Điệu Khách: Xang chuẩn (Perfect 4th, ~500 cents). Điệu Nam (đặc biệt Nam Ai): Nhấn căng ngón lên Xang già (~540-560 cents), cao hơn bình thường gần 1/4 cung.',
    acousticNote: 'Xang già tạo nên nét ai oán, sâu lắng đặc trưng của phong cách cung đình xứ Huế.',
    ornamentation: 'Kỹ thuật mổ ngón (ngón vỗ) và vuốt lướt mềm mại.'
  },
  {
    name: 'Xê',
    hanChar: '𪛘',
    role: 'Bậc 4 (Quãng năm đúng) – Âm chuẩn định vị không gian điệu thức (Dominant)',
    nominalFrequencies: {
      hoF: { note: 'C5', hz: 523.25, cents: 700 },
      hoC: { note: 'G4', hz: 392.00, cents: 700 },
      hoD: { note: 'A4', hz: 440.00, cents: 700 }
    },
    technique: 'Bấm định âm vững chãi trên phím. Là bậc âm kiên định trong cả hai điệu thức.',
    acousticNote: 'Tương ứng quãng năm đúng phương Tây (~700 cents). Là trục đối xứng âm học hỗ trợ nốt Hò.',
    ornamentation: 'Rung nhẹ ở cuối câu nhạc, thường kết hợp ngón phi hoặc ngón vê trên Đàn Tỳ Bà.'
  },
  {
    name: 'Cống',
    hanChar: '𪛙',
    role: 'Bậc 5 (Quãng sáu) – Hoàn thiện chu kỳ ngũ cung cơ bản',
    nominalFrequencies: {
      hoF: { note: 'D5', hz: 587.33, cents: 900 },
      hoC: { note: 'A4', hz: 440.00, cents: 900 },
      hoD: { note: 'B4', hz: 493.88, cents: 900 }
    },
    technique: 'Điệu Khách: Cống tự nhiên (~900 cents). Điệu Nam: Thường có xu hướng hơi chùng xuống (Cống non, ~850-880 cents).',
    acousticNote: 'Là âm chót của ngũ cung gốc (Hò - Xự - Xang - Xê - Cống), tạo cảm giác thanh thoát.',
    ornamentation: 'Ngón miết và ngón vuốt từ Xê lên Cống tạo nét trang nhã.'
  },
  {
    name: 'Phan',
    hanChar: '𪛚',
    role: 'Bậc phụ (Biến âm / Quãng bảy / Bát độ hạ) – Làm phong phú đường nét giai điệu',
    nominalFrequencies: {
      hoF: { note: 'Eb5', hz: 622.25, cents: 1000 },
      hoC: { note: 'Bb4', hz: 466.16, cents: 1000 },
      hoD: { note: 'C5', hz: 523.25, cents: 1000 }
    },
    technique: 'Nhấn từ Cống lên hoặc dùng ngón bấm riêng biệt trên Đàn Nguyệt phím cao.',
    acousticNote: 'Xuất hiện như âm tô điểm trong các đoản thiên Tiểu nhạc và khúc thức biến tấu.',
    ornamentation: 'Lướt nhanh, không dừng lâu trên phách mạnh.'
  },
  {
    name: 'Lục',
    hanChar: '𪛛',
    role: 'Âm quãng tám (Octave của Hò) – Tái lập chu kỳ âm vực mới',
    nominalFrequencies: {
      hoF: { note: 'F5', hz: 698.46, cents: 1200 },
      hoC: { note: 'C5', hz: 523.25, cents: 1200 },
      hoD: { note: 'D5', hz: 587.33, cents: 1200 }
    },
    technique: 'Bấm ở cung bậc cao nhất hoặc sử dụng kỹ thuật phát âm bồi âm (harmonic) trên Đàn Tranh / Tỳ Bà.',
    acousticNote: 'Đạt đúng tỷ lệ tần số gấp đôi nốt Hò gốc ($2f_0$, 1200 cents).',
    ornamentation: 'Ngân sáng ngời, gợi vẻ uy nghiêm của đỉnh lầu son điện ngọc.'
  }
];

// ============================================================================
// 2. DỮ LIỆU ĐIỆU THỨC HỌC THUẬT: ĐIỆU KHÁCH & ĐIỆU NAM
// ============================================================================
export const MUSICAL_MODES: MusicalMode[] = [
  {
    id: 'mode-khach',
    name: 'Điệu Khách (Hơi Bắc)',
    category: 'Điệu Khách',
    chineseName: '客調 / 北音',
    scaleFormula: 'Hò (0c) - Xự (200c) - Xang (500c) - Xê (700c) - Cống (900c) - Lục (1200c)',
    degrees: ['Hò', 'Xự', 'Xang', 'Xê', 'Cống', 'Lục'],
    emotionalAffect: 'Trang nghiêm, hùng tráng, đĩnh đạc, đoan chính, biểu hiện sự uy nghiêm của vương triều và lòng thành kính đối với trời đất tiên tổ.',
    ornamentationRules: {
      rung: ['Hò', 'Xê'],
      nhan: ['Không nhấn chùng, giữ cao độ chuẩn mực của thang âm'],
      khongRung: ['Xự', 'Xang', 'Cống']
    },
    ritualApplication: 'Cử hành trong Đại lễ Tế Nam Giao (các nhạc khúc Mục Hòa, Thành Hòa), Lễ Tế Xã Tắc, Lễ Đại Triều Nghi tại Điện Thái Hòa.',
    exemplarPieces: ['Đăng Đàn Cung', 'Lưu Thủy Kim Tiền', 'Mười Bản Ngự (Phẩm Tuyết, Bình Bán, Xuân Phong)'],
    scholarlyAnalysis: 'Theo GS.TS Trần Văn Khê: "Điệu Khách trong Nhã nhạc Huế kế thừa tính chất cương trực của điệu Bắc cổ truyền, các cung bậc ổn định, không có hiện tượng co giãn vi âm như điệu Nam, thích hợp tuyệt đối với không gian nghi lễ chính thống ngoài trời."'
  },
  {
    id: 'mode-nam-xuan',
    name: 'Điệu Nam Xuân',
    category: 'Điệu Nam',
    chineseName: '南調 - 南春',
    scaleFormula: 'Hò (0c) - Xự non (~160c) - Xang chuẩn (500c) - Xê (700c) - Cống (900c)',
    degrees: ['Hò', 'Xự (~160c)', 'Xang', 'Xê', 'Cống'],
    emotionalAffect: 'Thanh thoát, hiền hòa, an nhiên, gợi cảnh xuân tươi mát, tĩnh tại chốn hoàng gia ngắm hoa thưởng trà.',
    ornamentationRules: {
      rung: ['Hò', 'Xê'],
      nhan: ['Xự hơi chùng xuống (Xự non)', 'Cống rung thoang thoảng'],
      khongRung: ['Xang']
    },
    ritualApplication: 'Tấu tại Nhà hát Duyệt Thị Đường, Minh Khiêm Đường trong các dịp yến tiệc hoàng tộc, chúc thọ Hoàng Thái Hậu.',
    exemplarPieces: ['Nam Xuân', 'Hồ Quảng (tiết điệu dịu dàng)', 'Tây Mai'],
    scholarlyAnalysis: 'GS.TS Trần Văn Khê nhận định: "Nam Xuân có bậc Xự non vừa phải, tạo cảm giác thư thái không bi lụy, là nhịp cầu giao thoa giữa vẻ trang nghiêm của điệu Khách và chiều sâu tâm cảm của điệu Nam Ai."'
  },
  {
    id: 'mode-nam-ai',
    name: 'Điệu Nam Ai',
    category: 'Điệu Nam',
    chineseName: '南調 - 南哀',
    scaleFormula: 'Hò (0c) - Xự non (~140-160c) - Xang già (~540-560c) - Xê (700c) - Cống non (~860c)',
    degrees: ['Hò', 'Xự non', 'Xang già', 'Xê', 'Cống non'],
    emotionalAffect: 'Bi ai, u hoài, sâu lắng, nghẹn ngào, phản ánh tâm trạng thương cảm, hoài niệm về thời gian và sự vô thường.',
    ornamentationRules: {
      rung: ['Xự non (rung nghẹn)', 'Xang già (nhấn rung mạnh)'],
      nhan: ['Xự nhấn chùng sâu', 'Xang nhấn căng cao hơn bình thường ~1/4 cung'],
      khongRung: ['Hò', 'Xê']
    },
    ritualApplication: 'Cử hành trong nghi thức tang lễ hoàng gia (Lễ Quốc tang, Lễ Cung táng), Lễ Tế Miếu (Thế Miếu, Triệu Miếu) tưởng niệm các đấng tiền vương.',
    exemplarPieces: ['Nam Ai', 'Nam Bình', 'Tương Tư Cung Đình'],
    scholarlyAnalysis: 'Khảo sát âm học của GS.TS Trần Văn Khê chứng minh: "Sự cộng hưởng giữa nốt Xự non và Xang già tạo ra một quãng ba trung hòa đặc hữu của văn hóa Việt, không thể ghi lại trọn vẹn bằng hệ thống 12 bán âm bình quân phương Tây."'
  }
];

// ============================================================================
// 3. THƯ VIỆN BÀI BẢN HỌC THUẬT: MƯỜI BẢN NGỰ & ĐĂNG ĐÀN CUNG
// ============================================================================
export const TRADITIONAL_SCORES_LIBRARY: TraditionalScore[] = [
  {
    id: 'score-dang-dan-cung',
    title: 'Đăng Đàn Cung (Quốc thiều Triều Nguyễn)',
    hanTitle: '登壇宮',
    category: 'Đại Nhạc Cung Đình',
    sourceManuscript: 'Khâm Định Đại Nam Hội Điển Sự Lệ (1851) & Tư liệu Thự Hòa Thanh',
    meterPattern: 'Nhịp một (Nhịp 2/4), hồi hộp trang trọng',
    tempo: 'Khoan thai (Andante Maestoso - 68 BPM)',
    structure: '3 hồi đối ứng, giai điệu dõng dạc điệp khúc',
    courtContext: 'Cử hành khi Hoàng đế đăng đàn tại Đàn Nam Giao, xuất cung tuần du hoặc khai triều Đại Triều Nghi trước Điện Thái Hòa.',
    solmizationNotes: ['Hò', 'Hò', 'Xự', 'Xang', 'Xê', 'Xê', 'Cống', 'Xê', 'Xang', 'Xự', 'Hò', 'Xê', 'Hò', 'Lục'],
    frequenciesF: [349.23, 349.23, 392.00, 466.16, 523.25, 523.25, 587.33, 523.25, 466.16, 392.00, 349.23, 523.25, 349.23, 698.46],
    curatorialNote: 'Bản ký âm dựa trên văn bản chuẩn mực do Trung tâm Bảo tồn Di tích Cố đô Huế phục hồi và lưu truyền từ Nghệ nhân Nhân dân Trần Kích.',
    verifiedStatus: 'verified'
  },
  {
    id: 'score-pham-tuyet',
    title: 'Phẩm Tuyết (Khúc mở đầu Mười Bản Ngự)',
    hanTitle: '品雪 (十首連環 第一曲)',
    category: 'Mười Bản Ngự (Thập Thủ Liên Hoàn)',
    sourceManuscript: 'Bản chép tay điền dã năm 1995 của cụ Trần Kích & Mộc bản triều Nguyễn',
    meterPattern: 'Nhịp đôi (4/4), phách rõ ràng',
    tempo: 'Thong thả, thanh thoát (Moderato - 76 BPM)',
    structure: 'Gồm 14 câu nhạc liên hoàn kết nối sang bản Nguyên Tiêu',
    courtContext: 'Tấu trong các buổi lễ khánh hỉ, tiếp đãi sứ thần phương xa và hội ngự triều thần tại điện Cần Chánh.',
    solmizationNotes: ['Hò', 'Xự', 'Xang', 'Xê', 'Cống', 'Xê', 'Xang', 'Hò', 'Xự', 'Xang', 'Xê', 'Cống'],
    frequenciesF: [349.23, 392.00, 466.16, 523.25, 587.33, 523.25, 466.16, 349.23, 392.00, 466.16, 523.25, 587.33],
    curatorialNote: 'Khảo dị đối chiếu giữa bản mộc bản Khâm Định 1851 và lối diễn tấu truyền ngón của cụ Lữ Hữu Thi cho thấy sự tương đồng 92% về khung xương giai điệu cốt lõi.',
    verifiedStatus: 'verified'
  },
  {
    id: 'score-luu-thuy',
    title: 'Lưu Thủy (Dòng nước êm đềm)',
    hanTitle: '流水',
    category: 'Tiểu Nhạc Giao Duyên',
    sourceManuscript: 'Ký âm Nhã nhạc cung đình Huế – Viện Âm nhạc Việt Nam',
    meterPattern: 'Nhịp một (2/4), tiết tấu trôi chảy liên tục',
    tempo: 'Linh hoạt, sống động (Allegretto - 92 BPM)',
    structure: 'Câu nhạc lượn sóng miên man như dòng sông Hương êm đềm',
    courtContext: 'Tấu trong dạ yến hoàng cung, vũ khúc múa quạt Tam Phụ và thưởng ngoạn trên thuyền rồng ngự.',
    solmizationNotes: ['Xang', 'Xê', 'Cống', 'Lục', 'Cống', 'Xê', 'Xang', 'Xự', 'Hò', 'Xự', 'Xang', 'Xê'],
    frequenciesF: [466.16, 523.25, 587.33, 698.46, 587.33, 523.25, 466.16, 392.00, 349.23, 392.00, 466.16, 523.25],
    curatorialNote: 'Là một trong những đoản thiên phổ biến nhất, thường được liên hoàn với khúc Kim Tiền và Xuân Phong.',
    verifiedStatus: 'verified'
  },
  {
    id: 'score-kim-tien',
    title: 'Kim Tiền (Tiền vàng may mắn)',
    hanTitle: '金錢',
    category: 'Tiểu Nhạc Giao Duyên',
    sourceManuscript: 'Tập bài bản Tiểu nhạc Cung đình – Học viện Âm nhạc Huế',
    meterPattern: 'Nhịp đôi, phách nhịp rộn rã vui tươi',
    tempo: 'Sôi nổi (Allegro - 108 BPM)',
    structure: 'Tiết tấu nhịp nhàng, đảo phách tinh tế',
    courtContext: 'Cử hành trong các dịp Tết Nguyên Đán, lễ ban yến xuân và rước kiệu hoa.',
    solmizationNotes: ['Hò', 'Xang', 'Xê', 'Cống', 'Xê', 'Cống', 'Lục', 'Cống', 'Xê', 'Xang', 'Xự', 'Hò'],
    frequenciesF: [349.23, 466.16, 523.25, 587.33, 523.25, 587.33, 698.46, 587.33, 523.25, 466.16, 392.00, 349.23],
    curatorialNote: 'Có nhiều biến thể dân gian hóa tại vùng đất Thuận Hóa, nhưng bản nhạc cung đình giữ vững nét quý phái và nhịp phách chững chạc.',
    verifiedStatus: 'verified'
  }
];

// ============================================================================
// 4. MẪU BẢN THU PHÂN TÍCH QUANG PHỔ (AUDIO SPECTRUM BENCHMARKS)
// ============================================================================
export const AUDIO_SPECTRUM_BENCHMARKS = [
  {
    id: 'spec-ddc-2018',
    title: 'Bản thu Hòa tấu Đăng Đàn Cung tại Duyệt Thị Đường (2018)',
    sourceType: 'Bản ghi âm gốc (Audio Archive GĐ3)',
    performer: 'Nhà hát Nghệ thuật Truyền thống Cung đình Huế',
    fundamentalPitch: 'F4 (~349 Hz)',
    harmonicPeaks: [
      { harmonic: 1, freq: 349.2, label: 'Âm cơ bản (Fundamental $f_0$)', amplitudePct: 100 },
      { harmonic: 2, freq: 698.4, label: 'Hài âm bậc 2 (Octave)', amplitudePct: 68 },
      { harmonic: 3, freq: 1047.6, label: 'Hài âm bậc 3 (Quãng năm)', amplitudePct: 45 },
      { harmonic: 4, freq: 1396.8, label: 'Hài âm bậc 4', amplitudePct: 28 },
      { harmonic: 5, freq: 1746.0, label: 'Hài âm bậc 5 (Màu âm kèn bầu)', amplitudePct: 35 }
    ],
    spectralDescription: 'Phổ tần số ghi nhận năng lượng hài âm rất phong phú ở dải 1 kHz - 3 kHz do âm sắc đanh, giòn của Kèn Bầu và bát loa đồng thau.',
    verifiedFactRef: 'FACT-INS-001'
  },
  {
    id: 'spec-dan-nguyet-solo',
    title: 'Độc tấu Đàn Nguyệt Điệu Nam Ai – Cố Nghệ nhân Trần Kích (1995)',
    sourceType: 'Bản ghi âm điền dã lịch sử',
    performer: 'Nghệ nhân Nhân dân Trần Kích (Ký âm hồ sơ UNESCO)',
    fundamentalPitch: 'C4 (~261 Hz)',
    harmonicPeaks: [
      { harmonic: 1, freq: 261.6, label: 'Hò ($f_0$)', amplitudePct: 100 },
      { harmonic: 2, freq: 523.2, label: 'Bát độ ($2f_0$)', amplitudePct: 52 },
      { harmonic: 3, freq: 784.8, label: 'Hài âm $3f_0$', amplitudePct: 38 },
      { harmonic: 4, freq: 1046.4, label: 'Hài âm ngón nhấn chìm phím', amplitudePct: 22 }
    ],
    spectralDescription: 'Hiển thị rõ hiện tượng vi dịch tần số (micro-frequency shifts) ở dải nốt Xự (giảm ~30 Hz tạo Xự non) và nốt Xang (tăng ~25 Hz tạo Xang già).',
    verifiedFactRef: 'FACT-LAW-002'
  }
];

// ============================================================================
// 5. BẢN KÝ ÂM MẪU BAN ĐẦU CỦA NGƯỜI DÙNG (USER INITIAL TRANSCRIPTIONS)
// ============================================================================
export const INITIAL_USER_TRANSCRIPTIONS: TranscriptionRecord[] = [
  {
    id: 'trans-sample-01',
    title: 'Ký âm Khảo sát Đoản khúc Phẩm Tuyết',
    repertoireRef: 'score-pham-tuyet',
    baseHoPitch: 'F',
    modeType: 'Điệu Khách (Hơi Bắc)',
    notesSequence: [
      { pitchName: 'Hò', duration: 0.5, ornament: 'none' },
      { pitchName: 'Xự', duration: 0.5, ornament: 'none' },
      { pitchName: 'Xang', duration: 0.5, ornament: 'mo' },
      { pitchName: 'Xê', duration: 1.0, ornament: 'rung' },
      { pitchName: 'Cống', duration: 0.5, ornament: 'none' },
      { pitchName: 'Xê', duration: 0.5, ornament: 'none' },
      { pitchName: 'Xang', duration: 0.5, ornament: 'none' },
      { pitchName: 'Hò', duration: 1.0, ornament: 'rung' }
    ],
    transcriber: 'Trần Thanh Bình (PH61165 - D02)',
    notesJustification: 'Đối chiếu theo bản ký âm điền dã năm 1995 của cụ Trần Kích, nhịp một khoan thai, nốt Xê ở phách thứ tư rung nhẹ.',
    createdAt: '2026-11-07T08:00:00Z',
    updatedAt: '2026-11-07T08:00:00Z'
  }
];
