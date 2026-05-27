import { AlertTriangle, FileWarning } from "lucide-react";
import type { DataHealth } from "../lib/dataHealth";

export function DataIssuePanel({ data }: { data: DataHealth }) {
  if (data.isReady) {
    return null;
  }

  return (
    <section className="issue-panel" aria-labelledby="data-issue-title">
      <div className="issue-icon" aria-hidden="true">
        <AlertTriangle size={24} />
      </div>
      <div>
        <p className="eyebrow">Dữ liệu chưa sẵn sàng</p>
        <h1 id="data-issue-title">Chưa thể tạo đề trắc nghiệm từ file hiện tại.</h1>
        <p>
          App đang chặn phần phụ thuộc dữ liệu vì `questions.json` chưa có bộ câu hỏi hợp lệ. Chạy{" "}
          <code>npm run validate:data</code> để xem báo cáo chi tiết trong <code>spec/parse-report.md</code>.
        </p>
        {data.errors.length > 0 ? (
          <ul className="issue-list" aria-label="Lỗi dữ liệu runtime">
            {data.errors.slice(0, 5).map((error) => (
              <li key={`${error.code}-${error.questionId ?? ""}`}>
                <FileWarning size={16} />
                <span>{error.message}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="muted">Hiện chưa có câu hỏi nào trong dữ liệu build.</p>
        )}
      </div>
    </section>
  );
}
