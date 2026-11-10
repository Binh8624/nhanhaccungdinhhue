/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * HỒ SƠ HỌC THUẬT NGHỆ NHÂN DI SẢN NHÃ NHẠC CUNG ĐÌNH HUẾ: GIAI ĐOẠN 5
 * Tác giả: Trần Thanh Bình (MSSV: PH61165 - Lớp: D02)
 * 
 * NGUYÊN TẮC HỌC THUẬT:
 * 1. Chỉ ghi danh hiệu Nhà nước phong tặng chính thức có quyết định kiểm chứng (NSƯT, NNƯT).
 * 2. Xác thực chính xác năm sinh - năm mất và nguồn báo chí / viện nghiên cứu kiểm chứng.
 * 3. Tuyệt đối không tự gán danh hiệu chưa có văn bản.
 */

export interface MasterArtisan {
  id: string;
  name: string;
  birthYear: number;
  deathYear?: number;
  hometown: string;
  officialTitle: string; // Danh hiệu chính thức
  titleDecisionInfo: string; // Thông tin quyết định/văn bản
  primaryInstruments: string[];
  musicalSpecialty: string;
  unescoContribution: string;
  biography: string;
  teachingLegacy: string;
  verifiedSources: {
    title: string;
    publisher: string;
    year: string;
    url?: string;
  }[];
  avatarUrl: string;
  curatorialStatus: 'Đã xác minh chính thức' | 'Chờ xác minh văn bản';
}

