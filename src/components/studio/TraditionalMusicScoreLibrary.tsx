/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * PHÂN HỆ 5: TRADITIONAL MUSIC SCORE LIBRARY (THƯ VIỆN BÀI BẢN & TỔNG PHỔ NHÃ NHẠC)
 * Tác giả: Trần Thanh Bình (MSSV: PH61165 - Lớp: D02)
 */

import React, { useState } from 'react';
import { TRADITIONAL_SCORES_LIBRARY, TraditionalScore } from '../../data/musicTheoryData';
import { courtAudioEngine } from '../../utils/audioEngine';
import { Play, Square, BookOpen, CheckCircle2, Music, Filter, ExternalLink } from 'lucide-react';

export const TraditionalMusicScoreLibrary: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeScoreId, setActiveScoreId] = useState<string>(TRADITIONAL_SCORES_LIBRARY[0].id);
  const [isPlayingScore, setIsPlayingScore] = useState<boolean>(false);
  const [currentNoteIdx, setCurrentNoteIdx] = useState<number | null>(null);

  const filteredScores = selectedCategory === 'all'
    ? TRADITIONAL_SCORES_LIBRARY
    : TRADITIONAL_SCORES_LIBRARY.filter((s) => s.category.includes(selectedCategory));

  const activeScore = TRADITIONAL_SCORES_LIBRARY.find((s) => s.id === activeScoreId) || TRADITIONAL_SCORES_LIBRARY[0];

  const handlePlayScore = (score: TraditionalScore) => {
    if (isPlayingScore && activeScoreId === score.id) {
      courtAudioEngine.stop();
      setIsPlayingScore(false);
      setCurrentNoteIdx(null);
      return;
    }

    setActiveScoreId(score.id);
    setIsPlayingScore(true);

    const playbackNotes = score.frequenciesF.map((freq, idx) => ({
      freq,
      durationMs: idx % 4 === 3 ? 800 : 500,
      instrument: 'string' as const
    }));

    courtAudioEngine.playCustomSequence(
      playbackNotes,
      (idx) => setCurrentNoteIdx(idx),
      () => {
        setIsPlayingScore(false);
        setCurrentNoteIdx(null);
      }
    );
  };

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="p-4 rounded-xl bg-[#171513] border border-[#C9A45C]/30 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-[#C9A45C] font-semibold flex items-center gap-1.5">
            <Filter className="w-4 h-4" />
            <span>Phân loại bài bản:</span>
          </span>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#C9A45C] text-[#171513]'
                : 'bg-[#493326]/30 text-[#F2E8D5]/70 hover:text-[#FFF4DB]'
            }`}
          >
            Tất cả bài bản ({TRADITIONAL_SCORES_LIBRARY.length})
          </button>
          <button
            onClick={() => setSelectedCategory('Mười Bản Ngự')}
            className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
              selectedCategory === 'Mười Bản Ngự'
                ? 'bg-[#C9A45C] text-[#171513]'
                : 'bg-[#493326]/30 text-[#F2E8D5]/70 hover:text-[#FFF4DB]'
            }`}
          >
            Mười Bản Ngự (Thập Thủ Liên Hoàn)
          </button>
          <button
            onClick={() => setSelectedCategory('Đại Nhạc')}
            className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
              selectedCategory === 'Đại Nhạc'
                ? 'bg-[#C9A45C] text-[#171513]'
                : 'bg-[#493326]/30 text-[#F2E8D5]/70 hover:text-[#FFF4DB]'
            }`}
          >
            Đại Nhạc Cung Đình
          </button>
          <button
            onClick={() => setSelectedCategory('Tiểu Nhạc')}
            className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
              selectedCategory === 'Tiểu Nhạc'
                ? 'bg-[#C9A45C] text-[#171513]'
                : 'bg-[#493326]/30 text-[#F2E8D5]/70 hover:text-[#FFF4DB]'
            }`}
          >
            Tiểu Nhạc Giao Duyên
          </button>
        </div>

        <span className="text-xs text-[#F2E8D5]/60 font-mono">
          Nguồn kiểm chứng: Khâm Định & Hồ sơ UNESCO
        </span>
      </div>

      {/* Main Grid: Score Cards & Detail Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Score List */}
        <div className="lg:col-span-5 space-y-3">
          {filteredScores.map((score) => {
            const isSelected = activeScoreId === score.id;
            const isPlayingThis = isPlayingScore && isSelected;

            return (
              <div
                key={score.id}
                onClick={() => setActiveScoreId(score.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer relative group ${
                  isSelected
                    ? 'bg-[#781F25] border-[#E5C07B] shadow-xl'
                    : 'bg-[#171513] border-[#C9A45C]/30 hover:border-[#C9A45C]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-[#C9A45C] uppercase tracking-wider">
                    {score.category}
                  </span>
                  <span className="text-xs font-serif text-[#E5C07B]">
                    {score.hanTitle}
                  </span>
                </div>

                <h3 className="text-base font-display font-bold text-[#FFF4DB] group-hover:text-[#E5C07B]">
                  {score.title}
                </h3>

                <p className="text-xs text-[#F2E8D5]/70 line-clamp-2 mt-1">
                  {score.courtContext}
                </p>

                <div className="mt-3 pt-2 border-t border-[#C9A45C]/20 flex items-center justify-between text-xs">
                  <span className="font-mono text-[#C9A45C] text-[11px]">{score.tempo}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayScore(score);
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      isPlayingThis
                        ? 'bg-amber-500 text-[#171513]'
                        : 'bg-[#C9A45C] text-[#171513] hover:bg-[#E5C07B]'
                    }`}
                  >
                    {isPlayingThis ? <Square className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current" />}
                    <span>{isPlayingThis ? 'Dừng' : 'Tấu thử'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Active Score Deep Sheet */}
        <div className="lg:col-span-7 p-6 rounded-xl bg-[#171513] border border-[#C9A45C]/40 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#C9A45C]/20 pb-4">
            <div>
              <div className="text-xs font-mono text-[#C9A45C] uppercase tracking-widest">
                Tổng phổ bài bản cổ truyền
              </div>
              <h2 className="text-2xl font-display font-bold text-[#FFF4DB]">
                {activeScore.title}
              </h2>
              <div className="text-sm font-serif text-[#E5C07B] italic">
                {activeScore.hanTitle}
              </div>
            </div>

            <button
              onClick={() => handlePlayScore(activeScore)}
              className={`px-5 py-2.5 rounded-lg font-bold text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer ${
                isPlayingScore && activeScoreId === activeScore.id
                  ? 'bg-amber-600 text-[#171513]'
                  : 'bg-gradient-to-r from-[#C9A45C] to-[#E5C07B] text-[#171513] hover:brightness-110'
              }`}
            >
              {isPlayingScore && activeScoreId === activeScore.id ? (
                <>
                  <Square className="w-4 h-4 fill-current" />
                  <span>Dừng nghe</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Nghe toàn bộ khúc nhạc</span>
                </>
              )}
            </button>
          </div>

          {/* Solmization Notes Display */}
          <div>
            <div className="text-xs font-mono text-[#C9A45C] uppercase tracking-wider mb-2">
              Dòng chảy chữ nhạc truyền thống (Solmization Stream):
            </div>
            <div className="flex flex-wrap gap-2 p-3 rounded-lg bg-[#493326]/20 border border-[#C9A45C]/30">
              {activeScore.solmizationNotes.map((note, idx) => {
                const isCurrent = isPlayingScore && currentNoteIdx === idx;
                return (
                  <div
                    key={idx}
                    className={`px-3 py-2 rounded-lg border text-center transition-all ${
                      isCurrent
                        ? 'bg-[#781F25] border-[#E5C07B] scale-110 shadow-lg ring-2 ring-[#C9A45C]'
                        : 'bg-[#171513] border-[#C9A45C]/30'
                    }`}
                  >
                    <div className="text-xs font-display font-bold text-[#E5C07B]">
                      {note}
                    </div>
                    <div className="text-[10px] font-mono text-[#F2E8D5]/60 mt-0.5">
                      {activeScore.frequenciesF[idx]?.toFixed(0)} Hz
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Metadata Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-lg bg-[#171513] border border-[#C9A45C]/20 space-y-1">
              <span className="text-[#C9A45C] font-semibold">Nhịp phách & Cấu trúc:</span>
              <p className="text-[#FFF4DB]">{activeScore.meterPattern}</p>
              <p className="text-[#F2E8D5]/70 text-[11px]">{activeScore.structure}</p>
            </div>
            <div className="p-3.5 rounded-lg bg-[#171513] border border-[#C9A45C]/20 space-y-1">
              <span className="text-[#C9A45C] font-semibold">Bối cảnh cử hành cung đình:</span>
              <p className="text-[#F2E8D5]/90">{activeScore.courtContext}</p>
            </div>
          </div>

          {/* Source Citation & Curatorial Note */}
          <div className="p-4 rounded-lg bg-[#493326]/30 border border-[#C9A45C]/30 text-xs space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Nguồn thư tịch & Thẩm định học thuật:</span>
            </div>
            <p className="text-[#F2E8D5]/90 leading-relaxed font-sans">
              <strong>Thư tịch:</strong> {activeScore.sourceManuscript}
            </p>
            <p className="text-[#E5C07B] leading-relaxed italic font-sans">
              <strong>Ghi chú giám tuyển:</strong> {activeScore.curatorialNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
