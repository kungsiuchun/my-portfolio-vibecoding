// src/pages/PostDetail.jsx
import { useState, useEffect } from 'react'; // ✅ Fix: Added useEffect
import { useParams, useNavigate } from 'react-router-dom';
import { posts } from '../data/posts';
import { ArrowLeft, Maximize2, FileText, X, Share2 } from 'lucide-react'; 
import ReactMarkdown from 'react-markdown';
import CommentSystem from '../components/CommentSystem';
import SEO from '../components/SEO';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeDoc, setActiveDoc] = useState("");
  const [showToast, setShowToast] = useState(false);

  // ✅ Use loose comparison or string conversion to avoid type mismatch
  const post = posts.find(p => p.id.toString() === id);

  // ✅ Toast auto-close logic
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleShare = async () => {
    const shareData = {
      title: post.title,
      text: post.desc,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setShowToast(true);
    }
  };

  if (!post) return <div className="text-center py-20 dark:text-white">Post not found</div>;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 transition-colors duration-500 article-content-loaded">
      <SEO 
        title={post.title} 
        description={post.desc} 
        image={post.coverImage} 
        article={true}
      />

      {/* ✅ Corrected Toast Component */}
      <div 
        className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[110] transition-all duration-500 transform ${
          showToast ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-800 dark:border-slate-200">
          <div className="w-2 h-2 rounded-full bg-rose-400 animate-pulse"></div>
          <span className="text-sm font-bold">Link copied to clipboard!</span>
        </div>
      </div>

      {/* Documentation Drawer */}
      <div className={`fixed inset-y-0 right-0 w-full md:w-[450px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl z-[100] shadow-2xl transform transition-transform duration-500 ease-in-out border-l border-slate-200 dark:border-slate-800 ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full flex flex-col p-8">
          <div className="flex items-center justify-between mb-8 flex-shrink-0">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <FileText className="text-rose-400" /> Documentation
            </h3>
            <button onClick={() => setIsDrawerOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
              <X className="dark:text-white" size={24} />
            </button>
          </div>
          <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar prose prose-slate dark:prose-invert">
            <ReactMarkdown>{activeDoc}</ReactMarkdown>
          </div>
        </div>
      </div>

      {/* Header Actions */}
      <div className="mb-6 mt-6">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-slate-400 hover:text-rose-400 transition-all font-medium"
        >
          <ArrowLeft size={20} /> Back to List
        </button>
      </div>

      {/* Main Article */}
      <article className="bg-white dark:bg-slate-900 rounded-[2.5rem] md:rounded-[4rem] shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden pb-20">
        <header className="pt-20 pb-12 px-6 text-center max-w-4xl mx-auto">
          <span className="px-4 py-1.5 bg-rose-50 dark:bg-rose-500/10 text-rose-400 rounded-full text-xs font-black uppercase tracking-widest">
            {post.category}
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-slate-800 dark:text-white mt-8 mb-6 leading-tight">
            {post.title}
          </h1>
          <p className="text-slate-400 dark:text-slate-500 text-lg">{post.date}</p>
        </header>

        <div className="flex flex-col items-center w-full">
          {post.sections.map((section, index) => {
            if (section.type === 'text') {
              return (
                <div key={index} className="w-full max-w-3xl px-6 my-6">
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xl md:text-2xl font-light">
                    {section.value}
                  </p>
                </div>
              );
            }
            
            if (section.type === 'powerbi') {
              return (
                <div key={index} className="w-full px-4 md:px-10 my-16">
                  <div className="max-w-7xl mx-auto mb-4 flex justify-end">
                    <button 
                      onClick={() => {
                        setActiveDoc(section.doc || "Technical documentation not available yet.");
                        setIsDrawerOpen(true);
                      }}
                      className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl hover:bg-rose-400 dark:hover:bg-rose-400 transition-all shadow-lg font-bold text-sm"
                    >
                      <FileText size={18} /> View Technical Details
                    </button>
                  </div>
                  <div className="relative w-full aspect-video md:aspect-[21/9] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl ring-1 ring-slate-200 dark:ring-slate-700 bg-slate-50 dark:bg-slate-800">
                    <iframe
                      title="Power BI Dashboard"
                      className="absolute top-0 left-0 w-full h-full"
                      src={section.value}
                      allowFullScreen={true}
                    ></iframe>
                  </div>
                </div>
              );
            }

            if (section.type === 'image') {
              const imgSrc = section.value.startsWith('http') 
                ? section.value 
                : `${import.meta.env.BASE_URL}${section.value.replace(/^\//, '')}`;

              return (
                <div key={index} className="w-full max-w-5xl px-6 my-12">
                  <img src={imgSrc} className="w-full rounded-[2.5rem] shadow-xl border border-transparent dark:border-slate-800" alt={section.caption} />
                  {section.caption && <p className="text-center text-slate-400 mt-6 italic">{section.caption}</p>}
                </div>
              );
            }
            return null;
          })}
        </div>

        {/* Share Button Section */}
        <div className="flex flex-col items-center justify-center mt-20 px-6">
           <div className="w-24 h-px bg-slate-100 dark:bg-slate-800 mb-12"></div>
           <button 
             onClick={handleShare}
             className="group flex items-center gap-3 px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full hover:bg-rose-400 dark:hover:bg-rose-400 hover:text-white dark:hover:text-white transition-all shadow-xl font-black uppercase tracking-widest text-sm"
           >
             <Share2 size={20} className="group-hover:rotate-12 transition-transform" />
             Share Insights
           </button>
        </div>
      </article>

      {/* Discussion Section */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-100 dark:border-slate-800 shadow-xl">
          <h3 className="text-2xl font-bold mb-10 flex items-center gap-4 dark:text-white">
            <span className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl">💬</span>
            Discussion
          </h3>
          <CommentSystem />
        </div>
      </section>

      {isDrawerOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90] transition-opacity" onClick={() => setIsDrawerOpen(false)}></div>
      )}
    </div>
  );
};

export default PostDetail;