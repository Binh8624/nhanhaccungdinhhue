# Giai đoạn 4: Music Research Studio – Phòng Nghiên cứu Âm luật & Ký âm Nhã nhạc Cung đình Huế

Kế hoạch phát triển toàn diện phòng nghiên cứu và thực nghiệm âm luật truyền thống Huế dành cho nhà nghiên cứu, nghệ nhân và sinh viên âm nhạc, tích hợp Web Audio API, phân tích phổ tần số thực nghiệm, đối sánh điệu thức Khách - Nam và trợ lý học thuật kết nối Fact-Store.

### User Review & Critical Decisions

> [!IMPORTANT]
> Toàn bộ các định hướng quan trọng đã được thống nhất với người dùng nhằm đảm bảo tính toàn vẹn và độ chính xác học thuật của Di sản số:

- **Confirmed Decision 1 (Vị trí giao diện)**: Tích hợp Music Research Studio làm phân hệ trung tâm trong trang Trải nghiệm số (`/trai-nghiem`) với bộ chọn 6 phân hệ dạng Studio Workspace chuyên nghiệp, đồng thời cung cấp Studio Modal mở nhanh từ trang Nhạc cụ (`/nhac-cu`). Bảo toàn tuyệt đối 100% cấu trúc 14 trang và các URL hiện có.
- **Confirmed Decision 2 (Quy ước nốt Hò)**: Tôn trọng nguyên tắc âm luật truyền thống Huế: Nốt Hò không có cao độ tuyệt đối cố định (không ép buộc A=440Hz hay một tần số cứng). Hệ thống cung cấp bộ chọn âm vực tham chiếu linh hoạt (Hò = Fa, Hò = Đô, Hò = Rê) kèm hiển thị khoảng cách cent vật lý và ghi chú rõ ràng về tính biến thiên theo từng nhạc cụ/nghệ nhân.
- **Confirmed Decision 3 (Nguồn âm thanh đầu vào)**: Hỗ trợ phân tích phổ âm song song từ 2 nguồn: (1) Bản thu âm điền dã thực tế từ Kho Bản thu Giai đoạn 3 (Audio Archive) và (2) Âm thanh tổng hợp mô phỏng Web Audio API, gắn nhãn minh bạch giữa "Dữ liệu thực nghiệm" và "Dữ liệu mô phỏng".

---

### 1. Overview & Core Concept

- **What It Does**: Cung cấp một môi trường nghiên cứu âm học (Organology & Ethnomusicology) kỹ thuật số cho Nhã nhạc cung đình Huế với 6 công cụ tương tác:
  1. *Pentatonic Scale Analyzer*: Bàn phím phân tích 7 bậc âm (Hò, Xự, Xang, Xê, Cống, Phan, Lục), tính toán khoảng cách cent và dao động vi âm (micro-intervals).
  2. *Melody Transcription Studio*: Bàn ký âm trực quan đa năng, cho phép soạn thảo, dịch chuyển cao độ giữa chữ nhạc truyền thống và nốt nhạc phương Tây, nghe thử và lưu bản thảo.
  3. *Audio Spectrum Analyzer*: Bộ phân tích phổ tần số thời gian thực (FFT AnalyserNode) trích xuất đỉnh tần số chính (dominant peak Hz), hài âm (harmonics) và biểu đồ sóng âm (waveform).
  4. *Musical Mode Explorer*: Nghiên cứu chiều sâu cấu trúc Điệu Khách (Bắc) và Điệu Nam (Nam Xuân, Nam Ai) cùng kỹ thuật rung, nhấn, chùng, mổ ngón của các bậc thầy.
  5. *Traditional Music Score Library*: Kho bài bản Mười Bản Ngự (Phẩm Tuyết, Nguyên Tiêu, Hồ Quảng, Liên Hoàn, Bình Bán, Tây Mai, Kim Tiền, Xuân Phong, Long Hổ, Tẩu Mã) và Đăng Đàn Cung kèm trích dẫn văn bản mộc bản triều Nguyễn.
  6. *AI Music Research Assistant*: Trợ lý AI chuyên khảo âm luật, truy vấn trực tiếp kho Fact-Store có kiểm chứng, từ chối suy diễn vô căn cứ.
