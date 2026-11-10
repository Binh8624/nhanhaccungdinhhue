import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from '../components/Breadcrumb';
import {
  HelpCircle,
  CheckCircle,
  XCircle,
  RotateCcw,
  Trophy,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Layers,
  MapPin,
  Puzzle,
  Award,
  Crown,
  Medal,
  Check
} from 'lucide-react';
import { QUIZ_QUESTIONS, QuizQuestion, INSTRUMENTS_DATA } from '../data/heritageData';
import {
  MAP_QUIZ_QUESTIONS,
  MapQuizQuestion,
  MATCHING_PAIRS,
  MatchingPair,
  HERITAGE_BADGES,
  HeritageBadge
} from '../data/gamesData';

export const QuizDiscoveryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'quiz' | 'visual_challenge' | 'map_quiz' | 'matching_game' | 'badges'>('quiz');

  // Total points & Badges in localStorage
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([]);

  useEffect(() => {
    try {
      const savedPts = localStorage.getItem('nhanhac_points');
      if (savedPts) setTotalPoints(parseInt(savedPts, 10));

      const savedBadges = localStorage.getItem('nhanhac_badges');
      if (savedBadges) setUnlockedBadges(JSON.parse(savedBadges));
    } catch (e) {}
  }, []);

  const addPoints = (pts: number) => {
    const newTotal = totalPoints + pts;
    setTotalPoints(newTotal);
    try {
      localStorage.setItem('nhanhac_points', newTotal.toString());
      // Check for badge unlocks
      const newlyUnlocked: string[] = [];
      HERITAGE_BADGES.forEach((b) => {
        if (newTotal >= b.requiredPoints && !unlockedBadges.includes(b.id)) {
          newlyUnlocked.push(b.id);
        }
      });
      if (newlyUnlocked.length > 0) {
        const updated = [...unlockedBadges, ...newlyUnlocked];
        setUnlockedBadges(updated);
        localStorage.setItem('nhanhac_badges', JSON.stringify(updated));
      }
    } catch (e) {}
  };

  // ================= 1. TRẮC NGHIỆM LỊCH SỬ =================
  const [quizIdx, setQuizIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[quizIdx];

  const handleSelectQuizOption = (optionIndex: number) => {
    if (isQuizSubmitted) return;
    setSelectedAnswers({ ...selectedAnswers, [currentQ.id]: optionIndex });
  };

  const handleFinishQuiz = () => {
    setIsQuizSubmitted(true);
    let correctCount = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) correctCount++;
    });
    addPoints(correctCount * 15);
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setQuizIdx(0);
    setIsQuizSubmitted(false);
  };

  // ================= 2. NHẬN DIỆN NHẠC CỤ =================
  const [visualIdx, setVisualIdx] = useState<number>(0);
  const [visualGuess, setVisualGuess] = useState<string | null>(null);
  const [visualScore, setVisualScore] = useState<number>(0);

  const handleGuessVisual = (name: string) => {
    if (visualGuess !== null) return;
    setVisualGuess(name);
    const correct = INSTRUMENTS_DATA[visualIdx % INSTRUMENTS_DATA.length].name;
    if (name === correct) {
      setVisualScore((prev) => prev + 1);
      addPoints(20);
    }
  };

  // ================= 3. ĐỊNH VỊ BẢN ĐỒ =================
  const [mapIdx, setMapIdx] = useState<number>(0);
  const [mapSelectedSite, setMapSelectedSite] = useState<string | null>(null);
  const [mapScore, setMapScore] = useState<number>(0);

  const currentMapQ: MapQuizQuestion = MAP_QUIZ_QUESTIONS[mapIdx];

  const handleSelectMapSite = (siteId: string) => {
    if (mapSelectedSite !== null) return;
    setMapSelectedSite(siteId);
    if (siteId === currentMapQ.targetSiteId) {
      setMapScore((prev) => prev + 1);
      addPoints(25);
    }
  };

  // ================= 4. GHÉP NỐI NHẠC CỤ & VAI TRÒ =================
  const [selectedInstrument, setSelectedInstrument] = useState<MatchingPair | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [wrongAttempt, setWrongAttempt] = useState<boolean>(false);

  const handleMatchAttempt = (roleText: string) => {
    if (!selectedInstrument) return;
    if (selectedInstrument.correctRole === roleText) {
      const updated = [...matchedPairs, selectedInstrument.id];
      setMatchedPairs(updated);
      setSelectedInstrument(null);
      setWrongAttempt(false);
      addPoints(30);
    } else {
      setWrongAttempt(true);
      setTimeout(() => setWrongAttempt(false), 1200);
    }
  };

  return (
    <div className="bg-[#171513] text-[#F2E8D5] min-h-screen py-6">
      <Breadcrumb items={[{ label: 'Góc Khám phá & Trò chơi' }]} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Header with Total Points & Badges preview */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-[#C9A45C]/30 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C9A45C] mb-2">
              <Sparkles className="w-4 h-4 text-[#C9A45C]" />
              <span>Khu Vực Trải Nghiệm Giáo Dục Tương Tác</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold font-display text-[#FFF4DB]">
              4 TRÒ CHƠI TƯƠNG TÁC DI SẢN
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-[#F2E8D5]/80 font-sans max-w-2xl">
              Vừa học vừa chơi, tích lũy điểm kinh nghiệm và mở khóa danh vị hoàng triều: Trạng Nguyên, Bảng Nhãn, Thám Hoa Cung Đình.
            </p>
          </div>

          {/* Gamification Status Card */}
          <div className="flex items-center gap-4 p-4 rounded-xl border border-[#C9A45C]/40 bg-[#493326]/25 shadow-xl shrink-0 font-sans">
            <div className="w-12 h-12 rounded-full bg-[#781F25] border border-[#C9A45C] flex items-center justify-center text-[#E5C07B]">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-[#C9A45C] uppercase">
                Điểm tích lũy trên thiết bị
              </div>
              <div className="text-2xl font-display font-bold text-[#E5C07B] tabular-nums">
                {totalPoints} <span className="text-xs text-[#F2E8D5]/60 font-sans font-normal">điểm</span>
              </div>
              <div className="text-[11px] text-[#F2E8D5]/70">
                Đã đạt {unlockedBadges.length} / {HERITAGE_BADGES.length} huy hiệu
              </div>
            </div>
          </div>
        </div>

        {/* 4 Games Navigation Ribbon */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-[#493326]/30 border border-[#C9A45C]/30 rounded-lg max-w-4xl mx-auto font-sans">
          {[
            { id: 'quiz', label: '1. Trắc nghiệm Lịch sử', icon: HelpCircle },
            { id: 'visual_challenge', label: '2. Nhận diện Nhạc khí', icon: Sparkles },
            { id: 'map_quiz', label: '3. Định vị Bản đồ Huế', icon: MapPin },
            { id: 'matching_game', label: '4. Ghép nối Vai trò', icon: Puzzle },
            { id: 'badges', label: 'Bảng Huy hiệu & Thành tích', icon: Award }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-[#C9A45C] to-[#E5C07B] text-[#171513] font-semibold shadow-md'
                    : 'text-[#F2E8D5]/75 hover:text-[#FFF4DB] hover:bg-[#781F25]/30'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 1. TRÒ CHƠI 1: TRẮC NGHIỆM LỊCH SỬ NHÃ NHẠC */}
        {activeTab === 'quiz' && (
          <div className="max-w-3xl mx-auto">
            {!isQuizSubmitted ? (
              <div className="bg-[#171513] border border-[#C9A45C]/40 rounded-xl p-6 sm:p-10 shadow-2xl relative font-sans">
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#C9A45C]/20">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#C9A45C]">
                    Câu hỏi {quizIdx + 1} / {QUIZ_QUESTIONS.length}
                  </span>
                  <span className="text-xs text-[#F2E8D5]/60">
                    Đã trả lời: {Object.keys(selectedAnswers).length} / {QUIZ_QUESTIONS.length}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-bold text-[#FFF4DB] leading-snug mb-8">
                  {currentQ.question}
                </h3>

                <div className="space-y-3 mb-8">
                  {currentQ.options.map((option, oIdx) => {
                    const isSelected = selectedAnswers[currentQ.id] === oIdx;
                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleSelectQuizOption(oIdx)}
                        className={`w-full text-left p-4 rounded-lg border transition-all cursor-pointer flex items-center justify-between text-xs sm:text-sm ${
                          isSelected
                            ? 'bg-[#781F25]/40 border-[#C9A45C] text-[#FFF4DB] font-medium shadow-md shadow-[#C9A45C]/10'
                            : 'bg-[#493326]/10 border-[#C9A45C]/20 text-[#F2E8D5]/85 hover:border-[#C9A45C]/50 hover:bg-[#493326]/20'
                        }`}
                      >
                        <span>{option}</span>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-3 ${
                            isSelected ? 'border-[#C9A45C] bg-[#C9A45C] text-[#171513]' : 'border-[#C9A45C]/40'
                          }`}
                        >
                          {isSelected && <div className="w-2 h-2 rounded-full bg-[#171513]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#493326]/40">
                  <button
                    onClick={() => setQuizIdx((prev) => Math.max(0, prev - 1))}
                    disabled={quizIdx === 0}
                    className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#F2E8D5]/70 hover:text-[#FFF4DB] disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                  >
                    ← Câu trước
                  </button>

                  {quizIdx < QUIZ_QUESTIONS.length - 1 ? (
                    <button
                      onClick={() => setQuizIdx((prev) => prev + 1)}
                      className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#171513] bg-[#C9A45C] hover:bg-[#E5C07B] rounded cursor-pointer shadow"
                    >
                      <span>Câu tiếp theo</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleFinishQuiz}
                      className="flex items-center gap-1.5 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#FFF4DB] bg-gradient-to-r from-[#781F25] to-[#A32A32] hover:brightness-110 border border-[#C9A45C]/50 rounded cursor-pointer shadow-lg"
                    >
                      <Trophy className="w-4 h-4 text-[#C9A45C]" />
                      <span>Nộp bài & Nhận điểm</span>
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-[#171513] border border-[#C9A45C] rounded-xl p-8 sm:p-10 shadow-2xl text-center font-sans space-y-6">
                <div className="w-16 h-16 rounded-full bg-[#781F25] border border-[#C9A45C] flex items-center justify-center mx-auto text-[#E5C07B]">
                  <Crown className="w-8 h-8" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#FFF4DB]">
                  HOÀN THÀNH BÀI TRẮC NGHIỆM LỊCH SỬ
                </h3>
                <p className="text-xs sm:text-sm text-[#F2E8D5]/80">
                  Điểm thưởng đã được cộng vào kho thành tích của bạn!
                </p>
                <button
                  onClick={handleResetQuiz}
                  className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#171513] bg-[#C9A45C] hover:bg-[#E5C07B] rounded"
                >
                  Làm lại thử thách
                </button>
              </div>
            )}
          </div>
        )}

        {/* 2. TRÒ CHƠI 2: NHẬN DIỆN NHẠC CỤ QUA HÌNH ẢNH */}
        {activeTab === 'visual_challenge' && (
          <div className="max-w-2xl mx-auto bg-[#171513] border border-[#C9A45C]/40 rounded-xl p-6 sm:p-8 shadow-2xl text-center space-y-6 font-sans">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#C9A45C] mb-1">
                Thử thách thị giác · Nhạc cụ {visualIdx + 1}
              </div>
              <h3 className="text-xl font-display font-bold text-[#FFF4DB]">
                NHẬN DIỆN ĐÚNG TÊN NHẠC KHÍ CUNG ĐÌNH
              </h3>
              <p className="text-xs text-[#F2E8D5]/70 mt-1">
                Đúng: +20 điểm kinh nghiệm. Điểm hiện tại: {visualScore} câu đúng.
              </p>
            </div>

            <div className="h-64 rounded-lg overflow-hidden border border-[#C9A45C]/30 relative bg-[#493326]/20">
              <img
                src={INSTRUMENTS_DATA[visualIdx % INSTRUMENTS_DATA.length].image}
                alt="Nhạc khí bí ẩn"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end justify-center p-3">
                <span className="text-xs text-[#FFF4DB] italic">
                  Gợi ý vai trò: {INSTRUMENTS_DATA[visualIdx % INSTRUMENTS_DATA.length].role}
                </span>
              </div>
            </div>

            {/* Multiple Choice Options */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              {[
                INSTRUMENTS_DATA[visualIdx % INSTRUMENTS_DATA.length].name,
                INSTRUMENTS_DATA[(visualIdx + 1) % INSTRUMENTS_DATA.length].name,
                INSTRUMENTS_DATA[(visualIdx + 2) % INSTRUMENTS_DATA.length].name,
                INSTRUMENTS_DATA[(visualIdx + 3) % INSTRUMENTS_DATA.length].name
              ]
                .sort()
                .map((name, idx) => {
                  const correct = INSTRUMENTS_DATA[visualIdx % INSTRUMENTS_DATA.length].name;
                  const isAnswered = visualGuess !== null;
                  const isThisCorrect = name === correct;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleGuessVisual(name)}
                      className={`p-3.5 rounded-lg border transition-all cursor-pointer font-medium ${
                        isAnswered
                          ? isThisCorrect
                            ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-bold'
                            : visualGuess === name
                            ? 'bg-red-950/40 border-red-500 text-red-300'
                            : 'opacity-40 border-neutral-700'
                          : 'bg-[#493326]/20 border-[#C9A45C]/30 text-[#F2E8D5] hover:bg-[#781F25]/30 hover:border-[#C9A45C]'
                      }`}
                    >
                      {name}
                    </button>
                  );
                })}
            </div>

            {visualGuess && (
              <div className="pt-2">
                <button
                  onClick={() => {
                    setVisualGuess(null);
                    setVisualIdx((prev) => prev + 1);
                  }}
                  className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#171513] bg-[#C9A45C] hover:bg-[#E5C07B] rounded cursor-pointer"
                >
                  Nhạc cụ tiếp theo →
                </button>
              </div>
            )}
          </div>
        )}

        {/* 3. TRÒ CHƠI 3: ĐỊNH VỊ KHÔNG GIAN BẢN ĐỒ HUẾ */}
        {activeTab === 'map_quiz' && (
          <div className="max-w-3xl mx-auto bg-[#171513] border border-[#C9A45C]/40 rounded-xl p-6 sm:p-8 shadow-2xl font-sans space-y-6">
            <div className="flex items-center justify-between border-b border-[#C9A45C]/20 pb-3">
              <div>
                <span className="text-xs font-mono uppercase text-[#C9A45C]">
                  Thử thách Bản đồ Di sản · Câu {mapIdx + 1} / {MAP_QUIZ_QUESTIONS.length}
                </span>
                <h3 className="text-lg font-display font-bold text-[#FFF4DB] mt-1">
                  ĐỊNH VỊ ĐỊA DANH GẮN VỚI NHÃ NHẠC
                </h3>
              </div>
              <span className="text-xs font-mono text-[#E5C07B]">Điểm: {mapScore}</span>
            </div>

            <p className="text-sm text-[#F2E8D5]/90 leading-relaxed font-sans font-medium">
              {currentMapQ.question}
            </p>

            <div className="p-3 rounded bg-[#493326]/20 border border-[#C9A45C]/20 text-xs text-[#E5C07B] italic">
              Gợi ý: {currentMapQ.hint}
            </div>

            {/* Choice of Sites */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentMapQ.options.map((opt) => {
                const isSelected = mapSelectedSite !== null;
                const isCorrect = opt.siteId === currentMapQ.targetSiteId;
                return (
                  <button
                    key={opt.siteId}
                    onClick={() => handleSelectMapSite(opt.siteId)}
                    className={`p-3.5 rounded-lg border text-left transition-all cursor-pointer text-xs sm:text-sm flex items-center justify-between ${
                      isSelected
                        ? isCorrect
                          ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-bold'
                          : mapSelectedSite === opt.siteId
                          ? 'bg-red-950/40 border-red-500 text-red-300'
                          : 'opacity-40 border-neutral-700'
                        : 'bg-[#493326]/10 border-[#C9A45C]/30 text-[#F2E8D5] hover:border-[#C9A45C] hover:bg-[#781F25]/20'
                    }`}
                  >
                    <span>{opt.name}</span>
                    <MapPin className="w-4 h-4 text-[#C9A45C]" />
                  </button>
                );
              })}
            </div>

            {mapSelectedSite && (
              <div className="p-4 rounded-lg bg-[#141210] border border-[#C9A45C]/30 space-y-3">
                <div className="text-xs text-[#F2E8D5]/80">
                  <strong>Giải thích lịch sử:</strong> {currentMapQ.explanation}
                </div>
                <button
                  onClick={() => {
                    setMapSelectedSite(null);
                    setMapIdx((prev) => (prev + 1) % MAP_QUIZ_QUESTIONS.length);
                  }}
                  className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[#171513] bg-[#C9A45C] hover:bg-[#E5C07B] rounded cursor-pointer"
                >
                  Câu hỏi địa bàn kế tiếp →
                </button>
              </div>
            )}
          </div>
        )}

        {/* 4. TRÒ CHƠI 4: GHÉP NỐI NHẠC CỤ & VAI TRÒ */}
        {activeTab === 'matching_game' && (
          <div className="max-w-4xl mx-auto bg-[#171513] border border-[#C9A45C]/40 rounded-xl p-6 sm:p-8 shadow-2xl font-sans space-y-6">
            <div className="text-center">
              <span className="text-xs font-mono uppercase text-[#C9A45C]">
                Thử thách Ghép Đôi · Kỹ năng Phân loại
              </span>
              <h3 className="text-2xl font-display font-bold text-[#FFF4DB] mt-1">
                GHÉP NỐI NHẠC CỤ & VAI TRÒ CHUẨN XÁC
              </h3>
              <p className="text-xs text-[#F2E8D5]/70 mt-1">
                Nhấn chọn một nhạc cụ ở cột trái, sau đó nhấn vào vai trò tương ứng ở cột phải. (+30 điểm mỗi cặp đúng).
              </p>
            </div>

            {wrongAttempt && (
              <div className="p-2.5 rounded bg-red-950/40 border border-red-500 text-xs text-red-300 text-center animate-shake">
                Chưa chính xác! Hãy đọc kỹ đặc điểm âm học và phân loại nhạc cụ.
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Instruments */}
              <div className="space-y-2.5">
                <div className="text-xs font-mono uppercase tracking-wider text-[#C9A45C]">
                  Cột A: Tên Nhạc Khí
                </div>
                {MATCHING_PAIRS.map((pair) => {
                  const isMatched = matchedPairs.includes(pair.id);
                  const isSelected = selectedInstrument?.id === pair.id;
                  return (
                    <button
                      key={pair.id}
                      disabled={isMatched}
                      onClick={() => setSelectedInstrument(pair)}
                      className={`w-full text-left p-3.5 rounded-lg border transition-all text-xs sm:text-sm flex items-center justify-between cursor-pointer ${
                        isMatched
                          ? 'opacity-40 bg-emerald-950/20 border-emerald-800 text-emerald-400 line-through'
                          : isSelected
                          ? 'bg-[#781F25] border-[#C9A45C] text-[#FFF4DB] shadow-lg'
                          : 'bg-[#493326]/15 border-[#C9A45C]/30 text-[#F2E8D5] hover:border-[#C9A45C]'
                      }`}
                    >
                      <span className="font-bold">{pair.instrumentName} ({pair.hanViet})</span>
                      <span className="text-[11px] font-mono text-[#E5C07B]">{pair.category}</span>
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Roles */}
              <div className="space-y-2.5">
                <div className="text-xs font-mono uppercase tracking-wider text-[#C9A45C]">
                  Cột B: Vai trò trong Biên chế
                </div>
                {MATCHING_PAIRS.map((pair) => {
                  const isMatched = matchedPairs.includes(pair.id);
                  return (
                    <button
                      key={pair.id}
                      disabled={isMatched || !selectedInstrument}
                      onClick={() => handleMatchAttempt(pair.correctRole)}
                      className={`w-full text-left p-3.5 rounded-lg border transition-all text-xs leading-relaxed cursor-pointer ${
                        isMatched
                          ? 'opacity-40 bg-emerald-950/20 border-emerald-800 text-emerald-400'
                          : 'bg-[#493326]/10 border-[#C9A45C]/30 text-[#F2E8D5]/90 hover:border-[#C9A45C] hover:bg-[#781F25]/20'
                      }`}
                    >
                      {pair.correctRole}
                    </button>
                  );
                })}
              </div>
            </div>

            {matchedPairs.length === MATCHING_PAIRS.length && (
              <div className="p-4 rounded-lg bg-emerald-950/30 border border-emerald-500 text-center space-y-2">
                <div className="text-emerald-400 font-bold text-sm">
                  Xuất sắc! Bạn đã ghép chính xác tất cả các nhạc khí cung đình!
                </div>
                <button
                  onClick={() => setMatchedPairs([])}
                  className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[#171513] bg-[#C9A45C] hover:bg-[#E5C07B] rounded cursor-pointer"
                >
                  Chơi lại ván mới
                </button>
              </div>
            )}
          </div>
        )}

        {/* 5. TAB BẢNG HUY HIỆU & THÀNH TÍCH */}
        {activeTab === 'badges' && (
          <div className="max-w-4xl mx-auto space-y-6 font-sans">
            <div className="text-center">
              <h3 className="text-2xl font-display font-bold text-[#E5C07B]">
                BẢNG VINH DANH DANH VỊ CUNG ĐÌNH
              </h3>
              <p className="text-xs text-[#F2E8D5]/70 mt-1">
                Các danh vị mô phỏng hệ thống phẩm trật và học vị xưa, ghi nhận mức độ am hiểu di sản của bạn.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {HERITAGE_BADGES.map((b) => {
                const isUnlocked = unlockedBadges.includes(b.id) || totalPoints >= b.requiredPoints;
                return (
                  <div
                    key={b.id}
                    className={`p-5 rounded-xl border flex flex-col justify-between text-center transition-all ${
                      isUnlocked
                        ? 'bg-gradient-to-b from-[#781F25]/40 to-[#493326]/30 border-[#C9A45C] shadow-lg'
                        : 'bg-[#171513] border-[#493326]/40 opacity-50'
                    }`}
                  >
                    <div>
                      <div
                        className={`w-14 h-14 rounded-full mx-auto flex items-center justify-center mb-3 border ${
                          isUnlocked
                            ? 'bg-[#C9A45C] text-[#171513] border-[#FFF4DB] shadow-md'
                            : 'bg-neutral-800 text-neutral-500 border-neutral-700'
                        }`}
                      >
                        <Crown className="w-7 h-7" />
                      </div>
                      <h4 className="font-display font-bold text-sm text-[#FFF4DB]">
                        {b.title}
                      </h4>
                      <p className="text-xs text-[#F2E8D5]/70 mt-1.5 leading-relaxed">
                        {b.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-2 border-t border-[#493326]/40 text-[11px] font-mono text-[#E5C07B]">
                      {isUnlocked ? (
                        <span className="text-emerald-400 font-bold flex items-center justify-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Đã mở khóa
                        </span>
                      ) : (
                        `Yêu cầu: ${b.requiredPoints} điểm`
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
