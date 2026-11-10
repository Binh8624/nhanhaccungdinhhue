import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from '../components/Breadcrumb';
import {
  Sparkles,
  Send,
  Bot,
  User,
  BookOpen,
  ExternalLink,
  ShieldCheck,
  RotateCcw,
  Volume2
} from 'lucide-react';
import { SUGGESTED_QUESTIONS, ChatMessage, askHeritageAi } from '../utils/aiHeritageKnowledge';

export const AiGuidePage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Kính chào Quý khách! Tôi là Trợ lý Hướng dẫn viên Di sản Số về Nhã nhạc Cung đình Huế. Tôi được lập trình dựa trên các nguồn tư liệu khoa học chính thống từ UNESCO, Trung tâm Bảo tồn Di tích Cố đô Huế, và các công trình của Cố GS.TS Trần Văn Khê.\n\nQuý khách có thể hỏi về lịch sử, nhạc cụ, trang phục, các điệu múa hoặc các điển lễ hoàng triều. Tôi luôn trích dẫn nguồn kiểm chứng sau mỗi câu trả lời.',
      citations: ['Hồ sơ UNESCO Nha Nhac RL 00074 [1]', 'Trung tâm Bảo tồn Di tích Cố đô Huế [4]'],
      timestamp: 'Hiện tại'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (questionText?: string) => {
    const textToSend = questionText || inputValue.trim();
    if (!textToSend || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const result = await askHeritageAi(textToSend);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: result.text,
        citations: result.citations,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'ai',
        text: 'Xin lỗi quý khách, hệ thống đang xử lý dữ liệu. Vui lòng thử lại sau giây lát hoặc chọn các câu hỏi gợi ý bên dưới.',
        citations: ['Trung tâm Bảo tồn Di tích Cố đô Huế [4]'],
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'ai',
        text: 'Lịch sử trò chuyện đã được làm mới. Quý khách muốn khám phá khía cạnh nào của Nhã nhạc cung đình Huế?',
        citations: ['Hồ sơ UNESCO Nha Nhac RL 00074 [1]'],
        timestamp: 'Hiện tại'
      }
    ]);
  };

  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);

  // Voice reading of AI response using Web Speech API with active feedback
  const handleSpeak = (msgId: string, text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Trình duyệt của bạn hiện không hỗ trợ tính năng Web Speech API tổng hợp giọng nói tiếng Việt.');
      return;
    }

    if (speakingMsgId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'vi-VN';
    utterance.rate = 0.95;

    utterance.onend = () => {
      setSpeakingMsgId(null);
    };
    utterance.onerror = () => {
      setSpeakingMsgId(null);
    };

    setSpeakingMsgId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="bg-[#171513] text-[#F2E8D5] min-h-screen py-6">
      <Breadcrumb items={[{ label: 'AI Hướng dẫn viên Di sản' }]} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C9A45C] mb-2">
            <Sparkles className="w-4 h-4 text-[#C9A45C]" />
            <span>Trợ Lý Hỏi Đáp Di Sản Có Căn Cứ Khoa Học</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-display text-[#FFF4DB]">
            AI HƯỚNG DẪN VIÊN DI SẢN
          </h1>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#C9A45C] to-transparent mx-auto mt-4" />
          <p className="mt-4 text-xs sm:text-sm text-[#F2E8D5]/80 font-sans leading-relaxed">
            Hỏi đáp trực tiếp về lịch sử, nhạc cụ, trang phục và điển lễ Nhã nhạc. Câu trả lời bám sát tư liệu gốc của UNESCO và Cố đô Huế, có dẫn nguồn kiểm chứng rõ ràng.
          </p>
        </div>

        {/* Chat Console Frame */}
        <div className="bg-[#171513] border border-[#C9A45C]/50 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[650px] font-sans">
          {/* Top Bar of Chat */}
          <div className="px-6 py-4 bg-[#493326]/20 border-b border-[#C9A45C]/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#781F25] border border-[#C9A45C] flex items-center justify-center text-[#E5C07B]">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-display font-bold text-[#FFF4DB]">
                  Hướng Dẫn Viên Hoàng Cung Huế
                </div>
                <div className="text-[10px] text-[#E5C07B] font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Kho tri thức kiểm chứng nội bộ (UNESCO & Cố đô Huế) · Cam kết không bịa đặt</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleClearHistory}
              className="text-xs text-[#F2E8D5]/60 hover:text-[#C9A45C] flex items-center gap-1 px-2.5 py-1 rounded border border-[#C9A45C]/20 hover:border-[#C9A45C]/50 transition-colors"
              title="Làm mới cuộc trò chuyện"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Làm mới</span>
            </button>
          </div>

          {/* Messages Viewport */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-[#141210]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${
                    msg.sender === 'user'
                      ? 'bg-[#C9A45C] text-[#171513]'
                      : 'bg-[#781F25] text-[#FFF4DB] border border-[#C9A45C]/50'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`p-4 rounded-xl text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#C9A45C]/20 border border-[#C9A45C]/40 text-[#FFF4DB]'
                      : 'bg-[#171513] border border-[#C9A45C]/30 text-[#F2E8D5]/90 shadow-md'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Audio read button & Citations */}
                  {msg.sender === 'ai' && (
                    <div className="mt-3 pt-2.5 border-t border-[#493326]/40 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                      <button
                        onClick={() => handleSpeak(msg.id, msg.text)}
                        className={`flex items-center gap-1 cursor-pointer transition-colors ${
                          speakingMsgId === msg.id ? 'text-[#FFF4DB] font-bold animate-pulse' : 'text-[#C9A45C] hover:text-[#E5C07B]'
                        }`}
                        title={speakingMsgId === msg.id ? 'Nhấn để dừng đọc' : 'Đọc bằng giọng nói'}
                      >
                        <Volume2 className={`w-3.5 h-3.5 ${speakingMsgId === msg.id ? 'text-[#E5C07B]' : ''}`} />
                        <span>{speakingMsgId === msg.id ? 'Đang đọc (nhấn dừng)...' : 'Nghe đọc lời dẫn'}</span>
                      </button>

                      {msg.citations && msg.citations.length > 0 && (
                        <div className="text-[#E5C07B] italic font-serif flex items-center gap-1">
                          <BookOpen className="w-3 h-3 text-[#C9A45C]" />
                          <span>Nguồn: {msg.citations.join(', ')}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 max-w-[85%] mr-auto items-center text-xs text-[#C9A45C]">
                <div className="w-8 h-8 rounded-full bg-[#781F25] border border-[#C9A45C]/50 flex items-center justify-center text-[#FFF4DB]">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3 rounded-lg bg-[#171513] border border-[#C9A45C]/30 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#C9A45C] animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-[#C9A45C] animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 rounded-full bg-[#C9A45C] animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px] text-[#F2E8D5]/60 ml-2">Đang tra cứu tư liệu hoàng cung...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions Pills */}
          <div className="px-4 py-2.5 bg-[#171513] border-t border-[#493326]/40 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[11px] font-mono text-[#C9A45C] whitespace-nowrap shrink-0">
              Gợi ý câu hỏi:
            </span>
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                disabled={isLoading}
                className="px-2.5 py-1 rounded text-xs bg-[#493326]/20 border border-[#C9A45C]/30 text-[#F2E8D5]/80 hover:text-[#FFF4DB] hover:bg-[#781F25]/30 hover:border-[#C9A45C] transition-all whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-4 bg-[#171513] border-t border-[#C9A45C]/30">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Đặt câu hỏi về Nhã nhạc cung đình Huế (ví dụ: vai trò Kèn Bầu, Đàn Nam Giao, Lương Đăng)..."
                disabled={isLoading}
                className="flex-1 bg-[#493326]/20 border border-[#C9A45C]/40 rounded-lg px-4 py-3 text-xs sm:text-sm text-[#FFF4DB] placeholder-[#F2E8D5]/40 focus:outline-none focus:border-[#C9A45C]"
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="px-5 py-3 rounded-lg bg-gradient-to-r from-[#C9A45C] to-[#E5C07B] text-[#171513] font-semibold text-xs sm:text-sm uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all disabled:opacity-40 disabled:pointer-events-none cursor-pointer flex items-center gap-1.5 shadow"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Gửi</span>
              </button>
            </form>
          </div>
        </div>

        {/* Verification Guarantee Box */}
        <div className="p-4 rounded-lg bg-[#493326]/15 border border-[#C9A45C]/30 text-xs text-[#F2E8D5]/75 flex items-center justify-between gap-4 font-sans">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C9A45C] shrink-0" />
            <span>
              Cam kết tính trung thực: Mọi câu trả lời đều dựa trên kho dữ liệu của Cố đô Huế và hồ sơ UNESCO. Không suy diễn hoặc tạo lập nhân vật giả.
            </span>
          </div>
          <Link to="/nguon-tham-khao" className="text-[#C9A45C] hover:text-[#E5C07B] shrink-0 font-semibold flex items-center gap-1">
            <span>Tra cứu 10 nguồn</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </main>
    </div>
  );
};
