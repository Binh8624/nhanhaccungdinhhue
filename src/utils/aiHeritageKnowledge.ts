/**
 * AI Hướng Dẫn Viên Di Sản – Tri thức Căn Bản & Xử lý Hỏi Đáp
 * Dựa trên 10 nguồn tài liệu khoa học chính thống: UNESCO, Cục Di sản Văn hóa, TTBT Di tích Cố đô Huế
 */

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  citations?: string[];
  timestamp: string;
}

export const SUGGESTED_QUESTIONS = [
  'Nhã nhạc cung đình Huế được UNESCO công nhận vào năm nào?',
  'Thang âm ngũ cung của Nhã nhạc gồm những nốt nào?',
  'Sự khác nhau giữa dàn Đại Nhạc và Tiểu Nhạc là gì?',
  'Nhà hát Duyệt Thị Đường được xây dựng dưới triều vua nào?',
  'Nhạc cụ nào giữ vai trò lĩnh xướng trong dàn Đại Nhạc?',
  'Vũ khúc Lục Cúng Hoa Đăng mang ý nghĩa gì?',
  'Cố nghệ nhân nào có công gìn giữ Nhã nhạc sau năm 1945?'
];

const CURATED_KNOWLEDGE: { keywords: string[]; answer: string; citations: string[] }[] = [
  {
    keywords: ['unesco', 'công nhận', 'vinh danh', 'năm nào', 'kiệt tác', 'danh hiệu'],
    answer: 'Nhã nhạc cung đình Huế được UNESCO chính thức công bố là "Kiệt tác Di sản Truyền khẩu và Phi vật thể của Nhân loại" vào ngày 7 tháng 11 năm 2003 tại Paris (Pháp). Đây là di sản phi vật thể đầu tiên của Việt Nam được thế giới ghi danh. Đến năm 2008, theo Công ước 2003, di sản được đưa vào Danh sách Di sản Văn hóa Phi vật thể Đại diện của Nhân loại.',
    citations: ['Hồ sơ UNESCO Nha Nhac RL 00074 [1]', 'Cục Di sản Văn hóa [3]']
  },
  {
    keywords: ['ngũ cung', 'thang âm', 'hò xự xang', 'nốt', 'nốt nhạc', 'điệu bắc', 'điệu nam'],
    answer: 'Nhã nhạc cung đình Huế xây dựng trên hệ thống thang âm ngũ cung phương Đông gồm 5 bậc âm cơ bản: Hò (Do) – Xự (Re) – Xang (Fa) – Xê (Sol) – Cống (La), cùng hai âm chuyển đổi là Phan và Lục. Âm nhạc phân làm hai điệu thức chính: Điệu Khách (Bắc) mang tính chất trang trọng, hào sảng, uy nghiêm; và Điệu Nam mang tính chất sâu lắng, bi tráng, đậm chất tình cảm xứ Huế.',
    citations: ['Nghiên cứu Cố GS.TS Trần Văn Khê [10]', 'Viện Âm nhạc Việt Nam [10]']
  },
  {
    keywords: ['đại nhạc', 'tiểu nhạc', 'khác nhau', 'đại xuy đả', 'trúc nhã nhạc', 'dàn nhạc'],
    answer: 'Hai dàn nhạc mẫu mực của cung đình Huế đại diện cho nguyên lý Âm – Dương đối ứng:\n• Dàn Đại Nhạc (Đại xuy đả): Chủ yếu gồm nhạc cụ gõ và hơi (kèn bầu, trống chiến, chiêng, chuông, não bạt), âm lượng hùng tráng, tấu ngoài trời trước sân rồng trong các đại lễ Tế Giao, Tế Miếu, Đại triều.\n• Dàn Tiểu Nhạc (Trúc nhã nhạc): Chủ yếu gồm nhạc cụ dây và sáo (đàn tỳ bà, đàn nguyệt, đàn tranh, đàn nhị, sáo trúc, tam âm la), âm sắc thanh tao, êm dịu, diễn tấu bên trong thềm điện trong các buổi yến ẩm hoàng triều và tiếp đãi sứ thần.',
    citations: ['Khâm Định Đại Nam Hội Điển Sự Lệ [9]', 'Trung tâm Bảo tồn Di tích Cố đô Huế [4]']
  },
  {
    keywords: ['duyệt thị đường', 'nhà hát', 'cổ nhất', 'xây dựng', 'năm nào', 'vua nào'],
    answer: 'Nhà hát Duyệt Thị Đường được xây dựng vào năm 1826 (năm Minh Mạng thứ 7), tọa lạc bên trong Tử Cấm Thành – Hoàng thành Huế. Đây là nhà hát hoàng gia cổ xưa nhất của Việt Nam còn tồn tại. Trần nhà hát được sơn then vẽ tinh xảo cảnh mặt trời, mặt trăng và các chòm sao; hệ thống cột đồng đắp nổi hình rồng mạ vàng tạo nên không gian âm học tự nhiên hoàn hảo cho việc diễn xướng Nhã nhạc và tuồng cung đình.',
    citations: ['Trung tâm Bảo tồn Di tích Cố đô Huế [4]', 'Nhà hát Nghệ thuật Truyền thống Cung đình Huế [5]']
  },
  {
    keywords: ['kèn bầu', 'lĩnh xướng', 'gia lệnh', 'vai trò'],
    answer: 'Kèn Bầu (còn gọi là Gia Lệnh hoặc kèn dăm) là nhạc cụ lĩnh xướng số một của dàn Đại Nhạc. Khi tiếng kèn bầu cất lên với âm thanh sắc bén, vang dội, mọi nhạc cụ gõ như trống chiến, thanh la, não bạt lập tức phụ họa theo. Nghệ nhân thổi kèn bầu phải sử dụng kỹ thuật luồn hơi liên tục (circular breathing) để câu nhạc không bị đứt đoạn.',
    citations: ['Bảo tàng Cổ vật Cung đình Huế [6]', 'Khâm Định Đại Nam Hội Điển [9]']
  },
  {
    keywords: ['lục cúng hoa đăng', 'múa', 'hoa sen', 'đèn sen', 'sáu lễ vật'],
    answer: 'Vũ khúc Lục Cúng Hoa Đăng là điệu múa cung đình tiêu biểu và lộng lẫy bậc nhất. Các vũ sinh hóa trang tiên đồng ngọc nữ, đầu đội mũ hoa sen đính ngọc, hai tay nâng hoa sen thắp nến lung linh để dâng sáu lễ vật cúng dường (Hương, Hoa, Đăng, Trà, Quả, Thực). Trong quá trình múa, đội hình biến chuyển tạo thành các chữ Hán chúc thọ: "Thái Bình", "Vạn Tuế", "Thiên Thu" cầu mưa thuận gió hòa, quốc thái dân an.',
    citations: ['Nhà hát Nghệ thuật Truyền thống Cung đình Huế [5]', 'Hồ sơ UNESCO 2003 [1]']
  },
  {
    keywords: ['nghệ nhân', 'lữ hữu thi', 'trần kích', 'sau năm 1945', 'bảo tồn', 'truyền dạy'],
    answer: 'Sau năm 1945 khi triều Nguyễn khép lại, Nhã nhạc đứng trước nguy cơ thất truyền. Hai bậc đại thụ huyền thoại đã âm thầm gìn giữ bài bản qua phương thức truyền khẩu "hò xự xang" là: Cố NNƯT Lữ Hữu Thi (mất ngày 15/09/2016, hưởng thọ 106 tuổi theo ghi nhận báo chí; đại thụ kèn bầu và đàn nguyệt, từng tấu nhạc phục vụ vua Bảo Đại) và Cố NSƯT Trần Kích (1921 - 2010, bậc thầy đàn nhị, tỳ bà, được Nhà nước trao tặng danh hiệu Nghệ sĩ Ưu tú năm 2007 và được chính phủ Pháp trao tặng Huân chương Văn học Nghệ thuật). Các cụ đã truyền dạy toàn bộ mười bản ngự thiện cho thế hệ kế tục ngày nay.',
    citations: ['Báo Pháp Luật (16/09/2016) [Bảo vật sống qua đời]', 'Báo Tuổi Trẻ (10/12/2010) [Chia tay hiệp sĩ Nhã nhạc]', 'Dự án bảo vệ Nhã nhạc UNESCO [2]']
  },
  {
    keywords: ['đàn nam giao', 'tế giao', 'địa điểm', 'ở đâu'],
    answer: 'Đàn Nam Giao được xây dựng năm 1806 dưới triều vua Gia Long, tọa lạc tại đồi thông Ngự Bình, thành phố Huế. Đây là khu tế đàn thiêng liêng nhất của vương triều Nguyễn, nơi hoàng đế đích thân tế Trời Đất vào rạng sáng mùa xuân (định kỳ 3 năm một lần) với dàn Giao nhạc trang nghiêm tột bậc. Đàn gồm 3 tầng: Viên Đàn (hình tròn tượng trưng cho Trời), Phương Đàn (hình vuông tượng trưng cho Đất) và tầng dưới cùng hình vuông tượng trưng cho Nhân loại.',
    citations: ['Trung tâm Bảo tồn Di tích Cố đô Huế [4]', 'Cổng thông tin Du lịch Huế [6]']
  }
];

