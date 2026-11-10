import React, { useState } from 'react';
import { MapPin, Navigation, Landmark, Info, X, Calendar, Activity } from 'lucide-react';
import { HERITAGE_SITES, HeritageSite } from '../data/heritageData';

export const HeritageSitesMap: React.FC = () => {
  const [selectedSite, setSelectedSite] = useState<HeritageSite>(HERITAGE_SITES[0]);
  const [siteModal, setSiteModal] = useState<HeritageSite | null>(null);
  const [filterType, setFilterType] = useState<string>('all');

  const filteredSites = HERITAGE_SITES.filter((site) => {
    if (filterType === 'all') return true;
    if (filterType === 'historical') return site.type === 'Không gian lịch sử hoàng gia';
    if (filterType === 'active') return site.type === 'Điểm biểu diễn & bảo tồn hiện nay';
    return true;
  });

  return (
    <section id="dia-ban" className="py-20 bg-[#171513] text-[#F2E8D5] border-b border-[#C9A45C]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#C9A45C] mb-3">
            <Navigation className="w-4 h-4 text-[#C9A45C]" />
            <span>Chuyên mục V · Không Gian Văn Hóa</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-[#F2E8D5] tracking-tight">
            ĐỊA BÀN TRỌNG TÂM DI SẢN: CỐ ĐÔ HUẾ
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#C9A45C] to-transparent mx-auto mt-4" />
          <p className="mt-4 text-base text-[#F2E8D5]/80 font-sans leading-relaxed">
            Thành phố Huế (vùng Bắc Trung Bộ) – mảnh đất hội tụ các kiến trúc cung đình đỉnh cao, nơi tiếng nhạc vương triều từng vang dội và đang tiếp tục được gìn giữ mỗi ngày.
          </p>
        </div>

        {/* Filter Type Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 p-1 bg-[#493326]/30 border border-[#C9A45C]/30 rounded-lg max-w-xl mx-auto">
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

        {/* Interactive Layout: Visual Diagram Map on Left + Detailed Cards on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Stylized Visual Map Diagram of the Imperial Complex */}
          <div className="lg:col-span-7 bg-[#171513] border border-[#C9A45C]/40 rounded-lg p-6 relative overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#C9A45C]/20">
              <div className="flex items-center gap-2">
                <Landmark className="w-4 h-4 text-[#C9A45C]" />
                <span className="text-xs uppercase tracking-widest font-mono text-[#E5C07B]">
                  Sơ đồ Không gian Di sản Cung đình Huế
                </span>
              </div>
              <span className="text-[11px] text-[#F2E8D5]/60">
                Nhấn vào điểm di tích để xem thông tin
              </span>
            </div>

            {/* Stylized Map Viewport */}
            <div className="relative w-full h-[360px] sm:h-[420px] bg-[#1a1714] border border-[#C9A45C]/30 rounded-lg overflow-hidden flex items-center justify-center">
              {/* Citadel Wall Layout Contours (Stylized) */}
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

              {/* Water River Accent at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#1E3A8A]/20 to-transparent pointer-events-none" />

              {/* Interactive Markers */}
              {filteredSites.map((site) => {
                const isSelected = selectedSite.id === site.id;
                const isHistorical = site.type === 'Không gian lịch sử hoàng gia';
                return (
                  <button
                    key={site.id}
                    onClick={() => setSelectedSite(site)}
                    style={{ left: `${site.coordinates.x}%`, top: `${site.coordinates.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-all duration-300 z-20`}
                  >
                    <div className="relative flex flex-col items-center">
                      {/* Pulse marker if selected */}
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
                Tọa độ Cố đô Huế · 16°28'N 107°34'E
              </div>
            </div>
          </div>

          {/* Right: Selected Site Detailed Showcase */}
          <div className="lg:col-span-5 bg-[#171513] border border-[#C9A45C]/40 rounded-lg overflow-hidden shadow-2xl p-6 space-y-5">
            <div className="relative h-48 rounded-lg overflow-hidden border border-[#C9A45C]/30">
              <img
                src={selectedSite.image}
                alt={selectedSite.name}
                referrerPolicy="no-referrer"
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
              <p className="text-xs text-[#F2E8D5]/70 mt-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C9A45C]" />
                <span>{selectedSite.location}</span>
              </p>
            </div>

            <div className="space-y-3 text-xs font-sans">
              <div className="p-3 rounded border border-[#C9A45C]/20 bg-[#493326]/15">
                <div className="font-semibold uppercase tracking-wider text-[#C9A45C] flex items-center gap-1.5 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-[#C9A45C]" />
                  <span>Năm khởi dựng: {selectedSite.builtYear}</span>
                </div>
                <p className="text-[#F2E8D5]/85 leading-relaxed">
                  {selectedSite.historicalRole}
                </p>
              </div>

              <div className="p-3 rounded border border-[#C9A45C]/20 bg-[#493326]/15">
                <div className="font-semibold uppercase tracking-wider text-[#C9A45C] flex items-center gap-1.5 mb-1">
                  <Activity className="w-3.5 h-3.5 text-[#C9A45C]" />
                  <span>Hoạt động bảo tồn hiện nay</span>
                </div>
                <p className="text-[#F2E8D5]/85 leading-relaxed">
                  {selectedSite.currentActivity}
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

        {/* Full Modal for Site Detail */}
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
      </div>
    </section>
  );
};
