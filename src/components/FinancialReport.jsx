import React, { useState, useEffect, useMemo } from 'react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, ReferenceLine} from 'recharts';
import { ArrowUp, ArrowDown, RefreshCw, AlertCircle, TrendingUp, PieChart, DollarSign, Activity, Info, ShieldAlert, Zap } from 'lucide-react';
// --- CONFIGURATION & THEME ---
const THEME = {
  colors: {
    primary: '#6366f1',    // Indigo 500
    secondary: '#818cf8',  // Indigo 400
    success: '#10b981',    // Emerald 500
    warning: '#f59e0b',    // Amber 500
    danger: '#ef4444',     // Red 500
    textMain: '#334155',   // Slate 700
    textMuted: '#94a3b8',  // Slate 400
    grid: '#e2e8f0',       // Slate 200
    
    // Morandi Palette for Charts
    chart1: '#A3B1C6', // Muted Blue
    chart2: '#E2B4B4', // Muted Rose
    chart3: '#B5C6A3', // Muted Green
    chart4: '#C6A3B5', // Muted Purple
    chart5: '#E2D1B4', // Muted Gold
  }
};

// --- Utility Functions ---
const formatCurrency = (val, short = false) => {
  if (val === undefined || val === null) return 'N/A';
  const absVal = Math.abs(val);
  if (short) {
    if (absVal >= 1e9) return `$${(val / 1e9).toFixed(1)}B`;
    if (absVal >= 1e6) return `$${(val / 1e6).toFixed(1)}M`;
  }
  if (absVal >= 1e9) return `$${(val / 1e9).toFixed(2)}B`;
  if (absVal >= 1e6) return `$${(val / 1e6).toFixed(2)}M`;
  return `$${val.toLocaleString()}`;
};

const formatPercent = (val) => {
  if (val === undefined || val === null) return '0.00%';
  return `${(val * 100).toFixed(2)}%`; 
};

