import type { AnswerResult, QuizSummary } from "./quiz";

const STORAGE_KEY = "on-thi-dw-progress-v1";

export interface QuestionProgress {
  correct: number;
  wrong: number;
  lastAnsweredAt?: number;
}

export interface QuizHistoryItem {
  id: string;
  seed: string;
  total: number;
  correct: number;
  incorrect: number;
  percent: number;
  durationSeconds: number;
  completedAt: number;
  wrongQuestionIds: number[];
}

export interface StudyProgress {
  version: 1;
  starredIds: number[];
  notes: Record<string, string>;
  attempts: Record<string, QuestionProgress>;
  history: QuizHistoryItem[];
}

export interface ReadProgressResult {
  progress: StudyProgress;
  error?: string;
}

export function createEmptyProgress(): StudyProgress {
  return {
    version: 1,
    starredIds: [],
    notes: {},
    attempts: {},
    history: [],
  };
}

export function readProgress(storage: Storage = window.localStorage): ReadProgressResult {
  const raw = storage.getItem(STORAGE_KEY);
  if (!raw) {
    return { progress: createEmptyProgress() };
  }

  try {
    return { progress: normalizeProgress(JSON.parse(raw)) };
  } catch {
    return {
      progress: createEmptyProgress(),
      error: "Dữ liệu học trong localStorage bị lỗi. App đã dùng trạng thái sạch để tránh crash.",
    };
  }
}

export function writeProgress(progress: StudyProgress, storage: Storage = window.localStorage): string | undefined {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(progress));
    return undefined;
  } catch {
    return "Không lưu được tiến độ học vào localStorage.";
  }
}

export function toggleStar(progress: StudyProgress, questionId: number): StudyProgress {
  const starred = new Set(progress.starredIds);
  if (starred.has(questionId)) {
    starred.delete(questionId);
  } else {
    starred.add(questionId);
  }

  return {
    ...progress,
    starredIds: [...starred].sort((a, b) => a - b),
  };
}

export function updateNote(progress: StudyProgress, questionId: number, note: string): StudyProgress {
  const notes = { ...progress.notes };
  const trimmed = note.trim();
  if (trimmed) {
    notes[String(questionId)] = note;
  } else {
    delete notes[String(questionId)];
  }
  return { ...progress, notes };
}

export function recordQuizCompletion(input: {
  progress: StudyProgress;
  results: AnswerResult[];
  summary: QuizSummary;
  seed: string;
  durationSeconds: number;
  completedAt: number;
}): StudyProgress {
  const attempts = { ...input.progress.attempts };

  for (const result of input.results) {
    const key = String(result.questionId);
    const current = attempts[key] ?? { correct: 0, wrong: 0 };
    attempts[key] = {
      correct: current.correct + (result.isCorrect ? 1 : 0),
      wrong: current.wrong + (result.isCorrect ? 0 : 1),
      lastAnsweredAt: input.completedAt,
    };
  }

  const historyItem: QuizHistoryItem = {
    id: `${input.completedAt}-${input.seed}`,
    seed: input.seed,
    total: input.summary.total,
    correct: input.summary.correct,
    incorrect: input.summary.incorrect,
    percent: input.summary.percent,
    durationSeconds: input.durationSeconds,
    completedAt: input.completedAt,
    wrongQuestionIds: input.summary.wrongQuestionIds,
  };

  return {
    ...input.progress,
    attempts,
    history: [historyItem, ...input.progress.history].slice(0, 30),
  };
}

export function getWrongQuestionIds(progress: StudyProgress): number[] {
  return Object.entries(progress.attempts)
    .filter(([, attempt]) => attempt.wrong > 0)
    .map(([id]) => Number(id))
    .sort((a, b) => a - b);
}

export function getUnseenQuestionIds(progress: StudyProgress, questionIds: number[]): number[] {
  return questionIds.filter((id) => !progress.attempts[String(id)]);
}

export function getMasteryLabel(progress: StudyProgress, questionId: number): string {
  const attempt = progress.attempts[String(questionId)];
  if (!attempt) {
    return "chưa học";
  }
  if (attempt.wrong > attempt.correct) {
    return "yếu";
  }
  if (attempt.correct >= 3 && attempt.wrong === 0) {
    return "đã vững";
  }
  return "đang ổn";
}

function normalizeProgress(value: unknown): StudyProgress {
  if (!value || typeof value !== "object") {
    throw new Error("Invalid progress payload.");
  }

  const input = value as Partial<StudyProgress>;
  return {
    version: 1,
    starredIds: Array.isArray(input.starredIds)
      ? input.starredIds.filter((id): id is number => Number.isInteger(id) && id > 0)
      : [],
    notes: normalizeStringRecord(input.notes),
    attempts: normalizeAttempts(input.attempts),
    history: normalizeHistory(input.history),
  };
}

function normalizeStringRecord(value: unknown): Record<string, string> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>).filter(([, item]) => typeof item === "string"),
  ) as Record<string, string>;
}

function normalizeAttempts(value: unknown): Record<string, QuestionProgress> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  const attempts: Record<string, QuestionProgress> = {};
  for (const [id, item] of Object.entries(value as Record<string, unknown>)) {
    if (!item || typeof item !== "object") {
      continue;
    }
    const attempt = item as Partial<QuestionProgress>;
    attempts[id] = {
      correct: Number.isFinite(attempt.correct) ? Number(attempt.correct) : 0,
      wrong: Number.isFinite(attempt.wrong) ? Number(attempt.wrong) : 0,
      lastAnsweredAt: Number.isFinite(attempt.lastAnsweredAt) ? Number(attempt.lastAnsweredAt) : undefined,
    };
  }
  return attempts;
}

function normalizeHistory(value: unknown): QuizHistoryItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is QuizHistoryItem => {
      if (!item || typeof item !== "object") {
        return false;
      }
      const history = item as Partial<QuizHistoryItem>;
      return (
        typeof history.id === "string" &&
        typeof history.seed === "string" &&
        Number.isFinite(history.total) &&
        Number.isFinite(history.correct) &&
        Number.isFinite(history.incorrect) &&
        Number.isFinite(history.percent) &&
        Number.isFinite(history.durationSeconds) &&
        Number.isFinite(history.completedAt) &&
        Array.isArray(history.wrongQuestionIds)
      );
    })
    .slice(0, 30);
}
