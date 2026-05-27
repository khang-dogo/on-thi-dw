import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { makeData, makeProgress } from "./pageTestUtils";
import { StudyPage } from "./StudyPage";

describe("StudyPage", () => {
  it("renders questions and supports no-diacritic search with an empty state", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <StudyPage data={makeData(2)} progress={makeProgress()} updateProgress={() => undefined} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Câu 1")).toBeInTheDocument();
    await user.type(screen.getByPlaceholderText("Tìm trong câu hỏi, đáp án, giải thích..."), "cong thuc so 2");

    expect(screen.queryByText("Câu 1")).not.toBeInTheDocument();
    expect(screen.getByText("Câu 2")).toBeInTheDocument();

    await user.clear(screen.getByPlaceholderText("Tìm trong câu hỏi, đáp án, giải thích..."));
    await user.type(screen.getByPlaceholderText("Tìm trong câu hỏi, đáp án, giải thích..."), "khong co");

    expect(screen.getByText("Không có câu phù hợp.")).toBeInTheDocument();
  });

  it("does not reveal answers when hide-answer mode is enabled until the card is opened", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <StudyPage data={makeData(1)} progress={makeProgress()} updateProgress={() => undefined} />
      </MemoryRouter>,
    );

    await user.click(screen.getByLabelText("Ẩn đáp án ở trang ôn tập"));
    expect(screen.queryByText("Đáp án đúng: B")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Mở đáp án và giải thích" }));
    expect(screen.getByText("Đáp án đúng: B")).toBeInTheDocument();
    expect(screen.getByText("Giải thích riêng cho câu 1")).toBeInTheDocument();
  });
});
