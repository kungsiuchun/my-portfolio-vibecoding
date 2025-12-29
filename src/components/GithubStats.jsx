import React, { useEffect, useState } from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  Tooltip, Legend, Sector 
} from 'recharts';

const COLORS = ['#6366f1', '#a855f7', '#ec4899', '#f43f5e', '#3b82f6', '#10b981'];

const GithubStats = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 💡 請替換成你的 GitHub 使用者名稱
    const username = 'kungsiuchun'; 
    
    fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
      .then(res => res.json())
      .then(repos => {
        if (!Array.isArray(repos)) return;
        
        // 過濾掉 Fork 的倉庫
        const myRepos = repos.filter(repo => !repo.fork);

        // 📊 數據清洗：統計語言分佈
        const langMap = myRepos.reduce((acc, repo) => {
          if (repo.language) {
            acc[repo.language] = (acc[repo.language] || 0) + 1;
          }
          return acc;
        }, {});

        // 轉換為 Recharts 格式並排序
        const formattedData = Object.keys(langMap)
          .map(name => ({ name, value: langMap[name] }))
          .sort((a, b) => b.value - a.value);

        setData(formattedData);
        setLoading(false);
      })
      .catch(err => console.error("Error fetching GitHub data:", err));
  }, []);

  if (loading) return <div className="text-center p-10 dark:text-white">Loading Stats...</div>;

  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700/50">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* 左側：文字說明 */}
        <div className="md:w-1/3 text-left">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent mb-4">
            Tech Stack
          </h2>
          <p className="text-slate-600 dark:text-slate-400 font-light leading-relaxed">
            這是我在 GitHub 上的專案語言分佈。反映了我在前端開發與數據分析之間的平衡。
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {data.map((entry, index) => (
              <span key={index} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-medium text-slate-500">
                {entry.name}: {entry.value}
              </span>
            ))}
          </div>
        </div>

        {/* 右側：圓餅圖 */}
        <div className="md:w-2/3 h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={8}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                    className="hover:opacity-80 transition-opacity cursor-pointer"
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '12px', 
                  border: 'none', 
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default GithubStats;