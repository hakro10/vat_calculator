import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { PrivacyBadge } from '../components/common/PrivacyBadge';
import { AdPlaceholder } from '../components/common/AdPlaceholder';
import { EducationalModule } from '../components/common/EducationalModule';
import { SalaryCalculator } from '../components/calculators/SalaryCalculator';
import { SALARY_EDUCATIONAL_CONTENT } from '../data/educationalContent';

export const SalaryTaxPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Salary Tax Calculator', path: '/salary-tax-calculator' }]} />

      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <PrivacyBadge className="mx-auto" />
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Gross-to-Net <span className="text-emerald-600 dark:text-emerald-400">Salary Tax</span> Calculator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
          Calculate your net take-home pay, progressive income tax bands, PRSI/USC/NI social contributions, and tax-free pension relief.
        </p>
      </div>

      <AdPlaceholder slotId="salary-top-leaderboard" format="horizontal" />

      <SalaryCalculator />

      <AdPlaceholder slotId="salary-mid-content" format="horizontal" />

      <EducationalModule 
        guide={SALARY_EDUCATIONAL_CONTENT} 
        pageUrl="https://vatcalcs.net/salary-tax-calculator" 
      />

      <AdPlaceholder slotId="salary-bottom-banner" format="horizontal" />
    </div>
  );
};
