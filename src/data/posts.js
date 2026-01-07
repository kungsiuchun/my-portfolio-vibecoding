export const posts = [
  {
    id: 1,
    title: "Applying Morandi Color Schemes in UI Design",
    date: "2024.03.20",
    category: "Design",
    desc: "Explore how muted, sophisticated color palettes can elevate web aesthetics and enhance the overall reading experience.",
    sections: [
      { 
        type: 'text', 
        value: `
          <h3>The Philosophy of Morandi Colors</h3>
          <p>Named after the Italian painter Giorgio Morandi, these "muted" colors are characterized by low saturation and gray undertones. In UI design, this approach reduces visual noise and creates a sense of tranquility and luxury.</p>
          
          <h3>Key Benefits for User Experience</h3>
          <ul>
            <li><b>Reduced Eye Strain:</b> Soft tones are gentler on the eyes during long browsing sessions.</li>
            <li><b>Content Focus:</b> By avoiding vibrant neon colors, the user's attention naturally gravitates toward the content and typography.</li>
            <li><b>Sophisticated Aesthetic:</b> Morandi palettes lend a professional, high-end feel to minimalist interfaces.</li>
          </ul>
          
          <p>When implementing these colors, consider using a 60-30-10 rule to maintain balance between primary, secondary, and accent muted tones.</p>
        `
      },
    ]
  },
  {
    id: 2,
    title: "Three Practical Techniques for React Performance Optimization",
    date: "2024.03.18",
    category: "Tech",
    desc: "Is your React app feeling sluggish? Let's dive into actionable strategies to boost rendering speed and efficiency.",
    sections: [
      { 
        type: 'text', 
        value: `
          <h3>1. Preventing Unnecessary Re-renders with React.memo</h3>
          <p>Wrap functional components in <code>React.memo</code> to ensure they only re-render when their props actually change. This is crucial for large lists or complex component trees.</p>
          
          <h3>2. Optimizing Heavy Computations with useMemo</h3>
          <p>If you have expensive data processing logic inside a component, use the <code>useMemo</code> hook to cache the result. This prevents the calculation from running on every single render cycle unless specific dependencies change.</p>
          
          <h3>3. Implementing Windowing for Large Data Sets</h3>
          <p>Instead of rendering 1,000+ DOM nodes at once, use libraries like <code>react-window</code> or <code>react-virtualized</code> to render only the items currently visible in the viewport. This dramatically reduces the initial load time and memory usage.</p>
        `
      },
    ]
  },
  // 💡 以後想加文章，直接在這裡複製貼上一個新的物件即可！
  {
    id: 3,
    title: "Exploring Personal Growth through Data & Code",
    date: "2024.03.21",
    category: "Life",
    desc: "A reflection on learning React data management and the beauty of continuous improvement.",
    sections: [
      { 
        type: 'text', 
        value: `
          <p>Today was a breakthrough moment in my development journey. I successfully implemented a centralized data management system for this blog using React state and props.</p>
          <p>What fascinates me most about coding is the bridge between logic and creativity. Just like the clear weather outside today, the logic behind data flows becomes clear once you master the fundamental patterns. I'm excited to continue building more complex features and documenting my progress here.</p>
        `
      },
    ]
  },
  { 
    id: 4,
    title: "Advanced Data Analytics: Genesis RMAP Media Performance Dashboard",
    date: "2025.12.23",
    category: "Data",
    desc: "A comprehensive showcase of using Power BI to transform raw media performance data into actionable business insights.",
    // 💡 將內容拆分為不同類型的區塊
    sections: [
      { 
        type: 'text', 
        value: "<h3>Project Overview</h3><p>In this project, I tackled a massive dataset of retail transactions to identify key growth drivers. Here is the initial data cleaning and architecture mapping phase:</p>" 
      },
      { type: 'image', value: "images/post_4_data_model.png", caption: "Power BI Data Model Layout" },
      { 
        type: 'text', 
        value: "<h3>Interactive Dashboard</h3><p>The following report allows you to filter by region, partner, and time period to explore media trends dynamically:</p>" 
      },
      { 
        type: 'powerbi', 
        value: "https://app.powerbi.com/reportEmbed?reportId=d983e051-913f-4e5a-9f7b-437b7bcf55bf&autoAuth=true&ctid=60e0c9ef-8288-4ed8-9f76-989307f391fd&actionBarEnabled=true", // 👈 貼上你的 Power BI 公開嵌入連結
      // 💡 加入 doc 屬性
        doc: 
`
### Technical Implementation Details
1. **Data Sourcing & ETL**: Extracted raw data from SQL Server, performed complex transformations via Power Query to handle null values and data type inconsistencies.
2. **DAX Logic**: Developed custom DAX measures using **CALCULATE**, **FILTER**, and **SAMEPERIODLASTYEAR** to provide deep Year-over-Year (YoY%) growth analysis.
3. **Architecture Optimization**: Designed a **Star Schema** data model to reduce redundant relationships and significantly improve report calculation performance.
4. **UI/UX Design**: Applied a "Less is More" philosophy, utilizing a custom theme compatible with Dark Mode to ensure high readability and professional branding.
`
      },
    ]
  },
  { 
    id: 5,
    title: "自動化美股數據管線：Python + GitHub Actions + 數據可視化",
    date: "2026.01.04",
    category: "Tech",
    githubUrl: "https://github.com/kungsiuchun/stock-trading-python-app",
    desc: "本項目旨在建立一個完全自動化的數據獲取、儲存與展示系統。透過 Python 腳本調用 Polygon.io API，獲取 Dow 30 成分股的每日交易數據，並利用 GitHub Actions 實現每天一次的自動化更新。",
    sections: [
      { type: 'image', value: "images/post_5_workflow.png", caption: "GitHub Actions Workflow Diagram" },
      { type: 'markdown', value:
`
## 核心技術細節

### 1. 數據獲取 (Data Ingestion)
使用 Python 的 \`requests\` 模組調用 Polygon API。為了優化數據質量與系統性能，我們實施了以下邏輯：
* **自動化日期計算**：動態計算最新交易日，避免手動輸入。
* **Dow 30 過濾**：從數千家公司中精確篩選出 Dow 30 成份股，將數據量減少 99%，提升前端載入速度。
* **防重複寫入**：在寫入 CSV 前，腳本會先掃描現有數據，確保同一交易日的數據不會被重複記錄。

### 2. 歷史數據補回 (Backfilling)
針對過去一年的歷史數據，開發了專用的 \`backfill.py\`：
* **交易日檢查**：自動跳過週末與節假日，節省 API 調用次數。
* **速率限制處理**：針對免費版 API 每分鐘 5 次的限制，加入動態休眠 (\`time.sleep\`) 機制。

### 3. 自動化排程 (Automation)
利用 **GitHub Actions** 實現真正的 Serverless 運行。
* **Cron Job**：設定為在美股收盤後定時抓取。
* **Git-as-a-DB**：將 GitHub 倉庫作為輕量級數據庫，數據以 CSV 格式存儲於 \`main\` 分支，確保前端能通過 Raw URL 即時讀取。

## 數據可視化
前端使用 **React + Recharts + PapaParse** 進行開發：
* **數據流**：\`GitHub Raw CSV\` -> \`PapaParse (JSON)\` -> \`Recharts (LineChart)\`。
* **交互性**：用戶可以通過下拉選單切換不同的股票代碼 (Ticker)，即時渲染該公司的股價走勢。`},
{ type: 'stock_dashboard', value: '' },
    ]
  },


];


