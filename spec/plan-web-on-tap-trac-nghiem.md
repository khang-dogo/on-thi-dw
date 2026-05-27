# Plan build web ôn tập trắc nghiệm

## Mục tiêu

Build một web React, mobile first, responsive để ôn tập và làm trắc nghiệm từ bộ câu hỏi trong `spec/88-cau-on-tap-trac-nghiem.md`.

Web cần có ít nhất 2 màn chính:

- Màn ôn tập: hiển thị toàn bộ danh sách câu hỏi, đáp án, giải thích để đọc nhanh và tra cứu.
- Màn làm trắc nghiệm: lấy ngẫu nhiên 90 câu, đảo thứ tự câu hỏi và đáp án, không cho xem đáp án trước. Người dùng chọn xong mới biết đúng sai và xem giải thích.

Yêu cầu quan trọng nhất là dữ liệu câu hỏi phải parse ra JSON chính xác, không được mất câu, nhầm đáp án, mất giải thích, hoặc làm hỏng nội dung có phép tính/công thức.

## Ghi chú hiện trạng dữ liệu

File `spec/88-cau-on-tap-trac-nghiem.md` hiện tại trong repo chỉ có 14 dòng, bắt đầu bằng một đoạn `Giải thích` của câu trước, rồi tới `Câu 88`. Nghĩa là file hiện tại chưa đủ bộ 88 hoặc 90 câu như mô tả.

Vì vậy khi triển khai, bước đầu tiên phải xác nhận lại file nguồn đầy đủ. Parser không được âm thầm bỏ qua lỗi. Nếu file chưa đủ câu, thiếu số thứ tự, thiếu đáp án, thiếu giải thích, hoặc số câu thực tế không bằng số kỳ vọng, script phải báo lỗi rõ ràng và dừng.

## Cách làm tổng thể

### 1. Chuẩn bị dự án

- Tạo app React bằng Vite hoặc dùng cấu trúc React sẵn có nếu repo đã có.
- Dùng TypeScript để dữ liệu câu hỏi có kiểu rõ ràng.
- Cài các thư viện cần thiết theo hướng tối giản:
  - React Router cho điều hướng giữa màn ôn tập và màn làm bài.
  - Một thư viện render Markdown an toàn nếu nội dung câu hỏi/giải thích có định dạng Markdown.
  - KaTeX hoặc MathJax nếu file câu hỏi có công thức toán, ký hiệu, phân số, chỉ số trên/dưới.
  - Một thư viện test phù hợp như Vitest.
- Chạy `npx getdesign@latest add miro` để lấy design system/phong cách Miro theo yêu cầu, sau đó áp dụng nhất quán vào UI.
- Cài skill từ `https://github.com/multica-ai/andrej-karpathy-skills` cho Codex CLI/agents theo đúng hướng dẫn của skill installer. Sau khi cài cần restart Codex để skill mới được nhận.

### 2. Parse file Markdown ra JSON

Tạo script parse riêng, không parse trực tiếp trong UI.

Định dạng JSON mong muốn cho mỗi câu:

- `id`: số câu gốc.
- `question`: nội dung câu hỏi.
- `options`: danh sách lựa chọn A, B, C, D, E nếu có.
- `answer`: đáp án đúng theo chữ cái.
- `explanation`: giải thích.
- `raw`: nội dung gốc để đối chiếu khi cần debug.

Nguyên tắc parse:

