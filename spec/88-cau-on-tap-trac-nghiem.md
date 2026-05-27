**Câu 1:**

Mô hình dữ liệu nào là nền tảng tối ưu và linh hoạt nhất để xây dựng một kho dữ liệu trung tâm (Central Data Warehouse) theo quan điểm của William H. Inmon?

- A. Mô hình đa chiều (Multidimensional/Star Join).
- B. Mô hình phân cấp (Hierarchical model).
- C. Mô hình quan hệ chuẩn hóa (Normalized Relational model).
- D. Mô hình mạng (Network model).
- E. Mô hình tệp tin phẳng (Flat file).

**Đáp án đúng:** C

**Giải thích:** William H. Inmon khẳng định rằng cách tiếp cận chuẩn hóa hoặc quan hệ là thiết kế tối ưu cho kho dữ liệu trung tâm vì nó mang lại tính linh hoạt cao, không bị ràng buộc vào một yêu cầu xử lý cụ thể nào và có khả năng phục vụ nhiều cộng đồng người dùng khác nhau với các mục đích khác nhau.

**Câu 2:**

Khi kho dữ liệu mở rộng đến quy mô rất lớn, giải pháp công nghệ nào nên được áp dụng để nâng cao hiệu quả lưu trữ đồng thời giảm chi phí?

- A. Lưu trữ toàn bộ dữ liệu trên đĩa cứng tốc độ cao (DASD).
- B. Sử dụng phân cấp lưu trữ (Storage Hierarchy), đưa dữ liệu ít truy cập sang các phương tiện lưu trữ thay thế (alternate/near-line storage).
- C. Xóa bỏ dữ liệu cũ sau 1 năm để tiết kiệm không gian.
- D. Chỉ sử dụng băng từ để lưu trữ toàn bộ kho dữ liệu.
- E. Nén dữ liệu nhưng vẫn giữ nguyên trên đĩa cứng đắt tiền.

**Đáp án đúng:** B

**Giải thích:** Tài liệu chỉ ra rằng việc đặt toàn bộ dữ liệu trên đĩa là không tối ưu về kinh phí. Thay vào đó, dữ liệu thường xuyên sử dụng nên nằm trên đĩa hiệu suất cao, còn dữ liệu ít dùng (dormant data) nên được chuyển sang các phương tiện lưu trữ rẻ hơn như near-line storage để giảm chi phí và tăng tốc độ xử lý tổng thể của hệ thống.

**Câu 3:**

Thuộc tính công nghệ nào là điều kiện bắt buộc để kho dữ liệu có thể quản lý hiệu quả khối lượng dữ liệu cực lớn (ở mức terabyte/petabyte) mà không bị ràng buộc bởi giới hạn quy mô về mặt lý thuyết?

- A. Khả năng mã hóa dữ liệu.
- B. Giao diện người dùng đồ họa (GUI).
- C. Khả năng quản lý và lưu trữ dữ liệu song song (Parallel storage and management).
- D. Khả năng tích hợp với Microsoft Excel.
- E. Sử dụng hệ điều hành 32-bit.

**Đáp án đúng:** C

**Giải thích:** Quản lý dữ liệu song song cho phép phân tán dữ liệu trên nhiều thiết bị vật lý, giúp tăng hiệu suất và loại bỏ giới hạn kỹ thuật về dung lượng. Khi dữ liệu tăng, hệ thống có thể mở rộng dễ dàng bằng cách thêm bộ xử lý hoặc thiết bị lưu trữ vào mạng lưới mà không cần thay đổi kiến trúc cốt lõi.

**Câu 4:**

Trong kiến trúc kho dữ liệu hỗ trợ môi trường Web, thành phần công nghệ nào đóng vai trò như một "bộ đệm trung gian" nhằm đảm bảo phản hồi ở mức mili giây cho các yêu cầu giao dịch trực tuyến?

- A. Máy chủ kho dữ liệu chính (Data Warehouse Server).
- B. Kho dữ liệu bộ phận (Data Mart).
- C. Hệ thống lưu trữ dữ liệu tác nghiệp (Operational Data Store - ODS).
- D. Công cụ khai phá dữ liệu (Data Mining tools).
- E. Siêu dữ liệu (Metadata repository).

**Đáp án đúng:** C

**Giải thích:** Kho dữ liệu (DW) thông thường không được thiết kế để hỗ trợ thời gian phản hồi dưới 1 giây. ODS là cấu trúc lưu chứa dữ liệu tích hợp, có khả năng hỗ trợ các giao dịch hiệu suất cao và phản hồi cực nhanh, đóng vai trò giảm tải cho DW trước các truy cập dồn dập từ môi trường Web.

**Câu 5:**

Công nghệ nào nên được lựa chọn để thực hiện việc tích hợp dữ liệu từ các hệ thống kế thừa (legacy systems) một cách hiệu quả và tự động hóa cao nhất?

- A. Viết code thủ công bằng ngôn ngữ COBOL hoặc C.
- B. Sử dụng phần mềm trích xuất, biến đổi và nạp (ETL software).
- C. Sử dụng các lệnh sao chép (Copy) trực tiếp của hệ điều hành.
- D. Nhập liệu thủ công bằng tay vào kho dữ liệu.
- E. Sử dụng các tệp tin trung gian (Flat files) mà không cần biến đổi.

**Đáp án đúng:** B

**Giải thích:** Mặc dù có thể viết code tay để chuyển đổi dữ liệu, nhưng phần mềm ETL chuyên dụng giúp tự động hóa quy trình phức tạp, tốn thời gian và lặp đi lặp lại của việc tích hợp dữ liệu, đồng thời giúp quản lý các quy tắc biến đổi dữ liệu một cách tập trung và có hệ thống hơn.

**Câu 6:**

Trong thực tế triển khai, lợi thế nổi bật nhất của công nghệ MOLAP (Multidimensional OLAP) so với ROLAP (Relational OLAP) là gì?

- A. Khả năng lưu trữ dữ liệu lớn hơn nhiều lần.
- B. Khả năng cập nhật dữ liệu liên tục theo thời gian thực.
- C. Hiệu suất truy vấn tối ưu cho các thao tác "slice and dice" nhờ dữ liệu đã được tính toán sẵn trong các khối (cubes).
- D. Chi phí bản quyền phần mềm thấp hơn.
- E. Dễ dàng thay đổi cấu trúc chiều dữ liệu mà không cần nạp lại.

**Đáp án đúng:** C

**Giải thích:** MOLAP sử dụng cấu trúc khối đa chiều giúp truy cập dữ liệu cực nhanh và được tối ưu hóa sẵn cho các phân tích DSS (hệ hỗ trợ ra quyết định). Tuy nhiên, nhược điểm của nó là thường bị giới hạn về dung lượng và tính linh hoạt so với nền tảng quan hệ (ROLAP).

**Câu 7:**

Khi một tổ chức cần kết nối và tích hợp nhiều hệ thống phần mềm khác nhau (chẳng hạn ERP, CRM, DW) từ các nhà cung cấp đa dạng, nên áp dụng công nghệ nào để thực hiện hiệu quả?

- A. Enterprise Application Integration (EAI) - Tích hợp ứng dụng doanh nghiệp.
- B. Xóa bỏ toàn bộ và cài đặt lại một hệ thống duy nhất.
- C. Sử dụng duy nhất phần mềm Microsoft Access.
- D. Chạy các hệ thống độc lập và không cần kết nối.
- E. Chỉ sử dụng trình duyệt Web làm công cụ lưu trữ.

**Đáp án đúng:** A

**Giải thích:** EAI cung cấp các công cụ tích hợp (middleware) đóng vai trò trung gian kết nối các hệ thống "tốt nhất trong phân khúc" (best-of-breed) từ nhiều nguồn khác nhau, giúp dữ liệu và quy trình nghiệp vụ có thể lưu thông mượt mà giữa các phòng ban.

**Câu 8:**

Trong các hệ hỗ trợ ra quyết định (DSS) hiện đại, tiêu chuẩn nào được xem là chuẩn mực thực tế đối với giao diện người dùng (User Interface)?

- A. Các báo cáo in ra giấy.
- B. Giao diện dòng lệnh (Command line).
- C. Trình duyệt Web (Web browser).
- D. Các bảng tính (Spreadsheets) không có kết nối mạng.
- E. Các thiết bị điều khiển bằng giọng nói chuyên dụng.

**Đáp án đúng:** C

**Giải thích:** Trình duyệt Web cung cấp một giao diện đồ họa (GUI) quen thuộc, dễ học, chi phí triển khai thấp và cho phép người dùng truy cập dữ liệu một cách linh hoạt, cơ động từ máy tính cá nhân cho đến các thiết bị di động (như PDA hoặc điện thoại thông minh).

**Câu 9:**

Trong quản lý siêu dữ liệu (metadata), công nghệ nào đang dần trở thành ngôn ngữ tiêu chuẩn cho việc tích hợp dữ liệu giữa kho dữ liệu (DW) và các thiết bị di động (m-commerce)?

- A. COBOL.
- B. XML.
- C. SQL.
- D. C++.
- E. EBCDIC.

**Đáp án đúng:** B

**Giải thích:** XML đang nhanh chóng trở thành ngôn ngữ tiêu chuẩn chung cho việc tích hợp cơ sở dữ liệu và chuyển giao dữ liệu, đặc biệt tối ưu khi trao đổi thông tin với các thiết bị di động và các ứng dụng thương mại điện tử hiện đại.

**Câu 10:**

Theo William H. Inmon, đâu là một yêu cầu công nghệ then chốt nhằm hỗ trợ khả năng truy cập dữ liệu trong kho dữ liệu (DW) một cách linh hoạt?

- A. Chỉ cho phép truy cập qua một ứng dụng duy nhất.
- B. Chỉ sử dụng các báo cáo đã được định nghĩa sẵn (static reports).
- C. Bắt buộc người dùng phải biết lập trình C++.
- D. Giới hạn số lượng câu hỏi mà người dùng có thể đặt ra.
- E. Giao diện ngôn ngữ phong phú và mạnh mẽ (Rich language interface).

**Đáp án đúng:** E

**Giải thích:** Kho dữ liệu phải cung cấp một giao diện ngôn ngữ mạnh mẽ, phong phú và dễ sử dụng để cả các lập trình viên lẫn người dùng cuối DSS (những nhà phân tích, quản lý) đều có thể dễ dàng thiết lập câu hỏi truy vấn và tiếp cận dữ liệu một cách linh hoạt theo nhu cầu của họ.

=================================================================

Dưới đây là **20 câu tiếp theo** (từ câu 11 đến câu 30) được định dạng đầy đủ, chuẩn hóa bao gồm: Câu hỏi, các lựa chọn (A, B, C, D, E), đáp án chính xác và phần giải thích chi tiết từ bài giảng trong video.

**Câu 11:**

Theo William H. Inmon, đâu là yếu tố quan trọng nhất cần được xem xét trong quá trình thiết kế kho dữ liệu (DW)?

- A. Lựa chọn công nghệ phần cứng mạnh mẽ nhất.
- B. Tốc độ của mạng truyền tải dữ liệu.
- C. Thiết lập các quy tắc bảo mật tường lửa.
- D. Lựa chọn ngôn ngữ lập trình cho các ứng dụng phía khách (front-end).
- E. Xác định độ mịn (Granularity) của dữ liệu.

**Đáp án đúng:** E

**Giải thích:** William H. Inmon khẳng định rõ ràng rằng khía cạnh quan trọng nhất của thiết kế kho dữ liệu là vấn đề độ mịn (Granularity). Nó ảnh hưởng trực tiếp đến khối lượng dữ liệu lưu trữ trong kho và khả năng trả lời các truy vấn chi tiết của người dùng.

**Câu 12:**

Vì sao phương pháp xây dựng kho dữ liệu theo kiểu "Big Bang" (triển khai toàn bộ trong một lần) lại bị xem là không phù hợp trong thực tế?

