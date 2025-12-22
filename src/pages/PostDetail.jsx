import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-rose-400 mb-10 transition-colors">
        <ArrowLeft size={20} /> 返回
      </button>
      
      <article>
        <header className="mb-12">
          <span className="text-sky-400 font-bold text-sm uppercase">Article #{id}</span>
          <h1 className="text-4xl font-extrabold text-slate-800 mt-4 mb-6">如何構建現代化 Web 應用</h1>
          <p className="text-slate-400">發布於 2024 年 3 月 20 日 · 閱讀時間 5 分鐘</p>
        </header>

        <div className="prose prose-slate lg:prose-xl text-slate-600 leading-loose space-y-6">
          <p>這是一篇測試文章的內容區域。在這裡你可以使用 Markdown 或純文字來填充你的部落格內容。</p>
          <div className="bg-slate-100 p-8 rounded-2xl italic">
            「簡約不是少，而是剛剛好。」
          </div>
          <p>透過 Tailwind CSS，我們可以非常輕鬆地控制排版與留白，讓閱讀體驗變得更舒適。</p>
        </div>
      </article>
    </div>
  );
};

export default PostDetail;