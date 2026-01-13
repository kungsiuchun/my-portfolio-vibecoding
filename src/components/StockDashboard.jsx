import React, { useEffect, useState } from 'react';
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Papa from 'papaparse';

// ✅ 修正後的 K 線組件：解決渲染與顏色問題
const Candlestick = (props) => {
  const { x, y, width, height, open, close, high, low } = props;
  if (x === undefined || y === undefined || height === undefined) return null;

  const o = parseFloat(open);
  const c = parseFloat(close);
  const h = parseFloat(high);
  const l = parseFloat(low);

  const isUp = c >= o;
  const color = isUp ? '#22c55e' : '#ef4444'; // 綠色漲，紅色跌

  // 計算 1 單位價格對應的像素高度
  const ratio = Math.abs(height) / (Math.abs(o - c) || 0.1);
  const highY = y - (h - Math.max(o, c)) * ratio;
  const lowY = y + (Math.min(o, c) - l) * ratio + Math.abs(height);

  return (
    <g>
      {/* 影線 */}
      <line x1={x + width / 2} y1={highY} x2={x + width / 2} y2={lowY} stroke={color} strokeWidth={1.5} />
      {/* 實體：下跌時 y 是開盤價，需加上 height 到達收盤價 */}
      <rect 
        x={x} 
        y={isUp ? y : y + height} 
        width={width} 
        height={Math.max(2, Math.abs(height))} 
        fill={color}
      />
    </g>
  );
};

const StockDashboard = () => {
  const [data, setData] = useState([]);
  const [selectedTicker, setSelectedTicker] = useState('AAPL');
  const [tickers, setTickers] = useState([]);

  useEffect(() => {
    const timestamp = new Date().getTime();
    const CSV_URL = `https://raw.githubusercontent.com/kungsiuchun/stock-trading-python-app/main/dow30.csv?t=${timestamp}`;

    Papa.parse(CSV_URL, {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.data) {
          const cleanData = results.data
            .filter(row => row.date && row.T && row.c)
            .map(row => ({
              ...row,
              o: parseFloat(row.o),
              c: parseFloat(row.c),
              h: parseFloat(row.h),
              l: parseFloat(row.l),
              v: parseFloat(row.v)
            }));
          setData(cleanData);
          setTickers([...new Set(cleanData.map(item => item.T))]);
        }
      },
    });
  }, []);

  const filteredData = data
    .filter(item => item.T === selectedTicker)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map(item => ({
      ...item,
      openClose: [item.o, item.c]
    }));

  return (
    <div className="p-6 bg-[#0f172a] rounded-3xl border border-slate-800 text-white shadow-2xl">
      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className="text-2xl font-black text-slate-100 uppercase tracking-tighter">
          {selectedTicker} <span className="text-indigo-500 ml-2">Analytics</span>
        </h2>
        <select 
          className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm font-bold text-indigo-400 outline-none focus:ring-2 focus:ring-indigo-500"
          value={selectedTicker}
          onChange={(e) => setSelectedTicker(e.target.value)}
        >
          {tickers.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div className="h-[500px] w-full bg-slate-900/50 rounded-2xl p-4 border border-slate-800/50">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={filteredData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="date" stroke="#475569" fontSize={10} tickMargin={15} axisLine={false} tickLine={false} />
            
            {/* 🚀 價格軸：domain 設定為 'dataMin' 到 'dataMax'，但利用 padding 將 K 線推高 */}
            <YAxis 
              yAxisId="price"
              stroke="#94a3b8" 
              fontSize={11} 
              orientation="right"
              domain={['dataMin', 'dataMax']}
              padding={{ top: 20, bottom: 150 }} // 💡 關鍵：bottom 設大，將 K 線向上推，留出底部空間給 Volume
              axisLine={false}
              tickLine={false}
              tickFormatter={(val) => `$${val.toFixed(0)}`}
            />

            {/* 🚀 成交量軸：限制成交量只在底部的 20% 區域 */}
            <YAxis 
              yAxisId="volume" 
              hide 
              domain={[0, (dataMax) => dataMax * 5]} // 💡 關鍵：乘 5 倍會壓縮柱狀圖高度
            />

            <Tooltip 
              cursor={{ stroke: '#334155', strokeWidth: 1 }}
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const d = payload[0].payload;
                  const isUp = d.c >= d.o;
                  return (
                    <div className="p-3 text-[11px] font-mono shadow-2xl">
                      <p className="text-slate-500 mb-2 border-b border-slate-800 pb-1 font-sans">{d.date}</p>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                        <p>O: <span className="text-slate-100">${d.o}</span></p>
                        <p>C: <span className="text-slate-100">${d.c}</span></p>
                        <p>H: <span className="text-green-400">${d.h}</span></p>
                        <p>L: <span className="text-red-400">${d.l}</span></p>
                      </div>
                      <p className="mt-2 text-indigo-400 font-sans">VOL: {(d.v / 1000000).toFixed(2)}M</p>
                    </div>
                  );
                }
                return null;
              }}
            />

            {/* 成交量 Bar：增加背景對比度 */}
            <Bar yAxisId="volume" dataKey="v">
              {filteredData.map((entry, index) => (
                <Cell key={index} fill={entry.c >= entry.o ? '#22c55e' : '#ef4444'} fillOpacity={0.3} />
              ))}
            </Bar>

            {/* K 線 Bar */}
            <Bar
              yAxisId="price"
              dataKey="openClose"
              shape={(props) => (
                <Candlestick 
                  {...props} 
                  open={props.payload.o} 
                  close={props.payload.c} 
                  high={props.payload.h} 
                  low={props.payload.l} 
                />
              )}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 flex justify-center gap-8 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
        <div className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div> Bullish</div>
        <div className="flex items-center gap-2"><div className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div> Bearish</div>
      </div>
    </div>
  );
};

export default StockDashboard;