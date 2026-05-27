import { describe, expect, it } from "vitest";
import { parseQuestionsMarkdown } from "./parseQuestions";

const validFixture = `**Câu 1:**

Tỉ lệ thành công là bao nhiêu nếu công thức là $a_b^2 + 10\\%$?

- A. 10%
- B. 20%
- C. 30%
- D. 40%
- E. 50%

**Đáp án đúng:** B

**Giải thích:** Giữ nguyên $a_b^2$, dấu \\\\, ký tự * và _.

**Câu 2:**

Câu hỏi nhiều dòng:

- A. Lựa chọn A
  tiếp tục dòng A
- B. Lựa chọn B
- C. Lựa chọn C
- D. Lựa chọn D

**Đáp án đúng:** D

**Giải thích:** Dòng 1.
- Gạch đầu dòng trong giải thích.
`;

describe("parseQuestionsMarkdown", () => {
  it("parses questions, options, answers, explanations, and special characters without rewriting content", () => {
    const result = parseQuestionsMarkdown(validFixture, { expectedCount: 2 });

    expect(result.errors).toEqual([]);
    expect(result.questions).toMatchInlineSnapshot(`
      [
        {
          "answer": "B",
          "explanation": "Giữ nguyên $a_b^2$, dấu \\\\, ký tự * và _.",
          "id": 1,
          "options": [
            {
              "key": "A",
              "text": "10%",
            },
            {
              "key": "B",
              "text": "20%",
            },
            {
              "key": "C",
              "text": "30%",
            },
            {
              "key": "D",
              "text": "40%",
            },
            {
              "key": "E",
              "text": "50%",
            },
          ],
          "question": "Tỉ lệ thành công là bao nhiêu nếu công thức là $a_b^2 + 10\\%$?",
          "raw": "**Câu 1:**

      Tỉ lệ thành công là bao nhiêu nếu công thức là $a_b^2 + 10\\%$?

      - A. 10%
      - B. 20%
      - C. 30%
      - D. 40%
      - E. 50%

      **Đáp án đúng:** B

      **Giải thích:** Giữ nguyên $a_b^2$, dấu \\\\, ký tự * và _.",
        },
        {
          "answer": "D",
          "explanation": "Dòng 1.
      - Gạch đầu dòng trong giải thích.",
          "id": 2,
          "options": [
            {
              "key": "A",
              "text": "Lựa chọn A
        tiếp tục dòng A",
            },
            {
              "key": "B",
              "text": "Lựa chọn B",
            },
            {
              "key": "C",
              "text": "Lựa chọn C",
            },
            {
              "key": "D",
              "text": "Lựa chọn D",
            },
          ],
          "question": "Câu hỏi nhiều dòng:",
          "raw": "**Câu 2:**

      Câu hỏi nhiều dòng:

      - A. Lựa chọn A
        tiếp tục dòng A
      - B. Lựa chọn B
      - C. Lựa chọn C
      - D. Lựa chọn D

      **Đáp án đúng:** D

      **Giải thích:** Dòng 1.
      - Gạch đầu dòng trong giải thích.",
        },
      ]
    `);
  });

  it("reports text before the first question and missing sequence ids", () => {
    const result = parseQuestionsMarkdown(`Mở đầu ngoài câu hỏi\n\n**Câu 2:**\n\nNội dung\n\n- A. Đúng\n- B. Sai\n\n**Đáp án đúng:** A\n\n**Giải thích:** Có.`, {
      expectedCount: 2,
    });

    expect(result.errors.map((error) => error.code)).toEqual([
      "text-outside-question",
      "question-count-mismatch",
      "missing-question-id",
    ]);
  });

  it("reports missing answer and explanation instead of guessing", () => {
    const result = parseQuestionsMarkdown(`**Câu 1:**\n\nNội dung\n\n- A. Một\n- B. Hai`, {
      expectedCount: 1,
    });

    expect(result.errors.map((error) => error.code)).toContain("missing-answer");
    expect(result.errors.map((error) => error.code)).toContain("missing-explanation");
  });

  it("reports an answer that is outside the option list", () => {
    const result = parseQuestionsMarkdown(
      `**Câu 1:**\n\nNội dung\n\n- A. Một\n- B. Hai\n\n**Đáp án đúng:** C\n\n**Giải thích:** Có.`,
      { expectedCount: 1 },
    );

    expect(result.errors.map((error) => error.code)).toContain("answer-not-in-options");
  });

  it("reports duplicated answer and explanation markers", () => {
    const result = parseQuestionsMarkdown(
      `**Câu 1:**\n\nNội dung\n\n- A. Một\n- B. Hai\n\n**Đáp án đúng:** A\n**Đáp án đúng:** B\n\n**Giải thích:** Có.\n**Giải thích:** Trùng.`,
      { expectedCount: 1 },
    );

    expect(result.errors.map((error) => error.code)).toContain("duplicate-answer");
    expect(result.errors.map((error) => error.code)).toContain("duplicate-explanation");
  });

  it("reports generated separator and prompt text inside an explanation", () => {
    const result = parseQuestionsMarkdown(
      `**Câu 1:**\n\nNội dung\n\n- A. Một\n- B. Hai\n\n**Đáp án đúng:** A\n\n**Giải thích:** Có.\n\n====================\n\nDưới đây là **10 câu tiếp theo** được định dạng đầy đủ.`,
      { expectedCount: 1 },
    );

    expect(result.errors.map((error) => error.code)).toContain("generated-separator-line");
    expect(result.errors.map((error) => error.code)).toContain("generated-prompt-text");
  });
});
