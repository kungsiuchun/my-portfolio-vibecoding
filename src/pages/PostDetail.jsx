// src/pages/PostDetail.jsx
import { useState } from 'react'; // 💡 引入 useState
import { useParams, useNavigate } from 'react-router-dom';
import { posts } from '../data/posts';
import { ArrowLeft, Maximize2, FileText, X } from 'lucide-react'; // 💡 引入新圖示
import ReactMarkdown from 'react-markdown';
import CommentSystem from '../components/CommentSystem'; // 引入組件

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // 💡 控制抽屜狀態
  const [activeDoc, setActiveDoc] = useState(""); // 💡 儲存當前顯示的文件內容

  const post = posts.find(p => p.id === parseInt(id));

  if (!post) return <div className="text-center py-20 dark:text-white">文章不存在</div>;

  return (
    <div className="w-full max-w-[95vw] mx-auto px-2 md:px-6 transition-colors duration-500">

      {/* 💡 技術文件側邊抽屜 */}
      <div className={`fixed inset-y-0 right-0 w-full md:w-[450px] bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl z-[100] shadow-2xl transform transition-transform duration-500 ease-in-out border-l border-slate-200 dark:border-slate-800 ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        <div className="h-full flex flex-col p-8">
          {/* 標題區域：固定在上方 */}
          <div className="flex items-center justify-between mb-8 flex-shrink-0">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <FileText className="text-rose-400" /> 技術文件說明
            </h3>
            <button onClick={() => setIsDrawerOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
              <X className="dark:text-white" size={24} />
            </button>
          </div>

          {/* 💡 內容區域：優化 Dark Mode 顏色與排版 */}
          <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
            <div className="prose prose-slate dark:prose-invert max-w-none text-left dark:text-white">
              <ReactMarkdown>
                {activeDoc}
              </ReactMarkdown>
            </div>
          </div>

        </div>
      </div>

      {/* 返回列表按鈕 */}
      <div className="max-w-4xl mx-auto mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-slate-400 hover:text-rose-400 dark:hover:text-rose-300 transition-all font-medium"
        >
          <ArrowLeft size={20} /> 返回列表
        </button>
      </div>

      {/* 文章主體卡片: 加上 dark:bg-slate-900 和 dark:border-slate-800 */}
      <article className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden pb-20 transition-all duration-500">
        
        {/* 標題區域 */}
        <header className="pt-16 pb-12 px-6 text-center max-w-4xl mx-auto">
          <span className="px-4 py-1.5 bg-rose-50 dark:bg-rose-500/10 text-rose-400 rounded-full text-xs font-black uppercase tracking-[0.2em]">
            {post.category}
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-slate-800 dark:text-white mt-8 mb-6 leading-[1.1] tracking-tight">
            {post.title}
          </h1>
          <p className="text-slate-400 dark:text-slate-500 text-lg font-medium">{post.date}</p>
        </header>

        <div className="flex flex-col items-center w-full">
          {post.sections.map((section, index) => {
            
            // --- 文字區塊 ---
            if (section.type === 'text') {
              return (
                <div key={index} className="w-full max-w-3xl px-6 my-6">
                  {/* 文字在深色模式下使用 slate-300，避免純白過於刺眼 */}
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xl md:text-2xl font-light">
                    {section.value}
                  </p>
                </div>
              );
            }
            
            // --- Power BI 區塊 ---
            if (section.type === 'powerbi') {
              return (
                <div key={index} className="w-full px-4 md:px-10 my-16">
                  
                  {/* 💡 增加技術文件切換按鈕 */}
                  <div className="max-w-8xl mx-auto mb-4 flex justify-end">
                    <button 
                      onClick={() => {
                        setActiveDoc(section.doc || "尚未提供技術文件。");
                        setIsDrawerOpen(true);
                      }}
                      className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl hover:bg-rose-400 dark:hover:bg-rose-400 transition-all shadow-lg font-bold text-sm"
                    >
                      <FileText size={18} /> 查看技術細節
                    </button>
                  </div>

                  {/* 外層容器增加 dark:ring-slate-700 和陰影調整 */}
                  <div className="group relative w-full aspect-video md:aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] ring-1 ring-slate-200 dark:ring-slate-700 bg-slate-50 dark:bg-slate-800">
                    <iframe
                      title="Power BI Dashboard"
                      className="absolute top-0 left-0 w-full h-full"
                      src={section.value}
                      frameBorder="0"
                      allowFullScreen={true}
                    ></iframe>
                    
                    {/* 右上角提示 */}
                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                       <span className="flex items-center gap-2 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm">
                         <Maximize2 size={16} /> 可在 Power BI 工具欄點擊全螢幕
                       </span>
                    </div>
                  </div>
                </div>
              );
            }

            // --- 圖片區塊 ---
            if (section.type === 'image') {
              // 處理圖片路徑適配 (之前討論過的 Base URL)
              const imgSrc = section.value.startsWith('http') 
                ? section.value 
                : `${import.meta.env.BASE_URL}${section.value.replace(/^\//, '')}`;

              return (
                <div key={index} className="w-full max-w-6xl px-6 my-12">
                  <img 
                    src={imgSrc} 
                    className="w-full rounded-[2.5rem] shadow-xl dark:shadow-rose-900/10 border border-transparent dark:border-slate-800" 
                    alt={section.caption} 
                  />
                  {section.caption && (
                    <p className="text-center text-slate-400 dark:text-slate-500 mt-6 italic">
                      {section.caption}
                    </p>
                  )}
                </div>
              );
            }
            return null;
          })}
        </div>
      </article>

    {/* 💡 留言系統區塊 */}
    <div className="max-w-4xl mx-auto px-6 mb-20 mt-20"> 
      {/* mt-20 拉開與文章的距離，讓頁面有呼吸感 */}
      
      <div className="
        /* 1. 基礎佈局與圓角 */
        rounded-[2.5rem] p-8 md:p-12 transition-all duration-500 border
        
        /* 2. Light Mode: 黑字白底 */
        bg-white text-slate-900 border-slate-100 shadow-xl
        
        /* 3. Dark Mode: 白字暗底 (使用稍淺的深色增加層次) */
        dark:bg-slate-900 dark:text-white dark:border-slate-800 
        dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)]
      ">
        
        {/* 標題區域 */}
        <h3 className="text-2xl font-bold mb-10 flex items-center gap-4">
          <span className="
            /* 裝飾性圖示背景 */ 
            p-3 rounded-2xl text-2xl
            shadow-sm
          ">
            💬
          </span>
          交流與討論
        </h3>
        
        {/* 留言系統本體 */}
        <div className="min-h-[250px] w-full">
          {/* 這裡確保 CommentSystem 內部不受外層 text-white 影響，通常 Giscus 會自帶主題 */}
          <CommentSystem />
        </div>
      </div>
    </div>

      {/* 底部填充空間 */}
      <div className="h-20"></div>

      {/* 💡 點擊背景關閉抽屜的遮罩 */}
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[90] transition-opacity" onClick={() => setIsDrawerOpen(false)}></div>
      )}
    </div>
  );
};

export default PostDetail;