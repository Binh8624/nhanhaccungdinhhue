/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * CLIENT API SERVICE - GIAI ĐOẠN 2: DATABASE VÀ BACKEND CORE
 * Dự án: Bảo tàng Di sản số Học thuật – Nhã nhạc Cung đình Huế
 * Tác giả: Trần Thanh Bình (MSSV: PH61165 - Lớp: D02)
 * 
 * Kết nối tới Backend RESTful API (/api/*) với cơ chế fallback tự động về
 * Knowledge Fact-Store tĩnh nếu gặp sự cố mạng, bảo đảm 100% tính sẵn sàng.
 */

import {
  KnowledgeFact,
  SCHOLARLY_SOURCES_CATALOG,
  KNOWLEDGE_FACT_STORE,
  DIGITAL_ASSETS_REGISTRY,
  getFactsByDomain as localGetFactsByDomain,
  getFactById as localGetFactById,
  getVerifiedFacts as localGetVerifiedFacts,
  getFactsNeedingReview as localGetPendingFacts
} from '../data/factStoreData.ts';

const API_BASE = '/api';

export interface ApiFactsResponse {
  total: number;
  data: KnowledgeFact[];
}

export const heritageApiService = {
  /**
   * Lấy danh sách tất cả các dữ kiện (có thể lọc theo domain, status, tìm kiếm)
   */
  async getAllFacts(params?: { domain?: string; status?: string; q?: string }): Promise<KnowledgeFact[]> {
    try {
      const query = new URLSearchParams();
      if (params?.domain) query.append('domain', params.domain);
      if (params?.status) query.append('status', params.status);
      if (params?.q) query.append('q', params.q);

      const res = await fetch(`${API_BASE}/facts?${query.toString()}`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data: ApiFactsResponse = await res.json();
      return data.data;
    } catch (err) {
      console.warn('[heritageApiService] Fallback to local factStoreData for getAllFacts:', err);
      let local = [...KNOWLEDGE_FACT_STORE];
      if (params?.domain) {
        local = local.filter(f => f.domain.toLowerCase() === params.domain?.toLowerCase());
      }
      if (params?.status) {
        local = local.filter(f => f.verification_status.toLowerCase() === params.status?.toLowerCase());
      }
      if (params?.q) {
        const q = params.q.toLowerCase();
        local = local.filter(f => f.statement.toLowerCase().includes(q) || f.fact_id.toLowerCase().includes(q));
      }
      return local;
    }
  },

  /**
   * Lấy chi tiết một dữ kiện theo fact_id
   */
  async getFactById(factId: string): Promise<KnowledgeFact | undefined> {
    try {
      const res = await fetch(`${API_BASE}/facts/${encodeURIComponent(factId)}`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn(`[heritageApiService] Fallback to local factStoreData for ${factId}:`, err);
      return localGetFactById(factId);
    }
  },

  /**
   * Lấy các dữ kiện đã xác minh học thuật
   */
  async getVerifiedFacts(): Promise<KnowledgeFact[]> {
    try {
      const res = await fetch(`${API_BASE}/facts/verified`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data: ApiFactsResponse = await res.json();
      return data.data;
    } catch (err) {
      console.warn('[heritageApiService] Fallback to local verified facts:', err);
      return localGetVerifiedFacts();
    }
  },

  /**
   * Lấy các dữ kiện đang chờ thẩm định / cần sửa
   */
  async getPendingReviewFacts(): Promise<KnowledgeFact[]> {
    try {
      const res = await fetch(`${API_BASE}/facts/pending-review`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data: ApiFactsResponse = await res.json();
      return data.data;
    } catch (err) {
      console.warn('[heritageApiService] Fallback to local pending facts:', err);
      return localGetPendingFacts();
    }
  },

  /**
   * Lấy dữ kiện theo phân loại chủ đề (Domain)
   */
  async getFactsByDomain(domain: string): Promise<KnowledgeFact[]> {
    try {
      const res = await fetch(`${API_BASE}/facts/domain/${encodeURIComponent(domain)}`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data: ApiFactsResponse = await res.json();
      return data.data;
    } catch (err) {
      console.warn(`[heritageApiService] Fallback to local domain facts for ${domain}:`, err);
      return localGetFactsByDomain(domain as any);
    }
  },

  /**
   * Lấy danh mục nguồn tham khảo học thuật
   */
  async getAllSources(): Promise<any[]> {
    try {
      const res = await fetch(`${API_BASE}/sources`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn('[heritageApiService] Fallback to local sources catalog:', err);
      return Object.values(SCHOLARLY_SOURCES_CATALOG);
    }
  },

  /**
   * Lấy danh mục tài sản số hóa (ảnh, audio, 3d)
   */
  async getAllAssets(): Promise<any[]> {
    try {
      const res = await fetch(`${API_BASE}/assets`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn('[heritageApiService] Fallback to local digital assets:', err);
      return DIGITAL_ASSETS_REGISTRY;
    }
  },

  /**
   * Admin CRUD: Tạo mới dữ kiện
   */
  async createAdminFact(factData: Partial<KnowledgeFact>, operator: string, justification: string) {
    const res = await fetch(`${API_BASE}/facts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...factData, operator, change_justification: justification })
    });
    return await res.json();
  },

  /**
   * Admin CRUD: Cập nhật dữ kiện
   */
  async updateAdminFact(factId: string, updateData: Partial<KnowledgeFact>, operator: string, justification: string) {
    const res = await fetch(`${API_BASE}/facts/${encodeURIComponent(factId)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...updateData, operator, change_justification: justification })
    });
    return await res.json();
  },

  /**
   * Admin CRUD: Xóa dữ kiện
   */
  async deleteAdminFact(factId: string, operator: string, justification: string) {
    const res = await fetch(`${API_BASE}/facts/${encodeURIComponent(factId)}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ operator, change_justification: justification })
    });
    return await res.json();
  },

  /**
   * Lấy nhật ký kiểm toán hệ thống
   */
  async getAuditLogs(): Promise<any[]> {
    try {
      const res = await fetch(`${API_BASE}/admin/audit-logs`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn('[heritageApiService] Could not fetch audit logs:', err);
      return [];
    }
  },

  /**
   * Giai đoạn 3: Lấy danh mục bản thảo Hán Nôm
   */
  async getManuscripts(): Promise<any[]> {
    try {
      const res = await fetch(`${API_BASE}/archive/manuscripts`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn('[heritageApiService] Fallback manuscripts:', err);
      return [];
    }
  },

  /**
   * Giai đoạn 3: Lấy IIIF Presentation 3.0 manifest
   */
  async getIIIFManifest(manuscriptId: string): Promise<any> {
    const res = await fetch(`${API_BASE}/archive/iiif/${encodeURIComponent(manuscriptId)}/manifest.json`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  },

  /**
   * Giai đoạn 3: Lấy danh mục bản thu âm thanh
   */
  async getArchiveAudio(): Promise<any[]> {
    try {
      const res = await fetch(`${API_BASE}/archive/audio`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn('[heritageApiService] Fallback audio:', err);
      return [];
    }
  },

  /**
   * Giai đoạn 3: Lấy danh mục video nghi lễ
   */
  async getArchiveVideo(): Promise<any[]> {
    try {
      const res = await fetch(`${API_BASE}/archive/video`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn('[heritageApiService] Fallback video:', err);
      return [];
    }
  },

  /**
   * Giai đoạn 3: Lấy danh mục đối chiếu dị bản
   */
  async getSourceComparisons(): Promise<any[]> {
    try {
      const res = await fetch(`${API_BASE}/archive/comparisons`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn('[heritageApiService] Fallback comparisons:', err);
      return [];
    }
  }
};
