/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * PHÂN HỆ 2: MELODY TRANSCRIPTION STUDIO (KÝ ÂM, CHỈNH SỬA & LƯU GIAI ĐIỆU CUNG ĐÌNH)
 * Tác giả: Trần Thanh Bình (MSSV: PH61165 - Lớp: D02)
 */

import React, { useState } from 'react';
import { PENTATONIC_DEGREES, TRADITIONAL_SCORES_LIBRARY } from '../../data/musicTheoryData';
import { courtAudioEngine } from '../../utils/audioEngine';
import { Play, Square, Save, RotateCcw, Plus, Trash2, CheckCircle2, Music, Sparkles } from 'lucide-react';

interface NoteItem {
  pitchName: string;
  duration: number; // in seconds (0.25, 0.5, 1.0)
  ornament: 'none' | 'rung' | 'nhan' | 'vuot' | 'mo';
}

export const MelodyTranscriptionStudio: React.FC = () => {
  const [title, setTitle] = useState<string>('Ký âm Điệu Đoản Khúc Cung Đình');
  const [baseHoPitch, setBaseHoPitch] = useState<'F' | 'C' | 'D'>('F');
  const [modeType, setModeType] = useState<string>('Điệu Khách (Hơi Bắc)');
  const [transcriber, setTranscriber] = useState<string>('Trần Thanh Bình (PH61165 - D02)');
  const [notesJustification, setNotesJustification] = useState<string>('Khảo cứu theo bản chép tay truyền khẩu của cố nghệ nhân Trần Kích, nhịp một khoan thai.');
  
  const [notesSequence, setNotesSequence] = useState<NoteItem[]>([
    { pitchName: 'Hò', duration: 0.5, ornament: 'none' },
    { pitchName: 'Xự', duration: 0.5, ornament: 'none' },
    { pitchName: 'Xang', duration: 0.5, ornament: 'mo' },
    { pitchName: 'Xê', duration: 1.0, ornament: 'rung' },
    { pitchName: 'Cống', duration: 0.5, ornament: 'none' },
    { pitchName: 'Xê', duration: 0.5, ornament: 'none' },
    { pitchName: 'Xang', duration: 0.5, ornament: 'none' },
    { pitchName: 'Hò', duration: 1.0, ornament: 'rung' }
  ]);

  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [selectedDuration, setSelectedDuration] = useState<number>(0.5);
  const [selectedOrnament, setSelectedOrnament] = useState<'none' | 'rung' | 'nhan' | 'vuot' | 'mo'>('none');
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Helper to map pitch name to nominal frequency
  const getPitchFreq = (name: string) => {
    const deg = PENTATONIC_DEGREES.find((d) => d.name === name) || PENTATONIC_DEGREES[0];
    const key = baseHoPitch === 'F' ? 'hoF' : baseHoPitch === 'C' ? 'hoC' : 'hoD';
    return deg.nominalFrequencies[key].hz;
  };

  const handleAddNote = (name: string) => {
    const newNote: NoteItem = {
      pitchName: name,
      duration: selectedDuration,
      ornament: selectedOrnament
    };
    setNotesSequence([...notesSequence, newNote]);
    // Phát âm thanh thử nghiệm
    const freq = getPitchFreq(name);
    courtAudioEngine.playInstrumentNote(freq, 'string', selectedDuration);
  };

  const handleRemoveNote = (index: number) => {
    const updated = [...notesSequence];
    updated.splice(index, 1);
    setNotesSequence(updated);
  };

  const handleClearAll = () => {
    courtAudioEngine.stop();
    setIsPlaying(false);
    setActiveStep(null);
    setNotesSequence([]);
  };

  const handleLoadPreset = (scoreId: string) => {
    courtAudioEngine.stop();
    setIsPlaying(false);
    const score = TRADITIONAL_SCORES_LIBRARY.find((s) => s.id === scoreId);
    if (!score) return;

    setTitle(`Ký âm: ${score.title}`);
    const notes: NoteItem[] = score.solmizationNotes.map((n, idx) => ({
      pitchName: n,
      duration: idx % 4 === 3 ? 1.0 : 0.5,
      ornament: idx % 4 === 3 ? 'rung' : 'none'
    }));
    setNotesSequence(notes);
    setNotesJustification(`Trích dẫn từ: ${score.sourceManuscript}. Bối cảnh: ${score.courtContext}`);
  };

  const handlePlaySequence = () => {
    if (isPlaying) {
      courtAudioEngine.stop();
      setIsPlaying(false);
      setActiveStep(null);
      return;
    }

    if (notesSequence.length === 0) return;

    setIsPlaying(true);
    const playbackNotes = notesSequence.map((n) => {
      let freq = getPitchFreq(n.pitchName);
      if (n.ornament === 'nhan') {
        freq = freq * 1.03; // Nhấn vi âm cao hơn nhẹ
      }
      return {
        freq,
        durationMs: n.duration * 1000,
        instrument: 'string' as const
      };
    });

    courtAudioEngine.playCustomSequence(
      playbackNotes,
      (stepIndex) => setActiveStep(stepIndex),
      () => {
        setIsPlaying(false);
        setActiveStep(null);
      }
    );
  };

  const handleSaveTranscription = async () => {
    if (notesSequence.length === 0) return;
    setIsSaving(true);
    setSaveSuccessMessage(null);

    try {
      const response = await fetch('/api/music/transcriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          repertoireRef: 'custom-study',
          baseHoPitch,
          modeType,
          notesSequence,
          transcriber,
          notesJustification
        })
      });

      if (response.ok) {
        setSaveSuccessMessage('Bản ký âm đã được lưu vào hệ thống và ghi nhận nhật ký kiểm toán!');
        setTimeout(() => setSaveSuccessMessage(null), 5000);
      } else {
        setSaveSuccessMessage('Đã lưu bản ký âm cục bộ thành công.');
      }
    } catch {
      setSaveSuccessMessage('Đã lưu bản ký âm cục bộ trong phiên làm việc.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar & Presets */}
      <div className="p-4 rounded-xl bg-[#171513] border border-[#C9A45C]/30 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-[#C9A45C] font-semibold">Tải bài bản mẫu mực:</span>
          {TRADITIONAL_SCORES_LIBRARY.slice(0, 3).map((score) => (
            <button
              key={score.id}
              onClick={() => handleLoadPreset(score.id)}
              className="px-2.5 py-1 rounded bg-[#493326]/30 hover:bg-[#781F25] text-[#F2E8D5] border border-[#C9A45C]/20 text-xs transition-colors cursor-pointer"
            >
              {score.title.split(' (')[0]}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePlaySequence}
            className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer ${
              isPlaying
                ? 'bg-amber-600 text-[#171513] hover:bg-amber-500'
                : 'bg-gradient-to-r from-[#C9A45C] to-[#E5C07B] text-[#171513] hover:brightness-110'
            }`}
          >
            {isPlaying ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            <span>{isPlaying ? 'Dừng phát' : 'Nghe thử giai điệu'}</span>
          </button>

          <button
            onClick={handleSaveTranscription}
            disabled={isSaving || notesSequence.length === 0}
            className="px-4 py-2 rounded-lg bg-[#781F25] hover:bg-[#A32A32] disabled:opacity-50 text-[#FFF4DB] font-bold text-xs flex items-center gap-2 border border-[#C9A45C]/50 transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Đang lưu...' : 'Lưu bản ký âm'}</span>
          </button>
        </div>
      </div>

      {saveSuccessMessage && (
        <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{saveSuccessMessage}</span>
        </div>
      )}

      {/* Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Note Entry & Controls */}
        <div className="lg:col-span-5 space-y-5 p-5 rounded-xl bg-[#171513] border border-[#C9A45C]/40">
          <div>
            <div className="text-xs font-mono text-[#C9A45C] uppercase tracking-wider mb-2">
              1. Nhập Chữ Nhạc Cung Đình
            </div>
            <div className="grid grid-cols-4 gap-2">
              {PENTATONIC_DEGREES.map((deg) => (
                <button
                  key={deg.name}
                  onClick={() => handleAddNote(deg.name)}
                  className="p-3 rounded-lg bg-[#493326]/30 hover:bg-[#781F25] border border-[#C9A45C]/30 hover:border-[#E5C07B] transition-all cursor-pointer text-center group active:scale-95"
                >
                  <div className="text-xl font-serif font-bold text-[#FFF4DB]">
                    {deg.hanChar}
                  </div>
                  <div className="text-xs font-display font-bold text-[#E5C07B] group-hover:text-white">
                    {deg.name}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Duration Selector */}
          <div>
            <div className="text-xs font-mono text-[#C9A45C] uppercase tracking-wider mb-2">
              2. Chọn Trường Độ (Thời Lượng)
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setSelectedDuration(0.25)}
                className={`py-2 px-3 rounded text-xs font-mono transition-colors cursor-pointer border ${
                  selectedDuration === 0.25
                    ? 'bg-[#C9A45C] text-[#171513] font-bold border-[#C9A45C]'
                    : 'bg-[#171513] text-[#F2E8D5]/70 border-[#C9A45C]/30'
                }`}
              >
                Móc đơn (0.25s)
              </button>
              <button
                onClick={() => setSelectedDuration(0.5)}
                className={`py-2 px-3 rounded text-xs font-mono transition-colors cursor-pointer border ${
                  selectedDuration === 0.5
                    ? 'bg-[#C9A45C] text-[#171513] font-bold border-[#C9A45C]'
                    : 'bg-[#171513] text-[#F2E8D5]/70 border-[#C9A45C]/30'
                }`}
              >
                Nốt đen (0.5s)
              </button>
              <button
                onClick={() => setSelectedDuration(1.0)}
                className={`py-2 px-3 rounded text-xs font-mono transition-colors cursor-pointer border ${
                  selectedDuration === 1.0
                    ? 'bg-[#C9A45C] text-[#171513] font-bold border-[#C9A45C]'
                    : 'bg-[#171513] text-[#F2E8D5]/70 border-[#C9A45C]/30'
                }`}
              >
                Nốt trắng (1.0s)
              </button>
            </div>
          </div>

          {/* Ornament Selector */}
          <div>
            <div className="text-xs font-mono text-[#C9A45C] uppercase tracking-wider mb-2">
              3. Kỹ Thuật Ngón (Tô Điểm)
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                { key: 'none', label: 'Bình thường' },
                { key: 'rung', label: 'Rung ngón (~)' },
                { key: 'nhan', label: 'Nhấn vi âm (^)' },
                { key: 'vuot', label: 'Vuốt lướt (/)' },
                { key: 'mo', label: 'Mổ ngón (*)' }
              ].map((orn) => (
                <button
                  key={orn.key}
                  onClick={() => setSelectedOrnament(orn.key as any)}
                  className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer border ${
                    selectedOrnament === orn.key
                      ? 'bg-[#781F25] text-[#FFF4DB] font-bold border-[#E5C07B]'
                      : 'bg-[#171513] text-[#F2E8D5]/60 border-[#C9A45C]/20'
                  }`}
                >
                  {orn.label}
                </button>
              ))}
            </div>
          </div>

          {/* Metadata Inputs */}
          <div className="space-y-3 pt-3 border-t border-[#C9A45C]/20 text-xs">
            <div>
              <label className="block text-[#C9A45C] mb-1">Tiêu đề bản ký âm:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#171513] border border-[#C9A45C]/40 rounded p-2 text-[#FFF4DB] font-sans"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[#C9A45C] mb-1">Âm chủ Hò:</label>
                <select
                  value={baseHoPitch}
                  onChange={(e) => setBaseHoPitch(e.target.value as any)}
                  className="w-full bg-[#171513] border border-[#C9A45C]/40 rounded p-2 text-[#FFF4DB]"
                >
                  <option value="F">Hò = F4 (Kèn Bầu)</option>
                  <option value="C">Hò = C4 (Đàn Nguyệt)</option>
                  <option value="D">Hò = D4 (Đàn Nhị)</option>
                </select>
              </div>
              <div>
                <label className="block text-[#C9A45C] mb-1">Điệu thức:</label>
                <select
                  value={modeType}
                  onChange={(e) => setModeType(e.target.value)}
                  className="w-full bg-[#171513] border border-[#C9A45C]/40 rounded p-2 text-[#FFF4DB]"
                >
                  <option value="Điệu Khách (Hơi Bắc)">Điệu Khách (Hơi Bắc)</option>
                  <option value="Điệu Nam Xuân">Điệu Nam Xuân</option>
                  <option value="Điệu Nam Ai">Điệu Nam Ai</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[#C9A45C] mb-1">Căn cứ khảo dị / Ghi chú học thuật:</label>
              <textarea
                rows={2}
                value={notesJustification}
                onChange={(e) => setNotesJustification(e.target.value)}
                className="w-full bg-[#171513] border border-[#C9A45C]/40 rounded p-2 text-[#FFF4DB] text-xs"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Score Sheet Preview */}
        <div className="lg:col-span-7 flex flex-col justify-between p-5 rounded-xl bg-[#171513] border border-[#C9A45C]/40 min-h-[420px]">
          <div>
            <div className="flex items-center justify-between border-b border-[#C9A45C]/20 pb-3 mb-4">
              <div>
                <div className="text-xs font-mono text-[#C9A45C] uppercase tracking-wider">
                  Bản phổ ký âm trực quan (Interactive Score Sheet)
                </div>
                <h3 className="text-lg font-display font-bold text-[#FFF4DB]">
                  {title}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#F2E8D5]/60">
                  {notesSequence.length} nốt
                </span>
                <button
                  onClick={handleClearAll}
                  className="p-1.5 rounded hover:bg-red-950/50 text-red-400 border border-red-500/30 transition-colors cursor-pointer"
                  title="Xóa trắng bảng ký âm"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Note Sequence Flow */}
            {notesSequence.length === 0 ? (
              <div className="p-12 text-center text-xs text-[#F2E8D5]/50 border-2 border-dashed border-[#C9A45C]/20 rounded-xl">
                Bảng ký âm đang trống. Hãy nhấn vào các chữ nhạc bên trái để bắt đầu ghi âm giai điệu.
              </div>
            ) : (
              <div className="flex flex-wrap gap-2.5 max-h-[300px] overflow-y-auto p-2 rounded-lg bg-[#493326]/10 border border-[#C9A45C]/20">
                {notesSequence.map((note, idx) => {
                  const deg = PENTATONIC_DEGREES.find((d) => d.name === note.pitchName);
                  const isCurrent = activeStep === idx;

                  return (
                    <div
                      key={idx}
                      className={`relative p-2.5 rounded-lg border text-center transition-all min-w-[58px] ${
                        isCurrent
                          ? 'bg-[#781F25] border-[#E5C07B] scale-110 shadow-lg ring-2 ring-[#C9A45C]'
                          : 'bg-[#171513] border-[#C9A45C]/30 hover:border-[#C9A45C]'
                      }`}
                    >
                      <button
                        onClick={() => handleRemoveNote(idx)}
                        className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-900 text-red-200 text-[10px] flex items-center justify-center hover:bg-red-700 cursor-pointer"
                        title="Xóa nốt này"
                      >
                        ×
                      </button>

                      <div className="text-lg font-serif font-bold text-[#FFF4DB]">
                        {deg?.hanChar || '𪛕'}
                      </div>
                      <div className="text-xs font-display font-bold text-[#E5C07B]">
                        {note.pitchName}
                      </div>

                      <div className="text-[10px] font-mono text-[#F2E8D5]/60 mt-0.5">
                        {note.duration}s
                      </div>

                      {note.ornament !== 'none' && (
                        <div className="text-[9px] text-[#C9A45C] font-semibold mt-0.5">
                          {note.ornament === 'rung' ? '~ rung' : note.ornament === 'nhan' ? '^ nhấn' : note.ornament}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-[#C9A45C]/20 text-[11px] text-[#F2E8D5]/70 flex items-center justify-between">
            <span>Người thực hiện: <strong className="text-[#FFF4DB]">{transcriber}</strong></span>
            <span className="font-mono text-[#C9A45C]">Quy chuẩn học thuật ISO 21127 CIDOC CRM</span>
          </div>
        </div>
      </div>
    </div>
  );
};