- Nhận diện câu bằng pattern kiểu `**Câu 1:**`, `**Câu 88:**`.
- Nhận diện lựa chọn bằng dòng bắt đầu `- A.`, `- B.`, `- C.`...
- Nhận diện đáp án bằng `**Đáp án đúng:**`.
- Nhận diện giải thích bằng `**Giải thích:**`.
- Giữ nguyên tiếng Việt có dấu.
- Giữ nguyên ký hiệu toán, công thức, dấu `*`, `_`, `^`, `$`, `\`, ngoặc, phân số, ký hiệu phần trăm.
- Không trim quá tay làm mất xuống dòng có ý nghĩa.
- Không tự sửa chính tả hoặc tự đoán đáp án.

Các lỗi bắt buộc phải bắt:

- Thiếu câu số nào đó trong chuỗi.
- Trùng số câu.
- Câu không có lựa chọn.
- Câu có đáp án nhưng đáp án không nằm trong danh sách lựa chọn.
- Thiếu giải thích.
- Có đoạn text nằm ngoài câu hỏi mà parser không biết gán vào đâu.
- Tổng số câu parse được khác số kỳ vọng.

Output:

- `src/data/questions.json` hoặc `public/questions.json`.
- Một file report parse, ví dụ `spec/parse-report.md`, ghi rõ số câu, câu bị lỗi nếu có, và checklist xác nhận dữ liệu.

### 3. Verify parser trước khi làm UI

Làm tới đâu verify tới đó.

Sau khi viết parser cần chạy test ngay:

- Test với file thật.
- Test với fixture nhỏ gồm vài câu mẫu.
- Test trường hợp thiếu đáp án.
- Test trường hợp thiếu giải thích.
- Test trường hợp công thức toán có ký tự đặc biệt.
- Test trường hợp đáp án đúng là A/B/C/D/E.
- Test snapshot JSON để dễ thấy nếu parser làm thay đổi dữ liệu ngoài ý muốn.

Chỉ chuyển sang build UI khi parser pass và report xác nhận đủ số câu.

### 4. Màn ôn tập danh sách

Màn này phục vụ đọc và ôn nhanh, ưu tiên mobile trước.

Tính năng chính:

- Hiển thị toàn bộ câu hỏi theo thứ tự gốc.
- Có ô tìm kiếm theo nội dung câu hỏi, lựa chọn, đáp án, giải thích.
- Có filter:
  - Tất cả câu.
  - Câu đã đánh dấu sao.
  - Câu từng làm sai.
  - Câu chưa làm.
- Mỗi câu hiển thị rõ:
  - Số câu.
  - Nội dung câu hỏi.
  - Các lựa chọn.
  - Đáp án đúng.
  - Giải thích.
- Có nút thu gọn/mở rộng giải thích để danh sách không quá dài trên mobile.
- Có nút đánh dấu sao để lưu câu cần ôn lại.

Yêu cầu UI:

- Mobile first, đọc thoải mái trên màn nhỏ.
- Font rõ, khoảng cách đủ thoáng.
- Không làm card quá màu mè; ưu tiên dễ scan.
- Câu đúng/đáp án đúng có màu nhấn rõ nhưng không chói.
- Nội dung công thức/phép tính phải render được, không vỡ layout.

### 5. Màn làm trắc nghiệm

Luồng làm bài:

- Người dùng bấm bắt đầu.
- App tạo đề ngẫu nhiên 90 câu.
- Nếu bộ câu hiện có ít hơn 90 câu thì phải báo rõ, không tự lặp câu.
- Thứ tự câu hỏi được đảo ngẫu nhiên.
- Thứ tự lựa chọn trong từng câu cũng được đảo ngẫu nhiên.
- Khi đảo lựa chọn, đáp án đúng phải được map lại chính xác.
- Trước khi chọn, không hiển thị đáp án và giải thích.
- Sau khi chọn, hiển thị:
  - Đúng hoặc sai.
  - Đáp án đúng.
  - Giải thích.
  - Nút qua câu tiếp theo.
- Cuối bài hiển thị tổng kết:
  - Số câu đúng.
  - Số câu sai.
  - Tỷ lệ phần trăm.
  - Danh sách câu sai để ôn lại.

Tính năng nên có thêm:

- Thanh tiến độ: ví dụ `12/90`.
- Bộ đếm thời gian làm bài.
- Nút tạm dừng.
- Nút làm lại đề mới.
- Nút làm lại riêng các câu sai.
- Lưu lịch sử kết quả bằng localStorage.
- Chế độ luyện tập nhanh: chọn số câu 10, 20, 30, 90.
- Chế độ chỉ lấy câu đã đánh dấu sao.
- Chế độ chỉ lấy câu từng làm sai.

Tính năng bổ sung sau khi research:

- Ôn câu sai thông minh: câu nào sai nhiều thì được ưu tiên xuất hiện lại trong các phiên luyện sau.
- Mastery score cho từng câu: mỗi câu có trạng thái `chưa học`, `yếu`, `đang ổn`, `đã vững`.
- Đánh giá độ chắc chắn sau mỗi câu: `chắc`, `lưỡng lự`, `đoán mò`. Nếu trả lời đúng nhưng chọn `đoán mò`, câu đó vẫn nên được đưa vào nhóm cần ôn lại.
- Spaced repetition nhẹ: app gợi ý hôm nay nên ôn lại câu nào dựa trên số lần sai, độ chắc chắn và lần ôn gần nhất.
- Chế độ luyện 5 phút: lấy nhanh 10-15 câu yếu nhất để học trên điện thoại.
- Chế độ ẩn đáp án ở trang ôn tập: người dùng tự nghĩ đáp án trước, bấm mới mở đáp án và giải thích.
- Ghi chú cá nhân cho từng câu: lưu mẹo nhớ, lỗi hay nhầm, hoặc cách tính.
- Seed đề thi: mỗi đề random có mã seed để làm lại đúng đề cũ hoặc chia sẻ cho người khác.
- Export/import tiến độ học: backup localStorage ra file JSON và nhập lại khi đổi máy.
- PWA/offline: mở web trên điện thoại và học được khi không có mạng.
- Phím tắt desktop: A/B/C/D/E để chọn đáp án, Enter để qua câu tiếp theo, S để đánh dấu sao.
- Trang thống kê: câu sai nhiều nhất, nhóm câu yếu, lịch sử điểm, thời gian làm bài, tiến bộ theo từng ngày.
- Cảnh báo dữ liệu bất thường trong UI admin/dev: nếu JSON thiếu câu, thiếu giải thích, đáp án không hợp lệ thì không cho bắt đầu bài.

### 6. Random và chống sai đáp án

Phần random phải test kỹ vì rất dễ sai khi đảo đáp án.

Quy tắc:

- Không mutate dữ liệu gốc.
- Mỗi lần tạo đề phải clone dữ liệu.
- Shuffle câu hỏi bằng thuật toán Fisher-Yates.
- Shuffle lựa chọn bằng Fisher-Yates.
- Sau khi shuffle lựa chọn, lưu `isCorrect` theo option hoặc lưu `originalKey` để không bị lệch đáp án.
- Không dựa vào vị trí A/B/C/D sau khi đảo nếu chưa remap.

Test bắt buộc:

- Shuffle nhiều lần vẫn giữ đúng đáp án.
- Không có câu trùng trong một đề.
- Đề 90 câu chỉ tạo khi đủ ít nhất 90 câu.
- Dữ liệu gốc không bị thay đổi sau khi làm bài.

### 7. Xử lý công thức, phép tính và nội dung đặc biệt

Vì đề có thể có phép tính, công thức hoặc ký hiệu đặc biệt, cần xử lý cẩn thận:

- Không render nội dung bằng `dangerouslySetInnerHTML` nếu không sanitize.
- Ưu tiên Markdown renderer có sanitize.
- Nếu có công thức LaTeX thì dùng KaTeX hoặc MathJax.
- Nếu công thức trong file chưa dùng chuẩn LaTeX, cần giữ nguyên text thay vì cố convert.
- Kiểm tra trên mobile để công thức dài không tràn ngang vô lý.
- Cho phép vùng công thức hoặc đoạn dài scroll ngang nếu cần.

Test thủ công:

- Câu có phân số.
- Câu có dấu phần trăm.
- Câu có phép nhân, chia, lũy thừa.
- Câu có ký tự `$`, `\`, `_`, `*`.
- Câu có bảng hoặc nhiều dòng nếu file nguồn có.

### 8. Thiết kế giao diện theo hướng Miro

Sau khi chạy `npx getdesign@latest add miro`, dùng phong cách thiết kế nhất quán:

- Gọn, sáng, trực quan.
- Có cảm giác bảng/board học tập.
- Dùng màu nhấn vừa phải cho trạng thái đúng, sai, đang làm, đã đánh dấu.
- Mobile ưu tiên bottom navigation hoặc tab rõ ràng.
- Desktop có thể dùng layout 2 cột:
  - Cột trái: danh sách, bộ lọc, tiến độ.
  - Cột phải: nội dung câu đang xem hoặc câu đang làm.

Các màn cần có:

- Trang ôn tập.
- Trang làm bài.
- Trang kết quả.
- Có thể thêm trang thống kê nếu đủ thời gian.

Note bắt buộc khi implement UI:

- Phải đọc kỹ design markdown/spec sinh ra từ `npx getdesign@latest add miro` trước khi code UI.
- UI phải bám sát design markdown, không tự đổi phong cách cho tiện.
- Component, spacing, màu sắc, border, typography, trạng thái button/input/filter phải theo design spec nhiều nhất có thể.
- Nếu design markdown có token hoặc class mẫu thì ưu tiên dùng lại, không tự chế style khác.
- Mobile first là bắt buộc: làm mobile kỹ trước, sau đó mới mở rộng tablet/desktop.
- Mỗi màn phải có đủ state: bình thường, rỗng, lỗi, loading nếu cần, disabled, selected, success, error.
- Không được làm UI dạng placeholder cho có rồi coi là xong.
- Sau khi implement từng màn, phải so lại với design markdown và chụp/kiểm tra bằng Playwright hoặc browser thật.
- Nếu có chỗ phải khác design vì lý do kỹ thuật hoặc usability, phải ghi chú rõ lý do trong phần verify.

### 9. Chiến lược test cực kỹ

Không gom hết rồi mới test. Làm tới đâu verify tới đó. Mục tiêu là bắt lỗi dữ liệu, lỗi random, lỗi map đáp án, lỗi UI mobile, lỗi localStorage và lỗi regression trước khi người dùng học thật.

Công cụ test đề xuất:

- Vitest cho unit test, integration test, snapshot, fake timer.
- React Testing Library cho test component theo hành vi người dùng, ưu tiên query bằng role, label, text để ép UI có accessibility tốt.
- Playwright cho E2E, mobile viewport, browser thật, visual screenshot regression.
- ESLint/TypeScript để bắt lỗi kiểu dữ liệu và code smell cơ bản.
- Script validate dữ liệu chạy riêng trước build.

Nguyên tắc test:

- Parser và quiz engine phải có test tự động trước khi viết UI phụ thuộc vào chúng.
- Mọi test random phải có seed cố định để tái hiện lỗi.
- Test không chỉ kiểm happy path, phải kiểm cả file lỗi và dữ liệu xấu.
- Không test bằng mắt thay cho logic quan trọng. UI có thể kiểm thủ công thêm, nhưng random, đáp án, điểm số, lưu trạng thái phải có test tự động.
- Với bug đã sửa, phải thêm regression test đúng bug đó.
- Build production phải chạy sau cùng để chắc không có lỗi chỉ xuất hiện khi bundle.

Test dữ liệu đầu vào:

- File tồn tại đúng path `spec/88-cau-on-tap-trac-nghiem.md`.
- File đọc được với UTF-8, không lỗi tiếng Việt có dấu.
- File không rỗng.
- File có đủ số câu kỳ vọng.
- Nếu kỳ vọng 90 câu nhưng file chỉ có 88 câu, script phải báo lỗi rõ.
- Nếu tên file là 88 câu nhưng cấu hình yêu cầu 90 câu, script phải báo mismatch.
- Không có câu bị trùng số.
- Không có câu bị nhảy số, ví dụ thiếu câu 17.
- Không có đoạn mở đầu hoặc đoạn thừa nằm ngoài câu hỏi mà parser không hiểu.
- Không có câu thiếu nội dung câu hỏi.
- Không có câu thiếu lựa chọn.
- Không có câu thiếu đáp án đúng.
- Không có câu thiếu giải thích.
- Không có đáp án đúng nằm ngoài option.
- Không có option trùng nhãn trong cùng câu.
- Không có option rỗng.
- Không có câu chỉ có 1 option.
- Không có dòng `Đáp án đúng` xuất hiện trước option.
- Không có dòng `Giải thích` xuất hiện trước đáp án.

Test parser Markdown:

- Parse đúng một câu chuẩn có A/B/C/D/E.
- Parse đúng câu chỉ có A/B/C/D nếu bộ đề có dạng đó.
- Parse đúng câu có option dài nhiều dòng.
- Parse đúng câu hỏi nhiều đoạn.
- Parse đúng giải thích nhiều đoạn.
- Parse đúng nội dung có dấu hai chấm.
- Parse đúng nội dung có dấu gạch đầu dòng trong giải thích.
- Parse đúng nội dung có tiếng Việt có dấu.
- Parse đúng dấu ngoặc kép, ngoặc đơn, ngoặc vuông.
- Parse đúng ký tự `%`, `*`, `_`, `^`, `$`, `\`, `/`, `<=`, `>=`.
- Parse đúng công thức LaTeX inline nếu có.
- Parse đúng công thức block nếu có.
- Parse đúng bảng Markdown nếu có.
- Parse đúng code inline nếu có.
- Parse đúng xuống dòng có ý nghĩa.
- Không tự sửa chính tả.
- Không tự đổi chữ hoa/thường của đáp án.
- Không trim mất ký tự trong công thức.
- Không nuốt mất câu cuối file nếu file không có newline cuối.
- Báo lỗi khi thiếu marker `Câu`.
- Báo lỗi khi thiếu marker `Đáp án đúng`.
- Báo lỗi khi thiếu marker `Giải thích`.
- Báo lỗi khi option sai format, ví dụ `A)` thay vì `- A.` nếu parser không hỗ trợ.
- Báo lỗi khi cùng câu có 2 dòng đáp án đúng.
- Báo lỗi khi cùng câu có 2 phần giải thích.
- Tạo snapshot JSON để diff khi dữ liệu thay đổi.
- Tạo parse report ghi số câu, số option, câu lỗi, cảnh báo.

Test schema JSON:

- Mỗi câu có `id` là number.
- `id` tăng đúng theo file gốc.
- `question` là string không rỗng.
- `options` là array không rỗng.
- Mỗi option có `key`, `text`.
- `answer` là key tồn tại trong options.
- `explanation` là string không rỗng.
- `raw` là string để đối chiếu.
- Không có field thừa ngoài schema nếu muốn khóa chặt dữ liệu.
- JSON parse được trong browser.
- JSON import được trong build production.

Test quiz engine:

- Tạo đề đúng số câu yêu cầu khi đủ dữ liệu.
- Không tạo đề 90 câu khi dữ liệu ít hơn 90 câu.
- Không tự lặp câu để đủ số lượng.
- Không có câu trùng trong một đề.
- Shuffle câu hỏi không mutate dữ liệu gốc.
- Shuffle option không mutate dữ liệu gốc.
- Sau shuffle option, đáp án đúng vẫn trỏ đúng option.
- Chạy shuffle 1000 lần với seed khác nhau vẫn không lệch đáp án.
- Với seed cố định, kết quả random phải tái lập được.
- Với seed khác, thứ tự nên khác.
- Khi user chọn đúng, score tăng đúng.
- Khi user chọn sai, score không tăng.
- Không cho chọn 2 đáp án cho cùng một câu sau khi đã submit.
- Không cho qua câu tiếp theo nếu chưa chọn, trừ khi có nút bỏ qua được thiết kế rõ.
- Nếu có bỏ qua, câu đó tính là chưa trả lời hoặc sai theo rule đã chọn.
- Tính phần trăm đúng chính xác, kể cả số lẻ.
- Tổng đúng + sai + bỏ qua phải bằng tổng câu.
- Danh sách câu sai cuối bài đúng với lịch sử chọn.
- Làm lại câu sai chỉ lấy đúng nhóm câu sai.
- Làm lại câu đánh dấu sao chỉ lấy đúng nhóm starred.
- Luyện câu yếu lấy đúng nhóm mastery thấp.
- Đề mới không bị dính state của đề cũ.
- Reset bài xóa state phiên hiện tại nhưng không xóa lịch sử nếu người dùng không yêu cầu.

Test trạng thái học và spaced repetition:

- Câu trả lời sai làm giảm mastery hoặc tăng mức ưu tiên ôn lại.
- Câu trả lời đúng nhiều lần làm tăng mastery.
- Câu đúng nhưng user chọn `đoán mò` không được coi là đã vững.
- Câu sai nhiều lần xuất hiện trong nhóm cần ôn.
- Câu đã vững không xuất hiện quá dày trong luyện nhanh.
- Lần ôn gần nhất được lưu đúng thời gian.
- Fake timer để test lịch ôn hôm nay/ngày mai/ngày sau.
- Khi đổi ngày, danh sách câu cần ôn cập nhật đúng.
- Khi không có câu đến hạn, UI báo rõ.

Test localStorage:

- Lưu được starred questions.
- Reload trang vẫn giữ starred questions.
- Lưu được lịch sử bài làm.
- Reload trang vẫn giữ lịch sử.
- Lưu được câu sai nhiều lần.
- Lưu được note cá nhân.
- Xóa note cá nhân hoạt động.
- Export tiến độ tạo JSON hợp lệ.
- Import tiến độ hợp lệ khôi phục đúng dữ liệu.
- Import file lỗi phải báo lỗi, không ghi đè state cũ.
- localStorage rỗng không làm app crash.
- localStorage bị corrupt không làm app crash, app fallback về state sạch và báo rõ.
- localStorage quota exceeded được xử lý mềm.
- Version storage cũ được migrate hoặc reset có cảnh báo.

Test màn ôn tập:

- Render được danh sách câu.
- Hiển thị đúng số câu.
- Hiển thị đúng số thứ tự gốc.
- Hiển thị đầy đủ option.
- Hiển thị đúng đáp án.
- Hiển thị đúng giải thích.
- Toggle ẩn/hiện giải thích hoạt động.
- Chế độ ẩn đáp án không lộ đáp án trước khi mở.
- Search theo nội dung câu hỏi hoạt động.
- Search theo option hoạt động.
- Search theo giải thích hoạt động.
- Search không dấu nếu có làm thì phải test, ví dụ `quyet dinh` tìm được `quyết định`.
- Search rỗng trả về toàn bộ.
- Search không có kết quả hiển thị empty state.
- Filter starred hoạt động.
- Filter câu sai hoạt động.
- Filter câu chưa làm hoạt động.
- Kết hợp search + filter không sai.
- Star/unstar cập nhật UI ngay.
- Note cá nhân thêm/sửa/xóa được.
- Nội dung dài không vỡ card.
- Công thức hoặc dòng dài không tràn làm hỏng layout.
- Scroll danh sách mượt trên mobile.

Test màn làm bài:

- Bắt đầu bài từ màn setup.
- Chọn số câu 10/20/30/90 hoạt động.
- Nếu chọn 90 mà không đủ câu, hiển thị lỗi rõ.
- Trước khi chọn không thấy đáp án đúng.
- Trước khi chọn không thấy giải thích.
- Sau khi chọn hiện đúng/sai.
- Sau khi chọn hiện đáp án đúng.
- Sau khi chọn hiện giải thích.
- Option đã chọn có trạng thái rõ.
- Option đúng có trạng thái rõ sau submit.
- Nếu chọn sai, option sai và option đúng phân biệt rõ.
- Nút qua câu tiếp theo chỉ xuất hiện hoặc chỉ enable sau khi trả lời.
- Progress `x/y` đúng.
- Thanh tiến độ đúng.
- Timer chạy đúng.
- Pause dừng timer.
- Resume chạy tiếp timer.
- Kết thúc bài tự chuyển hoặc hiện nút xem kết quả.
- Back/refresh giữa bài xử lý rõ: hoặc khôi phục phiên, hoặc hỏi xác nhận.
- Làm đề mới reset trạng thái câu hiện tại.
- Không bấm nhanh nhiều lần làm nhảy nhiều câu.
- Không double click làm submit 2 lần.
- Keyboard A/B/C/D/E chọn đúng option đang hiển thị.
- Enter sau khi trả lời chuyển câu tiếp theo.

Test màn kết quả:

- Tổng câu đúng hiển thị đúng.
- Tổng câu sai hiển thị đúng.
- Tổng bỏ qua nếu có hiển thị đúng.
- Tỷ lệ phần trăm đúng.
- Thời gian làm bài đúng.
- Danh sách câu sai đúng.
- Bấm ôn lại câu sai tạo bài mới chỉ gồm câu sai.
- Bấm xem giải thích câu sai mở đúng nội dung.
- Bấm làm đề mới tạo thứ tự mới.
- Kết quả được lưu vào lịch sử.
- Nếu không có câu sai, UI không hiện nút ôn câu sai vô nghĩa.

Test UI responsive:

- Mobile nhỏ 320px không vỡ layout.
- Mobile phổ biến 375px, 390px, 414px hiển thị tốt.
- Tablet 768px hiển thị tốt.
- Desktop 1024px, 1280px, 1440px hiển thị tốt.
- Không có text chồng lên button.
- Không có button bị tràn khỏi màn.
- Bottom navigation không che nội dung cuối.
- Safe area trên iPhone được tính nếu dùng PWA.
- Font không quá nhỏ trên mobile.
- Vùng bấm option đủ lớn cho ngón tay.
- Khi xoay ngang, layout vẫn dùng được.
- Keyboard mobile khi focus search không che input bất hợp lý.

Test accessibility:

- Tất cả button có accessible name.
- Option answer dùng button hoặc radio có role rõ.
- Có focus visible khi tab bằng bàn phím.
- Tab order hợp lý.
- Enter/Space kích hoạt button đúng.
- Màu đúng/sai không phải tín hiệu duy nhất, cần có text hoặc icon.
- Contrast đủ đọc.
- Heading theo thứ tự hợp lý.
- Search input có label.
- Dialog nếu có phải trap focus và đóng bằng Escape.
- Screen reader đọc được trạng thái đúng/sai sau khi submit.

Test visual regression:

- Screenshot màn ôn tập mobile.
- Screenshot màn ôn tập desktop.
- Screenshot màn làm bài trước khi chọn.
- Screenshot màn làm bài sau khi chọn đúng.
- Screenshot màn làm bài sau khi chọn sai.
- Screenshot màn kết quả.
- Screenshot empty state search.
- Screenshot lỗi không đủ câu.
- Screenshot câu có công thức/dòng dài.
- Visual threshold phải vừa phải để bắt layout vỡ nhưng tránh flaky do font/render nhỏ.

Test hiệu năng:

- Load JSON lớn không lag rõ trên mobile.
- Search debounce nếu cần, không giật khi gõ.
- Render danh sách nhiều câu không quá chậm.
- Nếu danh sách dài gây lag, cân nhắc virtualization.
- Bundle production không quá nặng vì chỉ là app học offline.
- Không parse Markdown lại quá nhiều lần không cần thiết.

Test bảo mật và độ bền:

- Không dùng `dangerouslySetInnerHTML` với dữ liệu chưa sanitize.
- Nội dung Markdown có HTML lạ không chạy script.
- Link trong Markdown nếu có mở an toàn.
- Import JSON tiến độ không được chạy code.
- App không crash khi dữ liệu thiếu field, mà báo lỗi dữ liệu.
- Error boundary hiển thị thông báo dễ hiểu nếu có lỗi không mong muốn.

Test thủ công cuối cùng:

- Sau khi setup React: chạy dev server, build thử.
- Sau khi parse: chạy parser, kiểm report, chạy unit test parser.
- Sau khi có JSON: kiểm số câu và mở vài câu bất kỳ đối chiếu file gốc.
- Sau khi làm màn ôn tập: kiểm mobile, desktop, tìm kiếm, filter, render giải thích.
- Sau khi làm màn trắc nghiệm: kiểm chọn đáp án, hiện kết quả, qua câu, tổng kết.
- Sau khi làm random: chạy test nhiều lần để chắc không lệch đáp án.
- Sau khi thêm localStorage: kiểm reload trang vẫn giữ đánh dấu sao, câu sai, lịch sử.
- Trước khi chốt: chạy lint, test, build.

Lệnh verify cuối nên có:

- `npm run validate:data`
- `npm test`
- `npm run test:coverage`
- `npm run test:e2e`
- `npm run lint`
- `npm run build`

### 10. Checklist nghiệm thu

Parser:

- Parse đủ số câu kỳ vọng.
- Không có câu trùng id.
- Không thiếu câu.
- Không thiếu lựa chọn.
- Không thiếu đáp án.
- Không thiếu giải thích.
- Đáp án đúng luôn tồn tại trong lựa chọn.
- Công thức và ký hiệu đặc biệt không bị mất.

Ôn tập:

- Xem được toàn bộ danh sách.
- Tìm kiếm hoạt động.
- Filter hoạt động.
- Đánh dấu sao hoạt động.
- Mobile không vỡ layout.

Trắc nghiệm:

- Random đúng 90 câu nếu đủ dữ liệu.
- Không lộ đáp án trước khi chọn.
- Chọn xong mới hiện đúng/sai và giải thích.
- Đảo lựa chọn không làm sai đáp án.
- Tổng kết cuối bài đúng.
- Có danh sách câu sai để ôn lại.

Kỹ thuật:

- `npm test` pass.
- `npm run build` pass.
- Không có lỗi console nghiêm trọng.
- UI responsive trên mobile và desktop.

## Thứ tự triển khai đề xuất

1. Xác nhận và bổ sung file câu hỏi đầy đủ.
2. Setup React + TypeScript + test.
3. Cài design Miro bằng `npx getdesign@latest add miro`.
4. Cài skill từ `https://github.com/multica-ai/andrej-karpathy-skills` cho Codex CLI/agents.
5. Viết parser Markdown sang JSON.
6. Viết test parser và tạo parse report.
7. Build màn ôn tập.
8. Verify màn ôn tập trên mobile trước, desktop sau.
9. Build engine làm bài và random.
10. Viết test random, test map đáp án.
11. Build màn trắc nghiệm và màn kết quả.
12. Thêm localStorage cho sao, câu sai, lịch sử.
13. Chạy full test, build, kiểm UI cuối.

