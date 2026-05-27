import type { OptionKey, ParseIssue, Question, QuestionOption } from "../types";

const QUESTION_MARKER = /^\*\*Câu\s+(\d+):\*\*\s*$/u;
const OPTION_MARKER = /^-\s+([A-E])\.\s*(.*)$/u;
const ANSWER_MARKER = /^\*\*Đáp án đúng:\*\*\s*([A-E])\s*$/u;
const EXPLANATION_MARKER = /^\*\*Giải thích:\*\*\s*(.*)$/u;

export interface ParseConfig {
  expectedCount: number;
}

export interface ParseResult {
  questions: Question[];
  errors: ParseIssue[];
  warnings: ParseIssue[];
}

interface QuestionBlock {
  id: number;
  startLine: number;
  rawLines: string[];
}

interface MutableOption {
  key: OptionKey;
  line: number;
  lines: string[];
}

export function parseQuestionsMarkdown(markdown: string, config: ParseConfig): ParseResult {
  const errors: ParseIssue[] = [];
  const warnings: ParseIssue[] = [];
  const normalized = markdown.replace(/\r\n?/gu, "\n");
  const lines = normalized.split("\n");
  const blocks = collectQuestionBlocks(lines, errors);
  const questions: Question[] = [];
  const seenIds = new Map<number, number>();

  for (const block of blocks) {
    const previousLine = seenIds.get(block.id);
    if (previousLine !== undefined) {
      errors.push({
        code: "duplicate-question-id",
        message: `Câu ${block.id} bị trùng với câu đã xuất hiện ở dòng ${previousLine}.`,
        line: block.startLine,
        questionId: block.id,
      });
    }
    seenIds.set(block.id, block.startLine);
    const parsed = parseQuestionBlock(block, errors);
    if (parsed) {
      questions.push(parsed);
    }
  }

  validateQuestionSequence(questions, config.expectedCount, errors);

  if (questions.length === 0) {
    warnings.push({
      code: "no-questions-parsed",
      message: "Không parse được câu hỏi hợp lệ nào từ file nguồn.",
    });
  }

  return { questions, errors, warnings };
}

export function validateQuestionsSchema(questions: Question[]): ParseIssue[] {
  const errors: ParseIssue[] = [];

  for (const question of questions) {
    if (!Number.isInteger(question.id) || question.id <= 0) {
      errors.push({
        code: "invalid-id",
        message: "Question id phải là số nguyên dương.",
        questionId: question.id,
      });
    }
    if (!question.question.trim()) {
      errors.push({
        code: "empty-question",
        message: `Câu ${question.id} thiếu nội dung câu hỏi.`,
        questionId: question.id,
      });
    }
    if (question.options.length < 2) {
      errors.push({
        code: "too-few-options",
        message: `Câu ${question.id} phải có ít nhất 2 lựa chọn.`,
        questionId: question.id,
      });
    }
    for (const option of question.options) {
      if (!option.text.trim()) {
        errors.push({
          code: "empty-option",
          message: `Câu ${question.id} có lựa chọn ${option.key} rỗng.`,
          questionId: question.id,
        });
      }
    }
    if (!question.options.some((option) => option.key === question.answer)) {
      errors.push({
        code: "answer-not-in-options",
        message: `Câu ${question.id} có đáp án ${question.answer} không nằm trong danh sách lựa chọn.`,
        questionId: question.id,
      });
    }
    if (!question.explanation.trim()) {
      errors.push({
        code: "empty-explanation",
        message: `Câu ${question.id} thiếu giải thích.`,
        questionId: question.id,
      });
    }
  }

  return errors;
}

function collectQuestionBlocks(lines: string[], errors: ParseIssue[]): QuestionBlock[] {
  const blocks: QuestionBlock[] = [];
  let current: QuestionBlock | null = null;

  lines.forEach((line, index) => {
    const lineNumber = index + 1;
    const marker = QUESTION_MARKER.exec(line);
    if (marker) {
      if (current) {
        blocks.push(current);
      }
      current = {
        id: Number(marker[1]),
        startLine: lineNumber,
        rawLines: [line],
      };
      return;
    }

    if (!current) {
      if (line.trim() !== "") {
        errors.push({
          code: "text-outside-question",
          message: "Có nội dung nằm ngoài bất kỳ câu hỏi nào.",
          line: lineNumber,
        });
      }
      return;
    }

    current.rawLines.push(line);
  });

  if (current) {
    blocks.push(current);
  }

  return blocks;
}

