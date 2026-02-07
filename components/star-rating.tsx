import React from 'react';

const StarRating = ({ rate }: { rate: number }) => {
  const clampedRate = Math.max(0, Math.min(rate, 5));
  const percentage = (clampedRate / 5) * 100;

  return (
    <div className="relative inline-flex text-sm leading-none" aria-label={`Rating: ${clampedRate.toFixed(1)} out of 5`}>
      <div className="text-muted-foreground/30" aria-hidden="true">
        {Array(5)
          .fill(0)
          .map((_, idx) => (
            <span key={idx}>&#9733;</span>
          ))}
      </div>
      <div
        className="absolute top-0 left-0 overflow-hidden whitespace-nowrap text-yellow-400"
        style={{ width: `${percentage}%` }}
        aria-hidden="true"
      >
        {Array(5)
          .fill(0)
          .map((_, idx) => (
            <span key={idx}>&#9733;</span>
          ))}
      </div>
    </div>
  );
};

export default StarRating;
