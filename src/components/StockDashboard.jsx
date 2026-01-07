import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Papa from 'papaparse';

const StockDashboard = () => {
  const [data, setData] = useState([]);
  const [selectedTicker, setSelectedTicker] = useState('AAPL');
  const [tickers, setTickers] = useState([]);

  useEffect(() => {
    
  // 在 StockDashboard.jsx 或數據讀取處
  const CSV_URL = `https://raw.githubusercontent.com/kungsiuchun/stock-trading-python-app/main/tickers.csv?t=${new Date().getTime()}`;

    Papa.parse(CSV_URL, {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        const cleanData = results.data.filter(row => row.date && row.T);
        setData(cleanData);
        
        // 取得所有不重複的股票代碼供選單使用
        const uniqueTickers = [...new Set(cleanData.map(item => item.T))];
        setTickers(uniqueTickers);
      }
    });
  }, []);

  // 根據選擇的股票過濾數據
  const filteredData = data
    .filter(item => item.T === selectedTicker)
    .sort((a, b) => new Date(a.date) - new Date(b.date)); // 確保日期順序正確
  
  
  if (data.length === 0) {
  return (
    <div className="h-[400px] flex flex-col items-center justify-center bg-slate-800/50 rounded-3xl border border-dashed border-slate-700">
      <div className="w-8 h-8 border-4 border-rose-400 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-slate-400 animate-pulse">Fetching latest Dow 30 data...</p>
    </div>
  );
}

  return (
    <div className="p-6 bg-slate-900 rounded-xl border border-slate-700 text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Dow 30 Stock Trends</h2>
        <select 
          className="bg-slate-800 border border-slate-600 rounded px-3 py-1 text-sm"
          value={selectedTicker}
          onChange={(e) => setSelectedTicker(e.target.value)}
        >
          {tickers.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
            <YAxis stroke="#94a3b8" fontSize={12} domain={['auto', 'auto']} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
              itemStyle={{ color: '#818cf8' }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="c" 
              name="Close Price" 
              stroke="#6366f1" 
              strokeWidth={2} 
              dot={false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StockDashboard;