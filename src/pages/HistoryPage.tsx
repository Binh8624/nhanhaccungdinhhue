import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from '../components/Breadcrumb';
import { History, Calendar, CheckCircle2, Award, ExternalLink, ArrowRight } from 'lucide-react';
import { HISTORY_TIMELINE, HistoryMilestone } from '../data/heritageData';

export const HistoryPage: React.FC = () => {
  const [activeEraIndex, setActiveEraIndex] = useState<number>(3); // Triều Nguyễn mặc định
  const activeMilestone: HistoryMilestone = HISTORY_TIMELINE[activeEraIndex];

  return (
    <div className="bg-[#171513] text-[#F2E8D5] min-h-screen py-6">
      <Breadcrumb items={[{ label: 'Lịch sử' }]} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs font-mono uppercase tracking-widest text-[#C9A45C] mb-2">
            Chuyên trang Biên niên Sử Di sản
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-display text-[#FFF4DB]">
            DÒNG CHẢY LỊCH SỬ NGHÌN NĂM
          </h1>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#C9A45C] to-transparent mx-auto mt-4" />
          <p className="mt-4 text-sm sm:text-base text-[#F2E8D5]/80 font-sans leading-relaxed">
            Hành trình kế thừa và trao truyền âm vang thiêng liêng qua các triều đại phong kiến, từ thuở Thăng Long nghìn năm đến đỉnh cao vàng son chốn Cố đô Huế.
          </p>
        </div>

        {/* Timeline Navigation Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {HISTORY_TIMELINE.map((item, idx) => {
            const isActive = idx === activeEraIndex;
            return (
              <button
                key={idx}
                onClick={() => setActiveEraIndex(idx)}
                className={`p-3.5 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-gradient-to-b from-[#781F25] to-[#493326] border-[#C9A45C] shadow-lg shadow-[#781F25]/20 scale-102 font-medium'
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

        {/* Selected Era Detail View */}
        <div className="bg-[#171513] border border-[#C9A45C]/40 rounded-lg p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#781F25]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Summary & Significance */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-[#C9A45C]/30 bg-[#493326]/30 text-xs text-[#E5C07B] font-mono">
                <Calendar className="w-3.5 h-3.5 text-[#C9A45C]" />
                <span>Giai đoạn: {activeMilestone.era}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#E5C07B] leading-tight">
                {activeMilestone.title}
              </h2>

              <p className="text-sm sm:text-base text-[#F2E8D5]/90 leading-relaxed font-sans">
                {activeMilestone.summary} <sup className="text-[#C9A45C] font-mono">[9]</sup>
              </p>

              <div className="p-4 rounded border border-[#C9A45C]/30 bg-[#781F25]/20 mt-4">
                <div className="text-xs uppercase tracking-widest text-[#C9A45C] font-semibold mb-1">
                  Ý nghĩa lịch sử cốt lõi
                </div>
                <p className="text-xs sm:text-sm text-[#F2E8D5]/90 font-sans italic">
                  “{activeMilestone.significance}”
                </p>
              </div>

              {/* Related historic image */}
              <div className="rounded border border-[#C9A45C]/30 overflow-hidden mt-4">
                <img
                  src={
                    activeMilestone.dynastyBadge === 'Triều Nguyễn'
                      ? '/src/assets/images/duyet_thi_duong_theater_1793928493481.jpg'
                      : activeMilestone.dynastyBadge === 'UNESCO'
                      ? '/src/assets/images/hero_nha_nhac_hue_1793928492915.jpg'
                      : '/src/assets/images/royal_instruments_still_life_1793928495633.jpg'
                  }
                  alt={activeMilestone.title}
                  className="w-full h-44 object-cover"
                />
              </div>
            </div>

            {/* Right: Key Milestones & Historical Events */}
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs uppercase tracking-widest text-[#C9A45C] font-semibold flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-[#C9A45C]" />
                <span>Những mốc sự kiện & Biến đổi lịch sử chính:</span>
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

              {activeMilestone.dynastyBadge === 'UNESCO' && (
                <div className="mt-4 p-5 rounded border border-[#C9A45C]/60 bg-gradient-to-r from-[#781F25]/40 to-[#493326]/40 flex items-center gap-3">
                  <Award className="w-8 h-8 text-[#C9A45C] shrink-0" />
                  <div className="text-xs sm:text-sm text-[#F2E8D5]/90 font-sans leading-relaxed">
                    <strong>Mốc son thế giới:</strong> Ngày 7/11/2003, Tổng Giám đốc UNESCO Koichiro Matsuura tuyên bố Nhã nhạc cung đình Huế là Kiệt tác di sản thế giới tại Paris (Pháp). Đến năm 2008, di sản chính thức được ghi danh vào Danh sách đại diện <sup className="text-[#C9A45C] font-mono">[1]</sup>.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* References Footer Box */}
        <div className="bg-[#12100e] border border-[#C9A45C]/30 p-6 rounded-lg text-xs font-sans">
          <div className="text-xs font-mono uppercase tracking-widest text-[#C9A45C] mb-2">
            Tư liệu tham khảo cho chuyên trang Lịch sử:
          </div>
          <p className="text-[#F2E8D5]/70 mb-3">
            Thông tin các triều đại dựa trên <em>Khâm Định Đại Nam Hội Điển Sự Lệ</em> <sup className="text-[#C9A45C] font-mono">[9]</sup>, công trình nghiên cứu của Cố GS.TS Trần Văn Khê <sup className="text-[#C9A45C] font-mono">[10]</sup>, và hồ sơ khoa học đệ trình UNESCO <sup className="text-[#C9A45C] font-mono">[1]</sup>.
          </p>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#493326]/40">
            <Link to="/nguon-tham-khao" className="text-[#C9A45C] hover:text-[#E5C07B] flex items-center gap-1 font-semibold">
              <span>Xem danh mục 10 nguồn tài liệu đầy đủ</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <Link to="/nhac-cu" className="text-[#E5C07B] hover:underline flex items-center gap-1">
              <span>Tiếp theo: Khám phá Thư viện Nhạc cụ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};
