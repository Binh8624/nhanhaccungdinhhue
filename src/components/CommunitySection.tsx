import React, { useState } from 'react';
import { Users2, HeartHandshake, AlertCircle, Quote, Sparkles } from 'lucide-react';
import { COMMUNITY_SUBJECTS, CommunitySubject } from '../data/heritageData';

export const CommunitySection: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<CommunitySubject>(COMMUNITY_SUBJECTS[0]);

  return (
    <section id="chu-the" className="py-20 bg-[#171513] text-[#F2E8D5] border-b border-[#C9A45C]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#C9A45C] mb-3">
            <Users2 className="w-4 h-4 text-[#C9A45C]" />
            <span>Chuyên mục VI · Con Người & Sự Kế Thừa</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-[#F2E8D5] tracking-tight">
            CỘNG ĐỒNG CHỦ THỂ DI SẢN
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#C9A45C] to-transparent mx-auto mt-4" />
          <p className="mt-4 text-base text-[#F2E8D5]/80 font-sans leading-relaxed">
            Nhã nhạc sống được qua hàng thế kỷ là nhờ sự tận hiến của những bậc nghệ nhân tiền bối, bàn tay tài hoa của người thợ chế tác và ngọn lửa đam mê của thế hệ trẻ hôm nay.
          </p>
        </div>

        {/* 4 Group Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {COMMUNITY_SUBJECTS.map((subj) => {
            const isSelected = selectedSubject.id === subj.id;
            return (
              <button
                key={subj.id}
                onClick={() => setSelectedSubject(subj)}
                className={`p-4 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#781F25]/40 border-[#C9A45C] shadow-lg shadow-[#781F25]/20 scale-102'
                    : 'bg-[#493326]/10 border-[#C9A45C]/20 hover:border-[#C9A45C]/50 hover:bg-[#493326]/20'
                }`}
              >
                <div>
                  <div className="text-[11px] font-mono text-[#C9A45C] uppercase tracking-wider mb-1">
                    Chủ thể di sản
                  </div>
                  <div className="text-base font-display font-bold text-[#F2E8D5] leading-snug">
                    {subj.groupName}
                  </div>
                </div>
                <div className="mt-4 pt-2 border-t border-[#493326]/40 text-xs text-[#E5C07B] font-medium flex items-center justify-between">
                  <span>Khám phá vai trò</span>
                  <span>{isSelected ? '●' : '→'}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Curatorial Deep Story Layout for Selected Community Subject */}
        <div className="bg-[#171513] border border-[#C9A45C]/40 rounded-lg overflow-hidden shadow-2xl p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Authentic Portrait or Workshop Visual */}
            <div className="lg:col-span-5 relative rounded-lg overflow-hidden border border-[#C9A45C]/40 shadow-xl">
              <img
                src={selectedSubject.image}
                alt={selectedSubject.groupName}
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171513] via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-xs font-serif italic text-[#E5C07B]">
                Tư liệu: Chân dung và không gian thực hành của chủ thể di sản Nhã nhạc Cung đình Huế.
              </div>
            </div>

            {/* Right: Narrative, Activities, Challenges */}
            <div className="lg:col-span-7 space-y-5 font-sans">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#C9A45C]">
                  Hồ sơ chủ thể di sản
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#FFF4DB] mt-1">
                  {selectedSubject.groupName}
                </h3>
                <p className="text-sm text-[#E5C07B] font-medium mt-1">
                  {selectedSubject.role}
                </p>
              </div>

              {/* Real Representative Figures */}
              <div className="p-4 rounded border border-[#C9A45C]/20 bg-[#493326]/20">
                <div className="text-xs font-semibold uppercase tracking-widest text-[#C9A45C] mb-2 flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4 text-[#C9A45C]" />
                  <span>Đại diện tiêu biểu có căn cứ xác thực:</span>
                </div>
                <ul className="space-y-1.5 text-xs sm:text-sm text-[#F2E8D5]/90">
                  {selectedSubject.representativeFigures.map((fig, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#C9A45C] mt-0.5">•</span>
                      <span>{fig}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Story & Quote */}
              <div className="p-4 rounded border border-[#C9A45C]/30 bg-[#781F25]/20 relative">
                <Quote className="w-6 h-6 text-[#C9A45C]/30 absolute top-2 right-2 pointer-events-none" />
                <div className="text-xs font-semibold uppercase tracking-widest text-[#C9A45C] mb-1">
                  Câu chuyện thực hành & Tấm lòng với di sản
                </div>
                <p className="text-xs sm:text-sm text-[#F2E8D5]/90 italic leading-relaxed">
                  {selectedSubject.story}
                </p>
              </div>

              {/* Challenges Grid */}
              <div className="p-4 rounded border border-amber-900/40 bg-amber-950/20">
                <div className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-1 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  <span>Khó khăn & Thách thức trong việc kế thừa:</span>
                </div>
                <p className="text-xs text-[#F2E8D5]/80 leading-relaxed">
                  {selectedSubject.challenges}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