- A. Vì chi phí phần cứng sẽ quá đắt đỏ.
- B. Vì nó đòi hỏi quá nhiều nhân viên lập trình cùng lúc.
- C. Vì kho dữ liệu mang tính tiến hóa và người dùng hoạt động theo chế độ "khám phá", họ chỉ biết yêu cầu thực sự sau khi thấy các kết quả ban đầu.
- D. Vì các hệ thống nguồn không thể cung cấp dữ liệu đồng thời.
- E. Vì nó làm gián đoạn các hoạt động tác nghiệp hàng ngày của công ty.

**Đáp án đúng:** C

**Giải thích:** Kho dữ liệu được thiết kế theo từng bước và mang tính tiến hóa. Người dùng cuối thường không thể xác định chính xác yêu cầu của mình cho đến khi họ nhìn thấy các báo cáo đầu tiên (Mindset of discovery). Do đó, cách tiếp cận lặp lại (iterative/spiral) là quy tắc bắt buộc để tránh thất bại.

**Câu 13:**

Đặc tính "Hướng chủ đề" (Subject-oriented) trong thiết kế kho dữ liệu có nghĩa là:

- A. Dữ liệu được tổ chức theo các ứng dụng chức năng như bảo hiểm xe, bảo hiểm nhân thọ.
- B. Mỗi bộ phận trong công ty có một máy chủ riêng.
- C. Dữ liệu được tổ chức xung quanh các thực thể chính của doanh nghiệp như Khách hàng, Sản phẩm, Đơn hàng.
- D. Dữ liệu liệu chỉ chứa các thông tin về kế hoạch chiến lược.
- E. Dữ liệu được sắp xếp theo thứ tự bảng chữ cái của tên nhân viên.

**Đáp án đúng:** C

**Giải thích:** Khác với các hệ thống tác nghiệp được tổ chức theo ứng dụng chức năng, kho dữ liệu được thiết kế xoay quanh các chủ đề cốt lõi của doanh nghiệp (subjects) để hỗ trợ phân tích toàn diện về các thực thể đó.

**Câu 14:**

Quy tắc nào là yêu cầu bắt buộc đối với cấu trúc khóa (key structure) của tất cả các bản ghi trong kho dữ liệu?

- A. Khóa phải là một số nguyên tự tăng.
- B. Khóa phải giống hệt với khóa trong hệ thống tác nghiệp nguồn.
- C. Khóa luôn luôn phải chứa một yếu tố thời gian (Time variant).
- D. Khóa không được phép chứa các ký tự từ chữ cái.
- E. Khóa phải được mã hóa bằng công nghệ blockchain.

**Đáp án đúng:** C

**Giải thích:** Mọi đơn vị dữ liệu trong kho dữ liệu đều gắn liền với một thời điểm nhất định. Do đó, cấu trúc khóa của kho dữ liệu luôn luôn phải bao gồm yếu tố thời gian (như ngày, tháng, năm hoặc mốc thời gian) để theo dõi lịch sử.

**Câu 15:**

"Phân mảnh dữ liệu" (Partitioning) được coi là vấn đề thiết kế quan trọng thứ hai sau độ mịn vì:

- A. Nó giúp chia nhỏ dữ liệu thành các đơn vị vật lý có thể quản lý độc lập để tăng tính linh hoạt và hiệu suất.
- B. Nó giúp mã hóa dữ liệu thành các phần không thể đọc được.
- C. Nó bắt buộc người dùng phải truy cập dữ liệu theo thứ tự thời gian.
- D. Nó làm giảm số lượng băng cần thiết trong cơ sở dữ liệu.
- E. Nó loại bỏ nhu cầu sử dụng siêu dữ liệu (metadata).

**Đáp án đúng:** A

**Giải thích:** Phân mảnh giúp chia khối dữ liệu khổng lồ thành các phần nhỏ hơn (thường theo ngày/tháng/năm). Điều này cho phép đội ngũ vận hành linh hoạt hơn trong việc tái cấu trúc dữ liệu, lập chỉ mục và quản lý lưu trữ hiệu suất hệ thống.

**Câu 16:**

Trong thiết kế kho dữ liệu (DW), theo William H. Inmon, mô hình nào được khuyến nghị làm nền tảng tối ưu cho kho dữ liệu trung tâm vì tính linh hoạt và khả năng đáp ứng các nhu cầu chưa được xác định trước?

- A. Mô hình đa chiều (Star Join).
- B. Mô hình phân cấp (Hierarchical model).
- C. Mô hình quan hệ chuẩn hóa (Normalized Relational model).
- D. Mô hình tệp tin phẳng (Flat files).
- E. Mô hình mạng (Network model).

**Đáp án đúng:** C

**Giải thích:** William H. Inmon khẳng định rằng mô hình quan hệ chuẩn hóa là thiết kế tối ưu cho kho dữ liệu trung tâm vì tính linh hoạt của nó. Hệ thống không bị tối ưu hóa cho riêng một nhóm người dùng nào và dễ dàng thích ứng với các thay đổi trong tương lai.

**Câu 17:**

Quy trình xác định "Hệ thống hồ sơ" (System of Record) trong thiết kế kho dữ liệu nhằm mục đích gì?

- A. Tìm ra hệ thống nguồn có tốc độ xử lý nhanh nhất.
- B. Xác định nguồn dữ liệu "tốt nhất" (chính xác, kịp thời, đầy đủ nhất) để nạp vào kho dữ liệu.
- C. Ghi lại tên của tất cả nhân viên đã nhập liệu.
- D. Xóa bỏ các hệ thống cũ không còn sử dụng.
- E. Tạo ra một bản sao lưu dự phòng cho hệ thống tác nghiệp.

**Đáp án đúng:** B

**Giải thích:** Việc xác định "System of Record" là bước quan trọng để chọn lọc ra nguồn dữ liệu đáng tin cậy nhất trong số các hệ thống nguồn rời rạc, đảm bảo tính tích hợp và chính xác cho kho dữ liệu.

**Câu 18:**

Trong môi trường kho dữ liệu, các ràng buộc toàn vẹn tham chiếu (referential integrity) thường được xử lý ra sao sau khi thiết kế mối quan hệ giữa các dữ liệu?

- A. Được duy trì nghiêm ngặt bằng các khóa ngoại giống như trong OLTP.
- B. Bị loại bỏ hoàn toàn để tiết kiệm dung lượng.
- C. Được chuyển thành các "hiện vật" (artifacts) của mối quan hệ lịch sử, vì dữ liệu trong kho không biến động và liên quan đến thời gian.
- D. Chỉ được áp dụng cho dữ liệu của năm hiện tại.
- E. Do người dùng tự kiểm tra thủ công sau mỗi lần truy vấn.

**Đáp án đúng:** C

**Giải thích:** Do dữ liệu kho dữ liệu phản ánh các nghiệp vụ tại các thời điểm khác nhau trong quá khứ và không được cập nhật, các mối quan hệ được lưu trữ dưới dạng các "artifacts" lịch sử thay vì các ràng buộc động.

**Câu 19:**

Ba cấp độ nào của mô hình dữ liệu cần được xác định để xây dựng kho dữ liệu theo đúng quy trình chuẩn?

- A. Cấp độ doanh nghiệp, Cấp độ bộ phận, Cấp độ cá nhân.
- B. Mô hình ý niệm, Mô hình logic, Mô hình vật lý.
- C. Mô hình cao (High-level), Mô hình trung (Mid-level), Mô hình thấp/vật lý (Physical/Low-level).
- D. Mô hình đầu vào, Mô hình xử lý, Mô hình đầu ra.
- E. Mô hình dữ liệu thô, Mô hình dữ liệu tóm tắt, Mô hình báo cáo.

**Đáp án đúng:** C

**Giải thích:** Quy trình thiết kế DW tiêu chuẩn của Inmon bao gồm ba cấp độ: Mô hình cấp cao (xác định các chủ đề chính), Mô hình cấp trung (chi tiết hóa thuộc tính và mối quan hệ) và Mô hình cấp thấp/vật lý (để thực hiện thiết kế cơ sở dữ liệu thực tế).

**Câu 20:**

Một quy tắc thiết kế quan trọng nào cần được tuân thủ để kiểm soát và quản lý sự phát triển của kho dữ liệu theo thời gian?

- A. Không bao giờ được xóa dữ liệu khỏi kho.
- B. Luôn lưu trữ tất cả dữ liệu trên đĩa cứng tốc độ cao đắt tiền.
- C. Thiết lập các tiêu chí thanh lọc dữ liệu (Purge criteria) để di chuyển dữ liệu cũ, ít dùng sang các phương tiện lưu trữ rẻ hơn (near-line storage).
- D. Chỉ cho phép nạp dữ liệu mới một lần mỗi năm.
- E. Giới hạn dung lượng kho ở mức 1 Terabyte.

**Đáp án đúng:** C

**Giải thích:** Dữ liệu không thể tích lũy mãi mãi trên đĩa cứng đắt tiền. Một quy tắc thiết kế bền vững là phải có cơ chế thanh lọc hoặc chuyển dữ liệu cũ (dormant data) sang các phương tiện lưu trữ thay thế rẻ hơn để duy trì hiệu suất hệ thống.

**Câu 21:**

Theo William H. Inmon, vị trí của kho dữ liệu trong môi trường kiến trúc thông tin được xác định như thế nào?

- A. Là một hệ thống phụ trợ chỉ dùng để sao lưu dữ liệu tác nghiệp.
- B. Là một công cụ chỉ dành riêng cho nhân viên nhập liệu ghi chép (clerical community).
- C. Là một phần mềm dùng để thay thế hoàn toàn các hệ thống di sản (legacy systems).
- D. Là "trái tim" của môi trường có kiến trúc và là nền tảng của mọi quá trình xử lý DSS.
- E. Là một cơ sở dữ liệu tạm thời phục vụ cho việc in báo cáo cuối ngày.

**Đáp án đúng:** D

**Giải thích:** Kho dữ liệu được coi là trung tâm của môi trường thông tin doanh nghiệp, cung cấp nguồn dữ liệu tích hợp duy nhất để hỗ trợ các nhà phân tích DSS đưa ra quyết định dựa trên dữ liệu thống nhất toàn doanh nghiệp.

**Câu 22:**

Đặc điểm nào của kho dữ liệu đóng vai trò then chốt trong việc hình thành "một phiên bản sự thật duy nhất" (single version of the truth) cho các hệ hỗ trợ ra quyết định (DSS)?

- A. Biến động theo thời gian (Time-variant).
- B. Không biến động (Non-volatile).
- C. Tích hợp (Integrated).
- D. Hướng chủ đề (Subject-oriented).
- E. Tính chi tiết (Granularity).

**Đáp án đúng:** C

**Giải thích:** Tích hợp là khía cạnh quan trọng nhất vì nó loại bỏ các bộ mẫu mâu thuẫn về định dạng, mã hóa và tên gọi từ nhiều nguồn dữ liệu khác nhau, đảm bảo DSS dựa trên dữ liệu thống nhất toàn doanh nghiệp.

**Câu 23:**

Việc tách rời kho dữ liệu khỏi môi trường tác nghiệp (operational environment) giúp giải quyết vấn đề nào đối với các hệ hỗ trợ ra quyết định (DSS)?

- A. Giảm chi phí mua bản quyền hệ quản trị cơ sở dữ liệu.
- B. Ngăn chặn việc người dùng DSS truy cập vào internet.
- C. Bảo vệ hiệu suất của các hệ thống giao dịch (OLTP) khỏi các truy vấn phân tích phức tạp vốn đòi hỏi truy cập lượng lớn bản ghi.
- D. Loại bỏ nhu cầu sử dụng nhân viên quản trị cơ sở dữ liệu (DBA).
- E. Làm cho dữ liệu trở nên khó truy cập hơn đối với các đối thủ cạnh tranh.

**Đáp án đúng:** C

**Giải thích:** Các hệ thống tác nghiệp được tối ưu cho các giao dịch nhỏ lẻ, trong khi DSS yêu cầu truy cập lượng dữ liệu rất lớn. Việc tách biệt giúp cả hai hệ thống hoạt động hiệu quả theo đúng mục đích riêng mà không gây xung đột hiệu năng.

