import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { makeData, makeProgress } from "./pageTestUtils";
import { QuizPage } from "./QuizPage";

describe("QuizPage", () => {
  it("blocks setup when the requested count is larger than the pool", () => {
    render(<QuizPage data={makeData(2)} progress={makeProgress()} updateProgress={() => undefined} />);

    expect(screen.getByRole("button", { name: "Bắt đầu" })).toBeDisabled();
  });

  it("does not show the answer or explanation before selection, then shows feedback after choosing", async () => {
    const user = userEvent.setup();
    render(<QuizPage data={makeData(10)} progress={makeProgress()} updateProgress={() => undefined} />);

    await user.click(screen.getByRole("button", { name: "Bắt đầu" }));

    expect(screen.queryByText(/Đáp án đúng:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Giải thích riêng cho câu/)).not.toBeInTheDocument();

    const answerGroup = screen.getByRole("group", { name: "Các lựa chọn" });
    const answerButtons = within(answerGroup).getAllByRole("button");
    await user.click(answerButtons[0]);

    expect(screen.getByText(/Đáp án đúng:/)).toBeInTheDocument();
    expect(screen.getByText(/Giải thích riêng cho câu/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Câu tiếp theo" })).toBeEnabled();
  });
});
