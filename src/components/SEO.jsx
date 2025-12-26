import { useEffect } from 'react';

const SEO = ({ title, description, image, article }) => {
  useEffect(() => {
    // 更新標題
    document.title = `${title} | SiuChunKung Portfolio`;

    // 更新 Meta 描述
    const updateMeta = (name, content) => {
      let el = document.querySelector(`meta[name="${name}"]`) || 
               document.querySelector(`meta[property="${name}"]`);
      if (el) {
        el.setAttribute('content', content);
      } else {
        const meta = document.createElement('meta');
        if (name.includes('og:') || name.includes('twitter:')) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    };

    if (description) updateMeta('description', description);
    
    // Open Graph (Facebook/LinkedIn)
    updateMeta('og:title', title);
    if (description) updateMeta('og:description', description);
    if (image) updateMeta('og:image', image);
    updateMeta('og:type', article ? 'article' : 'website');

    // Twitter
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', title);
    if (description) updateMeta('twitter:description', description);
    if (image) updateMeta('twitter:image', image);

  }, [title, description, image, article]);

  return null;
};

export default SEO;