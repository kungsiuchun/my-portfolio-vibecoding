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


{ 
    id: 6,
    title: "進階自動化估值管線：增量更新與多維度歷史 PE 帶狀模型",
    date: "2026.01.13",
    category: "Tech",
    githubUrl: "https://github.com/kungsiuchun/ValuationCalculation",
    desc: "開發一個結合 FMP 財報數據與 Yahoo Finance 股價的自動化系統，透過 Python 實現 TTM 指標轉換、線性插值對齊及 GitHub Actions 增量數據保護。",
    sections: [
      { type: 'image', value: "images/post_6_python_workflow.png", caption: "GitHub Actions Workflow Diagram" },
      { 
        type: 'text', 
        value: `
          <h3>技術背景與挑戰</h3>
          <p>在建立美股自動化估值系統時，我們面臨兩個核心挑戰：<b>數據頻率不對稱</b>（季度財報 vs 每日股價）以及 <b>API 數據限制</b>（FMP 免費版僅提供 5 年歷史數據）。本項目透過 Data Engineering 技巧優化了數據流水線，實現了精確的歷史估值建模。</p>
        ` 
      },
      { 
        type: 'markdown', 
        value:
`
## 核心數據流水線 (Data Pipeline)

### 1. 增量更新策略 (Incremental Update)
為了解決 FMP API 僅回傳最近 5 年數據的限制，我們實施了 **"Read-Merge-Write"** 策略：
* **邏輯**：腳本在發起 API 請求前先讀取本地緩存，將新抓取的數據與舊歷史數據按 \`date\` 進行合併去重。
* **價值**：確保 5 年前的珍貴歷史數據不會被新數據覆蓋，使系統具備「時間累積」能力。

### 2. 數據平滑與對齊 (Data Alignment)
財報是每三個月發布一次，這會導致估值圖表出現不自然的斷層。我們採用了 **線性插值 (Linear Interpolation)**：
* **處理**：將季度指標（如 EPS TTM）像「拉拉麵」一樣，平滑地填充到每一天的股價旁。
* **效果**：估值帶（Valuation Bands）隨日期流暢移動，消除了財報發布日的視覺衝擊。

### 3. 多維度滾動估值模型 (Rolling Bands)
系統動態合成歷史 PE/PS 曲線，並提供多個時間窗口的參考：
* **1Y / 3Y / 5Y Rolling**：反映市場在不同週期的估值偏好。
* **拆股修正 (Split Adjustment)**：透過 \`adj_ratio\` 動態修正歷史指標，確保像 AMZN 這種發生過拆股的股票，其歷史數據與現價量級完全匹配。
`
      },
      { 
        type: 'markdown', 
        value:
`
## CI/CD 自動化架構

我們利用 **GitHub Actions** 實現了完全無人值守的運維：
* **環境隔離**：使用 Python 3.11 環境以支援最新的類型標註與 \`yfinance\` 語法。
* **數據持久化**：Pipeline 執行完畢後，會自動將更新後的 \`fmp_cache\` 與 \`results\` 提交回 GitHub 倉庫。
* **健壯性檢查**：內置 \`git diff\` 判斷，避免在休市日產生無意義的空白 Commit。
`
      },

      { 
        type: 'markdown', 
        value:
`
> **Q1: 財務指標是季度更新，但股價是每日更新，兩者如何對齊？**
>
> **A:** 這是透過 **「線性插值 (Linear Interpolation)」** 實現的。
>
> * **邏輯**：如果 Q3 EPS 是 2.1，Q4 是 2.9，腳本不會讓指標在三個月內停留在 2.1 然後突然跳到 2.9（階梯狀）。相反，它會根據日期比例計算每日增量，讓指標平滑地從 2.1 增長到 2.9。
> * **意義**：這消除了財報發布日的「斷層」，讓估值帶 (Valuation Bands) 的移動更加流暢，能更真實地反映股價相對於盈利趨勢的變動。
---

> **Q2: 不同的 Rolling Window (1Y, 3Y, 5Y) 代表什麼意義？**
>
> **A:** 它們代表了不同長度的 **「歷史濾鏡」**。
>
> * **1Y (近期)**：反映市場近期的脾氣，適合快速成長或變動劇烈的個股。
> * **5Y (長期)**：代表公司的價值中樞。
> * **核心邏輯**：不論選擇哪個窗口，財務指標基礎都是一樣的，改變的是「歷史平均倍數」。這讓投資者能一眼看出目前的股價是處於「近期」還是「長期」的歷史低位。
---

> **Q3: 腳本如何處理「拆股 (Stock Splits)」造成的數據斷層？**
>
> **A:** 透過 **'adj_ratio'** 邏輯。
>
> * **原理**：腳本計算 'yfinance' 的 'Adj Close' 與 'Close' 的比例。如果公司發生拆股（如 AMZN 在 2022 年 1 拆 20），這個比例會劇烈變化。
> * **應用**：腳本會將這個比例應用到 FMP 的原始財務指標上，確保 2022 年之前的 EPS 會被自動縮小 20 倍，從而與現在的股價量級完美對齊。

`
      },

      { 
        type: 'text', 
        value: `
          <h3>專案成果</h3>
          <p>透過這套管線，前端展示不僅僅是靜態的股價圖，而是包含了 5 條動態估值線（±1σ, ±2σ）的專業級分析工具。它能幫助投資者一眼辨別目前股價是處於「近期」還是「長期」的歷史估值窪地。</p>
        ` 
      },
      { type: 'valuation_chart', value: '' },
    ]
  },


  { 
    id: 7,
    title: "BI 級美股財報分析儀表板：從數據架構到投資決策可視化",
    date: "2026.01.18",
    category: "Data",
    desc: "深入探討如何構建一個專業級的財報分析工具，結合資本效率、風險評估與營運能力三大維度，將複雜的財務數據轉化為直觀的投資信號。",
    sections: [
      { 
        type: 'text', 
        value: `
          <h3>開發目標：超越單一指標的分析</h3>
          <p>傳統的財報工具往往只展示營收或股價，這對深度投資者來說是不夠的。本專案的目標是開發一個 <b>2x2 策略矩陣儀表板</b>，讓用戶能同時觀察公司的獲利護城河（ROIC）、現金流分配策略、財務穩定性（D/E Ratio）以及營運效率（Asset Turnover）。</p>
        ` 
      },
      { 
        type: 'markdown', 
        value:
`
## 核心技術實現細節

### 1. 數據增強層 (Enrichment Layer)
原始的 JSON 數據僅包含基礎科目，我們在前端實施了動態計算邏輯來生成關鍵投資指標：
* **ROIC (投入資本回報率)**：計算公式為 \`Net Income / (Total Debt + Equity - Cash)\`。這是衡量管理層配置資本能力的最高標準。
* **股東回報 (Shareholder Returns)**：整合 \`Dividends\` 與 \`Buybacks\`，並與 **Free Cash Flow** 對標，判斷派息與回購的永續性。
* **線性平滑處理**：為了確保圖表中的趨勢線（Line Charts）不產生劇烈斷層，我們對比了移動平均趨勢，確保長期投資信號的清晰度。

### 2. BI 可視化策略
針對不同性質的數據，採用了特定的圖表類型與座標軸配置：
* **雙 Y 軸配置 (Dual Axis)**：在「營運能力」圖表中，將「數千億美元的營收（Bar）」與「0 到 1 之間的資產週轉率（Line）」放在同一圖表但不同 Y 軸上，解決了數量級差異導致的趨勢扁平化問題。
* **風險預警色塊**：在「債務風險」圖表中使用紅色 Area Chart 標註負債比例，並設置 \`ReferenceLine\` (Current Ratio = 1.0) 作為流動性安全警戒線。

### 3. UI/UX 與專業術語辭典 (Glossary)
為了降低使用門檻，系統內置了財務術語辭典，解釋每個指標的計算方式與投資意義。
* **2x2 Grid 佈局**：在桌面端採用兩欄兩列設計，最大化水平空間，讓投資者能輕鬆辨識週期性趨勢。
* **Morandi 色系**：延用莫蘭迪色調減少視覺疲勞，讓長時段的數據研究更加專注。
`
      },
      { 
        type: 'markdown', 
        value:
`
## 投資決策視角：如何閱讀此儀表板？

> **獲利能力 (Profitability)**
> 如果 **ROIC** 長期穩定在 15% 以上，說明公司具備強大的「護城河」或定價權。
---
> **資本分配 (Capital Allocation)**
> 當藍色的 **Free Cash Flow** 線條低於回購與派息的柱狀圖時，需警惕公司是否在舉債分紅。
---
> **營運執行力 (Operations)**
> **Asset Turnover (資產週轉率)** 的上升代表管理層在不增加額外資產的情況下創造了更多營收，是典型的「輕資產成長」信號。
`
      },
      { 
        type: 'text', 
        value: `
          <h3>專案成果</h3>
          <p>最終成品不只是一個顯示數字的表格，而是一個具備「分析深度」的診斷工具。它能幫助投資者在幾秒鐘內判斷一家公司是在「高質量成長」，還是僅僅依靠財務槓桿支撐表象。</p>
        ` 
      },
      { type: 'earning_dashboard', value: '' }, // 👈 對應你開發的 React 組件名稱
    ]
  },
];