## Rủi ro cần để ý

- File nguồn hiện chưa đủ câu, nên chưa thể parse đủ 90 câu.
- Tên file là `88-cau...` nhưng yêu cầu trắc nghiệm lại nói random 90 câu. Cần thống nhất số câu kỳ vọng trước khi khóa logic.
- Đáp án trong dữ liệu có thể sai so với giải thích. Parser chỉ đảm bảo đọc đúng dữ liệu, không thể tự xác minh kiến thức nếu không có nguồn chuẩn khác.
- Đảo đáp án là chỗ dễ gây lỗi nhất, phải test riêng.
- Công thức toán nếu không theo chuẩn Markdown/LaTeX có thể cần render như plain text để giữ nguyên nội dung.

## Nguyên tắc làm việc

Làm chậm nhưng chắc. Mỗi phần xong phải verify ngay, không đợi tới cuối. Với dữ liệu câu hỏi, ưu tiên báo lỗi sớm hơn là cố đoán. Nếu parser thấy bất thường, dừng lại và ghi rõ lỗi để sửa file nguồn trước.

## Tiêu chuẩn chất lượng bắt buộc

Dự án này phải làm cẩn thận, chỉnh chu, tính năng nào ra tính năng đó. Không làm qua loa, không làm vội, không làm cho có.

