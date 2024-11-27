import React, { useEffect, useState } from 'react';
import './index.scss';

type SkeletonProps = {
  width?: string;
  height?: string;
  repeat: number;
};

const Skeleton: React.FC<SkeletonProps> = ({ width, height, repeat = 1 }) => {
  const [rows, setRows] = useState<number[]>([]);

  useEffect(() => {
    const r = [];
    for (let i = 0; i < repeat; i++) {
      r.push(i);
    }
    setRows(r);
  }, [repeat]);

  return (
    <div id="skeleton-container">
      {rows.map((row) => (
        <div
          className="skeleton"
          key={row}
          style={{ width: width || '100%', height: height || '20px' }}
        >
          <div className="pulse"></div>
        </div>
      ))}
    </div>
  );
};

export { Skeleton };
