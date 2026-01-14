import React, { useState, useEffect, useRef } from 'react';
import {
  ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer, Area
} from 'recharts';

const ValuationChart = ({ ticker = "AAPL" }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [model, setModel] = useState('pe'); // 'pe' 或 'fcf'
  const [timeWindow, setTimeWindow] = useState('2Y'); // '1Y', '2Y', '3Y', '5Y'
  const containerRef = useRef(null);

  useEffect(() => {
    const timestamp = new Date().getTime();
    fetch(`https://raw.githubusercontent.com/kungsiuchun/ValuationCalculation/refs/heads/master/data/results/${ticker}/valuation_summary.json?t=${timestamp}`)
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => console.error("Loading error:", err));
  }, [ticker]);

  // 全螢幕切換函數
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  if (loading) return <div className="text-indigo-400 p-10 animate-pulse font-mono text-center">📡 Loading Market Intelligence...</div>;

  const avgVal = data.averages?.[model]?.[timeWindow];

  return (
    /* 外層容器：新增 ref 和 fullscreen 專用 class */
    <div 
      ref={containerRef}
      className="valuation-chart-container w-full bg-white dark:bg-slate-900/50 backdrop-blur-md p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl"
    >
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3 tracking-tighter">
            {data.ticker} <span className="text-indigo-500">VALUATION BANDS</span>
          </h2>
          <p className="text-slate-500 text-xs font-medium uppercase tracking-widest mt-1">
            {timeWindow} Rolling {model.toUpperCase()} Average: <span className="text-indigo-400 font-bold">{avgVal}x</span>
          </p>
        </div>

        {/* 控制面板 */}
        <div className="flex flex-wrap items-center gap-3">
          {/* 週期切換 (1Y, 2Y, 3Y, 5Y) */}
          <div className="flex p-1 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
            {['1Y', '2Y', '3Y', '5Y'].map((w) => (
              <button
                key={w}
                onClick={() => setTimeWindow(w)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${timeWindow === w ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
              >
                {w}
              </button>
            ))}
          </div>

          {/* 模型切換 (PE / FCF / PS) */}
          <div className="flex p-1 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
            {['pe', 'fcf', 'ps'].map((m) => (
              <button 
                key={m}
                onClick={() => setModel(m)}
                className={`px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all uppercase ${model === m ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-white'}`}
              >
                {m === 'pe' ? 'P/E' : m === 'fcf' ? 'P/FCF' : 'P/S'}
              </button>
            ))}
          </div>

          {/* 全螢幕按鈕 (Mobile Friendly) */}
          <button 
            onClick={toggleFullScreen}
            className="flex items-center justify-center p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-indigo-400 border border-slate-200 dark:border-slate-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
          </button>
        </div>
      </div>

      {/* 圖表容器：調整手機端高度並增加防抖 */}
      <div className="h-[380px] md:h-[500px] w-full chart-wrapper">
        <ResponsiveContainer width="100%" height="100%" debounce={100}>
          <ComposedChart data={data.data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="bandRed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.05}/>
              </linearGradient>
              <linearGradient id="bandNeutral" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.02}/>
              </linearGradient>
              <linearGradient id="bandGreen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0.05}/>
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis 
              dataKey="date" 
              stroke="#475569" 
              fontSize={10}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(str) => str.substring(2, 7)}
            />
            <YAxis 
              orientation="right"
              stroke="#475569" 
              fontSize={10}
              axisLine={false}
              tickLine={false}
              domain={['auto', 'auto']} 
              tickFormatter={(val) => `$${Number(val).toFixed(0)}`}
            />
                        
            <Tooltip 
              cursor={{ stroke: '#334155', strokeWidth: 1 }}
              contentStyle={{ color: '#a6b6cc', backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid #36517c', borderRadius: '16px', backdropFilter: 'blur(4px)' }}
              itemStyle={{ fontSize: '11px', fontWeight: '600' }}
            />

            <Legend verticalAlign="top" align="left" iconType="circle" wrapperStyle={{ paddingBottom: '20px', fontSize: '10px', textTransform: 'uppercase' }}/>

            <Area
              type="monotone"
              dataKey={(obj) => [
                obj.valuation?.[timeWindow]?.[model]?.up1, 
                obj.valuation?.[timeWindow]?.[model]?.up2
              ]}
              stroke="none"
              fill="url(#bandRed)"
              connectNulls={true}
              activeDot={false}
              legendType="none"
            />

            <Area
              type="monotone"
              dataKey={(obj) => [
                obj.valuation?.[timeWindow]?.[model]?.down1, 
                obj.valuation?.[timeWindow]?.[model]?.up1
              ]}
              stroke="none"
              fill="url(#bandNeutral)"
              connectNulls={true}
              activeDot={false}
              legendType="none"
            />

            <Area
              type="monotone"
              dataKey={(obj) => [
                obj.valuation?.[timeWindow]?.[model]?.down2, 
                obj.valuation?.[timeWindow]?.[model]?.down1
              ]}
              stroke="none"
              fill="url(#bandGreen)"
              connectNulls={true}
              activeDot={false}
              legendType="none"
            />

            <Line type="monotone" dataKey={`valuation.${timeWindow}.${model}.up2`} stroke="#ef4444" strokeWidth={1.5} strokeDasharray="5 5" dot={false} connectNulls={true} name="Overvalued (+2σ)" />
            <Line type="monotone" dataKey={`valuation.${timeWindow}.${model}.up1`} stroke="#f59e0b" strokeWidth={1} strokeDasharray="3 3" dot={false} connectNulls={true} name="+1σ Band" />
            <Line type="monotone" dataKey={`valuation.${timeWindow}.${model}.mean`} stroke="#6366f1" strokeWidth={2.5} dot={false} connectNulls={true} name="Fair Value (Mean)" />
            <Line type="monotone" dataKey={`valuation.${timeWindow}.${model}.down1`} stroke="#3b82f6" strokeWidth={1} strokeDasharray="3 3" dot={false} connectNulls={true} name="-1σ Band" />
            <Line type="monotone" dataKey={`valuation.${timeWindow}.${model}.down2`} stroke="#22c55e" strokeWidth={1.5} strokeDasharray="5 5" dot={false} connectNulls={true} name="Undervalued (-2σ)" />

            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="#fff"
              strokeWidth={3} 
              dot={false} 
              name="Market Price" 
              animationDuration={1000}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Info */}
      <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Last Updated: {data.last_updated}
        </div>
        <div className="flex items-center gap-4">
          <span className="bg-slate-50 dark:bg-slate-800 px-4 py-1.5 rounded-full border border-slate-100 dark:border-slate-700">
            Source: FMP Stable API
          </span>
        </div>
      </div>
    </div>
  );
};

export default ValuationChart;