function parseQuestionBlock(block: QuestionBlock, errors: ParseIssue[]): Question | null {
  const questionLines: string[] = [];
  const options: MutableOption[] = [];
  const optionKeys = new Set<OptionKey>();
  let currentOption: MutableOption | null = null;
  let answer: OptionKey | null = null;
  let answerLine: number | undefined;
  let explanationLine: number | undefined;
  let explanationLines: string[] = [];
  let section: "question" | "options" | "after-answer" | "explanation" = "question";

  block.rawLines.slice(1).forEach((line, offset) => {
    const lineNumber = block.startLine + offset + 1;
    const optionMarker = OPTION_MARKER.exec(line);
    const answerMarker = ANSWER_MARKER.exec(line);
    const explanationMarker = EXPLANATION_MARKER.exec(line);

    if (optionMarker) {
      if (answer) {
        errors.push({
          code: "option-after-answer",
          message: `Câu ${block.id} có lựa chọn xuất hiện sau đáp án đúng.`,
          line: lineNumber,
          questionId: block.id,
        });
      }
      if (explanationLine) {
        errors.push({
          code: "option-after-explanation",
          message: `Câu ${block.id} có lựa chọn xuất hiện sau phần giải thích.`,
          line: lineNumber,
          questionId: block.id,
        });
      }
      const key = optionMarker[1] as OptionKey;
      if (optionKeys.has(key)) {
        errors.push({
          code: "duplicate-option",
          message: `Câu ${block.id} có lựa chọn ${key} bị trùng.`,
          line: lineNumber,
          questionId: block.id,
        });
      }
      optionKeys.add(key);
      currentOption = { key, line: lineNumber, lines: [optionMarker[2]] };
      options.push(currentOption);
      section = "options";
      return;
    }

    if (answerMarker) {
      if (options.length === 0) {
        errors.push({
          code: "answer-before-options",
          message: `Câu ${block.id} có đáp án đúng trước khi có lựa chọn.`,
          line: lineNumber,
          questionId: block.id,
        });
      }
      if (answer) {
        errors.push({
          code: "duplicate-answer",
          message: `Câu ${block.id} có nhiều dòng đáp án đúng.`,
          line: lineNumber,
          questionId: block.id,
        });
      }
      answer = answerMarker[1] as OptionKey;
      answerLine = lineNumber;
      currentOption = null;
      section = "after-answer";
      return;
    }

    if (explanationMarker) {
      if (!answer) {
        errors.push({
          code: "explanation-before-answer",
          message: `Câu ${block.id} có giải thích trước đáp án đúng.`,
          line: lineNumber,
          questionId: block.id,
        });
      }
      if (explanationLine) {
        errors.push({
          code: "duplicate-explanation",
          message: `Câu ${block.id} có nhiều phần giải thích.`,
          line: lineNumber,
          questionId: block.id,
        });
      }
      explanationLine = lineNumber;
      explanationLines = explanationMarker[1] ? [explanationMarker[1]] : [];
      currentOption = null;
      section = "explanation";
      return;
    }

    if (section === "question") {
      questionLines.push(line);
      return;
    }

    if (section === "options" && currentOption) {
      currentOption.lines.push(line);
      return;
    }

    if (section === "after-answer") {
      if (line.trim() !== "") {
        errors.push({
          code: "text-between-answer-and-explanation",
          message: `Câu ${block.id} có nội dung không xác định giữa đáp án và giải thích.`,
          line: lineNumber,
          questionId: block.id,
        });
      }
      return;
    }

    explanationLines.push(line);
  });

  const questionText = cleanBlockText(questionLines);
  const parsedOptions = options.map<QuestionOption>((option) => ({
    key: option.key,
    text: cleanBlockText(option.lines),
  }));
  const explanation = cleanBlockText(explanationLines);

  validateParsedBlock({
    id: block.id,
    startLine: block.startLine,
    questionText,
    options: parsedOptions,
    optionSources: options,
    answer,
    answerLine,
    explanation,
    explanationLine,
    errors,
  });

  if (!answer) {
    return null;
  }

  return {
    id: block.id,
    question: questionText,
    options: parsedOptions,
    answer,
    explanation,
    raw: cleanBlockText(block.rawLines),
  };
}

