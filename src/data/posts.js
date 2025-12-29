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
  }
];