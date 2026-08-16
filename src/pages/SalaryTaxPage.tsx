import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SEOHead } from '../components/common/SEOHead';
import { SalaryCalculator } from '../components/calculators/SalaryCalculator';
import { AdPlaceholder } from '../components/common/AdPlaceholder';
import { EducationalModule } from '../components/common/EducationalModule';
import { SALARY_EDUCATIONAL_CONTENT } from '../data/educationalContent';

export const SalaryTaxPage: React.FC = () => {
  return (
    <div className="space-y-12">
      <SEOHead
        title="Gross to Net Salary Calculator | Take-Home Pay & Tax Bands | vatcalcs.net"
        description="Calculate your take-home pay with our free gross-to-net salary calculator. Models progressive income tax brackets, NI/USC/PRSI, and pension tax relief."
        canonicalPath="/salary-tax-calculator"
        applicationCategory="FinanceApplication"
        schemaType="WebApplication"
      />

      <Breadcrumbs items={[{ label: 'Salary Tax Calculator', path: '/salary-tax-calculator' }]} />

      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Gross-to-Net <span className="text-emerald-600 dark:text-emerald-400">Salary Tax</span> Calculator
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300">
          Compute your take-home pay, progressive tax brackets, social insurance deductions, and pension tax relief.
        </p>
      </div>

      <AdPlaceholder slotId="salary-top-leaderboard" format="horizontal" />

      {/* Main Calculator */}
      <SalaryCalculator />

      <AdPlaceholder slotId="salary-mid-article" format="horizontal" />

      {/* 600+ Words Educational Guide & FAQ Schema */}
      <EducationalModule
        guide={SALARY_EDUCATIONAL_CONTENT}
        pageUrl="https://vatcalcs.net/salary-tax-calculator"
      />

      <AdPlaceholder slotId="salary-bottom-banner" format="horizontal" />
    </div>
  );
};
