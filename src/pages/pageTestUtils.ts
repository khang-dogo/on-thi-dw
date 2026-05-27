import type { DataHealth } from "../lib/dataHealth";
import type { StudyProgress } from "../lib/storage";
import { createEmptyProgress } from "../lib/storage";
import type { Question } from "../types";

export function makeQuestion(id: number): Question {
  return {
    id,
    question: `Câu hỏi công thức số ${id} với $x_${id}^2$`,
    options: [
      { key: "A", text: `Lựa chọn A ${id}` },
      { key: "B", text: `Lựa chọn B ${id}` },
      { key: "C", text: `Lựa chọn C ${id}` },
      { key: "D", text: `Lựa chọn D ${id}` },
      { key: "E", text: `Lựa chọn E ${id}` },
    ],
    answer: "B",
    explanation: `Giải thích riêng cho câu ${id}`,
    raw: `raw ${id}`,
  };
}

export function makeData(count = 10): DataHealth {
  return {
    questions: Array.from({ length: count }, (_, index) => makeQuestion(index + 1)),
    errors: [],
    isReady: true,
  };
}

export function makeProgress(): StudyProgress {
  return createEmptyProgress();
}
