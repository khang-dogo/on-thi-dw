import { useMemo, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight, ListFilter, Search, Star, XCircle } from "lucide-react";
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
import type { OptionKey, Question } from "../types";

type StudyFilter = "all" | "starred" | "wrong" | "unseen";
type StudyAnswerState = Partial<Record<number, OptionKey>>;

const PAGE_SIZE = 10;

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
  const [currentPage, setCurrentPage] = useState(1);
  const [answers, setAnswers] = useState<StudyAnswerState>({});
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

  const totalPages = Math.max(1, Math.ceil(filteredQuestions.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const pageStart = (safePage - 1) * PAGE_SIZE;
  const pagedQuestions = filteredQuestions.slice(pageStart, pageStart + PAGE_SIZE);

  function setFilterAndResetPage(nextFilter: StudyFilter) {
    setFilter(nextFilter);
    setCurrentPage(1);
  }

  function setQueryAndResetPage(value: string) {
    setQuery(value);
    setCurrentPage(1);
  }

  function answerQuestion(questionId: number, key: OptionKey) {
    setAnswers((current) => {
      if (current[questionId]) {
        return current;
      }
      return { ...current, [questionId]: key };
    });
  }

  function resetQuestion(questionId: number) {
    setAnswers((current) => {
      const next = { ...current };
      delete next[questionId];
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
            onChange={(event) => setQueryAndResetPage(event.target.value)}
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
              onClick={() => setFilterAndResetPage(item)}
            >
              {filterLabels[item]}
            </button>
          ))}
        </div>
      </section>

      <section className="result-meta" aria-live="polite">
        <span>{filteredQuestions.length} câu phù hợp</span>
        {filteredQuestions.length > 0 ? (
          <span>
            Đang xem câu {pageStart + 1}-{Math.min(pageStart + PAGE_SIZE, filteredQuestions.length)}
          </span>
        ) : null}
        <span>Trang {safePage}/{totalPages}</span>
        <span>{progress.starredIds.length} câu đã đánh dấu sao</span>
      </section>

      {filteredQuestions.length === 0 ? (
        <section className="empty-state">
          <h2>Không có câu phù hợp.</h2>
          <p>Thử đổi bộ lọc hoặc xóa nội dung tìm kiếm.</p>
        </section>
      ) : (
        <>
          <section className="question-list" aria-label="Danh sách câu hỏi">
            {pagedQuestions.map((question) => (
              <StudyQuestionCard
                key={question.id}
                isStarred={starredIds.has(question.id)}
                mastery={getMasteryLabel(progress, question.id)}
                note={progress.notes[String(question.id)] ?? ""}
                question={question}
                selectedKey={answers[question.id]}
                onAnswer={(key) => answerQuestion(question.id, key)}
                onReset={() => resetQuestion(question.id)}
                toggleStar={() => updateProgress((current) => toggleStar(current, question.id))}
                updateNote={(note) => updateProgress((current) => updateNote(current, question.id, note))}
              />
            ))}
          </section>

          <PaginationControls currentPage={safePage} setPage={setCurrentPage} totalPages={totalPages} />
        </>
      )}
    </div>
  );
}

function StudyQuestionCard({
  question,
  isStarred,
  mastery,
  note,
  selectedKey,
  onAnswer,
  onReset,
  toggleStar,
  updateNote: onUpdateNote,
}: {
  question: Question;
  isStarred: boolean;
  mastery: string;
  note: string;
  selectedKey?: OptionKey;
  onAnswer: (key: OptionKey) => void;
  onReset: () => void;
  toggleStar: () => void;
  updateNote: (note: string) => void;
}) {
  const isAnswered = Boolean(selectedKey);
  const isCorrect = selectedKey === question.answer;

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

      <div className="study-answer-grid" role="group" aria-label={`Lựa chọn câu ${question.id}`}>
        {question.options.map((option) => (
          <button
            key={option.key}
            aria-label={`${option.key} ${option.text}`}
            className={getStudyOptionClass({
              isAnswered,
              isCorrectOption: option.key === question.answer,
              isSelected: selectedKey === option.key,
            })}
            disabled={isAnswered}
            onClick={() => onAnswer(option.key)}
            type="button"
          >
            <span className="option-key">{option.key}</span>
            <span className="markdown">
              <MarkdownContent>{option.text}</MarkdownContent>
            </span>
          </button>
        ))}
      </div>

      {isAnswered ? (
        <div className={`feedback-panel${isCorrect ? " correct" : " wrong"}`} aria-live="polite">
          <div className="feedback-title">
            {isCorrect ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
            <strong>{isCorrect ? "Đúng" : "Chưa đúng"}</strong>
          </div>
          <p>Bạn chọn: {selectedKey}</p>
          <p>
            <strong>Đáp án đúng: {question.answer}</strong>
          </p>
          <div className="markdown explanation">
            <MarkdownContent>{question.explanation}</MarkdownContent>
          </div>
        </div>
      ) : null}

      <div className="card-actions">
        <button className="secondary-button" disabled={!isAnswered} onClick={onReset} type="button">
          Reset câu này
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

function PaginationControls({
  currentPage,
  totalPages,
  setPage,
}: {
  currentPage: number;
  totalPages: number;
  setPage: (page: number) => void;
}) {
  return (
    <nav className="pagination" aria-label="Phân trang câu hỏi ôn tập">
      <button
        className="secondary-button compact"
        disabled={currentPage <= 1}
        onClick={() => setPage(currentPage - 1)}
        type="button"
      >
        <ChevronLeft size={16} />
        Trước
      </button>
      <span>
        Trang {currentPage}/{totalPages}
      </span>
      <button
        className="secondary-button compact"
        disabled={currentPage >= totalPages}
        onClick={() => setPage(currentPage + 1)}
        type="button"
      >
        Sau
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}

function getStudyOptionClass(input: {
  isAnswered: boolean;
  isCorrectOption: boolean;
  isSelected: boolean;
}): string {
  const classes = ["study-answer-option"];
  if (input.isSelected) {
    classes.push("selected");
  }
  if (input.isAnswered && input.isCorrectOption) {
    classes.push("correct");
  }
  if (input.isAnswered && input.isSelected && !input.isCorrectOption) {
    classes.push("wrong");
  }
  return classes.join(" ");
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
