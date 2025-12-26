import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/my-portfolio-vibecoding/', // 部署到 GitHub Pages 時，這裡填寫你的倉庫名稱
})