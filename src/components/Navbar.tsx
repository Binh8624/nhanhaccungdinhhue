import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  Landmark,
  Menu,
  X,
  Music,
  ChevronDown,
  BookOpen,
  History,
  Shield,
  HelpCircle,
  FileText,
  MapPin,
  Users2,
  Theater,
  Sparkles,
  Compass,
  Archive,
  Bot,
  Search
} from 'lucide-react';

interface NavbarProps {
  onOpenSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const mainLinks = [
    { label: 'Trang chủ', path: '/' },
    { label: 'Giới thiệu', path: '/gioi-thieu' },
    { label: 'Lịch sử', path: '/lich-su' },
    { label: 'Nhạc cụ', path: '/nhac-cu' },
    { label: 'Biểu diễn', path: '/bieu-dien' },
    { label: 'Địa bàn', path: '/dia-ban' },
    { label: 'Chủ thể', path: '/chu-the' },
  ];

  const secondaryLinks = [
    { label: 'Hành trình Nhập vai', path: '/hanh-trinh-nhap-vai', icon: Compass, desc: 'Mô phỏng một ngày trong cung đình' },
    { label: 'Kho Lưu trữ Di sản', path: '/kho-luu-tru', icon: Archive, desc: 'Văn bản Hán Nôm & bản thu mẫu mực' },
    { label: 'AI Hướng dẫn viên', path: '/huong-dan-vien-ai', icon: Bot, desc: 'Trợ lý hỏi đáp di sản có trích dẫn' },
    { label: 'Trải nghiệm số', path: '/trai-nghiem', icon: Music, desc: 'Phát nhạc ngự, phím ngũ cung, 360°' },
    { label: 'Bảo tồn di sản', path: '/bao-ton', icon: Shield, desc: 'Chiến lược & sáng kiến cho giới trẻ' },
    { label: 'Góc khám phá (4 Game)', path: '/kham-pha', icon: HelpCircle, desc: 'Trắc nghiệm, bản đồ, ghép vai trò' },
    { label: 'Tư liệu & 10 Nguồn', path: '/nguon-tham-khao', icon: FileText, desc: 'Hồ sơ UNESCO & trích dẫn khoa học' },
  ];

  const all14NavItems = [
    { label: '1. Trang chủ', path: '/', icon: Landmark },
    { label: '2. Giới thiệu di sản', path: '/gioi-thieu', icon: BookOpen },
    { label: '3. Lịch sử', path: '/lich-su', icon: History },
    { label: '4. Nhạc cụ', path: '/nhac-cu', icon: Sparkles },
    { label: '5. Loại hình biểu diễn', path: '/bieu-dien', icon: Theater },
    { label: '6. Địa bàn di sản', path: '/dia-ban', icon: MapPin },
    { label: '7. Cộng đồng chủ thể', path: '/chu-the', icon: Users2 },
    { label: '8. Trải nghiệm số', path: '/trai-nghiem', icon: Music },
    { label: '9. Bảo tồn di sản', path: '/bao-ton', icon: Shield },
    { label: '10. Góc khám phá (4 Game)', path: '/kham-pha', icon: HelpCircle },
    { label: '11. Tư liệu & Nguồn tham khảo', path: '/nguon-tham-khao', icon: FileText },
    { label: '12. Hành trình nhập vai hoàng cung', path: '/hanh-trinh-nhap-vai', icon: Compass },
    { label: '13. Kho lưu trữ di sản số', path: '/kho-luu-tru', icon: Archive },
    { label: '14. AI Hướng dẫn viên di sản', path: '/huong-dan-vien-ai', icon: Bot },
  ];

  const isDropdownActive = secondaryLinks.some((item) => location.pathname === item.path);

