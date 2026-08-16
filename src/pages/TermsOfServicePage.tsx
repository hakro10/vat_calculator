import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SEOHead } from '../components/common/SEOHead';
import { FileText, AlertCircle } from 'lucide-react';
import { TERMS_OF_SERVICE_DATA } from '../data/legalContent';

export const TermsOfServicePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <SEOHead
        title="Terms of Service & Financial Disclaimer | vatcalcs.net"
        description="Review the terms of service and educational financial disclaimer for vatcalcs.net. Understand our free-to-use calculation guidelines."
        canonicalPath="/terms-of-service"
        schemaType="WebPage"
      />

      <Breadcrumbs items={[{ label: 'Terms of Service', path: '/terms-of-service' }]} />

      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold">
          <FileText className="w-4 h-4" />
          <span>User Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {TERMS_OF_SERVICE_DATA.title}
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Last Updated: {TERMS_OF_SERVICE_DATA.lastUpdated}
        </p>
      </div>

      {/* Important Disclaimer Notice */}
      <div className="glass-card p-6 sm:p-8 bg-amber-500/10 border-amber-500/30 space-y-3">
        <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-base">
          <AlertCircle className="w-5 h-5" />
          <h2>Non-Financial Advice Notice</h2>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The information, formulas, and calculator outputs on vatcalcs.net are provided for general educational and estimation purposes only. They do not constitute statutory tax, legal, or accounting advice. Always consult a qualified CPA or licensed tax professional before filing returns.
        </p>
      </div>

      {/* Terms Sections */}
      <div className="space-y-8">
        {TERMS_OF_SERVICE_DATA.sections.map((sec, idx) => (
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
