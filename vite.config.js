import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/my-portfolio-vibecoding/', // 部署到 GitHub Pages 時，這裡填寫你的倉庫名稱
build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // 將 recharts 相關套件單獨打包
          'vendor-charts': ['recharts'],
          // 將 react 核心套件單獨打包
          'vendor-react': ['react', 'react-dom'],
        },
      },
    },
    // 如果你覺得 500kb 限制太嚴格，可以稍微調高到 800
    chunkSizeWarningLimit: 800, 
  },
})