import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SEOHead } from '../components/common/SEOHead';
import { Cookie, Settings } from 'lucide-react';
import { COOKIE_POLICY_DATA } from '../data/legalContent';
import { useCookieConsent } from '../hooks/useCookieConsent';

export const CookiePolicyPage: React.FC = () => {
  const { openCustomize } = useCookieConsent();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <SEOHead
        title="Cookie Policy & Consent Management | vatcalcs.net"
        description="Learn how vatcalcs.net uses first-party LocalStorage and third-party advertising cookies, and manage your cookie preferences anytime."
        canonicalPath="/cookie-policy"
        schemaType="WebPage"
      />

      <Breadcrumbs items={[{ label: 'Cookie Policy', path: '/cookie-policy' }]} />

      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold">
          <Cookie className="w-4 h-4" />
          <span>Tracking &amp; Storage Transparency</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {COOKIE_POLICY_DATA.title}
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Last Updated: {COOKIE_POLICY_DATA.lastUpdated}
        </p>
      </div>

      {/* Interactive Preferences Card */}
      <div className="glass-card p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-emerald-500/10 border-emerald-500/30">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Manage Your Cookie Preferences
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            You can customize, enable, or revoke non-essential advertising and analytics cookies at any time.
          </p>
        </div>
        <button
          onClick={openCustomize}
          className="btn-primary flex items-center gap-2 text-xs shrink-0 cursor-pointer"
        >
          <Settings className="w-4 h-4" />
          <span>Customize Cookies</span>
        </button>
      </div>

      {/* Policy Sections */}
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
