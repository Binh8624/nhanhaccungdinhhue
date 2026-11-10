import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from '../components/Breadcrumb';
import { Theater, Sparkles, Shirt, Users, BookOpen, ExternalLink, ArrowRight, Play } from 'lucide-react';
import { PERFORMANCE_FORMS, PerformanceForm } from '../data/heritageData';

export const PerformancesPage: React.FC = () => {
  const [selectedPerformance, setSelectedPerformance] = useState<PerformanceForm>(PERFORMANCE_FORMS[0]);

  return (
    <div className="bg-[#171513] text-[#F2E8D5] min-h-screen py-6">
      <Breadcrumb items={[{ label: 'Loại hình Biểu diễn' }]} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs font-mono uppercase tracking-widest text-[#C9A45C] mb-2">
            Chuyên trang Diễn xướng & Nghi thức Cung đình
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-display text-[#FFF4DB]">
            CÁC LOẠI HÌNH BIỂU DIỄN
          </h1>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#C9A45C] to-transparent mx-auto mt-4" />
          <p className="mt-4 text-sm sm:text-base text-[#F2E8D5]/80 font-sans leading-relaxed">
            Sự phối hợp nghiêm cẩn giữa nhạc lễ, vũ đạo cung đình và trang phục gấm lụa ngũ sắc tạo nên không gian nghi lễ uy quyền và linh thiêng của hoàng triều <sup className="text-[#C9A45C] font-mono">[5]</sup>.
          </p>
        </div>

        {/* Master-Detail Interactive Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form list */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-[#C9A45C] mb-2 px-1">
              Danh mục thể loại tiêu biểu
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

          {/* Right Column: Full Detail Card */}
          <div className="lg:col-span-7 bg-[#171513] border border-[#C9A45C]/40 rounded-lg overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="relative h-64 sm:h-72 rounded-lg overflow-hidden border border-[#C9A45C]/30">
              <img
                src={selectedPerformance.image}
                alt={selectedPerformance.title}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded border border-[#C9A45C]/20 bg-[#493326]/15">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C9A45C] mb-1.5">
                  <BookOpen className="w-4 h-4 text-[#C9A45C]" />
                  <span>Bối cảnh diễn xướng</span>
                </div>
                <p className="text-xs text-[#F2E8D5]/85 leading-relaxed font-sans">
                  {selectedPerformance.context} <sup className="text-[#C9A45C] font-mono">[9]</sup>
                </p>
              </div>

              <div className="p-4 rounded border border-[#C9A45C]/20 bg-[#493326]/15">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C9A45C] mb-1.5">
                  <Shirt className="w-4 h-4 text-[#C9A45C]" />
                  <span>Trang phục & Mão mũ</span>
                </div>
                <p className="text-xs text-[#F2E8D5]/85 leading-relaxed font-sans">
                  {selectedPerformance.costume} <sup className="text-[#C9A45C] font-mono">[5]</sup>
                </p>
              </div>
            </div>

            <div className="space-y-4 font-sans text-xs sm:text-sm">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C9A45C] mb-1">
                  <Users className="w-4 h-4 text-[#C9A45C]" />
                  <span>Đội hình & Bố trí nhạc công</span>
                </div>
                <p className="text-[#F2E8D5]/90 leading-relaxed">
                  {selectedPerformance.formation}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C9A45C] mb-1">
                  <Sparkles className="w-4 h-4 text-[#C9A45C]" />
                  <span>Ý nghĩa triết lý biểu trưng</span>
                </div>
                <p className="text-[#F2E8D5]/90 leading-relaxed">
                  {selectedPerformance.meaning}
                </p>
              </div>

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

        {/* References Footer Box */}
        <div className="bg-[#12100e] border border-[#C9A45C]/30 p-6 rounded-lg text-xs font-sans">
          <div className="text-xs font-mono uppercase tracking-widest text-[#C9A45C] mb-2">
            Tư liệu tham khảo cho chuyên trang Biểu diễn:
          </div>
          <p className="text-[#F2E8D5]/70 mb-3">
            Nội dung y phục và dàn nhạc được đối chiếu theo tư liệu Nhà hát Nghệ thuật Truyền thống Cung đình Huế <sup className="text-[#C9A45C] font-mono">[5]</sup> và quy chế tế tự triều Nguyễn <sup className="text-[#C9A45C] font-mono">[9]</sup>.
          </p>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#493326]/40">
            <Link to="/nguon-tham-khao" className="text-[#C9A45C] hover:text-[#E5C07B] flex items-center gap-1 font-semibold">
              <span>Xem danh mục 10 nguồn tài liệu đầy đủ</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <Link to="/dia-ban" className="text-[#E5C07B] hover:underline flex items-center gap-1">
              <span>Tiếp theo: Khám phá Địa bàn Di sản tại Huế</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};
