import type { OptionKey, Question } from "../types";

const OPTION_KEYS: OptionKey[] = ["A", "B", "C", "D", "E"];

export interface QuizOption {
  displayKey: OptionKey;
  originalKey: OptionKey;
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: number;
  question: string;
  explanation: string;
  options: QuizOption[];
  correctOriginalKey: OptionKey;
  raw: string;
}

export interface QuizSession {
  seed: string;
  questions: QuizQuestion[];
  startedAt: number;
}

export interface CreateQuizInput {
  questions: Question[];
  count: number;
  seed: string;
  now?: number;
  includeIds?: number[];
}

export interface AnswerResult {
  questionId: number;
  selectedDisplayKey: OptionKey;
  selectedOriginalKey: OptionKey;
  correctDisplayKey: OptionKey;
  correctOriginalKey: OptionKey;
  isCorrect: boolean;
}

export interface QuizSummary {
  total: number;
  correct: number;
  incorrect: number;
  percent: number;
  wrongQuestionIds: number[];
}

export function createQuiz(input: CreateQuizInput): QuizSession {
  const pool = input.includeIds
    ? input.questions.filter((question) => input.includeIds?.includes(question.id))
    : input.questions;

  if (!Number.isInteger(input.count) || input.count <= 0) {
    throw new Error("Số câu phải là số nguyên dương.");
  }
  if (pool.length < input.count) {
    throw new Error(`Không đủ dữ liệu để tạo đề ${input.count} câu. Hiện chỉ có ${pool.length} câu phù hợp.`);
  }

  const rng = createSeededRandom(input.seed);
  const selectedQuestions = shuffleCopy(pool, rng).slice(0, input.count);

  return {
    seed: input.seed,
    startedAt: input.now ?? Date.now(),
    questions: selectedQuestions.map((question) => shuffleQuestionOptions(question, rng)),
  };
}

export function gradeAnswer(question: QuizQuestion, selectedDisplayKey: OptionKey): AnswerResult {
  const selected = question.options.find((option) => option.displayKey === selectedDisplayKey);
  const correct = getCorrectOption(question);

  if (!selected) {
    throw new Error(`Không có lựa chọn ${selectedDisplayKey} trong câu ${question.id}.`);
  }

  return {
    questionId: question.id,
    selectedDisplayKey,
    selectedOriginalKey: selected.originalKey,
    correctDisplayKey: correct.displayKey,
    correctOriginalKey: correct.originalKey,
    isCorrect: selected.isCorrect,
  };
}

export function summarizeAnswers(results: AnswerResult[], total: number): QuizSummary {
  const correct = results.filter((result) => result.isCorrect).length;
  const incorrect = total - correct;

  return {
    total,
    correct,
    incorrect,
    percent: total === 0 ? 0 : Math.round((correct / total) * 1000) / 10,
    wrongQuestionIds: results.filter((result) => !result.isCorrect).map((result) => result.questionId),
  };
}

export function getCorrectOption(question: QuizQuestion): QuizOption {
  const correct = question.options.find((option) => option.isCorrect);
  if (!correct) {
    throw new Error(`Câu ${question.id} không có đáp án đúng sau khi đảo lựa chọn.`);
  }
  return correct;
}

export function makeSeed(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function shuffleQuestionOptions(question: Question, rng: () => number): QuizQuestion {
  const shuffledOptions = shuffleCopy(question.options, rng).map((option, index) => {
    const displayKey = OPTION_KEYS[index];
    if (!displayKey) {
      throw new Error(`Câu ${question.id} có nhiều hơn ${OPTION_KEYS.length} lựa chọn.`);
    }
    return {
      displayKey,
      originalKey: option.key,
      text: option.text,
      isCorrect: option.key === question.answer,
    };
  });

  return {
    id: question.id,
    question: question.question,
    explanation: question.explanation,
    options: shuffledOptions,
    correctOriginalKey: question.answer,
    raw: question.raw,
  };
}

function shuffleCopy<T>(items: readonly T[], rng: () => number): T[] {
  const output = [...items];
  for (let index = output.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(rng() * (index + 1));
    [output[index], output[swapIndex]] = [output[swapIndex], output[index]];
  }
  return output;
}

function createSeededRandom(seed: string): () => number {
  let state = hashSeed(seed);
  return () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let mixed = Math.imul(state ^ (state >>> 15), 1 | state);
    mixed = (mixed + Math.imul(mixed ^ (mixed >>> 7), 61 | mixed)) ^ mixed;
    return ((mixed ^ (mixed >>> 14)) >>> 0) / 4294967296;
  };
}

function hashSeed(seed: string): number {
  let hash = 1779033703 ^ seed.length;
  for (let index = 0; index < seed.length; index += 1) {
    hash = Math.imul(hash ^ seed.charCodeAt(index), 3432918353);
    hash = (hash << 13) | (hash >>> 19);
  }
  return hash >>> 0;
}
