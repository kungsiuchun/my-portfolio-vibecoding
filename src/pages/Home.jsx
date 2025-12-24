import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { posts } from '../data/posts'; // 引入資料

const Home = () => {
  const latestPosts = [...posts]
    .sort((a, b) => new Date(b.date.replace(/\./g, '-')) - new Date(a.date.replace(/\./g, '-')))
    .slice(0, 2); // 只取最新的前兩篇作為精選
  // const featuredPosts = [
  //   { id: 1, title: "如何打造簡約美感的前端介面", date: "2024.03.15", category: "Design" },
  //   { id: 2, title: "React 18 與 Vite 的完美結合", date: "2024.03.10", category: "Tech" },
  // ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <h1 className="text-5xl font-extrabold text-slate-800 mb-6 tracking-tight">
          寫作，是為了更好的 <span className="text-sky-400">思考</span>。
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
          這裡是我的數位花園。我分享關於 React 前端開發、UI/UX 設計以及那些在程式碼之外的生活瑣事。
        </p>
      </section>

      {/* Featured Posts */}
      <section>
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl font-bold text-slate-800">精選文章</h2>
          <Link to="/blog" className="text-rose-400 text-sm font-medium flex items-center gap-1 hover:underline">
            查看全部 <ArrowRight size={16} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {latestPosts.map(post => (
            <Link key={post.id} to={`/post/${post.id}`}>
              <div className="group bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-soft border border-slate-50">
                <span className="text-xs font-bold uppercase tracking-widest text-sky-400">{post.category}</span>
                <h3 className="text-xl font-bold mt-3 mb-4 group-hover:text-rose-400 transition-soft">{post.title}</h3>
                <p className="text-slate-400 text-sm">{post.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;