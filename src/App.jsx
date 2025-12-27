import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home as HomeIcon, BookOpen, User, Github } from 'lucide-react';
import ThemeToggle from './components/ThemeToggle';
import SeasonalEffect from './components/SeasonalEffect';

// 頁面組件
import Home from './pages/Home';
import BlogList from './pages/BlogList';
import PostDetail from './pages/PostDetail';
import About from './pages/About';

function Analytics() {
  const location = useLocation();

  useEffect(() => {
    // 💡 每當路由 (location) 改變時，手動發送數據給 GA
    if (window.gtag) {
      window.gtag('config', 'G-XXXXXXXXXX', {
        page_path: location.pathname + location.search,
      });
      console.log(`GA tracked: ${location.pathname}`);
    }
  }, [location]);

  return null;
}

const Navbar = () => (
  <nav className="sticky top-0 z-50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-colors duration-500">
    <SeasonalEffect /> {/* 💡 放在這裡，全站生效 */}
    <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold bg-gradient-to-r from-rose-400 to-sky-400 bg-clip-text text-transparent">
        SiuChun.Portfolio
      </Link>
      
      <div className="flex items-center gap-8">
        <div className="flex gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          <Link to="/" className="hover:text-rose-400 transition-soft">Home</Link>
          <Link to="/blog" className="hover:text-rose-400 transition-soft">Blog</Link>
          <Link to="/about" className="hover:text-rose-400 transition-soft">About</Link>
        </div>
        
        {/* 💡 加入主題切換按鈕 */}
        <ThemeToggle />
      </div>
    </div>
  </nav>
);

const Footer = () => (
  /* 💡 增加 py-20 增加上下內距，mb-10 確保不貼齊瀏覽器最底部 */
  <footer className="py-20 mb-10 border-t border-slate-100 dark:border-slate-800 text-center transition-colors duration-500">
    <div className="max-w-5xl mx-auto px-6">
      <p className="text-slate-400 dark:text-slate-500 text-sm tracking-wide">
        © 2024 SiuChunKung.Portfolio • Built with passion using React & Tailwind
      </p>
      {/* 💡 可以順便加點小裝飾，讓 Footer 看起來不那麼單調 */}
      <div className="mt-4 flex justify-center gap-4 text-slate-300 dark:text-slate-600">
        <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
      </div>
    </div>
  </footer>
);

function App() {
  return (
    <Router 
      basename="/my-portfolio-vibecoding"
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Analytics /> {/* 💡 放在這裡 */}
      {/* 💡 這裡加上 dark:bg-slate-950 確保深色模式背景正確 */}
      <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 transition-colors duration-500">
        <Navbar />
        
        {/* 💡 main 區域移除 max-w-5xl 以免限制了 PostDetail 的寬度（PostDetail 內部已有自訂寬度） */}
        <main className="flex-grow w-full pb-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;