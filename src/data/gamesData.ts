/**
 * Dữ liệu 4 Trò chơi Tương tác Giáo dục về Nhã nhạc Cung đình Huế
 * 1. Trắc nghiệm Lịch sử & Điển chế
 * 2. Nhận diện Nhạc khí qua Hình ảnh
 * 3. Định vị Không gian Di sản trên Bản đồ
 * 4. Ghép nối Nhạc cụ & Vai trò trong Biên chế
 */

export interface MapQuizQuestion {
  id: number;
  question: string;
  hint: string;
  targetSiteId: string;
  options: { siteId: string; name: string }[];
  explanation: string;
}

export interface MatchingPair {
  id: string;
  instrumentName: string;
  hanViet: string;
  correctRole: string;
  category: string;
}

export interface HeritageBadge {
  id: string;
  title: string;
  description: string;
  requiredPoints: number;
  iconName: string;
}

export const MAP_QUIZ_QUESTIONS: MapQuizQuestion[] = [
  {
    id: 1,
    question: 'Địa điểm nào là Nhà hát hoàng gia cổ nhất Việt Nam (xây năm 1826 thời vua Minh Mạng), nơi các nghệ sĩ biểu diễn Nhã nhạc phục vụ vua chúa xưa và du khách hôm nay?',
    hint: 'Nằm bên trong Tử Cấm Thành – Hoàng thành Huế.',
    targetSiteId: 'duyet-thi-duong',
    options: [
      { siteId: 'dien-thai-hoa', name: 'Điện Thái Hòa' },
      { siteId: 'duyet-thi-duong', name: 'Nhà hát Duyệt Thị Đường' },
      { siteId: 'dan-nam-giao', name: 'Đàn Nam Giao' },
      { siteId: 'the-mieu', name: 'Thế Miếu' }
    ],
    explanation: 'Duyệt Thị Đường xây dựng năm 1826 dưới triều vua Minh Mạng, là nhà hát hoàng gia cổ nhất còn tồn tại của Việt Nam.'
  },
  {
    id: 2,
    question: 'Nơi diễn ra các buổi Đại triều mùng một và ngày rằm hàng tháng, nơi tiếng trống chiến và kèn bầu của dàn Đại nhạc vang lừng trước sân rồng hai tầng là?',
    hint: 'Công trình biểu tượng ở trung tâm trục dũng đạo Hoàng thành Huế.',
    targetSiteId: 'dien-thai-hoa',
    options: [
      { siteId: 'dien-thai-hoa', name: 'Điện Thái Hòa & Sân Đại Triều' },
      { siteId: 'bao-tang-co-vat-cung-dinh', name: 'Bảo tàng Cổ vật Cung đình' },
      { siteId: 'duyet-thi-duong', name: 'Nhà hát Duyệt Thị Đường' },
      { siteId: 'dan-nam-giao', name: 'Đàn Nam Giao' }
    ],
    explanation: 'Điện Thái Hòa là nơi cử hành lễ Đại triều và đăng quang, có sân rồng hai tầng phân chia thứ bậc cửu phẩm bá quan.'
  },
  {
    id: 3,
    question: 'Khu tế đàn ngoài trời thiêng liêng ở phía Nam kinh thành Huế với ba tầng Viên Đàn (Trời), Phương Đàn (Đất) là nơi cất lên khúc nhạc nào?',
    hint: 'Nằm tại đồi thông Ngự Bình, thành phố Huế.',
    targetSiteId: 'dan-nam-giao',
    options: [
      { siteId: 'the-mieu', name: 'Thế Miếu' },
      { siteId: 'dan-nam-giao', name: 'Đàn Nam Giao (Giao Nhạc)' },
      { siteId: 'dien-thai-hoa', name: 'Điện Thái Hòa' },
      { siteId: 'duyet-thi-duong', name: 'Duyệt Thị Đường' }
    ],
    explanation: 'Đàn Nam Giao xây dựng năm 1806 thời vua Gia Long, nơi vua tế Trời Đất vào lúc rạng sáng với dàn Giao nhạc trang nghiêm nhất.'
  },
  {
    id: 4,
    question: 'Nơi thờ tự mười ba vị hoàng đế nhà Nguyễn, nơi lưu giữ 9 đỉnh đồng khổng lồ (Cửu Đỉnh) và diễn ra nghi thức Miếu nhạc thành kính là?',
    hint: 'Nằm ở góc Tây Nam Hoàng thành Huế.',
    targetSiteId: 'the-mieu',
    options: [
      { siteId: 'the-mieu', name: 'Thế Miếu & Cửu Đỉnh' },
      { siteId: 'duyet-thi-duong', name: 'Duyệt Thị Đường' },
      { siteId: 'bao-tang-co-vat-cung-dinh', name: 'Bảo tàng Cổ vật Cung đình' },
      { siteId: 'dan-nam-giao', name: 'Đàn Nam Giao' }
    ],
    explanation: 'Thế Miếu xây dựng năm 1821 thời vua Minh Mạng để thờ cúng tổ tiên hoàng triều, cử hành Miếu nhạc thiêng liêng.'
  }
];

