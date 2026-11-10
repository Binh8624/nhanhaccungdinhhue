import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Landmark, Music, MapPin, History, FileText, Theater, Sparkles } from 'lucide-react';
import { INSTRUMENTS_DATA, HERITAGE_SITES, PERFORMANCE_FORMS, HISTORY_TIMELINE } from '../data/heritageData';
import { ARCHIVE_ITEMS } from '../data/archiveData';

interface SearchResult {
  title: string;
  category: string;
  description: string;
  path: string;
  icon: any;
}

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Build searchable index
  const allSearchableItems: SearchResult[] = [
    // Pages
    { title: 'Giới thiệu Di sản', category: 'Chuyên trang', description: 'Khái niệm Nhã nhạc, nguồn gốc, thang âm ngũ cung và giá trị UNESCO.', path: '/gioi-thieu', icon: Landmark },
    { title: 'Dòng chảy Lịch sử', category: 'Chuyên trang', description: 'Biên niên sử từ thời Lý - Trần qua triều Nguyễn đến hôm nay.', path: '/lich-su', icon: History },
    { title: 'Hệ thống Nhạc cụ', category: 'Chuyên trang', description: 'Thư viện khí nhạc cung đình, âm sắc ngũ cung và vai trò.', path: '/nhac-cu', icon: Music },
    { title: 'Loại hình Biểu diễn', category: 'Chuyên trang', description: 'Nhạc lễ Giao, Miếu, Đại triều và các vũ khúc cung đình.', path: '/bieu-dien', icon: Theater },
    { title: 'Địa bàn Di sản', category: 'Chuyên trang', description: 'Bản đồ di tích cố đô Huế: Duyệt Thị Đường, Điện Thái Hòa, Đàn Nam Giao.', path: '/dia-ban', icon: MapPin },
    { title: 'Cộng đồng Chủ thể', category: 'Chuyên trang', description: 'Nghệ nhân Lữ Hữu Thi, Trần Kích và thế hệ kế cận.', path: '/chu-the', icon: Sparkles },
    { title: 'Không gian Trải nghiệm Số', category: 'Chuyên trang', description: 'Trình phát âm thanh, bàn gõ ngũ cung, ảnh và không gian 360°.', path: '/trai-nghiem', icon: Music },
    { title: 'Bảo tồn & Phát huy Di sản', category: 'Chuyên trang', description: 'Chiến lược bảo tồn, nguy cơ mai một và đề xuất cho giới trẻ.', path: '/bao-ton', icon: Landmark },
    { title: 'Góc Khám phá & 4 Trò chơi', category: 'Chuyên trang', description: 'Trắc nghiệm lịch sử, ghép nối nhạc cụ, định vị bản đồ và thẻ flashcards.', path: '/kham-pha', icon: Sparkles },
    { title: 'Tư liệu & 10 Nguồn tham khảo', category: 'Chuyên trang', description: 'Hồ sơ UNESCO, Khâm Định Hội Điển, Cục Di sản và công trình Trần Văn Khê.', path: '/nguon-tham-khao', icon: FileText },
    { title: 'Hành trình Nhập vai Cung đình', category: 'Chuyên đề', description: 'Trải nghiệm một ngày trong không gian cung đình triều Nguyễn.', path: '/hanh-trinh-nhap-vai', icon: Landmark },
    { title: 'Kho Lưu trữ Di sản Số', category: 'Chuyên đề', description: 'Tra cứu văn bản Hán Nôm, bản thu mẫu mực, ghi hình phục dựng.', path: '/kho-luu-tru', icon: FileText },
    { title: 'AI Hướng dẫn viên Di sản', category: 'Chuyên đề', description: 'Trợ lý thông minh giải đáp câu hỏi về văn hóa Nhã nhạc có trích dẫn.', path: '/huong-dan-vien-ai', icon: Sparkles },

    // Instruments
    ...INSTRUMENTS_DATA.map((inst) => ({
      title: `${inst.name} (${inst.hanViet})`,
      category: `Nhạc cụ · ${inst.category}`,
      description: `${inst.role}. Thang âm: ${inst.pentatonicNotes.join(', ')}`,
      path: '/nhac-cu',
      icon: Music
    })),

    // Sites
    ...HERITAGE_SITES.map((site) => ({
      title: site.name,
      category: `Địa bàn · ${site.type}`,
      description: `${site.location} (Khởi dựng: ${site.builtYear}) - ${site.historicalRole}`,
      path: '/dia-ban',
      icon: MapPin
    })),

    // Performances
    ...PERFORMANCE_FORMS.map((form) => ({
      title: form.title,
      category: `Biểu diễn · ${form.category}`,
      description: form.meaning,
      path: '/bieu-dien',
      icon: Theater
    })),

    // Archive
    ...ARCHIVE_ITEMS.map((arc) => ({
      title: arc.title,
      category: `Lưu trữ · ${arc.category}`,
      description: `${arc.era} - ${arc.authorOrSource}`,
      path: '/kho-luu-tru',
      icon: FileText
    }))
  ];

  const searchResults = query.trim()
    ? allSearchableItems.filter((item) => {
        const text = `${item.title} ${item.category} ${item.description}`.toLowerCase();
        return text.includes(query.toLowerCase());
      })
    : allSearchableItems.slice(0, 6);

  const handleSelect = (path: string) => {
    onClose();
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#171513] border border-[#C9A45C]/50 rounded-xl shadow-2xl overflow-hidden font-sans">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#C9A45C]/30 bg-[#493326]/20">
          <Search className="w-5 h-5 text-[#C9A45C]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm kiếm nhạc cụ, địa điểm, sự kiện, nghi lễ, tư liệu..."
            autoFocus
            className="w-full bg-transparent text-[#FFF4DB] placeholder-[#F2E8D5]/50 text-sm focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#F2E8D5]/60 hover:text-[#FFF4DB]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 rounded text-[11px] font-mono text-[#E5C07B] bg-[#171513] border border-[#C9A45C]/30"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-1 divide-y divide-[#493326]/30">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#C9A45C] px-2 py-1">
            {query.trim() ? `Kết quả tìm kiếm (${searchResults.length})` : 'Gợi ý chuyên mục phổ biến'}
          </div>

          {searchResults.length > 0 ? (
            searchResults.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(item.path)}
                  className="w-full text-left p-3 rounded-lg hover:bg-[#781F25]/25 border border-transparent hover:border-[#C9A45C]/40 transition-colors flex items-start gap-3 cursor-pointer group"
                >
                  <div className="w-8 h-8 rounded-full bg-[#781F25]/40 border border-[#C9A45C]/40 flex items-center justify-center shrink-0 text-[#C9A45C] group-hover:bg-[#C9A45C] group-hover:text-[#171513] transition-colors mt-0.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-display font-bold text-[#FFF4DB] group-hover:text-[#E5C07B] truncate">
                        {item.title}
                      </span>
                      <span className="text-[10px] font-mono text-[#C9A45C] shrink-0 bg-[#493326]/40 px-1.5 py-0.5 rounded">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-[#F2E8D5]/70 line-clamp-1 mt-0.5">
                      {item.description}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#C9A45C]/50 group-hover:text-[#C9A45C] group-hover:translate-x-1 transition-all shrink-0 mt-2" />
                </button>
              );
            })
          ) : (
            <div className="text-center py-8 text-xs text-[#F2E8D5]/60">
              Không tìm thấy kết quả phù hợp với từ khóa "{query}". Hãy thử tìm: "kèn bầu", "duyệt thị đường", "ngũ cung", "lục cúng hoa đăng"...
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-[#12100e] border-t border-[#493326]/50 flex items-center justify-between text-[11px] text-[#F2E8D5]/50">
          <span>Tìm kiếm dữ liệu di sản số có căn cứ</span>
          <span className="font-mono text-[#C9A45C]">Phím tắt: Ctrl + K / Cmd + K</span>
        </div>
      </div>
    </div>
  );
};
