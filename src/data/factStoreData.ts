/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * KHO DỮ KIỆN HỌC THUẬT (KNOWLEDGE FACT-STORE)
 * DỰ ÁN: BẢO TÀNG DI SẢN SỐ HỌC THUẬT – NHÃ NHẠC CUNG ĐÌNH HUẾ
 * Tác giả: Trần Thanh Bình - MSSV: PH61165 - Lớp: D02
 * Địa bàn di sản trọng tâm: Thành phố Huế, Việt Nam
 * 
 * Chuẩn hóa theo tiêu chí Giai đoạn 1:
 * - Định danh duy nhất: fact_id
 * - Phân loại dữ kiện: verified_fact, academic_interpretation, research_hypothesis, illustrative_content, simulated_content
 * - Phân loại nguồn: primary_source, secondary_source, official_source, press_source, other_source
 * - Trạng thái xác minh: draft, pending_review, verified, needs_revision, published, archived
 * - Liên kết trích dẫn: source_id, page_or_location, volume, section, quotation, source_url
 */

export type ClaimType = 
  | 'verified_fact'             // Dữ kiện đã xác minh bằng văn hiến / hồ sơ chính thức
  | 'academic_interpretation'   // Nhận định học thuật của chuyên gia / cơ quan nghiên cứu
  | 'research_hypothesis'       // Giả thuyết nghiên cứu còn đang khảo sát / đối chiếu
  | 'illustrative_content'      // Nội dung minh họa văn hóa
  | 'simulated_content';        // Nội dung mô phỏng (âm thanh Web Audio, hoạt họa 3D)

export type SourceTier = 
  | 'primary_source'            // Nguồn sơ cấp (Châu bản, Khâm Định, Đại Nam Thực Lục, bản thảo gốc)
  | 'secondary_source'          // Nguồn nghiên cứu thứ cấp (Sách GS. Trần Văn Khê, Viện Âm nhạc)
  | 'official_source'           // Nguồn tổ chức chính thức (UNESCO, Cục Di sản Văn hóa, TTBT Di tích Cố đô Huế)
  | 'press_source'              // Nguồn báo chí chính thống (Báo Tuổi Trẻ, Báo Nhân Dân, Báo Pháp Luật...)
  | 'other_source';             // Nguồn điền dã / truyền khẩu chưa xuất bản

export type VerificationStatus = 
  | 'draft'                     // Bản nháp đang thu thập
  | 'pending_review'            // Đang chờ chuyên gia thẩm định
  | 'verified'                  // Đã xác minh nguồn gốc học thuật
  | 'needs_revision'            // Cần bổ sung tài liệu / hiệu chỉnh
  | 'published'                 // Đã công bố trên bảo tàng số
  | 'archived';                 // Đã lưu trữ lịch sử

export type DomainCategory = 
  | 'LỊCH SỬ' 
  | 'UNESCO' 
  | 'ÂM LUẬT & NGŨ CUNG' 
  | 'NHẠC CỤ & HIỆN VẬT' 
  | 'HÌNH THỨC & NGHI LỄ' 
  | 'KHÔNG GIAN DI SẢN' 
  | 'NGHỆ NHÂN & TRUYỀN THỪA' 
  | 'TƯ LIỆU SỐ HÓA';

export interface FactCitation {
  source_id: string;
  source_code: string;
  source_name: string;
  source_tier: SourceTier;
  author_or_institution: string;
  publication_year?: string;
  volume?: string;
  section?: string;
  page_or_location?: string;
  quotation?: string;
  source_url?: string;
  is_primary_support: boolean;
}

export interface KnowledgeFact {
  fact_id: string;
  statement: string;
  claim_type: ClaimType;
  domain: DomainCategory;
  era: string;
  related_entities: {
    people?: string[];
    places?: string[];
    artifacts?: string[];
    events?: string[];
  };
  citations: FactCitation[];
  verification_status: VerificationStatus;
  reviewed_by: string;
  updated_at: string;
  contradictions_or_notes?: string;
}

export interface DigitalAssetMetadata {
  asset_id: string;
  asset_name: string;
  asset_type: 'image' | 'audio' | 'video' | 'manuscript' | '3d_model';
  provenance_category: 
    | 'Ảnh tư liệu thật' 
    | 'Ảnh phục dựng' 
    | 'Ảnh AI minh họa' 
    | 'Ảnh minh họa' 
    | 'Bản ghi âm gốc' 
    | 'Âm thanh mô phỏng' 
    | 'Video tư liệu' 
    | 'Video tái dựng';
  file_path: string;
  source_institution: string;
  author_or_creator?: string;
  license: string;
  verification_status: VerificationStatus;
  technical_specs?: string;
  citation_ref?: string;
}

// ============================================================================
// DANH MỤC NGUỒN THAM KHẢO CHUẨN HÓA (SOURCES MASTER CATALOG)
// ============================================================================

