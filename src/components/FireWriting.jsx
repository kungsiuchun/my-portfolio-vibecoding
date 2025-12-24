import React, { useState } from 'react';
import './FireWriting.css';

const FireWriting = ({ text = "VIBE" }) => {
  const [isIgnited, setIsIgnited] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const handleMouseEnter = () => {
    if (!isIgnited) {
      setIsIgnited(true);
      // 動畫播放 4 秒後觸發最後的閃爍效果
      setTimeout(() => {
        setIsFinished(true);
      }, 4000);
    }
  };

  const resetAnimation = () => {
    // 離開時重置，讓使用者可以重複玩
    setIsIgnited(false);
    setIsFinished(false);
  };

  return (
    <div 
      className={`fire-container transition-all duration-700 ${isIgnited ? 'bg-slate-950' : 'bg-slate-900'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={resetAnimation}
    >
      <svg viewBox="0 0 400 150" className="fire-svg">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"></feMergeNode>
              <feMergeNode in="SourceGraphic"></feMergeNode>
            </feMerge>
          </filter>
        </defs>

        {/* 底層：尚未引燃的灰黑火藥痕跡 */}
        <text x="50%" y="50%" textAnchor="middle" className="text-path powder-trail">
          {text}
        </text>

        {/* 中層：燃燒中的火線 (只在 isIgnited 為 true 時加上 burning 類別) */}
        <text 
          x="50%" y="50%" 
          textAnchor="middle" 
          className={`text-path burning-fire ${isIgnited ? 'animate-burn' : ''} ${isFinished ? 'final-flash' : ''}`}
        >
          {text}
        </text>

        {/* 提示文字 */}
        {!isIgnited && (
          <text x="50%" y="85%" textAnchor="middle" className="hover-hint">
            Hover to ignite
          </text>
        )}
      </svg>
    </div>
  );
};

export default FireWriting;