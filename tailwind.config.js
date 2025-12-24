/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // 👈 確保這行路徑正確，包含 src 下的所有檔案
  ],
  darkMode: 'class', // 👈 確保這行有加上
  theme: {
    extend: {
      // 你可以在這裡自定義你的莫蘭迪色系
      colors: {
        morandi: {
          blue: '#A3B1C6',
          rose: '#E2B4B4',
          gray: '#F8FAFC',
        }
      }
    },
  },
  plugins: [],
}