- **Target Audience**: Nhà nghiên cứu âm nhạc cổ truyền, giảng viên, sinh viên Học viện Âm nhạc Huế, du khách muốn tìm hiểu cấu trúc bác học của Nhã nhạc.
- **Key Value**: Chuyển đổi di sản phi vật thể truyền khẩu thành dữ liệu số có thể nghe, đo đạc, phân tích và thực hành tương tác với chuẩn mực bảo tồn bảo tàng quốc tế.

---

### 2. User Experience & Visual Design

- **Visual Identity & Theme**:
  - Tuân thủ phong cách *Royal Heritage – Digital Museum* theo quy chuẩn `/skills/system_skills/frontend_design/references/9_museum_editorial_institutional.md`.
  - Bảng màu: Nền bóng đêm cung đình (`#171513`), viền chỉ vàng hoàng gia (`#C9A45C` / `#E5C07B`), đỏ son cung phủ (`#781F25`), giấy điệp cổ (`#F2E8D5`), kết hợp dải màu phổ âm quang học dịu mắt (`#38BDF8` cho sóng âm, `#F59E0B` cho đỉnh tần số).
  - Phông chữ: Playfair Display / Cormorant Garamond cho tiêu đề học thuật, Plus Jakarta Sans cho diễn giải và JetBrains Mono cho thông số tần số Hz, cent, thời lượng.
  - Zero-pill discipline: Thông số âm học (Hz, cents, mode) hiển thị dưới dạng văn bản thanh mảnh có phân cách typographic (`·`), không dùng badge kẹo ngọt.
- **Key User Flows**:
  - *Flow 1 (Nghiên cứu thang âm)*: Chọn nốt Hò tham chiếu (F4, C4, D4) -> Bấm nốt để kích hoạt bộ tổng hợp âm -> Quan sát khoảng cách cent, âm bội và ghi chú ngón bấm.
  - *Flow 2 (Ký âm giai điệu)*: Chọn bài bản mẫu hoặc tạo bài mới -> Nhập phách/chữ nhạc -> Nghe thử tức thời trên nhạc cụ cung đình (Kèn Bầu, Đàn Nguyệt, Đàn Nhị) -> Lưu bản ký âm kèm chú thích khảo dị.
  - *Flow 3 (Phân tích phổ âm)*: Chọn bản thu từ Audio Archive GĐ3 -> Khởi chạy Web Audio FFT Analyzer -> Đọc tần số thực tế và so sánh với lý thuyết ngũ cung.
  - *Flow 4 (Khám phá Điệu thức)*: Chuyển đổi giữa Điệu Khách và Điệu Nam -> Quan sát mức độ non/già của nốt Xự, nốt Xang và kỹ thuật rung ngón đặc thù xứ Huế.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Quản lý biến thiên cao độ truyền thống**:
  - *Chosen Approach*: Không chuẩn hóa cưỡng bức thang âm Huế theo hệ bình quân 12 nửa cung (Equal Temperament) phương Tây. Cung cấp slider hiệu chỉnh vi âm ($\pm 50$ cents) để người nghiên cứu mô phỏng ngón nhấn xự non, xang già.
  - *Why*: Bản chất Nhã nhạc cung đình Huế nằm ở "chữ nhạc sống", biến hóa theo ngón đàn và tâm trạng nghệ nhân, việc gò ép vào cao độ cố định sẽ làm sai lệch bản chất di sản.
- **Decision 2: Phân tích phổ âm thanh thực thời qua Web Audio API**:
  - *Chosen Approach*: Sử dụng native `AudioContext` kết hợp `AnalyserNode` (FFT size 2048) vẽ lên HTML5 Canvas với 60fps requestAnimationFrame, hỗ trợ cả microphone và audio streams.
  - *Why*: Không phụ thuộc vào thư viện ngoài nặng nề, tốc độ phản hồi dưới 16ms, tương thích hoàn toàn trình duyệt hiện đại.
- **Decision 3: Lưu trữ bản ký âm & Nhật ký kiểm toán**:
  - *Chosen Approach*: Mở rộng cơ chế lưu trữ backend trong `heritageDb` kết hợp `localStorage` để người dùng có thể lưu bản nháp ngay lập tức và đồng bộ vào CSDL có ghi vết `audit_logs`.

---