**Câu 24:**

Vì sao dữ liệu chi tiết (granular data) trong kho dữ liệu được xem là nền tảng quan trọng để đáp ứng các nhu cầu của DSS trong tương lai?

- A. Vì dữ liệu chi tiết chiếm ít không gian lưu trữ nhất.
- B. Vì dữ liệu chi tiết không bao giờ chứa yếu tố thời gian.
- C. Vì người dùng DSS chỉ muốn xem dữ liệu chi tiết nhất.
- D. Vì nó giúp hệ thống chạy nhanh hơn so với dữ liệu tóm tắt.
- E. Vì nó cho phép dữ liệu được định hình lại và tái sử dụng cho các yêu cầu chưa được xác định ở hiện tại.

**Đáp án đúng:** E

**Giải thích:** Dữ liệu ở mức độ mịn (nguyên tử) cho phép DSS linh hoạt trong việc tổng hợp dữ liệu theo nhiều cách khác nhau để đáp ứng các thay đổi về quy định hoặc nhu cầu kinh doanh mới phát sinh.

**Câu 25:**

Vai trò then chốt của kho dữ liệu đối với Hệ thống thông tin điều hành (EIS) là gì?

- A. Làm nền tảng hạ tầng cung cấp dữ liệu tích hợp, lịch sử và khả năng "khoan sâu" (drill-down) vào chi tiết.
- B. Cung cấp các báo cáo giấy truyền thống cho giám đốc.
- C. Thay thế các giám đốc trong việc đưa ra quyết định cuối cùng.
- D. Tự động gửi email quảng cáo cho khách hàng.
- E. Chỉ cung cấp dữ liệu về đối thủ cạnh tranh từ internet.

**Đáp án đúng:** A

**Giải thích:** Kho dữ liệu cung cấp hạ tầng cần thiết để EIS hỗ trợ các nhà điều hành truy cập thông tin nhanh chóng, phân tích xu hướng lịch sử và tìm hiểu nguyên nhân gốc rễ của vấn đề qua dữ liệu khoan sâu (drill-down).

**Câu 26:**

Kho dữ liệu hỗ trợ tổ chức chuyển đổi từ trạng thái "phản ứng" (reactive) sang "chủ động" (proactive) trong quá trình ra quyết định bằng cách nào?

- A. Bằng cách tự động hóa tất cả các quy trình sản xuất.
- B. Bằng cách loại bỏ hoàn toàn các sai sót trong dữ liệu.
- C. Nhờ việc lưu trữ sẵn dữ liệu chi tiết, tích hợp để sẵn sàng phân tích ngay khi các nhu cầu thông tin mới phát sinh.
- D. Bằng cách giảm số lượng nhân viên trong bộ phận IT.
- E. Nhờ việc cập nhật dữ liệu theo từng giây như hệ thống giao dịch.

**Đáp án đúng:** C

**Giải thích:** Với một kho dữ liệu đầy đủ dữ liệu chi tiết, các nhà phân tích không còn phải đóng vai trò kỹ sư dữ liệu đi tìm kiếm thông tin mới khi có yêu cầu, mà có thể tập trung ngay vào việc phân tích dữ liệu để đưa ra quyết định kịp thời.

**Câu 27:**

Metadata (Siêu dữ liệu) trong môi trường kho dữ liệu đóng vai trò gì đối với nhà phân tích DSS?

- A. Là một tệp tin rác không có giá trị sử dụng.
- B. Là công cụ dùng để nén dữ liệu nhằm tiết kiệm dung lượng đĩa.
- C. Là danh mục và bản đồ giúp người dùng định hướng, hiểu cấu trúc và nguồn gốc của dữ liệu trong kho.
- D. Là phần mềm dùng để mã hóa mật khẩu người dùng.
- E. Là các quy định về việc tuyển dụng nhân sự cho dự án DW.

**Đáp án đúng:** C

**Giải thích:** Siêu dữ liệu giúp nhà phân tích DSS biết dữ liệu nào đang tồn tại, nó đến từ đâu và đã được chuyển đổi như thế nào, từ đó tiết kiệm thời gian tìm kiếm và tăng sự tin cậy vào kết quả phân tích.

**Câu 28:**

Mối quan hệ giữa kho dữ liệu và Khai phá dữ liệu (Data Mining) là gì?

- A. Cả hai là một hệ thống duy nhất không thể tách rời.
- B. Kho dữ liệu là nguồn cung cấp dữ liệu sạch, tích hợp và khổng lồ để các thuật toán khai phá dữ liệu tìm kiếm các mẫu ẩn và quy luật.
- C. Khai phá dữ liệu được dùng để xây dựng cấu trúc bảng cho kho dữ liệu.
- D. Kho dữ liệu chỉ chứa dữ liệu tóm tắt nên không thể dùng cho khai phá dữ liệu.
- E. Khai phá dữ liệu là một bước bắt buộc phải thực hiện trước khi nạp dữ liệu vào kho.

**Đáp án đúng:** B

**Giải thích:** Kho dữ liệu cung cấp nền tảng dữ liệu ổn định và phong phú, giúp các công cụ khai phá dữ liệu hoạt động hiệu quả hơn trong việc phát hiện tri thức mới phục vụ DSS.

**Câu 29:**

Trong bối cảnh hỗ trợ ra quyết định, vì sao đặc tính "có yếu tố thời gian" (time-variant) của kho dữ liệu lại giữ vai trò quan trọng hơn so với các hệ thống tác nghiệp?

- A. Vì hệ thống tác nghiệp không quan tâm đến thời gian.
- B. Vì kho dữ liệu cần biết chính xác giây phút nạp dữ liệu để tính tiền điện.
- C. Vì kho dữ liệu cho phép phân tích xu hướng và so sánh hiệu suất qua các giai đoạn lịch sử khác nhau.
- D. Vì nhà quản lý chỉ quan tâm đến những gì đang xảy ra ở hiện tại.
- E. Vì nó giúp xóa bỏ dữ liệu một cách tự động mỗi ngày.

**Đáp án đúng:** C

**Giải thích:** Khác với hệ thống tác nghiệp tập trung vào giá trị hiện tại, kho dữ liệu lưu trữ lịch sử giúp nhà quản lý thấy được sự thay đổi của doanh nghiệp theo thời gian, từ đó đưa ra các dự báo chính xác hơn.

**Câu 30:**

Kho dữ liệu hỗ trợ quá trình "khoan sâu" (drill-down) trong phân tích quyết định bằng cách nào?

- A. Bằng cách liên kết dữ liệu tóm tắt với dữ liệu chi tiết cấu thành thông qua cấu trúc khóa nhất quán.
- B. Bằng cách tự động tăng tốc độ xử lý của CPU khi người dùng yêu cầu xem chi tiết.
- C. Bằng cách chỉ hiển thị dữ liệu chi tiết và ẩn đi các con số tổng hợp.
- D. Bằng cách chuyển câu hỏi của người dùng sang cho các chuyên gia tư vấn bên ngoài.
- E. Bằng cách xóa bỏ các bảng dữ liệu để tập trung vào bảng sự kiện.

**Đáp án đúng:** A

**Giải thích:** Cấu trúc khóa trong DW cho phép người dùng từ một con số tổng quát (như tổng doanh thu năm) có thể truy ngược lại các thành phần chi tiết (như doanh thu theo quý, tháng, ngày, cửa hàng) một cách tự nhiên.

=============================================================

Dưới đây là **10 câu tiếp theo** (từ câu 31 đến câu 40) được định dạng đầy đủ, chuẩn hóa bao gồm: Câu hỏi, các lựa chọn (A, B, C, D, E), đáp án chính xác và phần giải thích chi tiết từ bài giảng trong video.

**Câu 31:**

In hệ hỗ trợ ra quyết định (DSS), vai trò của Kho dữ liệu bộ phận (Data Mart) khác gì so với Kho dữ liệu doanh nghiệp (EDW)?

- A. Data Mart chứa toàn bộ dữ liệu lịch sử của tất cả các phòng ban nhưng có tốc độ xử lý chậm hơn.
- B. Data Mart là các tập con dữ liệu từ EDW, được định hình riêng cho nhu cầu phân tích của một bộ phận cụ thể để tăng tốc độ và tính tiện dụng.
- C. Data Mart chỉ dùng để lưu trữ dữ liệu rác đã bị loại bỏ khỏi EDW.
- D. Data Mart là hệ thống phần cứng độc lập hoàn toàn và không có mối liên kết nào với EDW.
- E. Data Mart chỉ phục vụ cho nhân viên nhập liệu cấp cơ sở thay vì nhà quản lý.

**Đáp án đúng:** B

**Giải thích:** Kho dữ liệu doanh nghiệp (EDW) mang tính tập trung và chứa dữ liệu của toàn bộ tập đoàn, khiến cấu trúc của nó rất lớn và phức tạp. Để tăng hiệu suất truy vấn, người ta trích xuất các tập con dữ liệu theo từng chủ đề chuyên biệt (như Tài chính, Nhân sự, Marketing) thành các Data Mart để phục vụ riêng cho nhu cầu của từng bộ phận đó.

**Câu 32:**

Việc triển khai kho dữ liệu giúp giảm tải công tác bảo trì cho môi trường sản xuất (production environment) bằng cách nào?

- A. Bằng cách chuyển các yêu cầu xử lý thông tin và báo cáo sang môi trường kho dữ liệu.
- B. Bằng cách tự động hóa quy trình sửa lỗi code trên hệ thống sản xuất.
- C. Bằng cách xóa bỏ các dữ liệu cũ trực tiếp trên môi trường sản xuất mà không cần lưu trữ.
- D. Bằng cách giới hạn thời gian sử dụng hệ thống sản xuất của nhân viên dưới 4 tiếng một ngày.
- E. Bằng cách ngăn chặn hoàn toàn việc người dùng cuối truy cập vào hệ thống sản xuất.

**Đáp án đúng:** A

**Giải thích:** Trong kiến trúc cũ, các báo cáo phân tích nặng nề phải chạy trực tiếp trên cơ sở dữ liệu sản xuất (vận hành), gây nghẽn mạch hệ thống và đòi hỏi bảo trì liên tục. Khi kho dữ liệu (DW) ra đời, toàn bộ các tác vụ báo cáo, phân tích dài hạn được đẩy sang môi trường DW, trả lại sự mượt mà và giảm tải áp lực vận hành lẫn bảo trì cho hệ thống gốc.

**Câu 33:**

Trong lĩnh vực hệ thống thông tin, thuật ngữ "Hệ thống hỗ trợ quản lý" (MSS) thường được hiểu theo nghĩa nào?

- A. Là một thuật ngữ bao quát (umbrella term) chỉ việc ứng dụng bất kỳ công nghệ nào để hỗ trợ các nhiệm vụ quản lý và ra quyết định.
- B. Là một phần mềm kế toán chuyên dụng để tính lương cho nhân viên.
- C. Là hệ thống phần cứng bao gồm máy chủ và thiết bị mạng của phòng IT.
- D. Là các quy định hành chính về việc quản lý giờ giấc làm việc của công ty.
- E. Là một ứng dụng chỉ chạy trên điện thoại di động của các giám đốc.

**Đáp án đúng:** A

**Giải thích:** Management Support Systems (MSS) là một khái niệm mang tính bao quát (umbrella term). Nó không chỉ đích danh một phần mềm cụ thể nào mà đại diện cho một nhóm các công nghệ, công cụ (bao gồm cả DSS, EIS, Expert Systems) được thiết kế với mục đích chung là hỗ trợ hoạt động quản lý và ra quyết định.

**Câu 34:**

Một đặc tính quan trọng phân biệt MSS với các hệ thống xử lý giao dịch (TPS) truyền thống là:

- A. MSS tập trung vào tốc độ nhập liệu của nhân viên.
- B. MSS tập trung vào tính hiệu quả (Effectiveness) của quyết định được đưa ra.
- C. MSS chỉ xử lý các dữ liệu dạng văn bản thô.
- D. MSS yêu cầu phần cứng phải đặt tại văn phòng trung tâm của doanh nghiệp.
- E. MSS hoạt động hoàn toàn tự động mà không cần sự can thiệp của con người.