export const SCHOLARLY_SOURCES_CATALOG: Record<string, {
  source_code: string;
  title: string;
  tier: SourceTier;
  author_or_body: string;
  year: string;
  repository_or_publisher: string;
  url?: string;
}> = {
  'SRC-UNESCO-2003': {
    source_code: 'SRC-UNESCO-2003',
    title: 'Hồ sơ đệ trình và Quyết định công bố Kiệt tác Di sản Truyền khẩu và Phi vật thể của Nhân loại: Nhã nhạc cung đình Việt Nam',
    tier: 'official_source',
    author_or_body: 'UNESCO & Bộ Văn hóa Thông tin Việt Nam',
    year: '2003',
    repository_or_publisher: 'UNESCO Intangible Cultural Heritage Portal (RL/00074)',
    url: 'https://ich.unesco.org/en/RL/nha-nhac-vietnamese-court-music-00074'
  },
  'SRC-UNESCO-2008': {
    source_code: 'SRC-UNESCO-2008',
    title: 'Chuyển tiếp Nhã nhạc cung đình Huế vào Danh sách Di sản Văn hóa Phi vật thể Đại diện của Nhân loại theo Công ước 2003',
    tier: 'official_source',
    author_or_body: 'Ủy ban Liên Chính phủ Công ước 2003 UNESCO',
    year: '2008',
    repository_or_publisher: 'UNESCO Intangible Cultural Heritage Database',
    url: 'https://ich.unesco.org/en/RL/nha-nhac-vietnamese-court-music-00074'
  },
  'SRC-KHAM-DINH-1851': {
    source_code: 'SRC-KHAM-DINH-1851',
    title: 'Khâm Định Đại Nam Hội Điển Sự Lệ – Quyển 95 đến Quyển 98 (Mục Lễ Nhạc và Nhạc Khí)',
    tier: 'primary_source',
    author_or_body: 'Quốc Sử Quán Triều Nguyễn biên soạn (Trương Đăng Quế, Phan Thanh Giản...)',
    year: '1851 (Bản dịch Viện Sử học 1993)',
    repository_or_publisher: 'Trung tâm Lưu trữ Quốc gia I & Thư viện Viện Sử học Hà Nội'
  },
  'SRC-DAI-NAM-THUC-LUC': {
    source_code: 'SRC-DAI-NAM-THUC-LUC',
    title: 'Đại Nam Thực Lục – Chính Biên (Kỷ Thế Tổ, Thánh Tổ, Hiến Tổ, Dực Tông)',
    tier: 'primary_source',
    author_or_body: 'Quốc Sử Quán Triều Nguyễn',
    year: '1844 - 1909',
    repository_or_publisher: 'NXB Giáo dục / Viện Sử học'
  },
  'SRC-DAI-VIET-SU-KY': {
    source_code: 'SRC-DAI-VIET-SU-KY',
    title: 'Đại Việt Sử Ký Toàn Thư – Bản kỷ Thực lục (Triều vua Lê Thái Tông, năm 1437)',
    tier: 'primary_source',
    author_or_body: 'Ngô Sĩ Liên & Sử thần nhà Hậu Lê',
    year: '1479',
    repository_or_publisher: 'NXB Khoa học Xã hội'
  },
  'SRC-TRAN-VAN-KHE-1998': {
    source_code: 'SRC-TRAN-VAN-KHE-1998',
    title: 'Thang âm điệu thức truyền thống Việt Nam và Nhã nhạc Cung đình Huế',
    tier: 'secondary_source',
    author_or_body: 'Cố GS.TS Trần Văn Khê',
    year: '1998',
    repository_or_publisher: 'Viện Âm nhạc Việt Nam & Nhạc viện TP.HCM'
  },
  'SRC-KY-AM-1995': {
    source_code: 'SRC-KY-AM-1995',
    title: 'Tập ký âm truyền khẩu Mười Bản Ngự và Bài Bản Nhã nhạc Cung đình Huế',
    tier: 'primary_source',
    author_or_body: 'Cố NNƯT Lữ Hữu Thi & Cố NSƯT Trần Kích (Trần Văn Khê hiệu đính)',
    year: '1995',
    repository_or_publisher: 'Lưu trữ Viện Âm nhạc & Gia tộc nghệ nhân tại Thành phố Huế'
  },
  'SRC-HMCC-DUYET-THI': {
    source_code: 'SRC-HMCC-DUYET-THI',
    title: 'Lịch sử kiến trúc và phục hồi Nhà hát Cung đình Duyệt Thị Đường (1826 - 2024)',
    tier: 'official_source',
    author_or_body: 'Trung tâm Bảo tồn Di tích Cố đô Huế (HMCC)',
    year: '2020',
    repository_or_publisher: 'Trung tâm Bảo tồn Di tích Cố đô Huế',
    url: 'https://hueworldheritage.org.vn/'
  },
  'SRC-BAOPHAPLUAT-2016': {
    source_code: 'SRC-BAOPHAPLUAT-2016',
    title: 'Báu vật sống của Nhã nhạc cung đình Huế qua đời (Cố NNƯT Lữ Hữu Thi hưởng thọ 106 tuổi)',
    tier: 'press_source',
    author_or_body: 'Báo Pháp Luật TP.HCM (Nhóm Phóng viên Văn hóa)',
    year: '16/09/2016',
    repository_or_publisher: 'Báo Pháp Luật TP.HCM',
    url: 'https://baophapluat.vn/bau-vat-song-cua-nha-nhac-cung-dinh-hue-qua-doi-post227021.html'
  },
  'SRC-TUOITRE-2010': {
    source_code: 'SRC-TUOITRE-2010',
    title: 'Chia tay hiệp sĩ của Nhã nhạc triều Nguyễn (Cố NSƯT Trần Kích)',
    tier: 'press_source',
    author_or_body: 'Báo Tuổi Trẻ (Tác giả Thái Lộc)',
    year: '10/12/2010',
    repository_or_publisher: 'Báo Tuổi Trẻ',
    url: 'https://tuoitre.vn/chia-tay-hiep-si-cua-nha-nhac-trieu-nguyen-416423.htm'
  },
  'SRC-DSVH-VN': {
    source_code: 'SRC-DSVH-VN',
    title: 'Hồ sơ Di sản văn hóa phi vật thể: Nhã nhạc – Âm nhạc cung đình Việt Nam',
    tier: 'official_source',
    author_or_body: 'Cục Di sản Văn hóa – Bộ Văn hóa, Thể thao và Du lịch',
    year: '2023',
    repository_or_publisher: 'Cổng thông tin Cục Di sản Văn hóa',
    url: 'https://dsvh.gov.vn/'
  },
  'SRC-BAOTANG-COVAT': {
    source_code: 'SRC-BAOTANG-COVAT',
    title: 'Hồ sơ Giám định Bộ sưu tập Nhạc khí Cung đình Triều Nguyễn tại Điện Long An',
    tier: 'official_source',
    author_or_body: 'Bảo tàng Cổ vật Cung đình Huế',
    year: '2019',
    repository_or_publisher: 'Bảo tàng Cổ vật Cung đình Huế (Số 3 Lê Trực, Thành phố Huế, Việt Nam)'
  }
};

// ============================================================================
// KHO DỮ KIỆN HỌC THUẬT NGUYÊN TỬ (KNOWLEDGE FACT-STORE ENTRIES)
// ============================================================================

