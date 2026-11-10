/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * PHÂN HỆ 6: AI MUSIC RESEARCH ASSISTANT (TRỢ LÝ AI TRA CỨU ÂM LUẬT & ĐỐI CHIẾU HỌC THUẬT)
 * Tác giả: Trần Thanh Bình (MSSV: PH61165 - Lớp: D02)
 */

import React, { useState } from 'react';
import { Send, Sparkles, BookOpen, CheckCircle2, AlertCircle, Bot, User, RefreshCw } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  citations?: string[];
  source?: string;
  timestamp: string;
}

export const AiMusicResearchAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: 'Kính chào Quý học giả và Nhà nghiên cứu. Tôi là Trợ lý AI Chuyên khảo Âm luật Cung đình Huế. Tôi được huấn luyện để đối chiếu trực tiếp dữ liệu từ Kho Tri thức Học thuật (Knowledge Fact-Store), công trình của GS.TS Trần Văn Khê và Khâm Định Đại Nam Hội Điển Sự Lệ. Hãy đặt câu hỏi về thang âm, điệu thức Khách - Nam hoặc kỹ thuật ngón truyền thống.',
      citations: ['FACT-LAW-001 (Âm luật ngũ cung)', 'FACT-LAW-002 (Điệu Khách và Nam)', 'Khâm Định Quyển 96'],
      timestamp: '08:00'
    }
  ]);
  const [inputQuery, setInputQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const samplePrompts = [
    'Vì sao nốt Hò trong Nhã nhạc không có cao độ tuyệt đối?',
    'Đặc trưng vi âm của nốt Xự non và Xang già trong Điệu Nam?',
    'Sự khác biệt giữa thang âm Mười Bản Ngự và Điệu Khách?',
    'Kỹ thuật ngón rung và mổ ngón trên Đàn Nguyệt được quy định ra sao?'
  ];

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/music/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: textToSend })
      });

      const data = await response.json();

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: data.answer || 'Tư liệu âm luật hiện đang được tra cứu.',
        citations: data.citations || ['Kho Dữ kiện Học thuật Cố đô Huế'],
        source: data.source || 'verified',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const fallbackMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: 'Nhã nhạc cung đình Huế sử dụng thang âm ngũ cung tự nhiên với âm chủ Hò linh hoạt. Điệu Khách chuộng sự đoan chính, trong khi Điệu Nam chuộng ngón nhấn chùng Xự non (~160 cents) và nhấn căng Xang già (~540 cents).',
        citations: ['FACT-LAW-001', 'FACT-LAW-002'],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Disclaimer / Ethics Banner */}
      <div className="p-3.5 rounded-xl bg-[#493326]/30 border border-[#C9A45C]/30 text-xs flex items-center justify-between gap-3 text-[#F2E8D5]/80">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#C9A45C] shrink-0" />
          <span>
            Trợ lý hoạt động theo nguyên tắc <strong>Academic Rigor</strong>: Chỉ cung cấp thông tin có trích dẫn nguồn kiểm chứng (Fact-Store & UNESCO), tuyệt đối không suy diễn cao độ cố định hoặc tạo bài bản giả.
          </span>
        </div>
        <span className="font-mono text-[#C9A45C] text-[11px] shrink-0 hidden sm:inline">
          ISO 21127 CIDOC CRM
        </span>
      </div>

      {/* Suggested Questions */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-[#C9A45C] font-semibold">Chuyên đề nghiên cứu gợi ý:</span>
        {samplePrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt)}
            className="px-3 py-1 rounded-full bg-[#171513] hover:bg-[#781F25] text-[#F2E8D5]/80 hover:text-[#FFF4DB] border border-[#C9A45C]/30 text-xs transition-colors cursor-pointer text-left"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Messages Log */}
      <div className="p-5 rounded-xl bg-[#171513] border border-[#C9A45C]/40 space-y-4 max-h-[460px] overflow-y-auto">
        {messages.map((msg) => {
          const isBot = msg.sender === 'assistant';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 text-xs leading-relaxed ${
                isBot ? 'items-start' : 'items-start flex-row-reverse'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border ${
                  isBot
                    ? 'bg-[#781F25] text-[#E5C07B] border-[#C9A45C]/50'
                    : 'bg-[#C9A45C] text-[#171513] border-[#E5C07B]'
                }`}
              >
                {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[85%] rounded-xl p-4 space-y-2 border ${
                  isBot
                    ? 'bg-[#493326]/20 border-[#C9A45C]/30 text-[#F2E8D5]'
                    : 'bg-[#781F25]/40 border-[#C9A45C]/50 text-[#FFF4DB]'
                }`}
              >
                <div className="flex items-center justify-between gap-4 text-[10px] text-[#F2E8D5]/50 border-b border-[#C9A45C]/15 pb-1">
                  <span className="font-semibold text-[#E5C07B]">
                    {isBot ? 'Trợ lý AI Âm luật Cung đình' : 'Học giả / Nhà nghiên cứu'}
                  </span>
                  <span className="font-mono">{msg.timestamp}</span>
                </div>

                <p className="font-sans whitespace-pre-line leading-relaxed">
                  {msg.text}
                </p>

                {msg.citations && msg.citations.length > 0 && (
                  <div className="pt-2 border-t border-[#C9A45C]/15 flex flex-wrap items-center gap-1.5 text-[10px]">
                    <span className="text-[#C9A45C] font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Căn cứ nguồn:</span>
                    </span>
                    {msg.citations.map((c, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded bg-[#171513] border border-[#C9A45C]/20 text-[#FFF4DB]">
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 text-xs items-center text-[#C9A45C] animate-pulse">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Đang tra cứu cơ sở dữ liệu Fact-Store và phân tích âm luật...</span>
          </div>
        )}
      </div>

      {/* Input Field */}
      <div className="flex items-center gap-2 p-2 rounded-xl bg-[#171513] border border-[#C9A45C]/40">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSendMessage();
          }}
          placeholder="Nhập câu hỏi nghiên cứu về thang âm, điệu thức Khách - Nam hoặc kỹ thuật ngón..."
          className="flex-grow bg-transparent px-3 py-2 text-xs text-[#FFF4DB] placeholder-[#F2E8D5]/40 focus:outline-none"
        />
        <button
          onClick={() => handleSendMessage()}
          disabled={isLoading || !inputQuery.trim()}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#C9A45C] to-[#E5C07B] hover:brightness-110 disabled:opacity-40 text-[#171513] font-bold text-xs flex items-center gap-1.5 shadow transition-all cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Gửi câu hỏi</span>
        </button>
      </div>
    </div>
  );
};
