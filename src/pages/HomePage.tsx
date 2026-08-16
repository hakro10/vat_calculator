import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Wallet, 
  Briefcase, 
  TrendingUp, 
  PieChart, 
  ArrowRight
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { VatCalculator } from '../components/calculators/VatCalculator';
import { PrivacyBadge } from '../components/common/PrivacyBadge';
import { AdPlaceholder } from '../components/common/AdPlaceholder';
import { EducationalModule } from '../components/common/EducationalModule';
import { VAT_EDUCATIONAL_CONTENT } from '../data/educationalContent';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-12">
      <SEOHead
        title="VAT Calculator & Sales Tax Suite | vatcalcs.net — Fast, Free & 100% Privacy-First"
        description="Free online VAT & sales tax calculator. Add or extract VAT instantly with Irish (23%), UK (20%), EU, and US tax presets. 100% private, client-side math."
        canonicalPath="/"
        applicationCategory="FinanceApplication"
        schemaType="WebApplication"
      />
      
      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-4xl mx-auto pt-4 sm:pt-8">
        <PrivacyBadge className="mx-auto" />
        
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          Instant <span className="text-emerald-600 dark:text-emerald-400">VAT &amp; Tax</span> Calculation Suite
        </h1>
        
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Fast, precise, and 100% private. Add or extract VAT, calculate take-home pay, model freelance tax buffers, and project profit margins with zero server tracking.
        </p>
      </div>

      {/* Top AdSense Placement */}
      <AdPlaceholder slotId="home-top-leaderboard" format="horizontal" />

      {/* Main Interactive VAT Calculator */}
      <VatCalculator />

      {/* Mid-Page AdSense Placement */}
      <AdPlaceholder slotId="home-mid-article" format="horizontal" />

      {/* Suite Explorer Grid (Cross-Linking Core Calculators) */}
      <div className="space-y-6 pt-6 no-print">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            Explore All 5 Specialized Tools
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Professional Tax &amp; Finance Suite
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <Link
            to="/salary-tax-calculator"
            className="glass-card p-6 space-y-3 group hover:border-emerald-500/60 dark:hover:border-emerald-500/60 hover:-translate-y-1 transition-all"
          >
            <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 w-fit group-hover:scale-110 transition-transform">
              <Wallet className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center justify-between">
              <span>Salary Tax</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Gross-to-net pay projection with progressive bands, USC/PRSI/NI social insurance, and pension tax relief.
            </p>
          </Link>

          <Link
            to="/freelance-tax-calculator"
            className="glass-card p-6 space-y-3 group hover:border-emerald-500/60 dark:hover:border-emerald-500/60 hover:-translate-y-1 transition-all"
          >
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 w-fit group-hover:scale-110 transition-transform">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center justify-between">
              <span>Freelance Buffer</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Self-employed tax reserves, deductible expense categorization, and quarterly set-aside budgets.
            </p>
          </Link>

          <Link
            to="/capital-gains-tax-calculator"
            className="glass-card p-6 space-y-3 group hover:border-emerald-500/60 dark:hover:border-emerald-500/60 hover:-translate-y-1 transition-all"
          >
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 w-fit group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center justify-between">
              <span>Capital Gains (CGT)</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Calculate CGT liabilities across property, shares, and crypto with statutory annual exemption relief.
            </p>
          </Link>

          <Link
            to="/margin-tax-calculator"
            className="glass-card p-6 space-y-3 group hover:border-emerald-500/60 dark:hover:border-emerald-500/60 hover:-translate-y-1 transition-all"
          >
            <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 w-fit group-hover:scale-110 transition-transform">
              <PieChart className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center justify-between">
              <span>Margin &amp; Profit</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Find required prices from target margin %, deduct output VAT, and calculate net post-corporate tax profits.
            </p>
          </Link>

        </div>
      </div>

      {/* 600+ Words Rich Educational Guide & FAQ Accordions */}
      <EducationalModule guide={VAT_EDUCATIONAL_CONTENT} pageUrl="https://vatcalcs.net/" />

      {/* Bottom AdSense Placement */}
      <AdPlaceholder slotId="home-bottom-banner" format="horizontal" />

    </div>
  );
};
