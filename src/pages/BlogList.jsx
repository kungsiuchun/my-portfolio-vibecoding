import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const BlogList = () => {
  // 模擬文章資料
  const allPosts = [
    { id: 1, title: "如何打造簡約美感的前端介面", date: "2024.03.15", category: "Design", desc: "探討莫蘭迪色系與圓角設計在現代網頁中的應用..." },
    { id: 2, title: "React 18 與 Vite 的完美結合", date: "2024.03.10", category: "Tech", desc: "為什麼現代前端開發者應該全面轉向 Vite？" },
    { id: 3, title: "Tailwind CSS 最佳實踐", date: "2024.03.05", category: "Coding", desc: "如何保持 HTML 整潔並同時享受原子化 CSS 的便利。" },
  ];

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-6">所有文章</h1>
        
        {/* 搜尋框 */}
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-400 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="搜尋文章關鍵字..." 
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-100 focus:border-rose-300 transition-all"
          />
        </div>
      </div>

      <div className="space-y-8">
        {allPosts.map(post => (
          <article key={post.id} className="group relative bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-soft">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
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
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-50 text-slate-400 group-hover:bg-rose-400 group-hover:text-white transition-all"
              >
                →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogList;