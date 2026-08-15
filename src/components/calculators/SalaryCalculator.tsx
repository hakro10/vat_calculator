import React, { useState, useMemo } from 'react';
import { 
  Copy, 
  Check, 
  Printer, 
  Download, 
  RotateCcw, 
  PiggyBank
} from 'lucide-react';
import { calculateSalaryTax, SalaryBreakdown, SalaryCountryPreset, PayFrequency } from '../../utils/calculations';
import { formatCurrency, formatPercent } from '../../utils/formatters';
import { useCurrency } from '../../hooks/useCurrency';
import { copyToClipboard, downloadCsv, triggerPrint } from '../../utils/exportHelpers';

export const SalaryCalculator: React.FC = () => {
  const { currency } = useCurrency();
  const [grossSalary, setGrossSalary] = useState<number>(65000);
  const [country, setCountry] = useState<SalaryCountryPreset>('ie');
  const [pensionPercent, setPensionPercent] = useState<number>(5);
  const [activeFrequency, setActiveFrequency] = useState<PayFrequency>('monthly');
  const [copied, setCopied] = useState<boolean>(false);

  // Custom system inputs
  const [customAllowance, setCustomAllowance] = useState<number>(12570);
  const [customBasicRate, setCustomBasicRate] = useState<number>(20);
  const [customHigherRate, setCustomHigherRate] = useState<number>(40);
  const [customHigherThreshold, setCustomHigherThreshold] = useState<number>(50000);

  const breakdown = useMemo<SalaryBreakdown>(() => {
    return calculateSalaryTax({
      grossAnnual: grossSalary,
      country,
      pensionPercentage: pensionPercent,
      pensionFixed: 0,
      customStandardAllowance: customAllowance,
      customBasicRate,
      customHigherRate,
      customHigherThreshold,
      customSocialRate: 6,
    });
  }, [
    grossSalary,
    country,
    pensionPercent,
    customAllowance,
    customBasicRate,
    customHigherRate,
    customHigherThreshold,
  ]);

  const handleCopy = async () => {
    const text = `Salary Tax Breakdown (${country.toUpperCase()}):\nGross Salary: ${formatCurrency(breakdown.grossPay, currency)}\nPension Deduction: ${formatCurrency(breakdown.pensionContribution, currency)}\nIncome Tax: ${formatCurrency(breakdown.incomeTax, currency)}\nSocial Taxes (NI/PRSI/USC/FICA): ${formatCurrency(breakdown.socialContributions, currency)}\nNet Take-Home Pay (Annual): ${formatCurrency(breakdown.payPeriods.annual, currency)}\nNet Take-Home Pay (Monthly): ${formatCurrency(breakdown.payPeriods.monthly, currency)}\nEffective Tax Rate: ${breakdown.effectiveTaxRate}%\nMarginal Tax Rate: ${breakdown.marginalTaxRate}%\nvia vatcalcs.net`;
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleExportCsv = () => {
    const headers = ['Category', 'Annual Amount', 'Monthly Amount', 'Weekly Amount', 'Percentage of Gross'];
    const rows = [
      ['Gross Salary', breakdown.grossPay, (breakdown.grossPay / 12).toFixed(2), (breakdown.grossPay / 52).toFixed(2), '100%'],
      ['Pension Contribution', breakdown.pensionContribution, (breakdown.pensionContribution / 12).toFixed(2), (breakdown.pensionContribution / 52).toFixed(2), formatPercent((breakdown.pensionContribution / breakdown.grossPay) * 100, 1)],
      ['Income Tax', breakdown.incomeTax, (breakdown.incomeTax / 12).toFixed(2), (breakdown.incomeTax / 52).toFixed(2), formatPercent((breakdown.incomeTax / breakdown.grossPay) * 100, 1)],
      ['Social Taxes & Insurance', breakdown.socialContributions, (breakdown.socialContributions / 12).toFixed(2), (breakdown.socialContributions / 52).toFixed(2), formatPercent((breakdown.socialContributions / breakdown.grossPay) * 100, 1)],
      ['Net Take-Home Pay', breakdown.netTakeHome, breakdown.payPeriods.monthly, breakdown.payPeriods.weekly, formatPercent((breakdown.netTakeHome / breakdown.grossPay) * 100, 1)],
    ];
    downloadCsv(headers, rows, `salary-breakdown-${grossSalary}-${currency}.csv`);
  };

  const getFrequencyMultiplier = (freq: PayFrequency) => {
    switch (freq) {
      case 'annual': return 1;
      case 'monthly': return 1 / 12;
      case 'biweekly': return 1 / 26;
      case 'weekly': return 1 / 52;
      case 'daily': return 1 / 250;
      case 'hourly': return 1 / (52 * 37.5);
    }
  };

  const mult = getFrequencyMultiplier(activeFrequency);

  return (
    <div className="space-y-8">
      
      {/* Top Country Selector Buttons */}
      <div className="glass-card p-2 max-w-2xl mx-auto flex flex-wrap items-center gap-1.5 bg-slate-100/90 dark:bg-slate-900/90">
        {[
          { id: 'ie', label: '🇮🇪 Ireland (PAYE & USC)' },
          { id: 'gb', label: '🇬🇧 UK (HMRC & NI)' },
          { id: 'us', label: '🇺🇸 US (Federal & FICA)' },
          { id: 'custom', label: '⚙️ Custom Progressive' },
        ].map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setCountry(c.id as SalaryCountryPreset)}
            className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              country === c.id
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Inputs (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-card p-6 sm:p-8 space-y-6">
            
            {/* Gross Salary Input */}
            <div className="space-y-2">
              <label htmlFor="salary-gross-input" className="block text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between">
                <span>Gross Annual Salary</span>
                <span className="text-xs font-mono font-normal text-slate-500">
                  Pre-Tax Earnings
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-xl font-bold text-slate-400 font-mono">
                  {currency}
                </div>
                <input
                  id="salary-gross-input"
                  type="number"
                  step="500"
                  min="0"
                  value={grossSalary === 0 ? '' : grossSalary}
                  onChange={(e) => setGrossSalary(parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  className="input-field pl-16 text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400"
                />
              </div>
            </div>

            {/* Quick Salary Chips */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-500">Quick Salary Benchmarks:</span>
              <div className="flex flex-wrap gap-2">
                {[35000, 50000, 65000, 85000, 100000, 150000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setGrossSalary(amt)}
                    className={`btn-chip ${
                      grossSalary === amt
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {formatCurrency(amt, currency, 0)}
                  </button>
                ))}
              </div>
            </div>

            {/* Pension Contribution Section */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PiggyBank className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    Workplace Pension Contribution (%)
                  </span>
                </div>
                <span className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  {pensionPercent}% ({formatCurrency((grossSalary * pensionPercent) / 100, currency)})
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="25"
                step="1"
                value={pensionPercent}
                onChange={(e) => setPensionPercent(parseFloat(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Deducted from gross salary prior to income tax calculation (tax-free relief).
              </p>
            </div>

            {/* Custom Settings if Country === 'custom' */}
            {country === 'custom' && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-3 animate-fade-in">
                <span className="text-xs font-bold text-amber-700 dark:text-amber-300 block">
                  Custom Progressive Brackets Configuration
                </span>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-slate-600 dark:text-slate-400 block mb-1">Tax-Free Allowance</label>
                    <input
                      type="number"
                      value={customAllowance}
                      onChange={(e) => setCustomAllowance(parseFloat(e.target.value) || 0)}
                      className="w-full p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-700 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 dark:text-slate-400 block mb-1">Basic Tax Rate (%)</label>
                    <input
                      type="number"
                      value={customBasicRate}
                      onChange={(e) => setCustomBasicRate(parseFloat(e.target.value) || 0)}
                      className="w-full p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-700 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 dark:text-slate-400 block mb-1">Higher Threshold</label>
                    <input
                      type="number"
                      value={customHigherThreshold}
                      onChange={(e) => setCustomHigherThreshold(parseFloat(e.target.value) || 0)}
                      className="w-full p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-700 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 dark:text-slate-400 block mb-1">Higher Tax Rate (%)</label>
                    <input
                      type="number"
                      value={customHigherRate}
                      onChange={(e) => setCustomHigherRate(parseFloat(e.target.value) || 0)}
                      className="w-full p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-700 font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Reset */}
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => {
                  setGrossSalary(65000);
                  setPensionPercent(5);
                }}
                className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>
            </div>

          </div>
        </div>

        {/* Right Side: Results & Pay Frequency Breakdown (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-card p-6 sm:p-8 space-y-6 bg-gradient-to-b from-white via-white to-emerald-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/20 border-emerald-500/20 shadow-xl">
            
            {/* Take-Home Pay Hero Display */}
            <div className="p-5 rounded-2xl bg-slate-900 text-white dark:bg-slate-950 border border-slate-800 shadow-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Estimated Take-Home Pay
                </span>
                <span className="badge bg-emerald-500/20 text-emerald-300 font-mono text-[11px]">
                  Effective Rate: {breakdown.effectiveTaxRate}%
                </span>
              </div>
              
              <div className="flex items-baseline justify-between">
                <span className="text-3xl sm:text-4xl font-black font-mono text-white tracking-tight">
                  {formatCurrency(breakdown.payPeriods[activeFrequency], currency)}
                </span>
                <span className="text-xs text-slate-400 capitalize font-medium">
                  per {activeFrequency === 'biweekly' ? 'bi-week' : activeFrequency}
                </span>
              </div>
            </div>

            {/* Pay Frequency Tabs */}
            <div className="flex p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl">
              {(['annual', 'monthly', 'biweekly', 'weekly'] as PayFrequency[]).map((freq) => (
                <button
                  key={freq}
                  type="button"
                  onClick={() => setActiveFrequency(freq)}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg capitalize transition-all ${
                    activeFrequency === freq
                      ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {freq}
                </button>
              ))}
            </div>

            {/* Deductions Breakdown Table */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center text-xs text-slate-600 dark:text-slate-400 py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="font-semibold">Gross Salary</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {formatCurrency(breakdown.grossPay * mult, currency)}
                </span>
              </div>

              {breakdown.pensionContribution > 0 && (
                <div className="flex justify-between items-center text-xs text-emerald-700 dark:text-emerald-400 py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span>- Pension Contribution ({pensionPercent}%)</span>
                  <span className="font-mono font-semibold">
                    -{formatCurrency(breakdown.pensionContribution * mult, currency)}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center text-xs text-rose-600 dark:text-rose-400 py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span>- Income Tax (PAYE / Federal)</span>
                <span className="font-mono font-semibold">
                  -{formatCurrency(breakdown.incomeTax * mult, currency)}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs text-amber-600 dark:text-amber-400 py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span>- Social Insurance (USC/PRSI/NI/FICA)</span>
                <span className="font-mono font-semibold">
                  -{formatCurrency(breakdown.socialContributions * mult, currency)}
                </span>
              </div>

              <div className="flex justify-between items-center text-sm font-bold text-emerald-600 dark:text-emerald-400 pt-2 border-t-2 border-slate-200 dark:border-slate-700">
                <span>= Net Take-Home Pay</span>
                <span className="font-mono text-base">
                  {formatCurrency(breakdown.netTakeHome * mult, currency)}
                </span>
              </div>
            </div>

            {/* Visual Proportional Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-semibold text-slate-500">
                <span>Take-Home ({((breakdown.netTakeHome / breakdown.grossPay) * 100).toFixed(1)}%)</span>
                <span>Tax &amp; Deductions ({breakdown.effectiveTaxRate}%)</span>
              </div>
              <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex">
                <div
                  className="bg-emerald-500 h-full"
                  style={{ width: `${(breakdown.netTakeHome / breakdown.grossPay) * 100}%` }}
                  title="Take home pay"
                />
                <div
                  className="bg-rose-500 h-full"
                  style={{ width: `${(breakdown.incomeTax / breakdown.grossPay) * 100}%` }}
                  title="Income tax"
                />
                <div
                  className="bg-amber-500 h-full"
                  style={{ width: `${(breakdown.socialContributions / breakdown.grossPay) * 100}%` }}
                  title="Social contributions"
                />
              </div>
            </div>

            {/* Marginal Rate Indicator */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-400">Marginal Tax Rate on Next €/£/$:</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">{breakdown.marginalTaxRate}%</span>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              <button
                type="button"
                onClick={handleCopy}
                className="btn-secondary text-xs py-2.5 px-3 flex items-center justify-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
              <button
                type="button"
                onClick={handleExportCsv}
                className="btn-secondary text-xs py-2.5 px-3 flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>CSV</span>
              </button>
              <button
                type="button"
                onClick={triggerPrint}
                className="btn-secondary text-xs py-2.5 px-3 flex items-center justify-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