**Đáp án đúng:** B

**Giải thích:** Các hệ thống xử lý giao dịch truyền thống (TPS/OLTP) tập trung vào tính hiệu năng và hiệu suất (Efficiency) – tức là làm thế nào để xử lý được nhiều giao dịch nhất trong thời gian ngắn nhất. Ngược lại, MSS tập trung vào tính hiệu quả (Effectiveness) – tức là giúp nhà quản lý lựa chọn được phương án hành động đúng đắn và chất lượng nhất.

**Câu 35:**

Theo mô hình của Simon (1977), quá trình ra quyết định được hỗ trợ bởi MSS bao gồm 3 giai đoạn chính là:

- A. Nhập liệu, Xử lý, Xuất báo cáo.
- B. Thu thập, Lưu trữ, Phân tích.
- C. Thông minh (Intelligence), Thiết kế (Design), và Lựa chọn (Choice).
- D. Lập kế hoạch, Tổ chức, Kiểm tra.
- E. Khảo sát, Lập trình, Triển khai.

**Đáp án đúng:** C

**Giải thích:** Mô hình kinh điển của Herbert A. Simon chia quá trình ra quyết định thành các giai đoạn cốt lõi: Intelligence (tìm hiểu môi trường để nhận diện vấn đề/cơ hội), Design (xây dựng và phân tích các phương án khả thi), và Choice (lựa chọn phương án tối ưu để cam kết thực hiện).

**Câu 36:**

Theo phân loại các hoạt động quản lý của Robert N. Anthony (1965), MSS thường được thiết kế để hỗ trợ những cấp độ quản lý nào?

- A. Chỉ hỗ trợ công việc bàn giấy của nhân viên hành chính (clerical staff).
- B. Lập kế hoạch chiến lược, Kiểm soát quản lý và Kiểm soát tác nghiệp.
- C. Chỉ hỗ trợ việc lập kế hoạch sản xuất của kỹ sư phân xưởng.
- D. Quản lý an ninh tòa nhà và giám sát camera.
- E. Chỉ dành riêng cho các cổ đông bên ngoài doanh nghiệp.

**Đáp án đúng:** B

**Giải thích:** Khung lý thuyết của Anthony phân cấp quản lý thành 3 tầng: Strategic Planning (Chiến lược - cấp cao), Management Control (Chiến thuật/Quản lý - cấp trung), và Operational Control (Tác nghiệp - cấp cơ sở). Hệ thống MSS hiện đại có cấu trúc linh hoạt để cung cấp thông tin phù hợp cho cả 3 cấp độ này.

**Câu 37:**

Ba thành phần cốt lõi nào bắt buộc phải có trong kiến trúc của một hệ DSS/MSS tiêu chuẩn?

- A. Bàn phím, Chuột, Màn hình máy tính.
- B. Cáp mạng, Bộ định tuyến, Máy chủ lưu trữ.
- C. Phần hệ quản lý dữ liệu, Phần hệ quản lý mô hình và Giao diện người dùng.
- D. Hệ điều hành Windows, Phần mềm Excel, Trình duyệt Chrome.
- E. Bộ mã hóa dữ liệu, Bộ nén dữ liệu, Bộ sao lưu dữ liệu.

**Đáp án đúng:** C

**Giải thích:** Một kiến trúc DSS tiêu chuẩn bao gồm: (1) Data Management Subsystem (quản lý và cung cấp dữ liệu sạch), (2) Model Management Subsystem (chứa các mô hình toán học, tài chính, thống kê để phân tích), và (3) User Interface (giao diện tương tác giúp người dùng điều khiển hệ thống).

**Câu 38:**

Vì sao các hệ thống MSS thường được thiết kế để xử lý các vấn đề "bán cấu trúc" (semistructured)?

- A. Vì máy tính không thể xử lý được các vấn đề có cấu trúc rõ ràng.
- B. Vì các vấn đề phi cấu trúc hoàn toàn không có giá trị kinh doanh đối với doanh nghiệp.
- C. Vì các vấn đề này đòi hỏi sự kết hợp giữa các quy trình giải quyết tiêu chuẩn của máy tính và sự phán đoán của con người.
- D. Vì lập trình viên không biết cách viết code cho các bài toán kinh tế phức tạp.
- E. Vì dữ liệu đầu vào của hệ thống luôn luôn bị thiếu sót một nửa.

**Đáp án đúng:** C

**Giải thích:** Vấn đề bán cấu trúc nằm ở khoảng giữa: một phần bài toán có thể giải quyết bằng thuật toán máy tính (ví dụ: tính toán chi phí, tối ưu tuyến đường), phần còn lại phụ thuộc vào kinh nghiệm, trực giác và phán đoán cá nhân của nhà quản lý. MSS đóng vai trò trợ lý đắc lực để xử lý phần tính toán, giúp con người đưa ra quyết định tốt hơn.

**Câu 39:**

Đặc tính "tương tác" (interactive) của MSS mang ý nghĩa gì đối với người ra quyết định?

- A. Hệ thống sẽ tự động gửi tin nhắn rác cho người dùng mỗi giờ.
- B. Bắt buộc người dùng phải nhấn chuột liên tục để hệ thống không bị tắt.
- C. Cho phép người dùng giao tiếp trực tiếp, ra lệnh và nhận phản hồi từ hệ thống để khám phá các khía cạnh khác nhau của vấn đề.
- D. Hệ thống có khả năng tự động gọi điện thoại cho khách hàng khi có sự cố.
- E. Người dùng có thể chơi trò chơi điện tử trực tiếp trên giao diện báo cáo.

**Đáp án đúng:** C

**Giải thích:** Tính tương tác (Interactive) đảm bảo nhà quản lý không phải là người nhận báo cáo tĩnh một chiều. Họ có thể chủ động thay đổi tham số, đặt câu hỏi truy vấn mới, đổi góc nhìn dữ liệu và nhận kết quả phản hồi ngay lập tức từ hệ thống để phục vụ quá trình suy nghĩ liên tục.

**Câu 40:**

Điểm khác biệt cốt lõi giữa MSS dựa trên Web (Web-based MSS) và các hệ thống truyền thống là gì?

- A. Web-based MSS yêu cầu máy tính phải cài đặt hệ điều hành Linux mới chạy được.
- B. Web-based MSS không cần sử dụng cơ sở dữ liệu để lưu trữ thông tin.
- C. Web-based MSS sử dụng trình duyệt Web làm giao diện người dùng thống nhất, giúp truy cập dữ liệu và mô hình mọi lúc, mọi nơi với chi phí thấp.
- D. Web-based MSS chỉ hiển thị hình ảnh và video chứ không hiển thị các con số.
- E. Web-based MSS chạy chậm hơn rất nhiều so với các phần mềm cài đặt trên máy trạm cũ.

**Đáp án đúng:** C

**Giải thích:** Kiến trúc Web-based MSS giải phóng người dùng khỏi các ràng buộc phần cứng phức tạp tại văn phòng. Chỉ với một trình duyệt Web tiêu chuẩn và kết nối mạng, nhà quản lý có thể khai thác toàn bộ sức mạnh phân tích của hệ thống từ xa, giúp giảm đáng kể chi phí triển khai, đào tạo và bảo trì của doanh nghiệp.

==================================================================

Dưới đây là **10 câu tiếp theo** (từ câu 41 đến câu 50) được định dạng đầy đủ, chuẩn hóa bao gồm: Câu hỏi, các lựa chọn (A, B, C, D, E), đáp án chính xác và phần giải thích chi tiết từ bài giảng trong video.

**Câu 41:**

"Hệ thống hỗ trợ hỗn hợp" (Hybrid Support Systems) được hiểu là gì?

- A. Việc sử dụng các máy tính chạy cả hai hệ điều hành Windows và macOS cùng lúc.
- B. Việc tích hợp nhiều loại công nghệ MSS khác nhau (như DSS, ES, AI) để tận dụng ưu điểm của từng loại nhằm giải quyết vấn đề tốt hơn.
- C. Hệ thống chỉ hoạt động khi có sự kết hợp giữa một nhân viên nam và một nhân viên nữ.
- D. Việc kết hợp giữa phần mềm kế toán cũ và phần mềm quản trị nhân sự mới mà không có sự liên kết dữ liệu.
- E. Hệ thống máy tính vừa dùng để xử lý dữ liệu vừa dùng để điều khiển dây chuyền sản xuất tự động.

**Đáp án đúng:** B

**Giải thích:** Trong thực tế quản lý, các bài toán kinh doanh thường rất phức tạp. Hệ thống hỗ trợ hỗn hợp (Hybrid Support Systems) ra đời nhằm kết hợp điểm mạnh của các công nghệ khác nhau: ví dụ DSS xử lý tính toán số liệu, Hệ chuyên gia (Expert Systems - ES) hay Trí tuệ nhân tạo (AI) cung cấp các luật suy diễn thông minh, từ đó tạo ra một giải pháp toàn diện hơn.

**Câu 42:**

Đặc tính nào của MSS giúp nhà quản lý đánh giá rõ hơn các rủi ro và những tác động tiềm ẩn của các phương án khác nhau trước khi ra quyết định?

- A. Khả năng thực hiện phân tích "What-if" (Nếu-thì) và phân tích độ nhạy (Sensitivity analysis).
- B. Khả năng tự động khóa tài khoản của nhân viên khi họ làm sai quy trình.
- C. Khả năng gửi báo cáo hàng loạt đến tất cả các cổ đông qua email.
- D. Khả năng hoạt động liên tục mà không cần bảo trì phần cứng.
- E. Khả năng chuyển đổi giao diện báo cáo sang nhiều ngôn ngữ khác nhau.

**Đáp án đúng:** A

**Giải thích:** Các công cụ MSS/DSS hiện đại cung cấp khả năng giả lập mạnh mẽ. Nhà quản lý có thể thay đổi các biến số đầu vào (ví dụ: *"Nếu giá nguyên vật liệu tăng 5% và ngân sách marketing giảm 10% thì lợi nhuận sẽ thay đổi ra sao?"*). Việc phân tích "What-if" và phân tích độ nhạy này giúp họ lường trước các kịch bản rủi ro để chuẩn bị phương án đối phó.

**Câu 43:**

Bài toán nào sau đây là một bài toán điển hình của kỹ thuật Hồi quy (Regression) trong khai phá dữ liệu?

- A. Dự đoán một giao dịch thẻ tín dụng là hợp lệ hay gian lận.
- B. Phân loại khách hàng thành các nhóm: Phù hợp vay vốn hoặc Không phù hợp vay vốn.
- C. Dự đoán doanh số bán hàng của tháng tới (dạng con số cụ thể) dựa trên ngân sách quảng cáo.
- D. Tự động nhóm các bài báo có nội dung tương tự nhau về cùng một chuyên mục.
- E. Phát hiện mối liên hệ giữa việc mua bia và mua tã giấy của khách hàng.

**Đáp án đúng:** C

**Giải thích:** Mục tiêu của bài toán Hồi quy (Regression) là dự đoán một giá trị số liên tục (continuous numeric value). Trong các phương án trên, việc dự đoán doanh số bán hàng (ví dụ: 150 triệu, 200 triệu...) chính là giá trị số liên tục, trong khi phân loại gian lận hay phân loại hồ sơ vay vốn thuộc bài toán Phân lớp (Classification).

**Câu 44:**

Trong phương trình hồi quy tuyến tính đơn giản $Y = 2X + 5$, nếu biến độc lập $X = 10$ thì giá trị dự báo $Y$ thu được là bao nhiêu?

- A. 15
- B. 25
- C. 20
- D. 30
- E. 10

**Đáp án đúng:** B

**Giải thích:** Đây là bài toán tính toán cơ bản theo mô hình hồi quy tuyến tính. Ta thay giá trị $X = 10$ vào phương trình:

$$Y = 2 \times 10 + 5 = 20 + 5 = 25$$

**Câu 45:**

