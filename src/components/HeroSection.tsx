import React from 'react';
import { ArrowDown, Music2, Sparkles, BookOpen, Volume2 } from 'lucide-react';
import { HERITAGE_STATISTICS } from '../data/heritageData';

interface HeroSectionProps {
  onExploreClick: () => void;
  onAudioClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick, onAudioClick }) => {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden border-b border-[#C9A45C]/30 bg-[#171513]">
      {/* Background Image with Measured Royal Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_nha_nhac_hue_1793928492915.jpg"
          alt="Nhã nhạc Cung đình Huế biểu diễn trước lầu điện Hoàng thành"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
        />
        {/* Measured dark gradient overlay to ensure WCAG AA text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#171513] via-[#171513]/70 to-[#171513]/40" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#171513]/30 to-[#171513]/80" />
      </div>

      {/* Decorative Royal Corner Motifs */}
      <div className="absolute top-6 left-6 z-10 w-16 h-16 border-t-2 border-l-2 border-[#C9A45C]/40 pointer-events-none hidden md:block" />
      <div className="absolute top-6 right-6 z-10 w-16 h-16 border-t-2 border-r-2 border-[#C9A45C]/40 pointer-events-none hidden md:block" />

      {/* Hero Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 flex-1 flex flex-col justify-center items-center text-center">
        {/* Subtle royal kicker */}
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded border border-[#C9A45C]/40 bg-[#781F25]/60 backdrop-blur-md text-[#E5C07B] text-xs font-semibold tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
          <span>Kiệt tác Di sản Phi vật thể Đại diện của Nhân loại · UNESCO</span>
        </div>

        {/* Primary Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-b from-[#FFF4DB] via-[#F2E8D5] to-[#C9A45C] tracking-tight max-w-5xl leading-tight">
          NHÃ NHẠC CUNG ĐÌNH HUẾ
        </h1>

        {/* Slogan */}
        <p className="mt-4 text-xl sm:text-2xl md:text-3xl font-display italic text-[#E5C07B] tracking-wide">
          “Âm vang nghìn năm – Hồn thiêng cố đô”
        </p>

        {/* Short introduction */}
        <p className="mt-6 text-base sm:text-lg text-[#F2E8D5]/90 max-w-3xl font-sans leading-relaxed text-balance">
          Đỉnh cao của nền âm nhạc bác học cổ truyền Việt Nam, kết tinh qua các triều đại phong kiến và tỏa sáng rực rỡ nhất dưới triều Nguyễn. Nơi tiếng chuông, tiếng khánh, tiếng kèn bầu hòa quyện cùng non sông, đất trời chốn Cố đô di sản.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onExploreClick}
            className="flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-[#171513] bg-gradient-to-r from-[#C9A45C] to-[#E5C07B] hover:brightness-110 active:scale-95 transition-all rounded shadow-lg cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-[#171513]" />
            <span>Khám phá Di sản</span>
          </button>

          <button
            onClick={onAudioClick}
            className="flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-[#F2E8D5] bg-[#781F25]/85 hover:bg-[#781F25] border border-[#C9A45C]/50 active:scale-95 transition-all rounded shadow-lg cursor-pointer"
          >
            <Volume2 className="w-4 h-4 text-[#C9A45C]" />
            <span>Trải nghiệm Âm thanh</span>
          </button>
        </div>

        {/* Scroll indicator */}
        <a
          href="#gioi-thieu"
          className="mt-12 inline-flex flex-col items-center gap-1.5 text-xs text-[#C9A45C]/80 hover:text-[#C9A45C] transition-colors"
        >
          <span className="tracking-widest uppercase font-mono text-[11px]">Cuộn để khám phá</span>
          <ArrowDown className="w-4 h-4 animate-bounce text-[#C9A45C]" />
        </a>
      </div>

      {/* Verified Statistics Strip */}
      <div className="relative z-10 w-full border-t border-[#C9A45C]/30 bg-[#171513]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
            {HERITAGE_STATISTICS.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="font-display text-2xl sm:text-3xl font-bold text-[#E5C07B] tabular-nums">
                  {stat.value}
                </span>
                <span className="text-xs font-semibold text-[#F2E8D5] mt-0.5 tracking-wide">
                  {stat.label}
                </span>
                <span className="text-[11px] text-[#F2E8D5]/60 mt-0.5">
                  {stat.sublabel}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
