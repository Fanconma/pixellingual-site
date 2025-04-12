import React from 'react';

const StarRating = ({ rate }) => {
  // 限制评分在 0 到 5 之间
  const clampedRate = Math.max(0, Math.min(rate, 5));
  // 计算填充的百分比
  const percentage = (clampedRate / 5) * 100;

  return (
    <div className="relative inline-block text-base">
      {/* 底层灰色星星 */}
      <div className="text-gray-300">
        {Array(5)
          .fill(0)
          .map((_, idx) => (
            <span key={idx}>★</span>
          ))}
      </div>
      {/* 上层黄色星星，通过 Tailwind 的 overflow-hidden 和绝对定位控制宽度 */}
      <div
        className="absolute top-0 left-0 overflow-hidden whitespace-nowrap text-yellow-400"
        style={{ width: `${percentage}%` }}
      >
        {Array(5)
          .fill(0)
          .map((_, idx) => (
            <span key={idx}>★</span>
          ))}
      </div>
    </div>
  );
};

export default StarRating;
