import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const container = document.getElementById('root');

// 💡 檢查是否有預渲染的內容
if (container.hasChildNodes()) {
  // 如果已經有 HTML 內容（預渲染過的），使用 hydrate 讓 React 接手互動
  hydrateRoot(container, <React.StrictMode><App /></React.StrictMode>);
} else {
  // 如果是第一次渲染（開發環境），使用一般的 createRoot
  const root = createRoot(container);
  root.render(<React.StrictMode><App /></React.StrictMode>);
}