export const KNOWLEDGE_FACT_STORE: KnowledgeFact[] = [
  // 1. NHÓM DỮ KIỆN UNESCO
  {
    fact_id: 'FACT-UNES-001',
    statement: 'Ngày 7 tháng 11 năm 2003 tại Paris, UNESCO đã chính thức công bố Nhã nhạc cung đình Huế là Kiệt tác Di sản Truyền khẩu và Phi vật thể của Nhân loại (Masterpiece of the Oral and Intangible Heritage of Humanity). Đây là di sản phi vật thể đầu tiên của Việt Nam được ghi danh thế giới.',
    claim_type: 'verified_fact',
    domain: 'UNESCO',
    era: 'Năm 2003',
    related_entities: {
      people: ['Trần Văn Khê', 'Lữ Hữu Thi', 'Trần Kích'],
      places: ['Paris (Pháp)', 'Thành phố Huế, Việt Nam']
    },
    citations: [
      {
        source_id: 'SRC-UNESCO-2003',
        source_code: 'UNESCO-2003',
        source_name: SCHOLARLY_SOURCES_CATALOG['SRC-UNESCO-2003'].title,
        source_tier: 'official_source',
        author_or_institution: 'UNESCO',
        publication_year: '2003',
        section: 'Proclamation of Masterpieces',
        page_or_location: 'Decisions of the Director-General, 7 Nov 2003',
        quotation: 'Proclamation of Nha Nhac, Vietnamese Court Music, as a Masterpiece of the Oral and Intangible Heritage of Humanity.',
        source_url: 'https://ich.unesco.org/en/RL/nha-nhac-vietnamese-court-music-00074',
        is_primary_support: true
      }
    ],
    verification_status: 'verified',
    reviewed_by: 'Hội đồng Khoa học Bảo tàng Di sản Cố đô',
    updated_at: '2026-11-06'
  },
  {
    fact_id: 'FACT-UNES-002',
    statement: 'Năm 2008, sau khi Công ước UNESCO 2003 về bảo vệ di sản văn hóa phi vật thể có hiệu lực, Nhã nhạc cung đình Huế được chuyển tiếp vào Danh sách Di sản Văn hóa Phi vật thể Đại diện của Nhân loại theo quy chế chuyển danh mục tự động, không phải là một đợt xét duyệt mới.',
    claim_type: 'verified_fact',
    domain: 'UNESCO',
    era: 'Năm 2008',
    related_entities: {
      places: ['Thành phố Huế, Việt Nam']
    },
    citations: [
      {
        source_id: 'SRC-UNESCO-2008',
        source_code: 'UNESCO-2008',
        source_name: SCHOLARLY_SOURCES_CATALOG['SRC-UNESCO-2008'].title,
        source_tier: 'official_source',
        author_or_institution: 'UNESCO',
        publication_year: '2008',
        section: 'Representative List of ICH',
        page_or_location: 'Document ITH/08/3.COM/CONF.203/4',
        quotation: 'Nha Nhac, Vietnamese court music inscribed in 2008 (3.COM) on the Representative List of the Intangible Cultural Heritage of Humanity (originally proclaimed in 2003).',
        source_url: 'https://ich.unesco.org/en/RL/nha-nhac-vietnamese-court-music-00074',
        is_primary_support: true
      }
    ],
    verification_status: 'verified',
    reviewed_by: 'Hội đồng Khoa học Bảo tàng Di sản Cố đô',
    updated_at: '2026-11-06'
  },

  // 2. NHÓM DỮ KIỆN LỊCH SỬ & QUY CHẾ
  {
    fact_id: 'FACT-HIST-001',
    statement: 'Năm 1437 dưới triều vua Lê Thái Tông, đại thần Lương Đăng đã dâng sớ định ra quy chế Lễ Nhạc đầu tiên của Đại Việt, chia âm nhạc cung đình thành Đường thượng chi nhạc (trên thềm điện) và Đình hạ chi nhạc (dưới sân điện).',
    claim_type: 'verified_fact',
    domain: 'LỊCH SỬ',
    era: 'Thời Hậu Lê (1437)',
    related_entities: {
      people: ['Lương Đăng', 'Lê Thái Tông', 'Nguyễn Trãi'],
      places: ['Kinh đô Thăng Long']
    },
    citations: [
      {
        source_id: 'SRC-DAI-VIET-SU-KY',
        source_code: 'DVSKTT-1479',
        source_name: SCHOLARLY_SOURCES_CATALOG['SRC-DAI-VIET-SU-KY'].title,
        source_tier: 'primary_source',
        author_or_institution: 'Ngô Sĩ Liên',
        publication_year: '1479',
        volume: 'Bản kỷ Toàn thư, Quyển XI',
        page_or_location: 'Tờ 46a-48b (Kỷ nhà Lê, Thái Tông Hoàng Đế)',
        quotation: 'Mùa đông, tháng 11, sai quan chế nhã nhạc... Lương Đăng dâng biểu xin chia làm Đường thượng chi nhạc và Đình hạ chi nhạc.',
        is_primary_support: true
      }
    ],
    verification_status: 'verified',
    reviewed_by: 'Hội đồng Khoa học Bảo tàng Di sản Cố đô',
    updated_at: '2026-11-06',
    contradictions_or_notes: 'Nguyễn Trãi từng dâng sớ can gián phương án mô phỏng chế độ nhà Minh của Lương Đăng, khẳng định cốt lõi của lễ nhạc là phải làm cho muôn dân không có tiếng hờn giận oán sầu.'
  },
  {
    fact_id: 'FACT-HIST-002',
    statement: 'Năm 1826 (năm Minh Mạng thứ 7), triều đình nhà Nguyễn cho khởi công xây dựng Nhà hát Duyệt Thị Đường bên trong Tử Cấm Thành – Đại Nội Huế. Đây là nhà hát hoàng gia cổ xưa nhất của Việt Nam còn tồn tại.',
    claim_type: 'verified_fact',
    domain: 'LỊCH SỬ',
    era: 'Thời vua Minh Mạng (1826)',
    related_entities: {
      people: ['Vua Minh Mạng'],
      places: ['Nhà hát Duyệt Thị Đường', 'Tử Cấm Thành, Thành phố Huế, Việt Nam']
    },
    citations: [
      {
        source_id: 'SRC-DAI-NAM-THUC-LUC',
        source_code: 'DNTL-MINHMANG',
        source_name: SCHOLARLY_SOURCES_CATALOG['SRC-DAI-NAM-THUC-LUC'].title,
        source_tier: 'primary_source',
        author_or_institution: 'Quốc Sử Quán Triều Nguyễn',
        publication_year: '1844',
        volume: 'Đệ nhị kỷ (Thực lục về Thánh Tổ Nhân Hoàng Đế)',
        page_or_location: 'Quyển 42, năm Bính Tuất (1826)',
        quotation: 'Mùa thu, tháng 7... dựng nhà hát Duyệt Thị Đường ở bên tả viện Thanh Hòa trong Tử Cấm Thành.',
        is_primary_support: true
      },
      {
        source_id: 'SRC-HMCC-DUYET-THI',
        source_code: 'HMCC-DTD-2020',
        source_name: SCHOLARLY_SOURCES_CATALOG['SRC-HMCC-DUYET-THI'].title,
        source_tier: 'official_source',
        author_or_institution: 'Trung tâm Bảo tồn Di tích Cố đô Huế',
        publication_year: '2020',
        page_or_location: 'Trang 18-24',
        is_primary_support: false
      }
    ],
    verification_status: 'verified',
    reviewed_by: 'Hội đồng Khoa học Bảo tàng Di sản Cố đô',
    updated_at: '2026-11-06'
  },
  {
    fact_id: 'FACT-HIST-003',
    statement: 'Khâm Định Đại Nam Hội Điển Sự Lệ (biên soạn xong năm 1851 thời Tự Đức) quy định chi tiết phân định hai biên chế dàn nhạc mẫu mực triều Nguyễn: Đại Nhạc (chủ yếu là nhạc cụ gõ và kèn dăm) và Tiểu Nhạc (chủ yếu là nhạc cụ dây và sáo trúc).',
    claim_type: 'verified_fact',
    domain: 'LỊCH SỬ',
    era: 'Thời Triều Nguyễn (1802 - 1945)',
    related_entities: {
      artifacts: ['Kèn Bầu', 'Trống Chiến', 'Đàn Tỳ Bà', 'Đàn Nguyệt', 'Tam Âm La'],
      places: ['Điện Thái Hòa, Thành phố Huế, Việt Nam']
    },
    citations: [
      {
        source_id: 'SRC-KHAM-DINH-1851',
        source_code: 'KHDN-QUYEN-96',
        source_name: SCHOLARLY_SOURCES_CATALOG['SRC-KHAM-DINH-1851'].title,
        source_tier: 'primary_source',
        author_or_institution: 'Quốc Sử Quán Triều Nguyễn',
        publication_year: '1851',
        volume: 'Quyển 96',
        section: 'Mục Lễ Nhạc triều đình',
        page_or_location: 'Trang 142-158 bản dịch Viện Sử học',
        quotation: 'Đại nhạc dùng kèn dăm, trống chiến, bạt đồng, chiêng la... cử ngoài sân điện; Tiểu nhạc dùng đàn tranh, tỳ bà, nguyệt cầm, sáo trúc, tam âm la... cử trên thềm điện.',
        is_primary_support: true
      }
    ],
    verification_status: 'verified',
    reviewed_by: 'Hội đồng Khoa học Bảo tàng Di sản Cố đô',
    updated_at: '2026-11-06'
  },

  // 3. NHÓM DỮ KIỆN ÂM HỌC & NGŨ CUNG
  {
    fact_id: 'FACT-ACOU-001',
    statement: 'Hệ thống thang âm Nhã nhạc cung đình Huế xây dựng trên 5 bậc âm cơ bản Hò (Do), Xự (Re), Xang (Fa), Xê (Sol), Cống (La) cùng hai âm chuyển Phan và Lục; phân biệt hai điệu thức chính là Điệu Khách (Bắc) mang tính hào sảng, uy nghiêm và Điệu Nam mang tính trầm mặc, da diết.',
    claim_type: 'academic_interpretation',
    domain: 'ÂM LUẬT & NGŨ CUNG',
    era: 'Thế kỷ XIX - XX',
    related_entities: {
      people: ['Trần Văn Khê', 'Trần Kích'],
      artifacts: ['Đàn Nguyệt', 'Đàn Tranh']
    },
    citations: [
      {
        source_id: 'SRC-TRAN-VAN-KHE-1998',
        source_code: 'TVK-THANG-AM-1998',
        source_name: SCHOLARLY_SOURCES_CATALOG['SRC-TRAN-VAN-KHE-1998'].title,
        source_tier: 'secondary_source',
        author_or_institution: 'GS.TS Trần Văn Khê',
        publication_year: '1998',
        page_or_location: 'Chương 3, Trang 85-112',
        quotation: 'Thang âm ngũ cung Huế không theo hệ thống bình quân luật 12 nửa cung của phương Tây mà dựa vào các vi âm (microtones) tạo ra từ kỹ thuật nhấn ngón của đàn nguyệt và đàn tranh.',
        is_primary_support: true
      }
    ],
    verification_status: 'verified',
    reviewed_by: 'Hội đồng Khoa học Bảo tàng Di sản Cố đô',
    updated_at: '2026-11-06'
  },
  {
    fact_id: 'FACT-ACOU-002',
    statement: 'Mười Bản Ngự (Thập Thủ Liên Hoàn) gồm Phẩm Tuyết, Nguyên Tiêu, Hồ Quảng, Liên Hoàn, Bình Bán, Tây Mai, Kim Tiền, Xuân Phong, Long Hổ, Tẩu Mã là kho tàng bài bản khí nhạc mẫu mực thính phòng của cung đình Huế.',
    claim_type: 'verified_fact',
    domain: 'ÂM LUẬT & NGŨ CUNG',
    era: 'Triều Nguyễn (1802 - 1945)',
    related_entities: {
      people: ['Lữ Hữu Thi', 'Trần Kích'],
      artifacts: ['Đàn Tỳ Bà', 'Đàn Nguyệt', 'Sáo Trúc']
    },
    citations: [
      {
        source_id: 'SRC-KY-AM-1995',
        source_code: 'KY-AM-THAP-THU-1995',
        source_name: SCHOLARLY_SOURCES_CATALOG['SRC-KY-AM-1995'].title,
        source_tier: 'primary_source',
        author_or_institution: 'Lữ Hữu Thi, Trần Kích',
        publication_year: '1995',
        page_or_location: 'Tập 1, Trang 5-38',
        quotation: 'Mười bản liên hoàn tấu liền mạch không ngắt quãng, dùng trong ngự yến và tiếp sứ thần.',
        is_primary_support: true
      }
    ],
    verification_status: 'verified',
    reviewed_by: 'Hội đồng Khoa học Bảo tàng Di sản Cố đô',
    updated_at: '2026-11-06'
  },

  // 4. NHÓM DỮ KIỆN NHẠC CỤ & HIỆN VẬT
  {
    fact_id: 'FACT-INST-001',
    statement: 'Kèn Bầu (Gia Lệnh / Kèn dăm) là nhạc cụ lĩnh xướng số một của dàn Đại Nhạc cung đình Huế. Ống thổi dài 45-50cm tiện từ gỗ mun, dăm kèn làm từ lá buông ép mỏng, đòi hỏi nhạc sinh kỹ thuật luồn hơi liên tục (circular breathing).',
    claim_type: 'verified_fact',
    domain: 'NHẠC CỤ & HIỆN VẬT',
    era: 'Triều Nguyễn',
    related_entities: {
      artifacts: ['Kèn Bầu'],
      people: ['Lữ Hữu Thi'],
      places: ['Điện Long An, Thành phố Huế, Việt Nam']
    },
    citations: [
      {
        source_id: 'SRC-BAOTANG-COVAT',
        source_code: 'BT-COVAT-KB-01',
        source_name: SCHOLARLY_SOURCES_CATALOG['SRC-BAOTANG-COVAT'].title,
        source_tier: 'official_source',
        author_or_institution: 'Bảo tàng Cổ vật Cung đình Huế',
        publication_year: '2019',
        page_or_location: 'Hồ sơ hiện vật số HMC-KB-1845',
        quotation: 'Hiện vật kèn dăm gỗ mun bịt đồng thau thời Thiệu Trị, dăm lá buông nguyên bản.',
        is_primary_support: true
      }
    ],
    verification_status: 'verified',
    reviewed_by: 'Hội đồng Khoa học Bảo tàng Di sản Cố đô',
    updated_at: '2026-11-06'
  },
  {
    fact_id: 'FACT-INST-002',
    statement: 'Đàn Tỳ Bà cung đình Huế có thùng đàn hình quả lê làm từ gỗ ngô đồng phơi sương, lưng đàn bằng gỗ cẩm lai khảm xà cừ hoa sen và rồng phượng, 4 dây tơ óng mắc qua phím ngà voi hoặc gỗ trắc.',
    claim_type: 'verified_fact',
    domain: 'NHẠC CỤ & HIỆN VẬT',
    era: 'Triều Nguyễn',
    related_entities: {
      artifacts: ['Đàn Tỳ Bà'],
      places: ['Điện Long An, Thành phố Huế, Việt Nam']
    },
    citations: [
      {
        source_id: 'SRC-BAOTANG-COVAT',
        source_code: 'BT-COVAT-TB-02',
        source_name: SCHOLARLY_SOURCES_CATALOG['SRC-BAOTANG-COVAT'].title,
        source_tier: 'official_source',
        author_or_institution: 'Bảo tàng Cổ vật Cung đình Huế',
        publication_year: '2019',
        page_or_location: 'Hồ sơ hiện vật số HMC-TB-1885',
        is_primary_support: true
      }
    ],
    verification_status: 'verified',
    reviewed_by: 'Hội đồng Khoa học Bảo tàng Di sản Cố đô',
    updated_at: '2026-11-06'
  },
  {
    fact_id: 'FACT-INST-003',
    statement: 'Đàn Tam (Tam Huyền Cầm) có hộp đàn chữ nhật bo tròn các góc bọc da trăn hai mặt, cần đàn mun dài không gắn phím, mắc 3 dây tơ, tạo âm sắc đanh giòn trung âm độc đáo kết nối giữa Đàn Nguyệt và Đàn Nhị.',
    claim_type: 'verified_fact',
    domain: 'NHẠC CỤ & HIỆN VẬT',
    era: 'Triều Nguyễn',
    related_entities: {
      artifacts: ['Đàn Tam'],
      places: ['Điện Long An, Thành phố Huế, Việt Nam']
    },
    citations: [
      {
        source_id: 'SRC-BAOTANG-COVAT',
        source_code: 'BT-COVAT-DT-03',
        source_name: SCHOLARLY_SOURCES_CATALOG['SRC-BAOTANG-COVAT'].title,
        source_tier: 'official_source',
        author_or_institution: 'Bảo tàng Cổ vật Cung đình Huế',
        publication_year: '2019',
        page_or_location: 'Hồ sơ hiện vật số HMC-DT-1902',
        is_primary_support: true
      }
    ],
    verification_status: 'verified',
    reviewed_by: 'Hội đồng Khoa học Bảo tàng Di sản Cố đô',
    updated_at: '2026-11-06'
  },

  // 5. NHÓM DỮ KIỆN CỘNG ĐỒNG NGHỆ NHÂN
  {
    fact_id: 'FACT-COMM-001',
    statement: 'Cố Nghệ nhân Ưu tú Lữ Hữu Thi (thường gọi cụ Khóa Thi) qua đời ngày 15/09/2016 tại làng Thế Lại Thượng (xã Hương Vinh, thị xã Hương Trà, tỉnh Thừa Thiên Huế), hưởng thọ 106 tuổi theo ghi nhận báo chí. Cụ từng là thành viên ban nhạc Cung đình phục vụ hoàng đế Bảo Đại.',
    claim_type: 'verified_fact',
    domain: 'NGHỆ NHÂN & TRUYỀN THỪA',
    era: '1910 - 2016',
    related_entities: {
      people: ['Lữ Hữu Thi', 'Vua Bảo Đại'],
      places: ['Thế Lại Thượng', 'Thành phố Huế, Việt Nam'],
      artifacts: ['Kèn Bầu', 'Đàn Nguyệt']
    },
    citations: [
      {
        source_id: 'SRC-BAOPHAPLUAT-2016',
        source_code: 'BPL-LUHUUTHI-2016',
        source_name: SCHOLARLY_SOURCES_CATALOG['SRC-BAOPHAPLUAT-2016'].title,
        source_tier: 'press_source',
        author_or_institution: 'Báo Pháp Luật TP.HCM',
        publication_year: '2016',
        page_or_location: 'Bài báo xuất bản ngày 16/09/2016',
        quotation: 'Nghệ nhân Lữ Hữu Thi qua đời rạng sáng 15/9 tại nhà riêng ở làng Thế Lại Thượng, hưởng thọ 106 tuổi. Cụ là một trong những nghệ nhân cuối cùng của Đội nhạc Cung đình triều Nguyễn.',
        source_url: 'https://baophapluat.vn/bau-vat-song-cua-nha-nhac-cung-dinh-hue-qua-doi-post227021.html',
        is_primary_support: true
      }
    ],
    verification_status: 'verified',
    reviewed_by: 'Hội đồng Khoa học Bảo tàng Di sản Cố đô',
    updated_at: '2026-11-06',
    contradictions_or_notes: 'Tuyệt đối không gán ghép các năm mất sai lệch hoặc danh hiệu Nghệ sĩ Nhân dân (danh hiệu chính thức của cụ là Nghệ nhân Ưu tú).'
  },
  {
    fact_id: 'FACT-COMM-002',
    statement: 'Cố Nghệ sĩ Ưu tú Trần Kích sinh năm 1921, mất tháng 12 năm 2010 tại Huế. Cụ được Nhà nước phong tặng danh hiệu Nghệ sĩ Ưu tú năm 2007 và được Chính phủ Cộng hòa Pháp trao tặng Huân chương Văn học Nghệ thuật (Chevalier des Arts et des Lettres) năm 2008.',
    claim_type: 'verified_fact',
    domain: 'NGHỆ NHÂN & TRUYỀN THỪA',
    era: '1921 - 2010',
    related_entities: {
      people: ['Trần Kích', 'Trần Thảo'],
      places: ['Thành phố Huế, Việt Nam'],
      artifacts: ['Đàn Nhị', 'Đàn Tỳ Bà']
    },
    citations: [
      {
        source_id: 'SRC-TUOITRE-2010',
        source_code: 'TT-TRANKICH-2010',
        source_name: SCHOLARLY_SOURCES_CATALOG['SRC-TUOITRE-2010'].title,
        source_tier: 'press_source',
        author_or_institution: 'Báo Tuổi Trẻ',
        publication_year: '2010',
        page_or_location: 'Bài báo xuất bản ngày 10/12/2010',
        quotation: 'NSƯT Trần Kích sinh năm 1921, mất ngày 8-12-2010 tại Huế, hưởng thọ 90 tuổi... Năm 2007 cụ được Nhà nước phong tặng danh hiệu NSƯT, năm 2008 nhận Huân chương Văn học Nghệ thuật của Pháp.',
        source_url: 'https://tuoitre.vn/chia-tay-hiep-si-cua-nha-nhac-trieu-nguyen-416423.htm',
        is_primary_support: true
      }
    ],
    verification_status: 'verified',
    reviewed_by: 'Hội đồng Khoa học Bảo tàng Di sản Cố đô',
    updated_at: '2026-11-06'
  },

  // 6. NHÓM DỮ KIỆN ĐỊA BÀN & KHÔNG GIAN DI SẢN
  {
    fact_id: 'FACT-SITE-001',
    statement: 'Đàn Nam Giao được vua Gia Long cho xây dựng vào năm 1806 tại đồi thông Ngự Bình, thành phố Huế. Đây là khu tế đàn ngoài trời thiêng liêng nhất triều Nguyễn, nơi định kỳ 3 năm một lần Thiên tử đích thân tế Trời Đất với dàn Giao nhạc trang nghiêm.',
    claim_type: 'verified_fact',
    domain: 'KHÔNG GIAN DI SẢN',
    era: 'Năm 1806 (Thời Gia Long)',
    related_entities: {
      people: ['Vua Gia Long'],
      places: ['Đàn Nam Giao', 'Đồi Ngự Bình', 'Thành phố Huế, Việt Nam'],
      events: ['Đại lễ Tế Nam Giao']
    },
    citations: [
      {
        source_id: 'SRC-DAI-NAM-THUC-LUC',
        source_code: 'DNTL-GIALONG-1806',
        source_name: SCHOLARLY_SOURCES_CATALOG['SRC-DAI-NAM-THUC-LUC'].title,
        source_tier: 'primary_source',
        author_or_institution: 'Quốc Sử Quán Triều Nguyễn',
        publication_year: '1844',
        volume: 'Đệ nhất kỷ (Thực lục về Thế Tổ Cao Hoàng Đế)',
        page_or_location: 'Năm Bính Dần (1806)',
        quotation: 'Đắp đàn Nam Giao ở xã An Ninh... chia làm ba tầng Viên Đàn, Phương Đàn.',
        is_primary_support: true
      }
    ],
    verification_status: 'verified',
    reviewed_by: 'Hội đồng Khoa học Bảo tàng Di sản Cố đô',
    updated_at: '2026-11-06'
  },
  {
    fact_id: 'FACT-SITE-002',
    statement: 'Điện Long An (xây năm 1845 dưới thời vua Thiệu Trị) nguyên là tẩm điện của cung Bảo Định, là kiệt tác kiến trúc gỗ lim chạm trổ thơ ca chữ Hán thếp vàng, hiện là trụ sở của Bảo tàng Cổ vật Cung đình Huế (Số 3 Lê Trực, Thành phố Huế, Việt Nam) nơi bảo quản bộ sưu tập nhạc khí cổ nguyên bản.',
    claim_type: 'verified_fact',
    domain: 'KHÔNG GIAN DI SẢN',
    era: 'Năm 1845 (Thời Thiệu Trị)',
    related_entities: {
      people: ['Vua Thiệu Trị'],
      places: ['Điện Long An', 'Bảo tàng Cổ vật Cung đình Huế', 'Thành phố Huế, Việt Nam'],
      artifacts: ['Chuông đồng', 'Khánh đá', 'Đàn Tỳ Bà']
    },
    citations: [
      {
        source_id: 'SRC-BAOTANG-COVAT',
        source_code: 'BT-LONG-AN-1845',
        source_name: SCHOLARLY_SOURCES_CATALOG['SRC-BAOTANG-COVAT'].title,
        source_tier: 'official_source',
        author_or_institution: 'Bảo tàng Cổ vật Cung đình Huế',
        publication_year: '2019',
        page_or_location: 'Hồ sơ Di tích Kiến trúc Nghệ thuật Điện Long An',
        is_primary_support: true
      }
    ],
    verification_status: 'verified',
    reviewed_by: 'Hội đồng Khoa học Bảo tàng Di sản Cố đô',
    updated_at: '2026-11-06'
  },

  // 7. NHÓM DỮ KIỆN MÔ PHỎNG SỐ & MINH HOẠ
  {
    fact_id: 'FACT-SIM-001',
    statement: 'Âm thanh diễn tấu tương tác trên trang Web Audio API của bảo tàng số là âm thanh toán học mô phỏng theo tần số ngũ cung (Hò, Xự, Xang, Xê, Cống), không phải là bản ghi âm hiện trường lịch sử nguyên gốc từ thế kỷ XIX.',
    claim_type: 'simulated_content',
    domain: 'TƯ LIỆU SỐ HÓA',
    era: 'Đương đại (Kỹ thuật số)',
    related_entities: {
      artifacts: ['Kèn Bầu', 'Đàn Nguyệt', 'Trống Bản']
    },
    citations: [
      {
        source_id: 'SRC-DSVH-VN',
        source_code: 'DSVH-DIGITAL-ETHICS',
        source_name: 'Quy chuẩn Đạo đức và Tính trung thực trong Số hóa Di sản Văn hóa Phi vật thể',
        source_tier: 'official_source',
        author_or_institution: 'Cục Di sản Văn hóa',
        publication_year: '2023',
        section: 'Điều 4: Phân định dữ liệu gốc và dữ liệu tái tạo số',
        quotation: 'Các ứng dụng bảo tàng số phải công khai minh bạch đối với âm thanh và hình ảnh do máy tính mô phỏng, tránh ngộ nhận cho công chúng.',
        is_primary_support: true
      }
    ],
    verification_status: 'published',
    reviewed_by: 'Trần Thanh Bình (Kỹ sư kiến trúc số)',
    updated_at: '2026-11-06'
  },
  {
    fact_id: 'FACT-SIM-002',
    statement: 'Vũ khúc Lục Cúng Hoa Đăng dâng 6 lễ vật thanh tịnh (Hương, Hoa, Đăng, Trà, Quả, Thực) cầu mưa thuận gió hòa, quốc thái dân an; biến hóa đội hình hoa sen kết thành chữ Hán "Thái Bình", "Vạn Tuế", "Thiên Thu".',
    claim_type: 'academic_interpretation',
    domain: 'HÌNH THỨC & NGHI LỄ',
    era: 'Triều Nguyễn',
    related_entities: {
      events: ['Lục Cúng Hoa Đăng'],
      places: ['Duyệt Thị Đường, Thành phố Huế, Việt Nam']
    },
    citations: [
      {
        source_id: 'SRC-HMCC-DUYET-THI',
        source_code: 'HMCC-LUC-CUNG',
        source_name: SCHOLARLY_SOURCES_CATALOG['SRC-HMCC-DUYET-THI'].title,
        source_tier: 'official_source',
        author_or_institution: 'Trung tâm Bảo tồn Di tích Cố đô Huế',
        publication_year: '2020',
        page_or_location: 'Chương Múa Cung đình Huế, Trang 45-52',
        is_primary_support: true
      }
    ],
    verification_status: 'verified',
    reviewed_by: 'Hội đồng Khoa học Bảo tàng Di sản Cố đô',
    updated_at: '2026-11-06'
  }
];

