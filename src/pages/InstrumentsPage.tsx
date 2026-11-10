import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from '../components/Breadcrumb';
import {
  Volume2,
  X,
  Music,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  BookOpen,
  Clock,
  Ruler,
  MapPin,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { INSTRUMENTS_DATA, Instrument } from '../data/heritageData';
import { courtAudioEngine } from '../utils/audioEngine';
import { MusicResearchStudioModal } from '../components/studio/MusicResearchStudioModal';
import { InstrumentDetailModal } from '../components/museum/InstrumentDetailModal';

export const InstrumentsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalInstrument, setActiveModalInstrument] = useState<Instrument | null>(null);
  const [playingInstrumentId, setPlayingInstrumentId] = useState<string | null>(null);
  const [isStudioOpen, setIsStudioOpen] = useState<boolean>(false);

  const filteredInstruments = INSTRUMENTS_DATA.filter((item) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'day') return item.category === 'Bộ Dây';
    if (selectedCategory === 'hoi') return item.category === 'Bộ Hơi';
    if (selectedCategory === 'go') return item.category === 'Bộ Gõ';
    if (selectedCategory === 'tieu') return item.orchestra === 'Tiểu Nhạc' || item.orchestra === 'Cả hai dàn nhạc';
    if (selectedCategory === 'dai') return item.orchestra === 'Đại Nhạc' || item.orchestra === 'Cả hai dàn nhạc';
    return true;
  });

  const playInstrumentSound = (instrument: Instrument) => {
    setPlayingInstrumentId(instrument.id);
    let type: 'string' | 'wind' | 'drum' | 'bell' = 'string';
    let freq = 440;

    if (instrument.category === 'Bộ Hơi') {
      type = 'wind';
      freq = instrument.id === 'ken-bau' ? 392 : instrument.id === 'ong-tieu' ? 261 : 523;
    } else if (instrument.category === 'Bộ Gõ') {
      if (instrument.id === 'trong-ban') {
        type = 'drum';
        freq = 150;
      } else if (instrument.id === 'trong-chien') {
        type = 'drum';
        freq = 85;
      } else {
        type = 'bell';
        freq = 660;
      }
    } else {
      type = 'string';
      freq = instrument.id === 'dan-tam' ? 175 : instrument.id === 'dan-nguyet' ? 293 : instrument.id === 'dan-ty-ba' ? 392 : 523;
    }

    courtAudioEngine.playInstrumentNote(freq, type, 1.5);
    setTimeout(() => setPlayingInstrumentId(null), 1500);
  };

  return (
    <div className="bg-[#171513] text-[#F2E8D5] min-h-screen py-6">
      <Breadcrumb items={[{ label: 'Nhạc cụ Cung đình' }]} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs font-mono uppercase tracking-widest text-[#C9A45C] mb-2">
            Chuyên trang Khí nhạc Hoàng triều · Cố đô Huế, Việt Nam
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-display text-[#FFF4DB]">
            HỆ THỐNG NHẠC CỤ CUNG ĐÌNH
          </h1>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#C9A45C] to-transparent mx-auto mt-4" />
          <p className="mt-4 text-sm sm:text-base text-[#F2E8D5]/80 font-sans leading-relaxed">
            Mỗi nhạc cụ là kết tinh của nghệ thuật thủ công mỹ nghệ tinh xảo, ẩn chứa triết lý Âm Dương Ngũ Hành và sự hòa quyện tuyệt mỹ giữa đất trời và con người xứ Cố đô <sup className="text-[#C9A45C] font-mono">[10]</sup>.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-[#493326]/30 border border-[#C9A45C]/30 rounded-lg max-w-2xl mx-auto">
          {[
            { id: 'all', label: 'Tất cả nhạc cụ' },
            { id: 'day', label: 'Bộ Dây' },
            { id: 'hoi', label: 'Bộ Hơi' },
            { id: 'go', label: 'Bộ Gõ' },
            { id: 'dai', label: 'Dàn Đại Nhạc' },
            { id: 'tieu', label: 'Dàn Tiểu Nhạc' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === tab.id
                  ? 'bg-gradient-to-r from-[#C9A45C] to-[#E5C07B] text-[#171513] font-semibold shadow-sm'
                  : 'text-[#F2E8D5]/70 hover:text-[#F2E8D5] hover:bg-[#781F25]/30'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Academic Audio Simulation Disclaimer */}
        <div className="max-w-3xl mx-auto p-3.5 rounded-lg border border-[#C9A45C]/30 bg-[#493326]/20 text-center text-xs text-[#F2E8D5]/80 font-sans space-y-1">
          <div>
            <span className="text-[#E5C07B] font-semibold">Minh bạch âm thanh & nguồn tư liệu:</span> Khi nhấn nút nghe thử trên từng nhạc cụ, hệ thống sử dụng công nghệ <strong>Web Audio API</strong> tổng hợp sóng âm theo tần số ngũ cung hoàng gia để minh họa nguyên lý khí nhạc giáo dục, không phải bản thu âm nguyên gốc.
          </div>
          <div className="text-[11px] text-[#C9A45C]/80">
            Hồ sơ hiện vật được đối chiếu với hiện vật lưu giữ tại Bảo tàng Cổ vật Cung đình Huế (Điện Long An, Thành phố Huế, Việt Nam).
          </div>
        </div>

        {/* Music Research Studio Banner (Giai đoạn 4) */}
        <div className="max-w-3xl mx-auto p-4 rounded-xl border border-[#C9A45C]/50 bg-gradient-to-r from-[#781F25]/40 via-[#171513] to-[#493326]/40 flex flex-wrap items-center justify-between gap-4 shadow-lg">
          <div>
            <div className="text-[10px] font-mono text-[#C9A45C] uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Phòng Thí Nghiệm Âm Học Di Sản (Giai đoạn 4)</span>
            </div>
            <h4 className="text-sm font-display font-bold text-[#FFF4DB] mt-0.5">
              Nghiên cứu Âm luật, Ký âm & Đo phổ tần số nhạc cụ
            </h4>
            <p className="text-xs text-[#F2E8D5]/70 font-sans">
              Khảo sát vi âm Hò - Xự - Xang, thang âm ngũ cung và cấu trúc điệu thức Khách - Nam.
            </p>
          </div>
          <button
            onClick={() => setIsStudioOpen(true)}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#C9A45C] to-[#E5C07B] text-[#171513] text-xs font-bold hover:brightness-110 flex items-center gap-1.5 shadow transition-all cursor-pointer"
          >
            <Music className="w-3.5 h-3.5" />
            <span>Mở Music Research Studio</span>
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInstruments.map((instrument) => (
            <div
              key={instrument.id}
              className="group relative rounded-lg border border-[#C9A45C]/25 bg-[#171513]/90 hover:border-[#C9A45C]/60 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-[#C9A45C]/10"
            >
              {/* Image Preview Slot */}
              <div className="relative h-48 overflow-hidden bg-[#493326]/20">
                <img
                  src={instrument.image}
                  alt={instrument.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171513] via-transparent to-transparent" />

                {/* Provenance Badge */}
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-mono bg-[#171513]/85 border border-[#C9A45C]/40 text-[#E5C07B]">
                  {instrument.imageProvenance}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    playInstrumentSound(instrument);
                  }}
                  title="Nghe âm thanh nhạc cụ"
                  className={`absolute top-3 right-3 p-2 rounded-full border transition-all ${
                    playingInstrumentId === instrument.id
                      ? 'bg-[#C9A45C] text-[#171513] border-[#FFF4DB] scale-110 shadow-lg'
                      : 'bg-[#171513]/80 text-[#C9A45C] border-[#C9A45C]/40 hover:bg-[#781F25] hover:text-[#FFF4DB]'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                </button>

                <div className="absolute bottom-2 left-3 text-xs text-[#E5C07B] font-mono flex items-center gap-2">
                  <span>{instrument.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{instrument.orchestra}</span>
                </div>
              </div>

              {/* Text info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <h3 className="text-xl font-display font-bold text-[#F2E8D5] group-hover:text-[#E5C07B] transition-colors">
                      {instrument.name}
                    </h3>
                    <span className="text-xs text-[#C9A45C] italic font-serif">
                      ({instrument.hanViet})
                    </span>
                  </div>

                  <p className="text-xs text-[#E5C07B]/90 font-medium line-clamp-1 mb-2">
                    {instrument.role}
                  </p>

                  <p className="text-xs text-[#F2E8D5]/80 font-sans line-clamp-2 leading-relaxed">
                    {instrument.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#493326]/50 flex items-center justify-between">
                  <div className="text-[11px] text-emerald-400/90 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{instrument.artifactVerification}</span>
                  </div>
                  <button
                    onClick={() => setActiveModalInstrument(instrument)}
                    className="text-xs font-semibold text-[#C9A45C] hover:text-[#E5C07B] flex items-center gap-1 cursor-pointer"
                  >
                    <span>Hồ sơ hiện vật</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Instrument Detail (Giai đoạn 5 Academic Dossier) */}
        <InstrumentDetailModal
          instrument={activeModalInstrument}
          isOpen={!!activeModalInstrument}
          onClose={() => setActiveModalInstrument(null)}
          onOpenStudio={() => setIsStudioOpen(true)}
        />

        {/* References Footer Box */}
        <div className="bg-[#12100e] border border-[#C9A45C]/30 p-6 rounded-lg text-xs font-sans">
          <div className="text-xs font-mono uppercase tracking-widest text-[#C9A45C] mb-2">
            Tư liệu tham khảo cho chuyên trang Nhạc cụ:
          </div>
          <p className="text-[#F2E8D5]/70 mb-3">
            Thông số kỹ thuật nhạc khí được trích lục từ Bảo tàng Cổ vật Cung đình Huế <sup className="text-[#C9A45C] font-mono">[4]</sup>, công trình <em>Nhã nhạc Cung đình Huế</em> của Cố GS.TS Trần Văn Khê <sup className="text-[#C9A45C] font-mono">[10]</sup>, và hồ sơ UNESCO <sup className="text-[#C9A45C] font-mono">[1]</sup>.
          </p>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#493326]/40">
            <Link to="/nguon-tham-khao" className="text-[#C9A45C] hover:text-[#E5C07B] flex items-center gap-1 font-semibold">
              <span>Xem danh mục 10 nguồn tài liệu đầy đủ</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <Link to="/bieu-dien" className="text-[#E5C07B] hover:underline flex items-center gap-1">
              <span>Tiếp theo: Xem Loại hình Biểu diễn & Nghi lễ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Music Research Studio Modal */}
        <MusicResearchStudioModal
          isOpen={isStudioOpen}
          onClose={() => setIsStudioOpen(false)}
        />
      </main>
    </div>
  );
};