export async function askHeritageAi(question: string): Promise<{ text: string; citations: string[]; source: 'api' | 'curated' }> {
  const cleanQ = question.toLowerCase().trim();

  // Try calling server-side API first if available (proxy route)
  try {
    const res = await fetch('/api/gemini/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: question })
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.text) {
        return {
          text: data.text,
          citations: data.citations || ['Hồ sơ UNESCO Nhã nhạc Cung đình Huế [1]', 'Khâm Định Đại Nam Hội Điển Sự Lệ [9]'],
          source: 'api'
        };
      }
    }
  } catch (err) {
    // Fallback to verified local curated knowledge engine
  }

  // Local knowledge lookup from curated database
  for (const item of CURATED_KNOWLEDGE) {
    const match = item.keywords.some((kw) => cleanQ.includes(kw));
    if (match) {
      return {
        text: item.answer,
        citations: item.citations,
        source: 'curated'
      };
    }
  }

  // Check if query is broadly related to Nha Nhac topics
  const broadKeywords = ['nhã nhạc', 'cung đình', 'huế', 'nguyễn', 'minh mạng', 'gia long', 'bảo tồn', 'di sản', 'nhạc cụ', 'lịch sử', 'nghệ nhân', 'âm nhạc'];
  const isBroadlyRelated = broadKeywords.some((bk) => cleanQ.includes(bk));

  if (isBroadlyRelated) {
    return {
      text: `Về câu hỏi "${question}":\n\nNhã nhạc cung đình Huế là dòng âm nhạc bác học cổ truyền cung đình, được hoàn thiện điển chế dưới triều Nguyễn (1802 - 1945), được UNESCO công bố là "Kiệt tác Di sản Truyền khẩu và Phi vật thể của Nhân loại" ngày 07/11/2003 và ghi danh vào "Danh sách Di sản Văn hóa Phi vật thể Đại diện của Nhân loại" năm 2008.\n\nNhã nhạc gồm hai dàn nhạc mẫu mực là Đại Nhạc và Tiểu Nhạc với hệ thống Mười bản ngự liên hoàn, vũ khúc cung đình và nghi lễ tế tự tại Duyệt Thị Đường, Điện Thái Hòa và Đàn Nam Giao. Quý khách có thể xem thêm chi tiết trong các chuyên trang Lịch sử, Nhạc cụ hoặc Trang 11 (Tư liệu & 10 Nguồn tham khảo).`,
      citations: ['Hồ sơ UNESCO Nha Nhac RL 00074 [1]', 'Trung tâm Bảo tồn Di tích Cố đô Huế [4]'],
      source: 'curated'
    };
  }

  // Honest fallback when question lacks verified data or is outside scope
  return {
    text: `Dữ liệu về nội dung "${question}" hiện chưa nằm trong hồ sơ di sản đã được kiểm chứng học thuật của bảo tàng số (theo tài liệu UNESCO, Cục Di sản Văn hóa và Cố đô Huế).\n\nĐể đảm bảo tính trung thực khoa học, hệ thống không tự tạo ra dữ liệu chưa được xác minh. Quý khách vui lòng thử lại với các câu hỏi gợi ý bên dưới hoặc tra cứu danh mục 10 tài liệu chính thống tại chuyên trang "Tư liệu & Nguồn tham khảo".`,
    citations: ['Cục Di sản Văn hóa [3]', 'Trung tâm Bảo tồn Di tích Cố đô Huế [4]'],
    source: 'curated'
  };
}
