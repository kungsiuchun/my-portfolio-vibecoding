import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/my-portfolio-vibecoding/',
  server: {
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
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
    chunkSizeWarningLimit: 800,
  },
})
