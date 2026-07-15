# 鑫匠工程網站部署說明

這是獨立的 Vite + React + TypeScript + Tailwind CSS 專案。

## 本機測試

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Vercel 免費部署設定

在 Vercel 匯入 GitHub 專案時請填：

- Repository: `qingyu-web-studio`
- Project Name: `xinjiang-website`
- Root Directory: `xinjiang-website`
- Framework Preset: `Vite`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`

部署後會得到免費網址，例如：

```txt
https://xinjiang-website.vercel.app
```

## CLI 部署

如果已登入 Vercel CLI：

```bash
npx vercel --prod
```

若出現 token invalid，請重新登入：

```bash
npx vercel logout
npx vercel login
npx vercel --prod
```
