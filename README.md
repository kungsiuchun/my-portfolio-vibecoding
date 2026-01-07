# My Portfolio - Vibe Coding

A modern portfolio website built with React, Tailwind CSS, and Giscus for comments.

## Tech Stack
- **Framework:** Next.js / React
- **Styling:** Tailwind CSS
- **Comments:** Giscus (GitHub Discussions)
- **Deployment:** Vercel

## Features
- Responsive Design
- Dark/Light Mode Support
- Dynamic Project Showcase

## 📂 專案目錄結構

```text
.
├── .github/workflows/       # GitHub Actions 設定 (自動化抓取數據任務)
├── public/                  # 靜態資源 (專案流程圖、封面圖片)
├── src/                     # React 原始碼
│   ├── components/          # 可複用組件
│   │   ├── StockDashboard.jsx # 核心功能：渲染互動式股票走勢圖
│   │   └── SEO.jsx          # 搜尋引擎優化與 Meta Tags
│   ├── data/                
│   │   └── posts.js         # 所有文章內容 (包含 Markdown 與動態組件配置)
│   ├── pages/               
│   │   └── PostDetail.jsx   # 動態文章渲染引擎 (支援 Markdown 與 React 組件)
│   └── App.jsx              # 路由配置
├── tickers.csv              # 自動更新的數據庫 (作為網站的 Data Source)
├── script.py                # 每日抓取數據的主腳本
├── backfill.py              # 補回歷史數據的工具腳本
├── requirements.txt         # Python 依賴環境
└── tailwind.config.js       # 包含 @tailwindcss/typography 樣式配置

