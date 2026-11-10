import React, { useState } from 'react';
import { Theater, Sparkles, Shirt, Users, BookOpen } from 'lucide-react';
import { PERFORMANCE_FORMS, PerformanceForm } from '../data/heritageData';

export const PerformancesSection: React.FC = () => {
  const [selectedPerformance, setSelectedPerformance] = useState<PerformanceForm>(PERFORMANCE_FORMS[0]);

  return (
    <section id="bieu-dien" className="py-20 bg-[#171513] text-[#F2E8D5] border-b border-[#C9A45C]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#C9A45C] mb-3">
            <Theater className="w-4 h-4 text-[#C9A45C]" />
            <span>Chuyên mục III · Diễn Xướng & Lễ Nghi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-[#F2E8D5] tracking-tight">
            CÁC HÌNH THỨC TRÌNH DIỄN CUNG ĐÌNH
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#C9A45C] to-transparent mx-auto mt-4" />
          <p className="mt-4 text-base text-[#F2E8D5]/80 font-sans leading-relaxed">
            Sự kết hợp hoàn hảo giữa âm nhạc, vũ đạo cung đình và trang phục hoàng gia tạo nên không gian nghệ thuật tổng thể mang tính lễ nghi thiêng liêng và quyền quý.
          </p>
        </div>

        {/* Interactive Master-Detail Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: List of Performance Forms */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-[#C9A45C] mb-2 px-1">
              Danh mục loại hình tiêu biểu
            </div>
            {PERFORMANCE_FORMS.map((form) => {
              const isSelected = selectedPerformance.id === form.id;
              return (
                <button
                  key={form.id}
                  onClick={() => setSelectedPerformance(form)}
                  className={`w-full text-left p-4 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#781F25]/40 border-[#C9A45C] shadow-md shadow-[#C9A45C]/10 translate-x-1'
                      : 'bg-[#493326]/10 border-[#C9A45C]/20 hover:border-[#C9A45C]/50 hover:bg-[#493326]/20'
                  }`}
                >
                  <div>
                    <div className="text-[11px] font-mono text-[#C9A45C]">
                      {form.category}
                    </div>
                    <div className="text-base font-display font-bold text-[#F2E8D5] mt-0.5">
                      {form.title}
                    </div>
                    <div className="text-xs text-[#F2E8D5]/60 mt-1 line-clamp-1">
                      {form.meaning}
                    </div>
                  </div>
                  <div className={`text-lg transition-transform ${isSelected ? 'text-[#C9A45C] translate-x-1' : 'text-[#F2E8D5]/30'}`}>
                    →
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Full Curatorial Detail View */}
          <div className="lg:col-span-7 bg-[#171513] border border-[#C9A45C]/40 rounded-lg overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6">
            {/* Focal Visual Slot */}
            <div className="relative h-64 sm:h-72 rounded-lg overflow-hidden border border-[#C9A45C]/30">
              <img
                src={selectedPerformance.image}
                alt={selectedPerformance.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171513] via-[#171513]/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-xs font-mono uppercase tracking-widest text-[#E5C07B]">
                  {selectedPerformance.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#FFF4DB] mt-1">
                  {selectedPerformance.title}
                </h3>
              </div>
            </div>

            {/* Comprehensive Detail Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Context Block */}
              <div className="p-4 rounded border border-[#C9A45C]/20 bg-[#493326]/15">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C9A45C] mb-1.5">
                  <BookOpen className="w-4 h-4 text-[#C9A45C]" />
                  <span>Bối cảnh diễn xướng</span>
                </div>
                <p className="text-xs text-[#F2E8D5]/85 leading-relaxed font-sans">
                  {selectedPerformance.context}
                </p>
              </div>

              {/* Costume Block */}
              <div className="p-4 rounded border border-[#C9A45C]/20 bg-[#493326]/15">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C9A45C] mb-1.5">
                  <Shirt className="w-4 h-4 text-[#C9A45C]" />
                  <span>Trang phục & Mão mão</span>
                </div>
                <p className="text-xs text-[#F2E8D5]/85 leading-relaxed font-sans">
                  {selectedPerformance.costume}
                </p>
              </div>
            </div>

            {/* Formation & Meaning */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C9A45C] mb-1">
                  <Users className="w-4 h-4 text-[#C9A45C]" />
                  <span>Đội hình & Bố trí nhạc công</span>
                </div>
                <p className="text-xs sm:text-sm text-[#F2E8D5]/90 leading-relaxed font-sans">
                  {selectedPerformance.formation}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C9A45C] mb-1">
                  <Sparkles className="w-4 h-4 text-[#C9A45C]" />
                  <span>Ý nghĩa triết lý biểu trưng</span>
                </div>
                <p className="text-xs sm:text-sm text-[#F2E8D5]/90 leading-relaxed font-sans">
                  {selectedPerformance.meaning}
                </p>
              </div>

              {/* Instruments in use */}
              <div className="pt-3 border-t border-[#493326]/40">
                <div className="text-xs font-semibold uppercase tracking-widest text-[#C9A45C] mb-2">
                  Nhạc khí chủ đạo sử dụng:
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedPerformance.instrumentsUsed.map((inst, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-xs font-medium rounded border border-[#C9A45C]/30 bg-[#781F25]/20 text-[#E5C07B]"
                    >
                      {inst}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
