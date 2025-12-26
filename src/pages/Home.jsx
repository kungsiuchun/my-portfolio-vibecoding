import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { posts } from '../data/posts';
import FireWriting from '../components/FireWriting';

const Home = () => {
  const featuredPosts = [...posts]
    .sort((a, b) => new Date(b.date.replace(/\./g, '-')) - new Date(a.date.replace(/\./g, '-')))
    .slice(0, 2);

  return (
    /* 這裡加上 max-w-6xl 並 mx-auto，確保首頁內容在寬螢幕下依然置中且優雅 */
    <div className="max-w-6xl mx-auto space-y-32 py-12 transition-colors duration-500">
      
      {/* Hero Section */}
      <section className="px-6 text-center">
        <FireWriting text="VIBE" />
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-800 dark:text-white mb-8 tracking-tight mt-12">
          {/* Updated to English: "Writing is for better thinking" */}
          Writing to <span className="text-sky-400">Think</span> Better.
        </h1>
        <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
          {/* Updated to English: Description of your digital garden */}
          Welcome to my digital garden. I share insights on React development, UI/UX design, and my journey through the world of code.
        </p>
      </section>

      {/* Featured Posts Section */}
      <section className="px-6">
        <div className="flex items-center justify-between mb-12">
          {/* Updated to English: "Featured Posts" */}
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">Featured Posts</h2>
          <Link to="/blog" className="text-rose-400 hover:text-rose-500 font-semibold flex items-center gap-1 group">
            {/* Updated to English: "View All" */}
            View All <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* 增加卡片間距 Gap 到 12，給予更多呼吸空間 */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {featuredPosts.map(post => (
            <article 
              key={post.id} 
              className="group bg-white dark:bg-slate-900/50 p-8 md:p-12 rounded-[3rem] border border-slate-50 dark:border-slate-800/50 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-4 mb-8">
                  <span className="px-4 py-1.5 bg-rose-50 dark:bg-rose-500/10 text-rose-400 text-xs font-black uppercase tracking-widest rounded-full">
                    {post.category}
                  </span>
                  <span className="text-slate-400 dark:text-slate-500 text-sm font-medium">{post.date}</span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-6 group-hover:text-rose-400 transition-colors leading-tight">
                  <Link to={`/post/${post.id}`}>{post.title}</Link>
                </h3>
                
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-10 flex-grow text-lg font-light">
                  {post.desc}
                </p>

                <Link 
                  to={`/post/${post.id}`}
                  className="text-slate-800 dark:text-slate-200 font-bold inline-flex items-center gap-2 group-hover:gap-4 transition-all"
                >
                  {/* Updated to English: "Read More" */}
                  Read More <ArrowRight size={20} className="text-rose-400" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      
      {/* 底部裝飾 */}
      <div className="pb-20"></div>
    </div>
  );
};

export default Home;