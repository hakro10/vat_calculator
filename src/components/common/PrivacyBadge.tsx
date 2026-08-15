import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

interface PrivacyBadgeProps {
  className?: string;
}

export const PrivacyBadge: React.FC<PrivacyBadgeProps> = ({ className = '' }) => {
  return (
    <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold tracking-wide ${className}`}>
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
      <span>100% Client-Side Privacy</span>
      <span className="text-emerald-400 dark:text-emerald-600">•</span>
      <span className="hidden sm:inline flex items-center gap-1 font-normal opacity-90">
        <Lock className="w-3 h-3 inline" /> Zero data sent to servers
      </span>
    </div>
  );
};
