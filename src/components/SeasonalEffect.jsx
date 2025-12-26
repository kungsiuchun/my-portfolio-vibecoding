import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

const SeasonalEffect = () => {
  // 💡 原生偵測視窗大小的邏輯
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [effect, setEffect] = useState(null);

  useEffect(() => {
    // 更新視窗大小的 function
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // 監聽視窗縮放
    window.addEventListener('resize', handleResize);

    // 💡 節日判定邏輯 (今天是聖誕節，所以會觸發)
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    // 🎅 聖誕節 (12/20 - 12/26)
    if (month === 12 && day >= 20 && day <= 26) {
      setEffect('snow');
    }
    // 🎆 跨年 (12/31 - 1/1)
    else if ((month === 12 && day === 31) || (month === 1 && day === 1)) {
      setEffect('fireworks');
    }

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!effect) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {effect === 'snow' && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={100} // 因為形狀變複雜了，數量稍微減少一點保持優雅
          gravity={0.012}      // 結晶比較輕，飄落速度再慢一點
          wind={0.005}         // 加一點點微風，讓飄落路徑不是直線
          colors={['#ffffff', '#eef2ff']} // 使用純白和極淡的冰藍色
          opacity={0.9}
          /* ❄️ 核心修改：繪製六角結晶雪花 ❄️ */
          drawShape={ctx => {
            // 設置結晶線條的樣式
            ctx.lineWidth = 1.5; // 線條細一點比較像冰晶
            ctx.strokeStyle = ctx.fillStyle; // 使用傳入的顏色作為線條顏色
            ctx.lineCap = 'round'; // 讓線條端點圓潤一點

            const radius = 6; // 雪花半徑大小 (可以調整這個數字來改變雪花大小)

            ctx.beginPath();
            // 繪製三條交叉的線段，每條旋轉 60 度，形成六角對稱
            for (let i = 0; i < 3; i++) {
              const angle = (Math.PI / 3) * i; // 0度, 60度, 120度
              
              // 計算線段端點座標
              const x = radius * Math.cos(angle);
              const y = radius * Math.sin(angle);

              // 畫一條穿過中心點 (0,0) 的線，從 (-x, -y) 到 (x, y)
              ctx.moveTo(-x, -y);
              ctx.lineTo(x, y);
            }
            
            // ⚠️ 這裡關鍵是用 stroke (描邊) 而不是 fill (填充)
            ctx.stroke(); 
            ctx.closePath();
          }}
        />
      )}

      {effect === 'fireworks' && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={300}
          recycle={false}
          gravity={0.1}
          colors={['#ff0000', '#ffd700', '#ff69b4', '#00fbff', '#ff00ff']}
        />
      )}
    </div>
  );
};

export default SeasonalEffect;