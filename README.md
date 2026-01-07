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
my-portfolio-vibecoding/
├── .github/
│   └── workflows/
│       └── update_stats.yml           # 自動部署網站至 GitHub Pages 的工作流
├── public/                      # 靜態資源 (不需打包，直接存取)
│   └── images/                  # 存放文章封面圖、個人照及流程圖
├── src/                         # 前端 React 原始碼主目錄
│   ├── assets/                  # 靜態資源 (需經過編譯，如全域 CSS)
│   ├── components/              # 核心 UI 組件庫
│   │   ├── SEO.jsx              # 搜尋引擎優化與動態 Meta Tags
│   │   ├── CommentSystem.jsx    # 整合 Giscus 的評論系統
│   │   ├── StockDashboard.jsx   # (New) 讀取 CSV 並渲染股票走勢圖
│   ├── data/                    
│   │   └── posts.js             # 數據中心：定義所有文章內容、Markdown 及組件位置
│   ├── pages/                   # 路由對應的完整頁面
│   │   ├── Home.jsx             # 作品集首頁 (整合所有展示卡片)
│   │   └── PostDetail.jsx       # 文章詳情頁 (負責解析 Markdown 與渲染動態組件)
│   ├── App.jsx                  # 應用程式入口與 React Router 路由配置
│   ├── main.jsx                 # React 渲染起點 (Mounting point)
│   └── index.css                # 全域樣式與 Tailwind CSS 基礎設定
├── index.html                   # HTML 入口模板
├── package.json                 # 專案套件管理與開發指令 (Vite, Tailwind, Lucide)
├── tailwind.config.js           # Tailwind CSS 樣式與排版插件配置
└── vite.config.js               # Vite 編譯設定


