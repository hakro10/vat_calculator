import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { FileText, AlertCircle } from 'lucide-react';
import { TERMS_OF_SERVICE_DATA } from '../data/legalContent';

export const TermsOfServicePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Breadcrumbs items={[{ label: 'Terms of Service', path: '/terms-of-service' }]} />

      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
          <FileText className="w-4 h-4" />
          <span>Terms &amp; Disclaimers</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {TERMS_OF_SERVICE_DATA.title}
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Last Updated: {TERMS_OF_SERVICE_DATA.lastUpdated}
        </p>
      </div>

      <div className="glass-card p-6 sm:p-8 bg-amber-500/10 border-amber-500/30 space-y-2">
        <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300 font-bold text-sm">
          <AlertCircle className="w-4 h-4" />
          <h2>Statutory Tax Disclaimer</h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The calculations and tools on vatcalcs.net are provided for general educational and estimation purposes only. They do not substitute for professional accounting advice from a licensed tax advisor or certified public accountant.
        </p>
      </div>

      <div className="space-y-8">
        {TERMS_OF_SERVICE_DATA.sections.map((sec, idx) => (
          <div key={idx} className="glass-card p-6 sm:p-8 space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
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
