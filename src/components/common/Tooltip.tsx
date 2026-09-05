import React, { useState } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom';
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          role="tooltip"
          className={`absolute z-50 px-2.5 py-1 text-xs font-semibold text-white bg-slate-900 rounded-lg shadow-lg pointer-events-none whitespace-nowrap transition-opacity ${
            position === 'top' ? '-top-8 left-1/2 -translate-x-1/2' : 'top-full mt-1.5 left-1/2 -translate-x-1/2'
          }`}
        >
          {content}
        </div>
      )}
    </div>
  );
};
