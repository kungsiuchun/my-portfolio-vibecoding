import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home as HomeIcon, BookOpen, User, Github } from 'lucide-react';

// 假設的頁面組件 (稍後實作)
import Home from './pages/Home';
import BlogList from './pages/BlogList';
import PostDetail from './pages/PostDetail';

const Navbar = () => (
  <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-slate-100">
    <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold bg-gradient-to-r from-rose-400 to-sky-400 bg-clip-text text-transparent">
        Minimal.Log
      </Link>
      <div className="flex gap-8 text-sm font-medium text-slate-600">
        <Link to="/" className="hover:text-rose-400 transition-soft">首頁</Link>
        <Link to="/blog" className="hover:text-rose-400 transition-soft">文章</Link>
      </div>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="py-12 border-t border-slate-100 mt-20 text-center text-slate-400 text-sm">
    <p>© 2024 Minimal.Log. Built with React & Tailwind.</p>
  </footer>
);

function App() {
  return (
    <Router basename="/my-portfolio-vibecoding"> {/* 與 vite.config 的 base 一致 */}
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow max-w-5xl mx-auto px-6 py-12 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/post/:id" element={<PostDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;