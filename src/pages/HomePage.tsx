import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Volume2,
  BookOpen,
  History,
  Music,
  Theater,
  MapPin,
  Users2,
  Shield,
  HelpCircle,
  FileText,
  Award,
  Compass,
  Archive,
  Bot
} from 'lucide-react';
import { HERITAGE_STATISTICS, GALLERY_PHOTOS } from '../data/heritageData';

export const HomePage: React.FC = () => {
  const portalSections = [
    {
      title: 'Giới thiệu Di sản',
      desc: 'Tìm hiểu nguồn gốc, thang âm ngũ cung và giá trị văn hóa bác học.',
      path: '/gioi-thieu',
      icon: BookOpen,
      badge: 'Tổng quan'
    },
    {
      title: 'Dòng chảy Lịch sử',
      desc: 'Hành trình nghìn năm từ thời Lý - Trần qua triều Nguyễn đến hôm nay.',
      path: '/lich-su',
      icon: History,
      badge: 'Thế kỷ XI - XXI'
    },
    {
      title: 'Hệ thống Nhạc cụ',
      desc: 'Khám phá 10+ nhạc cụ cung đình tinh xảo và nghe thử âm sắc ngũ cung.',
      path: '/nhac-cu',
      icon: Music,
      badge: 'Bộ Gõ · Hơi · Dây'
    },
    {
      title: 'Loại hình Biểu diễn',
      desc: 'Các lễ nghi Giao, Miếu, Đại triều và vũ khúc Lục Cúng Hoa Đăng.',
      path: '/bieu-dien',
      icon: Theater,
      badge: 'Đại nhạc & Tiểu nhạc'
    },
    {
      title: 'Địa bàn Di sản',
      desc: 'Không gian văn hóa Cố đô Huế: Duyệt Thị Đường, Điện Thái Hòa, Đàn Nam Giao.',
      path: '/dia-ban',
      icon: MapPin,
      badge: 'Thành phố Huế, Việt Nam'
    },
    {
      title: 'Cộng đồng Chủ thể',
      desc: 'Những bậc nghệ nhân gạo cội, nghệ sĩ nhạc công và thế hệ trẻ kế thừa.',
      path: '/chu-the',
      icon: Users2,
      badge: 'Con người di sản'
    },
    {
      title: 'Không gian Trải nghiệm',
      desc: 'Phòng hòa tấu đa bè trực quan, trình phát âm thanh và bàn phím ngũ cung.',
      path: '/trai-nghiem',
      icon: Volume2,
      badge: 'Tương tác số'
    },
    {
      title: 'Bảo tồn & Phát huy',
      desc: 'Chiến lược số hóa, vượt qua thách thức và các đề xuất cho giới trẻ.',
      path: '/bao-ton',
      icon: Shield,
      badge: 'Trách nhiệm thế hệ'
    },
    {
      title: 'Góc Khám phá (4 Game)',
      desc: '10 câu trắc nghiệm, nhận diện nhạc cụ, định vị bản đồ và ghép nối vai trò.',
      path: '/kham-pha',
      icon: HelpCircle,
      badge: '4 Game tương tác'
    },
    {
      title: 'Hành trình Nhập vai',
      desc: 'Mô phỏng 5 thời khắc tế tự hoàng triều từ bình minh sương mờ đến yến tiệc hoa đăng.',
      path: '/hanh-trinh-nhap-vai',
      icon: Compass,
      badge: 'Mô phỏng giáo dục'
    },
    {
      title: 'Kho Lưu trữ Di sản',
      desc: 'Tra cứu văn bản Hán Nôm, bản thu mẫu mực và phim tư liệu phục dựng đại lễ.',
      path: '/kho-luu-tru',
      icon: Archive,
      badge: 'Thư tịch & Tư liệu'
    },
    {
      title: 'AI Hướng dẫn viên Di sản',
      desc: 'Trợ lý số giải đáp các thắc mắc về Nhã nhạc bám sát tư liệu khoa học có dẫn nguồn.',
      path: '/huong-dan-vien-ai',
      icon: Bot,
      badge: 'Hỏi đáp có căn cứ'
    },
    {
      title: 'Tư liệu & Nguồn tham khảo',
      desc: 'Hồ sơ khoa học UNESCO, Khâm Định Hội Điển, Cục Di sản, Báo Pháp Luật và Báo Tuổi Trẻ.',
      path: '/nguon-tham-khao',
      icon: FileText,
      badge: '12 nguồn chính thống'
    }
  ];

  return (
    <div className="bg-[#171513] text-[#F2E8D5] min-h-screen">
      {/* 1. HERO BANNER TOÀN MÀN HÌNH */}
      <section className="relative min-h-[90vh] flex flex-col justify-between overflow-hidden border-b border-[#C9A45C]/30">
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_nha_nhac_hue_1793928492915.jpg"
            alt="Nhã nhạc Cung đình Huế biểu diễn tại Hoàng thành"
            className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171513] via-[#171513]/70 to-[#171513]/40" />
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#171513]/30 to-[#171513]/80" />
        </div>

        {/* Content Box */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 flex-1 flex flex-col justify-center items-center text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-6 rounded border border-[#C9A45C]/40 bg-[#781F25]/70 backdrop-blur-md text-[#E5C07B] text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
            <span>Kiệt tác Di sản Phi vật thể Đại diện của Nhân loại · UNESCO</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-b from-[#FFF4DB] via-[#F2E8D5] to-[#C9A45C] tracking-tight max-w-5xl leading-tight">
            NHÃ NHẠC CUNG ĐÌNH HUẾ
          </h1>

          <p className="mt-4 text-xl sm:text-2xl md:text-3xl font-display italic text-[#E5C07B] tracking-wide">
            “Âm vang nghìn năm – Hồn thiêng cố đô”
          </p>

          <p className="mt-6 text-base sm:text-lg text-[#F2E8D5]/90 max-w-3xl font-sans leading-relaxed text-balance">
            Đỉnh cao của nền âm nhạc bác học cổ truyền Việt Nam, kết tinh qua các triều đại phong kiến và tỏa sáng rực rỡ nhất dưới triều Nguyễn. Nơi tiếng chuông, tiếng khánh, tiếng kèn bầu hòa quyện cùng non sông, đất trời chốn Cố đô di sản.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/gioi-thieu"
              className="flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-[#171513] bg-gradient-to-r from-[#C9A45C] to-[#E5C07B] hover:brightness-110 active:scale-95 transition-all rounded shadow-lg cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-[#171513]" />
              <span>Khám phá Di sản</span>
            </Link>

            <Link
              to="/trai-nghiem"
              className="flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-[#F2E8D5] bg-[#781F25]/85 hover:bg-[#781F25] border border-[#C9A45C]/50 active:scale-95 transition-all rounded shadow-lg cursor-pointer"
            >
              <Volume2 className="w-4 h-4 text-[#C9A45C]" />
              <span>Trải nghiệm Âm thanh</span>
            </Link>
          </div>
        </div>

        {/* Statistical strip */}
        <div className="relative z-10 w-full border-t border-[#C9A45C]/30 bg-[#171513]/90 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
              {HERITAGE_STATISTICS.map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <span className="font-display text-2xl sm:text-3xl font-bold text-[#E5C07B] tabular-nums">
                    {stat.value}
                  </span>
                  <span className="text-xs font-semibold text-[#F2E8D5] mt-0.5 tracking-wide">
                    {stat.label}
                  </span>
                  <span className="text-[11px] text-[#F2E8D5]/60 mt-0.5">
                    {stat.sublabel}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. KHU VỰC CHUYÊN MỤC NỔI BẬT DẪN TỚI CÁC TRANG CON */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#C9A45C]/20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#C9A45C] mb-3">
            <Sparkles className="w-4 h-4 text-[#C9A45C]" />
            <span>Hệ Thống Trưng Bày Đa Trang</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#F2E8D5] tracking-tight">
            CÁC KHÔNG GIAN BẢO TÀNG SỐ
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#C9A45C] to-transparent mx-auto mt-4" />
          <p className="mt-4 text-sm sm:text-base text-[#F2E8D5]/80 font-sans leading-relaxed">
            Chọn một chuyên mục bên dưới để bước vào từng gian trưng bày nghiên cứu chuyên sâu về Nhã nhạc cung đình Huế.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portalSections.map((portal) => {
            const Icon = portal.icon;
            return (
              <Link
                key={portal.path}
                to={portal.path}
                className="group relative rounded-lg border border-[#C9A45C]/25 bg-[#171513]/90 hover:border-[#C9A45C] transition-all duration-300 p-6 flex flex-col justify-between hover:-translate-y-1 shadow-lg hover:shadow-[#C9A45C]/10"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#781F25]/30 border border-[#C9A45C]/40 flex items-center justify-center text-[#C9A45C] group-hover:bg-[#781F25] group-hover:text-[#FFF4DB] transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono text-[#E5C07B] bg-[#493326]/30 px-2 py-0.5 rounded border border-[#C9A45C]/20">
                      {portal.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-[#F2E8D5] group-hover:text-[#E5C07B] transition-colors mb-2">
                    {portal.title}
                  </h3>

                  <p className="text-xs text-[#F2E8D5]/75 font-sans leading-relaxed">
                    {portal.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#493326]/40 flex items-center justify-between text-xs text-[#C9A45C] font-semibold group-hover:text-[#E5C07B]">
                  <span>Vào trang trưng bày</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. TỔNG QUAN ĐỊA BÀN & CỘNG ĐỒNG TIÊU BIỂU */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#C9A45C]/20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Địa bàn Huế */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C9A45C]">
              <MapPin className="w-4 h-4 text-[#C9A45C]" />
              <span>Địa bàn Di sản Trọng tâm</span>
            </div>
            <h2 className="text-3xl font-display font-bold text-[#F2E8D5]">
              CỐ ĐÔ HUẾ – NƠI LƯU DẤU ÂM NHẠC HOÀNG GIA
            </h2>
            <p className="text-sm text-[#F2E8D5]/80 font-sans leading-relaxed">
              Trọng tâm nghiên cứu thuộc khu vực <strong>Bắc Trung Bộ</strong>, thành phố Huế là cái nôi gìn giữ toàn vẹn quần thể kiến trúc và không gian diễn xướng cung đình: từ sân rồng Điện Thái Hòa, nhà hát cổ Duyệt Thị Đường đến Đàn Nam Giao linh thiêng.
            </p>
            <div className="flex gap-4">
              <Link
                to="/dia-ban"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#171513] bg-[#C9A45C] hover:bg-[#E5C07B] px-4 py-2.5 rounded transition-all"
              >
                <span>Khám phá bản đồ di tích Huế</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right: Preview Image Slot */}
          <div className="relative rounded-lg overflow-hidden border border-[#C9A45C]/40 shadow-2xl">
            <img
              src="/src/assets/images/duyet_thi_duong_theater_1793928493481.jpg"
              alt="Nhà hát Duyệt Thị Đường Huế"
              className="w-full h-80 object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#171513] via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-xs font-serif italic text-[#E5C07B]">
              Nhà hát Duyệt Thị Đường (1826) – Không gian biểu diễn Nhã nhạc cổ nhất Việt Nam trong Đại Nội Huế.
            </div>
          </div>
        </div>
      </section>

      {/* 4. MỘT SỐ HÌNH ẢNH TIÊU BIỂU */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#C9A45C]/20">
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#C9A45C]">
              Kho tư liệu thị giác
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#F2E8D5] mt-1">
              HÌNH ẢNH DI SẢN TIÊU BIỂU
            </h2>
          </div>
          <Link
            to="/trai-nghiem"
            className="text-xs text-[#C9A45C] hover:text-[#E5C07B] font-semibold flex items-center gap-1.5"
          >
            <span>Xem toàn bộ thư viện ảnh & video</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {GALLERY_PHOTOS.slice(0, 4).map((p) => (
            <div
              key={p.id}
              className="group relative h-60 rounded-lg overflow-hidden border border-[#C9A45C]/30 bg-[#171513]"
            >
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171513] via-black/30 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-[10px] font-mono text-[#E5C07B] uppercase">{p.category}</span>
                <h4 className="text-sm font-display font-bold text-[#FFF4DB] line-clamp-1">{p.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. DẤU MỐC UNESCO & TƯ LIỆU XÁC THỰC */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 rounded-lg border border-[#C9A45C]/40 bg-gradient-to-br from-[#781F25]/30 via-[#493326]/30 to-[#171513]">
          <div className="inline-flex p-3 rounded-full bg-[#C9A45C]/20 text-[#E5C07B] mb-3">
            <Award className="w-8 h-8 text-[#C9A45C]" />
          </div>
          <h3 className="text-2xl font-display font-bold text-[#FFF4DB]">
            DI SẢN VĂN HÓA PHI VẬT THỂ ĐẠI DIỆN CỦA NHÂN LOẠI
          </h3>
          <p className="text-xs sm:text-sm text-[#F2E8D5]/90 max-w-2xl mx-auto mt-2 leading-relaxed">
            Nhã nhạc cung đình Huế được UNESCO vinh danh là <strong>Kiệt tác Di sản Truyền khẩu và Phi vật thể của Nhân loại (2003)</strong> và ghi danh vào <strong>Danh sách Di sản Văn hóa Phi vật thể Đại diện của Nhân loại (2008)</strong>.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              to="/nguon-tham-khao"
              className="text-xs font-semibold text-[#C9A45C] hover:text-[#E5C07B] underline underline-offset-4"
            >
              Xem chi tiết 10 nguồn tài liệu khoa học & hồ sơ UNESCO →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
