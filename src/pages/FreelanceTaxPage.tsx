import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { PrivacyBadge } from '../components/common/PrivacyBadge';
import { AdPlaceholder } from '../components/common/AdPlaceholder';
import { EducationalModule } from '../components/common/EducationalModule';
import { FreelanceCalculator } from '../components/calculators/FreelanceCalculator';
import { FREELANCE_EDUCATIONAL_CONTENT } from '../data/educationalContent';

export const FreelanceTaxPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Freelance Tax Calculator', path: '/freelance-tax-calculator' }]} />

      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <PrivacyBadge className="mx-auto" />
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Freelance &amp; Self-Employed <span className="text-emerald-600 dark:text-emerald-400">Tax Buffer</span> Calculator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
          Calculate your safe-to-spend take-home pay, allowable business expense deductions, and quarterly tax reserve set-asides.
        </p>
      </div>

      <AdPlaceholder slotId="freelance-top-leaderboard" format="horizontal" />

      <FreelanceCalculator />

      <AdPlaceholder slotId="freelance-mid-content" format="horizontal" />

      <EducationalModule 
        guide={FREELANCE_EDUCATIONAL_CONTENT} 
        pageUrl="https://vatcalcs.net/freelance-tax-calculator" 
      />

      <AdPlaceholder slotId="freelance-bottom-banner" format="horizontal" />
    </div>
  );
};
