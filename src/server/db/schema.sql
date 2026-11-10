-- ============================================================================
-- ACADEMIC DIGITAL HERITAGE MUSEUM: NHÃ NHẠC CUNG ĐÌNH HUẾ
-- DATABASE SCHEMA DDL: GIAI ĐOẠN 2 - DATABASE VÀ BACKEND CORE
-- Tác giả: Trần Thanh Bình (MSSV: PH61165 - Lớp: D02)
-- Địa bàn di sản trọng tâm: Thành phố Huế, Việt Nam
-- Chuẩn hóa quan hệ dữ liệu: CIDOC CRM (ISO 21127:2023)
-- ============================================================================

-- 1. BẢNG NGUỒN THAM KHẢO HỌC THUẬT (SCHOLARLY SOURCES - E31 DOCUMENT)
CREATE TABLE IF NOT EXISTS scholarly_sources (
    id VARCHAR(50) PRIMARY KEY,
    source_code VARCHAR(50) UNIQUE NOT NULL,
    title TEXT NOT NULL,
    tier VARCHAR(30) NOT NULL CHECK(tier IN (
        'primary_source', 
        'secondary_source', 
        'official_source', 
        'press_source', 
        'other_source'
    )),
    author_or_body TEXT NOT NULL,
    publication_year VARCHAR(50),
    repository_or_publisher TEXT NOT NULL,
    url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_sources_tier ON scholarly_sources(tier);
CREATE INDEX IF NOT EXISTS idx_sources_code ON scholarly_sources(source_code);

-- 2. BẢNG HẠT NHÂN DỮ KIỆN HỌC THUẬT (KNOWLEDGE FACTS - E73 INFORMATION OBJECT)
CREATE TABLE IF NOT EXISTS knowledge_facts (
    id VARCHAR(50) PRIMARY KEY,
    fact_id VARCHAR(50) UNIQUE NOT NULL,
    statement TEXT NOT NULL,
    claim_type VARCHAR(30) NOT NULL CHECK(claim_type IN (
        'verified_fact', 
        'academic_interpretation', 
        'research_hypothesis', 
        'illustrative_content', 
        'simulated_content'
    )),
    domain VARCHAR(50) NOT NULL CHECK(domain IN (
        'LỊCH SỬ', 
        'UNESCO', 
        'ÂM LUẬT & NGŨ CUNG', 
        'NHẠC CỤ & HIỆN VẬT', 
        'HÌNH THỨC & NGHI LỄ', 
        'KHÔNG GIAN DI SẢN', 
        'NGHỆ NHÂN & TRUYỀN THỪA', 
        'TƯ LIỆU SỐ HÓA'
    )),
    era VARCHAR(100) NOT NULL,
    related_entities TEXT NOT NULL, -- JSON string array: {people: [], places: [], artifacts: [], events: []}
    verification_status VARCHAR(30) NOT NULL CHECK(verification_status IN (
        'draft', 
        'pending_review', 
        'verified', 
        'needs_revision', 
        'published', 
        'archived'
    )),
    reviewed_by VARCHAR(150) NOT NULL,
    updated_at VARCHAR(50) NOT NULL,
    contradictions_or_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_facts_fact_id ON knowledge_facts(fact_id);
CREATE INDEX IF NOT EXISTS idx_facts_domain ON knowledge_facts(domain);
CREATE INDEX IF NOT EXISTS idx_facts_status ON knowledge_facts(verification_status);
CREATE INDEX IF NOT EXISTS idx_facts_claim_type ON knowledge_facts(claim_type);

-- 3. BẢNG TRÍCH DẪN NGUỒN CỦA DỮ KIỆN (FACT CITATIONS - P70 DOCUMENTS)
CREATE TABLE IF NOT EXISTS fact_citations (
    id VARCHAR(50) PRIMARY KEY,
    fact_id VARCHAR(50) NOT NULL REFERENCES knowledge_facts(fact_id) ON DELETE CASCADE,
    source_id VARCHAR(50) NOT NULL REFERENCES scholarly_sources(source_code) ON DELETE RESTRICT,
    source_name TEXT NOT NULL,
    source_tier VARCHAR(30) NOT NULL,
    page_or_location VARCHAR(100),
    volume VARCHAR(50),
    section VARCHAR(100),
    quotation TEXT,
    source_url TEXT,
    is_primary_support INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_citations_fact_id ON fact_citations(fact_id);
CREATE INDEX IF NOT EXISTS idx_citations_source_id ON fact_citations(source_id);

-- 4. BẢNG QUẢN LÝ TÀI SẢN SỐ & BẢN QUYỀN (DIGITAL ASSETS - E36 VISUAL ITEM / AUDIO)
CREATE TABLE IF NOT EXISTS digital_assets (
    id VARCHAR(50) PRIMARY KEY,
    asset_id VARCHAR(50) UNIQUE NOT NULL,
    asset_name TEXT NOT NULL,
    asset_type VARCHAR(30) NOT NULL CHECK(asset_type IN (
        'image', 
        'audio', 
        'video', 
        'manuscript', 
        '3d_model'
    )),
    provenance_category VARCHAR(50) NOT NULL CHECK(provenance_category IN (
        'Ảnh tư liệu thật', 
        'Ảnh phục dựng', 
        'Ảnh AI minh họa', 
        'Ảnh minh họa', 
        'Bản ghi âm gốc', 
        'Âm thanh mô phỏng', 
        'Video tư liệu', 
        'Video tái dựng'
    )),
    file_path TEXT NOT NULL,
    source_institution TEXT NOT NULL,
    author_or_creator TEXT,
    license TEXT NOT NULL,
    verification_status VARCHAR(30) NOT NULL,
    technical_specs TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_assets_asset_id ON digital_assets(asset_id);
CREATE INDEX IF NOT EXISTS idx_assets_provenance ON digital_assets(provenance_category);

-- 5. BẢNG NHẬT KÝ KIỂM TOÁN HỌC THUẬT (AUDIT LOGS - ISO 27001 AUDIT TRAIL)
CREATE TABLE IF NOT EXISTS audit_logs (
    id VARCHAR(50) PRIMARY KEY,
    action_type VARCHAR(30) NOT NULL CHECK(action_type IN (
        'CREATE', 
        'UPDATE', 
        'DELETE', 
        'VERIFY', 
        'MIGRATE'
    )),
    table_name VARCHAR(50) NOT NULL,
    record_id VARCHAR(50) NOT NULL,
    previous_state TEXT, -- JSON snapshot trước khi sửa
    new_state TEXT,      -- JSON snapshot sau khi sửa
    change_justification TEXT NOT NULL, -- Căn cứ học thuật bắt buộc
    operator VARCHAR(100) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_audit_record ON audit_logs(table_name, record_id);
CREATE INDEX IF NOT EXISTS idx_audit_timestamp ON audit_logs(timestamp DESC);

-- ============================================================================
-- GIAI ĐOẠN 3: TRUNG TÂM TƯ LIỆU SỐ CHUYÊN SÂU (DIGITAL ARCHIVE CENTER)
-- 10 BẢNG LƯU TRỮ, QUẢN TRỊ BẢN QUYỀN, IIIF VÀ KHẢO DỊ HỌC THUẬT
-- ============================================================================

-- 6. BẢNG BỘ SƯU TẬP TƯ LIỆU SỐ (DIGITAL COLLECTIONS)
CREATE TABLE IF NOT EXISTS digital_collections (
    id VARCHAR(50) PRIMARY KEY,
    collection_code VARCHAR(50) UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    curator TEXT NOT NULL,
    institution TEXT NOT NULL,
    total_items INTEGER DEFAULT 0,
    access_level VARCHAR(30) DEFAULT 'public' CHECK(access_level IN ('public', 'scholarly_research', 'restricted')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_collections_code ON digital_collections(collection_code);

-- 7. BẢNG TÀI LIỆU CỔ & THƯ TỊCH SỐ (DIGITAL MANUSCRIPTS - IIIF MANIFEST LEVEL)
CREATE TABLE IF NOT EXISTS digital_manuscripts (
    id VARCHAR(50) PRIMARY KEY,
    manuscript_code VARCHAR(50) UNIQUE NOT NULL,
    collection_id VARCHAR(50) REFERENCES digital_collections(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    original_title_han_nom TEXT,
    author_or_compiler TEXT,
    historical_era VARCHAR(100) NOT NULL,
    dynasty_year VARCHAR(100),
    physical_format VARCHAR(50) NOT NULL, -- mộc bản triều Nguyễn, bản chép tay trên giấy dó, v.v.
    total_pages INTEGER NOT NULL DEFAULT 1,
    conservation_status VARCHAR(50),
    repository TEXT NOT NULL,
    iiif_manifest_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_manuscripts_code ON digital_manuscripts(manuscript_code);
CREATE INDEX IF NOT EXISTS idx_manuscripts_era ON digital_manuscripts(historical_era);

-- 8. BẢNG TRANG TƯ LIỆU SCAN (MANUSCRIPT PAGES - IIIF CANVAS LEVEL)
CREATE TABLE IF NOT EXISTS manuscript_pages (
    id VARCHAR(50) PRIMARY KEY,
    manuscript_id VARCHAR(50) NOT NULL REFERENCES digital_manuscripts(id) ON DELETE CASCADE,
    page_number INTEGER NOT NULL,
    label TEXT NOT NULL,
    image_url TEXT NOT NULL,
    width_px INTEGER NOT NULL,
    height_px INTEGER NOT NULL,
    dpi INTEGER DEFAULT 300,
    has_transcription INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(manuscript_id, page_number)
);

CREATE INDEX IF NOT EXISTS idx_pages_manuscript ON manuscript_pages(manuscript_id);

-- 9. BẢNG HÌNH ẢNH CỔ VẬT SIÊU PHÂN GIẢI (DIGITAL HIGH-RES IMAGES)
CREATE TABLE IF NOT EXISTS digital_images (
    id VARCHAR(50) PRIMARY KEY,
    image_code VARCHAR(50) UNIQUE NOT NULL,
    title TEXT NOT NULL,
    artifact_category VARCHAR(50) NOT NULL,
    image_url TEXT NOT NULL,
    max_zoom_level FLOAT DEFAULT 4.0,
    original_dimensions VARCHAR(50),
    color_space VARCHAR(30) DEFAULT 'sRGB',
    copyright_notice TEXT NOT NULL,
    provenance_status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_images_code ON digital_images(image_code);

-- 10. BẢNG BẢN THU ÂM HỌC THUẬT (AUDIO RECORDS)
CREATE TABLE IF NOT EXISTS audio_records (
    id VARCHAR(50) PRIMARY KEY,
    audio_code VARCHAR(50) UNIQUE NOT NULL,
    title TEXT NOT NULL,
    repertoire_name TEXT NOT NULL,
    instrument_ensemble TEXT NOT NULL,
    recording_type VARCHAR(50) NOT NULL CHECK(recording_type IN ('Bản ghi âm gốc', 'Âm thanh phục dựng', 'Âm thanh điền dã')),
    recording_year VARCHAR(20),
    recording_location TEXT NOT NULL,
    performers_or_ensemble TEXT NOT NULL,
    duration_seconds INTEGER NOT NULL,
    audio_file_url TEXT NOT NULL,
    waveform_data TEXT, -- Chuỗi JSON biên độ sóng âm cho visualizer
    rights_holder TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_audio_code ON audio_records(audio_code);
CREATE INDEX IF NOT EXISTS idx_audio_type ON audio_records(recording_type);

-- 11. BẢNG TƯ LIỆU HÌNH ẢNH ĐỘNG / VIDEO (VIDEO RECORDS)
CREATE TABLE IF NOT EXISTS video_records (
    id VARCHAR(50) PRIMARY KEY,
    video_code VARCHAR(50) UNIQUE NOT NULL,
    title TEXT NOT NULL,
    ritual_context TEXT NOT NULL,
    performance_space TEXT NOT NULL,
    recording_year VARCHAR(20),
    production_unit TEXT NOT NULL,
    rights_license TEXT NOT NULL,
    duration_seconds INTEGER NOT NULL,
    video_url TEXT NOT NULL,
    timeline_bookmarks TEXT, -- Chuỗi JSON các mốc nghi lễ (timecode, label, description)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_video_code ON video_records(video_code);

-- 12. BẢNG PHIÊN ÂM VÀ DỊCH NGHĨA (TRANSCRIPTIONS)
CREATE TABLE IF NOT EXISTS transcriptions (
    id VARCHAR(50) PRIMARY KEY,
    page_id VARCHAR(50) NOT NULL REFERENCES manuscript_pages(id) ON DELETE CASCADE,
    han_nom_text TEXT NOT NULL,
    sino_vietnamese TEXT NOT NULL,
    modern_vietnamese TEXT NOT NULL,
    english_translation TEXT,
    critical_apparatus TEXT, -- Khảo chú, dị tự, giải nghĩa từ cổ
    transcriber_name TEXT NOT NULL,
    peer_reviewed_by TEXT,
    review_status VARCHAR(30) NOT NULL CHECK(review_status IN ('draft', 'peer_reviewed', 'verified_academic')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_transcriptions_page ON transcriptions(page_id);

-- 13. BẢNG CHÚ THÍCH TỌA ĐỘ VÙNG ẢNH (ANNOTATIONS - IIIF / DEEP ZOOM HOTSPOTS)
CREATE TABLE IF NOT EXISTS annotations (
    id VARCHAR(50) PRIMARY KEY,
    target_type VARCHAR(30) NOT NULL CHECK(target_type IN ('manuscript_page', 'high_res_image')),
    target_id VARCHAR(50) NOT NULL,
    x_percent FLOAT NOT NULL,
    y_percent FLOAT NOT NULL,
    annotation_title TEXT NOT NULL,
    annotation_body TEXT NOT NULL,
    organological_part TEXT, -- Bộ phận nhạc khí / chi tiết văn bản
    author TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_annotations_target ON annotations(target_type, target_id);

-- 14. BẢNG ĐỐI SÁNH DỊ BẢN HỌC THUẬT (SOURCE COMPARISONS)
CREATE TABLE IF NOT EXISTS source_comparisons (
    id VARCHAR(50) PRIMARY KEY,
    comparison_code VARCHAR(50) UNIQUE NOT NULL,
    piece_name TEXT NOT NULL,
    research_domain VARCHAR(50) NOT NULL,
    variant_a_source TEXT NOT NULL,
    variant_a_era VARCHAR(50) NOT NULL,
    variant_a_notation TEXT NOT NULL,
    variant_b_source TEXT NOT NULL,
    variant_b_era VARCHAR(50) NOT NULL,
    variant_b_notation TEXT NOT NULL,
    discrepancy_analysis TEXT NOT NULL,
    academic_consensus_note TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_comparisons_code ON source_comparisons(comparison_code);

-- 15. BẢNG PHÂN QUYỀN VÀ BẢN QUYỀN TƯ LIỆU SỐ (ARCHIVAL PERMISSIONS & LICENSES)
CREATE TABLE IF NOT EXISTS archival_permissions (
    id VARCHAR(50) PRIMARY KEY,
    asset_id VARCHAR(50) NOT NULL,
    asset_type VARCHAR(30) NOT NULL,
    license_type VARCHAR(50) NOT NULL, -- CC-BY-NC-ND 4.0, Public Domain, Restricted Educational
    usage_terms TEXT NOT NULL,
    attribution_requirement TEXT NOT NULL,
    embargo_until DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_permissions_asset ON archival_permissions(asset_id);

-- ============================================================================
-- GIAI ĐOẠN 4: MUSIC RESEARCH STUDIO (PHÒNG NGHIÊN CỨU ÂM LUẬT & KÝ ÂM)
-- 4 BẢNG THANG ÂM, ĐIỆU THỨC, BÀI BẢN VÀ BẢN KÝ ÂM NGƯỜI DÙNG
-- ============================================================================

-- 16. BẢNG HỆ THỐNG BẬC ÂM NGŨ CUNG & BIẾN ÂM (PENTATONIC SCALES & PITCH DEGREES)
CREATE TABLE IF NOT EXISTS pentatonic_scales (
    id VARCHAR(50) PRIMARY KEY,
    pitch_name VARCHAR(20) NOT NULL, -- Hò, Xự, Xang, Xê, Cống, Phan, Lục
    han_char VARCHAR(10) NOT NULL,
    role_description TEXT NOT NULL,
    nominal_cents INTEGER NOT NULL,
    nominal_hz_ref_f FLOAT NOT NULL,
    nominal_hz_ref_c FLOAT NOT NULL,
    nominal_hz_ref_d FLOAT NOT NULL,
    ornamentation_technique TEXT NOT NULL,
    acoustic_profile TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_pentatonic_pitch ON pentatonic_scales(pitch_name);

-- 17. BẢNG CẤU TRÚC ĐIỆU THỨC CUNG ĐÌNH (MUSICAL MODES: ĐIỆU KHÁCH & ĐIỆU NAM)
CREATE TABLE IF NOT EXISTS musical_modes (
    id VARCHAR(50) PRIMARY KEY,
    mode_name VARCHAR(50) NOT NULL,
    category VARCHAR(30) NOT NULL CHECK(category IN ('Điệu Khách', 'Điệu Nam')),
    chinese_name VARCHAR(50),
    scale_formula TEXT NOT NULL,
    emotional_affect TEXT NOT NULL,
    vibrato_rules TEXT NOT NULL, -- JSON string: nốt rung, nốt nhấn, nốt buông
    ritual_application TEXT NOT NULL,
    scholarly_analysis TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_modes_category ON musical_modes(category);

-- 18. BẢNG TỔNG PHỔ BÀI BẢN MẪU MỰC (TRADITIONAL SCORES LIBRARY)
CREATE TABLE IF NOT EXISTS traditional_scores (
    id VARCHAR(50) PRIMARY KEY,
    title TEXT NOT NULL,
    han_title TEXT,
    repertoire_category VARCHAR(60) NOT NULL,
    source_manuscript TEXT NOT NULL,
    meter_pattern VARCHAR(50) NOT NULL,
    tempo VARCHAR(50) NOT NULL,
    structure TEXT NOT NULL,
    court_context TEXT NOT NULL,
    solmization_json TEXT NOT NULL, -- JSON array các chữ nhạc
    frequencies_json TEXT NOT NULL,  -- JSON array tần số Hz tham chiếu
    curatorial_note TEXT NOT NULL,
    verification_status VARCHAR(30) DEFAULT 'verified',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_scores_category ON traditional_scores(repertoire_category);

-- 19. BẢNG BẢN KÝ ÂM NGHIÊN CỨU & LỊCH SỬ CHỈNH SỬA (USER TRANSCRIPTIONS)
CREATE TABLE IF NOT EXISTS user_transcriptions (
    id VARCHAR(50) PRIMARY KEY,
    title TEXT NOT NULL,
    repertoire_ref VARCHAR(50),
    base_ho_pitch VARCHAR(5) NOT NULL CHECK(base_ho_pitch IN ('F', 'C', 'D')),
    mode_type VARCHAR(50) NOT NULL,
    notes_sequence_json TEXT NOT NULL, -- JSON array {pitchName, duration, ornament}
    transcriber_name TEXT NOT NULL,
    justification TEXT NOT NULL,
    version_number INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_transcriptions_title ON user_transcriptions(title);

-- ============================================================================
-- GIAI ĐOẠN 5: HOÀN THIỆN BẢO TÀNG SỐ & KIỂM ĐỊNH HỌC THUẬT
-- 3 BẢNG HỒ SƠ NGHỆ NHÂN, TỌA ĐỘ GPS VÀ TRIỂN LÃM SỐ CHUYÊN ĐỀ
-- ============================================================================

-- 20. BẢNG HỒ SƠ NGHỆ NHÂN DI SẢN (ARTISAN DOSSIERS)
CREATE TABLE IF NOT EXISTS artisan_dossiers (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    birth_year INTEGER NOT NULL,
    death_year INTEGER,
    hometown TEXT NOT NULL,
    official_title TEXT NOT NULL,
    title_decision_info TEXT NOT NULL,
    primary_instruments TEXT NOT NULL, -- JSON array các nhạc cụ
    musical_specialty TEXT NOT NULL,
    unesco_contribution TEXT NOT NULL,
    biography TEXT NOT NULL,
    teaching_legacy TEXT NOT NULL,
    verified_sources_json TEXT NOT NULL, -- JSON array các nguồn báo chí/UNESCO
    curatorial_status VARCHAR(50) DEFAULT 'Đã xác minh chính thức',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_artisans_name ON artisan_dossiers(name);

-- 21. BẢNG TỌA ĐỘ GPS TRẮC ĐỊA & BẢO TỒN ĐỊA BÀN (SITE GEOLOCATIONS)
CREATE TABLE IF NOT EXISTS site_geolocations (
    id VARCHAR(50) PRIMARY KEY,
    site_id VARCHAR(50) UNIQUE NOT NULL,
    site_name TEXT NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    administrative_address TEXT NOT NULL,
    google_maps_url TEXT NOT NULL,
    built_year VARCHAR(50) NOT NULL,
    conservation_dossier TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_sites_site_id ON site_geolocations(site_id);

-- 22. BẢNG TRIỂN LÃM CHUYÊN ĐỀ SỐ HÓA (EXHIBITION GALLERIES)
CREATE TABLE IF NOT EXISTS exhibition_galleries (
    id VARCHAR(50) PRIMARY KEY,
    title TEXT NOT NULL,
    curatorial_theme TEXT NOT NULL,
    historical_era VARCHAR(100) NOT NULL,
    artifacts_manifest_json TEXT NOT NULL, -- JSON array các tiêu bản liên kết GĐ3 và GĐ4
    copyright_license TEXT NOT NULL,
    hosting_institution TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_exhibitions_title ON exhibition_galleries(title);

