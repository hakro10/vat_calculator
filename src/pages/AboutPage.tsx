import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SEOHead } from '../components/common/SEOHead';
import { Sparkles, Mail } from 'lucide-react';
import { ABOUT_US_DATA } from '../data/legalContent';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <SEOHead
        title="About Us | Precision Financial Engineering | vatcalcs.net"
        description="Discover the mission behind vatcalcs.net: delivering high-speed, accurate, and completely private financial and tax calculation tools worldwide."
        canonicalPath="/about"
        schemaType="AboutPage"
      />

      <Breadcrumbs items={[{ label: 'About Us', path: '/about' }]} />

      {/* Header */}
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Vision &amp; Mission</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          {ABOUT_US_DATA.title}
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
          {ABOUT_US_DATA.mission}
        </p>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {ABOUT_US_DATA.pillars.map((pillar, idx) => (
          <div key={idx} className="glass-card p-6 space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                {pillar.title}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {pillar.description}
            </p>
          </div>
        ))}
      </div>

      {/* Narrative Card */}
      <div className="glass-card p-6 sm:p-8 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Why We Built vatcalcs.net
        </h2>
        <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          {ABOUT_US_DATA.paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <Mail className="w-4 h-4 text-emerald-600" />
          <span>Direct Contact: </span>
          <a href="mailto:support@vatcalcs.net" className="font-semibold text-emerald-600 hover:underline">
            support@vatcalcs.net
          </a>
        </div>
      </div>

    </div>
  );
};
