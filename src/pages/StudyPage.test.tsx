import { render, screen, within } from "@testing-library/react";
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

  it("paginates the study list with 10 questions per page", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <StudyPage data={makeData(12)} progress={makeProgress()} updateProgress={() => undefined} />
      </MemoryRouter>,
    );

    expect(screen.getAllByText("Trang 1/2")).toHaveLength(2);
    expect(screen.getByText("Đang xem câu 1-10")).toBeInTheDocument();
    expect(screen.getByText("Câu 1")).toBeInTheDocument();
    expect(screen.getByText("Câu 10")).toBeInTheDocument();
    expect(screen.queryByText("Câu 11")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Sau" }));

    expect(screen.getAllByText("Trang 2/2")).toHaveLength(2);
    expect(screen.getByText("Đang xem câu 11-12")).toBeInTheDocument();
    expect(screen.queryByText("Câu 1")).not.toBeInTheDocument();
    expect(screen.getByText("Câu 11")).toBeInTheDocument();
    expect(screen.getByText("Câu 12")).toBeInTheDocument();
  });

  it("reveals study feedback only after an option is selected and can reset that card", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <StudyPage data={makeData(1)} progress={makeProgress()} updateProgress={() => undefined} />
      </MemoryRouter>,
    );

    expect(screen.queryByText("Đáp án đúng: B")).not.toBeInTheDocument();
    expect(screen.queryByText("Giải thích riêng cho câu 1")).not.toBeInTheDocument();

    const choices = screen.getByRole("group", { name: "Lựa chọn câu 1" });
    await user.click(within(choices).getByRole("button", { name: "A Lựa chọn A 1" }));

    expect(screen.getByText("Chưa đúng")).toBeInTheDocument();
    expect(screen.getByText("Bạn chọn: A")).toBeInTheDocument();
    expect(screen.getByText("Đáp án đúng: B")).toBeInTheDocument();
    expect(screen.getByText("Giải thích riêng cho câu 1")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Reset câu này" }));

    expect(screen.queryByText("Chưa đúng")).not.toBeInTheDocument();
    expect(screen.queryByText("Đáp án đúng: B")).not.toBeInTheDocument();
    expect(within(choices).getByRole("button", { name: "A Lựa chọn A 1" })).toBeEnabled();
  });
});
