import Giscus from '@giscus/react';

const CommentSystem = () => {
  return (
    <div className="mt-20 pt-10 border-t border-slate-100 dark:border-slate-800">
      <Giscus
        id="comments"
        repo="kungsiuchun/my-portfolio-vibecoding"
        repoId="R_kgDOQs8jcQ"
        category="Announcements"
        categoryId="DIC_kwDOQs8jcc4C0N6G"
        mapping="pathname" // 以網址路徑作為文章 ID
        term="Welcome to Giscus!"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="preferred_color_scheme" // 💡 自動隨 Dark Mode 切換
        lang="en"
        loading="lazy"
      />
    </div>
  );
};

export default CommentSystem;