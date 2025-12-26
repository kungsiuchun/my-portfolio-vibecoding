const { run } = require("react-snap");
const fs = require("fs");
const path = require("path");

// 1. 讀取你的文章資料
// 假設你的文章存在 src/data/posts.js，且是用 export const posts = [...]
// 注意：Node 環境下可能需要處理 ESM，最簡單是讀取產出的 dist 或是直接讀取該檔案內容
const postsData = fs.readFileSync(path.resolve(__dirname, "../src/data/posts.js"), "utf8");

// 使用正則表達式簡單抓取 id (假設 id 是數字或字串)
// 這裡根據你的 posts.js 格式調整，目的是拿到所有的 id
const idRegex = /id:\s*['"]?(\d+|[\w-]+)['"]?/g;
const ids = [];
let match;
while ((match = idRegex.exec(postsData)) !== null) {
  ids.push(match[1]);
}

// 2. 定義基礎路徑
const baseRoutes = ["/", "/blog", "/about"];

// 3. 合併動態文章路徑
const dynamicRoutes = ids.map(id => `/post/${id}`);
const allRoutes = [...baseRoutes, ...dynamicRoutes];

console.log("🚀 Prepared routes for react-snap:", allRoutes);

// 4. 執行 react-snap
run({
  source: "dist",
  include: allRoutes,
  // 💡 關鍵：告知 react-snap 你的基礎路徑
  publicPath: "/my-portfolio-vibecoding/", 
  delay: 3000,
  // 先移除 waitFor，我們改用 delay 來排查問題
  // waitFor: '.article-content-loaded', 
  puppeteerArgs: [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-dev-shm-usage"
  ]
})