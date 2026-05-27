import { describe, expect, it } from "vitest";
import type { Question } from "../types";
import { createQuiz, getCorrectOption, gradeAnswer, summarizeAnswers } from "./quiz";

const questions: Question[] = Array.from({ length: 100 }, (_, index) => {
  const id = index + 1;
  return {
    id,
    question: `Câu hỏi ${id}`,
    options: [
      { key: "A", text: `A ${id}` },
      { key: "B", text: `B ${id}` },
      { key: "C", text: `C ${id}` },
      { key: "D", text: `D ${id}` },
      { key: "E", text: `E ${id}` },
    ],
    answer: (["A", "B", "C", "D", "E"] as const)[index % 5],
    explanation: `Giải thích ${id}`,
    raw: `raw ${id}`,
  };
});

describe("createQuiz", () => {
  it("creates a reproducible quiz with no duplicated questions", () => {
    const quizA = createQuiz({ questions, count: 10, seed: "seed-1", now: 100 });
    const quizB = createQuiz({ questions, count: 10, seed: "seed-1", now: 100 });

    expect(quizA).toEqual(quizB);
    expect(new Set(quizA.questions.map((question) => question.id)).size).toBe(10);
    expect(quizA.startedAt).toBe(100);
  });

  it("does not mutate source questions or options", () => {
    const before = structuredClone(questions);

    createQuiz({ questions, count: 25, seed: "mutation-check", now: 100 });

    expect(questions).toEqual(before);
  });

  it("does not create a quiz when the pool is too small", () => {
    expect(() => createQuiz({ questions: questions.slice(0, 5), count: 90, seed: "small" })).toThrow(
      "Không đủ dữ liệu",
    );
  });

  it("keeps correct answer mapping after shuffling options across many seeds", () => {
    for (let seedIndex = 0; seedIndex < 1000; seedIndex += 1) {
      const quiz = createQuiz({ questions, count: 90, seed: `seed-${seedIndex}`, now: 100 });

      for (const quizQuestion of quiz.questions) {
        const source = questions.find((question) => question.id === quizQuestion.id);
        const correct = getCorrectOption(quizQuestion);

        expect(source).toBeDefined();
        expect(correct.originalKey).toBe(source?.answer);
        expect(correct.text).toBe(source?.options.find((option) => option.key === source.answer)?.text);
      }
    }
  });

  it("uses includeIds as the candidate pool", () => {
    const quiz = createQuiz({ questions, count: 3, seed: "filtered", includeIds: [2, 4, 6], now: 100 });

    expect(quiz.questions.map((question) => question.id).sort((a, b) => a - b)).toEqual([2, 4, 6]);
  });
});

describe("gradeAnswer and summarizeAnswers", () => {
  it("grades by displayed option while preserving the original answer key", () => {
    const quiz = createQuiz({ questions: questions.slice(0, 1), count: 1, seed: "grade", now: 100 });
    const question = quiz.questions[0];
    const correct = getCorrectOption(question);
    const result = gradeAnswer(question, correct.displayKey);

    expect(result).toMatchObject({
      questionId: question.id,
      selectedDisplayKey: correct.displayKey,
      selectedOriginalKey: correct.originalKey,
      correctOriginalKey: correct.originalKey,
      isCorrect: true,
    });
  });

  it("summarizes score, percent, and wrong question ids", () => {
    const quiz = createQuiz({ questions: questions.slice(0, 3), count: 3, seed: "summary", now: 100 });
    const firstCorrect = getCorrectOption(quiz.questions[0]);
    const secondWrong = quiz.questions[1].options.find((option) => !option.isCorrect);
    const thirdWrong = quiz.questions[2].options.find((option) => !option.isCorrect);

    if (!secondWrong || !thirdWrong) {
      throw new Error("Fixture must include wrong options.");
    }

    const results = [
      gradeAnswer(quiz.questions[0], firstCorrect.displayKey),
      gradeAnswer(quiz.questions[1], secondWrong.displayKey),
      gradeAnswer(quiz.questions[2], thirdWrong.displayKey),
    ];

    expect(summarizeAnswers(results, quiz.questions.length)).toEqual({
      total: 3,
      correct: 1,
      incorrect: 2,
      percent: 33.3,
      wrongQuestionIds: [quiz.questions[1].id, quiz.questions[2].id],
    });
  });
});