Một mô hình hồi quy dự báo giá nhà dựa trên diện tích có phương trình $Price = 10 \times Area + 100$. Nếu diện tích nhà là $50m^2$, giá nhà dự báo sẽ là bao nhiêu?

- A. 500
- B. 150
- C. 600
- D. 550
- E. 400

**Đáp án đúng:** C

**Giải thích:** Tương tự câu trên, ta áp dụng công thức của mô hình hồi quy tuyến tính bằng cách thay giá trị biến độc lập $Area = 50$ vào phương trình:

$$Price = 10 \times 50 + 100 = 500 + 100 = 600$$

**Câu 46:**

Đặc điểm cốt lõi nào dùng để phân biệt giữa kỹ thuật Hồi quy (Regression) và kỹ thuật Phân lớp (Classification) trong khai phá dữ liệu?

- A. Hồi quy chỉ xử lý được dữ liệu dạng văn bản, còn phân lớp xử lý dữ liệu dạng số.
- B. Phân lớp yêu cầu thuật toán chạy chậm hơn rất nhiều so với hồi quy.
- C. Hồi quy dùng để nhóm dữ liệu tự động mà không cần nhãn từ trước.
- D. Hồi quy chỉ áp dụng cho dữ liệu tài chính, còn phân lớp áp dụng cho dữ liệu y tế.
- E. Hồi quy dự báo giá trị số liên tục (continuous), phân lớp dự báo nhãn lớp rời rạc (discrete).

**Đáp án đúng:** E

**Giải thích:** Đây là điểm phân biệt căn bản trong Học máy có giám sát (Supervised Learning). Cả hai đều cần dữ liệu dán nhãn để học, nhưng điểm khác nhau nằm ở mục tiêu đầu ra: Hồi quy dự báo một con số liên tục (như nhiệt độ, giá cả, doanh thu), còn Phân lớp dự báo một danh mục rời rạc/nhãn lớp (như Đúng/Sai, Đạt/Không đạt, Thấp/Trung bình/Cao).

**Câu 47:**

Trong đánh giá mô hình phân lớp tìm kiếm thông tin, nếu một thuật toán tìm kiếm trả về 210 trang web, trong đó có 190 trang thực sự liên quan đến chủ đề yêu cầu, thì Độ chính xác (Precision) của mô hình được tính như thế nào?

- A. 190/210
- B. 20/210
- C. 210/190
- D. 190/(210 + 190)
- E. 20/190

**Đáp án đúng:** A

**Giải thích:** Độ chính xác (Precision) đo lường tỷ lệ giữa số kết quả dự đoán đúng trên tổng số kết quả mà hệ thống đã trả về. Công thức tính là:

$$Precision = \frac{\text{Số kết quả đúng thực tế}}{\text{Tổng số kết quả hệ thống trả về}} = \frac{190}{210}$$

**Câu 48:**

Thành phần nào sau đây trong kiến trúc Cây quyết định (Decision Tree) đại diện cho nhãn lớp (kết quả dự báo cuối cùng)?

- A. Nút gốc (Root node).
- B. Các nhánh của cây (Branches).
- C. Nút quyết định trung gian (Internal nodes).
- D. Nút lá (Leaf nodes).
- E. Độ sâu của cây (Tree depth).

**Đáp án đúng:** D

**Giải thích:** Trong cấu trúc Cây quyết định (Decision Tree):

- **Nút gốc và nút trung gian:** Đại diện cho các thuộc tính dữ liệu được dùng để kiểm tra điều kiện (ví dụ: Thu nhập > 10 triệu?).
- **Các nhánh:** Đại diện cho các kết quả của phép kiểm tra (Đúng/Sai).
- **Nút lá (Leaf nodes):** Nằm ở cuối cùng của các nhánh, đại diện cho nhãn lớp hoặc quyết định cuối cùng của mô hình (ví dụ: Cho vay / Từ chối).

**Câu 49:**

Thuật toán phân lớp nổi tiếng Naive Bayes được xây dựng dựa trên định lý nào trong toán học xác suất?

- A. Định lý Pitago.
- B. Định lý Bayes.
- C. Định lý giới hạn trung tâm.
- D. Định lý Thales.
- E. Định lý Fermat.

**Đáp án đúng:** B

