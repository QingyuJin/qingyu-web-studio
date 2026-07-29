# LULUFACE 正式站

LULUFACE 獨立 React + Vite + TypeScript 網站。正式首頁位於 `/`，所有文案、服務、商品、評論與聯絡資料集中在 `src/beauty-shopline/beautyShoplineData.ts`。

目前正式部署：<https://luluface.vercel.app/>

Vercel 專案：`qingyujins-projects/luluface`

## 正式站能力

- 首頁、內容頁與商品頁均在建置時預先產生 HTML，JavaScript 載入前也能讀取內容。
- 每頁具備獨立 title、description、canonical、Open Graph、Twitter Card 與 JSON-LD。
- 建置時依環境變數產生 `robots.txt`、`sitemap.xml` 與正式 404 頁面。
- Vercel 設有 CSP、防 iframe、內容類型、權限與 referrer 等安全標頭。
- 支援桌機與手機選單、鍵盤焦點、商品對話框、減少動態效果偏好及錯誤恢復畫面。
- 網站圖示、manifest、圖片 lazy loading、明確尺寸與長效靜態資源快取已完成。
- LINE、Instagram、Facebook、電話與地圖資訊皆為可直接操作的連結。
- 商品資料已預留約 10 項的擴充容量，包含售價／優惠價、規格、圖片、功效、成分、使用方式、注意事項、庫存與 Shopline 商品連結；未設定 Shopline 連結前會安全回退至 LINE 詢問。

## 集中設定

- 品牌文案、服務、商品、案例及聯絡資料：`src/beauty-shopline/beautyShoplineData.ts`
- 尚未取得的 Shopline 商店、商品集合、預約系統與加盟表單連結：`siteConfig.pendingLinks`
- 單一商品完成 Shopline 上架後，將該商品的 `shoplineUrl` 填入正式商品網址，按鈕會自動從「LINE 詢問商品」切換為「加入購物車」。
- 原始暫代素材不覆蓋；目前示意圖片均以 `sourceType: "placeholder"` 集中標記。

## 驗證

```bash
npm install
npm run lint
npm run typecheck
npm run test
npm run build
```

或執行完整檢查：

```bash
npm run check
```

本機查看正式建置：

```bash
npm run preview
```

## 正式網域

在購買並連接正式 `.com` 網域前，網站維持 `noindex`，`public/robots.txt` 也會阻擋搜尋引擎。網域連接完成後：

1. 在 Vercel 專案加入已購買的網域，例如 `luluface.com` 與 `www.luluface.com`，並選定主要網域。
2. 設定 `VITE_LULUFACE_SITE_URL=https://luluface.com`（若主要網域不同，請使用實際網址）。
3. 將 `VITE_LULUFACE_ALLOW_INDEXING` 設為 `true`。
4. 將 `public/robots.txt` 改為允許索引並加入 sitemap。
5. 重新部署 Production，確認 canonical、Open Graph 與 HTTPS 轉址。

GA4 預設關閉，取得客戶 Measurement ID 並核定隱私政策後才啟用。

## Vercel 部署

專案已連結至 `qingyujins-projects/luluface`。在本目錄執行：

```bash
vercel --prod
```

正式部署前會執行完整建置，輸出位於 `dist/`。新增公開頁面或商品路由時，需同步確認 `src/site/routeState.ts` 與 `vercel.json` 的路由清單。
