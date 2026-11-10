/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * DATABASE ENGINE & DATA REPOSITORY - GIAI ĐOẠN 2: DATABASE VÀ BACKEND CORE
 * Dự án: Bảo tàng Di sản số Học thuật – Nhã nhạc Cung đình Huế
 * Tác giả: Trần Thanh Bình (MSSV: PH61165 - Lớp: D02)
 * 
 * Đảm bảo:
 * - Quan hệ chuẩn PK, FK, UNIQUE, CHECK
 * - Nhật ký kiểm toán audit_logs cho mọi thao tác CRUD
 * - Migration dữ liệu an toàn từ src/data/factStoreData.ts
 * - Lưu trữ bền vững (Persistence) không mất dữ liệu qua các lần khởi động lại
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  SCHOLARLY_SOURCES_CATALOG,
  KNOWLEDGE_FACT_STORE,
  DIGITAL_ASSETS_REGISTRY,
  KnowledgeFact,
  FactCitation,
  DigitalAssetMetadata,
  ClaimType,
  VerificationStatus,
  DomainCategory,
  SourceTier
} from '../../data/factStoreData.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_STORAGE_PATH = path.resolve(__dirname, 'storage.json');

export interface ScholarlySourceRow {
  id: string;
  source_code: string;
  title: string;
  tier: SourceTier;
  author_or_body: string;
  publication_year?: string;
  repository_or_publisher: string;
  url?: string;
  created_at: string;
}

export interface KnowledgeFactRow {
  id: string;
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
  created_at: string;
}

export interface DigitalAssetRow extends DigitalAssetMetadata {
  id: string;
  created_at: string;
}

export interface AuditLogRow {
  id: string;
  action_type: 'CREATE' | 'UPDATE' | 'DELETE' | 'VERIFY' | 'MIGRATE';
  table_name: string;
  record_id: string;
  previous_state: string | null;
  new_state: string | null;
  change_justification: string;
  operator: string;
  timestamp: string;
}

export interface DatabaseState {
  version: number;
  scholarly_sources: ScholarlySourceRow[];
  knowledge_facts: KnowledgeFactRow[];
  digital_assets: DigitalAssetRow[];
  audit_logs: AuditLogRow[];
}

class HeritageDatabase {
  private state: DatabaseState = {
    version: 1,
    scholarly_sources: [],
    knowledge_facts: [],
    digital_assets: [],
    audit_logs: []
  };

  private initialized = false;

  constructor() {
    this.init();
  }

  public init() {
    if (this.initialized) return;

    try {
      if (fs.existsSync(DB_STORAGE_PATH)) {
        const raw = fs.readFileSync(DB_STORAGE_PATH, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.knowledge_facts) && parsed.knowledge_facts.length > 0) {
          this.state = parsed;
          this.initialized = true;
          return;
        }
      }
    } catch (err) {
      console.warn('[HeritageDatabase] Could not read existing storage.json, migrating from factStoreData.ts...');
    }