  return (
    <header className="sticky top-0 z-50 bg-[#171513]/95 backdrop-blur-md border-b border-[#C9A45C]/30 text-[#F2E8D5] transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-20">
          {/* Logo & Brand Wordmark */}
          <Link
            to="/"
            className="flex items-center gap-3 group text-[#C9A45C] hover:text-[#E5C07B] transition-colors whitespace-nowrap shrink-0"
          >
            <div className="w-10 h-10 rounded-full border border-[#C9A45C]/60 flex items-center justify-center bg-[#781F25]/50 group-hover:bg-[#781F25]/80 transition-all shadow-inner">
              <Landmark className="w-5 h-5 text-[#C9A45C]" />
            </div>
            <div className="flex flex-col">
              <span className="font-royal text-base sm:text-lg font-bold tracking-wider text-[#C9A45C]">
                NHÃ NHẠC CUNG ĐÌNH HUẾ
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#F2E8D5]/60 font-sans -mt-0.5">
                Bảo tàng Di sản Số · UNESCO
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-3.5 xl:gap-5 text-xs xl:text-sm font-medium text-[#F2E8D5]/80 font-sans">
            {mainLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `py-1.5 transition-colors whitespace-nowrap border-b-2 ${
                    isActive
                      ? 'text-[#E5C07B] font-semibold border-[#C9A45C]'
                      : 'border-transparent text-[#F2E8D5]/75 hover:text-[#C9A45C]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {/* Dropdown for Specialized Halls */}
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1 py-1.5 transition-colors whitespace-nowrap border-b-2 cursor-pointer ${
                  isDropdownActive
                    ? 'text-[#E5C07B] font-semibold border-[#C9A45C]'
                    : 'border-transparent text-[#F2E8D5]/75 hover:text-[#C9A45C]'
                }`}
                aria-expanded={dropdownOpen}
              >
                <span>Chuyên đề & Trải nghiệm</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? 'rotate-180 text-[#C9A45C]' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-1 w-72 bg-[#171513] border border-[#C9A45C]/40 rounded-xl shadow-2xl py-2 z-50 divide-y divide-[#493326]/40">
                  {secondaryLinks.map((item) => {
                    const Icon = item.icon;
                    const active = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setDropdownOpen(false)}
                        className={`flex items-start gap-3 px-4 py-2.5 transition-colors ${
                          active
                            ? 'bg-[#781F25]/30 text-[#E5C07B]'
                            : 'hover:bg-[#493326]/20 text-[#F2E8D5]/85 hover:text-[#FFF4DB]'
                        }`}
                      >
                        <Icon className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-semibold">{item.label}</div>
                          <div className="text-[10px] text-[#F2E8D5]/50 font-sans">{item.desc}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Quick Actions & Mobile Toggle */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Global Search Button */}
            {onOpenSearch && (
              <button
                onClick={onOpenSearch}
                className="p-2 text-[#C9A45C] hover:text-[#FFF4DB] rounded-full border border-[#C9A45C]/30 hover:border-[#C9A45C] transition-colors"
                title="Tìm kiếm toàn bảo tàng (Ctrl+K)"
              >
                <Search className="w-4 h-4" />
              </button>
            )}

            {/* Quick Immersive Button */}
            <Link
              to="/hanh-trinh-nhap-vai"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#171513] bg-gradient-to-r from-[#C9A45C] to-[#E5C07B] hover:brightness-110 active:scale-95 transition-all rounded shadow-md whitespace-nowrap shrink-0"
            >
              <Compass className="w-3.5 h-3.5 text-[#171513]" />
              <span>Nhập vai Cung đình</span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#C9A45C] hover:text-[#F2E8D5] rounded border border-[#C9A45C]/30 focus:outline-none"
              aria-label="Mở menu điều hướng"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#171513] border-b border-[#C9A45C]/30 px-6 py-4 space-y-1.5 max-h-[80vh] overflow-y-auto font-sans">
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#C9A45C] mb-2 px-1">
            Hệ thống 14 Chuyên trang & Phòng trưng bày
          </div>
          {all14NavItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 text-xs sm:text-sm font-medium py-2 px-3 rounded transition-colors ${
                  active
                    ? 'bg-[#781F25]/40 text-[#E5C07B] border border-[#C9A45C]/40 font-semibold'
                    : 'text-[#F2E8D5]/80 hover:text-[#C9A45C] hover:bg-[#493326]/20'
                }`}
              >
                <Icon className="w-4 h-4 text-[#C9A45C]" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