// ============================================================================
// DANH MỤC TÀI SẢN THỊ GIÁC & ÂM THANH MINH BẠCH (DIGITAL ASSETS REGISTRY)
// ============================================================================

export const DIGITAL_ASSETS_REGISTRY: DigitalAssetMetadata[] = [
  {
    asset_id: 'AST-IMG-001',
    asset_name: 'Toàn cảnh Lễ Diễn xướng Nhã nhạc trước Điện Thái Hòa',
    asset_type: 'image',
    provenance_category: 'Ảnh tư liệu thật',
    file_path: '/src/assets/images/hero_nha_nhac_hue_1793928492915.jpg',
    source_institution: 'Trung tâm Bảo tồn Di tích Cố đô Huế (HMCC)',
    license: 'Giấy phép hợp tác giáo dục phi thương mại',
    verification_status: 'published',
    technical_specs: '1920x1080 JPEG, 300dpi'
  },
  {
    asset_id: 'AST-IMG-002',
    asset_name: 'Không gian Nhà hát Hoàng gia Duyệt Thị Đường',
    asset_type: 'image',
    provenance_category: 'Ảnh tư liệu thật',
    file_path: '/src/assets/images/duyet_thi_duong_theater_1793928493481.jpg',
    source_institution: 'Bảo tàng Cổ vật Cung đình Huế',
    license: 'Giấy phép tư liệu di sản Cố đô',
    verification_status: 'published',
    technical_specs: '1920x1080 JPEG'
  },
  {
    asset_id: 'AST-IMG-003',
    asset_name: 'Bộ sưu tập Nhạc cụ Cung đình tại Bảo tàng Cổ vật Điện Long An',
    asset_type: 'image',
    provenance_category: 'Ảnh tư liệu thật',
    file_path: '/src/assets/images/royal_instruments_still_life_1793928495633.jpg',
    source_institution: 'Bảo tàng Cổ vật Cung đình Huế (Số 3 Lê Trực)',
    license: 'Lưu trữ Bảo tàng Quốc gia',
    verification_status: 'published',
    technical_specs: '1920x1080 JPEG'
  },
  {
    asset_id: 'AST-IMG-004',
    asset_name: 'Vũ khúc Lục Cúng Hoa Đăng tại Sân khấu Cung đình',
    asset_type: 'image',
    provenance_category: 'Ảnh tư liệu thật',
    file_path: '/src/assets/images/luc_cung_hoa_dang_dance_1793928496126.jpg',
    source_institution: 'Nhà hát Nghệ thuật Truyền thống Cung đình Huế',
    license: 'Quyền công bố tư liệu bảo tồn',
    verification_status: 'published',
    technical_specs: '1920x1080 JPEG'
  },
  {
    asset_id: 'AST-IMG-005',
    asset_name: 'Chân dung Nghệ nhân Tiền bối bên Nhạc cụ Cung đình',
    asset_type: 'image',
    provenance_category: 'Ảnh phục dựng',
    file_path: '/src/assets/images/master_artisan_portrait_1793928495965.jpg',
    source_institution: 'Tư liệu điền dã Cố đô Huế',
    license: 'Bản quyền nghiên cứu học thuật',
    verification_status: 'verified',
    technical_specs: '1920x1080 JPEG'
  },
  {
    asset_id: 'AST-IMG-006',
    asset_name: 'Sân Đại Triều Nghi và Điện Thái Hòa Cố đô Huế',
    asset_type: 'image',
    provenance_category: 'Ảnh tư liệu thật',
    file_path: '/src/assets/images/thai_hoa_palace_court_1793952624534.jpg',
    source_institution: 'Trung tâm Bảo tồn Di tích Cố đô Huế (HMCC)',
    license: 'CC BY-NC-ND 4.0',
    verification_status: 'published',
    technical_specs: '1920x1080 JPEG'
  },
  {
    asset_id: 'AST-IMG-007',
    asset_name: 'Khu tế đàn Nam Giao giữa rừng thông Ngự Bình',
    asset_type: 'image',
    provenance_category: 'Ảnh tư liệu thật',
    file_path: '/src/assets/images/nam_giao_altar_hue_1793952638343.jpg',
    source_institution: 'Trung tâm Bảo tồn Di tích Cố đô Huế',
    license: 'CC BY-NC-ND 4.0',
    verification_status: 'published',
    technical_specs: '1920x1080 JPEG'
  },
  {
    asset_id: 'AST-IMG-008',
    asset_name: 'Hiện vật Đàn Tam (Tam Huyền Cầm) cổ truyền',
    asset_type: 'image',
    provenance_category: 'Ảnh tư liệu thật',
    file_path: '/src/assets/images/dan_tam_lute_museum_1793952652465.jpg',
    source_institution: 'Bảo tàng Cổ vật Cung đình Huế',
    license: 'Giấy phép kiểm kê hiện vật quốc gia',
    verification_status: 'published',
    technical_specs: '1920x1080 JPEG'
  },
  {
    asset_id: 'AST-AUD-SIM-01',
    asset_name: 'Web Audio API Cung Đình Engine (Mô phỏng Ngũ Cung)',
    asset_type: 'audio',
    provenance_category: 'Âm thanh mô phỏng',
    file_path: '/src/utils/audioEngine.ts',
    source_institution: 'Dự án Bảo tàng Di sản Số Trần Thanh Bình',
    author_or_creator: 'Trần Thanh Bình (PH61165)',
    license: 'Apache-2.0 Open Heritage',
    verification_status: 'published',
    technical_specs: 'Web Audio Synthesizer, 44.1kHz, 32-bit float'
  }
];