### 4. Technical Architecture & Data Strategy

#### Sơ đồ Kiến trúc Hệ thống Giai đoạn 4

```
┌────────────────────────────────────────────────────────────────────────┐
│                   GIAI ĐOẠN 4: MUSIC RESEARCH STUDIO                   │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
      ┌────────────────────────────┼───────────────────────────┐
      ▼                            ▼                           ▼
┌───────────────┐           ┌───────────────┐          ┌───────────────┐
│ Web Audio API │           │ 6 Phân Hệ UI  │          │ Backend & CSDL│
│ Engine (Core) │           │ Studio Modals │          │  RESTful API  │
└───────┬───────┘           └───────┬───────┘          └───────┬───────┘
        │                           │                          │
  ┌─────┴──────┐             ┌──────┴──────────────┐    ┌──────┴─────────┐
  │- Analyser  │             │1. PentatonicScale   │    │- pentatonic_   │
  │  (FFT 2048)│             │2. MelodyTranscription│   │  scales        │
  │- Oscillator│             │3. AudioSpectrum     │    │- musical_modes │
  │- Biquad    │             │4. MusicalMode       │    │- traditional_  │
  │- Cent Calc │             │5. TraditionalScores │    │  scores        │
  │- Microtone │             │6. AiMusicAssistant  │    │- user_trans-   │
  └────────────┘             └─────────────────────┘    │  criptions     │
                                                        └────────────────┘
```

#### DDL Bổ sung cho CSDL (`src/server/db/schema.sql`):
1. `pentatonic_scales`: Định nghĩa các bậc âm Hò, Xự, Xang, Xê, Cống, Phan, Lục kèm cents lý thuyết.
2. `musical_modes`: Cấu trúc Điệu Khách (Hơi Bắc) & Điệu Nam (Nam Xuân, Nam Ai, Oán) và phong cách diễn tấu.
3. `traditional_scores`: Tuyển tập bản ký âm Mười Bản Ngự và Đăng Đàn Cung.
4. `user_transcriptions`: Bản ghi ký âm của người dùng, phân tích biến thể và phiên bản lịch sử.

#### Danh mục Files Cần Tạo & Chỉnh Sửa:
- **Tạo mới:**
  - `/src/data/musicTheoryData.ts`: Dữ liệu âm luật học thuật, tần số Hz, cent, bài bản Mười Bản Ngự, thang âm cổ.
  - `/src/components/studio/PentatonicScaleAnalyzer.tsx`: Bàn phím ngũ cung, chọn nốt Hò tham chiếu, đo vi âm.
  - `/src/components/studio/MelodyTranscriptionStudio.tsx`: Bàn soạn giai điệu, đổi khóa, dịch âm, lưu trữ.
  - `/src/components/studio/AudioSpectrumAnalyzer.tsx`: Bộ phân tích sóng âm và phổ FFT thời gian thực từ Audio Archive GĐ3.
  - `/src/components/studio/MusicalModeExplorer.tsx`: So sánh Điệu Khách - Điệu Nam và ngón đàn truyền thống.
  - `/src/components/studio/TraditionalMusicScoreLibrary.tsx`: Thư viện tổng phổ mộc bản và bản chép tay.
  - `/src/components/studio/AiMusicResearchAssistant.tsx`: Khung trợ lý AI đối chiếu âm luật với Fact-Store.
  - `/src/components/studio/MusicResearchStudioModal.tsx`: Container modal studio mở từ các trang.
- **Chỉnh sửa:**
  - `/src/utils/audioEngine.ts`: Bổ sung AnalyserNode, tính toán phổ âm FFT thực thời và hỗ trợ nốt Hò biến thiên.
  - `/src/server/db/schema.sql`: Bổ sung 4 bảng âm luật và ký âm.
  - `/src/server/db/database.ts`: Khởi tạo và lưu trữ dữ liệu âm luật, bài bản và ký âm.
  - `/server.ts`: Bổ sung các endpoints `/api/music/*`.
  - `/src/pages/DigitalExperiencePage.tsx`: Nhúng tab chính "Music Research Studio" với giao diện phòng lab âm học.
  - `/src/pages/InstrumentsPage.tsx`: Tích hợp nút mở nhanh Music Research Studio đối chiếu từng nhạc khí.
