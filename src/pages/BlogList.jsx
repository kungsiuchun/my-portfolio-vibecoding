import React, { useState } from 'react'; // 1. 引入 useState
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { posts } from '../data/posts';

const BlogList = () => {
  // 2. 建立 search 狀態
  const [searchQuery, setSearchQuery] = useState("");

  // 3. 先進行排序 (最新日期在前)
  const sortedPosts = [...posts].sort((a, b) => {
    return new Date(b.date.replace(/\./g, '-')) - new Date(a.date.replace(/\./g, '-'));
  });

  // 4. 根據搜尋字串進行過濾
  const filteredPosts = sortedPosts.filter(post => {
    const title = post.title.toLowerCase();
    const desc = post.desc.toLowerCase();
    const query = searchQuery.toLowerCase();
    
    // 如果標題或簡介包含關鍵字，就顯示
    return title.includes(query) || desc.includes(query);
  });

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-6">所有文章</h1>
        
        {/* 搜尋框 */}
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-400 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="搜尋文章標題或內容..." 
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-100 focus:border-rose-300 transition-all"
            // 5. 綁定輸入事件
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* 顯示搜尋結果數量 */}
        {searchQuery && (
          <p className="mt-4 text-sm text-slate-400">
            找到 {filteredPosts.length} 篇關於「{searchQuery}」的文章
          </p>
        )}
      </div>

      <div className="space-y-8">
        {/* 6. 使用過濾後的 filteredPosts 進行渲染 */}
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <article key={post.id} className="group relative bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-sky-50 text-sky-500 text-xs font-bold rounded-full uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span className="text-slate-400 text-sm">{post.date}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 group-hover:text-rose-400 transition-colors mb-3">
                    <Link to={`/post/${post.id}`}>{post.title}</Link>
                  </h2>
                  <p className="text-slate-500 leading-relaxed">{post.desc}</p>
                </div>
                <Link 
                  to={`/post/${post.id}`}
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-50 text-slate-400 group-hover:bg-rose-400 group-hover:text-white transition-all flex-shrink-0"
                >
                  →
                </Link>
              </div>
            </article>
          ))
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
            <p className="text-slate-400 italic">找不到相符的文章...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;