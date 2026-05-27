import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { parseQuestionsMarkdown, validateQuestionsSchema } from "../src/lib/parseQuestions";
import type { ParseIssue, Question } from "../src/types";

const SOURCE_PATH = process.env.QUESTION_SOURCE ?? "spec/88-cau-on-tap-trac-nghiem.md";
const OUTPUT_PATH = process.env.QUESTION_OUTPUT ?? "src/data/questions.json";
const REPORT_PATH = process.env.PARSE_REPORT ?? "spec/parse-report.md";
const EXPECTED_COUNT = Number(process.env.EXPECTED_QUESTIONS ?? "88");

async function main(): Promise<void> {
  const errors: ParseIssue[] = [];
  let source = "";

  try {
    source = await readFile(SOURCE_PATH, "utf8");
  } catch (error) {
    errors.push({
      code: "source-read-failed",
      message: `Không đọc được file nguồn ${SOURCE_PATH}: ${formatUnknownError(error)}`,
    });
  }

  if (source.trim() === "" && errors.length === 0) {
    errors.push({
      code: "source-empty",
      message: `File nguồn ${SOURCE_PATH} đang rỗng.`,
    });
  }

  const parseResult =
    errors.length === 0
      ? parseQuestionsMarkdown(source, { expectedCount: EXPECTED_COUNT })
      : { questions: [] as Question[], errors: [], warnings: [] };
  const schemaErrors = validateQuestionsSchema(parseResult.questions);
  const allErrors = [...errors, ...parseResult.errors, ...schemaErrors];
  const report = buildParseReport({
    sourcePath: SOURCE_PATH,
    outputPath: OUTPUT_PATH,
    expectedCount: EXPECTED_COUNT,
    questions: parseResult.questions,
    errors: allErrors,
    warnings: parseResult.warnings,
  });

  await mkdir(path.dirname(REPORT_PATH), { recursive: true });
  await writeFile(REPORT_PATH, report, "utf8");

  if (allErrors.length > 0) {
    console.error(`Question parse failed. See ${REPORT_PATH}.`);
    for (const issue of allErrors.slice(0, 12)) {
      console.error(formatIssue(issue));
    }
    if (allErrors.length > 12) {
      console.error(`...and ${allErrors.length - 12} more issue(s).`);
    }
    process.exitCode = 1;
    return;
  }

  await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, `${JSON.stringify(parseResult.questions, null, 2)}\n`, "utf8");
  console.log(`Parsed ${parseResult.questions.length} questions into ${OUTPUT_PATH}.`);
  console.log(`Report written to ${REPORT_PATH}.`);
}

function buildParseReport(input: {
  sourcePath: string;
  outputPath: string;
  expectedCount: number;
  questions: Question[];
  errors: ParseIssue[];
  warnings: ParseIssue[];
}): string {
  const passed = input.errors.length === 0;
  const lines = [
    "# Parse report",
    "",
    `- Source: \`${input.sourcePath}\``,
    `- Output: \`${input.outputPath}\``,
    `- Expected questions: ${input.expectedCount}`,
    `- Parsed questions: ${input.questions.length}`,
    `- Status: ${passed ? "PASS" : "FAIL"}`,
    `- Generated at: ${new Date().toISOString()}`,
    "",
    "## Checklist",
    "",
    checklist("File nguồn đọc được và không rỗng", input.errors, ["source-read-failed", "source-empty"]),
    checklist("Không có text ngoài câu hỏi", input.errors, ["text-outside-question"]),
    checklist("Số câu parse được khớp kỳ vọng", input.errors, ["question-count-mismatch"]),
    checklist("Không thiếu số câu trong chuỗi", input.errors, ["missing-question-id"]),
    checklist("Không có câu trùng số", input.errors, ["duplicate-question-id"]),
    checklist("Mỗi câu có nội dung, lựa chọn, đáp án và giải thích", input.errors, [
      "missing-question-text",
      "missing-options",
      "too-few-options",
      "missing-answer",
      "missing-explanation",
      "empty-explanation",
    ]),
    checklist("Đáp án đúng luôn tồn tại trong lựa chọn", input.errors, ["answer-not-in-options"]),
    "",
    "## Errors",
    "",
    ...formatIssues(input.errors, "Không có lỗi."),
    "",
    "## Warnings",
    "",
    ...formatIssues(input.warnings, "Không có cảnh báo."),
    "",
    "## Parsed questions",
    "",
    ...formatParsedQuestions(input.questions),
    "",
  ];

  return `${lines.join("\n")}\n`;
}

function checklist(label: string, errors: ParseIssue[], codes: string[]): string {
  const failed = errors.some((issue) => codes.includes(issue.code));
  return `- [${failed ? " " : "x"}] ${label}`;
}

function formatIssues(issues: ParseIssue[], emptyText: string): string[] {
  if (issues.length === 0) {
    return [`- ${emptyText}`];
  }
  return issues.map((issue) => `- ${formatIssue(issue)}`);
}

function formatIssue(issue: ParseIssue): string {
  const where = [
    issue.line ? `line ${issue.line}` : undefined,
    issue.questionId ? `câu ${issue.questionId}` : undefined,
  ]
    .filter(Boolean)
    .join(", ");
  return `${issue.code}${where ? ` (${where})` : ""}: ${issue.message}`;
}

function formatParsedQuestions(questions: Question[]): string[] {
  if (questions.length === 0) {
    return ["- Không có câu nào được parse thành công."];
  }
  return questions.map(
    (question) =>
      `- Câu ${question.id}: ${question.options.length} lựa chọn, đáp án ${question.answer}, giải thích ${
        question.explanation.trim() ? "có" : "thiếu"
      }.`,
  );
}

function formatUnknownError(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

await main();
