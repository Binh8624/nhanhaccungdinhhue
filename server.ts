/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * FULL-STACK EXPRESS SERVER - GIAI ĐOẠN 2: DATABASE VÀ BACKEND CORE
 * Dự án: Bảo tàng Di sản số Học thuật – Nhã nhạc Cung đình Huế
 * Tác giả: Trần Thanh Bình (MSSV: PH61165 - Lớp: D02)
 * 
 * Cung cấp:
 * 1. RESTful API cho Knowledge Fact-Store (GET, POST, PUT, DELETE)
 * 2. API Sources, Assets, và Audit Logs
 * 3. Proxy Server-side Gemini API (không để lộ API Key ở frontend)
 * 4. Tích hợp Vite Middlewares chế độ dev trên port 3000
 */

import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { heritageDb } from './src/server/db/database.ts';
import { GoogleGenAI } from '@google/genai';
import {
  DIGITAL_MANUSCRIPTS,
  HIGH_RES_ARTIFACTS,
  AUDIO_ARCHIVE_ITEMS,
  VIDEO_ARCHIVE_ITEMS,
  SOURCE_COMPARISONS
} from './src/data/digitalArchiveData.ts';
import {
  PENTATONIC_DEGREES,
  MUSICAL_MODES,
  TRADITIONAL_SCORES_LIBRARY,
  INITIAL_USER_TRANSCRIPTIONS
} from './src/data/musicTheoryData.ts';
import { MASTER_ARTISANS_DATA } from './src/data/artisanDossierData.ts';
import { HERITAGE_SITES } from './src/data/heritageData.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  // Middleware chuẩn hóa
  app.use(express.json());

  // Đảm bảo CSDL được khởi tạo và migrate dữ liệu
  heritageDb.init();

  // ============================================================================
  // RESTFUL API ENDPOINTS: GIAI ĐOẠN 2 - DATABASE VÀ BACKEND CORE
  // ============================================================================

  // 1. Health Check
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'UP',
      system: 'Academic Digital Heritage Museum - Royal Court Music of Hue',
      curator: 'Trần Thanh Bình (PH61165 - D02)',
      location: 'Thành phố Huế, Việt Nam',
      timestamp: new Date().toISOString()
    });
  });

  // 2. GET /api/facts (Lọc theo domain, status, từ khóa tìm kiếm)
  app.get('/api/facts', (req: Request, res: Response) => {
    try {
      const { domain, status, q } = req.query;
      const facts = heritageDb.getAllFacts({
        domain: domain ? String(domain) : undefined,
        status: status ? String(status) : undefined,
        search: q ? String(q) : undefined
      });
      res.json({
        total: facts.length,
        data: facts
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Lỗi truy vấn danh sách dữ kiện di sản: ' + err.message });
    }
  });

  // 3. GET /api/facts/verified (Danh sách dữ kiện đã xác minh học thuật)
  app.get('/api/facts/verified', (_req: Request, res: Response) => {
    try {
      const facts = heritageDb.getVerifiedFacts();
      res.json({
        total: facts.length,
        status: 'verified_or_published',
        data: facts
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Lỗi truy vấn dữ kiện xác minh: ' + err.message });
    }
  });

  // 4. GET /api/facts/pending-review (Danh sách dữ kiện đang chờ thẩm định)
  app.get('/api/facts/pending-review', (_req: Request, res: Response) => {
    try {
      const facts = heritageDb.getPendingReviewFacts();
      res.json({
        total: facts.length,
        status: 'pending_review_or_needs_revision',
        data: facts
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Lỗi truy vấn dữ kiện chờ thẩm định: ' + err.message });
    }
  });

  // 5. GET /api/facts/domain/:domain (Lọc theo phân loại chủ đề)
  app.get('/api/facts/domain/:domain', (req: Request, res: Response) => {
    try {
      const { domain } = req.params;
      const facts = heritageDb.getFactsByDomain(domain);
      res.json({
        domain,
        total: facts.length,
        data: facts
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Lỗi truy vấn dữ kiện theo chủ đề: ' + err.message });
    }
  });

  // 6. GET /api/facts/:id (Chi tiết một dữ kiện học thuật theo fact_id)
  app.get('/api/facts/:id', (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const fact = heritageDb.getFactById(id);
      if (!fact) {
        return res.status(404).json({ error: `Không tìm thấy dữ kiện với mã định danh '${id}'.` });
      }
      res.json(fact);
    } catch (err: any) {
      res.status(500).json({ error: 'Lỗi truy vấn chi tiết dữ kiện: ' + err.message });
    }
  });

  // 7. GET /api/sources (Danh mục toàn bộ nguồn thư tịch và nghiên cứu)
  app.get('/api/sources', (_req: Request, res: Response) => {
    try {
      const sources = heritageDb.getAllSources();
      res.json({
        total: sources.length,
        data: sources
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Lỗi truy vấn nguồn tham khảo: ' + err.message });
    }
  });

  // 8. GET /api/assets (Danh bạ tài sản số hóa ảnh, audio, 3D, bản thảo)
  app.get('/api/assets', (_req: Request, res: Response) => {
    try {
      const assets = heritageDb.getAllAssets();
      res.json({
        total: assets.length,
        data: assets
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Lỗi truy vấn tài sản số hóa: ' + err.message });
    }
  });

  // ============================================================================
  // GIAI ĐOẠN 3: TRUNG TÂM TƯ LIỆU SỐ CHUYÊN SÂU & IIIF PRESENTATION API 3.0
  // ============================================================================

  // 9. GET /api/archive/manuscripts (Danh mục bản thảo Hán Nôm & Thư tịch cổ)
  app.get('/api/archive/manuscripts', (_req: Request, res: Response) => {
    res.json({
      total: DIGITAL_MANUSCRIPTS.length,
      data: DIGITAL_MANUSCRIPTS
    });
  });

  // 10. GET /api/archive/manuscripts/:id (Chi tiết một bản thảo Hán Nôm)
  app.get('/api/archive/manuscripts/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const mss = DIGITAL_MANUSCRIPTS.find((m) => m.id === id || m.code === id);
    if (!mss) {
      return res.status(404).json({ error: `Không tìm thấy bản thảo '${id}'.` });
    }
    res.json(mss);
  });

  // 11. GET /api/archive/iiif/:id/manifest.json (IIIF Presentation API 3.0 Manifest chuẩn quốc tế)
  app.get('/api/archive/iiif/:id/manifest.json', (req: Request, res: Response) => {
    const { id } = req.params;
    const mss = DIGITAL_MANUSCRIPTS.find((m) => m.id === id || m.code === id);
    if (!mss) {
      return res.status(404).json({ error: `Không tìm thấy manifest cho '${id}'.` });
    }

    const host = req.get('host') || 'localhost:3000';
    const protocol = req.protocol;
    const baseUrl = `${protocol}://${host}`;

    const manifest = {
      '@context': 'http://iiif.io/api/presentation/3/context.json',
      id: `${baseUrl}/api/archive/iiif/${mss.id}/manifest.json`,
      type: 'Manifest',
      label: { vi: [mss.title] },
      metadata: [
        { label: { vi: ['Tiêu đề chữ Hán'] }, value: { vi: [mss.originalTitle] } },
        { label: { vi: ['Niên đại'] }, value: { vi: [mss.year] } },
        { label: { vi: ['Thời kỳ'] }, value: { vi: [mss.era] } },
        { label: { vi: ['Đơn vị lưu trữ'] }, value: { vi: [mss.holdingRepository] } },
        { label: { vi: ['Dữ kiện kiểm chứng liên kết'] }, value: { vi: [mss.citationFactId] } },
        { label: { vi: ['Bản quyền'] }, value: { vi: [mss.rights] } }
      ],
      rights: 'http://creativecommons.org/licenses/by-nc-nd/4.0/',
      requiredStatement: {
        label: { vi: ['Quy kết bản quyền'] },
        value: { vi: ['Bảo tàng Cổ vật Cung đình Huế & Trung tâm Lưu trữ Quốc gia I'] }
      },
      items: mss.pages.map((p, idx) => ({
        id: `${baseUrl}/api/archive/iiif/${mss.id}/canvas/p${p.pageNumber}`,
        type: 'Canvas',
        label: { vi: [p.label] },
        height: p.height,
        width: p.width,
        items: [
          {
            id: `${baseUrl}/api/archive/iiif/${mss.id}/page/p${p.pageNumber}/annotationpage`,
            type: 'AnnotationPage',
            items: [
              {
                id: `${baseUrl}/api/archive/iiif/${mss.id}/annotation/p${p.pageNumber}-image`,
                type: 'Annotation',
                motivation: 'painting',
                body: {
                  id: `${baseUrl}${p.imageUrl}`,
                  type: 'Image',
                  format: 'image/jpeg',
                  height: p.height,
                  width: p.width
                },
                target: `${baseUrl}/api/archive/iiif/${mss.id}/canvas/p${p.pageNumber}`
              }
            ]
          }
        ]
      }))
    };

    res.setHeader('Content-Type', 'application/ld+json;profile="http://iiif.io/api/presentation/3/context.json"');
    res.json(manifest);
  });

  // 12. GET /api/archive/high-res-images (Bộ sưu tập ảnh hiện vật độ phân giải cao có annotations)
  app.get('/api/archive/high-res-images', (_req: Request, res: Response) => {
    res.json({
      total: HIGH_RES_ARTIFACTS.length,
      data: HIGH_RES_ARTIFACTS
    });
  });

  // 13. GET /api/archive/audio (Kho bản thu âm thanh mẫu mực & điền dã)
  app.get('/api/archive/audio', (_req: Request, res: Response) => {
    res.json({
      total: AUDIO_ARCHIVE_ITEMS.length,
      data: AUDIO_ARCHIVE_ITEMS
    });
  });

  // 14. GET /api/archive/video (Kho video nghi lễ & phim tư liệu)
  app.get('/api/archive/video', (_req: Request, res: Response) => {
    res.json({
      total: VIDEO_ARCHIVE_ITEMS.length,
      data: VIDEO_ARCHIVE_ITEMS
    });
  });

  // 15. GET /api/archive/comparisons (Danh mục đối chiếu dị bản học thuật)
  app.get('/api/archive/comparisons', (_req: Request, res: Response) => {
    res.json({
      total: SOURCE_COMPARISONS.length,
      data: SOURCE_COMPARISONS
    });
  });

  // 16. POST /api/archive/upload (Tiếp nhận tư liệu số mới có kiểm toán)
  app.post('/api/archive/upload', (req: Request, res: Response) => {
    try {
      const {
        asset_id,
        asset_name,
        asset_type,
        provenance_category,
        file_path,
        source_institution,
        author_or_creator,
        license,
        verification_status,
        operator,
        change_justification
      } = req.body;

      if (!asset_id || !asset_name || !change_justification) {
        return res.status(400).json({ error: 'Thiếu trường bắt buộc (asset_id, asset_name, change_justification).' });
      }

      // Ghi nhận trực tiếp vào state CSDL
      const now = new Date().toISOString();
      heritageDb['state'].digital_assets.push({
        id: `ASSET-ROW-${Date.now()}`,
        asset_id,
        asset_name,
        asset_type: asset_type || 'manuscript',
        provenance_category: provenance_category || 'Ảnh tư liệu thật',
        file_path: file_path || `/src/assets/archive/${asset_id.toLowerCase()}.jpg`,
        source_institution: source_institution || 'Bảo tàng Cổ vật Cung đình Huế',
        author_or_creator,
        license: license || 'Giấy phép bảo tồn nghiên cứu',
        verification_status: verification_status || 'pending_review',
        created_at: now
      });

      heritageDb['logAudit'](
        'CREATE',
        'digital_assets',
        asset_id,
        null,
        { asset_id, asset_name, provenance_category },
        change_justification,
        operator || 'Administrator'
      );

      heritageDb['saveState']();

      res.status(201).json({
        message: 'Tiếp nhận tư liệu số thành công và đã ghi vết kiểm toán hệ thống.',
        asset_id
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Lỗi tiếp nhận tư liệu: ' + err.message });
    }
  });

  // ============================================================================
  // GIAI ĐOẠN 4: RESTFUL API CHO MUSIC RESEARCH STUDIO
  // ============================================================================

  // Bộ nhớ đệm danh sách bản ký âm người dùng
  const userTranscriptions = [...INITIAL_USER_TRANSCRIPTIONS];

  // 17. GET /api/music/degrees (7 bậc âm ngũ cung & biến âm)
  app.get('/api/music/degrees', (_req: Request, res: Response) => {
    res.json({
      total: PENTATONIC_DEGREES.length,
      data: PENTATONIC_DEGREES
    });
  });

  // 18. GET /api/music/modes (Cấu trúc Điệu Khách & Điệu Nam)
  app.get('/api/music/modes', (_req: Request, res: Response) => {
    res.json({
      total: MUSICAL_MODES.length,
      data: MUSICAL_MODES
    });
  });

  // 19. GET /api/music/scores (Thư viện bài bản Mười Bản Ngự & Đăng Đàn Cung)
  app.get('/api/music/scores', (_req: Request, res: Response) => {
    res.json({
      total: TRADITIONAL_SCORES_LIBRARY.length,
      data: TRADITIONAL_SCORES_LIBRARY
    });
  });

  // 20. GET /api/music/transcriptions (Danh sách bản ký âm nghiên cứu)
  app.get('/api/music/transcriptions', (_req: Request, res: Response) => {
    res.json({
      total: userTranscriptions.length,
      data: userTranscriptions
    });
  });

  // 21. POST /api/music/transcriptions (Lưu bản ký âm mới có kiểm toán)
  app.post('/api/music/transcriptions', (req: Request, res: Response) => {
    try {
      const {
        title,
        repertoireRef,
        baseHoPitch,
        modeType,
        notesSequence,
        transcriber,
        notesJustification
      } = req.body;

      if (!title || !notesSequence || !Array.isArray(notesSequence) || notesSequence.length === 0) {
        return res.status(400).json({ error: 'Vui lòng cung cấp tiêu đề và chuỗi nốt ký âm hợp lệ.' });
      }

      const newId = `trans-${Date.now()}`;
      const now = new Date().toISOString();
      const newRecord = {
        id: newId,
        title,
        repertoireRef: repertoireRef || 'custom',
        baseHoPitch: baseHoPitch || 'F',
        modeType: modeType || 'Điệu Khách (Hơi Bắc)',
        notesSequence,
        transcriber: transcriber || 'Nhà nghiên cứu Di sản',
        notesJustification: notesJustification || 'Ký âm khảo sát thực nghiệm tại Music Research Studio',
        createdAt: now,
        updatedAt: now
      };

      userTranscriptions.unshift(newRecord);

      heritageDb['logAudit'](
        'CREATE',
        'user_transcriptions',
        newId,
        null,
        { id: newId, title, totalNotes: notesSequence.length },
        notesJustification || 'Lưu bản ký âm thực nghiệm mới',
        transcriber || 'Music Researcher'
      );

      res.status(201).json({
        message: 'Lưu bản ký âm thành công và đã ghi vết kiểm toán học thuật.',
        data: newRecord
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Lỗi lưu bản ký âm: ' + err.message });
    }
  });

  // 22. POST /api/music/ai-assistant (Trợ lý AI chuyên sâu về Âm luật & Ngũ cung)
  app.post('/api/music/ai-assistant', async (req: Request, res: Response) => {
    const { question, currentContext } = req.body;
    if (!question) {
      return res.status(400).json({ error: 'Vui lòng nhập câu hỏi nghiên cứu âm luật.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const musicFacts = heritageDb.getFactsByDomain('ÂM LUẬT & NGŨ CUNG');
    const factsSummary = musicFacts.map((f) => `[${f.fact_id}]: ${f.statement}`).join('\n');

    if (!apiKey) {
      // Phản hồi học thuật có kiểm chứng nếu không có API key
      return res.json({
        answer: `Theo nghiên cứu của GS.TS Trần Văn Khê và hồ sơ UNESCO, hệ thống âm luật Nhã nhạc Huế xây dựng trên thang âm ngũ cung (Hò, Xự, Xang, Xê, Cống). Đặc trưng lớn nhất là nốt Hò không có cao độ tuyệt đối mà dịch chuyển theo loại kèn và phong cách hòa tấu. Điệu Khách mang tính hùng tráng, nghiêm cẩn với các cung bậc chuẩn; trong khi Điệu Nam lại biến hóa vi âm tinh tế với "Xự non" (chùng ngón ~160 cents) và "Xang già" (nhấn ngón cao hơn ~540 cents), tạo nên sắc thái ai oán đặc thù Cố đô.`,
        citations: ['FACT-LAW-001 (Âm luật ngũ cung)', 'FACT-LAW-002 (Điệu Khách và Điệu Nam)', 'Khâm Định Quyển 96 (1851)'],
        source: 'curated'
      });
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `Bạn là Chuyên gia Nghiên cứu Âm luật Cung đình Huế (Music Research Specialist) thuộc Bảo tàng Di sản số Nhã nhạc Cung đình Huế.
Tác giả: Trần Thanh Bình - PH61165 - D02. Địa bàn: Thành phố Huế, Việt Nam.
NGUYÊN TẮC HỌC THUẬT BẮT BUỘC:
1. Trả lời dựa trên các dữ kiện âm luật đã được xác minh:
${factsSummary}
2. Tuyệt đối KHÔNG gán ép nốt Hò vào một cao độ tuyệt đối phương Tây (như A440) mà giải thích tính tương đối của nốt Hò theo truyền thống.
3. Luôn phân tích rõ ràng sự khác biệt giữa Điệu Khách (Hơi Bắc) và Điệu Nam (Nam Xuân, Nam Ai) về vi âm và ngón rung/nhấn.
4. Trích dẫn nguồn nghiên cứu rõ ràng: GS.TS Trần Văn Khê, Khâm Định Đại Nam Hội Điển Sự Lệ, Hồ sơ UNESCO.
5. Nếu câu hỏi liên quan đến bối cảnh hiện tại của người dùng: ${JSON.stringify(currentContext || {})}, hãy tích hợp lời khuyên ký âm thực tế.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: question,
        config: {
          systemInstruction,
          temperature: 0.2
        }
      });

      res.json({
        answer: response.text || 'Tư liệu âm luật hiện tại đang được tra cứu và thẩm định.',
        citations: ['FACT-LAW-001', 'FACT-LAW-002', 'Công trình nghiên cứu GS.TS Trần Văn Khê'],
        source: 'ai_rag'
      });
    } catch (err: any) {
      console.error('[Music AI Assistant Error]:', err.message);
      res.json({
        answer: `Hệ thống phân tích âm luật: Điệu Khách chuộng tính cương trực của thang âm ngũ cung tự nhiên, thích hợp Đại triều và Tế Nam Giao. Điệu Nam chuộng ngón nhấn rung vi âm, phù hợp Lễ Tế Miếu và dạ yến sâu lắng.`,
        citations: ['FACT-LAW-001', 'FACT-LAW-002'],
        source: 'curated'
      });
    }
  });

  // ============================================================================
  // GIAI ĐOẠN 5: RESTFUL API HOÀN THIỆN BẢO TÀNG SỐ & KIỂM ĐỊNH HỌC THUẬT
  // ============================================================================

  // 23. GET /api/heritage/artisans (Hồ sơ học thuật các nghệ nhân di sản)
  app.get('/api/heritage/artisans', (_req: Request, res: Response) => {
    res.json({
      total: MASTER_ARTISANS_DATA.length,
      data: MASTER_ARTISANS_DATA
    });
  });

  // 24. GET /api/heritage/artisans/:id (Chi tiết một nghệ nhân)
  app.get('/api/heritage/artisans/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const artisan = MASTER_ARTISANS_DATA.find((a) => a.id === id);
    if (!artisan) {
      return res.status(404).json({ error: `Không tìm thấy hồ sơ nghệ nhân '${id}'.` });
    }
    res.json(artisan);
  });

  // 25. GET /api/heritage/sites/geo (Tọa độ GPS trắc địa & tình trạng bảo tồn 5 di tích)
  app.get('/api/heritage/sites/geo', (_req: Request, res: Response) => {
    const geoSites = HERITAGE_SITES.map((s) => ({
      id: s.id,
      name: s.name,
      location: s.location,
      gps: s.gpsCoordinates,
      googleMapsUrl: s.googleMapsUrl,
      builtYear: s.builtYear,
      conservationDossier: s.conservationDossier
    }));
    res.json({
      total: geoSites.length,
      data: geoSites
    });
  });

  // 26. GET /api/heritage/exhibitions (Danh mục chuyên đề triển lãm số)
  app.get('/api/heritage/exhibitions', (_req: Request, res: Response) => {
    res.json({
      theme: 'Âm Vang Cố Đô: Từ Điển Chế Hoàng Triều Đến Di Sản Nhân Loại',
      curator: 'Trần Thanh Bình (PH61165 - D02)',
      institution: 'Bảo tàng Cổ vật Cung đình Huế (Điện Long An)',
      exhibitsCount: 3,
      verifiedStandards: ['IIIF Presentation 3.0', 'Deep Zoom OSD', 'CIDOC CRM ISO 21127', 'CC-BY-NC-ND 4.0']
    });
  });

  // ============================================================================
  // ADMIN CRUD CHO DỮ KIỆN HỌC THUẬT (KÈM GHI VẾT AUDIT LOG BẮT BUỘC)
  // ============================================================================

  // 9. POST /api/facts (Tạo mới dữ kiện di sản)
  app.post('/api/facts', (req: Request, res: Response) => {
    try {
      const {
        fact_id,
        statement,
        claim_type,
        domain,
        era,
        related_entities,
        citations,
        verification_status,
        reviewed_by,
        contradictions_or_notes,
        operator,
        change_justification
      } = req.body;

      const result = heritageDb.createFact(
        {
          fact_id,
          statement,
          claim_type,
          domain,
          era,
          related_entities,
          citations,
          verification_status,
          reviewed_by: reviewed_by || 'Ban Giám tuyển Bảo tàng Di sản Cố đô',
          contradictions_or_notes
        },
        operator || 'Administrator',
        change_justification || 'Thêm dữ kiện nghiên cứu mới vào kho tri thức'
      );

      if (!result.success) {
        return res.status(400).json({ error: result.error });
      }

      res.status(201).json({
        message: 'Tạo mới dữ kiện học thuật thành công và đã ghi vết kiểm toán.',
        data: result.data
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Lỗi khi tạo mới dữ kiện: ' + err.message });
    }
  });

  // 10. PUT /api/facts/:id (Cập nhật dữ kiện di sản)
  app.put('/api/facts/:id', (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { operator, change_justification, ...updateFields } = req.body;

      const result = heritageDb.updateFact(
        id,
        updateFields,
        operator || 'Administrator',
        change_justification || 'Hiệu chỉnh nội dung học thuật có căn cứ'
      );

      if (!result.success) {
        return res.status(400).json({ error: result.error });
      }

      res.json({
        message: 'Cập nhật dữ kiện học thuật thành công và đã ghi vết kiểm toán.',
        data: result.data
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Lỗi khi cập nhật dữ kiện: ' + err.message });
    }
  });

  // 11. DELETE /api/facts/:id (Xóa dữ kiện di sản)
  app.delete('/api/facts/:id', (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { operator, change_justification } = req.body;

      const result = heritageDb.deleteFact(
        id,
        operator || 'Administrator',
        change_justification || 'Thu hồi dữ kiện học thuật theo quyết định Hội đồng'
      );

      if (!result.success) {
        return res.status(400).json({ error: result.error });
      }

      res.json({
        message: `Xóa dữ kiện '${id}' thành công và đã ghi nhận vào nhật ký kiểm toán.`,
        success: true
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Lỗi khi xóa dữ kiện: ' + err.message });
    }
  });

  // 12. GET /api/admin/audit-logs (Nhật ký kiểm toán hệ thống)
  app.get('/api/admin/audit-logs', (_req: Request, res: Response) => {
    try {
      const logs = heritageDb.getAuditLogs();
      res.json({
        total: logs.length,
        data: logs
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Lỗi truy vấn nhật ký kiểm toán: ' + err.message });
    }
  });

  // ============================================================================
  // SERVER-SIDE GEMINI RAG PROXY: KHÔNG ĐỂ LỘ API KEY Ở CLIENT
  // ============================================================================
  app.post('/api/gemini/chat', async (req: Request, res: Response) => {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Vui lòng cung cấp câu hỏi (prompt).' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Fallback tri thức có căn cứ
      return res.json({
        text: 'Hệ thống đang hoạt động ở chế độ Học thuật Cục bộ. Nhã nhạc cung đình Huế được UNESCO công nhận là Kiệt tác Di sản Truyền khẩu và Phi vật thể của Nhân loại vào ngày 07/11/2003, ghi danh chính thức năm 2008.',
        citations: ['Hồ sơ UNESCO Nha Nhac RL/00074 [1]', 'Khâm Định Đại Nam Hội Điển Sự Lệ [9]'],
        source: 'curated'
      });
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const verifiedFacts = heritageDb.getVerifiedFacts();
      const factsContext = verifiedFacts.slice(0, 8).map(f => `[Mã: ${f.fact_id}]: ${f.statement}`).join('\n\n');

      const systemInstruction = `Bạn là Trợ lý Thuyết minh Di sản Học thuật của Bảo tàng Di sản số Nhã nhạc Cung đình Huế (Tác giả: Trần Thanh Bình - PH61165 - D02).
Địa bàn trọng tâm: Thành phố Huế, Việt Nam.
NGUYÊN TẮC BẮT BUỘC:
1. Chỉ trả lời dựa trên các dữ kiện lịch sử đã kiểm chứng được cung cấp bên dưới.
2. Tuyệt đối không bịa đặt nguồn, không suy diễn niên đại, không gán danh hiệu chưa có văn bản.
3. Luôn đính kèm tên nguồn tham khảo sau câu trả lời (UNESCO 2003/2008, Khâm Định Đại Nam Hội Điển Sự Lệ, Đại Nam Thực Lục, Cố GS.TS Trần Văn Khê).
4. Nếu tư liệu không đủ, phải nói rõ: "Tư liệu hiện có chưa đủ căn cứ để xác minh nội dung này".

TẬP DỮ KIỆN KIỂM CHỨNG:
${factsContext}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.2
        }
      });

      const responseText = response.text || 'Tư liệu hiện có chưa đủ để xác minh chi tiết này.';
      res.json({
        text: responseText,
        citations: ['Kho Dữ kiện Học thuật Cố đô Huế (Knowledge Fact-Store) [1]'],
        source: 'api'
      });
    } catch (err: any) {
      console.error('[Gemini API Proxy Error]:', err.message);
      res.json({
        text: 'Nhã nhạc cung đình Huế là đỉnh cao âm nhạc bác học triều Nguyễn (1802-1945), được định chế quy củ qua hai dàn Đại Nhạc và Tiểu Nhạc, vinh danh thế giới vào năm 2003.',
        citations: ['Hồ sơ UNESCO RL/00074 [1]', 'Trung tâm Bảo tồn Di tích Cố đô Huế [4]'],
        source: 'curated'
      });
    }
  });

  // ============================================================================
  // TÍCH HỢP VITE MIDDLEWARES CHẾ ĐỘ DEV / PRODUCTION
  // ============================================================================
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Academic Digital Museum] Full-stack Server running at http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('[Failed to start Full-stack server]:', err);
});
