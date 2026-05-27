# Ôn tập trắc nghiệm DW

React/Vite app để ôn tập và làm trắc nghiệm từ `spec/88-cau-on-tap-trac-nghiem.md`.

## Local

```bash
npm ci
npm run validate:data
npm test
npm run dev
```

## GitHub Pages

Workflow deploy nằm ở `.github/workflows/deploy-pages.yml`.

Trong GitHub repo, vào `Settings -> Pages`, chọn `Source: GitHub Actions`. Sau đó mỗi lần push vào `main`, workflow sẽ:

1. Cài dependencies bằng `npm ci`.
2. Validate dữ liệu câu hỏi.
3. Chạy test.
4. Build với base path `/on-thi-dw/`.
5. Deploy thư mục `dist`.

URL dự kiến sau khi deploy: `https://khang-dogo.github.io/on-thi-dw/`.
