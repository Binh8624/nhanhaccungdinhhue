/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * HỒ SƠ CHI TIẾT CỔ VẬT NHẠC KHÍ BẢO TÀNG (INSTRUMENT DOSSIER MODAL - GĐ5)
 * Tác giả: Trần Thanh Bình (MSSV: PH61165 - Lớp: D02)
 */

import React, { useState } from 'react';
import { Instrument } from '../../data/heritageData';
import { courtAudioEngine } from '../../utils/audioEngine';
import { X, Volume2, ShieldCheck, BookOpen, Clock, Ruler, MapPin, CheckCircle2, Sparkles, ExternalLink, Music } from 'lucide-react';

interface InstrumentDetailModalProps {
  instrument: Instrument | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenStudio?: () => void;
}

export const InstrumentDetailModal: React.FC<InstrumentDetailModalProps> = ({
  instrument,
  isOpen,
  onClose,
  onOpenStudio
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  if (!isOpen || !instrument) return null;

  const handlePlaySound = () => {
    setIsPlaying(true);
    let type: 'string' | 'wind' | 'drum' | 'bell' = 'string';
    let freq = 349.23; // F4

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

    courtAudioEngine.playInstrumentNote(freq, type, 1.8);
    setTimeout(() => setIsPlaying(false), 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#171513] border border-[#C9A45C]/50 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-[#C9A45C]/30 flex items-center justify-between bg-gradient-to-r from-[#781F25]/40 via-[#171513] to-[#493326]/30">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#C9A45C]">
              <span>HỒ SƠ HIỆN VẬT HỌC BẢO TÀNG</span>
              <span>·</span>
              <span className="text-[#FFF4DB]">{instrument.category} ({instrument.orchestra})</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-[#FFF4DB] flex items-center gap-2 mt-0.5">
              <span>{instrument.name}</span>
              <span className="text-sm font-serif font-normal text-[#E5C07B]">({instrument.hanViet})</span>
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
          {/* Top Hero Layout: Image & Quick Specs */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 relative rounded-xl overflow-hidden border border-[#C9A45C]/40 bg-black/40 shadow-xl group">
              <img
                src={instrument.image}
                alt={instrument.name}
                className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono bg-[#171513]/90 border border-[#C9A45C]/40 text-[#E5C07B]">
                {instrument.imageProvenance}
              </div>
            </div>

            <div className="md:col-span-7 space-y-4">
              <div className="p-3.5 rounded-xl bg-[#493326]/20 border border-[#C9A45C]/30 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300 font-semibold">{instrument.artifactVerification}</span>
                </div>
                <button
                  onClick={handlePlaySound}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isPlaying
                      ? 'bg-amber-500 text-[#171513] animate-pulse'
                      : 'bg-gradient-to-r from-[#C9A45C] to-[#E5C07B] text-[#171513] hover:brightness-110'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                  <span>{isPlaying ? 'Đang tấu mẫu...' : 'Nghe âm sắc mẫu'}</span>
                </button>
              </div>

              <div className="space-y-2 text-xs leading-relaxed text-[#F2E8D5]/90">
                <div>
                  <strong className="text-[#C9A45C]">Vai trò trong dàn nhạc:</strong>
                  <p className="mt-0.5">{instrument.role}</p>
                </div>
                <div>
                  <strong className="text-[#C9A45C]">Đặc trưng âm học:</strong>
                  <p className="mt-0.5 text-stone-300">{instrument.acoustic}</p>
                </div>
                <div>
                  <strong className="text-[#C9A45C]">Thang âm diễn tấu:</strong>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {instrument.pentatonicNotes.map((note, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-[#171513] border border-[#C9A45C]/30 text-[#FFF4DB] font-mono text-[11px]">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Deep Organological Specifications (Khảo tả hiện vật học) */}
          <div className="p-5 rounded-xl bg-[#171513] border border-[#C9A45C]/30 space-y-4">
            <h3 className="text-sm font-bold font-display text-[#E5C07B] uppercase tracking-wider flex items-center gap-2">
              <Ruler className="w-4 h-4 text-[#C9A45C]" />
              <span>Khảo tả Hiện vật học & Kích thước cơ học chuẩn:</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
              <div className="p-3.5 rounded-lg bg-[#493326]/20 border border-[#C9A45C]/20 space-y-1">
                <span className="text-[#C9A45C] font-semibold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Niên đại & Thời kỳ định chế:</span>
                </span>
                <p className="text-[#FFF4DB]">{instrument.originEra}</p>
              </div>

              <div className="p-3.5 rounded-lg bg-[#493326]/20 border border-[#C9A45C]/20 space-y-1">
                <span className="text-[#C9A45C] font-semibold flex items-center gap-1.5">
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Kích thước cơ học (Dimensions):</span>
                </span>
                <p className="text-[#FFF4DB]">{instrument.dimensions}</p>
              </div>

              <div className="p-3.5 rounded-lg bg-[#493326]/20 border border-[#C9A45C]/20 space-y-1">
                <span className="text-[#C9A45C] font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Vật liệu chế tác truyền thống:</span>
                </span>
                <p className="text-[#FFF4DB]">{instrument.materialDossier}</p>
              </div>

              <div className="p-3.5 rounded-lg bg-[#493326]/20 border border-[#C9A45C]/20 space-y-1">
                <span className="text-[#C9A45C] font-semibold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Địa điểm lưu giữ hiện vật gốc:</span>
                </span>
                <p className="text-[#FFF4DB]">{instrument.conservationLocation}</p>
              </div>
            </div>

            <div>
              <strong className="text-xs text-[#C9A45C] block mb-1">Kỹ thuật diễn tấu đặc thù (Playing Technique):</strong>
              <p className="text-xs text-[#F2E8D5]/90 leading-relaxed bg-[#493326]/10 p-3 rounded border border-[#C9A45C]/20">
                {instrument.playingTechnique}
              </p>
            </div>
          </div>

          {/* Historical Citation from Kham Dinh Quyển 96 */}
          <div className="p-4 rounded-xl bg-[#781F25]/20 border border-[#C9A45C]/30 text-xs space-y-1.5">
            <div className="flex items-center gap-2 text-[#E5C07B] font-semibold">
              <BookOpen className="w-4 h-4 text-[#C9A45C]" />
              <span>Căn cứ Điển chế Thư tịch Triều Nguyễn:</span>
            </div>
            <p className="text-[#F2E8D5]/80 italic leading-relaxed">
              Trích lục theo <em>Khâm Định Đại Nam Hội Điển Sự Lệ - Quyển 96 (Lễ Bộ - Điển chế Lễ Nhạc, năm 1851)</em>: Quy định rõ biên chế số lượng, cách bài trí trong nhã đình và y phục của nhạc sinh phụ trách khí cụ {instrument.name}.
            </p>
          </div>

          {/* Academic Transparency Badge */}
          <div className="p-3 rounded-lg bg-[#171513] border border-[#C9A45C]/20 text-[11px] text-[#F2E8D5]/60 flex items-center justify-between">
            <span>Âm thanh thử nghiệm: <strong>Âm thanh mô phỏng học thuật (Web Audio API)</strong></span>
            {onOpenStudio && (
              <button
                onClick={() => {
                  onClose();
                  onOpenStudio();
                }}
                className="text-[#C9A45C] hover:text-[#FFF4DB] font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>Nghiên cứu phổ âm thanh trong Music Studio</span>
                <Music className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
