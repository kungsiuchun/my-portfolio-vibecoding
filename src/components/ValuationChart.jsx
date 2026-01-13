import React, { useState, useEffect } from 'react';
import {
  ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer, Area
} from 'recharts';

const ValuationChart = ({ ticker = "AAPL" }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [model, setModel] = useState('pe'); // 'pe' 或 'fcf'
  const [timeWindow, setTimeWindow] = useState('2Y'); // 新增：'1Y', '2Y', '3Y', '5Y'

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

  if (loading) return <div className="text-indigo-400 p-10 animate-pulse font-mono text-center">📡 Loading Market Intelligence...</div>;

  const avgVal = data.averages?.[model]?.[timeWindow];

  return (
    <div className="w-full bg-slate-900/50 backdrop-blur-md p-6 rounded-3xl border border-slate-800 shadow-2xl">
      
{/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tighter flex items-center gap-2">
            {data.ticker} <span className="text-indigo-500">VALUATION BANDS</span>
          </h2>
          <p className="text-slate-500 text-xs font-medium uppercase tracking-widest mt-1">
            {timeWindow} Rolling {model.toUpperCase()} Average: <span className="text-indigo-400 font-bold">{avgVal}x</span>
          </p>
        </div>

        {/* 控制面板：切換模型與週期 */}
        <div className="flex flex-wrap gap-3">
          {/* 週期切換 (1Y, 2Y, 3Y, 5Y) */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
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

          {/* 模型切換 (PE / FCF) */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button 
              onClick={() => setModel('pe')}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all ${model === 'pe' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-white'}`}
            >
              P/E
            </button>
            <button 
              onClick={() => setModel('fcf')}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all ${model === 'fcf' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-white'}`}
            >
              P/FCF
            </button>
            <button 
              onClick={() => setModel('ps')}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all ${model === 'ps' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-white'}`}
            >
              P/S
            </button>
          </div>
        </div>
      </div>

      <div className="h-[500px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data.data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              {/* 定義雲帶漸變色 */}
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
              domain={['dataMin - 15', 'dataMax + 15']} 
              tickFormatter={(val) => `$${Number(val).toFixed(0)}`}
            />
                        
            <Tooltip 
              cursor={{ stroke: '#334155', strokeWidth: 1 }}
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px' }}
              itemStyle={{ fontSize: '11px', fontWeight: '600' }}
            />
            
            <Legend verticalAlign="top" align="left" iconType="circle" wrapperStyle={{ paddingBottom: '20px', fontSize: '10px', textTransform: 'uppercase' }}/>

            {/* --- 雲帶背景層 (Area) 使用動態 Path: valuation.[window].[model] --- */}

            {/* 1. 過熱雲帶：限制在 up1 與 up2 之間 */}
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

            {/* 2. 核心雲帶：限制在 down1 與 up1 之間 */}
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

            {/* 3. 超跌雲帶：限制在 down2 與 down1 之間 */}
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

            {/* --- 估值線條層 (Line) --- */}
            <Line 
              type="monotone" 
              dataKey={`valuation.${timeWindow}.${model}.up2`} 
              stroke="#ef4444" 
              strokeWidth={1.5}
              strokeDasharray="5 5" 
              dot={false} 
              connectNulls={true}
              name="Overvalued (+2σ)" 
            />
            <Line 
              type="monotone" 
              dataKey={`valuation.${timeWindow}.${model}.up1`} 
              stroke="#f59e0b" 
              strokeWidth={1}
              strokeDasharray="3 3" 
              dot={false} 
              connectNulls={true}
              name="+1σ Band" 
            />
            <Line 
              type="monotone" 
              dataKey={`valuation.${timeWindow}.${model}.mean`} 
              stroke="#6366f1" 
              strokeWidth={2.5} 
              dot={false} 
              connectNulls={true}
              name="Fair Value (Mean)" 
            />
            <Line 
              type="monotone" 
              dataKey={`valuation.${timeWindow}.${model}.down1`} 
              stroke="#3b82f6" 
              strokeWidth={1}
              strokeDasharray="3 3" 
              dot={false} 
              connectNulls={true}
              name="-1σ Band" 
            />
            <Line 
              type="monotone" 
              dataKey={`valuation.${timeWindow}.${model}.down2`} 
              stroke="#22c55e" 
              strokeWidth={1.5}
              strokeDasharray="5 5" 
              dot={false} 
              connectNulls={true}
              name="Undervalued (-2σ)" 
            />

            {/* 真實價格 (White Glow Effect) */}
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="#ffffff" 
              strokeWidth={3} 
              dot={false} 
              name="Market Price" 
              animationDuration={1500}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>


      <div className="mt-6 flex justify-between items-center text-[10px] text-slate-600 font-bold uppercase tracking-widest">
        <span>Last Updated: {data.last_updated}</span>
        <span className="bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700">
          Source: FMP Stable API
        </span>
      </div>

    </div>
  );
};

export default ValuationChart;