Mỗi tính năng trước khi làm phải xác định rõ:

- Tính năng giải quyết vấn đề gì cho người học.
- Người dùng thao tác như thế nào trên mobile.
- Dữ liệu nào được đọc, ghi, lưu lại.
- Các trạng thái UI cần có: bình thường, đang tải, rỗng, lỗi, disabled, đã chọn, đúng, sai.
- Test tự động nào cần có.
- Test thủ công nào cần check lại bằng mắt.
- Điều kiện nào mới được coi là xong.

Không được đánh dấu một tính năng là hoàn thành nếu:

- Chỉ có UI nhưng logic chưa đúng.
- Logic chạy được nhưng chưa có test.
- Chỉ chạy trên desktop mà mobile bị vỡ.
- Chỉ xử lý happy path, chưa xử lý lỗi.
- Có dữ liệu sai nhưng app vẫn im lặng bỏ qua.
- Có đáp án bị lộ trước khi người dùng chọn.
- Có random nhưng chưa chứng minh được không lệch đáp án.
- Có localStorage nhưng chưa test reload/corrupt/migrate.
- Có công thức hoặc nội dung dài nhưng render bị tràn layout.

Definition of Done cho từng feature:

- Code rõ ràng, tách đúng trách nhiệm.
- Có test unit cho logic chính.
- Có test UI hoặc E2E cho luồng người dùng chính.
- Có xử lý lỗi và empty state.
- Có kiểm mobile trước desktop.
- Có đối chiếu UI với design markdown/spec nếu feature có giao diện.
- Có kiểm accessibility cơ bản.
- Có verify bằng lệnh test/build.
- Có ghi chú nếu còn rủi ro hoặc việc chưa làm.

Nếu trong quá trình làm phát hiện dữ liệu nguồn chưa đủ hoặc mâu thuẫn, phải dừng phần phụ thuộc dữ liệu đó và báo rõ. Không được tự bịa thêm câu, tự sửa đáp án, hoặc tự đoán ý file nguồn.
