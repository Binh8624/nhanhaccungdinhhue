import React, { useState } from 'react';
import { HelpCircle, CheckCircle, XCircle, RotateCcw, Trophy, Award, ArrowRight } from 'lucide-react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/heritageData';

export const KnowledgeQuiz: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQ.id]: optionIndex
    });
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const handleFinish = () => {
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setCurrentIdx(0);
    setIsSubmitted(false);
  };

  // Calculate score
  const score = QUIZ_QUESTIONS.reduce((acc, q) => {
    return selectedAnswers[q.id] === q.correctIndex ? acc + 1 : acc;
  }, 0);

  const getRankTitle = (pts: number) => {
    if (pts === 10) return { title: 'Trạng Nguyên Di Sản Cung Đình', badge: 'Tuyệt đỉnh uyên bác' };
    if (pts >= 8) return { title: 'Bảng Nhãn Nhã Nhạc Cố Đô', badge: 'Hiểu biết sâu rộng' };
    if (pts >= 6) return { title: 'Thám Hoa Âm Luật Hoàng Triều', badge: 'Nắm vững kiến thức căn bản' };
    return { title: 'Nhạc Sinh Nhã Nhạc Khởi Đầu', badge: 'Hãy cùng ôn tập và khám phá thêm!' };
  };

  const rank = getRankTitle(score);

  return (
    <section id="trac-nghiem" className="py-20 bg-[#171513] text-[#F2E8D5] border-b border-[#C9A45C]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#C9A45C] mb-3">
            <HelpCircle className="w-4 h-4 text-[#C9A45C]" />
            <span>Chuyên mục IX · Đố Vui Tìm Hiểu</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-[#F2E8D5] tracking-tight">
            GÓC KHÁM PHÁ – KIỂM TRA KIẾN THỨC
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#C9A45C] to-transparent mx-auto mt-4" />
          <p className="mt-4 text-base text-[#F2E8D5]/80 font-sans leading-relaxed">
            Thử tài am hiểu văn hóa với 10 câu hỏi trắc nghiệm khoa học về lịch sử, nhạc cụ, nghi lễ và giá trị của Nhã nhạc cung đình Huế.
          </p>
        </div>

        {!isSubmitted ? (
          /* Active Question View */
          <div className="max-w-3xl mx-auto bg-[#171513] border border-[#C9A45C]/40 rounded-lg p-6 sm:p-10 shadow-2xl relative">
            {/* Question Progress Header */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#C9A45C]/20">
              <span className="text-xs font-mono uppercase tracking-wider text-[#C9A45C]">
                Câu hỏi {currentIdx + 1} / {QUIZ_QUESTIONS.length}
              </span>
              <span className="text-xs text-[#F2E8D5]/60 font-sans">
                Đã trả lời: {Object.keys(selectedAnswers).length} / {QUIZ_QUESTIONS.length} câu
              </span>
            </div>

            {/* Question Text */}
            <h3 className="text-xl sm:text-2xl font-display font-bold text-[#FFF4DB] leading-snug mb-8">
              {currentQ.question}
            </h3>

            {/* 4 Options */}
            <div className="space-y-3 mb-8 font-sans">
              {currentQ.options.map((option, oIdx) => {
                const isSelected = selectedAnswers[currentQ.id] === oIdx;
                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectOption(oIdx)}
                    className={`w-full text-left p-4 rounded-lg border transition-all cursor-pointer flex items-center justify-between text-sm sm:text-base ${
                      isSelected
                        ? 'bg-[#781F25]/40 border-[#C9A45C] text-[#FFF4DB] font-medium shadow-md shadow-[#C9A45C]/10'
                        : 'bg-[#493326]/10 border-[#C9A45C]/20 text-[#F2E8D5]/85 hover:border-[#C9A45C]/50 hover:bg-[#493326]/20'
                    }`}
                  >
                    <span>{option}</span>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-3 ${
                        isSelected
                          ? 'border-[#C9A45C] bg-[#C9A45C] text-[#171513]'
                          : 'border-[#C9A45C]/40'
                      }`}
                    >
                      {isSelected && <div className="w-2 h-2 rounded-full bg-[#171513]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-[#493326]/40">
              <button
                onClick={handlePrev}
                disabled={currentIdx === 0}
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#F2E8D5]/70 hover:text-[#F2E8D5] disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              >
                ← Câu trước
              </button>

              <div className="flex items-center gap-3">
                {currentIdx < QUIZ_QUESTIONS.length - 1 ? (
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#171513] bg-[#C9A45C] hover:bg-[#E5C07B] rounded transition-all cursor-pointer shadow"
                  >
                    <span>Câu kế tiếp</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleFinish}
                    className="flex items-center gap-1.5 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#FFF4DB] bg-gradient-to-r from-[#781F25] to-[#A32A32] hover:brightness-110 border border-[#C9A45C]/50 rounded transition-all cursor-pointer shadow-lg"
                  >
                    <Trophy className="w-4 h-4 text-[#C9A45C]" />
                    <span>Nộp bài & Xem kết quả</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Result Summary & Full Review */
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Scoreboard Card */}
            <div className="bg-[#171513] border border-[#C9A45C] rounded-lg p-8 sm:p-10 shadow-2xl text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#C9A45C]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="inline-flex p-4 rounded-full bg-[#781F25]/40 border border-[#C9A45C]/40 text-[#C9A45C] mb-4">
                <Trophy className="w-10 h-10 text-[#C9A45C]" />
              </div>

              <div className="text-xs font-mono uppercase tracking-widest text-[#C9A45C] mb-1">
                Kết Quả Khảo Sát Kiến Thức
              </div>

              <h3 className="text-3xl sm:text-4xl font-display font-bold text-[#FFF4DB]">
                {rank.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#E5C07B] mt-1 font-sans">
                {rank.badge}
              </p>

              <div className="mt-6 inline-flex items-baseline gap-2 px-6 py-3 rounded-lg border border-[#C9A45C]/40 bg-[#493326]/30">
                <span className="text-4xl font-display font-bold text-[#E5C07B] tabular-nums">
                  {score}
                </span>
                <span className="text-base text-[#F2E8D5]/60 font-sans">
                  / 10 câu chính xác
                </span>
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#171513] bg-gradient-to-r from-[#C9A45C] to-[#E5C07B] hover:brightness-110 rounded transition-all cursor-pointer shadow-lg"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Làm lại bài trắc nghiệm</span>
                </button>
              </div>
            </div>

            {/* Answer Explanations Review */}
            <div className="bg-[#171513] border border-[#C9A45C]/30 rounded-lg p-6 sm:p-8 space-y-6">
              <h4 className="text-xl font-display font-bold text-[#E5C07B] pb-3 border-b border-[#C9A45C]/20">
                Lời giải thích chi tiết & Căn cứ lịch sử từng câu hỏi
              </h4>

              <div className="space-y-6">
                {QUIZ_QUESTIONS.map((q) => {
                  const userAnswer = selectedAnswers[q.id];
                  const isCorrect = userAnswer === q.correctIndex;
                  return (
                    <div
                      key={q.id}
                      className={`p-5 rounded-lg border text-sm font-sans space-y-2 ${
                        isCorrect
                          ? 'border-emerald-800/40 bg-emerald-950/15'
                          : 'border-red-900/40 bg-red-950/15'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="font-semibold text-[#FFF4DB]">
                          Câu {q.id}: {q.question}
                        </div>
                        {isCorrect ? (
                          <div className="flex items-center gap-1 text-emerald-400 text-xs shrink-0 font-medium">
                            <CheckCircle className="w-4 h-4" />
                            <span>Đúng</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-red-400 text-xs shrink-0 font-medium">
                            <XCircle className="w-4 h-4" />
                            <span>Chưa đúng</span>
                          </div>
                        )}
                      </div>

                      <div className="text-xs text-[#F2E8D5]/80">
                        <strong>Đáp án chính xác:</strong>{' '}
                        <span className="text-[#C9A45C]">{q.options[q.correctIndex]}</span>
                      </div>

                      <div className="text-xs text-[#F2E8D5]/70 italic pt-1 border-t border-[#493326]/30">
                        <strong>Căn cứ lịch sử:</strong> {q.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
