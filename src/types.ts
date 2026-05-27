export type OptionKey = "A" | "B" | "C" | "D" | "E";

export interface QuestionOption {
  key: OptionKey;
  text: string;
}

export interface Question {
  id: number;
  question: string;
  options: QuestionOption[];
  answer: OptionKey;
  explanation: string;
  raw: string;
}

export interface ParseIssue {
  code: string;
  message: string;
  line?: number;
  questionId?: number;
}