// Raw percent input handler (if data is already 15.0 for 15%)
const formatRawPercent = (val) => {
  if (val === undefined || val === null) return '0.00%';
  return `${val.toFixed(2)}%`;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 dark:bg-slate-800/95 p-3 border border-slate-200 dark:border-slate-700 shadow-xl rounded-lg text-sm backdrop-blur-sm z-50">
        <p className="font-bold text-slate-700 dark:text-slate-200 mb-2 border-b border-slate-100 dark:border-slate-700 pb-1">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center justify-between gap-6 mb-1">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-slate-500 dark:text-slate-400 font-medium text-xs">{entry.name}:</span>
            </div>
            <span className="font-mono font-semibold text-slate-700 dark:text-slate-200">
              {
              entry.name.toLowerCase().includes('%') || 
              entry.name.toLowerCase().includes('margin') || 
              entry.name.toLowerCase().includes('roe') || 
              entry.name.toLowerCase().includes('roic')
                ? formatRawPercent(entry.value)
                : entry.name.includes('Ratio') || entry.name.includes('Debt')
                ? entry.value.toFixed(2) // Returns just the number (e.g., 1.25)
                : entry.name.includes('EPS') || entry.name.includes('Price')
                    ? `$${entry.value.toFixed(2)}`
                    : formatCurrency(entry.value, true)
            }
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// Hook to fetch and enrich data
const useFinancialData = (ticker) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    const timestamp = new Date().getTime();
    
    fetch(`https://raw.githubusercontent.com/kungsiuchun/ValuationCalculation/refs/heads/master/data/processed/${ticker}_combined.json?t=${timestamp}`, {
      signal: controller.signal
    })
      .then(res => {
        if (!res.ok) throw new Error(`Data for ${ticker} not found.`);
        return res.json();
      })
      .then(json => {
        // ENRICHMENT LAYER: Calculate advanced BI metrics here
        const enriched = json.map(item => {
            const shareholderReturn = (Math.abs(item.commonStockRepurchased || 0) + Math.abs(item.commonDividendsPaid || 0));
            const totalEquity = item.totalStockholdersEquity || 1; // avoid div/0
            const totalDebt = item.totalDebt || 0;
            const cash = item.cashAndShortTermInvestments || 0;
            
            // ROE = Net Income / Equity
            const roe = (item.netIncome / totalEquity) * 100;
            
            // Invested Capital (Approx) = Debt + Equity - Cash
            const investedCapital = totalDebt + totalEquity - cash;
            const roic = investedCapital > 0 ? (item.netIncome / investedCapital) * 100 : 0;

            return {
                ...item,
                // Dates
                shortDate: item.date.substring(0, 7),
                
                // Margins
                grossMarginPct: (item.grossProfit / item.revenue) * 100,
                opMarginPct: (item.operatingIncome / item.revenue) * 100,
                netMarginPct: (item.netIncome / item.revenue) * 100,
                
                // Capital Allocation
                shareholderReturn,
                buybacks: Math.abs(item.commonStockRepurchased || 0),
                dividends: Math.abs(item.commonDividendsPaid || 0),
                
                // Efficiency
                roe,
                roic,
                currentRatio: item.totalCurrentAssets / (item.totalCurrentLiabilities || 1), // avoid div/0
                debtToEquity: totalDebt / totalEquity,
                assetTurnover: item.revenue / item.totalAssets,
                leverage: item.totalAssets / totalEquity,
            };
        });
        
        setData(enriched);
        setLoading(false);
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [ticker]);

  return { data, loading, error };
};

const FinancialReport = () => {
  const [ticker, setTicker] = useState("AAPL");
  const { data, loading, error } = useFinancialData(ticker);


  const availableTickers = [
     "AAPL", "TSLA", "AMZN", "MSFT", "NVDA", "GOOGL", "META", "NFLX", "JPM", "V",
     "BAC", "PYPL", "DIS", "T", "PFE", "COST", "INTC", "KO", "TGT", "NKE",
     "BA", "BABA", "XOM", "WMT", "GE", "CSCO", "VZ", "JNJ", "CVX", "PLTR",
     "SQ", "SHOP", "SBUX", "SOFI", "HOOD", "RBLX", "SNAP", "AMD", "UBER", "FDX",
     "ABBV", "ETSY", "MRNA", "LMT", "GM", "F", "LCID", "CCL", "DAL", "UAL",
     "AAL", "TSM", "SONY", "ET", "MRO", "COIN", "RIVN", "RIOT", "CPRX", "NOK",
     "ROKU", "VIAC", "ATVI", "BIDU", "DOCU", "ZM", "PINS", "TLRY", "WBA", "MGM",
     "NIO", "C", "GS", "WFC", "ADBE", "PEP", "UNH", "CARR", "HCA", "TWTR",
     "BILI", "SIRI", "FUBO", "RKT"
 ];


  // Sort data for charts (Oldest -> Newest)
  const chartData = useMemo(() => {
    return data ? [...data].reverse() : [];
  }, [data]);

  // Latest snapshot
  const latest = data ? data[0] : null;

    if (loading) return (
        <div className="h-96 flex flex-col items-center justify-center text-slate-400 animate-pulse">
            <RefreshCw size={32} className="animate-spin mb-4 text-indigo-500" />
            <span className="font-medium text-sm">Analyzing Market Data...</span>
        </div>
    );

if (error) return (
    <div className="h-96 flex flex-col items-center justify-center text-rose-500">
        <AlertCircle size={32} className="mb-4" />
        <span className="font-bold">Failed to load data</span>
        <span className="text-sm text-slate-400 mt-2">{error}</span>
        <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded text-xs font-bold text-slate-600 transition-colors">Retry</button>
    </div>
  );


  return (
    <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
                <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                    {ticker} <span className="text-lg font-medium text-slate-400">Financial Analysis</span>
                </h1>
                <p className="text-slate-500 text-sm mt-1">Fiscal Year {latest?.fiscalYear} • Period {latest?.period} • Reported {latest?.filingDate}</p>
            </div>
            
          <div className="flex items-center gap-6 mt-4 md:mt-0">
             {/* Key Highlight Metrics (Desktop Only) */}
             <div className="hidden lg:flex gap-8 text-right pr-6 border-r border-slate-100">
                <div>
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Latest Rev</p>
                    <p className="font-mono dark:text-white font-bold text-lg text-slate-700">{formatCurrency(latest?.revenue)}</p>
                </div>
                <div>
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Latest EPS</p>
                    <p className="font-mono font-bold text-lg text-emerald-600">${latest?.eps}</p>
                </div>
             </div>

            <select 
              value={ticker} 
              onChange={(e) => setTicker(e.target.value)}
              className="p-3 pl-4 pr-10 border border-slate-200 rounded-xl bg-slate-50 hover:bg-white transition-all font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none appearance-none cursor-pointer shadow-sm"
            >
              {availableTickers.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </header>

        {/* METRICS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard 
                title="Revenue (TTM)" 
                value={formatCurrency(latest?.revenue)} 
                trend={latest?.revenue_yoy}
                trendLabel={`${formatRawPercent(latest?.revenue_yoy)} YoY`}
                icon={DollarSign}
                colorClass="text-blue-600"
            />
            <KpiCard 
                title="Net Profit Margin" 
                value={formatRawPercent(latest?.netMarginPct)} 
                trend={latest?.netIncome_yoy} // Using Net Income growth as proxy for trend direction
                trendLabel={`${formatRawPercent(latest?.netIncome_yoy)} NI GR`}
                icon={PieChart}
                colorClass="text-purple-600"
            />
            <KpiCard 
                title="Return on Equity" 
                value={formatRawPercent(latest?.roe)}
                subValue={`ROIC: ${formatRawPercent(latest?.roic)}`}
                icon={Activity}
                colorClass="text-emerald-600"
            />
            <KpiCard 
                title="Free Cash Flow" 
                value={formatCurrency(latest?.freeCashFlow)} 
                subValue={`CapEx: ${formatCurrency(latest?.capitalExpenditure)}`}
                trend={latest?.freeCashFlow > 0 ? 1 : -1}
                trendLabel="Positive Carry"
                icon={TrendingUp}
                colorClass="text-indigo-600"
            />
        </div>

        {/* 2x2 CHART GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* CHART 1: GROWTH */}
            <ChartCard 
                title="Revenue vs. Earnings" 
                subtitle="Income Trajectory"
                icon={TrendingUp}
                description="This chart evaluates Top-line vs Bottom-line growth. LOOK FOR: Divergence. If Revenue grows but Net Income stays flat, the company is likely facing rising costs or losing pricing power."
            >
                
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={THEME.colors.grid} />
                        <XAxis dataKey="shortDate" tick={{fontSize: 10}} hide />
                        <YAxis tickFormatter={(v) => `$${v/1e9}B`} tick={{fontSize: 10}} width={35} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="revenue" name="Revenue" fill={THEME.colors.chart1} barSize={20} radius={[4, 4, 0, 0]} />
                        <Line type="monotone" dataKey="netIncome" name="Net Income" stroke={THEME.colors.chart2} strokeWidth={2} dot={false} />
                    </ComposedChart>
                </ResponsiveContainer>
            </ChartCard>

            {/* CHART 2: EFFICIENCY */}
            <ChartCard 
                title="Profitability (ROE/ROIC)" 
                subtitle="Capital Efficiency"
                icon={Activity}
                description="The ultimate measure of a 'Moat'. High ROE/ROIC indicates management is skilled at turning a dollar of capital into significant profit. Consistent ratios above 15% are a hallmark of high-quality compounders."
            >
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={THEME.colors.grid} />
                        <XAxis dataKey="shortDate" tick={{fontSize: 10}} hide />
                        <YAxis unit="%" tick={{fontSize: 10}} width={35} />
                        <Tooltip content={<CustomTooltip />} />
                        <Line type="monotone" dataKey="roe" name="ROE %" stroke={THEME.colors.success} strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="roic" name="ROIC %" stroke={THEME.colors.primary} strokeWidth={2} dot={false} />
                    </ComposedChart>
                </ResponsiveContainer>
            </ChartCard>

            {/* CHART 3: CAPITAL ALLOCATION */}
            <ChartCard 
                title="Shareholder Returns" 
                subtitle="Buybacks & Dividends"
                icon={DollarSign}
                description="Shows how much cash is returned to you. Compare the bars to the FCF line. If returns exceed FCF, the company is using debt or cash-on-hand to fund buybacks—a potentially unsustainable practice."
            >
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={THEME.colors.grid} />
                        <XAxis dataKey="shortDate" tick={{fontSize: 10}} hide />
                        <YAxis tickFormatter={(v) => `$${v/1e9}B`} tick={{fontSize: 10}} width={35} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar stackId="a" dataKey="dividends" name="Dividends" fill={THEME.colors.chart3} />
                        <Bar stackId="a" dataKey="buybacks" name="Buybacks" fill={THEME.colors.chart4} />
                        <Line type="monotone" dataKey="freeCashFlow" name="Free Cash Flow" stroke={THEME.colors.primary} strokeWidth={2} dot={false} />
                    </ComposedChart>
                </ResponsiveContainer>
            </ChartCard>

            {/* CHART 4: VALUATION */}
            <ChartCard 
                title="Valuation Context" 
                subtitle="Price vs. Real Earnings"
                icon={PieChart}
                description="Helps identify 'Multiple Expansion'. If the Price line (Area) rises much faster than the EPS line (Step), the stock is becoming more expensive on a relative basis, increasing the risk of a correction."
            >
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={THEME.colors.grid} />
                        <XAxis dataKey="shortDate" tick={{fontSize: 10}} hide />
                        <YAxis yAxisId="left" tickFormatter={(v) => `$${v}`} tick={{fontSize: 10}} width={30} />
                        <YAxis yAxisId="right" orientation="right" tickFormatter={(v) => `$${v}`} tick={{fontSize: 10}} width={30} />
                        <Tooltip content={<CustomTooltip />} />
                        <Area yAxisId="right" type="monotone" dataKey="stockPrice" name="Stock Price" fill={THEME.colors.chart1} fillOpacity={0.1} stroke={THEME.colors.chart1} />
                        <Line yAxisId="left" type="step" dataKey="eps" name="EPS" stroke={THEME.colors.chart2} strokeWidth={2} dot={false} />
                    </AreaChart>
                </ResponsiveContainer>
            </ChartCard>

            {/* CHART 5: SOLVENCY */}
            <ChartCard 
                title="Debt & Liquidity" 
                subtitle="Risk Assessment"
                icon={ShieldAlert}
                description="Assesses 'Fragility'. Current Ratio (Line) should ideally stay above 1.0. If Debt-to-Equity (Area) is trending upward while Liquidity is falling, the company's financial health is deteriorating."
            >
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={THEME.colors.grid} />
                        <XAxis dataKey="shortDate" tick={{fontSize: 10}} hide />
                        <YAxis yAxisId="left" tick={{fontSize: 10}} width={30} />
                        <YAxis yAxisId="right" orientation="right" tick={{fontSize: 10}} width={30} />
                        <Tooltip content={<CustomTooltip />} />
                        <Area yAxisId="left" dataKey="debtToEquity" name="Debt-to-Equity" fill={THEME.colors.danger} fillOpacity={0.05} stroke={THEME.colors.danger} />
                        <Line yAxisId="right" dataKey="currentRatio" name="Current Ratio" stroke={THEME.colors.success} strokeWidth={2} dot={false} />
                        <ReferenceLine yAxisId="right" y={1} stroke={THEME.colors.textMuted} strokeDasharray="3 3" />
                    </ComposedChart>
                </ResponsiveContainer>
            </ChartCard>

            {/* CHART 6: OPERATIONAL MASTERY */}
            <ChartCard 
                title="Asset Turnover" 
                subtitle="Management Execution"
                icon={Zap}
                description="How hard is the company working its assets? A rising line means they are generating more sales per dollar of hardware/inventory. This is a key indicator of competitive advantage in logistics and scale."
            >
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={THEME.colors.grid} />
                        <XAxis dataKey="shortDate" tick={{fontSize: 10}} hide />
                        <YAxis tick={{fontSize: 10}} width={30} />
                        <YAxis yAxisId="right" orientation="right" tick={{fontSize: 10}} width={30} domain={[0, 'dataMax + 0.5']} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="revenue" name="Revenue" fill={THEME.colors.chart1} opacity={0.2} barSize={40} />
                        <Line yAxisId="right" dataKey="assetTurnover" name="Asset Turnover" stroke={THEME.colors.primary} strokeWidth={3} dot={false} />
                    </ComposedChart>
                </ResponsiveContainer>
            </ChartCard>


        </div>

        {/* DATA TABLE */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center">
            <h3 className="font-bold text-slate-700 dark:text-slate-200 text-sm uppercase tracking-wide">Earning Statement Details</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm table-fixed">
              <thead>
                <tr className="text-[10.5px] font-bold text-slate-500 dark:text-slate-400 uppercase bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-800">
                  <th className="px-6 py-3 sticky left-0 bg-slate-50 dark:bg-slate-800 shadow-sm z-10">Period</th>
                  <th className="px-6 py-3 text-right">Revenue</th>
                  <th className="px-6 py-3 text-right">Gr% QoQ</th>
                  <th className="px-6 py-3 text-right">Op Income</th>
                  <th className="px-6 py-3 text-right">Net Income</th>
                  <th className="px-6 py-3 text-right">Gr% QoQ</th>
                  <th className="px-6 py-3 text-right">Op Cash Flow</th>
                  <th className="px-6 py-3 text-right text-emerald-600">ROE %</th>
                  <th className="px-6 py-3 text-right text-blue-600">Shareholder Rtn</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {data?.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="px-6 py-3 font-medium text-slate-700 dark:text-slate-200 sticky left-0 bg-white dark:bg-slate-900 group-hover:bg-slate-50 dark:group-hover:bg-slate-800 border-r border-slate-100 dark:border-slate-800">
                        {row.date} <span className="text-slate-400 font-normal ml-1 text-xs">({row.period})</span>
                    </td>
                    <td className="px-6 py-3 text-right font-medium text-slate-900 dark:text-slate-100">{formatCurrency(row.revenue)}</td>
                    <td className={`px-6 py-3 text-right font-bold ${row.revenue_qoq >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                       {formatPercent(row.revenue_qoq/100)}
                    </td>
                    <td className="px-6 py-3 text-right text-slate-500">{formatCurrency(row.operatingIncome)}</td>
                    <td className="px-6 py-3 text-right font-bold text-slate-700 dark:text-slate-200">{formatCurrency(row.netIncome)}</td>
                    <td className={`px-6 py-3 text-right font-bold ${row.netIncome_qoq >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                       {formatPercent(row.netIncome_qoq/100)}
                    </td>
                    <td className="px-6 py-3 text-right text-slate-500">{formatCurrency(row.operatingCashFlow)}</td>
                    <td className="px-6 py-3 text-right font-mono text-emerald-600">{formatRawPercent(row.roe)}</td>
                    <td className="px-6 py-3 text-right font-medium text-blue-600">{formatCurrency(row.shareholderReturn)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* NEW: FINANCIAL METRICS GLOSSARY */}
        <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-2xl p-8 border border-indigo-100 dark:border-indigo-900/50">
            <div className="flex items-center gap-3 mb-6">
                <Info className="text-indigo-600 dark:text-indigo-400" size={24} />
                <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Financial Metrics Glossary</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {/* 1. ROE */}
                <div>
                    <h4 className="text-sm font-bold text-indigo-700 dark:text-indigo-300 uppercase mb-1">Return on Equity (ROE)</h4>
                    <p className="text-xs text-slate-400 mb-2 font-mono">Formula: Net Income / Avg. Stockholders' Equity</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        Measures how much profit a company generates with the money shareholders have invested. A high ROE indicates a company is efficient at generating internal growth.
                    </p>
                </div>

                {/* 2. ROIC */}
                <div>
                    <h4 className="text-sm font-bold text-indigo-700 dark:text-indigo-300 uppercase mb-1">Return on Invested Capital (ROIC)</h4>
                    <p className="text-xs text-slate-400 mb-2 font-mono">Formula: Net Income / (Total Debt + Equity - Cash)</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        The gold standard for "Moat" analysis. It shows how well a company turns all its capital (including debt) into profit. If ROIC exceeds the cost of capital, the company creates value.
                    </p>
                </div>

                {/* 3. Free Cash Flow (FCF) */}
                <div>
                    <h4 className="text-sm font-bold text-indigo-700 dark:text-indigo-300 uppercase mb-1">Free Cash Flow (FCF)</h4>
                    <p className="text-xs text-slate-400 mb-2 font-mono">Formula: Operating Cash Flow - Capital Expenditure</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        The "real" cash left over after the business pays for its operations and maintains its assets. This is the pool of money used for dividends and buybacks.
                    </p>
                </div>

                {/* 4. Debt-to-Equity (D/E) */}
                <div>
                    <h4 className="text-sm font-bold text-indigo-700 dark:text-indigo-300 uppercase mb-1">Debt-to-Equity Ratio</h4>
                    <p className="text-xs text-slate-400 mb-2 font-mono">Formula: Total Debt / Total Stockholders' Equity</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        A measure of financial leverage. It indicates what proportion of equity and debt the company is using to finance its assets. High ratios imply higher risk during economic downturns.
                    </p>
                </div>

                {/* 5. Current Ratio */}
                <div>
                    <h4 className="text-sm font-bold text-indigo-700 dark:text-indigo-300 uppercase mb-1">Current Ratio (Liquidity)</h4>
                    <p className="text-xs text-slate-400 mb-2 font-mono">Formula: Current Assets / Current Liabilities</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        A liquidity ratio that measures a company's ability to pay short-term obligations (due within one year). A ratio below 1.0 may signal looming cash flow problems.
                    </p>
                </div>

                {/* 6. Asset Turnover */}
                <div>
                    <h4 className="text-sm font-bold text-indigo-700 dark:text-indigo-300 uppercase mb-1">Asset Turnover Ratio</h4>
                    <p className="text-xs text-slate-400 mb-2 font-mono">Formula: Revenue / Average Total Assets</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        An efficiency ratio that measures how effectively a company uses its assets to generate sales. Rising turnover suggests management is optimizing the supply chain and asset base.
                    </p>
                </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-indigo-100 dark:border-indigo-900/50">
                <p className="text-[10px] text-indigo-400 uppercase font-black tracking-widest">Data Source: SEC Filings via Combined JSON Dataset</p>
            </div>
        </div>


      </div>
    </div>
  );
};

// --- Sub-Components for Cleanliness ---

const KpiCard = ({ title, value, subValue, trend, trendLabel, icon: Icon, colorClass = "text-indigo-600" }) => {
    const isPositive = trend >= 0;
    const TrendArrow = isPositive ? ArrowUp : ArrowDown;
    const trendColor = isPositive ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50';

    return (
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg bg-slate-50 dark:bg-slate-800 ${colorClass}`}>
                    <Icon size={20} />
                </div>
                {trend !== undefined && (
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${trendColor}`}>
                        <TrendArrow size={12} />
                        {trendLabel || formatRawPercent(trend)}
                    </div>
                )}
            </div>
            <div>
                <h3 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">{title}</h3>
                <div className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">{value}</div>
                {subValue && <div className="text-xs text-slate-400 mt-1 font-medium">{subValue}</div>}
            </div>
        </div>
    );
};

const ChartCard = ({ title, subtitle, description, icon: Icon, children }) => (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col h-full min-h-[500px]">
        <div className="mb-4 flex items-start gap-3">
            {Icon && <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-indigo-500"><Icon size={18} /></div>}
            <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide">{title}</h3>
                {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
            </div>
        </div>
        
        <div className="flex-1 w-full min-h-[250px]">
            {children}
        </div>

        <div className="mt-4 pt-4 border-t border-slate-50 dark:border-slate-800">
            <div className="flex gap-2">
                <Info size={14} className="text-indigo-400 mt-0.5 shrink-0" />
                <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400 italic">
                    {description}
                </p>
            </div>
        </div>
    </div>
);

export default FinancialReport;