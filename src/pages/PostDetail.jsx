// src/pages/PostDetail.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { posts } from '../data/posts';
import { ArrowLeft, Maximize2 } from 'lucide-react';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find(p => p.id === parseInt(id));

  if (!post) return <div className="text-center py-20">文章不存在</div>;

  return (
    /* 1. 外層容器設為 95% 視窗寬度，幾乎佔滿全螢幕 */
    <div className="w-full max-w-[95vw] mx-auto px-2 md:px-6">
      
      <div className="max-w-4xl mx-auto mb-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-rose-400 transition-soft font-medium">
          <ArrowLeft size={20} /> 返回列表
        </button>
      </div>

      <article className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden pb-20">
        
        {/* 標題區域：依然保持置中，方便閱讀 */}
        <header className="pt-16 pb-12 px-6 text-center max-w-4xl mx-auto">
          <span className="px-4 py-1.5 bg-rose-50 text-rose-400 rounded-full text-xs font-black uppercase tracking-[0.2em]">
            {post.category}
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-slate-800 mt-8 mb-6 leading-[1.1] tracking-tight">
            {post.title}
          </h1>
          <p className="text-slate-400 text-lg font-medium">{post.date}</p>
        </header>

        <div className="flex flex-col items-center w-full">
          {post.sections.map((section, index) => {
            
            // --- 文字區塊：限制在 850px 寬度以保證閱讀舒適度 ---
            if (section.type === 'text') {
              return (
                <div key={index} className="w-full max-w-3xl px-6 my-6">
                  <p className="text-slate-600 leading-relaxed text-xl md:text-2xl font-light">
                    {section.value}
                  </p>
                </div>
              );
            }
            
            // --- Power BI 區塊：震撼的全屏展示 ---
            if (section.type === 'powerbi') {
              return (
                <div key={index} className="w-full px-4 md:px-10 my-16">
                  <div className="group relative w-full aspect-video md:aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] ring-1 ring-slate-200">
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
              return (
                <div key={index} className="w-full max-w-6xl px-6 my-12">
                  <img src={section.value} className="w-full rounded-[2.5rem] shadow-xl" alt={section.caption} />
                  {section.caption && <p className="text-center text-slate-400 mt-4 italic">{section.caption}</p>}
                </div>
              );
            }
            return null;
          })}
        </div>
      </article>
      
      <div className="h-20"></div>
    </div>
  );
};

export default PostDetail;