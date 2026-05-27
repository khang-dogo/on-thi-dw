import { useMemo, useState } from "react";
import { ListFilter, Search, Star } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { DataIssuePanel } from "../components/DataIssuePanel";
import { MarkdownContent } from "../components/MarkdownContent";
import type { DataHealth } from "../lib/dataHealth";
import {
  getMasteryLabel,
  getUnseenQuestionIds,
  getWrongQuestionIds,
  toggleStar,
  updateNote,
  type StudyProgress,
} from "../lib/storage";
import type { Question } from "../types";

type StudyFilter = "all" | "starred" | "wrong" | "unseen";

const filterLabels: Record<StudyFilter, string> = {
  all: "Tất cả",
  starred: "Đã đánh dấu",
  wrong: "Từng làm sai",
  unseen: "Chưa làm",
};

export function StudyPage({
  data,
  progress,
  updateProgress,
}: {
  data: DataHealth;
  progress: StudyProgress;
  updateProgress: (updater: (progress: StudyProgress) => StudyProgress) => void;
}) {
  const [searchParams] = useSearchParams();
  const initialFilter = (searchParams.get("filter") as StudyFilter | null) ?? "all";
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<StudyFilter>(filterLabels[initialFilter] ? initialFilter : "all");
  const [hideAnswers, setHideAnswers] = useState(false);
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());
  const wrongIds = useMemo(() => new Set(getWrongQuestionIds(progress)), [progress]);
  const unseenIds = useMemo(
    () => new Set(getUnseenQuestionIds(progress, data.questions.map((question) => question.id))),
    [data.questions, progress],
  );
  const starredIds = useMemo(() => new Set(progress.starredIds), [progress.starredIds]);

  const filteredQuestions = useMemo(() => {
    const normalizedQuery = normalizeSearch(query);
    return data.questions.filter((question) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "starred" && starredIds.has(question.id)) ||
        (filter === "wrong" && wrongIds.has(question.id)) ||
        (filter === "unseen" && unseenIds.has(question.id));
      if (!matchesFilter) {
        return false;
      }
      if (!normalizedQuery) {
        return true;
      }
      return normalizeSearch(searchText(question)).includes(normalizedQuery);
    });
  }, [data.questions, filter, query, starredIds, unseenIds, wrongIds]);

  function toggleExpanded(id: number) {
    setExpandedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div className="page-stack">
      <section className="page-heading">
        <p className="eyebrow">Màn ôn tập</p>
        <h1>Đọc nhanh, tìm lại câu khó, ghi chú lỗi hay nhầm.</h1>
      </section>

      <DataIssuePanel data={data} />

      <section className="toolbar" aria-label="Bộ lọc câu hỏi">
        <label className="search-box">
          <Search size={18} aria-hidden="true" />
          <span className="sr-only">Tìm kiếm câu hỏi</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Tìm trong câu hỏi, đáp án, giải thích..."
          />
        </label>

        <div className="filter-row" role="group" aria-label="Lọc câu hỏi">
          <ListFilter size={18} aria-hidden="true" />
          {(Object.keys(filterLabels) as StudyFilter[]).map((item) => (
            <button
              key={item}
              className={`pill-tab${filter === item ? " active" : ""}`}
              type="button"
              onClick={() => setFilter(item)}
            >
              {filterLabels[item]}
            </button>
          ))}
        </div>

        <label className="switch-row">
          <input checked={hideAnswers} onChange={(event) => setHideAnswers(event.target.checked)} type="checkbox" />
          <span>Ẩn đáp án ở trang ôn tập</span>
        </label>
      </section>

      <section className="result-meta" aria-live="polite">
        <span>{filteredQuestions.length} câu đang hiển thị</span>
        <span>{progress.starredIds.length} câu đã đánh dấu sao</span>
      </section>

      {filteredQuestions.length === 0 ? (
        <section className="empty-state">
          <h2>Không có câu phù hợp.</h2>
          <p>Thử đổi bộ lọc hoặc xóa nội dung tìm kiếm.</p>
        </section>
      ) : (
        <section className="question-list" aria-label="Danh sách câu hỏi">
          {filteredQuestions.map((question) => (
            <StudyQuestionCard
              key={question.id}
              expanded={expandedIds.has(question.id)}
              hideAnswers={hideAnswers}
              isStarred={starredIds.has(question.id)}
              mastery={getMasteryLabel(progress, question.id)}
              note={progress.notes[String(question.id)] ?? ""}
              question={question}
              toggleExpanded={() => toggleExpanded(question.id)}
              toggleStar={() => updateProgress((current) => toggleStar(current, question.id))}
              updateNote={(note) => updateProgress((current) => updateNote(current, question.id, note))}
            />
          ))}
        </section>
      )}
    </div>
  );
}

function StudyQuestionCard({
  question,
  isStarred,
  mastery,
  expanded,
  hideAnswers,
  note,
  toggleExpanded,
  toggleStar,
  updateNote: onUpdateNote,
}: {
  question: Question;
  isStarred: boolean;
  mastery: string;
  expanded: boolean;
  hideAnswers: boolean;
  note: string;
  toggleExpanded: () => void;
  toggleStar: () => void;
  updateNote: (note: string) => void;
}) {
  const showAnswer = !hideAnswers || expanded;

  return (
    <article className="question-card">
      <div className="question-card-header">
        <div>
          <span className="badge yellow">Câu {question.id}</span>
          <span className="badge neutral">{mastery}</span>
        </div>
        <button
          aria-label={isStarred ? `Bỏ đánh dấu câu ${question.id}` : `Đánh dấu sao câu ${question.id}`}
          className={`icon-button${isStarred ? " starred" : ""}`}
          onClick={toggleStar}
          type="button"
        >
          <Star size={18} fill={isStarred ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="markdown question-text">
        <MarkdownContent>{question.question}</MarkdownContent>
      </div>

      <ol className="option-list">
        {question.options.map((option) => (
          <li key={option.key} className={showAnswer && option.key === question.answer ? "correct-option" : ""}>
            <span className="option-key">{option.key}</span>
            <div className="markdown">
              <MarkdownContent>{option.text}</MarkdownContent>
            </div>
          </li>
        ))}
      </ol>

      {showAnswer ? (
        <div className="answer-panel">
          <strong>Đáp án đúng: {question.answer}</strong>
          {expanded ? (
            <div className="markdown explanation">
              <MarkdownContent>{question.explanation}</MarkdownContent>
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="card-actions">
        <button className="secondary-button" onClick={toggleExpanded} type="button">
          {expanded ? "Thu gọn giải thích" : hideAnswers ? "Mở đáp án và giải thích" : "Mở giải thích"}
        </button>
      </div>

      <label className="note-box">
        <span>Ghi chú cá nhân</span>
        <textarea
          onChange={(event) => onUpdateNote(event.target.value)}
          placeholder="Mẹo nhớ, lỗi hay nhầm..."
          rows={2}
          value={note}
        />
      </label>
    </article>
  );
}

function searchText(question: Question): string {
  return [
    question.question,
    question.explanation,
    question.answer,
    ...question.options.map((option) => `${option.key} ${option.text}`),
  ].join("\n");
}

function normalizeSearch(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/đ/giu, "d")
    .toLocaleLowerCase("vi")
    .trim();
}
