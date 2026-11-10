import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from '../components/Breadcrumb';
import {
  MapPin,
  Navigation,
  Landmark,
  Info,
  X,
  Calendar,
  Activity,
  ExternalLink,
  ArrowRight,
  Route,
  Clock,
  Car,
  Compass,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { HERITAGE_SITES, HeritageSite, HERITAGE_ROUTES, HeritageRoute } from '../data/heritageData';

export const HeritageSitesPage: React.FC = () => {
  const [activeViewMode, setActiveViewMode] = useState<'map' | 'routes'>('map');
  const [selectedSite, setSelectedSite] = useState<HeritageSite>(HERITAGE_SITES[0]);
  const [selectedRoute, setSelectedRoute] = useState<HeritageRoute>(HERITAGE_ROUTES[0]);
  const [siteModal, setSiteModal] = useState<HeritageSite | null>(null);
  const [filterType, setFilterType] = useState<string>('all');

  const filteredSites = HERITAGE_SITES.filter((site) => {
    if (filterType === 'all') return true;
    if (filterType === 'historical') return site.type === 'Không gian lịch sử hoàng gia';
    if (filterType === 'active') return site.type === 'Điểm biểu diễn & bảo tồn hiện nay';
    return true;
  });

  return (
    <div className="bg-[#171513] text-[#F2E8D5] min-h-screen py-6">
      <Breadcrumb items={[{ label: 'Địa bàn Di sản' }]} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs font-mono uppercase tracking-widest text-[#C9A45C] mb-2">
            Địa bàn trọng tâm · Thành phố Huế, Bắc Trung Bộ
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-display text-[#FFF4DB]">
            KHÔNG GIAN DI SẢN CỐ ĐÔ HUẾ
          </h1>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#C9A45C] to-transparent mx-auto mt-4" />
          <p className="mt-4 text-sm sm:text-base text-[#F2E8D5]/80 font-sans leading-relaxed">
            Hệ thống di tích cung đình gắn liền với các điển lễ tế tự hoàng triều và các không gian đang trực tiếp bảo tồn, biểu diễn Nhã nhạc phục vụ công chúng hôm nay <sup className="text-[#C9A45C] font-mono">[4],[6]</sup>.
          </p>
        </div>

        {/* Primary View Switcher: Sơ đồ Không gian vs 3 Tuyến Hành trình Di sản */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setActiveViewMode('map')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeViewMode === 'map'
                ? 'bg-gradient-to-r from-[#C9A45C] to-[#E5C07B] text-[#171513] shadow-lg shadow-[#C9A45C]/20'
                : 'bg-[#493326]/30 text-[#F2E8D5]/70 hover:text-[#F2E8D5] border border-[#C9A45C]/30'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Sơ đồ Tọa độ Không gian</span>
          </button>

          <button
            onClick={() => setActiveViewMode('routes')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeViewMode === 'routes'
                ? 'bg-gradient-to-r from-[#C9A45C] to-[#E5C07B] text-[#171513] shadow-lg shadow-[#C9A45C]/20'
                : 'bg-[#493326]/30 text-[#F2E8D5]/70 hover:text-[#F2E8D5] border border-[#C9A45C]/30'
            }`}
          >
            <Route className="w-4 h-4" />
            <span>3 Tuyến Hành Trình Gợi Ý</span>
          </button>
        </div>

        {/* VIEW 1: 3 TUYẾN HÀNH TRÌNH DI SẢN GỢI Ý */}
        {activeViewMode === 'routes' && (
          <div className="space-y-8 max-w-5xl mx-auto">
            {/* Route Selector Tabs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {HERITAGE_ROUTES.map((route) => {
                const isSelected = selectedRoute.id === route.id;
                return (
                  <button
                    key={route.id}
                    onClick={() => setSelectedRoute(route)}
                    className={`p-4 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#781F25]/40 border-[#C9A45C] shadow-lg shadow-[#781F25]/20 scale-102 ring-1 ring-[#C9A45C]'
                        : 'bg-[#493326]/15 border-[#C9A45C]/25 hover:border-[#C9A45C]/60 hover:bg-[#493326]/25'
                    }`}
                  >
                    <div>
                      <div className="text-[10px] font-mono text-[#C9A45C] uppercase tracking-wider mb-1 flex items-center justify-between">
                        <span>Hành trình di sản</span>
                        <span>{route.duration}</span>
                      </div>
                      <h3 className="text-base font-display font-bold text-[#FFF4DB] leading-snug">
                        {route.title}
                      </h3>
                      <p className="text-xs text-[#F2E8D5]/70 font-sans mt-1 line-clamp-2">
                        {route.subtitle}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#493326]/40 text-xs text-[#E5C07B] font-medium flex items-center justify-between">
                      <span>{route.distance}</span>
                      <span>{isSelected ? '● Đang chọn' : 'Xem chặng →'}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Route Showcase */}
            <div className="bg-[#171513] border border-[#C9A45C]/40 rounded-lg p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-[#C9A45C]/20">
                <div>
                  <div className="text-[11px] font-mono text-[#C9A45C] uppercase tracking-widest flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
                    <span>Chủ đề: {selectedRoute.theme}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#E5C07B] mt-1">
                    {selectedRoute.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#F2E8D5]/80 font-sans mt-1">
                    {selectedRoute.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs font-sans shrink-0">
                  <div className="px-3 py-1.5 rounded bg-[#493326]/30 border border-[#C9A45C]/30 text-[#E5C07B] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C9A45C]" />
                    <span>{selectedRoute.duration}</span>
                  </div>
                  <div className="px-3 py-1.5 rounded bg-[#493326]/30 border border-[#C9A45C]/30 text-[#E5C07B] flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-[#C9A45C]" />
                    <span>{selectedRoute.recommendedTransport}</span>
                  </div>
                </div>
              </div>

              {/* Step by step Stops Timeline */}
              <div className="space-y-4">
                <div className="text-xs font-mono uppercase tracking-widest text-[#C9A45C]">
                  Lộ trình từng chặng dừng chân tại Thành phố Huế, Việt Nam:
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {selectedRoute.stops.map((stop) => (
                    <div
                      key={stop.order}
                      className="p-4 rounded-lg border border-[#C9A45C]/25 bg-[#493326]/15 hover:border-[#C9A45C]/60 transition-colors flex flex-col sm:flex-row items-start gap-4"
                    >
                      <div className="w-9 h-9 rounded-full bg-[#781F25] text-[#FFF4DB] border border-[#C9A45C] flex items-center justify-center font-mono font-bold text-sm shrink-0 shadow">
                        {stop.order}
                      </div>

                      <div className="flex-1 space-y-1.5 text-xs font-sans">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <h4 className="text-base font-display font-bold text-[#FFF4DB]">
                            {stop.name}
                          </h4>
                          <span className="text-[11px] font-mono text-[#E5C07B] px-2 py-0.5 rounded bg-[#171513] border border-[#C9A45C]/30">
                            Thời gian khuyến nghị: {stop.stayDuration}
                          </span>
                        </div>

                        <p className="text-[#E5C07B] font-medium">
                          <strong>Trọng tâm trải nghiệm:</strong> {stop.highlight}
                        </p>

                        <p className="text-[#F2E8D5]/80 leading-relaxed">
                          <strong>Bối cảnh lịch sử Nhã nhạc:</strong> {stop.historicalContext}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Curatorial Practical Tips */}
              <div className="p-4 rounded-lg border border-[#C9A45C]/30 bg-[#781F25]/20 flex items-start gap-3 text-xs text-[#F2E8D5]/90 font-sans">
                <Info className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#E5C07B]">Lời khuyên giám tuyển khi tham quan thực tế:</strong> {selectedRoute.tips}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: INTERACTIVE MAP & DETAIL LAYOUT */}
        {activeViewMode === 'map' && (
          <>
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 p-1 bg-[#493326]/30 border border-[#C9A45C]/30 rounded-lg max-w-xl mx-auto">
              {[
                { id: 'all', label: 'Tất cả địa điểm' },
                { id: 'historical', label: 'Không gian lịch sử hoàng gia' },
                { id: 'active', label: 'Điểm biểu diễn & bảo tồn hiện nay' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilterType(tab.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-all cursor-pointer whitespace-nowrap ${
                    filterType === tab.id
                      ? 'bg-[#C9A45C] text-[#171513] font-semibold shadow-sm'
                      : 'text-[#F2E8D5]/70 hover:text-[#F2E8D5]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left: Stylized Map Viewport */}
              <div className="lg:col-span-7 bg-[#171513] border border-[#C9A45C]/40 rounded-lg p-6 relative overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#C9A45C]/20">
              <div className="flex items-center gap-2">
                <Landmark className="w-4 h-4 text-[#C9A45C]" />
                <span className="text-xs uppercase tracking-widest font-mono text-[#E5C07B]">
                  Sơ đồ Không gian Di sản Cung đình Huế
                </span>
              </div>
              <span className="text-[11px] text-[#F2E8D5]/60">
                Nhấn marker để xem thông tin
              </span>
            </div>

            <div className="relative w-full h-[360px] sm:h-[420px] bg-[#1a1714] border border-[#C9A45C]/30 rounded-lg overflow-hidden flex items-center justify-center">
              {/* Citadel Wall Layout Contours */}
              <div className="absolute inset-8 border-2 border-dashed border-[#C9A45C]/25 rounded-md pointer-events-none flex flex-col justify-between p-4">
                <div className="flex justify-between text-[10px] font-mono text-[#C9A45C]/40 uppercase">
                  <span>Kinh thành Huế · Bắc Thành</span>
                  <span>Sông Ngự Hà</span>
                </div>
                <div className="text-center text-[10px] font-mono text-[#C9A45C]/30 uppercase">
                  Khu vực Tử Cấm Thành & Hoàng Thành
                </div>
                <div className="flex justify-between text-[10px] font-mono text-[#C9A45C]/40 uppercase">
                  <span>Cửa Ngọ Môn (Nam)</span>
                  <span>Sông Hương (Hương Giang)</span>
                </div>
              </div>

              {/* Water River Accent */}
              <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#1E3A8A]/20 to-transparent pointer-events-none" />

              {/* Markers */}
              {filteredSites.map((site) => {
                const isSelected = selectedSite.id === site.id;
                const isHistorical = site.type === 'Không gian lịch sử hoàng gia';
                return (
                  <button
                    key={site.id}
                    onClick={() => setSelectedSite(site)}
                    style={{ left: `${site.coordinates.x}%`, top: `${site.coordinates.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-all duration-300 z-20"
                  >
                    <div className="relative flex flex-col items-center">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                          isSelected
                            ? 'bg-[#C9A45C] text-[#171513] border-[#FFF4DB] scale-125 shadow-lg shadow-[#C9A45C]/50'
                            : isHistorical
                            ? 'bg-[#781F25] text-[#F2E8D5] border-[#C9A45C]/60 hover:scale-110'
                            : 'bg-[#1E3A8A] text-[#F2E8D5] border-[#C9A45C]/60 hover:scale-110'
                        }`}
                      >
                        <MapPin className="w-4 h-4" />
                      </div>
                      <span className="mt-1 px-2 py-0.5 rounded text-[10px] font-medium font-sans bg-[#171513]/90 border border-[#C9A45C]/30 text-[#F2E8D5] whitespace-nowrap shadow">
                        {site.name}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Map Legend */}
            <div className="mt-4 pt-3 border-t border-[#493326]/40 flex flex-wrap items-center justify-between text-xs text-[#F2E8D5]/70 gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#781F25] border border-[#C9A45C]" />
                  <span>Không gian lịch sử</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#1E3A8A] border border-[#C9A45C]" />
                  <span>Điểm diễn xướng & bảo tồn</span>
                </div>
              </div>
              <div className="text-[11px] font-mono text-[#C9A45C]">
                Tọa độ TP. Huế · 16°28'N 107°34'E
              </div>
            </div>
          </div>

          {/* Right: Selected Site Detailed Showcase */}
          <div className="lg:col-span-5 bg-[#171513] border border-[#C9A45C]/40 rounded-lg overflow-hidden shadow-2xl p-6 space-y-5">
            <div className="relative h-48 rounded-lg overflow-hidden border border-[#C9A45C]/30">
              <img
                src={selectedSite.image}
                alt={selectedSite.name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171513] via-transparent to-transparent" />
              <div className="absolute top-3 left-3 px-2 py-1 rounded bg-[#171513]/80 border border-[#C9A45C]/40 text-[10px] font-mono text-[#E5C07B]">
                {selectedSite.type}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-display font-bold text-[#E5C07B]">
                {selectedSite.name}
              </h3>
              <p className="text-xs text-[#F2E8D5]/70 mt-1 flex items-center gap-1.5 font-sans">
                <MapPin className="w-3.5 h-3.5 text-[#C9A45C]" />
                <span>{selectedSite.location}</span>
              </p>
              {selectedSite.gpsCoordinates && (
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>
                      Tọa độ WGS84: {selectedSite.gpsCoordinates.lat}° N, {selectedSite.gpsCoordinates.lng}° E
                    </span>
                  </span>
                  {selectedSite.googleMapsUrl && (
                    <a
                      href={selectedSite.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-mono text-[#C9A45C] hover:text-[#FFF4DB] flex items-center gap-1 underline underline-offset-2"
                    >
                      <span>Mở Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-3 text-xs font-sans">
              <div className="p-3 rounded border border-[#C9A45C]/20 bg-[#493326]/15">
                <div className="font-semibold uppercase tracking-wider text-[#C9A45C] flex items-center gap-1.5 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-[#C9A45C]" />
                  <span>Năm khởi dựng: {selectedSite.builtYear}</span>
                </div>
                <p className="text-[#F2E8D5]/85 leading-relaxed">
                  {selectedSite.historicalRole} <sup className="text-[#C9A45C] font-mono">[4]</sup>
                </p>
              </div>

              <div className="p-3 rounded border border-[#C9A45C]/20 bg-[#493326]/15">
                <div className="font-semibold uppercase tracking-wider text-[#C9A45C] flex items-center gap-1.5 mb-1">
                  <Activity className="w-3.5 h-3.5 text-[#C9A45C]" />
                  <span>Hoạt động bảo tồn hiện nay</span>
                </div>
                <p className="text-[#F2E8D5]/85 leading-relaxed">
                  {selectedSite.currentActivity} <sup className="text-[#C9A45C] font-mono">[6]</sup>
                </p>
              </div>

              <p className="text-[#F2E8D5]/80 text-xs leading-relaxed pt-1">
                {selectedSite.description}
              </p>
            </div>

            <button
              onClick={() => setSiteModal(selectedSite)}
              className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-[#171513] bg-[#C9A45C] hover:bg-[#E5C07B] rounded transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Info className="w-4 h-4 text-[#171513]" />
              <span>Xem hồ sơ tư liệu đầy đủ</span>
            </button>
          </div>
        </div>
      </>
    )}

        {/* Modal */}
        {siteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171513]/85 backdrop-blur-md">
            <div className="relative w-full max-w-2xl bg-[#171513] border border-[#C9A45C]/60 rounded-lg p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSiteModal(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-[#F2E8D5]/70 hover:text-[#F2E8D5] hover:bg-[#781F25]/40 transition-colors"
                aria-label="Đóng"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="h-56 rounded-lg overflow-hidden border border-[#C9A45C]/30 mb-6">
                <img
                  src={siteModal.image}
                  alt={siteModal.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-xs font-mono text-[#C9A45C] mb-1">
                {siteModal.type} · Khởi dựng: {siteModal.builtYear}
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#E5C07B]">
                {siteModal.name}
              </h3>
              <p className="text-xs text-[#F2E8D5]/70 mt-1 mb-4 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#C9A45C]" />
                <span>{siteModal.location}</span>
              </p>

              <div className="space-y-4 text-sm font-sans">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-[#C9A45C] mb-1">
                    Vai trò trong lịch sử vương triều
                  </h4>
                  <p className="text-[#F2E8D5]/90 leading-relaxed">
                    {siteModal.historicalRole}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-[#C9A45C] mb-1">
                    Hoạt động thực hành & Bảo tồn ngày nay
                  </h4>
                  <p className="text-[#F2E8D5]/90 leading-relaxed">
                    {siteModal.currentActivity}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-[#C9A45C] mb-1">
                    Mô tả kiến trúc và âm học
                  </h4>
                  <p className="text-[#F2E8D5]/85 leading-relaxed text-xs sm:text-sm">
                    {siteModal.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* References Footer Box */}
        <div className="bg-[#12100e] border border-[#C9A45C]/30 p-6 rounded-lg text-xs font-sans">
          <div className="text-xs font-mono uppercase tracking-widest text-[#C9A45C] mb-2">
            Tư liệu tham khảo cho chuyên trang Địa bàn di sản:
          </div>
          <p className="text-[#F2E8D5]/70 mb-3">
            Thông tin địa danh và tọa độ đối chiếu theo Cổng Thông tin Du lịch Huế <sup className="text-[#C9A45C] font-mono">[6]</sup> và Trung tâm Bảo tồn Di tích Cố đô Huế <sup className="text-[#C9A45C] font-mono">[4]</sup>.
          </p>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#493326]/40">
            <Link to="/nguon-tham-khao" className="text-[#C9A45C] hover:text-[#E5C07B] flex items-center gap-1 font-semibold">
              <span>Xem danh mục 10 nguồn tài liệu đầy đủ</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <Link to="/chu-the" className="text-[#E5C07B] hover:underline flex items-center gap-1">
              <span>Tiếp theo: Xem Cộng đồng Chủ thể Di sản</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};
