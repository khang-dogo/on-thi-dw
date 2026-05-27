import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Pause, Play, RotateCcw, Star, Timer, XCircle } from "lucide-react";
import { DataIssuePanel } from "../components/DataIssuePanel";
import { MarkdownContent } from "../components/MarkdownContent";
import type { DataHealth } from "../lib/dataHealth";
import {
  createQuiz,
  gradeAnswer,
  makeSeed,
  summarizeAnswers,
  type AnswerResult,
  type QuizSession,
  type QuizSummary,
} from "../lib/quiz";
import {
  getWrongQuestionIds,
  recordQuizCompletion,
  toggleStar,
  type StudyProgress,
} from "../lib/storage";
import type { OptionKey } from "../types";

type PoolMode = "all" | "starred" | "wrong";
type QuizMode = "setup" | "running" | "done";

const countOptions = [10, 20, 30, 90];
const optionKeys: OptionKey[] = ["A", "B", "C", "D", "E"];

export function QuizPage({
  data,
  progress,
  updateProgress,
}: {
  data: DataHealth;
  progress: StudyProgress;
  updateProgress: (updater: (progress: StudyProgress) => StudyProgress) => void;
}) {
  const [mode, setMode] = useState<QuizMode>("setup");
  const [poolMode, setPoolMode] = useState<PoolMode>("all");
  const [count, setCount] = useState(10);
  const [session, setSession] = useState<QuizSession | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, AnswerResult>>({});
  const [error, setError] = useState<string | undefined>();
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [paused, setPaused] = useState(false);
  const [summary, setSummary] = useState<QuizSummary | null>(null);

  const poolIds = useMemo(() => getPoolIds(poolMode, data.questions.map((question) => question.id), progress), [
    data.questions,
    poolMode,
    progress,
  ]);
  const poolSize = poolMode === "all" ? data.questions.length : poolIds.length;
  const notEnoughMessage =
    data.isReady && poolSize < count
      ? `Không đủ dữ liệu để tạo đề ${count} câu. Hiện chỉ có ${poolSize} câu phù hợp.`
      : undefined;
  const currentQuestion = session?.questions[currentIndex];
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;
  const isStarred = currentQuestion ? progress.starredIds.includes(currentQuestion.id) : false;

  useEffect(() => {
    if (mode !== "running" || paused) {
      return undefined;
    }
    const timer = window.setInterval(() => setElapsedSeconds((seconds) => seconds + 1), 1000);
    return () => window.clearInterval(timer);
  }, [mode, paused]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (target?.matches("input, textarea, select")) {
        return;
      }
      if (mode !== "running" || !currentQuestion || paused) {
        return;
      }
      const key = event.key.toUpperCase();
      if (key === "S") {
        event.preventDefault();
        updateProgress((current) => toggleStar(current, currentQuestion.id));
        return;
      }
      if (event.key === "Enter" && currentAnswer) {
        event.preventDefault();
        goNext();
        return;
      }
      if (!currentAnswer && optionKeys.includes(key as OptionKey)) {
        const option = currentQuestion.options.find((item) => item.displayKey === key);
        if (option) {
          event.preventDefault();
          chooseAnswer(option.displayKey);
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  function startQuiz(override?: { ids?: number[]; count?: number }) {
    const includeIds = override?.ids ?? (poolMode === "all" ? undefined : poolIds);
    const nextCount = override?.count ?? count;
    setError(undefined);

    try {
      const nextSession = createQuiz({
        questions: data.questions,
        count: nextCount,
        seed: makeSeed(),
        includeIds,
      });
      setSession(nextSession);
      setAnswers({});
      setCurrentIndex(0);
      setElapsedSeconds(0);
      setPaused(false);
      setSummary(null);
      setMode("running");
    } catch (startError) {
      setError(startError instanceof Error ? startError.message : "Không tạo được đề.");
    }
  }

  function chooseAnswer(displayKey: OptionKey) {
    if (!currentQuestion || currentAnswer) {
      return;
    }
    const result = gradeAnswer(currentQuestion, displayKey);
    setAnswers((current) => ({
      ...current,
      [currentQuestion.id]: result,
    }));
  }

  function finishQuiz() {
    if (!session) {
      return;
    }
    const orderedResults = session.questions.map((question) => answers[question.id]).filter(Boolean);
    if (orderedResults.length !== session.questions.length) {
      setError("Bạn cần trả lời câu hiện tại trước khi kết thúc.");
      return;
    }
    const nextSummary = summarizeAnswers(orderedResults, session.questions.length);
    const completedAt = Date.now();
    updateProgress((current) =>
      recordQuizCompletion({
        progress: current,
        results: orderedResults,
        summary: nextSummary,
        seed: session.seed,
        durationSeconds: elapsedSeconds,
        completedAt,
      }),
    );
    setSummary(nextSummary);
    setMode("done");
  }

  function goNext() {
    if (!session || !currentAnswer) {
      return;
    }
    if (currentIndex === session.questions.length - 1) {
      finishQuiz();
      return;
    }
    setCurrentIndex((index) => index + 1);
  }

  function retryWrongQuestions() {
    if (!summary || summary.wrongQuestionIds.length === 0) {
      return;
    }
    startQuiz({ ids: summary.wrongQuestionIds, count: summary.wrongQuestionIds.length });
  }

  return (
    <div className="page-stack quiz-page">
      <section className="page-heading">
        <p className="eyebrow">Màn làm trắc nghiệm</p>
        <h1>Đảo câu và đáp án, chấm từng câu sau khi chọn.</h1>
      </section>

      <DataIssuePanel data={data} />

      {mode === "setup" ? (
        <section className="quiz-setup" aria-labelledby="quiz-setup-title">
          <div>
            <p className="eyebrow">Thiết lập đề</p>
            <h2 id="quiz-setup-title">Chọn số câu và nguồn câu hỏi.</h2>
            <p className="muted">
              Đề 90 câu chỉ tạo khi dữ liệu có đủ ít nhất 90 câu phù hợp. App không tự lặp câu để lấp chỗ trống.
            </p>
          </div>

          <fieldset className="setup-group">
            <legend>Số câu</legend>
            <div className="segmented">
              {countOptions.map((item) => (
                <button
                  className={count === item ? "active" : ""}
                  key={item}
                  onClick={() => setCount(item)}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="setup-group">
            <legend>Nguồn câu</legend>
            <div className="segmented wide">
              <button className={poolMode === "all" ? "active" : ""} onClick={() => setPoolMode("all")} type="button">
                Tất cả ({data.questions.length})
              </button>
              <button
                className={poolMode === "starred" ? "active" : ""}
                onClick={() => setPoolMode("starred")}
                type="button"
              >
                Đã sao ({progress.starredIds.length})
              </button>
              <button
                className={poolMode === "wrong" ? "active" : ""}
                onClick={() => setPoolMode("wrong")}
                type="button"
              >
                Từng sai ({getWrongQuestionIds(progress).length})
              </button>
            </div>
          </fieldset>

          {error || notEnoughMessage ? (
            <p className="form-error" role="alert">
              {error ?? notEnoughMessage}
            </p>
          ) : null}

          <button className="primary-button" disabled={!data.isReady || poolSize < count} onClick={() => startQuiz()} type="button">
            <Play size={18} />
            Bắt đầu
          </button>
        </section>
      ) : null}

      {mode === "running" && session && currentQuestion ? (
        <section className="quiz-runner" aria-labelledby="quiz-question-title">
          <div className="quiz-status">
            <span>
              {currentIndex + 1}/{session.questions.length}
            </span>
            <span className="timer-chip">
              <Timer size={16} />
              {formatDuration(elapsedSeconds)}
            </span>
            <button className="secondary-button compact" onClick={() => setPaused((value) => !value)} type="button">
              {paused ? <Play size={16} /> : <Pause size={16} />}
              {paused ? "Tiếp tục" : "Tạm dừng"}
            </button>
          </div>
          <div
            className="progress-bar"
            aria-label={`Tiến độ ${currentIndex + 1} trên ${session.questions.length}`}
            role="progressbar"
            aria-valuemax={session.questions.length}
            aria-valuemin={1}
            aria-valuenow={currentIndex + 1}
          >
            <span style={{ width: `${((currentIndex + 1) / session.questions.length) * 100}%` }} />
          </div>

          <article className="quiz-card">
            <div className="question-card-header">
              <span className="badge yellow">Câu gốc {currentQuestion.id}</span>
              <button
                aria-label={isStarred ? `Bỏ đánh dấu câu ${currentQuestion.id}` : `Đánh dấu sao câu ${currentQuestion.id}`}
                className={`icon-button${isStarred ? " starred" : ""}`}
                onClick={() => updateProgress((current) => toggleStar(current, currentQuestion.id))}
                type="button"
              >
                <Star size={18} fill={isStarred ? "currentColor" : "none"} />
              </button>
            </div>

            {paused ? (
              <div className="pause-panel" role="status">
                <h2>Bài đang tạm dừng.</h2>
                <p>Nội dung câu hỏi và đáp án được che cho tới khi tiếp tục.</p>
              </div>
            ) : (
              <>
                <div className="markdown question-text" id="quiz-question-title">
                  <MarkdownContent>{currentQuestion.question}</MarkdownContent>
                </div>

                <div className="answer-grid" role="group" aria-label="Các lựa chọn">
                  {currentQuestion.options.map((option) => {
                    const isSelected = currentAnswer?.selectedDisplayKey === option.displayKey;
                    const stateClass = currentAnswer
                      ? option.isCorrect
                        ? " correct"
                        : isSelected
                          ? " wrong"
                          : ""
                      : "";
                    return (
                      <button
                        className={`answer-option${isSelected ? " selected" : ""}${stateClass}`}
                        disabled={Boolean(currentAnswer)}
                        key={option.displayKey}
                        onClick={() => chooseAnswer(option.displayKey)}
                        type="button"
                      >
                        <span className="option-key">{option.displayKey}</span>
                        <span className="markdown">
                          <MarkdownContent>{option.text}</MarkdownContent>
                        </span>
                      </button>
                    );
                  })}
                </div>

                {currentAnswer ? (
                  <FeedbackPanel answer={currentAnswer} explanation={currentQuestion.explanation} />
                ) : (
                  <p className="muted no-leak-note">Đáp án và giải thích sẽ chỉ hiện sau khi bạn chọn.</p>
                )}
              </>
            )}
          </article>

          {error ? (
            <p className="form-error" role="alert">
              {error}
            </p>
          ) : null}

          <div className="quiz-actions">
            <button className="secondary-button" onClick={() => setMode("setup")} type="button">
              <RotateCcw size={17} />
              Thiết lập lại
            </button>
            <button className="primary-button" disabled={!currentAnswer || paused} onClick={goNext} type="button">
              {currentIndex === session.questions.length - 1 ? "Xem kết quả" : "Câu tiếp theo"}
            </button>
          </div>
        </section>
      ) : null}

      {mode === "done" && summary && session ? (
        <section className="result-panel" aria-labelledby="result-title">
          <p className="eyebrow">Kết quả</p>
          <h2 id="result-title">
            {summary.correct}/{summary.total} câu đúng
          </h2>
          <div className="score-grid">
            <div>
              <strong>{summary.percent}%</strong>
              <span>Tỷ lệ đúng</span>
            </div>
            <div>
              <strong>{summary.incorrect}</strong>
              <span>Câu sai</span>
            </div>
            <div>
              <strong>{formatDuration(elapsedSeconds)}</strong>
              <span>Thời gian</span>
            </div>
          </div>

          {summary.wrongQuestionIds.length > 0 ? (
            <div className="wrong-list">
              <h3>Câu sai cần ôn lại</h3>
              <div className="wrong-id-row">
                {summary.wrongQuestionIds.map((id) => (
                  <span className="badge neutral" key={id}>
                    Câu {id}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <p className="success-line">Không có câu sai trong lượt này.</p>
          )}

          <div className="quiz-actions">
            <button
              className="secondary-button"
              disabled={summary.wrongQuestionIds.length === 0}
              onClick={retryWrongQuestions}
              type="button"
            >
              Làm lại câu sai
            </button>
            <button className="primary-button" onClick={() => setMode("setup")} type="button">
              Làm đề mới
            </button>
          </div>
        </section>
      ) : null}
    </div>
  );
}

function FeedbackPanel({ answer, explanation }: { answer: AnswerResult; explanation: string }) {
  return (
    <section className={`feedback-panel${answer.isCorrect ? " correct" : " wrong"}`} aria-live="polite">
      <div className="feedback-title">
        {answer.isCorrect ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
        <strong>{answer.isCorrect ? "Đúng" : "Chưa đúng"}</strong>
      </div>
      <p>
        Đáp án đúng: {answer.correctDisplayKey}{" "}
        <span className="muted">(gốc {answer.correctOriginalKey})</span>
      </p>
      <div className="markdown explanation">
        <MarkdownContent>{explanation}</MarkdownContent>
      </div>
    </section>
  );
}

function getPoolIds(mode: PoolMode, allIds: number[], progress: StudyProgress): number[] {
  if (mode === "all") {
    return allIds;
  }
  const allowed = new Set(mode === "starred" ? progress.starredIds : getWrongQuestionIds(progress));
  return allIds.filter((id) => allowed.has(id));
}

function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
