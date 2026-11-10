import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Compass,
  Film,
  Camera,
  Music,
  RotateCcw,
  Sparkles,
  Maximize2
} from 'lucide-react';
import { AUDIO_TRACKS, AudioTrack, GALLERY_PHOTOS } from '../data/heritageData';
import { courtAudioEngine } from '../utils/audioEngine';

export const ExperienceSpace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'audio' | 'soundboard' | 'gallery' | 'video' | 'space360'>('audio');
  
  // Audio Player State
  const [currentTrack, setCurrentTrack] = useState<AudioTrack>(AUDIO_TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.7);
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(0);
  const [totalTimeSec, setTotalTimeSec] = useState<number>(25);

  // Soundboard state
  const [activeNoteName, setActiveNoteName] = useState<string | null>(null);

  // Gallery zoom state
  const [galleryFilter, setGalleryFilter] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);

  useEffect(() => {
    courtAudioEngine.setCallbacks(
      (curr, total) => {
        setCurrentTimeSec(curr);
        setTotalTimeSec(total);
      },
      () => {
        setIsPlaying(false);
      }
    );
  }, []);

  const handleTogglePlay = () => {
    if (isPlaying) {
      courtAudioEngine.stop();
      setIsPlaying(false);
    } else {
      courtAudioEngine.playTrack(currentTrack.id, currentTrack.notesSequence);
      setIsPlaying(true);
    }
  };

  const handleSelectTrack = (track: AudioTrack) => {
    setCurrentTrack(track);
    courtAudioEngine.stop();
    courtAudioEngine.playTrack(track.id, track.notesSequence);
    setIsPlaying(true);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    courtAudioEngine.setVolume(newVol);
  };

  const playPentatonicNote = (noteName: string, freq: number, instType: 'string' | 'wind' | 'drum' | 'bell') => {
    setActiveNoteName(noteName);
    courtAudioEngine.playInstrumentNote(freq, instType, 1.2);
    setTimeout(() => setActiveNoteName(null), 800);
  };

  const pentatonicScale = [
    { name: 'HÒ', han: '合', note: 'Do (C4)', freq: 261, desc: 'Âm căn bản thứ nhất, vững chắc như nền móng đất trời' },
    { name: 'XỰ', han: '四', note: 'Re (D4)', freq: 293, desc: 'Âm thứ hai, thanh thoát, vươn cao' },
    { name: 'XANG', han: '一', note: 'Fa (F4)', freq: 349, desc: 'Âm thứ ba, luyến láy da diết đặc trưng Nam oán' },
    { name: 'XÊ', han: '工', note: 'Sol (G4)', freq: 392, desc: 'Âm thứ tư, sáng lạn, khẳng định tiết tấu' },
    { name: 'CỐNG', han: '尺', note: 'La (A4)', freq: 440, desc: 'Âm thứ năm, rực rỡ, viên mãn' },
    { name: 'PHAN', han: '凡', note: 'Do cao (C5)', freq: 523, desc: 'Âm bát độ trên, vang vọng chốn cung điện' },
    { name: 'LỤC', han: '六', note: 'Re cao (D5)', freq: 587, desc: 'Âm hoa mỹ thăng hoa đỉnh điểm' },
  ];

  const filteredPhotos = GALLERY_PHOTOS.filter((p) => {
    if (galleryFilter === 'all') return true;
    return p.category === galleryFilter;
  });

  return (
    <section id="trai-nghiem" className="py-20 bg-[#171513] text-[#F2E8D5] border-b border-[#C9A45C]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#C9A45C] mb-3">
            <Compass className="w-4 h-4 text-[#C9A45C]" />
            <span>Chuyên mục VII · Khám Phá Trực Quan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-[#F2E8D5] tracking-tight">
            KHÔNG GIAN TRẢI NGHIỆM SỐ
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#C9A45C] to-transparent mx-auto mt-4" />
          <p className="mt-4 text-base text-[#F2E8D5]/80 font-sans leading-relaxed">
            Thưởng thức âm thanh di sản, tương tác gõ phím ngũ cung, chiêm ngưỡng tư liệu hình ảnh và không gian thực tế ảo 360° của nhà hát Duyệt Thị Đường.
          </p>
        </div>

        {/* Master Feature Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 p-1.5 bg-[#493326]/30 border border-[#C9A45C]/30 rounded-lg max-w-2xl mx-auto">
          {[
            { id: 'audio', label: 'Trình phát Âm thanh', icon: Music },
            { id: 'soundboard', label: 'Phím gõ Ngũ Cung', icon: Sparkles },
            { id: 'gallery', label: 'Thư viện Hình ảnh', icon: Camera },
            { id: 'video', label: 'Trích đoạn Video', icon: Film },
            { id: 'space360', label: 'Không gian 360°', icon: Compass }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-[#C9A45C] to-[#E5C07B] text-[#171513] font-semibold shadow-sm'
                    : 'text-[#F2E8D5]/70 hover:text-[#F2E8D5] hover:bg-[#781F25]/30'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: AUDIO PLAYER */}
        {activeTab === 'audio' && (
          <div className="bg-[#171513] border border-[#C9A45C]/40 rounded-lg p-6 sm:p-10 shadow-2xl max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Disc Art Slot */}
              <div className="md:col-span-5 flex flex-col items-center text-center">
                <div className={`relative w-48 h-48 rounded-full border-4 border-[#C9A45C]/50 p-2 shadow-2xl ${isPlaying ? 'animate-[spin_12s_linear_infinite]' : ''}`}>
                  <img
                    src="/src/assets/images/royal_instruments_still_life_1793928495633.jpg"
                    alt="Bản nhạc cung đình"
                    className="w-full h-full object-cover rounded-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-[#171513] border-2 border-[#C9A45C] flex items-center justify-center text-[10px] font-mono text-[#C9A45C]">
                      HUẾ
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-xs font-mono text-[#C9A45C]">
                  {currentTrack.genre}
                </div>
                <h3 className="text-xl font-display font-bold text-[#FFF4DB] mt-1">
                  {currentTrack.title}
                </h3>
                <p className="text-xs text-[#F2E8D5]/70 mt-1 max-w-xs font-sans">
                  {currentTrack.description}
                </p>
              </div>

              {/* Controls & Track List */}
              <div className="md:col-span-7 space-y-6">
                {/* Progress bar */}
                <div>
                  <div className="flex justify-between text-xs font-mono text-[#F2E8D5]/70 mb-1.5">
                    <span>00:{currentTimeSec < 10 ? `0${currentTimeSec}` : currentTimeSec}</span>
                    <span className="text-[#C9A45C] font-semibold">{currentTrack.tempo}</span>
                    <span>00:{totalTimeSec < 10 ? `0${totalTimeSec}` : totalTimeSec}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#493326]/60 overflow-hidden relative">
                    <div
                      className="h-full bg-gradient-to-r from-[#C9A45C] to-[#E5C07B] transition-all duration-300"
                      style={{ width: `${Math.min(100, (currentTimeSec / Math.max(1, totalTimeSec)) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Primary Player Actions */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleTogglePlay}
                      className="w-12 h-12 rounded-full bg-gradient-to-r from-[#C9A45C] to-[#E5C07B] hover:brightness-110 active:scale-95 text-[#171513] flex items-center justify-center shadow-lg transition-all cursor-pointer"
                      title={isPlaying ? 'Tạm dừng' : 'Phát bản nhạc'}
                    >
                      {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
                    </button>
                    <div>
                      <div className="text-xs font-semibold text-[#F2E8D5]">
                        {isPlaying ? 'Đang diễn tấu âm hưởng cung đình' : 'Nhấn nút phát để lắng nghe'}
                      </div>
                      <div className="text-[11px] text-[#F2E8D5]/60 font-sans">
                        Bộ tổng hợp âm sắc ngũ cung Web Audio
                      </div>
                    </div>
                  </div>

                  {/* Volume Slider */}
                  <div className="flex items-center gap-2">
                    {volume === 0 ? <VolumeX className="w-4 h-4 text-[#F2E8D5]/50" /> : <Volume2 className="w-4 h-4 text-[#C9A45C]" />}
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-20 sm:w-28 accent-[#C9A45C] cursor-pointer"
                      title={`Âm lượng: ${Math.round(volume * 100)}%`}
                    />
                  </div>
                </div>

                {/* Track Selector List */}
                <div className="space-y-2 pt-2 border-t border-[#493326]/40">
                  <div className="text-xs font-mono uppercase tracking-widest text-[#C9A45C]">
                    Danh sách khúc nhạc mẫu mực
                  </div>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {AUDIO_TRACKS.map((t) => {
                      const isCurrent = currentTrack.id === t.id;
                      return (
                        <button
                          key={t.id}
                          onClick={() => handleSelectTrack(t)}
                          className={`w-full text-left p-2.5 rounded border transition-all flex items-center justify-between text-xs cursor-pointer ${
                            isCurrent
                              ? 'bg-[#781F25]/30 border-[#C9A45C] text-[#E5C07B]'
                              : 'bg-[#493326]/10 border-transparent hover:border-[#C9A45C]/30 text-[#F2E8D5]/80'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[#C9A45C]">{isCurrent && isPlaying ? '▶' : '•'}</span>
                            <span className="font-semibold">{t.title}</span>
                          </div>
                          <span className="text-[11px] text-[#F2E8D5]/50">{t.duration}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PENTATONIC SOUNDBOARD */}
        {activeTab === 'soundboard' && (
          <div className="bg-[#171513] border border-[#C9A45C]/40 rounded-lg p-6 sm:p-10 shadow-2xl max-w-4xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h3 className="text-2xl font-display font-bold text-[#E5C07B]">
                KHÁM PHÁ THANG ÂM NGŨ CUNG CUNG ĐÌNH
              </h3>
              <p className="text-xs sm:text-sm text-[#F2E8D5]/80 mt-2 font-sans">
                Hãy nhấn vào từng phím dưới đây để nghe âm hưởng của các nốt Hò, Xự, Xang, Xê, Cống trên các nhạc cụ hoàng cung truyền thống.
              </p>
            </div>

            {/* Note keys grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
              {pentatonicScale.map((pNote) => {
                const isActive = activeNoteName === pNote.name;
                return (
                  <button
                    key={pNote.name}
                    onClick={() => playPentatonicNote(pNote.name, pNote.freq, 'string')}
                    className={`p-4 rounded-lg border flex flex-col items-center text-center transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#C9A45C] text-[#171513] border-[#FFF4DB] scale-105 shadow-xl shadow-[#C9A45C]/40'
                        : 'bg-[#493326]/20 border-[#C9A45C]/30 text-[#F2E8D5] hover:border-[#C9A45C] hover:bg-[#781F25]/30'
                    }`}
                  >
                    <span className="text-2xl font-serif">{pNote.han}</span>
                    <span className="text-lg font-display font-bold mt-1 tracking-wider">
                      {pNote.name}
                    </span>
                    <span className="text-[10px] font-mono text-[#E5C07B] mt-0.5">
                      {pNote.note}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Instrument timbre selectors for the soundboard */}
            <div className="p-4 rounded-lg border border-[#C9A45C]/30 bg-[#493326]/20 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="text-[#F2E8D5]/80">
                <strong className="text-[#C9A45C]">Thử nghiệm âm sắc nhạc khí khác:</strong> Nhấn nút bên dưới rồi gõ phím ngũ cung:
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => playPentatonicNote('Kèn Bầu', 392, 'wind')}
                  className="px-3 py-1.5 rounded border border-[#C9A45C]/40 bg-[#171513] hover:bg-[#781F25] text-[#F2E8D5] cursor-pointer"
                >
                  Kèn Bầu (Hơi)
                </button>
                <button
                  onClick={() => playPentatonicNote('Tam Âm La', 523, 'bell')}
                  className="px-3 py-1.5 rounded border border-[#C9A45C]/40 bg-[#171513] hover:bg-[#781F25] text-[#F2E8D5] cursor-pointer"
                >
                  Tam Âm La (Chuông)
                </button>
                <button
                  onClick={() => playPentatonicNote('Trống Bản', 150, 'drum')}
                  className="px-3 py-1.5 rounded border border-[#C9A45C]/40 bg-[#171513] hover:bg-[#781F25] text-[#F2E8D5] cursor-pointer"
                >
                  Trống Bản (Gõ)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PHOTO GALLERY */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            {/* Gallery Category filter */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
              {['all', 'Biểu diễn', 'Kiến trúc', 'Nhạc cụ', 'Múa cung đình', 'Con người'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setGalleryFilter(cat)}
                  className={`px-3 py-1 text-xs rounded transition-all cursor-pointer ${
                    galleryFilter === cat
                      ? 'bg-[#C9A45C] text-[#171513] font-semibold'
                      : 'border border-[#C9A45C]/30 text-[#F2E8D5]/70 hover:text-[#F2E8D5]'
                  }`}
                >
                  {cat === 'all' ? 'Tất cả ảnh tư liệu' : cat}
                </button>
              ))}
            </div>

            {/* Photo Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPhotos.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                  className="group relative h-64 rounded-lg overflow-hidden border border-[#C9A45C]/30 bg-[#171513] cursor-pointer shadow-lg hover:border-[#C9A45C] transition-all"
                >
                  <img
                    src={photo.image}
                    alt={photo.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171513] via-[#171513]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  
                  <div className="absolute top-3 right-3 p-1.5 rounded-full bg-[#171513]/70 text-[#C9A45C] opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" />
                  </div>

                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#E5C07B]">
                      {photo.category}
                    </span>
                    <h4 className="text-base font-display font-bold text-[#FFF4DB] mt-0.5 line-clamp-1">
                      {photo.title}
                    </h4>
                    <p className="text-xs text-[#F2E8D5]/70 font-sans line-clamp-1 mt-0.5">
                      {photo.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Zoom Modal for Photo */}
            {selectedPhoto && (
              <div
                onClick={() => setSelectedPhoto(null)}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171513]/90 backdrop-blur-md cursor-pointer"
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="relative max-w-4xl w-full bg-[#171513] border border-[#C9A45C]/60 rounded-lg overflow-hidden p-4 shadow-2xl"
                >
                  <img
                    src={selectedPhoto.image}
                    alt={selectedPhoto.title}
                    className="w-full max-h-[70vh] object-contain rounded"
                  />
                  <div className="mt-4 flex items-start justify-between gap-4">
                    <div>
                      <span className="text-xs font-mono text-[#C9A45C]">{selectedPhoto.category}</span>
                      <h3 className="text-xl font-display font-bold text-[#E5C07B] mt-0.5">{selectedPhoto.title}</h3>
                      <p className="text-xs text-[#F2E8D5]/80 mt-1">{selectedPhoto.description}</p>
                    </div>
                    <button
                      onClick={() => setSelectedPhoto(null)}
                      className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#171513] bg-[#C9A45C] rounded cursor-pointer"
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: VIDEO PREVIEWS */}
        {activeTab === 'video' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Video Box 1 */}
            <div className="bg-[#171513] border border-[#C9A45C]/30 rounded-lg overflow-hidden shadow-xl">
              <div className="relative h-60 bg-black">
                <img
                  src="/src/assets/images/duyet_thi_duong_theater_1793928493481.jpg"
                  alt="Trích đoạn hòa tấu Lưu Thủy Kim Tiền"
                  className="w-full h-full object-cover opacity-85"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
                  <div className="w-14 h-14 rounded-full bg-[#781F25]/90 border border-[#C9A45C] flex items-center justify-center text-[#FFF4DB] shadow-lg">
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </div>
                  <span className="mt-3 text-xs font-mono tracking-wider text-[#E5C07B] bg-[#171513]/80 px-2.5 py-1 rounded border border-[#C9A45C]/30">
                    Video tư liệu trích đoạn (04:15)
                  </span>
                </div>
              </div>
              <div className="p-5 font-sans">
                <div className="text-xs font-mono text-[#C9A45C] uppercase">
                  Duyệt Thị Đường · Nhà hát Cung đình Huế
                </div>
                <h4 className="text-lg font-display font-bold text-[#FFF4DB] mt-1">
                  Trích đoạn Hòa tấu Thập Thủ Liên Hoàn (Mười bản ngự)
                </h4>
                <p className="text-xs text-[#F2E8D5]/80 mt-2 leading-relaxed">
                  Ghi hình buổi diễn xướng của các nghệ nhân, nghệ sĩ Nhà hát Nghệ thuật Truyền thống Cung đình Huế trong trang phục gấm thêu long phụng ngũ sắc.
                </p>
              </div>
            </div>

            {/* Video Box 2 */}
            <div className="bg-[#171513] border border-[#C9A45C]/30 rounded-lg overflow-hidden shadow-xl">
              <div className="relative h-60 bg-black">
                <img
                  src="/src/assets/images/luc_cung_hoa_dang_dance_1793928496126.jpg"
                  alt="Vũ khúc Lục Cúng Hoa Đăng"
                  className="w-full h-full object-cover opacity-85"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
                  <div className="w-14 h-14 rounded-full bg-[#781F25]/90 border border-[#C9A45C] flex items-center justify-center text-[#FFF4DB] shadow-lg">
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </div>
                  <span className="mt-3 text-xs font-mono tracking-wider text-[#E5C07B] bg-[#171513]/80 px-2.5 py-1 rounded border border-[#C9A45C]/30">
                    Video tư liệu trích đoạn (06:30)
                  </span>
                </div>
              </div>
              <div className="p-5 font-sans">
                <div className="text-xs font-mono text-[#C9A45C] uppercase">
                  Đại lễ Cung đình · Múa Cổ Truyền
                </div>
                <h4 className="text-lg font-display font-bold text-[#FFF4DB] mt-1">
                  Vũ khúc Lục Cúng Hoa Đăng – Lung linh hoa sen thắp sáng
                </h4>
                <p className="text-xs text-[#F2E8D5]/80 mt-2 leading-relaxed">
                  Toàn cảnh màn múa hoa đăng kết hợp âm nhạc Tiểu nhạc thâm trầm, vũ sinh chuyển hình tạo thành các chữ chúc thọ thái bình cho non sông xã tắc.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: 360° SPACE EXPLORATION */}
        {activeTab === 'space360' && (
          <div className="bg-[#171513] border border-[#C9A45C]/40 rounded-lg p-6 sm:p-10 shadow-2xl max-w-4xl mx-auto">
            <div className="relative h-96 rounded-lg overflow-hidden border border-[#C9A45C]/40">
              <img
                src="/src/assets/images/duyet_thi_duong_theater_1793928493481.jpg"
                alt="360 Không gian Duyệt Thị Đường"
                className="w-full h-full object-cover object-center filter brightness-95"
              />
              <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/20 to-black/70" />

              {/* 360 Overlay Badges */}
              <div className="absolute top-4 left-4 p-2.5 rounded bg-[#171513]/85 border border-[#C9A45C]/40 text-xs">
                <div className="font-mono text-[#C9A45C] uppercase">Không gian thực tế ảo 360°</div>
                <div className="font-display font-bold text-[#FFF4DB]">Nội thất Duyệt Thị Đường Hoàng Cung</div>
              </div>

              {/* Interactive Hotspots */}
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 group cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-[#C9A45C]/30 border-2 border-[#C9A45C] flex items-center justify-center animate-ping" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full bg-[#C9A45C] text-[#171513] flex items-center justify-center text-[10px] font-bold">
                    +
                  </div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded bg-[#171513]/95 border border-[#C9A45C] text-[11px] text-[#FFF4DB] whitespace-nowrap shadow-xl">
                  Ngai vàng vua ngự & Vòm trần vẽ mặt trời, mặt trăng
                </div>
              </div>

              <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between text-xs text-[#F2E8D5]/80 bg-[#171513]/85 p-3 rounded border border-[#C9A45C]/30">
                <span>Di chuyển chuột để khám phá toàn cảnh kiến trúc nhà hát cổ</span>
                <span className="text-[#C9A45C] font-mono">1826 · Triều vua Minh Mạng</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
