import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ShieldCheck, Lock } from 'lucide-react';
import { PRIVACY_POLICY_DATA } from '../data/legalContent';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Breadcrumbs items={[{ label: 'Privacy Policy', path: '/privacy-policy' }]} />

      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>Privacy-First Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {PRIVACY_POLICY_DATA.title}
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Last Updated: {PRIVACY_POLICY_DATA.lastUpdated}
        </p>
      </div>

      {/* Callout Guarantee Box */}
      <div className="glass-card p-6 sm:p-8 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 border-emerald-500/30 space-y-3">
        <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-bold text-base">
          <Lock className="w-5 h-5" />
          <h2>The 100% Client-Side Privacy Guarantee</h2>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          At vatcalcs.net, we process all financial computations (invoices, salaries, business margins, capital gains) directly inside your web browser’s JavaScript engine. <strong>Zero financial figures, revenue amounts, or calculation inputs are ever uploaded to or stored on our servers.</strong>
        </p>
      </div>

      {/* Policy Sections */}
      <div className="space-y-8">
        {PRIVACY_POLICY_DATA.sections.map((sec, idx) => (
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
