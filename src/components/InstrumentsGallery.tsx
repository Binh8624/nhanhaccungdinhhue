import React, { useState } from 'react';
import { Volume2, X, Music, Sparkles, SlidersHorizontal, Info } from 'lucide-react';
import { INSTRUMENTS_DATA, Instrument } from '../data/heritageData';
import { courtAudioEngine } from '../utils/audioEngine';

export const InstrumentsGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalInstrument, setActiveModalInstrument] = useState<Instrument | null>(null);
  const [playingInstrumentId, setPlayingInstrumentId] = useState<string | null>(null);

  // Filter instruments based on user selection
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
      freq = instrument.id === 'ken-bau' ? 392 : 523;
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
      freq = instrument.id === 'dan-nguyet' ? 293 : instrument.id === 'dan-ty-ba' ? 392 : 523;
    }

    courtAudioEngine.playInstrumentNote(freq, type, 1.5);

    setTimeout(() => {
      setPlayingInstrumentId(null);
    }, 1500);
  };

  return (
    <section id="nhac-cu" className="py-20 bg-[#171513] text-[#F2E8D5] border-b border-[#C9A45C]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#C9A45C] mb-3">
            <Music className="w-4 h-4 text-[#C9A45C]" />
            <span>Chuyên mục II · Khí Nhạc Cung Đình</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-[#F2E8D5] tracking-tight">
            HỆ THỐNG NHẠC CỤ CUNG ĐÌNH
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#C9A45C] to-transparent mx-auto mt-4" />
          <p className="mt-4 text-base text-[#F2E8D5]/80 font-sans leading-relaxed">
            Mỗi nhạc cụ là một kiệt tác thủ công mỹ nghệ tinh xảo, ẩn chứa triết lý Âm Dương Ngũ Hành và sự hòa quyện tuyệt mỹ giữa Đất, Trời và Con Người.
          </p>
        </div>

        {/* Filter Controls (Segmented Tabs adhering to skill §1.A) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 p-1.5 bg-[#493326]/30 border border-[#C9A45C]/30 rounded-lg max-w-2xl mx-auto">
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

        {/* Instruments Grid */}
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
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171513] via-transparent to-transparent" />
                
                {/* Audio Preview Button */}
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

                {/* Subdued Metadata (Unboxed) */}
                <div className="absolute bottom-2 left-3 text-xs text-[#E5C07B] font-mono flex items-center gap-2">
                  <span>{instrument.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{instrument.orchestra}</span>
                </div>
              </div>

              {/* Text Info Content */}
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

                  <p className="text-xs text-[#E5C07B]/90 font-medium line-clamp-1 mb-2.5">
                    {instrument.role}
                  </p>

                  <p className="text-xs text-[#F2E8D5]/80 font-sans line-clamp-2 leading-relaxed">
                    {instrument.description}
                  </p>
                </div>

                {/* Card Action footer */}
                <div className="mt-4 pt-3 border-t border-[#493326]/50 flex items-center justify-between">
                  <div className="text-[11px] text-[#F2E8D5]/60 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#C9A45C]" />
                    <span>Thang âm ngũ cung</span>
                  </div>
                  <button
                    onClick={() => setActiveModalInstrument(instrument)}
                    className="text-xs font-semibold text-[#C9A45C] hover:text-[#E5C07B] flex items-center gap-1 cursor-pointer"
                  >
                    <span>Xem chi tiết</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Instrument Detail */}
        {activeModalInstrument && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171513]/85 backdrop-blur-md">
            <div className="relative w-full max-w-2xl bg-[#171513] border border-[#C9A45C]/60 rounded-lg p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
              {/* Close Button */}
              <button
                onClick={() => setActiveModalInstrument(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-[#F2E8D5]/70 hover:text-[#F2E8D5] hover:bg-[#781F25]/40 transition-colors"
                aria-label="Đóng"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex items-start gap-4 mb-6 pb-4 border-b border-[#C9A45C]/30">
                <div className="w-16 h-16 rounded border border-[#C9A45C]/40 overflow-hidden shrink-0">
                  <img
                    src={activeModalInstrument.image}
                    alt={activeModalInstrument.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-xs font-mono text-[#C9A45C] flex items-center gap-2">
                    <span>{activeModalInstrument.category}</span>
                    <span>·</span>
                    <span>{activeModalInstrument.orchestra}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#E5C07B] mt-0.5">
                    {activeModalInstrument.name}
                  </h3>
                  <p className="text-xs text-[#F2E8D5]/70 font-serif italic">
                    Tên chữ Hán: {activeModalInstrument.hanViet}
                  </p>
                </div>
              </div>

              {/* Sound Test in Modal */}
              <div className="mb-6 p-4 rounded bg-[#493326]/30 border border-[#C9A45C]/30 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-[#E5C07B]">Nghe thử âm sắc nhạc cụ</div>
                  <div className="text-[11px] text-[#F2E8D5]/70">Mô phỏng âm thanh ngũ cung truyền thống</div>
                </div>
                <button
                  onClick={() => playInstrumentSound(activeModalInstrument)}
                  className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#171513] bg-[#C9A45C] hover:bg-[#E5C07B] rounded transition-all cursor-pointer"
                >
                  <Volume2 className="w-4 h-4 text-[#171513]" />
                  <span>Phát âm mẫu</span>
                </button>
              </div>

              {/* Definition list of specifications */}
              <div className="space-y-4 text-sm font-sans">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-[#C9A45C] mb-1">
                    Vai trò trong biên chế
                  </h4>
                  <p className="text-[#F2E8D5]/90 leading-relaxed">
                    {activeModalInstrument.role}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-[#C9A45C] mb-1">
                    Cấu tạo & Chất liệu chế tác
                  </h4>
                  <p className="text-[#F2E8D5]/90 leading-relaxed">
                    {activeModalInstrument.materials}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-[#C9A45C] mb-1">
                    Đặc trưng âm học & Âm sắc
                  </h4>
                  <p className="text-[#F2E8D5]/90 leading-relaxed">
                    {activeModalInstrument.acoustic}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-[#C9A45C] mb-1">
                    Thang âm ngũ cung diễn tấu
                  </h4>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {activeModalInstrument.pentatonicNotes.map((note, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-xs font-mono rounded border border-[#C9A45C]/30 bg-[#781F25]/20 text-[#E5C07B]"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#493326]/50">
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-[#C9A45C] mb-1">
                    Ý nghĩa & Lịch sử hoàng triều
                  </h4>
                  <p className="text-[#F2E8D5]/80 text-xs leading-relaxed italic">
                    {activeModalInstrument.historicalNote}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
