import React from 'react';

interface AdPlaceholderProps {
  slotId?: string;
  format?: 'horizontal' | 'rectangle' | 'in-feed';
  className?: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({
  slotId = 'top-leaderboard',
  format = 'horizontal',
  className = '',
}) => {
  const getFormatClasses = () => {
    switch (format) {
      case 'rectangle':
        return 'w-full max-w-[336px] min-h-[280px]';
      case 'in-feed':
        return 'w-full min-h-[140px]';
      case 'horizontal':
      default:
        return 'w-full max-w-4xl min-h-[90px] md:min-h-[110px]';
    }
  };

  return (
    <aside 
      role="complementary" 
      aria-label="Sponsor Advertisement"
      className={`my-8 flex flex-col items-center justify-center ad-banner no-print ${className}`}
    >
      <span className="text-[10px] uppercase font-semibold tracking-widest text-slate-400 dark:text-slate-500 mb-1">
        Advertisement
      </span>
      <div
        data-ad-slot={slotId}
        className={`${getFormatClasses()} mx-auto rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-100/60 dark:bg-slate-900/60 flex flex-col items-center justify-center p-4 text-center text-xs text-slate-400 dark:text-slate-500 transition-all`}
      >
        <span className="font-mono text-[11px] text-slate-400/80 dark:text-slate-500/80 mb-1">
          Google AdSense Placeholder
        </span>
        <span className="text-[10px] opacity-70">
          Client: pub-2116463006242210 • Slot: {slotId}
        </span>
      </div>
    </aside>
  );
};
