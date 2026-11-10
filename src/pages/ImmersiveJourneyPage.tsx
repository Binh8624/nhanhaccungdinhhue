import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from '../components/Breadcrumb';
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  Volume2,
  Clock,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  BookOpen
} from 'lucide-react';
import { IMMERSIVE_JOURNEY_STEPS, JourneyStep } from '../data/immersiveJourneyData';
import { courtAudioEngine } from '../utils/audioEngine';

export const ImmersiveJourneyPage: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlayingCue, setIsPlayingCue] = useState(false);

  const step: JourneyStep = IMMERSIVE_JOURNEY_STEPS[currentStepIndex];

  const playStepAudio = () => {
    setIsPlayingCue(true);
    courtAudioEngine.playInstrumentNote(step.audioCue.freq, step.audioCue.instrument, 1.8);
    setTimeout(() => setIsPlayingCue(false), 1800);
  };

  const handleNext = () => {
    if (currentStepIndex < IMMERSIVE_JOURNEY_STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  return (
    <div className="bg-[#171513] text-[#F2E8D5] min-h-screen py-6">
      <Breadcrumb items={[{ label: 'Hành trình Nhập vai Cung đình' }]} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C9A45C] mb-2">
            <Compass className="w-4 h-4 text-[#C9A45C]" />
            <span>Trải nghiệm Giáo dục Mô phỏng Hoàng Triều</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-display text-[#FFF4DB]">
            MỘT NGÀY TRONG KHÔNG GIAN CUNG ĐÌNH HUẾ
          </h1>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#C9A45C] to-transparent mx-auto mt-4" />
          <p className="mt-4 text-sm sm:text-base text-[#F2E8D5]/80 font-sans leading-relaxed">
            Hóa thân thành người quan sát hoàng tộc, bước qua 5 thời khắc tế tự thiêng liêng từ rạng sáng sương mờ Ngọ Môn đến yến tiệc hoa đăng rực rỡ tại Duyệt Thị Đường.
          </p>

          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#493326]/30 border border-[#C9A45C]/30 text-[11px] font-sans text-[#E5C07B]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C9A45C]" />
            <span>Lưu ý giáo dục: Đây là trải nghiệm mô phỏng tương tác dựa trên Khâm Định Đại Nam Hội Điển Sự Lệ, không phải tái hiện lịch sử tuyệt đối</span>
          </div>
        </div>

        {/* Stepper Timeline Tracker */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 max-w-5xl mx-auto">
          {IMMERSIVE_JOURNEY_STEPS.map((s, idx) => {
            const isCurrent = idx === currentStepIndex;
            const isPast = idx < currentStepIndex;
            return (
              <button
                key={idx}
                onClick={() => setCurrentStepIndex(idx)}
                className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-[#781F25] border-[#C9A45C] text-[#FFF4DB] shadow-lg shadow-[#781F25]/40 scale-102 font-medium'
                    : isPast
                    ? 'bg-[#493326]/30 border-[#C9A45C]/40 text-[#E5C07B]'
                    : 'bg-[#171513] border-[#C9A45C]/20 text-[#F2E8D5]/60 hover:border-[#C9A45C]/40'
                }`}
              >
                <div className="text-[10px] font-mono text-[#C9A45C]">
                  Giai đoạn 0{idx + 1}
                </div>
                <div className="text-xs font-display font-bold mt-1 line-clamp-1">
                  {s.timeOfDay.split('(')[0]}
                </div>
                <div className="text-[10px] text-[#F2E8D5]/70 mt-1 line-clamp-1">
                  {s.focusArea}
                </div>
              </button>
            );
          })}
        </div>

        {/* Stage Content Card */}
        <div className="bg-[#171513] border border-[#C9A45C]/50 rounded-xl overflow-hidden shadow-2xl p-6 sm:p-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Frame */}
            <div className="lg:col-span-6 relative rounded-lg overflow-hidden border border-[#C9A45C]/40 shadow-xl">
              <img
                src={step.image}
                alt={step.phaseTitle}
                className="w-full h-80 sm:h-96 object-cover object-center filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171513] via-transparent to-transparent" />
              
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#171513]/85 border border-[#C9A45C]/40 text-[10px] font-mono text-[#E5C07B] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#C9A45C]" />
                <span>{step.timeOfDay}</span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-xs font-serif italic text-[#E5C07B]">
                Không gian: {step.imperialSpace}
              </div>
            </div>

            {/* Narrative & Audio Cue */}
            <div className="lg:col-span-6 space-y-5 font-sans">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#C9A45C] bg-[#781F25]/30 px-2.5 py-1 rounded border border-[#C9A45C]/30">
                  Trọng tâm: {step.focusArea}
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#FFF4DB] mt-2">
                  {step.phaseTitle}
                </h2>
                <div className="text-xs text-[#E5C07B] mt-1 font-medium">
                  Địa điểm khảo sát: {step.imperialSpace}
                </div>
              </div>

              <p className="text-sm sm:text-base text-[#F2E8D5]/90 leading-relaxed font-sans first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:text-[#C9A45C] first-letter:float-left first-letter:mr-2">
                {step.description}
              </p>

              {/* Sound Cue Trigger Button */}
              <div className="p-4 rounded-lg border border-[#C9A45C]/30 bg-[#493326]/25 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-[#E5C07B] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
                    <span>Thanh âm hiệu lệnh mô phỏng:</span>
                  </div>
                  <div className="text-xs text-[#F2E8D5]/80 font-mono mt-0.5">
                    {step.audioCue.noteName}
                  </div>
                </div>
                <button
                  onClick={playStepAudio}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider rounded transition-all cursor-pointer ${
                    isPlayingCue
                      ? 'bg-[#781F25] text-[#FFF4DB] border border-[#C9A45C] animate-pulse'
                      : 'bg-[#C9A45C] text-[#171513] hover:bg-[#E5C07B]'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                  <span>{isPlayingCue ? 'Đang ngân vang' : 'Lắng nghe âm lệnh'}</span>
                </button>
              </div>

              {/* Curatorial Details */}
              <div className="space-y-2 pt-2 border-t border-[#493326]/40 text-xs text-[#F2E8D5]/80">
                <span className="font-semibold text-[#C9A45C] block">
                  Đặc điểm điển chế quy định:
                </span>
                <ul className="space-y-1.5 pl-2">
                  {step.curatorialDetails.map((det, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#C9A45C] mt-0.5">•</span>
                      <span>{det}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-[11px] text-[#F2E8D5]/50 italic pt-1">
                Ghi chú: {step.simulationNote}
              </div>
            </div>
          </div>

          {/* Stepper controls */}
          <div className="mt-8 pt-6 border-t border-[#493326]/50 flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#F2E8D5]/80 hover:text-[#FFF4DB] disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Thời khắc trước</span>
            </button>

            <span className="text-xs font-mono text-[#C9A45C]">
              {currentStepIndex + 1} / {IMMERSIVE_JOURNEY_STEPS.length}
            </span>

            {currentStepIndex < IMMERSIVE_JOURNEY_STEPS.length - 1 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[#171513] bg-[#C9A45C] hover:bg-[#E5C07B] rounded transition-all cursor-pointer shadow"
              >
                <span>Thời khắc tiếp theo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setCurrentStepIndex(0)}
                className="flex items-center gap-2 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[#FFF4DB] bg-[#781F25] hover:bg-[#A32A32] border border-[#C9A45C]/40 rounded transition-all cursor-pointer shadow"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Trải nghiệm lại từ đầu</span>
              </button>
            )}
          </div>
        </div>

        {/* Link forward to next room */}
        <div className="flex justify-between items-center text-xs font-sans text-[#F2E8D5]/70 pt-4">
          <Link to="/kho-luu-tru" className="hover:text-[#C9A45C] flex items-center gap-1 font-semibold">
            <span>Khám phá Kho Lưu Trữ Số Di Sản</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link to="/huong-dan-vien-ai" className="hover:text-[#E5C07B] flex items-center gap-1 font-semibold">
            <span>Trò chuyện cùng AI Hướng Dẫn Viên Di Sản</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </main>
    </div>
  );
};
