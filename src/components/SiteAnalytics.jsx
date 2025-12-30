import React, { useEffect, useState } from 'react';

const SiteAnalytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 💡 關鍵：fetch 放在 public 資料夾下的 stats.json
    // 使用 './stats.json' 確保在 GitHub Pages 的路徑正確
    fetch('./stats.json')
      .then((res) => {
        if (!res.ok) throw new Error("尚未生成數據檔案");
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("讀取 GA 數據失敗:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-10 text-slate-400">正在加載實時數據...</div>;
  if (!data) return null;

  return (
    <div className="w-full max-w-2xl mx-auto mt-12 p-8 bg-slate-900 text-white rounded-3xl shadow-2xl border border-slate-700">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Site Traffic Analytics
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Data Source: Google Analytics 4 API
          </p>
        </div>
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-widest text-slate-500">Last Updated</div>
          <div className="text-sm font-mono text-green-400">{data.last_updated}</div>
        </div>
      </div>

      <div className="space-y-6">
        <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Top Pages (Last 7 Days)</h4>
        {data.top_pages.map((page, index) => (
          <div key={index} className="group">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-light text-slate-300 group-hover:text-white transition-colors">
                {page.title.replace(' – Vibe Coding', '')} 
              </span>
              <span className="text-sm font-bold text-indigo-400">{page.users} users</span>
            </div>
            {/* 簡易長條圖 */}
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000"
                style={{ width: `${Math.min((page.users / 50) * 100, 100)}%` }} // 假設 50 人為 100% 寬度
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-slate-800 flex items-center gap-3">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
        <p className="text-[10px] text-slate-500 leading-relaxed">
          這個區塊由 **Python + GitHub Actions** 自動化更新。
          系統每 24 小時會調用一次 GA4 API，重新計算熱門文章並重新編譯數據 JSON。
        </p>
      </div>
    </div>
  );
};

export default SiteAnalytics;