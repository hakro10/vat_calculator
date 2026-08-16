import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SEOHead } from '../components/common/SEOHead';
import { MarginCalculator } from '../components/calculators/MarginCalculator';
import { AdPlaceholder } from '../components/common/AdPlaceholder';
import { EducationalModule } from '../components/common/EducationalModule';
import { MARGIN_EDUCATIONAL_CONTENT } from '../data/educationalContent';

export const MarginTaxPage: React.FC = () => {
  return (
    <div className="space-y-12">
      <SEOHead
        title="Commercial Margin & Tax Calculator | Markup & Profit Discovery | vatcalcs.net"
        description="Find required product selling prices from target gross margin %, incorporate VAT/sales tax, and project net post-corporate tax business profit."
        canonicalPath="/margin-tax-calculator"
        applicationCategory="FinanceApplication"
        schemaType="WebApplication"
      />

      <Breadcrumbs items={[{ label: 'Margin & Profit Calculator', path: '/margin-tax-calculator' }]} />

      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Commercial <span className="text-emerald-600 dark:text-emerald-400">Margin &amp; Profit</span> Calculator
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300">
          Model gross margin %, markup multipliers, output VAT liabilities, corporate taxes, and break-even unit volume.
        </p>
      </div>

      <AdPlaceholder slotId="margin-top-leaderboard" format="horizontal" />

      {/* Main Calculator */}
      <MarginCalculator />

      <AdPlaceholder slotId="margin-mid-article" format="horizontal" />

      {/* 600+ Words Educational Guide & FAQ Schema */}
      <EducationalModule
        guide={MARGIN_EDUCATIONAL_CONTENT}
        pageUrl="https://vatcalcs.net/margin-tax-calculator"
      />

      <AdPlaceholder slotId="margin-bottom-banner" format="horizontal" />
    </div>
  );
};
