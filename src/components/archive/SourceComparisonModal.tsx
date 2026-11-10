/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SOURCE COMPARISON VIEWER (VARIANT COMPARATIVE SCHOLARSHIP)
 * Phân hệ 6 - Trung tâm Tư liệu số Chuyên sâu
 */

import React, { useState } from 'react';
import {
  X,
  GitCompare,
  BookOpen,
  Calendar,
  Layers,
  ShieldCheck,
  HelpCircle,
  FileText
} from 'lucide-react';
import { SOURCE_COMPARISONS, SourceComparisonItem } from '../../data/digitalArchiveData.ts';

interface SourceComparisonModalProps {
  onClose: () => void;
}

export const SourceComparisonModal: React.FC<SourceComparisonModalProps> = ({ onClose }) => {
  const [selectedComparisonIndex, setSelectedComparisonIndex] = useState(0);
  const activeComparison: SourceComparisonItem = SOURCE_COMPARISONS[selectedComparisonIndex] || SOURCE_COMPARISONS[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 text-[#F2E8D5] animate-fadeIn">
      <div className="w-full max-w-5xl bg-[#171513] border border-[#C9A45C]/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#C9A45C]/30 bg-[#171513]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#781F25] border border-[#C9A45C]/50 flex items-center justify-center">
              <GitCompare className="w-5 h-5 text-[#C9A45C]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#493326]/60 text-[#E5C07B] border border-[#C9A45C]/30">
                  {activeComparison.repertoireCode}
                </span>
                <span className="text-xs font-mono text-[#C9A45C]">Không Gian Đối Chiếu Dị Bản Học Thuật</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-[#FFF4DB] font-display line-clamp-1 mt-0.5">
                {activeComparison.workTitle}
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

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Side-by-side Dual Variant Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Dị bản A */}
            <div className="p-5 rounded-xl bg-[#493326]/20 border border-[#C9A45C]/40 space-y-3.5 shadow-lg flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded bg-[#C9A45C] text-[#171513] text-xs font-mono font-bold">
                    DỊ BẢN A (CHÍNH SỬ VĂN HIẾN)
                  </span>
                  <span className="text-xs font-mono text-[#E5C07B]">{activeComparison.variantA.year}</span>
                </div>
                <h3 className="text-sm font-bold text-[#FFF4DB] font-display leading-snug">
                  {activeComparison.variantA.sourceName}
                </h3>
                <div className="text-[11px] font-mono text-[#F2E8D5]/60">
                  Mã: {activeComparison.variantA.sourceCode} · {activeComparison.variantA.holdingBody}
                </div>
              </div>

              {/* Trích đoạn văn bản */}
              <div className="p-3.5 rounded-lg bg-[#0D0B0A] border border-[#C9A45C]/25 text-xs space-y-1.5">
                <span className="text-[10px] font-mono text-[#C9A45C] uppercase block">Trích đoạn thư tịch gốc:</span>
                <p className="text-[#FFF4DB] font-serif leading-relaxed italic">
                  "{activeComparison.variantA.textExcerpt}"
                </p>
              </div>

              {/* Thang âm & Ký âm */}
              <div className="space-y-1 text-xs">
                <span className="text-[#C9A45C] font-mono block text-[11px]">Hệ thống ký âm & Cung bậc:</span>
                <div className="flex flex-wrap gap-1">
                  {activeComparison.variantA.pitchNotation.map((note, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-[#171513] border border-[#C9A45C]/30 text-[11px] text-[#E5C07B] font-mono">
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Biên chế */}
              <div className="text-xs border-t border-[#C9A45C]/20 pt-2 text-[#F2E8D5]/80">
                <span className="text-[#C9A45C] font-mono block text-[11px]">Biên chế tấu khúc:</span>
                <span>{activeComparison.variantA.instrumentation}</span>
              </div>
            </div>

            {/* Dị bản B */}
            <div className="p-5 rounded-xl bg-[#781F25]/20 border border-[#C9A45C]/40 space-y-3.5 shadow-lg flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded bg-[#781F25] border border-[#C9A45C]/60 text-[#FFF4DB] text-xs font-mono font-bold">
                    DỊ BẢN B (TRUYỀN KHẨU NGHỆ NHÂN)
                  </span>
                  <span className="text-xs font-mono text-[#E5C07B]">{activeComparison.variantB.year}</span>
                </div>
                <h3 className="text-sm font-bold text-[#FFF4DB] font-display leading-snug">
                  {activeComparison.variantB.sourceName}
                </h3>
                <div className="text-[11px] font-mono text-[#F2E8D5]/60">
                  Mã: {activeComparison.variantB.sourceCode} · {activeComparison.variantB.holdingBody}
                </div>
              </div>

              {/* Trích đoạn văn bản */}
              <div className="p-3.5 rounded-lg bg-[#0D0B0A] border border-[#C9A45C]/25 text-xs space-y-1.5">
                <span className="text-[10px] font-mono text-[#C9A45C] uppercase block">Bản chép tay ký âm:</span>
                <p className="text-[#FFF4DB] font-sans leading-relaxed italic">
                  "{activeComparison.variantB.textExcerpt}"
                </p>
              </div>

              {/* Thang âm & Ký âm */}
              <div className="space-y-1 text-xs">
                <span className="text-[#C9A45C] font-mono block text-[11px]">Hệ thống ký âm & Cung bậc:</span>
                <div className="flex flex-wrap gap-1">
                  {activeComparison.variantB.pitchNotation.map((note, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-[#171513] border border-[#C9A45C]/30 text-[11px] text-[#E5C07B] font-mono">
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Biên chế */}
              <div className="text-xs border-t border-[#C9A45C]/20 pt-2 text-[#F2E8D5]/80">
                <span className="text-[#C9A45C] font-mono block text-[11px]">Biên chế tấu khúc:</span>
                <span>{activeComparison.variantB.instrumentation}</span>
              </div>
            </div>
          </div>

          {/* Discrepancy Matrix Analysis */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-[#C9A45C] font-bold flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>Phân Tích Chi Tiết Các Điểm Dị Biệt Học Thuật</span>
            </h4>
            <div className="space-y-2">
              {activeComparison.discrepancyAnalysis.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg bg-[#171513] border border-[#C9A45C]/30 flex flex-col sm:flex-row sm:items-start gap-2.5 text-xs"
                >
                  <span className="px-2 py-0.5 rounded bg-[#493326]/50 border border-[#C9A45C]/40 text-[#E5C07B] font-mono font-bold shrink-0">
                    {item.type}
                  </span>
                  <span className="text-[#F2E8D5]/90 font-sans leading-relaxed">
                    {item.note}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Neutral Curatorial Assessment (No Biased Claims) */}
          <div className="p-4 rounded-xl bg-[#171513] border-2 border-[#C9A45C]/40 space-y-2 text-xs font-sans">
            <div className="text-xs font-mono uppercase text-[#C9A45C] font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Nhận Định Giám Tuyển Bảo Tàng Học Thuật (Nguyên Tắc Trung Lập)</span>
            </div>
            <p className="text-[#FFF4DB] leading-relaxed">
              {activeComparison.neutralCuratorialAssessment}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