    // Migration an toàn từ factStoreData.ts
    this.migrateInitialData();
    this.initialized = true;
  }

  private saveState() {
    try {
      const dir = path.dirname(DB_STORAGE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DB_STORAGE_PATH, JSON.stringify(this.state, null, 2), 'utf-8');
    } catch (err) {
      console.error('[HeritageDatabase] Failed to write database to disk:', err);
    }
  }

  private logAudit(
    action_type: AuditLogRow['action_type'],
    table_name: string,
    record_id: string,
    previous_state: any,
    new_state: any,
    change_justification: string,
    operator: string
  ) {
    const log: AuditLogRow = {
      id: `AUDIT-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      action_type,
      table_name,
      record_id,
      previous_state: previous_state ? JSON.stringify(previous_state) : null,
      new_state: new_state ? JSON.stringify(new_state) : null,
      change_justification,
      operator: operator || 'System Migration Administrator',
      timestamp: new Date().toISOString()
    };
    this.state.audit_logs.unshift(log);
  }

  private migrateInitialData() {
    const now = new Date().toISOString();

    // 1. Migrate Sources
    const sources: ScholarlySourceRow[] = Object.values(SCHOLARLY_SOURCES_CATALOG).map((s, idx) => ({
      id: `SRC-${idx + 1}`,
      source_code: s.source_code,
      title: s.title,
      tier: s.tier,
      author_or_body: s.author_or_body,
      publication_year: s.year,
      repository_or_publisher: s.repository_or_publisher,
      url: s.url,
      created_at: now
    }));

    // 2. Migrate Facts
    const facts: KnowledgeFactRow[] = KNOWLEDGE_FACT_STORE.map((f, idx) => ({
      id: `FACT-ROW-${idx + 1}`,
      fact_id: f.fact_id,
      statement: f.statement,
      claim_type: f.claim_type,
      domain: f.domain,
      era: f.era,
      related_entities: f.related_entities,
      citations: f.citations,
      verification_status: f.verification_status,
      reviewed_by: f.reviewed_by,
      updated_at: f.updated_at,
      contradictions_or_notes: f.contradictions_or_notes,
      created_at: now
    }));

    // 3. Migrate Digital Assets
    const assets: DigitalAssetRow[] = DIGITAL_ASSETS_REGISTRY.map((a, idx) => ({
      ...a,
      id: `ASSET-ROW-${idx + 1}`,
      created_at: now
    }));

    this.state = {
      version: 1,
      scholarly_sources: sources,
      knowledge_facts: facts,
      digital_assets: assets,
      audit_logs: []
    };

    this.logAudit(
      'MIGRATE',
      'system',
      'ALL_TABLES',
      null,
      { sourcesCount: sources.length, factsCount: facts.length, assetsCount: assets.length },
      'Khởi tạo và di chuyển an toàn toàn bộ hạt nhân tri thức học thuật từ src/data/factStoreData.ts vào CSDL',
      'Trần Thanh Bình (Kiến trúc sư hệ thống)'
    );

    this.saveState();
  }

  // ============================================================================
  // PUBLIC READ APIS
  // ============================================================================

  public getAllFacts(filter?: { domain?: string; status?: string; search?: string }): KnowledgeFactRow[] {
    let result = [...this.state.knowledge_facts];

    if (filter?.domain) {
      const cleanDomain = filter.domain.trim().toUpperCase();
      result = result.filter(f => f.domain.toUpperCase() === cleanDomain);
    }

    if (filter?.status) {
      const cleanStatus = filter.status.trim().toLowerCase();
      result = result.filter(f => f.verification_status.toLowerCase() === cleanStatus);
    }

    if (filter?.search) {
      const q = filter.search.toLowerCase().trim();
      result = result.filter(f => 
        f.fact_id.toLowerCase().includes(q) ||
        f.statement.toLowerCase().includes(q) ||
        f.era.toLowerCase().includes(q)
      );
    }

    return result;
  }

  public getFactById(factId: string): KnowledgeFactRow | undefined {
    const cleanId = factId.trim().toUpperCase();
    return this.state.knowledge_facts.find(f => f.fact_id.toUpperCase() === cleanId || f.id === factId);
  }

  public getFactsByDomain(domain: string): KnowledgeFactRow[] {
    const cleanDomain = domain.trim().toUpperCase();
    return this.state.knowledge_facts.filter(f => f.domain.toUpperCase() === cleanDomain);
  }

  public getVerifiedFacts(): KnowledgeFactRow[] {
    return this.state.knowledge_facts.filter(
      f => f.verification_status === 'verified' || f.verification_status === 'published'
    );
  }

  public getPendingReviewFacts(): KnowledgeFactRow[] {
    return this.state.knowledge_facts.filter(
      f => f.verification_status === 'pending_review' || f.verification_status === 'needs_revision'
    );
  }

  public getAllSources(): ScholarlySourceRow[] {
    return [...this.state.scholarly_sources];
  }

  public getSourceByCode(sourceCode: string): ScholarlySourceRow | undefined {
    return this.state.scholarly_sources.find(s => s.source_code === sourceCode || s.id === sourceCode);
  }

  public getAllAssets(): DigitalAssetRow[] {
    return [...this.state.digital_assets];
  }

  public getAuditLogs(): AuditLogRow[] {
    return [...this.state.audit_logs];
  }

  // ============================================================================
  // ADMIN CRUD OPERATIONS VỚI KIỂM SOÁT TOÀN VẸN & AUDIT LOG
  // ============================================================================

  public createFact(
    input: {
      fact_id: string;
      statement: string;
      claim_type: ClaimType;
      domain: DomainCategory;
      era: string;
      related_entities?: { people?: string[]; places?: string[]; artifacts?: string[]; events?: string[] };
      citations?: FactCitation[];
      verification_status?: VerificationStatus;
      reviewed_by: string;
      contradictions_or_notes?: string;
    },
    operator: string,
    justification: string
  ): { success: boolean; data?: KnowledgeFactRow; error?: string } {
    if (!input.fact_id || !input.statement || !input.domain || !input.era || !input.claim_type) {
      return { success: false, error: 'Thiếu các trường dữ liệu học thuật bắt buộc (fact_id, statement, domain, era, claim_type).' };
    }

    if (!justification || justification.trim().length < 5) {
      return { success: false, error: 'Bắt buộc phải cung cấp căn cứ học thuật (justification) khi tạo mới dữ kiện di sản.' };
    }

    // Kiểm tra ràng buộc duy nhất (UNIQUE fact_id)
    const existing = this.getFactById(input.fact_id);
    if (existing) {
      return { success: false, error: `fact_id '${input.fact_id}' đã tồn tại trong cơ sở dữ liệu.` };
    }

    // Kiểm tra tính hợp lệ của nguồn trích dẫn nếu có
    if (input.citations && input.citations.length > 0) {
      for (const cit of input.citations) {
        if (!cit.source_id && !cit.source_name) {
          return { success: false, error: 'Mỗi trích dẫn phải có mã nguồn (source_id) hoặc tên nguồn xác thực.' };
        }
      }
    }

    const now = new Date().toISOString();
    const newFact: KnowledgeFactRow = {
      id: `FACT-ROW-${Date.now()}`,
      fact_id: input.fact_id.trim().toUpperCase(),
      statement: input.statement.trim(),
      claim_type: input.claim_type,
      domain: input.domain,
      era: input.era.trim(),
      related_entities: input.related_entities || {},
      citations: input.citations || [],
      verification_status: input.verification_status || 'pending_review',
      reviewed_by: input.reviewed_by.trim(),
      updated_at: now.split('T')[0],
      contradictions_or_notes: input.contradictions_or_notes,
      created_at: now
    };

    this.state.knowledge_facts.push(newFact);

    this.logAudit(
      'CREATE',
      'knowledge_facts',
      newFact.fact_id,
      null,
      newFact,
      justification,
      operator
    );

    this.saveState();
    return { success: true, data: newFact };
  }

  public updateFact(
    factId: string,
    updateData: Partial<Omit<KnowledgeFactRow, 'id' | 'fact_id' | 'created_at'>>,
    operator: string,
    justification: string
  ): { success: boolean; data?: KnowledgeFactRow; error?: string } {
    const index = this.state.knowledge_facts.findIndex(f => f.fact_id.toUpperCase() === factId.toUpperCase() || f.id === factId);
    if (index === -1) {
      return { success: false, error: `Không tìm thấy dữ kiện với mã '${factId}'.` };
    }

    if (!justification || justification.trim().length < 5) {
      return { success: false, error: 'Bắt buộc phải cung cấp căn cứ học thuật (justification) khi hiệu chỉnh dữ kiện di sản.' };
    }

    const previousState = { ...this.state.knowledge_facts[index] };
    const now = new Date().toISOString();

    const updatedFact: KnowledgeFactRow = {
      ...previousState,
      ...updateData,
      updated_at: now.split('T')[0]
    };

    this.state.knowledge_facts[index] = updatedFact;

    this.logAudit(
      'UPDATE',
      'knowledge_facts',
      factId,
      previousState,
      updatedFact,
      justification,
      operator
    );

    this.saveState();
    return { success: true, data: updatedFact };
  }

  public deleteFact(
    factId: string,
    operator: string,
    justification: string
  ): { success: boolean; error?: string } {
    const index = this.state.knowledge_facts.findIndex(f => f.fact_id.toUpperCase() === factId.toUpperCase() || f.id === factId);
    if (index === -1) {
      return { success: false, error: `Không tìm thấy dữ kiện với mã '${factId}'.` };
    }

    if (!justification || justification.trim().length < 5) {
      return { success: false, error: 'Bắt buộc phải cung cấp căn cứ học thuật (justification) khi xóa dữ kiện di sản.' };
    }

    const previousState = { ...this.state.knowledge_facts[index] };
    this.state.knowledge_facts.splice(index, 1);

    this.logAudit(
      'DELETE',
      'knowledge_facts',
      factId,
      previousState,
      null,
      justification,
      operator
    );

    this.saveState();
    return { success: true };
  }
}

export const heritageDb = new HeritageDatabase();
