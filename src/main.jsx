// 為舊版瀏覽器 (如 react-snap 內建的 Chrome) 手動加入 Object.hasOwn 的補丁
if (!Object.hasOwn) {
  Object.defineProperty(Object, "hasOwn", {
    value: function (instance, prop) {
      return Object.prototype.hasOwnProperty.call(instance, prop);
    },
    configurable: true,
    enumerable: false,
    writable: true,
  });
}

import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);