import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from '../components/Breadcrumb';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Compass,
  Film,
  Camera,
  Music,
  Sparkles,
  Maximize2,
  ExternalLink,
  ArrowRight,
  Info,
  Sliders,
  Radio,
  Activity,
  CheckCircle2,
  Users,
  BookOpen
} from 'lucide-react';
import { AUDIO_TRACKS, AudioTrack, GALLERY_PHOTOS } from '../data/heritageData';
import { courtAudioEngine, EnsembleChannels } from '../utils/audioEngine';
import { PentatonicScaleAnalyzer } from '../components/studio/PentatonicScaleAnalyzer';
import { MelodyTranscriptionStudio } from '../components/studio/MelodyTranscriptionStudio';
import { AudioSpectrumAnalyzer } from '../components/studio/AudioSpectrumAnalyzer';
import { MusicalModeExplorer } from '../components/studio/MusicalModeExplorer';
import { TraditionalMusicScoreLibrary } from '../components/studio/TraditionalMusicScoreLibrary';
import { AiMusicResearchAssistant } from '../components/studio/AiMusicResearchAssistant';
import { MusicResearchStudioModal, StudioTab } from '../components/studio/MusicResearchStudioModal';
import { ConcertVisualizerStage } from '../components/museum/ConcertVisualizerStage';

