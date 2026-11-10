import React, { useState } from 'react';
import { History, Calendar, CheckCircle2, Award } from 'lucide-react';
import { HISTORY_TIMELINE, HistoryMilestone } from '../data/heritageData';

export const HistoryTimeline: React.FC = () => {
  const [activeEraIndex, setActiveEraIndex] = useState<number>(3); // Default to Nguyen Dynasty (peak)
  const activeMilestone: HistoryMilestone = HISTORY_TIMELINE[activeEraIndex];

  return (
    <section id="lich-su" className="py-20 bg-[#171513] text-[#F2E8D5] border-b border-[#C9A45C]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#C9A45C] mb-3">
            <History className="w-4 h-4 text-[#C9A45C]" />
            <span>Chuyên mục IV · Dòng Chảy Nghìn Năm</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-[#F2E8D5] tracking-tight">
            LỊCH SỬ HÌNH THÀNH & PHÁT TRIỂN
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#C9A45C] to-transparent mx-auto mt-4" />
          <p className="mt-4 text-base text-[#F2E8D5]/80 font-sans leading-relaxed">
            Hành trình nghìn năm gìn giữ và trao truyền âm vang thiêng liêng của vương triều qua bao thăng trầm lịch sử dân tộc.
          </p>
        </div>

        {/* Horizontal Timeline Rail (Adheres to §3 Pattern E) */}
        <div className="relative mb-12">
          {/* Subtle guide line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-[#493326]/60 -translate-y-1/2 z-0" />

          {/* Stepper buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 relative z-10">
            {HISTORY_TIMELINE.map((item, idx) => {
              const isActive = idx === activeEraIndex;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveEraIndex(idx)}
                  className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'bg-gradient-to-b from-[#781F25] to-[#493326] border-[#C9A45C] shadow-lg shadow-[#781F25]/20 scale-105'
                      : 'bg-[#171513] border-[#C9A45C]/20 hover:border-[#C9A45C]/50 hover:bg-[#493326]/20'
                  }`}
                >
                  <div className="text-[11px] font-mono text-[#C9A45C]">
                    {item.timeRange}
                  </div>
                  <div className="text-xs font-display font-bold text-[#F2E8D5] mt-1 line-clamp-1">
                    {item.dynastyBadge}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Era Deep Dive Card */}
        <div className="bg-[#171513] border border-[#C9A45C]/40 rounded-lg p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Ornamental Accent */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#781F25]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Header & Summary */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-[#C9A45C]/30 bg-[#493326]/30 text-xs text-[#E5C07B] font-mono">
                <Calendar className="w-3.5 h-3.5 text-[#C9A45C]" />
                <span>Thời kỳ: {activeMilestone.era}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#E5C07B] leading-tight">
                {activeMilestone.title}
              </h3>

              <p className="text-sm sm:text-base text-[#F2E8D5]/90 leading-relaxed font-sans">
                {activeMilestone.summary}
              </p>

              <div className="p-4 rounded border border-[#C9A45C]/30 bg-[#781F25]/20 mt-4">
                <div className="text-xs uppercase tracking-widest text-[#C9A45C] font-semibold mb-1">
                  Ý nghĩa lịch sử cốt lõi
                </div>
                <p className="text-xs sm:text-sm text-[#F2E8D5]/90 font-sans italic">
                  “{activeMilestone.significance}”
                </p>
              </div>
            </div>

            {/* Right: Key Events List */}
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs uppercase tracking-widest text-[#C9A45C] font-semibold flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-[#C9A45C]" />
                <span>Những mốc sự kiện & Thành tựu nổi bật</span>
              </div>

              <div className="space-y-3">
                {activeMilestone.keyEvents.map((evt, i) => (
                  <div
                    key={i}
                    className="p-4 rounded border border-[#C9A45C]/20 bg-[#493326]/10 flex items-start gap-3 hover:border-[#C9A45C]/40 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#C9A45C]/20 border border-[#C9A45C]/40 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-mono font-bold text-[#C9A45C]">{i + 1}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#F2E8D5]/85 leading-relaxed font-sans">
                      {evt}
                    </p>
                  </div>
                ))}
              </div>

              {/* Special highlight if UNESCO era */}
              {activeMilestone.dynastyBadge === 'UNESCO' && (
                <div className="mt-4 p-4 rounded border border-[#C9A45C]/60 bg-gradient-to-r from-[#781F25]/40 to-[#493326]/40 flex items-center gap-3">
                  <Award className="w-8 h-8 text-[#C9A45C] shrink-0" />
                  <div className="text-xs text-[#F2E8D5]/90 font-sans leading-relaxed">
                    <strong>Tầm vóc nhân loại:</strong> Đây là di sản phi vật thể đầu tiên của Việt Nam được thế giới ghi danh, mở đầu cho kỷ nguyên vinh danh các giá trị truyền thống Việt Nam trên bản đồ di sản văn hóa nhân loại.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
