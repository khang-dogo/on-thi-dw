import { describe, expect, it } from "vitest";
import { gradeAnswer, summarizeAnswers, type AnswerResult } from "./quiz";
import {
  createEmptyProgress,
  getMasteryLabel,
  getWrongQuestionIds,
  readProgress,
  recordQuizCompletion,
  toggleStar,
  updateNote,
  writeProgress,
} from "./storage";
import type { QuizQuestion } from "./quiz";

class MemoryStorage implements Storage {
  private data = new Map<string, string>();
  length = 0;

  clear(): void {
    this.data.clear();
    this.length = 0;
  }

  getItem(key: string): string | null {
    return this.data.get(key) ?? null;
  }

  key(index: number): string | null {
    return [...this.data.keys()][index] ?? null;
  }

  removeItem(key: string): void {
    this.data.delete(key);
    this.length = this.data.size;
  }

  setItem(key: string, value: string): void {
    this.data.set(key, value);
    this.length = this.data.size;
  }
}

const quizQuestion: QuizQuestion = {
  id: 1,
  question: "Q",
  explanation: "E",
  correctOriginalKey: "B",
  raw: "raw",
  options: [
    { displayKey: "A", originalKey: "A", text: "A", isCorrect: false },
    { displayKey: "B", originalKey: "B", text: "B", isCorrect: true },
  ],
};

describe("storage", () => {
  it("saves and reloads starred ids and notes", () => {
    const storage = new MemoryStorage();
    let progress = createEmptyProgress();
    progress = toggleStar(progress, 3);
    progress = updateNote(progress, 3, "mẹo nhớ");

    expect(writeProgress(progress, storage)).toBeUndefined();

    const reloaded = readProgress(storage);
    expect(reloaded.error).toBeUndefined();
    expect(reloaded.progress.starredIds).toEqual([3]);
    expect(reloaded.progress.notes["3"]).toBe("mẹo nhớ");
  });

  it("falls back to clean state when localStorage is corrupt", () => {
    const storage = new MemoryStorage();
    storage.setItem("on-thi-dw-progress-v1", "{bad json");

    const result = readProgress(storage);

    expect(result.error).toMatch("localStorage bị lỗi");
    expect(result.progress).toEqual(createEmptyProgress());
  });

  it("records quiz attempts, history, and wrong ids", () => {
    const wrongAnswer = gradeAnswer(quizQuestion, "A");
    const correctAnswer = gradeAnswer(quizQuestion, "B");
    const results: AnswerResult[] = [wrongAnswer, correctAnswer];
    const summary = summarizeAnswers(results, 2);

    const progress = recordQuizCompletion({
      progress: createEmptyProgress(),
      results,
      summary,
      seed: "abc",
      durationSeconds: 45,
      completedAt: 1000,
    });

    expect(progress.attempts["1"]).toEqual({ correct: 1, wrong: 1, lastAnsweredAt: 1000 });
    expect(progress.history).toHaveLength(1);
    expect(getWrongQuestionIds(progress)).toEqual([1]);
    expect(getMasteryLabel(progress, 1)).toBe("đang ổn");
  });
});
