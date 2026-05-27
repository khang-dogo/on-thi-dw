import { expect, test } from "@playwright/test";

test("renders the study screen with validated questions without horizontal overflow", async ({ page }, testInfo) => {
  await page.goto("/");

  await expect(page.getByText("88 câu đã sẵn sàng")).toBeVisible();
  await expect(page.getByText("Câu 1").first()).toBeVisible();
  await expect(page.getByPlaceholder("Tìm trong câu hỏi, đáp án, giải thích...")).toBeVisible();

  const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  expect(hasOverflow).toBe(false);
  await page.screenshot({ fullPage: true, path: testInfo.outputPath("study-ready.png") });
});

test("shows a clear shortage state for the 90-question mode", async ({ page }, testInfo) => {
  await page.goto("/quiz");

  await expect(page.getByRole("heading", { name: "Chọn số câu và nguồn câu hỏi." })).toBeVisible();
  await page.getByRole("button", { name: "90" }).click();
  await expect(page.getByRole("alert")).toContainText("Không đủ dữ liệu để tạo đề 90 câu");
  await expect(page.getByRole("button", { name: "Bắt đầu" })).toBeDisabled();
  await page.screenshot({ fullPage: true, path: testInfo.outputPath("quiz-90-shortage.png") });
});