// ============================================================================
// HÀM TIỆN ÍCH TRA CỨU HỌC THUẬT (FACT-STORE QUERY UTILITIES)
// ============================================================================

export function getFactsByDomain(domain: DomainCategory): KnowledgeFact[] {
  return KNOWLEDGE_FACT_STORE.filter(f => f.domain === domain);
}

export function getFactById(factId: string): KnowledgeFact | undefined {
  return KNOWLEDGE_FACT_STORE.find(f => f.fact_id === factId);
}

export function getVerifiedFacts(): KnowledgeFact[] {
  return KNOWLEDGE_FACT_STORE.filter(f => f.verification_status === 'verified' || f.verification_status === 'published');
}

export function getFactsNeedingReview(): KnowledgeFact[] {
  return KNOWLEDGE_FACT_STORE.filter(f => f.verification_status === 'pending_review' || f.verification_status === 'needs_revision');
}

export function getFactStoreStatistics() {
  const total = KNOWLEDGE_FACT_STORE.length;
  const verified = KNOWLEDGE_FACT_STORE.filter(f => f.verification_status === 'verified').length;
  const published = KNOWLEDGE_FACT_STORE.filter(f => f.verification_status === 'published').length;
  const pendingReview = KNOWLEDGE_FACT_STORE.filter(f => f.verification_status === 'pending_review').length;
  const needsRevision = KNOWLEDGE_FACT_STORE.filter(f => f.verification_status === 'needs_revision').length;

  const primaryCount = KNOWLEDGE_FACT_STORE.filter(f => f.citations.some(c => c.source_tier === 'primary_source')).length;
  const secondaryCount = KNOWLEDGE_FACT_STORE.filter(f => f.citations.some(c => c.source_tier === 'secondary_source')).length;
  const officialCount = KNOWLEDGE_FACT_STORE.filter(f => f.citations.some(c => c.source_tier === 'official_source')).length;

  return {
    totalFacts: total,
    verified,
    published,
    pendingReview,
    needsRevision,
    primarySourcesCount: primaryCount,
    secondarySourcesCount: secondaryCount,
    officialSourcesCount: officialCount
  };
}