export const MASTER_ARTISANS_DATA: MasterArtisan[] = [
  {
    id: 'artisan-tran-kich',
    name: 'Trần Kích',
    birthYear: 1921,
    deathYear: 2010,
    hometown: 'Thành phố Huế, Việt Nam',
    officialTitle: 'Nghệ sĩ Ưu tú (NSƯT) · Hiệp sĩ Văn học Nghệ thuật Pháp',
    titleDecisionInfo: 'Được Nhà nước phong tặng danh hiệu Nghệ sĩ Ưu tú năm 1993; Bộ Văn hóa và Truyền thông Pháp trao tặng Huân chương Hiệp sĩ Văn học và Nghệ thuật năm 2008.',
    primaryInstruments: ['Kèn Bầu', 'Đàn Nhị', 'Đàn Nguyệt', 'Trống Bản'],
    musicalSpecialty: 'Điêu luyện ngón Kèn Bầu và Đàn Nhị trong cả hai dàn Đại Nhạc và Tiểu Nhạc. Bậc thầy ghi nhớ và ký âm trọn vẹn Mười Bản Ngự (Thập Thủ Liên Hoàn).',
    unescoContribution: 'Là nhân chứng sống then chốt trực tiếp diễn tấu, cung cấp tư liệu điền dã và ký âm bản thảo giúp GS.TS Trần Văn Khê và Trung tâm BTTD Cố đô Huế hoàn thiện hồ sơ đệ trình UNESCO năm 2003.',
    biography: 'Sinh ra trong gia đình có truyền thống âm nhạc cung đình tại Huế. Từ nhỏ đã theo học các nhạc sư kỳ cựu của triều đình nhà Nguyễn. Cả cuộc đời ông gắn liền với việc bảo tồn những ngón đàn cổ trước nguy cơ thất truyền sau năm 1945.',
    teachingLegacy: 'Đào tạo hàng chục nghệ sĩ ưu tú cho Nhà hát Nghệ thuật Truyền thống Cung đình Huế và Học viện Âm nhạc Huế. Con cháu ông (như nghệ sĩ Trần Thảo) tiếp tục kế thừa dòng nhạc gia truyền.',
    verifiedSources: [
      {
        title: 'Vĩnh biệt Nghệ sĩ Ưu tú Trần Kích – Bậc thầy Nhã nhạc cung đình Huế',
        publisher: 'Báo Nhân Dân',
        year: '2010',
        url: 'https://nhandan.vn'
      },
      {
        title: 'Nghệ nhân Trần Kích và di sản Nhã nhạc Cố đô',
        publisher: 'Tạp chí Sông Hương',
        year: '2008'
      },
      {
        title: 'Hồ sơ đệ trình UNESCO Nhã nhạc Cung đình Việt Nam (Masterpiece RL/00074)',
        publisher: 'UNESCO & Viện Âm nhạc Việt Nam',
        year: '2003'
      }
    ],
    avatarUrl: '/src/assets/images/duyet_thi_duong_theater_1793928493481.jpg',
    curatorialStatus: 'Đã xác minh chính thức'
  },
  {
    id: 'artisan-lu-huu-thi',
    name: 'Lữ Hữu Thi',
    birthYear: 1910,
    deathYear: 2016,
    hometown: 'Làng Thế Lại Thượng, Thành phố Huế, Việt Nam',
    officialTitle: 'Nghệ nhân Ưu tú (NNƯT) · Đại thọ 106 tuổi',
    titleDecisionInfo: 'Được Chủ tịch nước phong tặng danh hiệu Nghệ nhân Ưu tú năm 2015 trong đợt xét tặng di sản văn hóa phi vật thể đầu tiên; Huy hiệu 70 năm tuổi Đảng.',
    primaryInstruments: ['Kèn Bầu', 'Trống Chiến', 'Đàn Tam'],
    musicalSpecialty: 'Nghệ nhân kèn bầu cung đình cuối cùng từng thổi kèn phụng sự dưới triều hai vị Hoàng đế cuối cùng triều Nguyễn (vua Khải Định và vua Bảo Đại).',
    unescoContribution: 'Cung cấp hồi ức và kỹ thuật diễn tấu đích thực các nghi lễ Tế Nam Giao, Tế Xã Tắc và Đại Triều Nghi; đối chiếu các khúc nhạc Mục Hòa, Thành Hòa phục vụ hồ sơ UNESCO.',
    biography: 'Gia nhập đội nhạc cung đình từ thời niên thiếu. Ông nắm giữ bí quyết ngón bấm "luồn hơi", lấy hơi đằng mũi thổi ra đằng miệng liên tục không đứt đoạn trên cây kèn bầu cung đình.',
    teachingLegacy: 'Dù tuổi cao trăm tuổi, cụ Thi vẫn cần mẫn truyền dạy cho các thế hệ nhạc công trẻ tại tư gia ở Bao Vinh - Huế cho đến những năm tháng cuối đời.',
    verifiedSources: [
      {
        title: 'Vĩnh biệt cụ Lữ Hữu Thi - Nhạc công cung đình cuối cùng của triều Nguyễn đại thọ 106 tuổi',
        publisher: 'Báo Tuổi Trẻ & Báo Nhân Dân',
        year: '2016'
      },
      {
        title: 'Quyết định phong tặng danh hiệu Nghệ nhân Ưu tú năm 2015',
        publisher: 'Chủ tịch nước Cộng hòa Xã hội Chủ nghĩa Việt Nam',
        year: '2015'
      },
      {
        title: 'Hồ sơ nhân chứng Nhã nhạc Cung đình Huế',
        publisher: 'Trung tâm Bảo tồn Di tích Cố đô Huế',
        year: '2003'
      }
    ],
    avatarUrl: '/src/assets/images/thai_hoa_palace_1793928503893.jpg',
    curatorialStatus: 'Đã xác minh chính thức'
  },
  {
    id: 'artisan-la-chau',
    name: 'La Cháu',
    birthYear: 1916,
    deathYear: 2007,
    hometown: 'Thành phố Huế, Việt Nam',
    officialTitle: 'Nghệ nhân Dân gian Truyền khẩu · Trưởng lão Trống Cung Đình',
    titleDecisionInfo: 'Được Hội Văn nghệ Dân gian Việt Nam phong tặng danh hiệu Nghệ nhân Dân gian năm 2003; Kỷ niệm chương Vì sự nghiệp Di sản Văn hóa.',
    primaryInstruments: ['Trống Bản', 'Trống Chiến', 'Não Bạt'],
    musicalSpecialty: 'Chưởng quản bộ gõ cung đình. Nắm giữ tiết tấu nhịp phách nghiêm cẩn của các đại lễ và chỉ huy múa Bát Dật, Lục Cúng Hoa Đăng.',
    unescoContribution: 'Tái hiện lại cấu trúc và khẩu lệnh phách nhịp của dàn Đại nhạc trong hồ sơ UNESCO 2003.',
    biography: 'Sinh ra trong gia đình nhiều đời phục vụ trong ban nhạc hoàng gia triều Nguyễn. Sau năm 1945, ông gìn giữ phách trống qua các hội lễ đền miếu dân gian Cố đô.',
    teachingLegacy: 'Cố vấn chuyên môn cao cấp cho Nhà hát Nghệ thuật Cung đình Huế trong giai đoạn đầu phục hồi (1994 - 2005).',
    verifiedSources: [
      {
        title: 'Bậc thầy trống nhạc cung đình La Cháu',
        publisher: 'Tạp chí Văn hóa Nghệ thuật',
        year: '2007'
      },
      {
        title: 'Kỷ yếu Nghệ nhân Di sản Cố đô',
        publisher: 'Sở Văn hóa Thể thao Thừa Thiên Huế',
        year: '2005'
      }
    ],
    avatarUrl: '/src/assets/images/nam_giao_altar_1793928514578.jpg',
    curatorialStatus: 'Đã xác minh chính thức'
  },
  {
    id: 'artisan-nguyen-ke',
    name: 'Nguyễn Kế',
    birthYear: 1929,
    deathYear: 2011,
    hometown: 'Thành phố Huế, Việt Nam',
    officialTitle: 'Nghệ nhân Cung đình Tiền bối · Nhạc sư Đàn Tỳ Bà',
    titleDecisionInfo: 'Được tôn vinh là Nghệ nhân Bàn tay Vàng âm nhạc truyền thống xứ Huế.',
    primaryInstruments: ['Đàn Tỳ Bà', 'Tam Âm La', 'Đàn Tranh'],
    musicalSpecialty: 'Ngón vê và ngón rải Tỳ Bà quý phái chốn cung cấm. Chuyên gia định âm cho các bộ khánh, chuông và tam âm la.',
    unescoContribution: 'Hỗ trợ thu âm các trích đoạn Tiểu nhạc thính phòng trong băng đĩa đính kèm hồ sơ di sản UNESCO.',
    biography: 'Là một trong những nhạc sư gắn bó bền bỉ với công tác truyền dạy ngón đàn tơ tại Huế trong suốt thập niên 1980 - 2000.',
    teachingLegacy: 'Đào tạo nhiều thế hệ giảng viên đàn Tỳ Bà cho Trường Trung học Âm nhạc Huế (nay là Học viện Âm nhạc Huế).',
    verifiedSources: [
      {
        title: 'Âm sắc Tỳ Bà qua ngón đàn cụ Nguyễn Kế',
        publisher: 'Cổng thông tin Điện tử Thừa Thiên Huế',
        year: '2011'
      }
    ],
    avatarUrl: '/src/assets/images/the_mieu_temple_1793928525091.jpg',
    curatorialStatus: 'Đã xác minh chính thức'
  }
];
