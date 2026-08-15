import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { PrivacyBadge } from '../components/common/PrivacyBadge';
import { AdPlaceholder } from '../components/common/AdPlaceholder';
import { EducationalModule } from '../components/common/EducationalModule';
import { MarginCalculator } from '../components/calculators/MarginCalculator';
import { MARGIN_EDUCATIONAL_CONTENT } from '../data/educationalContent';

export const MarginTaxPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Commercial Margin & Tax Calculator', path: '/margin-tax-calculator' }]} />

      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <PrivacyBadge className="mx-auto" />
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Commercial Profit <span className="text-emerald-600 dark:text-emerald-400">Margin &amp; Tax</span> Calculator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
          Discover required prices from target margin %, calculate markup, factor in output VAT/Sales Tax, and forecast net post-corporate tax margins.
        </p>
      </div>

      <AdPlaceholder slotId="margin-top-leaderboard" format="horizontal" />

      <MarginCalculator />

      <AdPlaceholder slotId="margin-mid-content" format="horizontal" />

      <EducationalModule 
        guide={MARGIN_EDUCATIONAL_CONTENT} 
        pageUrl="https://vatcalcs.net/margin-tax-calculator" 
      />

      <AdPlaceholder slotId="margin-bottom-banner" format="horizontal" />
    </div>
  );
};
