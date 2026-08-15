import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Cookie, SlidersHorizontal } from 'lucide-react';
import { COOKIE_POLICY_DATA } from '../data/legalContent';

interface CookiePolicyPageProps {
  onOpenCookieModal?: () => void;
}

export const CookiePolicyPage: React.FC<CookiePolicyPageProps> = ({ onOpenCookieModal }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Breadcrumbs items={[{ label: 'Cookie Policy', path: '/cookie-policy' }]} />

      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
          <Cookie className="w-4 h-4" />
          <span>Transparency &amp; Cookies</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {COOKIE_POLICY_DATA.title}
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Last Updated: {COOKIE_POLICY_DATA.lastUpdated}
        </p>
      </div>

      {onOpenCookieModal && (
        <div className="glass-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-emerald-50/60 dark:bg-emerald-950/40 border-emerald-300/60 dark:border-emerald-700/60">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Manage Your Cookie Preferences
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Review and adjust your consent settings for analytics and advertising cookies at any time.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenCookieModal}
            className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5 shrink-0"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Open Cookie Manager</span>
          </button>
        </div>
      )}

      <div className="space-y-8">
        {COOKIE_POLICY_DATA.sections.map((sec, idx) => (
          <div key={idx} className="glass-card p-6 sm:p-8 space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              {sec.heading}
            </h2>
            <div className="space-y-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {sec.paragraphs.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
