import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Bookmark, Share2, Type, Search, Check, Sparkles, X } from 'lucide-react';
import { courtAudioEngine } from '../utils/audioEngine';

interface AccessibilityToolbarProps {
  onOpenSearch: () => void;
}

export const AccessibilityToolbar: React.FC<AccessibilityToolbarProps> = ({ onOpenSearch }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [fontSizeLevel, setFontSizeLevel] = useState<'normal' | 'large' | 'larger'>('normal');
  const [isAmbiencePlaying, setIsAmbiencePlaying] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [bookmarksOpen, setBookmarksOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState<{ title: string; url: string; time: string }[]>([]);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load bookmarks
  useEffect(() => {
    try {
      const stored = localStorage.getItem('nhanhac_bookmarks');
      if (stored) {
        setBookmarks(JSON.parse(stored));
      }
    } catch (e) {
      // ignore
    }
  }, []);

  // Handle Font Size changes on document
  const toggleFontSize = () => {
    const doc = document.documentElement;
    if (fontSizeLevel === 'normal') {
      setFontSizeLevel('large');
      doc.style.fontSize = '17px';
    } else if (fontSizeLevel === 'large') {
      setFontSizeLevel('larger');
      doc.style.fontSize = '18.5px';
    } else {
      setFontSizeLevel('normal');
      doc.style.fontSize = '16px';
    }
  };

  // Toggle Calm Imperial Court Ambiance (Web Audio synthesized gong/chime, default OFF)
  const toggleAmbience = () => {
    if (isAmbiencePlaying) {
      courtAudioEngine.stop();
      setIsAmbiencePlaying(false);
    } else {
      // Play a soft recurring court gong & pentatonic bell sequence
      courtAudioEngine.playTrack('ambience-court', [261, 330, 392, 523]);
      setIsAmbiencePlaying(true);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  const handleAddBookmark = () => {
    const newBookmark = {
      title: document.title || 'Nhã Nhạc Cung Đình Huế',
      url: window.location.hash || '#/',
      time: new Date().toLocaleDateString('vi-VN')
    };
    const updated = [newBookmark, ...bookmarks.filter(b => b.url !== newBookmark.url)].slice(0, 10);
    setBookmarks(updated);
    try {
      localStorage.setItem('nhanhac_bookmarks', JSON.stringify(updated));
    } catch (e) {}
    setBookmarksOpen(true);
  };

  const handleRemoveBookmark = (url: string) => {
    const updated = bookmarks.filter(b => b.url !== url);
    setBookmarks(updated);
    try {
      localStorage.setItem('nhanhac_bookmarks', JSON.stringify(updated));
    } catch (e) {}
  };

  return (
    <>
      {/* 1. Thin Royal Scroll Progress Bar at the absolute top */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-[#171513]/40 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#781F25] via-[#C9A45C] to-[#E5C07B] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* 2. Floating Museum Utility Bar (Desktop: Bottom Left / Mobile: Bottom Compact) */}
      <div className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-2 p-1.5 rounded-full bg-[#171513]/90 border border-[#C9A45C]/40 backdrop-blur-md shadow-2xl text-xs font-sans">
        {/* Quick Search Trigger */}
        <button
          onClick={onOpenSearch}
          className="p-2 rounded-full text-[#C9A45C] hover:text-[#FFF4DB] hover:bg-[#781F25]/40 transition-colors"
          title="Tìm kiếm toàn bảo tàng (Ctrl+K)"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Font size adjuster */}
        <button
          onClick={toggleFontSize}
          className="px-2.5 py-1 rounded-full text-[#E5C07B] hover:bg-[#781F25]/40 transition-colors font-mono font-bold flex items-center gap-1"
          title="Tăng/Giảm cỡ chữ"
        >
          <Type className="w-3.5 h-3.5 text-[#C9A45C]" />
          <span>{fontSizeLevel === 'normal' ? 'A' : fontSizeLevel === 'large' ? 'A+' : 'A++'}</span>
        </button>

        {/* Court Ambience Sound Toggle (Default OFF) */}
        <button
          onClick={toggleAmbience}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all cursor-pointer ${
            isAmbiencePlaying
              ? 'bg-[#781F25] text-[#FFF4DB] border border-[#C9A45C]'
              : 'text-[#F2E8D5]/70 hover:text-[#C9A45C] hover:bg-[#493326]/30'
          }`}
          title={isAmbiencePlaying ? 'Tắt âm hưởng nhã nhạc nền' : 'Bật âm hưởng nhã nhạc nền mô phỏng Web Audio API (Mặc định tắt)'}
        >
          {isAmbiencePlaying ? <Volume2 className="w-3.5 h-3.5 text-[#E5C07B] animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span className="text-[11px] font-mono">{isAmbiencePlaying ? 'Nhạc nền: Bật' : 'Nhạc nền'}</span>
        </button>

        {/* Bookmark page */}
        <button
          onClick={handleAddBookmark}
          className="p-2 rounded-full text-[#C9A45C] hover:text-[#FFF4DB] hover:bg-[#781F25]/40 transition-colors"
          title="Lưu trang vào mục yêu thích"
        >
          <Bookmark className="w-4 h-4" />
        </button>

        {/* Share page */}
        <button
          onClick={handleShare}
          className="p-2 rounded-full text-[#C9A45C] hover:text-[#FFF4DB] hover:bg-[#781F25]/40 transition-colors relative"
          title="Sao chép đường dẫn chia sẻ"
        >
          {copiedNotification ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Copied Toast Alert */}
      {copiedNotification && (
        <div className="fixed bottom-20 left-6 z-50 px-4 py-2 rounded-lg bg-[#781F25] border border-[#C9A45C] text-xs font-semibold text-[#FFF4DB] shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Đã sao chép liên kết trang vào bộ nhớ tạm!</span>
        </div>
      )}

      {/* Bookmarks Drawer Modal */}
      {bookmarksOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-[#171513] border border-[#C9A45C]/50 rounded-lg p-6 shadow-2xl font-sans">
            <button
              onClick={() => setBookmarksOpen(false)}
              className="absolute top-4 right-4 p-1 text-[#F2E8D5]/60 hover:text-[#FFF4DB]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C9A45C] mb-2">
              <Bookmark className="w-4 h-4 text-[#C9A45C]" />
              <span>Mục Yêu Thích Đã Lưu Trên Thiết Bị</span>
            </div>
            <h3 className="text-xl font-display font-bold text-[#FFF4DB] mb-4">
              DANH MỤC TRANG ĐÃ LƯU
            </h3>

            {bookmarks.length > 0 ? (
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1 divide-y divide-[#493326]/30">
                {bookmarks.map((bm, idx) => (
                  <div key={idx} className="pt-2 flex items-center justify-between gap-3 text-xs">
                    <div>
                      <a
                        href={bm.url}
                        onClick={() => setBookmarksOpen(false)}
                        className="font-display font-bold text-[#E5C07B] hover:underline line-clamp-1"
                      >
                        {bm.title}
                      </a>
                      <span className="text-[10px] text-[#F2E8D5]/50">Đã lưu: {bm.time}</span>
                    </div>
                    <button
                      onClick={() => handleRemoveBookmark(bm.url)}
                      className="text-red-400 hover:text-red-300 text-[10px] shrink-0"
                    >
                      Xóa
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#F2E8D5]/70 py-4">
                Chưa có mục nào được lưu. Hãy nhấn biểu tượng Bookmark trên thanh công cụ để lưu các trang yêu thích.
              </p>
            )}

            <div className="mt-6 pt-3 border-t border-[#493326]/40 flex justify-end">
              <button
                onClick={() => setBookmarksOpen(false)}
                className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#171513] bg-[#C9A45C] hover:bg-[#E5C07B] rounded"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
