/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * HỒ SƠ HỌC THUẬT NGHỆ NHÂN DI SẢN (ARTISAN DOSSIER MODAL - GĐ5)
 * Tác giả: Trần Thanh Bình (MSSV: PH61165 - Lớp: D02)
 */

import React from 'react';
import { MasterArtisan } from '../../data/artisanDossierData';
import { X, Award, BookOpen, CheckCircle2, Calendar, MapPin, Music, HeartHandshake, ExternalLink } from 'lucide-react';

interface ArtisanDetailModalProps {
  artisan: MasterArtisan | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ArtisanDetailModal: React.FC<ArtisanDetailModalProps> = ({
  artisan,
  isOpen,
  onClose
}) => {
  if (!isOpen || !artisan) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#171513] border border-[#C9A45C]/50 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-[#C9A45C]/30 flex items-center justify-between bg-gradient-to-r from-[#781F25]/40 via-[#171513] to-[#493326]/30">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#C9A45C]">
              <span>HỒ SƠ BẬC THẦY NGHỆ NHÂN CỐ ĐÔ</span>
              <span>·</span>
              <span className="text-emerald-400 font-semibold">{artisan.curatorialStatus}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-[#FFF4DB] mt-0.5">
              {artisan.name} ({artisan.birthYear} – {artisan.deathYear ? artisan.deathYear : 'Hiện tại'})
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#171513] border border-[#C9A45C]/30 text-[#C9A45C] hover:bg-[#781F25] hover:text-[#FFF4DB] transition-colors cursor-pointer"
            title="Đóng hồ sơ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Top Profile Card */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 relative rounded-xl overflow-hidden border border-[#C9A45C]/40 bg-black/40 shadow-xl group">
              <img
                src={artisan.avatarUrl}
                alt={artisan.name}
                className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171513] via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-center">
                <span className="px-3 py-1 rounded-full text-xs font-serif font-bold bg-[#781F25] text-[#FFF4DB] border border-[#C9A45C]/50 shadow">
                  {artisan.officialTitle}
                </span>
              </div>
            </div>

            <div className="md:col-span-7 space-y-4">
              <div className="p-3.5 rounded-xl bg-[#493326]/30 border border-[#C9A45C]/30 space-y-1.5 text-xs">
                <div className="flex items-center gap-2 text-[#C9A45C] font-semibold">
                  <Award className="w-4 h-4" />
                  <span>Văn bản & Quyết định Phong tặng Chính thức:</span>
                </div>
                <p className="text-[#FFF4DB] leading-relaxed">
                  {artisan.titleDecisionInfo}
                </p>
              </div>

              <div className="space-y-2 text-xs leading-relaxed text-[#F2E8D5]/90">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#C9A45C]" />
                  <span><strong>Quê quán:</strong> {artisan.hometown}</span>
                </div>
                <div>
                  <strong className="text-[#C9A45C]">Nhạc cụ sở trường:</strong>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {artisan.primaryInstruments.map((inst, idx) => (
                      <span key={idx} className="px-2.5 py-0.5 rounded bg-[#171513] border border-[#C9A45C]/30 text-[#FFF4DB] text-[11px]">
                        {inst}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <strong className="text-[#C9A45C]">Ngón đàn độc môn & Kỹ thuật diễn tấu:</strong>
                  <p className="mt-0.5 text-stone-300">{artisan.musicalSpecialty}</p>
                </div>
              </div>
            </div>
          </div>

          {/* UNESCO Dossier Contribution */}
          <div className="p-5 rounded-xl bg-[#781F25]/20 border border-[#C9A45C]/40 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-[#E5C07B] font-bold uppercase tracking-wider text-sm">
              <HeartHandshake className="w-4 h-4 text-[#C9A45C]" />
              <span>Đóng góp Cốt lõi cho Hồ sơ Đệ trình UNESCO (2003):</span>
            </div>
            <p className="text-[#F2E8D5]/90 leading-relaxed font-sans">
              {artisan.unescoContribution}
            </p>
          </div>

          {/* Biography & Teaching Legacy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#171513] border border-[#C9A45C]/30 space-y-2">
              <strong className="text-[#E5C07B] uppercase tracking-wider block">Tiểu sử & Cuộc đời gắn bó Di sản:</strong>
              <p className="text-[#F2E8D5]/80 leading-relaxed">{artisan.biography}</p>
            </div>
            <div className="p-4 rounded-xl bg-[#171513] border border-[#C9A45C]/30 space-y-2">
              <strong className="text-[#E5C07B] uppercase tracking-wider block">Sứ mệnh Truyền dạy & Di sản cho thế hệ sau:</strong>
              <p className="text-[#F2E8D5]/80 leading-relaxed">{artisan.teachingLegacy}</p>
            </div>
          </div>

          {/* Verified Scholarly Bibliography & Press Sources */}
          <div className="p-4 rounded-xl bg-[#493326]/20 border border-[#C9A45C]/30 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>Tài liệu & Nguồn kiểm chứng chính thức (Verified Sources):</span>
            </div>
            <div className="space-y-2">
              {artisan.verifiedSources.map((src, i) => (
                <div key={i} className="flex items-start justify-between gap-3 p-2 rounded bg-[#171513] border border-[#C9A45C]/15 text-xs">
                  <div>
                    <span className="text-[#FFF4DB] font-semibold">{src.title}</span>
                    <div className="text-[11px] text-[#F2E8D5]/60 mt-0.5">
                      {src.publisher} · Năm {src.year}
                    </div>
                  </div>
                  <span className="font-mono text-[10px] text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded shrink-0">
                    Đã kiểm chứng
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
