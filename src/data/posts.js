export const posts = [
  {
    id: 1,
    title: "莫蘭迪色系在 UI 中的運用",
    date: "2024.03.20",
    category: "Design",
    desc: "探討如何使用柔和的色彩提升網頁的質感與閱讀體驗...",
    sections: [
      { type: 'text', value: "這裡可以寫很長的文章內容...（支援 HTML 標籤或純文字）"},
    ]
  },
  {
    id: 2,
    title: "React 效能優化的三個實戰技巧",
    date: "2024.03.18",
    category: "Tech",
    desc: "為什麼你的 React App 變慢了？讓我們來看看如何優化...",
    sections: [
      { type: 'text', value: "這是第二篇文章的內容... "},
    ]
  },
  // 💡 以後想加文章，直接在這裡複製貼上一個新的物件即可！
  {
    id: 3,
    title: "我的第三篇部落格文章",
    date: "2024.03.21",
    category: "Life",
    desc: "這是我透過手動增加資料方式新增的文章。",
    sections: [
      { type: 'text', value: "今天天氣真好，我學會了如何管理 React 資料。"},
    ]
  },
  {
    id: 4,
    title: "我的數據分析專案",
    date: "2025.12.23",
    category: "Data",
    desc: "這篇文章展示了如何使用 Power BI 進行銷售數據視覺化。",
    // 💡 將內容拆分為不同類型的區塊
    sections: [
      { type: 'text', value: "首先，這是我們在專案中拍攝的分析圖表：" },
      { type: 'image', value: "/../../public/images/IMG_7299.jpeg", caption: "數據清洗流程圖" },
      { type: 'text', value: "接下來是動態的 Power BI 報告，你可以直接在下方操作：" },
      { 
        type: 'powerbi', 
        value: "https://app.powerbi.com/reportEmbed?reportId=d983e051-913f-4e5a-9f7b-437b7bcf55bf&autoAuth=true&ctid=60e0c9ef-8288-4ed8-9f76-989307f391fd&actionBarEnabled=true" // 👈 貼上你的 Power BI 公開嵌入連結
      },
    ]
  }
];