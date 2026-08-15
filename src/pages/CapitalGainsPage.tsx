import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { PrivacyBadge } from '../components/common/PrivacyBadge';
import { AdPlaceholder } from '../components/common/AdPlaceholder';
import { EducationalModule } from '../components/common/EducationalModule';
import { CapitalGainsCalculator } from '../components/calculators/CapitalGainsCalculator';
import { CGT_EDUCATIONAL_CONTENT } from '../data/educationalContent';

export const CapitalGainsPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Capital Gains Tax Calculator', path: '/capital-gains-tax-calculator' }]} />

      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <PrivacyBadge className="mx-auto" />
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Capital Gains Tax <span className="text-emerald-600 dark:text-emerald-400">(CGT)</span> Calculator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
          Compute net chargeable gains, incidental purchase/disposal deductions, statutory annual exemptions, and net cash proceeds.
        </p>
      </div>

      <AdPlaceholder slotId="cgt-top-leaderboard" format="horizontal" />

      <CapitalGainsCalculator />

      <AdPlaceholder slotId="cgt-mid-content" format="horizontal" />

      <EducationalModule 
        guide={CGT_EDUCATIONAL_CONTENT} 
        pageUrl="https://vatcalcs.net/capital-gains-tax-calculator" 
      />

      <AdPlaceholder slotId="cgt-bottom-banner" format="horizontal" />
    </div>
  );
};