function validateParsedBlock(input: {
  id: number;
  startLine: number;
  questionText: string;
  options: QuestionOption[];
  optionSources: MutableOption[];
  answer: OptionKey | null;
  answerLine?: number;
  explanation: string;
  explanationLine?: number;
  errors: ParseIssue[];
}): void {
  if (!input.questionText.trim()) {
    input.errors.push({
      code: "missing-question-text",
      message: `Câu ${input.id} thiếu nội dung câu hỏi.`,
      line: input.startLine,
      questionId: input.id,
    });
  }

  if (input.options.length === 0) {
    input.errors.push({
      code: "missing-options",
      message: `Câu ${input.id} không có lựa chọn.`,
      line: input.startLine,
      questionId: input.id,
    });
  }

  if (input.options.length === 1) {
    input.errors.push({
      code: "too-few-options",
      message: `Câu ${input.id} chỉ có 1 lựa chọn.`,
      line: input.optionSources[0]?.line ?? input.startLine,
      questionId: input.id,
    });
  }

  input.options.forEach((option, index) => {
    if (!option.text.trim()) {
      input.errors.push({
        code: "empty-option",
        message: `Câu ${input.id} có lựa chọn ${option.key} rỗng.`,
        line: input.optionSources[index]?.line,
        questionId: input.id,
      });
    }
  });

  if (!input.answer) {
    input.errors.push({
      code: "missing-answer",
      message: `Câu ${input.id} thiếu đáp án đúng.`,
      line: input.startLine,
      questionId: input.id,
    });
  } else if (!input.options.some((option) => option.key === input.answer)) {
    input.errors.push({
      code: "answer-not-in-options",
      message: `Câu ${input.id} có đáp án ${input.answer} không nằm trong lựa chọn.`,
      line: input.answerLine,
      questionId: input.id,
    });
  }

  if (!input.explanationLine) {
    input.errors.push({
      code: "missing-explanation",
      message: `Câu ${input.id} thiếu giải thích.`,
      line: input.startLine,
      questionId: input.id,
    });
  } else if (!input.explanation.trim()) {
    input.errors.push({
      code: "empty-explanation",
      message: `Câu ${input.id} có giải thích rỗng.`,
      line: input.explanationLine,
      questionId: input.id,
    });
  }
}

function validateQuestionSequence(
  questions: Question[],
  expectedCount: number,
  errors: ParseIssue[],
): void {
  const ids = questions.map((question) => question.id);
  const uniqueIds = new Set(ids);

  if (questions.length !== expectedCount) {
    errors.push({
      code: "question-count-mismatch",
      message: `Số câu parse được là ${questions.length}, không bằng số kỳ vọng ${expectedCount}.`,
    });
  }

  for (let id = 1; id <= expectedCount; id += 1) {
    if (!uniqueIds.has(id)) {
      errors.push({
        code: "missing-question-id",
        message: `Thiếu câu ${id}.`,
        questionId: id,
      });
    }
  }

  const sortedIds = [...uniqueIds].sort((a, b) => a - b);
  const hasOutOfRangeId = sortedIds.some((id) => id < 1 || id > expectedCount);
  if (hasOutOfRangeId) {
    errors.push({
      code: "question-id-out-of-range",
      message: `Có số câu nằm ngoài khoảng 1-${expectedCount}.`,
    });
  }
}

function cleanBlockText(lines: string[]): string {
  const copy = [...lines];
  while (copy.length > 0 && copy[0]?.trim() === "") {
    copy.shift();
  }
  while (copy.length > 0 && copy[copy.length - 1]?.trim() === "") {
    copy.pop();
  }
  return copy.join("\n");
}
