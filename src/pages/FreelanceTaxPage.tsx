import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SEOHead } from '../components/common/SEOHead';
import { FreelanceCalculator } from '../components/calculators/FreelanceCalculator';
import { AdPlaceholder } from '../components/common/AdPlaceholder';
import { EducationalModule } from '../components/common/EducationalModule';
import { FREELANCE_EDUCATIONAL_CONTENT } from '../data/educationalContent';

export const FreelanceTaxPage: React.FC = () => {
  return (
    <div className="space-y-12">
      <SEOHead
        title="Freelance Tax Calculator & Self-Employed Buffer | vatcalcs.net"
        description="Calculate self-employed tax reserves, deductible business expenses, and safe take-home pay. Plan quarterly estimated tax payments with 100% client privacy."
        canonicalPath="/freelance-tax-calculator"
        applicationCategory="FinanceApplication"
        schemaType="WebApplication"
      />

      <Breadcrumbs items={[{ label: 'Freelance Tax Buffer', path: '/freelance-tax-calculator' }]} />

      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Freelance &amp; Self-Employed <span className="text-emerald-600 dark:text-emerald-400">Tax Buffer</span>
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300">
          Calculate your safe personal take-home pay, allowable business expense write-offs, and quarterly tax reserves.
        </p>
      </div>

      <AdPlaceholder slotId="freelance-top-leaderboard" format="horizontal" />

      {/* Main Calculator */}
      <FreelanceCalculator />

      <AdPlaceholder slotId="freelance-mid-article" format="horizontal" />

      {/* 600+ Words Educational Guide & FAQ Schema */}
      <EducationalModule
        guide={FREELANCE_EDUCATIONAL_CONTENT}
        pageUrl="https://vatcalcs.net/freelance-tax-calculator"
      />

      <AdPlaceholder slotId="freelance-bottom-banner" format="horizontal" />
    </div>
  );
};
