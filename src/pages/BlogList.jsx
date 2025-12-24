import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react'; // 引入 ArrowRight 替代純文字箭頭
import { posts } from '../data/posts';

const BlogList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const sortedPosts = [...posts].sort((a, b) => {
    return new Date(b.date.replace(/\./g, '-')) - new Date(a.date.replace(/\./g, '-'));
  });

  const filteredPosts = sortedPosts.filter(post => {
    const title = post.title.toLowerCase();
    const desc = post.desc.toLowerCase();
    const query = searchQuery.toLowerCase();
    return title.includes(query) || desc.includes(query);
  });

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 transition-colors duration-500">
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-white mb-8 tracking-tight">
          所有文章
        </h1>
        
        {/* 搜尋框: 加上 dark 樣式 */}
        <div className="relative group">
          <Search 
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-400 transition-colors" 
            size={20} 
          />
          <input 
            type="text" 
            placeholder="搜尋文章標題或內容..." 
            className="w-full pl-14 pr-6 py-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] shadow-sm dark:shadow-none text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-4 focus:ring-rose-100 dark:focus:ring-rose-900/20 focus:border-rose-300 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {searchQuery && (
          <p className="mt-6 text-sm text-slate-400 dark:text-slate-500 font-medium">
            找到 {filteredPosts.length} 篇關於「<span className="text-rose-400">{searchQuery}</span>」的文章
          </p>
        )}
      </div>

      <div className="space-y-10">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            /* 文章卡片: 增加深色模式背景與邊框 */
            <article 
              key={post.id} 
              className="group relative bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[2.5rem] border border-slate-50 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-4 py-1 bg-sky-50 dark:bg-sky-500/10 text-sky-500 dark:text-sky-400 text-xs font-black rounded-full uppercase tracking-widest">
                      {post.category}
                    </span>
                    <span className="text-slate-400 dark:text-slate-500 text-sm font-medium">{post.date}</span>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white group-hover:text-rose-400 transition-colors mb-4 leading-tight">
                    <Link to={`/post/${post.id}`}>{post.title}</Link>
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-lg font-light">
                    {post.desc}
                  </p>
                </div>

                {/* 右側箭頭按鈕 */}
                <Link 
                  to={`/post/${post.id}`}
                  className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 group-hover:bg-rose-400 group-hover:text-white group-hover:rotate-[-45deg] transition-all duration-500 flex-shrink-0"
                >
                  <ArrowRight size={24} />
                </Link>
              </div>
            </article>
          ))
        ) : (
          /* 找不到內容時的空狀態 */
          <div className="text-center py-24 bg-slate-50/50 dark:bg-slate-900/50 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
            <p className="text-slate-400 dark:text-slate-600 italic text-lg font-light">
              找不到相符的文章，試試其他關鍵字吧！
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;