/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * ARCHIVE ADMIN UPLOAD & INGEST MODAL
 * Quản trị tư liệu số - Giai đoạn 3: Phân quyền, Siêu dữ liệu & Vết kiểm toán
 */

import React, { useState } from 'react';
import {
  X,
  Upload,
  CheckCircle2,
  AlertCircle,
  FileText,
  Shield,
  Layers,
  Sparkles
} from 'lucide-react';

interface ArchiveAdminUploadModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export const ArchiveAdminUploadModal: React.FC<ArchiveAdminUploadModalProps> = ({
  onClose,
  onSuccess
}) => {
  const [assetType, setAssetType] = useState<'image' | 'audio' | 'video' | 'manuscript'>('manuscript');
  const [title, setTitle] = useState('');
  const [code, setCode] = useState(`HMC-NEW-${Date.now().toString().slice(-4)}`);
  const [provenance, setProvenance] = useState<string>('Ảnh tư liệu thật');
  const [institution, setInstitution] = useState('Bảo tàng Cổ vật Cung đình Huế (Số 3 Lê Trực)');
  const [author, setAuthor] = useState('');
  const [license, setLicense] = useState('Công bố phi thương mại phục vụ nghiên cứu di sản');
  const [justification, setJustification] = useState('');
  const [operator, setOperator] = useState('Trần Thanh Bình (Quản trị viên kho lưu trữ)');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !justification.trim()) {
      setErrorMessage('Vui lòng nhập đầy đủ tiêu đề tư liệu và căn cứ học thuật (justification).');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const payload = {
        asset_id: code,
        asset_name: title.trim(),
        asset_type: assetType,
        provenance_category: provenance,
        file_path: `/src/assets/archive/${code.toLowerCase()}.jpg`,
        source_institution: institution.trim(),
        author_or_creator: author.trim() || undefined,
        license: license.trim(),
        verification_status: 'pending_review',
        operator,
        change_justification: justification.trim()
      };

      const res = await fetch('/api/archive/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Lỗi khi nhập liệu tư liệu số');
      }

      setSuccessMessage('Tư liệu số đã được tiếp nhận, lập mã chỉ mục và lưu vết kiểm toán thành công.');
      if (onSuccess) onSuccess();
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 text-[#F2E8D5] animate-fadeIn">
      <div className="w-full max-w-2xl bg-[#171513] border border-[#C9A45C]/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#C9A45C]/30 bg-[#171513]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#781F25] border border-[#C9A45C]/50 flex items-center justify-center">
              <Upload className="w-4 h-4 text-[#C9A45C]" />
            </div>
            <div>
              <span className="text-xs font-mono text-[#C9A45C]">Phân Hệ Quản Trị Lưu Trữ (CMS Ingest)</span>
              <h2 className="text-base sm:text-lg font-bold text-[#FFF4DB] font-display">
                Tiếp Nhận & Đăng Ký Tư Liệu Di Sản Mới
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#493326]/40 hover:bg-[#781F25] text-[#F2E8D5]/80 hover:text-white border border-[#C9A45C]/30 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto text-xs font-sans">
          {errorMessage && (
            <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/50 text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[#C9A45C] font-mono block mb-1 font-bold">Loại Tư Liệu Số:</label>
              <select
                value={assetType}
                onChange={(e) => setAssetType(e.target.value as any)}
                className="w-full px-3 py-2 rounded bg-[#0D0B0A] border border-[#C9A45C]/30 text-[#FFF4DB] focus:outline-none focus:border-[#C9A45C]"
              >
                <option value="manuscript">Văn bản / Thư tịch cổ Hán Nôm</option>
                <option value="image">Hình ảnh hiện vật cổ độ phân giải cao</option>
                <option value="audio">Bản thu âm thanh Nhã nhạc</option>
                <option value="video">Video diễn xướng / Nghi lễ</option>
              </select>
            </div>

            <div>
              <label className="text-[#C9A45C] font-mono block mb-1 font-bold">Mã Lưu Trữ Số (PID/URN):</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-3 py-2 rounded bg-[#0D0B0A] border border-[#C9A45C]/30 text-[#FFF4DB] font-mono focus:outline-none focus:border-[#C9A45C]"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-[#C9A45C] font-mono block mb-1 font-bold">Tiêu Đề Tư Liệu (Tên Văn Bản / Hiện Vật):</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="VD: Khâm Định Đại Nam Hội Điển Sự Lệ – Bản chép tay..."
              className="w-full px-3 py-2 rounded bg-[#0D0B0A] border border-[#C9A45C]/30 text-[#FFF4DB] focus:outline-none focus:border-[#C9A45C]"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[#C9A45C] font-mono block mb-1 font-bold">Nguồn Gốc Bản Quyền:</label>
              <select
                value={provenance}
                onChange={(e) => setProvenance(e.target.value)}
                className="w-full px-3 py-2 rounded bg-[#0D0B0A] border border-[#C9A45C]/30 text-[#FFF4DB] focus:outline-none focus:border-[#C9A45C]"
              >
                <option value="Ảnh tư liệu thật">Ảnh tư liệu thật (Bảo tàng / Viện lưu trữ)</option>
                <option value="Ảnh phục dựng">Ảnh phục dựng số học thuật</option>
                <option value="Bản ghi âm gốc">Bản ghi âm gốc (Điền dã / Mẫu mực)</option>
                <option value="Âm thanh phục dựng">Âm thanh phục dựng</option>
                <option value="Video tư liệu">Video tư liệu</option>
              </select>
            </div>

            <div>
              <label className="text-[#C9A45C] font-mono block mb-1 font-bold">Đơn Vị Quản Lý / Lưu Trữ:</label>
              <input
                type="text"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                className="w-full px-3 py-2 rounded bg-[#0D0B0A] border border-[#C9A45C]/30 text-[#FFF4DB] focus:outline-none focus:border-[#C9A45C]"
                required
              />
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-[#493326]/20 border border-[#C9A45C]/30 space-y-3">
            <div>
              <label className="text-[#C9A45C] font-mono block mb-1 font-bold">Người Thực Hiện Thao Tác (Audit Operator):</label>
              <input
                type="text"
                value={operator}
                onChange={(e) => setOperator(e.target.value)}
                className="w-full px-3 py-1.5 rounded bg-[#171513] border border-[#C9A45C]/30 text-[#FFF4DB] focus:outline-none focus:border-[#C9A45C]"
                required
              />
            </div>

            <div>
              <label className="text-[#C9A45C] font-mono block mb-1 font-bold">Căn Cứ Học Thuật & Lý Do Tiếp Nhận (Justification):</label>
              <textarea
                rows={2}
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
                placeholder="Nêu rõ văn bản hoặc quyết định bàn giao tư liệu..."
                className="w-full px-3 py-1.5 rounded bg-[#171513] border border-[#C9A45C]/30 text-[#FFF4DB] focus:outline-none focus:border-[#C9A45C]"
                required
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border border-[#C9A45C]/30 hover:bg-[#493326]/40 text-[#F2E8D5]/80 cursor-pointer"
            >
              Hủy Bỏ
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded bg-[#781F25] hover:bg-[#A32A32] text-[#FFF4DB] border border-[#C9A45C]/50 font-bold transition-all shadow-lg flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Upload className="w-4 h-4" />
              <span>{isSubmitting ? 'Đang Tiếp Nhận...' : 'Xác Nhận & Ghi Vết Audit'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