export const DigitalExperiencePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'studio' | 'ensemble' | 'audio' | 'soundboard' | 'gallery' | 'video' | 'space360'>('studio');
  const [studioSubTab, setStudioSubTab] = useState<StudioTab>('scales');
  const [isStudioModalOpen, setIsStudioModalOpen] = useState<boolean>(false);

  // Audio Player State
  const [currentTrack, setCurrentTrack] = useState<AudioTrack>(AUDIO_TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.7);
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(0);
  const [totalTimeSec, setTotalTimeSec] = useState<number>(25);

  // Ensemble Interactive State
  const [ensembleChannels, setEnsembleChannels] = useState<EnsembleChannels>({
    kenBau: true,
    danTyBa: true,
    danNguyet: true,
    danNhi: true,
    saoTruc: true,
    trongBan: true,
    naoBat: true
  });
  const [activeTrigger, setActiveTrigger] = useState<keyof EnsembleChannels | null>(null);
  const [soloInstrument, setSoloInstrument] = useState<keyof EnsembleChannels | null>(null);
  const [focusedInstrumentInfo, setFocusedInstrumentInfo] = useState<keyof EnsembleChannels>('danNguyet');

  // Soundboard state
  const [activeNoteName, setActiveNoteName] = useState<string | null>(null);

  // Gallery zoom modal
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

    courtAudioEngine.setEnsembleTriggerCallback((instKey) => {
      setActiveTrigger(instKey);
      setTimeout(() => setActiveTrigger(null), 280);
    });

    return () => {
      courtAudioEngine.setEnsembleTriggerCallback(null);
    };
  }, []);

  const handleTogglePlay = () => {
    if (isPlaying) {
      courtAudioEngine.stop();
      setIsPlaying(false);
    } else {
      courtAudioEngine.setEnsembleChannels(ensembleChannels);
      courtAudioEngine.playTrack(currentTrack.id, currentTrack.notesSequence);
      setIsPlaying(true);
    }
  };

  const handleSelectTrack = (track: AudioTrack) => {
    setCurrentTrack(track);
    courtAudioEngine.stop();
    courtAudioEngine.setEnsembleChannels(ensembleChannels);
    courtAudioEngine.playTrack(track.id, track.notesSequence);
    setIsPlaying(true);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    courtAudioEngine.setVolume(newVol);
  };

  const handleToggleChannelMute = (channelKey: keyof EnsembleChannels) => {
    setSoloInstrument(null);
    const updated = {
      ...ensembleChannels,
      [channelKey]: !ensembleChannels[channelKey]
    };
    setEnsembleChannels(updated);
    courtAudioEngine.setEnsembleChannels(updated);
  };

  const handleToggleSolo = (channelKey: keyof EnsembleChannels) => {
    if (soloInstrument === channelKey) {
      // Bỏ solo: bật lại toàn bộ dàn nhạc
      setSoloInstrument(null);
      const allActive: EnsembleChannels = {
        kenBau: true,
        danTyBa: true,
        danNguyet: true,
        danNhi: true,
        saoTruc: true,
        trongBan: true,
        naoBat: true
      };
      setEnsembleChannels(allActive);
      courtAudioEngine.setEnsembleChannels(allActive);
    } else {
      // Kích hoạt solo riêng nhạc cụ này
      setSoloInstrument(channelKey);
      setFocusedInstrumentInfo(channelKey);
      const soloState: EnsembleChannels = {
        kenBau: channelKey === 'kenBau',
        danTyBa: channelKey === 'danTyBa',
        danNguyet: channelKey === 'danNguyet',
        danNhi: channelKey === 'danNhi',
        saoTruc: channelKey === 'saoTruc',
        trongBan: channelKey === 'trongBan',
        naoBat: channelKey === 'naoBat'
      };
      setEnsembleChannels(soloState);
      courtAudioEngine.setEnsembleChannels(soloState);
    }
  };

  const handleResetEnsemble = () => {
    setSoloInstrument(null);
    const allActive: EnsembleChannels = {
      kenBau: true,
      danTyBa: true,
      danNguyet: true,
      danNhi: true,
      saoTruc: true,
      trongBan: true,
      naoBat: true
    };
    setEnsembleChannels(allActive);
    courtAudioEngine.setEnsembleChannels(allActive);
  };

  const playPentatonicNote = (noteName: string, freq: number, instType: 'string' | 'wind' | 'drum' | 'bell') => {
    setActiveNoteName(noteName);
    courtAudioEngine.playInstrumentNote(freq, instType, 1.2);
    setTimeout(() => setActiveNoteName(null), 800);
  };

  const pentatonicScale = [
    { name: 'HÒ', han: '合', note: 'Gần đúng C4 (Do)', freq: 261, desc: 'Bậc âm căn bản thứ nhất, định hình nền tảng điệu thức' },
    { name: 'XỰ', han: '四', note: 'Gần đúng D4 (Re)', freq: 293, desc: 'Bậc âm thứ hai, thanh thoát, vươn cao trong tuyến giai điệu' },
    { name: 'XANG', han: '一', note: 'Gần đúng F4 (Fa)', freq: 349, desc: 'Bậc âm thứ ba, thường được nhấn rung tạo âm oán xứ Huế' },
    { name: 'XÊ', han: '工', note: 'Gần đúng G4 (Sol)', freq: 392, desc: 'Bậc âm thứ tư, sáng lạn, xác định nhịp điệu chuyển đoạn' },
    { name: 'CỐNG', han: '尺', note: 'Gần đúng A4 (La)', freq: 440, desc: 'Bậc âm thứ năm, viên mãn, hoàn tất chuỗi ngũ cung chính' },
    { name: 'PHAN', han: '凡', note: 'Gần đúng C5 (Do cao)', freq: 523, desc: 'Bát độ trên của Hò, âm vực vươn tới sảnh điện cao' },
    { name: 'LỤC', han: '六', note: 'Gần đúng D5 (Re cao)', freq: 587, desc: 'Bát độ trên của Xự, âm hoa mỹ đỉnh điểm' },
  ];

  const filteredPhotos = GALLERY_PHOTOS.filter((p) => {
    if (galleryFilter === 'all') return true;
    return p.category === galleryFilter;
  });

  const ensembleInstruments: {
    key: keyof EnsembleChannels;
    name: string;
    han: string;
    category: 'Đại Nhạc' | 'Tiểu Nhạc' | 'Cả hai';
    roleNote: string;
    acousticTip: string;
    icon: string;
  }[] = [
    {
      key: 'kenBau',
      name: 'Kèn Bầu (Gia Lệnh)',
      han: '觱篥',
      category: 'Đại Nhạc',
      roleNote: 'Lĩnh xướng, dẫn dắt cao trào và mở lối giai điệu cho toàn ban nhạc',
      acousticTip: 'Âm thanh đanh nhọn, xuyên thấu không gian tế đàn uy nghiêm',
      icon: '🎺'
    },
    {
      key: 'danNguyet',
      name: 'Đàn Nguyệt (Đàn Kìm)',
      han: '月琴',
      category: 'Cả hai',
      roleNote: 'Chủ âm dẫn dắt tuyến giai điệu thính phòng, tạo vi âm Nam oán',
      acousticTip: 'Dây tơ nhấn sâu phím cao tạo nét xao xuyến đặc trưng Cố đô',
      icon: '🪕'
    },
    {
      key: 'danTyBa',
      name: 'Đàn Tỳ Bà',
      han: '琵琶',
      category: 'Tiểu Nhạc',
      roleNote: 'Bè rải hoa mỹ (arpeggio), kết nối âm sắc quý phái chốn hoàng cung',
      acousticTip: 'Ngón vê liên hoàn như chuỗi ngọc rơi trên mâm vàng',
      icon: '🎸'
    },
    {
      key: 'danNhi',
      name: 'Đàn Nhị (Nhị Cầm)',
      han: '二胡',
      category: 'Cả hai',
      roleNote: 'Bè kéo liền mạch (legato), gắn kết các câu nhạc uyển chuyển',
      acousticTip: 'Vĩ lông đuôi ngựa cọ xát da trăn tạo chất giọng da diết',
      icon: '🎻'
    },
    {
      key: 'saoTruc',
      name: 'Sáo Trúc (Hoành Địch)',
      han: '橫笛',
      category: 'Tiểu Nhạc',
      roleNote: 'Bè cao thanh thoát, bay bổng trên nền trầm của các nhạc cụ dây',
      acousticTip: 'Âm sắc trúc già trong vắt gợi tả cảnh sắc non nước thanh bình',
      icon: '🪈'
    },
    {
      key: 'trongBan',
      name: 'Trống Bản (Bản Cổ)',
      han: '板鼓',
      category: 'Cả hai',
      roleNote: 'Giữ khổ phách, chỉ huy tốc độ và điểm kết thúc của bài bản',
      acousticTip: 'Tiếng Tùng dứt khoát và tiếng Tắc đanh giòn giữ nhịp chuẩn mực',
      icon: '🥁'
    },
    {
      key: 'naoBat',
      name: 'Não Bạt (Chập Chõa)',
      han: '鐃鈸',
      category: 'Đại Nhạc',
      roleNote: 'Điểm xuyết chu kỳ nhịp lớn, tạo kịch tính hào hùng cho ngày đại lễ',
      acousticTip: 'Đồng thau nguyên chất ngân vang tạo dư âm kim khí vang rền',
      icon: '🔔'
    }
  ];

  const activeChannelsCount = Object.values(ensembleChannels).filter(Boolean).length;

  return (
    <div className="bg-[#171513] text-[#F2E8D5] min-h-screen py-6">
      <Breadcrumb items={[{ label: 'Trải nghiệm Số' }]} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs font-mono uppercase tracking-widest text-[#C9A45C] mb-2">
            Không gian Đa phương tiện & Tương tác Văn hóa · Thành phố Huế, Việt Nam
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-display text-[#FFF4DB]">
            KHÔNG GIAN TRẢI NGHIỆM SỐ
          </h1>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#C9A45C] to-transparent mx-auto mt-4" />
          <p className="mt-4 text-sm sm:text-base text-[#F2E8D5]/80 font-sans leading-relaxed">
            Hòa mình vào không gian hòa tấu đa bè trực quan, thử sức với bàn phím ngũ cung, chiêm ngưỡng tư liệu phục chế và khám phá thực tế ảo 360° nhà hát Duyệt Thị Đường.
          </p>
        </div>

        {/* Feature Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-[#493326]/30 border border-[#C9A45C]/30 rounded-lg max-w-4xl mx-auto">
          {[
            { id: 'studio', label: 'Music Research Studio (GĐ4)', icon: Activity },
            { id: 'ensemble', label: 'Phòng Hòa Tấu Trực Quan', icon: Sliders },
            { id: 'audio', label: 'Trình phát Bản Ngự', icon: Music },
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

        {/* TAB GIAI ĐOẠN 4: MUSIC RESEARCH STUDIO (PHÒNG NGHIÊN CỨU ÂM HỌC & KÝ ÂM) */}
        {activeTab === 'studio' && (
          <div className="space-y-6 max-w-6xl mx-auto">
            {/* Studio Header Card */}
            <div className="p-5 rounded-2xl bg-[#171513] border border-[#C9A45C]/50 flex flex-wrap items-center justify-between gap-4 shadow-xl">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#C9A45C] mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>PHÒNG NGHIÊN CỨU ÂM LUẬT & KÝ ÂM CUNG ĐÌNH HUẾ</span>
                  <span>·</span>
                  <span className="text-[#F2E8D5]/60">Giai đoạn 4 Core Engine</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-[#FFF4DB]">
                  Music Research Studio – Khảo cứu Ngũ cung & Điệu thức Cung đình
                </h2>
                <p className="text-xs text-[#F2E8D5]/80 font-sans mt-1">
                  Môi trường thực nghiệm âm học số hóa: Phân tích 7 bậc âm, ký âm giai điệu, đo phổ tần số FFT thời gian thực và tra cứu đối chiếu Fact-Store.
                </p>
              </div>

              <button
                onClick={() => setIsStudioModalOpen(true)}
                className="px-4 py-2 rounded-lg bg-[#781F25] hover:bg-[#A32A32] text-[#FFF4DB] border border-[#C9A45C]/50 text-xs font-bold flex items-center gap-1.5 shadow transition-all cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Mở Toàn màn hình Studio</span>
              </button>
            </div>

            {/* 6 Sub-systems Selector Strip */}
            <div className="flex items-center gap-1.5 overflow-x-auto p-1.5 bg-[#171513] border border-[#C9A45C]/30 rounded-xl scrollbar-none">
              {[
                { id: 'scales', label: '1. Pentatonic Scale Analyzer', icon: Sliders },
                { id: 'transcription', label: '2. Melody Transcription Studio', icon: Music },
                { id: 'spectrum', label: '3. Audio Spectrum Analyzer (FFT)', icon: Activity },
                { id: 'modes', label: '4. Musical Mode Explorer (Khách & Nam)', icon: Compass },
                { id: 'scores', label: '5. Traditional Music Score Library', icon: BookOpen },
                { id: 'ai', label: '6. AI Music Research Assistant', icon: Sparkles }
              ].map((sub) => {
                const Icon = sub.icon;
                const isActive = studioSubTab === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setStudioSubTab(sub.id as StudioTab)}
                    className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-[#781F25] text-[#FFF4DB] border border-[#E5C07B] shadow'
                        : 'text-[#F2E8D5]/70 hover:text-[#FFF4DB] hover:bg-[#493326]/30'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{sub.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Sub-system Container */}
            <div className="p-4 sm:p-6 rounded-2xl bg-[#171513]/90 border border-[#C9A45C]/30 shadow-2xl">
              {studioSubTab === 'scales' && <PentatonicScaleAnalyzer />}
              {studioSubTab === 'transcription' && <MelodyTranscriptionStudio />}
              {studioSubTab === 'spectrum' && <AudioSpectrumAnalyzer />}
              {studioSubTab === 'modes' && <MusicalModeExplorer />}
              {studioSubTab === 'scores' && <TraditionalMusicScoreLibrary />}
              {studioSubTab === 'ai' && <AiMusicResearchAssistant />}
            </div>
          </div>
        )}

        {/* TAB 0: PHÒNG HÒA TẤU TRỰC QUAN (INTERACTIVE VISUAL ENSEMBLE & CONCERT STAGE) */}
        {activeTab === 'ensemble' && (
          <div className="space-y-8 max-w-5xl mx-auto">
            {/* Giai đoạn 5: Nâng cấp Sân khấu Hòa tấu Trực quan Duyệt Thị Đường */}
            <ConcertVisualizerStage />

            {/* Master Console */}
            <div className="bg-[#171513] border border-[#C9A45C]/40 rounded-lg p-6 shadow-2xl space-y-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-[#C9A45C]/20">
                <div>
                  <div className="text-[11px] font-mono text-[#C9A45C] uppercase tracking-widest flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                    <span>Dàn nhạc hoàng gia ảo · {activeChannelsCount}/7 nhạc cụ đang phát</span>
                  </div>
                  <h2 className="text-2xl font-display font-bold text-[#FFF4DB] mt-1">
                    {currentTrack.title}
                  </h2>
                  <p className="text-xs text-[#F2E8D5]/70 font-sans mt-0.5">
                    {currentTrack.genre} · {currentTrack.origin}
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                  <button
                    onClick={handleResetEnsemble}
                    className="px-3 py-1.5 text-xs font-sans rounded border border-[#C9A45C]/30 text-[#E5C07B] hover:bg-[#781F25]/30 cursor-pointer"
                    title="Bật lại toàn bộ nhạc cụ"
                  >
                    Bật đủ 7 bè
                  </button>
                  <button
                    onClick={handleTogglePlay}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#C9A45C] to-[#E5C07B] text-[#171513] font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow-lg shadow-[#C9A45C]/20 transition-all cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                    <span>{isPlaying ? 'Tạm dừng hòa tấu' : 'Khởi tấu dàn nhạc'}</span>
                  </button>
                </div>
              </div>

              {/* Track Selector Bar */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-sans">
                <span className="text-[#C9A45C] font-mono uppercase text-[11px]">Chọn bản hòa tấu:</span>
                {AUDIO_TRACKS.map((trk) => (
                  <button
                    key={trk.id}
                    onClick={() => handleSelectTrack(trk)}
                    className={`px-3 py-1 rounded text-xs transition-all cursor-pointer ${
                      currentTrack.id === trk.id
                        ? 'bg-[#781F25] text-[#FFF4DB] border border-[#C9A45C] font-semibold'
                        : 'bg-[#493326]/30 text-[#F2E8D5]/70 hover:text-[#F2E8D5] border border-[#C9A45C]/20'
                    }`}
                  >
                    {trk.title}
                  </button>
                ))}
              </div>

              {/* Virtual Court Stage Visualizer */}
              <div className="relative rounded-lg border border-[#C9A45C]/30 bg-gradient-to-b from-[#2a1c14] to-[#171513] p-6 overflow-hidden">
                <div className="absolute top-2 left-3 text-[10px] font-mono text-[#C9A45C]/60 uppercase tracking-widest">
                  Sơ đồ sân khấu Duyệt Thị Đường
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 pt-6">
                  {ensembleInstruments.map((inst) => {
                    const isActiveChannel = ensembleChannels[inst.key];
                    const isTriggered = activeTrigger === inst.key;
                    const isSolo = soloInstrument === inst.key;

                    return (
                      <div
                        key={inst.key}
                        onClick={() => setFocusedInstrumentInfo(inst.key)}
                        className={`relative rounded-lg p-3 border transition-all cursor-pointer flex flex-col justify-between ${
                          isTriggered
                            ? 'bg-[#781F25] border-[#E5C07B] scale-105 shadow-lg shadow-[#C9A45C]/30 ring-2 ring-[#C9A45C]'
                            : isActiveChannel
                            ? 'bg-[#171513]/90 border-[#C9A45C]/40 hover:border-[#C9A45C]'
                            : 'bg-[#171513]/40 border-dashed border-[#F2E8D5]/20 opacity-50'
                        }`}
                      >
                        {/* Channel Status Indicator */}
                        <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                          <span className={`w-2 h-2 rounded-full ${isActiveChannel ? (isTriggered ? 'bg-[#FFF4DB] animate-ping' : 'bg-emerald-400') : 'bg-red-500'}`} />
                          <span className="text-[#C9A45C] text-[9px]">{inst.category}</span>
                        </div>

                        {/* Icon & Name */}
                        <div className="text-center my-2">
                          <div className="text-2xl mb-1">{inst.icon}</div>
                          <div className="text-xs font-display font-bold text-[#FFF4DB] line-clamp-1">
                            {inst.name.split(' (')[0]}
                          </div>
                          <div className="text-[10px] text-[#C9A45C] font-serif italic">
                            {inst.han}
                          </div>
                        </div>

                        {/* Control Buttons */}
                        <div className="grid grid-cols-2 gap-1 pt-2 border-t border-[#C9A45C]/20 text-[10px]">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleChannelMute(inst.key);
                            }}
                            className={`py-1 rounded text-center font-mono font-bold transition-colors cursor-pointer ${
                              isActiveChannel
                                ? 'bg-[#493326]/50 text-[#F2E8D5] hover:bg-[#781F25]'
                                : 'bg-red-900/60 text-red-200 hover:bg-red-800'
                            }`}
                            title={isActiveChannel ? 'Tắt tiếng bè này' : 'Bật tiếng bè này'}
                          >
                            {isActiveChannel ? 'ON' : 'MUTE'}
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleSolo(inst.key);
                            }}
                            className={`py-1 rounded text-center font-mono font-bold transition-colors cursor-pointer ${
                              isSolo
                                ? 'bg-[#C9A45C] text-[#171513]'
                                : 'bg-[#171513] text-[#C9A45C] hover:bg-[#C9A45C]/20 border border-[#C9A45C]/30'
                            }`}
                            title="Nghe độc tấu bè này"
                          >
                            SOLO
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Deep Analysis of Selected Instrument */}
              {focusedInstrumentInfo && (
                <div className="p-4 rounded-lg border border-[#C9A45C]/30 bg-[#493326]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  {(() => {
                    const inst = ensembleInstruments.find((i) => i.key === focusedInstrumentInfo);
                    if (!inst) return null;
                    return (
                      <div className="space-y-1 text-xs font-sans">
                        <div className="text-[11px] font-mono text-[#C9A45C] uppercase tracking-wider flex items-center gap-2">
                          <span>Phân tích vai trò học thuật:</span>
                          <span className="text-[#FFF4DB] font-bold">{inst.name}</span>
                          <span className="text-emerald-400">({inst.category})</span>
                        </div>
                        <p className="text-[#F2E8D5]/90 leading-relaxed">
                          <strong>Chức năng trong hòa tấu:</strong> {inst.roleNote}.
                        </p>
                        <p className="text-[#E5C07B] italic">
                          <strong>Đặc trưng âm học:</strong> {inst.acousticTip}.
                        </p>
                      </div>
                    );
                  })()}

                  <button
                    onClick={() => handleToggleSolo(focusedInstrumentInfo)}
                    className="shrink-0 px-3 py-1.5 text-xs font-semibold rounded bg-[#C9A45C] text-[#171513] hover:bg-[#E5C07B] cursor-pointer"
                  >
                    {soloInstrument === focusedInstrumentInfo ? 'Hủy độc tấu (Mở cả dàn)' : 'Chỉ nghe bè này (Solo)'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 1: AUDIO PLAYER */}
        {activeTab === 'audio' && (
          <div className="bg-[#171513] border border-[#C9A45C]/40 rounded-lg p-6 sm:p-10 shadow-2xl max-w-4xl mx-auto space-y-6">
            {/* Academic Notice Banner */}
            <div className="p-3.5 rounded border border-[#C9A45C]/30 bg-[#493326]/20 flex items-start gap-3 text-xs text-[#F2E8D5]/80 font-sans">
              <Info className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#E5C07B]">Lưu ý học thuật & công nghệ:</strong> Toàn bộ giai điệu và âm sắc trên trình phát được tổng hợp mô phỏng bằng công nghệ <strong>Web Audio API</strong> theo tần số chuẩn của thang âm ngũ cung hoàng gia để phục vụ mục đích giáo dục và nghiên cứu trực quan. Đây là âm thanh mô phỏng tương tác, <em>không phải bản thu âm diễn tấu Nhã nhạc nguyên gốc từ kho tư liệu lịch sử</em>.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
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

              <div className="md:col-span-7 space-y-6">
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
                        {isPlaying ? 'Đang tấu thanh âm mô phỏng ngũ cung' : 'Nhấn nút phát để lắng nghe giai điệu'}
                      </div>
                      <div className="text-[11px] text-[#F2E8D5]/60 font-sans">
                        Âm thanh tổng hợp mô phỏng Web Audio API
                      </div>
                    </div>
                  </div>

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

                <div className="space-y-2 pt-2 border-t border-[#493326]/40">
                  <div className="text-xs font-mono uppercase tracking-widest text-[#C9A45C]">
                    Danh sách khúc nhạc ngự cung đình
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
            <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
              <h3 className="text-2xl font-display font-bold text-[#E5C07B]">
                BÀN PHÍM TƯƠNG TÁC THANG ÂM NGŨ CUNG
              </h3>
              <p className="text-xs sm:text-sm text-[#F2E8D5]/80 font-sans">
                Hãy nhấn vào từng phím dưới đây để nghe âm hưởng của các nốt Hò, Xự, Xang, Xê, Cống trên các nhạc khí cung đình truyền thống.
              </p>
              <div className="text-[11px] font-mono text-[#C9A45C] bg-[#493326]/20 py-1 px-3 rounded inline-block border border-[#C9A45C]/30">
                (Âm thanh tổng hợp mô phỏng theo tần số Hz vật lý của thang âm phương Đông)
              </div>
            </div>

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

            <div className="p-4 rounded-lg border border-[#C9A45C]/30 bg-[#493326]/20 flex flex-wrap items-center justify-between gap-4 text-xs font-sans">
              <div className="text-[#F2E8D5]/80">
                <strong className="text-[#C9A45C]">Đổi âm sắc nhạc khí khác:</strong> Chọn loại nhạc cụ dưới đây rồi nhấn các phím ngũ cung:
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

        {/* TAB 3: GALLERY */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
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
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                  <div className="mt-4 flex items-start justify-between gap-4 font-sans">
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

        {/* TAB 4: VIDEO */}
        {activeTab === 'video' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
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
                  Ghi hình buổi diễn xướng của các nghệ nhân, nghệ sĩ Nhà hát Nghệ thuật Truyền thống Cung đình Huế trong trang phục gấm thêu long phụng ngũ sắc <sup className="text-[#C9A45C] font-mono">[5]</sup>.
                </p>
              </div>
            </div>

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
                  Toàn cảnh màn múa hoa đăng kết hợp âm nhạc Tiểu nhạc thâm trầm, vũ sinh chuyển hình tạo thành các chữ chúc thọ thái bình cho non sông xã tắc <sup className="text-[#C9A45C] font-mono">[5]</sup>.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: 360° */}
        {activeTab === 'space360' && (
          <div className="bg-[#171513] border border-[#C9A45C]/40 rounded-lg p-6 sm:p-10 shadow-2xl max-w-4xl mx-auto">
            <div className="relative h-96 rounded-lg overflow-hidden border border-[#C9A45C]/40">
              <img
                src="/src/assets/images/duyet_thi_duong_theater_1793928493481.jpg"
                alt="360 Không gian Duyệt Thị Đường"
                className="w-full h-full object-cover object-center filter brightness-95"
              />
              <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/20 to-black/70" />

              <div className="absolute top-4 left-4 p-2.5 rounded bg-[#171513]/85 border border-[#C9A45C]/40 text-xs">
                <div className="font-mono text-[#C9A45C] uppercase">Không gian thực tế ảo 360°</div>
                <div className="font-display font-bold text-[#FFF4DB]">Nội thất Duyệt Thị Đường Hoàng Cung</div>
              </div>

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

              <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between text-xs text-[#F2E8D5]/80 bg-[#171513]/85 p-3 rounded border border-[#C9A45C]/30 font-sans">
                <span>Di chuyển chuột để khám phá toàn cảnh kiến trúc nhà hát cổ</span>
                <span className="text-[#C9A45C] font-mono">1826 · Triều vua Minh Mạng</span>
              </div>
            </div>
          </div>
        )}

        {/* References Footer Box */}
        <div className="bg-[#12100e] border border-[#C9A45C]/30 p-6 rounded-lg text-xs font-sans">
          <div className="text-xs font-mono uppercase tracking-widest text-[#C9A45C] mb-2">
            Tư liệu tham khảo cho chuyên trang Trải nghiệm số:
          </div>
          <p className="text-[#F2E8D5]/70 mb-3">
            Giai điệu các bài bản dựa trên ký âm truyền thống Huế <sup className="text-[#C9A45C] font-mono">[10]</sup>; tư liệu hình ảnh và video do Nhà hát Nghệ thuật Truyền thống Cung đình Huế <sup className="text-[#C9A45C] font-mono">[5]</sup> và Cổng Thông tin Du lịch Huế <sup className="text-[#C9A45C] font-mono">[6]</sup> công bố.
          </p>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#493326]/40">
            <Link to="/nguon-tham-khao" className="text-[#C9A45C] hover:text-[#E5C07B] flex items-center gap-1 font-semibold">
              <span>Xem danh mục 10 nguồn tài liệu đầy đủ</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <Link to="/bao-ton" className="text-[#E5C07B] hover:underline flex items-center gap-1">
              <span>Tiếp theo: Xem Công tác Bảo tồn & Phát huy Di sản</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Music Research Studio Modal */}
        <MusicResearchStudioModal
          isOpen={isStudioModalOpen}
          onClose={() => setIsStudioModalOpen(false)}
          initialTab={studioSubTab}
        />
      </main>
    </div>
  );
};
