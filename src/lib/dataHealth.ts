import type { ParseIssue, Question } from "../types";
import { validateQuestionsSchema } from "./parseQuestions";

export interface DataHealth {
  questions: Question[];
  errors: ParseIssue[];
  isReady: boolean;
}

export function normalizeQuestionData(value: unknown): DataHealth {
  if (!Array.isArray(value)) {
    return {
      questions: [],
      errors: [{ code: "questions-json-not-array", message: "questions.json không phải là array." }],
      isReady: false,
    };
  }

  const questions = value.filter(isQuestionLike) as Question[];
  const shapeErrors =
    questions.length === value.length
      ? []
      : [{ code: "questions-json-invalid-item", message: "questions.json có item sai schema." }];
  const schemaErrors = validateQuestionsSchema(questions);

  return {
    questions,
    errors: [...shapeErrors, ...schemaErrors],
    isReady: questions.length > 0 && shapeErrors.length === 0 && schemaErrors.length === 0,
  };
}

function isQuestionLike(value: unknown): value is Question {
  if (!value || typeof value !== "object") {
    return false;
  }
  const item = value as Partial<Question>;
  return (
    typeof item.id === "number" &&
    typeof item.question === "string" &&
    Array.isArray(item.options) &&
    typeof item.answer === "string" &&
    typeof item.explanation === "string" &&
    typeof item.raw === "string"
  );
}
