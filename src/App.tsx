/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Website: NHÃ NHẠC CUNG ĐÌNH HUẾ – Âm vang nghìn năm, hồn thiêng cố đô
 * Tác giả: Trần Thanh Bình - MSSV: PH61165 - Lớp: D02
 * Khu vực nghiên cứu: Bắc Trung Bộ | Địa bàn trọng tâm: Thành phố Huế, Việt Nam
 * Kiến trúc: Multi-Page Digital Museum với React Router (11 trang riêng biệt)
 */

import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { AccessibilityToolbar } from './components/AccessibilityToolbar';
import { GlobalSearchModal } from './components/GlobalSearchModal';

// 14 Specialized Digital Museum Pages
import { HomePage } from './pages/HomePage';
import { IntroductionPage } from './pages/IntroductionPage';
import { HistoryPage } from './pages/HistoryPage';
import { InstrumentsPage } from './pages/InstrumentsPage';
import { PerformancesPage } from './pages/PerformancesPage';
import { HeritageSitesPage } from './pages/HeritageSitesPage';
import { CommunityPage } from './pages/CommunityPage';
import { DigitalExperiencePage } from './pages/DigitalExperiencePage';
import { ConservationPage } from './pages/ConservationPage';
import { QuizDiscoveryPage } from './pages/QuizDiscoveryPage';
import { ReferencesPage } from './pages/ReferencesPage';
import { ImmersiveJourneyPage } from './pages/ImmersiveJourneyPage';
import { ArchivePage } from './pages/ArchivePage';
import { AiGuidePage } from './pages/AiGuidePage';
import { NotFoundPage } from './pages/NotFoundPage';

import { ChevronUp } from 'lucide-react';

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-[#171513] text-[#F2E8D5] flex flex-col selection:bg-[#C9A45C] selection:text-[#171513]">
        {/* Unified Top Navigation Bar */}
        <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

        {/* Multi-Page Routes */}
        <main className="flex-grow">
          <Routes>
            {/* 1. TRANG CHỦ */}
            <Route path="/" element={<HomePage />} />

            {/* 2. GIỚI THIỆU DI SẢN */}
            <Route path="/gioi-thieu" element={<IntroductionPage />} />

            {/* 3. LỊCH SỬ */}
            <Route path="/lich-su" element={<HistoryPage />} />

            {/* 4. NHẠC CỤ */}
            <Route path="/nhac-cu" element={<InstrumentsPage />} />

            {/* 5. LOẠI HÌNH BIỂU DIỄN */}
            <Route path="/bieu-dien" element={<PerformancesPage />} />

            {/* 6. ĐỊA BÀN DI SẢN */}
            <Route path="/dia-ban" element={<HeritageSitesPage />} />

            {/* 7. CỘNG ĐỒNG CHỦ THỂ */}
            <Route path="/chu-the" element={<CommunityPage />} />

            {/* 8. TRẢI NGHIỆM SỐ */}
            <Route path="/trai-nghiem" element={<DigitalExperiencePage />} />

            {/* 9. BẢO TỒN DI SẢN */}
            <Route path="/bao-ton" element={<ConservationPage />} />

            {/* 10. GÓC KHÁM PHÁ (4 Game tương tác) */}
            <Route path="/kham-pha" element={<QuizDiscoveryPage />} />

            {/* 11. TƯ LIỆU & NGUỒN THAM KHẢO (10 Nguồn chuẩn xác) */}
            <Route path="/nguon-tham-khao" element={<ReferencesPage />} />

            {/* 12. HÀNH TRÌNH NHẬP VAI HOÀNG CUNG */}
            <Route path="/hanh-trinh-nhap-vai" element={<ImmersiveJourneyPage />} />

            {/* 13. KHO LƯU TRỮ DI SẢN SỐ */}
            <Route path="/kho-luu-tru" element={<ArchivePage />} />

            {/* 14. AI HƯỚNG DẪN VIÊN DI SẢN */}
            <Route path="/huong-dan-vien-ai" element={<AiGuidePage />} />

            {/* 404 Fallback */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* Global Search Modal (Ctrl + K) */}
        <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

        {/* Museum Accessibility & Utility Toolbar */}
        <AccessibilityToolbar onOpenSearch={() => setIsSearchOpen(true)} />

        {/* Unified Footer */}
        <Footer />

        {/* Floating Scroll to Top button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-[#781F25] text-[#C9A45C] border border-[#C9A45C]/50 hover:bg-[#A32A32] shadow-xl transition-all cursor-pointer hover:scale-110 active:scale-95"
            title="Cuộn lên đầu trang"
            aria-label="Cuộn lên đầu trang"
          >
            <ChevronUp className="w-5 h-5 text-[#E5C07B]" />
          </button>
        )}
      </div>
    </HashRouter>
  );
}

