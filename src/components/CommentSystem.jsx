import React, { useEffect, useState } from 'react';
import Giscus from '@giscus/react';

const CommentSystem = () => {
  const [resolvedTheme, setResolvedTheme] = useState('light');

  useEffect(() => {
    // 1. 初始化判斷
    const isDark = document.documentElement.classList.contains('dark');
    setResolvedTheme(isDark ? 'dark' : 'light');

    // 2. 監聽 HTML class 的變化 (當你點擊切換按鈕時)
    const observer = new MutationObserver(() => {
      const isDarkNow = document.documentElement.classList.contains('dark');
      setResolvedTheme(isDarkNow ? 'dark' : 'light');
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="mt-20 pt-10 border-t border-slate-100 dark:border-slate-800">
      <Giscus
        id="comments"
        repo="kungsiuchun/my-portfolio-vibecoding"
        repoId="R_kgDOQs8jcQ"
        category="Announcements"
        categoryId="DIC_kwDOQs8jcc4C0N6G"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={resolvedTheme} // 這裡會動態變成 'dark' 或 'light'
        lang="en"           // 建議改為繁體中文
        loading="lazy"
      />
    </div>
  );
};

export default CommentSystem;