import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Github, ArrowLeft, Maximize2, FileText, X, Share2, ChevronDown, BarChart3 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import React, { Suspense, lazy } from 'react';


// Components
import CommentSystem from '../components/CommentSystem';
import SEO from '../components/SEO';
import StockDashboard from '../components/StockDashboard';
import { posts } from '../data/posts';
// 將原本的 import ValuationChart from './ValuationChart' 改為：
const ValuationChart = lazy(() => import('../components/ValuationChart'));

// --- Sub-component for Cleaner Rendering ---
const PostSection = ({ section, onOpenDoc, onTrackBI, postTitle }) => {
    // 1. 定義你目前有 JSON 數據的股票列表
    const availableTickers = [
      "AAPL", "TSLA", "AMZN", "MSFT", "NVDA", "GOOGL", "META", "NFLX", 
      "PYPL", "SOFI", "HOOD", "WMT", "GE", "CSCO", "JNJ", "CVX", "PLTR",
      "UNH",  "TSM", "DIS", "COST", "INTC", "KO", "TGT", "NKE", "BA", 
      "SHOP", "SBUX", "ADBE"
  ]
    
    // 股票選擇狀態
    const [selectedTicker, setSelectedTicker] = useState("AAPL");

  switch (section.type) {
    case 'text':
      return (
        <div
          className="prose prose-slate dark:prose-invert max-w-none mb-12 w-full my-8 px-6 md:px-12 text-slate-600 dark:text-slate-300 text-lg md:text-xl font-light leading-relaxed"
          dangerouslySetInnerHTML={{ __html: section.value }}
        />
      );

    case 'markdown':
      return (
        <div className="w-full px-6 md:px-12 my-12">
          <div className="prose prose-slate dark:prose-invert max-w-4xl mx-auto px-6 py-10">
            <ReactMarkdown>{section.value}</ReactMarkdown>
          </div>
        </div>
      );

    case 'stock_dashboard':
      return (
        <div className="w-full max-w-5xl px-6 my-12">
          <StockDashboard />
        </div>
      );

case 'valuation_chart':

      return (

        <div className="w-full max-w-6xl px-6 my-12">
            {/* 📈 Valuation Chart Section */}
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sky-500 font-bold text-sm uppercase tracking-widest">
                  <BarChart3 size={18} />
                  <span>Valuation Research</span>
                </div>
                <h2 className="text-4xl font-black text-slate-800 dark:text-white tracking-tighter">
                  Market Intelligence
                </h2>
                <p className="text-slate-500 dark:text-slate-400 font-light max-w-md">
                  Automated data pipeline: <span className="text-slate-800 dark:text-slate-200 font-medium">FMP API + Pandas</span>.
                  Visualizing relative valuation bands for long-term edge.
                </p>
              </div>
            
              {/* 🚀 優化後的 Dropdown Selector */}
              <div className="relative min-w-[160px]">
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 ml-1">Symbol Selection</label>
                <div className="relative group">
                  <select
                    value={selectedTicker}
                    onChange={(e) => setSelectedTicker(e.target.value)}
                    className="w-full appearance-none bg-white dark:bg-slate-800 text-slate-800 dark:text-white px-5 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 font-bold text-lg shadow-sm hover:border-sky-400 dark:hover:border-sky-500 transition-all cursor-pointer focus:outline-none focus:ring-4 focus:ring-sky-500/10"
                  >
              {availableTickers.map((t) => (
                <option key={t} value={t} className="bg-white dark:bg-slate-900">{t}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-sky-500 pointer-events-none transition-colors" size={24} />
          </div>
        </div>
      </div>
      <Suspense fallback={<div>Loading Chart...</div>}>
            <ValuationChart ticker={selectedTicker} />
      </Suspense>
    </div>
  );

    case 'powerbi':
      return (
        <div className="w-full px-4 md:px-10 my-16">
          <div className="max-w-8xl mx-auto mb-4 flex justify-end">
            <button
              onClick={() => onOpenDoc(section.doc)}
              className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl hover:bg-rose-400 dark:hover:bg-rose-400 transition-all shadow-lg font-bold text-sm"
            >
              <FileText size={18} /> View Technical Details
            </button>
          </div>
          <div className="group relative w-full aspect-video md:aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-2xl ring-1 ring-slate-200 dark:ring-slate-700 bg-slate-50 dark:bg-slate-800">
            <iframe
              title="Power BI Dashboard"
              className="absolute inset-0 w-full h-full"
              src={section.value}
              allowFullScreen
              onLoad={() => onTrackBI(postTitle)}
            />
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="flex items-center gap-2 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm">
                <Maximize2 size={16} /> Toggle Full Screen
              </span>
            </div>
          </div>
        </div>
      );

    case 'image':
      const imgSrc = section.value.startsWith('http')
        ? section.value
        : `${import.meta.env.BASE_URL}${section.value.replace(/^\//, '')}`;
      return (
        <div className="w-full max-w-5xl px-6 my-12 text-center">
          <img src={imgSrc} alt={section.caption} className="w-full rounded-[2.5rem] shadow-xl border dark:border-slate-800" />
          {section.caption && <p className="text-slate-400 mt-6 italic">{section.caption}</p>}
        </div>
      );

    default:
      return null;
  }
};

// --- Main Component ---
const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeDoc, setActiveDoc] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const showToast = toastMsg !== "";

  const post = posts.find(p => p.id.toString() === id);

  // 1. Analytics & Actions
  const trackPowerBIInteraction = useCallback((reportTitle) => {
    if (window.gtag) {
      window.gtag('event', 'view_powerbi', {
        event_category: 'Engagement',
        event_label: reportTitle || ' Dashboard',
        value: 1
      });
    }
  }, []);

  const handleShare = async () => {
    // console.log("Share button clicked"); // Debug 用

    if (window.gtag) {
      window.gtag('event', 'share_attempt', { post_title: post.title });
    }

    if (navigator.share) {
      try {
        await navigator.share({ title: post.title, url: window.location.href });
        // Log 分享成功 console.log("Web Share API successful"); 
        
        setToastMsg("Link shared successfully!");
        
        window.gtag?.('event', 'share_completed', { 
          post_title: post.title,
          method: 'web_share' 
        });

      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error("Share failed:", err);
        }
      }
    } else {
      // 桌面端或不支援 Web Share 的瀏覽器
      try {
        await navigator.clipboard.writeText(window.location.href);
        // console.log("Copied to clipboard successfully"); // Log 複製成功
        
        setToastMsg("Link copied to clipboard!");
        
        window.gtag?.('event', 'share_completed', { 
          post_title: post.title, 
          method: 'clipboard' 
        });
      } catch (err) {
        // console.error("Clipboard copy failed:", err);
      }
    }
  };

  // 2. Lifecycle
  useEffect(() => {
    if (toastMsg) {
      const timer = setTimeout(() => setToastMsg(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMsg]);

  if (!post) return <div className="text-center py-20 dark:text-white">Post not found</div>;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 transition-colors duration-500">
      <SEO title={post.title} description={post.desc} image={post.coverImage} article />

      {/* Toast Notification */}
      <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] transition-all duration-500 transform ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-800 dark:border-slate-200">
          <div className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
          <span className="text-sm font-bold">{toastMsg}</span>
        </div>
      </div>

      {/* Documentation Drawer */}
      <aside className={`fixed inset-y-0 right-0 w-full md:w-[450px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl z-[100] shadow-2xl transform transition-transform duration-500 border-l border-slate-200 dark:border-slate-800 ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full flex flex-col p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold dark:text-white flex items-center gap-2">
              <FileText className="text-rose-400" /> Documentation
            </h3>
            <button onClick={() => setIsDrawerOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
              <X className="dark:text-white" size={24} />
            </button>
          </div>
          <div className="flex-grow overflow-y-auto custom-scrollbar prose prose-slate dark:prose-invert">
            <ReactMarkdown>{activeDoc || "No technical documentation available."}</ReactMarkdown>
          </div>
        </div>
      </aside>

      {/* Header Actions */}
      <div className="mb-6 mt-6 flex justify-between items-center">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-slate-400 hover:text-rose-400 transition-all font-medium"
        >
          <ArrowLeft size={20} /> Back to List
        </button>

        {/* ✅ 新增：如果有 githubUrl 就顯示按鈕 */}
        {post.githubUrl && (
          <a 
            href={post.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all text-sm font-medium border border-slate-700"
          >
            <Github size={18} /> View Source Code
          </a>
        )}
      </div>

      {/* Main Article */}
      <article className="bg-white dark:bg-slate-900 rounded-[2.5rem] md:rounded-[4rem] shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden pb-20">
        <div className="pt-20 pb-12 px-6 text-center max-w-4xl mx-auto">
          <span className="px-4 py-1.5 bg-rose-50 dark:bg-rose-500/10 text-rose-400 rounded-full text-xs font-black uppercase tracking-widest">
            {post.category}
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-slate-800 dark:text-white mt-8 mb-6 leading-tight">
            {post.title}
          </h1>
          <p className="text-slate-400 dark:text-slate-500 text-lg">{post.date}</p>
        </div>

        <div className="flex flex-col items-center w-full">
          {post.sections.map((section, idx) => (
            <PostSection 
              key={idx} 
              section={section} 
              postTitle={post.title}
              onTrackBI={trackPowerBIInteraction}
              onOpenDoc={(doc) => { setActiveDoc(doc); setIsDrawerOpen(true); }}
            />
          ))}
        </div>

        {/* 你也可以在文章末尾再放一個更大的 GitHub Call-to-action */}
        {post.githubUrl && (
          <div className="mt-16 px-6 md:px-12">
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-8 border border-dashed border-slate-200 dark:border-slate-700 text-center">
              <Github className="mx-auto mb-4 text-slate-400" size={40} />
              <h3 className="text-xl font-bold dark:text-white mb-2">想查看完整原始碼嗎？</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6">這個專案的 Python 腳本與 Workflow 設定皆已開源在 GitHub。</p>
              <a 
                href={post.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold hover:scale-105 transition-transform"
              >
                探索 GitHub Repository
              </a>
              
            </div>
          </div>
        )}

        {/* Share Action */}
        <footer className="flex flex-col items-center justify-center mt-20 px-6">
          <div className="w-24 h-px bg-slate-100 dark:bg-slate-800 mb-12" />
          <button 
            onClick={handleShare}
            className="group flex items-center gap-3 px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full hover:bg-rose-400 dark:hover:bg-rose-400 hover:text-white dark:hover:text-white transition-all shadow-xl font-black uppercase tracking-widest text-sm"
          >
            <Share2 size={20} className="group-hover:rotate-12 transition-transform" />
            Share Insights
          </button>
        </footer>

      </article>

      {/* Discussion */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-100 dark:border-slate-800 shadow-xl">
          <h3 className="text-2xl font-bold mb-10 flex items-center gap-4 dark:text-white">
            <span className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl">💬</span>
            Discussion
          </h3>
          <CommentSystem />
        </div>
      </section>

      {/* Overlay */}
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90]" onClick={() => setIsDrawerOpen(false)} />
      )}
    </div>
  );
};

export default PostDetail;