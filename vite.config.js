import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/my-portfolio-vibecoding/",
  plugins: [react()],
  build: {
    target: 'es2015', // 💡 關鍵：確保舊版 Chrome (react-snap 內部用) 能執行
    minify: 'terser', // 有時 esbuild 在處理 es2015 時會有細微差別，terser 更穩
  }
})