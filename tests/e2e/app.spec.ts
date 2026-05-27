import { expect, test } from "@playwright/test";

test("renders the study screen with validated questions without horizontal overflow", async ({ page }, testInfo) => {
  await page.goto("/");

  await expect(page.getByText("88 câu đã sẵn sàng")).toBeVisible();
  await expect(page.getByText("Câu 1").first()).toBeVisible();
  await expect(page.getByPlaceholder("Tìm trong câu hỏi, đáp án, giải thích...")).toBeVisible();
  await expect(page.getByText("Câu 10", { exact: true })).toBeVisible();
  await expect(page.getByText("Câu 11", { exact: true })).not.toBeVisible();

  const firstCard = await page.locator(".question-card").nth(0).boundingBox();
  const secondCard = await page.locator(".question-card").nth(1).boundingBox();
  expect(firstCard).not.toBeNull();
  expect(secondCard).not.toBeNull();
  expect(secondCard!.y).toBeGreaterThan(firstCard!.y + 8);

  await page.getByRole("button", { name: "Sau", exact: true }).click();
  await expect(page.getByText("Câu 11", { exact: true })).toBeVisible();

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

test("centers the active quiz panel on desktop", async ({ page }) => {
  const viewport = page.viewportSize();
  test.skip(!viewport || viewport.width < 1024, "Desktop-only layout assertion");

  await page.goto("/quiz");
  await page.getByRole("button", { name: "Bắt đầu" }).click();
  await expect(page.locator(".quiz-runner")).toBeVisible();

  const runnerBox = await page.locator(".quiz-runner").boundingBox();
  const headingBox = await page.locator(".quiz-page .page-heading").boundingBox();
  expect(runnerBox).not.toBeNull();
  expect(headingBox).not.toBeNull();

  const runnerCenter = runnerBox!.x + runnerBox!.width / 2;
  expect(Math.abs(runnerCenter - viewport!.width / 2)).toBeLessThanOrEqual(2);
  expect(Math.abs(headingBox!.x - runnerBox!.x)).toBeLessThanOrEqual(2);
});