export const MATCHING_PAIRS: MatchingPair[] = [
  {
    id: 'ken-bau',
    instrumentName: 'Kèn Bầu',
    hanViet: 'Gia Lệnh',
    correctRole: 'Nhạc cụ lĩnh xướng, dẫn dắt toàn bộ giai điệu dàn Đại Nhạc',
    category: 'Bộ Hơi'
  },
  {
    id: 'trong-ban',
    instrumentName: 'Trống Bản',
    hanViet: 'Bản Cổ',
    correctRole: 'Nhạc cụ chỉ huy giữ nhịp chính, báo hiệu chuyển đoạn cho toàn ban nhạc',
    category: 'Bộ Gõ'
  },
  {
    id: 'dan-ty-ba',
    instrumentName: 'Đàn Tỳ Bà',
    hanViet: 'Tỳ Bà Cầm',
    correctRole: 'Nhạc cụ quý tộc giữ giai điệu chính thanh nhã, kết nối âm sắc Tiểu Nhạc',
    category: 'Bộ Dây'
  },
  {
    id: 'trong-chien',
    instrumentName: 'Trống Chiến',
    hanViet: 'Chiến Cổ',
    correctRole: 'Tạo khí thế hào hùng rền vang như sấm dậy trong đại lễ ngoài trời',
    category: 'Bộ Gõ'
  },
  {
    id: 'dan-nguyet',
    instrumentName: 'Đàn Nguyệt',
    hanViet: 'Nguyệt Cầm / Đàn Kìm',
    correctRole: 'Định hình giai điệu ngũ cung, tạo các vi âm uốn lượn phong vị xứ Huế',
    category: 'Bộ Dây'
  },
  {
    id: 'tam-am-la',
    instrumentName: 'Tam Âm La',
    hanViet: 'Tam Âm La',
    correctRole: 'Điểm xuyết chu kỳ nhịp với âm thanh ba chiếc chiêng đồng ngân nga',
    category: 'Bộ Gõ'
  }
];

export const HERITAGE_BADGES: HeritageBadge[] = [
  {
    id: 'badge-nhac-sinh',
    title: 'Huy hiệu Nhạc Sinh Sơ Khảo',
    description: 'Bắt đầu hành trình tìm hiểu và hoàn thành thử thách đầu tiên.',
    requiredPoints: 50,
    iconName: 'Sparkles'
  },
  {
    id: 'badge-tham-hoa',
    title: 'Huy hiệu Thám Hoa Cố Đô',
    description: 'Nắm vững kiến thức lịch sử, nhận diện chính xác các nhạc cụ cung đình.',
    requiredPoints: 150,
    iconName: 'Award'
  },
  {
    id: 'badge-bang-nhan',
    title: 'Huy hiệu Bảng Nhãn Âm Luật',
    description: 'Thuộc lòng thang âm ngũ cung và định vị chính xác các không gian di sản Huế.',
    requiredPoints: 300,
    iconName: 'Medal'
  },
  {
    id: 'badge-trang-nguyen',
    title: 'Huy hiệu Trạng Nguyên Di Sản',
    description: 'Đạt đỉnh cao am hiểu toàn diện về lịch sử, nhạc cụ, điển lễ và bảo tồn Nhã nhạc.',
    requiredPoints: 500,
    iconName: 'Crown'
  }
];
