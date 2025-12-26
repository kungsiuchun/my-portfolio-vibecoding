import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/my-portfolio-vibecoding/",
  plugins: [react()],
  build: {
    target: 'es2015', 
    // 💡 將 'terser' 改為 'esbuild' 或直接刪除這一行（預設就是 esbuild）
    minify: 'esbuild', 
  }
})