**Giải thích:** Thuật toán Naive Bayes là một mô hình phân lớp xác suất dựa trên việc áp dụng Định lý Bayes (Bayes' Theorem) với một giả định "ngây thơ" (naive) rằng các thuộc tính đầu vào hoàn toàn độc lập với nhau khi biết nhãn lớp.

**Câu 50:**

Nếu một mô hình phân lớp y tế được dùng để dự báo bệnh ("Có bệnh" hoặc "Không bệnh"). Thực tế trong tập dữ liệu có 100 người mắc bệnh, mô hình dự báo đúng được 90 người trong số đó. Chỉ số Độ bao phủ (Recall) của mô hình này là bao nhiêu?

- A. 10/100
- B. 90/10
- C. 90/100
- D. 10/90
- E. 100/90

**Đáp án đúng:** C

**Giải thích:** Độ bao phủ (Recall hay Sensitivity) đo lường khả năng tìm sót dữ liệu của mô hình, tức là trong số tất cả các trường hợp thực tế là tích cực (thực tế mắc bệnh), mô hình đã tìm ra được bao nhiêu trường hợp. Công thức là:

$$Recall = \frac{\text{Số trường hợp mắc bệnh dự báo đúng (TP)}}{\text{Tổng số trường hợp thực tế mắc bệnh (TP + FN)}} = \frac{90}{100}$$

===========================================

Dưới đây là **10 câu tiếp theo** (từ câu 51 đến câu 60) được định dạng đầy đủ, chuẩn hóa bao gồm: Câu hỏi, các lựa chọn (A, B, C, D, E), đáp án chính xác và phần giải thích chi tiết từ bài giảng trong video.

**Câu 51:**

Một mô hình phân lớp bệnh (disease classification) cho kết quả thực nghiệm được thống kê qua các chỉ số sau:

- True Positive (TP) = 40 (Thực tế có bệnh và mô hình dự báo đúng là có bệnh)
- True Negative (TN) = 50 (Thực tế không bệnh và mô hình dự báo đúng là không bệnh)
- False Positive (FP) = 10 (Thực tế không bệnh nhưng mô hình dự báo sai là có bệnh)
- False Negative (FN) = 20 (Thực tế có bệnh nhưng mô hình dự báo sai là không bệnh)

Hãy tính chỉ số F-Measure (F1-score) của mô hình này.

- A. 0.65
- B. 0.80
- C. 0.72
- D. 0.55
- E. 0.85

**Đáp án đúng:** C

**Giải thích:** Để tính $F1\text{-score}$, trước hết ta cần tính Độ chính xác ($Precision$) và Độ bao phủ ($Recall$):

$$Precision = \frac{TP}{TP + FP} = \frac{40}{40 + 10} = \frac{40}{50} = 0.8$$

$$Recall = \frac{TP}{TP + FN} = \frac{40}{40 + 20} = \frac{40}{60} \approx 0.667$$

Sau đó, áp dụng công thức tính trung bình điều hòa giữa hai chỉ số này để ra $F1\text{-score}$:

$$F1 = 2 \times \frac{Precision \times Recall}{Precision + Recall} = 2 \times \frac{0.8 \times 0.667}{0.8 + 0.667} = 2 \times \frac{0.5336}{1.467} \approx 0.727$$

Làm tròn số ta thu được kết quả gần đúng nhất là 0.72.

**Câu 52:**

"Giả định ngây thơ" (Naive) trong thuật toán Naive Bayes có nghĩa là gì về mặt toán học và thuộc tính dữ liệu?

- A. Giả định rằng tất cả người dùng hệ thống đều không biết lập trình.
- B. Giả định rằng kích thước của tập dữ liệu huấn luyện luôn luôn nhỏ hơn 100 dòng.
- C. Các thuộc tính được giả định là độc lập với nhau khi biết nhãn lớp.
- D. Giả định rằng không có bất kỳ sai số nào xuất hiện trong quá trình tính toán xác suất.
- E. Các nhãn lớp luôn luôn có tỷ lệ xuất hiện bằng nhau trong mọi bài toán.

**Đáp án đúng:** C

**Giải thích:** Thuật toán được gọi là "ngây thơ" vì nó đưa ra một giả định cực kỳ đơn giản hóa (và hiếm khi đúng hoàn toàn trong thực tế): tất cả các đặc trưng/thuộc tính đầu vào hoàn toàn độc lập và không có mối quan hệ ràng buộc nào với nhau khi xét trong một lớp cụ thể. Việc đơn giản hóa này giúp thuật toán tính toán cực nhanh và hiệu quả trên các tập dữ liệu lớn (như phân loại thư rác).

**Câu 53:**

Khoảng cách Manhattan (Manhattan distance) giữa hai điểm $A(1, 6)$ và $B(3, 5)$ trong không gian hai chiều được tính ra kết quả là bao nhiêu?

- A. 1
- B. 2
- C. 3
- D. 4
- E. 5

**Đáp án đúng:** C

**Giải thích:** Khoảng cách Manhattan tính bằng tổng giá trị tuyệt đối của hiệu các tọa độ tương ứng giữa hai điểm. Công thức tính là:

$$d_{\text{Manhattan}}(A, B) = |x_A - x_B| + |y_A - y_B|$$

Thay số vào công thức:

$$d_{\text{Manhattan}}(A, B) = |1 - 3| + |6 - 5| = |-2| + |1| = 2 + 1 = 3$$

**Câu 54:**

Khoảng cách Euclid (Euclidean distance) giữa hai điểm gốc tọa độ $P1(0, 0)$ và điểm $P2(3, 4)$ là bao nhiêu?

- A. 7
- B. 5
- C. 25
- D. 12
- E. 1

**Đáp án đúng:** B

**Giải thích:** Khoảng cách Euclid tính theo đường thẳng ngắn nhất nối hai điểm (áp dụng định lý Pitago). Công thức tính là:

$$d_{\text{Euclid}}(P1, P2) = \sqrt{(x_1 - x_2)^2 + (y_1 - y_2)^2}$$

Thay số vào công thức:

$$d_{\text{Euclid}}(P1, P2) = \sqrt{(0 - 3)^2 + (0 - 4)^2} = \sqrt{(-3)^2 + (-4)^2} = \sqrt{9 + 16} = \sqrt{25} = 5$$

**Câu 55:**

Trong thuật toán Gom cụm K-means, nếu một cụm hiện tại đang chứa 3 điểm dữ liệu có giá trị một chiều lần lượt là 10, 20 và 30, thì vị trí trọng tâm (centroid) mới của cụm này sẽ dịch chuyển về giá trị nào?

- A. 10
- B. 15
- C. 20
- D. 25
- E. 30

**Đáp án đúng:** C

**Giải thích:** Trọng tâm (centroid) của một cụm trong thuật toán K-means được xác định bằng cách tính giá trị trung bình cộng tọa độ của tất cả các điểm dữ liệu thuộc cụm đó. Công thức là:

$$\text{Centroid} = \frac{10 + 20 + 30}{3} = \frac{60}{3} = 20$$

**Câu 56:**

Mục tiêu cốt lõi của kỹ thuật Gom cụm (Clustering) trong khai phá dữ liệu là:

- A. Gán một nhãn lớp đã biết trước cho từng dòng dữ liệu mới.
- B. Tìm ra phương trình đường thẳng mô tả xu hướng biến động của thị trường.
- C. Nhóm các đối tượng tương tự nhau vào cùng một cụm và các đối tượng khác nhau vào các cụm khác nhau.
- D. Sắp xếp dữ liệu theo thứ tự tăng dần của các giá trị số.
- E. Loại bỏ toàn bộ các cột dữ liệu không chứa giá trị số khỏi bảng.

**Đáp án đúng:** C

**Giải thích:** Gom cụm (Clustering) thuộc nhóm Học không giám sát (Unsupervised Learning), tức là dữ liệu hoàn toàn chưa có nhãn từ trước. Mục tiêu của thuật toán là tự động phân tích cấu trúc nội tại của dữ liệu để nhóm chúng sao cho các phần tử trong cùng một nhóm có độ tương đồng tối đa (high intra-cluster similarity) và các nhóm khác nhau có độ tương đồng tối thiểu (low inter-cluster similarity).

**Câu 57:**

Phép toán "Euclidean distance" (Khoảng cách Euclid) thường được các thuật toán gom cụm sử dụng để đo lường điều gì giữa các thực thể dữ liệu?

- A. Đo lường tốc độ xử lý của máy tính khi tính toán cụm.
- B. Đo lường độ tương tự - hoặc khoảng cách - giữa các đối tượng dữ liệu.
- C. Đo lường dung lượng bộ nhớ mà đối tượng đó chiếm dụng trên ổ đĩa.
- D. Đo lường mức độ bảo mật thông tin của dữ liệu đó.
- E. Đo lường thời gian mà dữ liệu được nạp vào hệ thống.

**Đáp án đúng:** B

**Giải thích:** Trong không gian hình học dữ liệu, khoảng cách tỷ lệ nghịch với độ tương đồng. Khoảng cách giữa hai điểm dữ liệu tính bằng Euclid càng nhỏ nghĩa là các đặc trưng của chúng càng giống nhau (độ tương tự cao), và ngược lại, khoảng cách càng xa thì chúng càng khác nhau.

**Câu 58:**

Nếu khoảng cách hình học giữa đối tượng dữ liệu X và trung tâm (centroid) của cụm 1 là 5, và khoảng cách từ X đến trung tâm của cụm 2 là 10. Theo nguyên lý vận hành của thuật toán K-means, đối tượng X sẽ được gán vào cụm nào?

- A. Cụm 1
- B. Cụm 2
- C. Chia đều cho cả cụm 1 và cụm 2
- D. Tạo thành một cụm mới độc lập (cụm 3)
- E. Bị loại bỏ khỏi tập dữ liệu vì nằm quá xa trung tâm

**Đáp án đúng:** A

**Giải thích:** Quy tắc cốt lõi của bước gán nhãn trong thuật toán K-means là một điểm dữ liệu luôn luôn được xếp vào cụm có khoảng cách từ điểm đó đến trọng tâm (centroid) của cụm là ngắn nhất. Vì $5 < 10$, đối tượng X gần trung tâm cụm 1 hơn nên sẽ thuộc về cụm 1.

**Câu 59:**

Thuật toán gom cụm phân tán K-means được xếp vào phân loại học tập nào trong cấu trúc của ngành Học máy (Machine Learning)?

- A. Học tập có giám sát (Supervised learning).
- B. Học không giám sát (Unsupervised learning).
- C. Học bán giám sát (Semi-supervised learning).
- D. Học tăng cường (Reinforcement learning).
- E. Học sâu (Deep learning).

**Đáp án đúng:** B

**Giải thích:** K-means không cần dữ liệu mồi hay các tập dữ liệu mẫu đã được con người dán nhãn (label) hay phân lớp sẵn từ trước. Hệ thống hoàn toàn tự dò tìm cấu trúc, đặc trưng và mối liên hệ tự nhiên giữa các điểm dữ liệu để gom nhóm chúng, do đó nó thuộc phân hệ Học không giám sát (Unsupervised learning).

**Câu 60:**

Trong một siêu thị có tổng cộng 100 giao dịch (hóa đơn) mua sắm. Qua thống kê thấy mặt hàng "Bánh mì" xuất hiện trong 40 giao dịch. Chỉ số Độ hỗ trợ (Support) của mặt hàng "Bánh mì" trong bài toán Khai phá luật kết hợp là bao nhiêu?

- A. 40
- B. 0.04
- C. 0.4
- D. 2.5
- E. 100

**Đáp án đúng:** C

**Giải thích:** Độ hỗ trợ (Support) của một tập mục từ (itemset) là tỷ lệ phần trăm số giao dịch có chứa tập mục từ đó trên tổng số giao dịch của toàn bộ cơ sở dữ liệu. Công thức tính là:

$$Support(\text{Bánh mì}) = \frac{\text{Số giao dịch chứa Bánh mì}}{\text{Tổng số giao dịch}} = \frac{40}{100} = 0.4 \text{ (hoặc } 40\%)$$

================================

Dưới đây là **10 câu tiếp theo** (từ câu 61 đến câu 70) được định dạng đầy đủ, chuẩn hóa bao gồm: Câu hỏi, các lựa chọn (A, B, C, D, E), đáp án chính xác và phần giải thích chi tiết từ bài giảng trong video.

**Câu 61:**

Xét luật kết hợp trong khai phá dữ liệu có dạng: $\{A\} \rightarrow \{B\}$. Nếu hệ thống ghi nhận có 50 giao dịch chứa đồng thời cả hai mặt hàng A và B, và có tổng cộng 80 giao dịch chứa mặt hàng A. Hãy tính Độ tin cậy (Confidence) của luật kết hợp này.

- A. 80/50
- B. 50/(80 + 50)
- C. 50/80
- D. 30/50
- E. 50/100

**Đáp án đúng:** C

**Giải thích:** Độ tin cậy (Confidence) của luật $\{A\} \rightarrow \{B\}$ đo lường xác suất mặt hàng B được mua khi biết rằng mặt hàng A đã có trong giỏ hàng. Công thức tính là tỷ lệ giữa số giao dịch chứa cả A và B trên tổng số giao dịch chứa A:

$$Confidence(\{A\} \rightarrow \{B\}) = \frac{Support(A \cup B)}{Support(A)} = \frac{50}{80}$$

**Câu 62:**

Chỉ số Lift trong khai phá luật kết hợp dùng để đo lường mức độ độc lập xác suất xảy ra của B khi A xảy ra, so với trường hợp A và B độc lập với nhau. Nếu kết quả tính toán cho thấy chỉ số $Lift(\{A\} \rightarrow \{B\}) = 1$, điều này có ý nghĩa gì?

- A. Mặt hàng A và mặt hàng B luôn luôn được mua cùng nhau trong mọi hóa đơn.
- B. Khách hàng mua mặt hàng A chắc chắn sẽ không bao giờ mua mặt hàng B.
- C. Việc mua A và mua B là hoàn toàn độc lập với nhau – không có mối quan hệ đặc biệt nào.
- D. Mặt hàng A có giá trị doanh thu cao bằng hệ số của mặt hàng B.
- E. Luật kết hợp này có độ tin cậy đạt mức tối đa là 100%.

**Đáp án đúng:** C

**Giải thích:** Chỉ số Lift đo lường sự phụ thuộc lẫn nhau giữa 2 vế của luật.

- Nếu $Lift > 1$: Hai mặt hàng có sự xuất hiện cùng nhau mang tính tích cực (mua A kéo theo tăng khả năng mua B).
- Nếu $Lift = 1$: Xác suất xuất hiện của A và B hoàn toàn độc lập về mặt thống kê. Việc khách hàng mua mặt hàng A không hề làm tăng hay giảm tỷ lệ mua mặt hàng B của họ.

**Câu 63:**

Theo mô hình ra quyết định kinh điển của Herbert A. Simon (1977), một quy trình xử lý giải quyết vấn đề chuẩn chỉnh bao gồm các giai đoạn chính nào sau đây theo đúng thứ tự tuyến tính?

- A. Intelligence, Design, Choice, Implementation
- B. Input, Process, Output, Feedback
- C. Plan, Do, Check, Act
- D. Identification, Analysis, Selection, Evolution
- E. Intelligence, Choice, Design, Evaluation

**Đáp án đúng:** A

**Giải thích:** Mô hình 4 giai đoạn của Simon mô tả chu trình tư duy của con người khi đối mặt với một vấn đề: (1) **Intelligence** (Tìm hiểu/Nhận diện vấn đề), (2) **Design** (Thiết kế/Xây dựng các giải pháp khả thi), (3) **Choice** (Lựa chọn phương án tối ưu), và (4) **Implementation** (Triển khai thực hiện phương án vào thực tế).

**Câu 64:**

Trong giai đoạn đầu tiên - Giai đoạn "Intelligence" (Tìm hiểu/Nhận diện vấn đề) của quá trình ra quyết định theo Simon, hoạt động trọng tâm của nhà quản lý là gì?

- A. Tiến hành bỏ phiếu để lựa chọn ra phương án hành động cuối cùng.
- B. Quét môi trường bên trong và bên ngoài để xác định các vấn đề, triệu chứng bất thường hoặc cơ hội tiềm ẩn.
- C. Viết các đoạn mã lập trình nhằm xây dựng mô hình giả lập.
- D. Đo lường hiệu quả kinh tế sau khi dự án đã được nghiệm thu.
- E. Ký kết các hợp đồng kinh tế với các đối tác chiến lược.

**Đáp án đúng:** B

**Giải thích:** Giai đoạn "Intelligence" bắt đầu bằng việc thu thập, phân tích thông tin từ môi trường (quét dữ liệu doanh nghiệp, thị trường) nhằm phát hiện xem có vấn đề gì đang xảy ra (ví dụ: doanh số sụt giảm) hoặc có cơ hội mới nào xuất hiện (ví dụ: thị trường ngách mới) để làm tiền đề cho việc ra quyết định.

**Câu 65:**

Giai đoạn thứ hai - Giai đoạn "Design" (Thiết kế) trong mô hình ra quyết định của Simon được hiểu là quá trình thực hiện công việc gì?

- A. Thiết kế giao diện đồ họa cho phần mềm báo cáo của doanh nghiệp.
- B. Vẽ sơ đồ tổ chức phòng ban và tuyển dụng nhân sự mới.
- C. Tìm kiếm, phát triển và phân tích các phương án hành động khả thi để giải quyết vấn đề.
- D. Lên cấu trúc mặt bằng vật lý cho việc xây dựng nhà kho mới.
- E. Chuyển giao các tài liệu kỹ thuật cho đội ngũ kỹ sư phân xưởng.

**Đáp án đúng:** C

**Giải thích:** Ở giai đoạn "Design", sau khi đã xác định rõ bài toán ở bước trước, người ra quyết định sẽ tập trung vào việc tư duy sáng tạo hoặc sử dụng các mô hình toán học để xây dựng lên danh sách các giải pháp khả thi, đồng thời phân tích, đánh giá sơ bộ ưu - nhược điểm của từng giải pháp đó.

**Câu 66:**

Trong giai đoạn thứ ba - Giai đoạn "Choice" (Lựa chọn), đâu là hành động then chốt mang tính quyết định của một nhà quản trị?

- A. Tiếp tục đi thu thập thêm dữ liệu thô từ các hệ thống nguồn bên ngoài.
- B. Xây dựng thêm các phương án dự phòng khác ngoài danh sách cũ.
- C. Cam kết thực hiện một kế hoạch hành động cụ thể sau khi đã đánh giá, so sánh các phương án.
- D. Ủy quyền toàn bộ việc ra quyết định cho các nhân viên cấp dưới xử lý.
- E. Hủy bỏ bài toán phân tích để chuyển sang một dự án kinh doanh mới.

**Đáp án đúng:** C

**Giải thích:** Giai đoạn "Choice" là thời điểm người ra quyết định phải đưa ra một lựa chọn dứt khoát: So sánh các phương án đã thiết kế dựa trên các tiêu chí (chi phí, rủi ro, lợi nhuận) để chọn ra giải pháp tối ưu nhất và cam kết đổ nguồn lực thực hiện giải pháp đó.

**Câu 67:**

Trong một số tài liệu mở rộng của quy trình ra quyết định dựa trên nền tảng của Simon, các giai đoạn chính đầy đủ của chu trình tiến hóa này bao gồm:

- A. Input, Coding, Testing, Debugging, Deployment
- B. Identification, Formatting, Integration, Storage, Mining
- C. Intelligence, Design, Choice, Implementation, Evaluation
- D. Strategic, Tactical, Operational, Clerical, Technical
- E. Collecting, Clearing, Transforming, Loading, Updating

**Đáp án đúng:** C

**Giải thích:** Mô hình mở rộng bổ sung thêm bước **Evaluation** (Đánh giá) vào sau bước Implementation. Bước này cực kỳ quan trọng vì nó giúp nhà quản trị nhìn nhận lại kết quả thực tế sau khi triển khai xem có đạt kỳ vọng không, từ đó rút kinh nghiệm hoặc tạo vòng lặp phản hồi (feedback loop) cải tiến hệ thống.

**Câu 68:**

Điểm khác biệt cốt lõi giữa cách tiếp cận xem toàn bộ quá trình là "giải quyết vấn đề" (problem-solving) so với "ra quyết định" (decision-making) đơn thuần là gì?

- A. Giải quyết vấn đề chỉ áp dụng cho máy tính, còn ra quyết định áp dụng cho con người.
- B. Ra quyết định chỉ bao gồm giai đoạn Lựa chọn (Choice), trong khi Giải quyết vấn đề là một quy trình rộng hơn, bao gồm tất cả các giai đoạn bao gồm cả Thực hiện (Implementation).
- C. Ra quyết định đòi hỏi chi phí đắt đỏ hơn rất nhiều so với giải quyết vấn đề.
- D. Giải quyết vấn đề không bao giờ cần sử dụng đến dữ liệu lịch sử trong kho dữ liệu.
- E. Cả hai khái niệm hoàn toàn trái ngược nhau và không có điểm chung nào.

**Đáp án đúng:** B

**Giải thích:** Nhiều người thường nhầm lẫn hai thuật ngữ này. Về mặt học thuật, "ra quyết định" (Decision-making) tập trung mạnh vào thời điểm chọn lựa phương án hành động (giai đoạn Choice). Trong khi đó, "giải quyết vấn đề" (Problem-solving) mang nghĩa rộng hơn, bao quát toàn chu trình từ lúc tìm nguyên nhân cho đến khi thực thi và đánh giá kết quả cuối cùng.

**Câu 69:**

Trong kiến trúc vận hành của quá trình ra quyết định, tại sao hệ thống cần phải thiết lập các vòng lặp phản hồi (Feedback loops) giữa các giai đoạn?

- A. Nhằm mục đích làm chậm tiến độ ra quyết định để tránh các rủi ro pháp lý.
- B. Để cho phép người ra quyết định quay lại các giai đoạn trước nếu phương án hiện tại không khả thi hoặc vấn đề cần được định nghĩa lại.
- C. Để hệ thống tự động xóa bỏ các dữ liệu trùng lặp trong cơ sở dữ liệu.
- D. Bắt buộc nhà quản lý phải thực hiện lại quy trình từ đầu sau mỗi 24 tiếng.
- E. Nhằm gửi thông báo nhắc nhở cho các nhân viên nhập liệu qua ứng dụng di động.

**Đáp án đúng:** B

**Giải thích:** Quá trình tư duy ra quyết định không phải là một đường thẳng tuyệt đối. Trong thực tế, khi đang ở giai đoạn Lựa chọn hoặc Triển khai, nhà quản lý có thể phát hiện ra phương án bị lỗi hoặc môi trường thay đổi đột ngột. Vòng lặp phản hồi cho phép họ linh hoạt quay ngược lại bước Thiết kế hoặc Tìm hiểu để điều chỉnh kịp thời thông tin.

**Câu 70:**

Việc ứng dụng các công cụ công nghệ hiện đại như phân tích đa chiều OLAP, Khai phá dữ liệu (Data Mining) và Kho dữ liệu (DW) mang lại sự hỗ trợ mạnh mẽ nhất cho giai đoạn nào trong mô hình ra quyết định của Simon?

- A. Chỉ hỗ trợ duy nhất cho giai đoạn ký kết văn bản (Implementation).
- B. Không hỗ trợ được giai đoạn nào vì máy tính không có tư duy như con người.
- C. Hỗ trợ mạnh mẽ cho cả giai đoạn Intelligence (Nhận diện vấn đề) và Design (Thiết kế phương án).
- D. Chỉ dùng để tự động đưa ra quyết định ở giai đoạn Choice thay cho giám đốc.
- E. Chỉ hỗ trợ giai đoạn tính toán bảng lương cho nhân viên vận hành.

**Đáp án đúng:** C

**Giải thích:** Các công nghệ dữ liệu lớn giúp nhà quản lý xử lý thông tin thông minh: DW và Data Mining giúp tìm ra các xu hướng ẩn, các bất thường trong kinh doanh (phục vụ giai đoạn **Intelligence**). Sau đó, các mô hình giả lập, phân tích "What-if" trên OLAP giúp họ tính toán nhanh các kịch bản của từng phương án (phục vụ giai đoạn **Design**).

=======================

Dưới đây là **18 câu cuối cùng** (từ câu 71 đến câu 88) để hoàn thành trọn vẹn toàn bộ danh sách câu hỏi trong video của bạn, được định dạng đầy đủ và chuẩn hóa:

**Câu 71:**

Theo định nghĩa kinh điển của Gorry và Scott Morton, hệ hỗ trợ ra quyết định (DSS) được xem là các hệ thống máy tính có tính tương tác, hỗ trợ người ra quyết định khai thác dữ liệu và mô hình nhằm giải quyết loại vấn đề nào?

- A. Các vấn đề cấu trúc hoàn toàn (structured).
- B. Các vấn đề hành chính lặp đi lặp lại hàng ngày.
- C. Các vấn đề phi cấu trúc hoặc bán cấu trúc (unstructured / semistructured).
- D. Các vấn đề chỉ liên quan đến việc tính toán bảng lương.
- E. Các bài toán lập trình hệ điều hành.

**Đáp án đúng:** C

**Giải thích:** Bản chất cốt lõi của DSS là hỗ trợ con người giải quyết các bài toán khó, không có quy trình xử lý định sẵn một cách tuyệt đối (bán cấu trúc hoặc phi cấu trúc). Đối với các bài toán đã có cấu trúc rõ ràng, người ta sẽ dùng các hệ thống tự động hóa (TPS) để máy tính tự giải quyết thay vì cần đến DSS.

**Câu 72:**

Đặc điểm nào giúp phân biệt rõ ràng nhất giữa hệ hỗ trợ ra quyết định (DSS) và các hệ thống xử lý dữ liệu hay báo cáo truyền thống?

- A. DSS chạy nhanh hơn và tốn ít bộ nhớ hơn.
- B. DSS tập trung vào tính hiệu quả (Effectiveness) nhằm cải thiện chất lượng của các quyết định.
- C. DSS chỉ cho phép những người biết lập trình sử dụng.
- D. DSS không bao giờ cần kết nối với cơ sở dữ liệu.
- E. DSS tự động đưa ra hành động mà không cần con người phê duyệt.

**Đáp án đúng:** B

**Giải thích:** Các hệ thống thông tin truyền thống tập trung vào tính hiệu năng (Efficiency) – tức là làm thế nào để xử lý dữ liệu nhanh nhất, tốn ít chi phí nhất. Trong khi đó, DSS hướng tới tính hiệu quả (Effectiveness) – tức là làm sao giúp nhà quản lý nhìn nhận vấn đề sáng suốt hơn để đưa ra quyết định chính xác và chất lượng hơn.

**Câu 73:**

Thành phần nào sau đây là một phần hệ tùy chọn (optional) trong kiến trúc cơ bản của một DSS nhưng giúp hệ thống trở nên thông minh và có khả năng suy diễn tốt hơn?

- A. Phần hệ quản lý dữ liệu (Data management subsystem).
- B. Giao diện người dùng (User interface).
- C. Phần hệ quản lý mô hình (Model management subsystem).
- D. Phần hệ quản lý tri thức (Knowledge-based management subsystem).
- E. Phần hệ quản lý phần cứng (Hardware management subsystem).

**Đáp án đúng:** D

**Giải thích:** Ba thành phần bắt buộc của một DSS là Dữ liệu, Mô hình và Giao diện. Tuy nhiên, các hệ DSS hiện đại (Intelligent DSS) thường tích hợp thêm phần hệ quản lý tri thức (chứa các luật của chuyên gia, AI) để cung cấp khả năng tư vấn, giải thích và suy diễn thông minh cho người dùng.

**Câu 74:**

Một đặc điểm cốt lõi của DSS liên quan đến vai trò kiểm soát của con người trong quá trình vận hành là gì?

- A. Máy tính sẽ kiểm soát 100% và con người chỉ nhận kết quả.
- B. Hệ thống sẽ tự động tắt nếu con người không tương tác sau 5 phút.
- C. Người ra quyết định có quyền kiểm soát hoàn toàn đối với mọi bước của quy trình giải quyết vấn đề.
- D. Quyền kiểm soát thuộc về lập trình viên xây dựng hệ thống.
- E. Hệ thống hoạt động độc lập và không cho phép con người thay đổi tham số.

**Đáp án đúng:** C

**Giải thích:** DSS được thiết kế với triết lý làm "trợ lý" hỗ trợ chứ không phải để "thay thế" con người. Do đó, người ra quyết định luôn giữ quyền kiểm soát tối cao, họ có thể linh hoạt thay đổi các giả định, lựa chọn mô hình và đưa ra phán đoán dựa trên trực giác của mình.

**Câu 75:**

Theo mô hình của Herbert A. Simon, DSS có khả năng hỗ trợ quy trình ra quyết định ở những giai đoạn nào?

- A. Chỉ hỗ trợ duy nhất giai đoạn tìm dữ liệu thô (Intelligence).
- B. Chỉ hỗ trợ giai đoạn chọn phương án cuối cùng (Choice).
- C. Chỉ hỗ trợ giai đoạn lập trình và chạy thử (Implementation).
- D. Chỉ hỗ trợ hai giai đoạn đầu là Intelligence và Design.
- E. Tất cả các giai đoạn: Tìm hiểu, Thiết kế, Lựa chọn và Thực hiện.

**Đáp án đúng:** E

**Giải thích:** Một hệ DSS toàn diện cung cấp các công cụ trải dài toàn bộ chu trình ra quyết định: từ việc thu thập dữ liệu (Intelligence), xây dựng kịch bản giả lập (Design), đánh giá so sánh các phương án (Choice) cho đến việc theo dõi tiến độ triển khai (Implementation).

**Câu 76:**

Đối tượng người dùng nào trong tổ chức mà hệ thống DSS hướng đến để cung cấp sự hỗ trợ?

- A. Chỉ dành riêng cho các nhân viên bảo vệ và lễ tân.
- B. Chỉ dành cho các lập trình viên của phòng IT.
- C. Tất cả các cấp quản lý, từ quản lý cấp cơ sở đến các giám đốc điều hành cấp cao.
- D. Chỉ dành cho khách hàng vãng lai bên ngoài doanh nghiệp.
- E. Chỉ phục vụ cho các cơ quan kiểm toán của chính phủ.

**Đáp án đúng:** C

**Giải thích:** DSS được thiết kế linh hoạt với nhiều góc nhìn dữ liệu và mô hình phân tích khác nhau để phục vụ cho mọi đối tượng có thẩm quyền ra quyết định trong doanh nghiệp, từ các tổ trưởng sản xuất (quản lý tác nghiệp) cho đến các tổng giám đốc (quản lý chiến lược).

**Câu 77:**

Đặc tính "thích nghi và linh hoạt" (adaptivity and flexibility) của DSS được hiểu là gì?

- A. Hệ thống có thể tự động thay đổi màu sắc giao diện theo thời tiết.
- B. Hệ thống có thể chạy được trên tất cả các loại máy tính cũ từ thập niên 90.
- C. Người dùng có thể thay đổi, thêm, xóa hoặc sắp xếp lại các thành phần cơ bản để đáp ứng sự thay đổi của môi trường kinh doanh.
- D. Hệ thống tự động giảm dung lượng lưu trữ khi ổ đĩa bị đầy.
- E. Có thể dịch tự động sang 100 ngôn ngữ khác nhau mà không bị lỗi font.

**Đáp án đúng:** C

**Giải thích:** Môi trường kinh doanh luôn biến động liên tục, các bài toán hôm nay có thể ngày mai đã thay đổi. Vì vậy, một hệ DSS tốt phải có tính thích nghi cao, cho phép người dùng dễ dàng cấu hình lại các tham số, thêm thắt các mô hình toán học mới mà không cần phải đập đi xây lại toàn bộ hệ thống phần mềm.

**Câu 78:**

Theo định nghĩa của William H. Inmon, quy trình xử lý trong môi trường DSS thường bao gồm đặc điểm nào sau đây?

- A. Chỉ xử lý các giao dịch đơn lẻ và lặp đi lặp lại một cách máy móc.
- B. Phân tích nhiều đơn vị dữ liệu theo phương thức tìm kiếm giải pháp (heuristic).
- C. Bắt buộc dữ liệu đầu vào phải được định dạng dưới dạng tệp tin phẳng.
- D. Hệ thống chỉ hoạt động vào ban đêm khi các văn phòng đã đóng cửa.
- E. Quá trình xử lý hoàn toàn không sử dụng đến các phép toán cộng trừ.

**Đáp án đúng:** B

**Giải thích:** Xử lý DSS mang tính chất khám phá (heuristic). Người dùng không đi theo một thuật toán tuần tự cố định như lập trình truyền thống mà sẽ đưa ra các câu hỏi, nhận kết quả, rồi dựa trên kết quả đó để tiếp tục đào sâu hoặc rẽ hướng phân tích nhằm tìm ra giải pháp tối ưu cho bài toán.

**Câu 79:**

Theo phân loại của Steven Alter (1980), các loại DSS được chia thành 7 danh mục cụ thể dựa trên tiêu chí cốt lõi nào sau đây?

- A. Dựa trên giá thành mua bản quyền phần mềm đắt hay rẻ.
- B. Dựa trên số lượng dòng code mà lập trình viên đã viết.
- C. Mức độ mà đầu ra của hệ thống hỗ trợ trực tiếp hoặc xác định quyết định (từ hướng dữ liệu đến hướng mô hình).
- D. Dựa trên tổng số lượng nhân viên sử dụng hệ thống hàng ngày.
- E. Dựa trên việc hệ thống chạy trên máy chủ đám mây hay máy chủ vật lý.

**Đáp án đúng:** C

**Giải thích:** Alter phân loại DSS dọc theo một trục liên tục: từ các hệ thống đơn giản chỉ hỗ trợ truy xuất dữ liệu thô (Data-oriented), báo cáo tĩnh, cho đến các hệ thống phức tạp có khả năng chạy các mô hình toán học nặng để trực tiếp đưa ra các đề xuất phương án hành động tối ưu cho người dùng (Model-oriented).

**Câu 80:**

Trong khung phân loại các hệ thống của Holsapple và Whinston (1996), loại DSS nào chuyên hỗ trợ người ra quyết định bằng cách quản lý và khai thác các thông tin được lưu trữ dưới dạng tài liệu điện tử, văn bản thô hoặc hình ảnh?

- A. Solver-oriented DSS (DSS hướng bộ giải).
- B. Rule-oriented DSS (DSS hướng luật).
- C. Text-oriented DSS (DSS hướng văn bản).
- D. Database-oriented DSS (DSS hướng cơ sở dữ liệu).
- E. Compound DSS (DSS hỗn hợp).

**Đáp án đúng:** C

**Giải thích:** Text-oriented DSS tập trung vào việc quản lý, tìm kiếm và phân tích các nguồn tri thức không cấu trúc dạng văn bản (như tài liệu pháp lý, điều khoản hợp đồng, biên bản họp) để cung cấp thông tin nền tảng cho nhà quản lý đưa ra quyết định.

**Câu 81:**

Loại hệ hỗ trợ ra quyết định nào được thiết kế và triển khai nhằm xử lý các vấn đề mang tính định kỳ, lặp lại và có tính chất quy chuẩn chung của toàn bộ tập đoàn?

- A. Ad-hoc DSS (DSS đột xuất).
- B. Institutional DSS (DSS tổ chức).
- C. Personal DSS (DSS cá nhân).
- D. Desktop DSS (DSS máy tính bàn).
- E. Private DSS (DSS riêng tư).

**Đáp án đúng:** B

**Giải thích:** Institutional DSS (DSS tổ chức) là hệ thống quy mô lớn, được duy trì lâu dài để xử lý các bài toán định kỳ của doanh nghiệp (ví dụ: lập ngân sách hàng năm, phân tích báo cáo tài chính hàng quý). Ngược lại với nó là Ad-hoc DSS, chỉ được dựng lên nhanh chóng để giải quyết một bài toán phát sinh một lần duy nhất.

**Câu 82:**

Theo Sprague (1980), trong cấu trúc phân cấp công nghệ gồm 3 cấp độ, khái niệm "Specific DSS" được định nghĩa là gì?

- A. Một ngôn ngữ lập trình thế hệ mới chuyên dùng để viết thuật toán.
- B. Hệ điều hành máy tính được tối ưu hóa cho các tác vụ đồ họa.
- C. Một ứng dụng DSS thực tế (kết hợp cả phần cứng và phần mềm) được xây dựng để hỗ trợ giải quyết một bài toán cụ thể trong thế giới thực.
- D. Một bộ các công cụ phát triển phần mềm (SDK) do bên thứ ba cung cấp.
- E. Giao diện đăng nhập tài khoản của người dùng cuối.

**Đáp án đúng:** C

**Giải thích:** Khung lý thuyết của Sprague chia công nghệ DSS thành 3 tầng: (1) **Specific DSS** (Ứng dụng cụ thể chạy được ngay trong thực tế), (2) **DSS Generators** (Bộ công cụ/Hạ tầng dùng để xây dựng ra nhiều Specific DSS khác nhau), và (3) **DSS Tools** (Các công cụ nhỏ lẻ cấu thành như phần mềm vẽ biểu đồ, thư viện toán học).

**Câu 83:**

Hệ thống thông tin hỗ trợ các nhóm làm việc cộng tác làm việc cùng nhau, không bị giới hạn bởi khoảng cách thời gian và địa điểm, thường thông qua các môi trường Web, được gọi là gì?

- A. Personal DSS (DSS cá nhân).
- B. Group Support Systems (GSS - Hệ hỗ trợ nhóm làm việc).
- C. Transaction Processing Systems (TPS).
- D. Expert Systems (Hệ chuyên gia).
- E. Automated Clearing House (ACH).

**Đáp án đúng:** B

**Giải thích:** GSS (hoặc GDSS) là phân nhánh của DSS tập trung vào việc cải thiện quy trình làm việc nhóm. Nó cung cấp các công cụ như bỏ phiếu điện tử, động não (brainstorming) ẩn danh, chia sẻ tài liệu trực tuyến để giúp một hội đồng hoặc một ban giám đốc cùng nhau thảo luận và thống nhất quyết định một cách khoa học.

**Câu 84:**

"Active DSS" (DSS chủ động) khác biệt với các hệ DSS truyền thống (Passive DSS) ở điểm cốt lõi nào?

- A. Nó tiêu tốn nhiều điện năng hơn khi vận hành.
- B. Nó chỉ hoạt động khi người dùng di chuyển chuột liên tục.
- C. Nó có thể đóng vai trò như một trợ lý thông minh, chủ động đưa ra các đề xuất giải pháp hoặc cảnh báo vấn đề mà không cần người dùng ra lệnh trước.
- D. Nó không cần có giao diện đồ họa hiển thị trên màn hình.
- E. Nó tự động xóa bỏ dữ liệu cũ mà không cần xin phép quản trị viên.

**Đáp án đúng:** C

**Giải thích:** Passive DSS chỉ ngồi yên và phản hồi khi người dùng nhập câu lệnh truy vấn (chế độ phản ứng). Trong khi đó, Active DSS liên tục chạy ngầm, tự động phân tích dữ liệu và khi phát hiện dấu hiệu bất thường (hoặc cơ hội tốt), nó sẽ chủ động gửi đề xuất, gợi ý giải pháp lên màn hình cho nhà quản lý.

**Câu 85:**

Phân loại DSS dựa trên khung lý thuyết kiến trúc của Holsapple và Whinston (1996) bao gồm bao nhiêu loại chính?

- A. 3 loại
- B. 4 loại
- C. 5 loại
- D. 6 loại
- E. 7 loại

**Đáp án đúng:** D

**Giải thích:** Khung phân loại này chia DSS thành 6 loại dựa trên bản chất của thực thể tri thức mà hệ thống tập trung quản lý và xử lý, bao gồm: Text-oriented (văn bản), Database-oriented (cơ sở dữ liệu), Spreadsheet-oriented (bảng tính), Solver-oriented (bộ giải toán), Rule-oriented (luật suy diễn), và Compound DSS (hỗn hợp).

**Câu 86:**

Hệ thống thông tin nào chuyên cung cấp quyền truy cập nhanh chóng vào các chỉ số dữ liệu quan trọng trên toàn doanh nghiệp (KPIs) nhằm hỗ trợ riêng cho các nhà quản lý cấp cao nhất (CEO, CFO, Chủ tịch)?

- A. Transaction Processing Systems (TPS).
- B. Executive Information Systems (EIS - Hệ thống thông tin điều hành).
- C. Knowledge Work Systems (KWS).
- D. Supply Chain Management (SCM).
- E. Customer Relationship Management (CRM).

**Đáp án đúng:** B

**Giải thích:** EIS (hoặc ESS) là một dạng DSS đặc biệt được may đo riêng cho các lãnh đạo cấp cao. Giao diện của EIS thường rất tối giản, trực quan dưới dạng các bảng điều khiển (Dashboards) với các biểu đồ đồ họa sắc nét, cho phép họ nhìn thấy ngay sức khỏe của doanh nghiệp mà không cần sa đà vào các bảng số liệu chi tiết phức tạp.

**Câu 87:**

Cấp độ công nghệ DSS nào cung cấp một nền tảng, một bộ công cụ tích hợp (ví dụ như phần mềm gộp dữ liệu, thiết kế mô hình tài chính) nhằm giúp các kỹ sư phần mềm phát triển các ứng dụng DSS cụ thể một cách nhanh chóng và thuận tiện nhất?

- A. Specific DSS.
- B. DSS Integrated Tools - Generators (Bộ sinh DSS).
- C. Database Management Systems.
- D. Operating Systems (Hệ điều hành).
- E. Compiler Theory Software.

**Đáp án đúng:** B

**Giải thích:** Theo Sprague, "DSS Generators" đóng vai trò như một bộ khung, một nhà máy lắp ráp (ví dụ như phần mềm Microsoft Excel hay các nền tảng Low-code hiện đại). Từ bộ khung Generator này, các nhà phát triển có thể cấu hình nhanh để tạo ra rất nhiều ứng dụng phân tích cụ thể (Specific DSS) cho các phòng ban khác nhau mà không phải viết lại code từ con số 0.

**Câu 88:**

Khái niệm "Personal DSS" được hiểu là loại hệ thống có đặc điểm như thế nào về quy mô và đối tượng phục vụ?

- A. Hệ thống thuộc sở hữu cá nhân của lập trình viên viết ra nó.
- B. Hệ thống được phát triển chủ yếu để hỗ trợ cá nhân một người ra quyết định duy nhất xử lý bài toán riêng của họ.
- C. Hệ thống chỉ chạy được trên các máy tính xách tay cá nhân và không thể kết nối mạng mạng.
- D. Hệ thống chuyên dùng để lưu trữ thông tin gia đình của nhân viên công ty.
- E. Phần mềm quản lý lịch làm việc và nhắc hẹn cá nhân.

**Đáp án đúng:** C

**Giải thích:** Personal DSS là các ứng dụng quy mô nhỏ, mang tính cục bộ. Nó được xây dựng hoặc cấu hình riêng để phục vụ cho tư duy và cách làm việc của một nhà quản lý cụ thể (ví dụ: một file Excel phân tích rủi ro đầu tư được một giám đốc tài chính tự thiết kế riêng cho mình). Nó có tính linh hoạt cá nhân cao nhưng không mang tính chuẩn hóa quy trình như Institutional DSS.
