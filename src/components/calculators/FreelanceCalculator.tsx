import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Trash2, 
  ShieldCheck, 
  Copy, 
  Check, 
  Printer, 
  Download, 
  DollarSign, 
  Clock,
  Receipt
} from 'lucide-react';
import { calculateFreelanceTax, FreelanceBreakdown, FreelanceExpenseItem } from '../../utils/calculations';
import { formatCurrency, formatPercent } from '../../utils/formatters';
import { useCurrency } from '../../hooks/useCurrency';
import { copyToClipboard, downloadCsv, triggerPrint } from '../../utils/exportHelpers';

export const FreelanceCalculator: React.FC = () => {
  const { currency, currencyConfig } = useCurrency();
  const [billingType, setBillingType] = useState<'rate' | 'gross'>('rate');
  const [hourlyRate, setHourlyRate] = useState<number>(65);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(30);
  const [weeksPerYear, setWeeksPerYear] = useState<number>(46);
  const [grossAnnualRevenue, setGrossAnnualRevenue] = useState<number>(90000);

  // Expenses
  const [expenses, setExpenses] = useState<FreelanceExpenseItem[]>([
    { id: '1', category: 'Software & SaaS Subscriptions', amount: 150, period: 'monthly' },
    { id: '2', category: 'Home Office & Broadband', amount: 120, period: 'monthly' },
    { id: '3', category: 'Accounting & Tax Prep', amount: 1200, period: 'annual' },
    { id: '4', category: 'Equipment & Hardware', amount: 1500, period: 'annual' },
  ]);

  const [pensionAnnual] = useState<number>(4000);
  const [isVatRegistered, setIsVatRegistered] = useState<boolean>(true);
  const [vatRate, setVatRate] = useState<number>(23);
  const [incomeTaxBuffer, setIncomeTaxBuffer] = useState<number>(25);
  const [socialBuffer, setSocialBuffer] = useState<number>(10);
  const [emergencyBuffer, setEmergencyBuffer] = useState<number>(5);
  const [copied, setCopied] = useState<boolean>(false);

  const breakdown = useMemo<FreelanceBreakdown>(() => {
    return calculateFreelanceTax({
      billingType,
      hourlyRate,
      billableHoursPerWeek: hoursPerWeek,
      weeksPerYear,
      grossAnnualRevenue,
      expenses,
      pensionContributionAnnual: pensionAnnual,
      isVatRegistered,
      vatRate,
      incomeTaxBufferPercent: incomeTaxBuffer,
      socialContributionPercent: socialBuffer,
      rainyDayEmergencyBufferPercent: emergencyBuffer,
    });
  }, [
    billingType,
    hourlyRate,
    hoursPerWeek,
    weeksPerYear,
    grossAnnualRevenue,
    expenses,
    pensionAnnual,
    isVatRegistered,
    vatRate,
    incomeTaxBuffer,
    socialBuffer,
    emergencyBuffer,
  ]);

  const addExpenseItem = () => {
    setExpenses(prev => [
      ...prev,
      { id: Date.now().toString(), category: 'New Expense Category', amount: 100, period: 'monthly' },
    ]);
  };

  const removeExpenseItem = (id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  const updateExpense = (id: string, field: keyof FreelanceExpenseItem, val: string | number) => {
    setExpenses(prev => prev.map(e => e.id === id ? { ...e, [field]: val } : e));
  };

  const handleCopy = async () => {
    const text = `Freelance Tax Buffer Plan:\nGross Revenue: ${formatCurrency(breakdown.grossInvoicedRevenue, currency)}\nAllowable Expenses: ${formatCurrency(breakdown.totalAnnualExpenses, currency)}\nNet Taxable Profit: ${formatCurrency(breakdown.netTaxableProfit, currency)}\nRecommended Tax Reserve (${breakdown.totalTaxReservePercent.toFixed(1)}%): ${formatCurrency(breakdown.totalTaxReserve, currency)}\nQuarterly Tax Set-Aside: ${formatCurrency(breakdown.recommendedQuarterlyTaxPayment, currency)}\nSafe-to-Spend Net Take-Home: ${formatCurrency(breakdown.safeToSpendTakeHome, currency)} (${formatCurrency(breakdown.monthlySafeToSpend, currency)}/month)\nvia vatcalcs.net`;
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleExportCsv = () => {
    const headers = ['Financial Metric', 'Annual Amount', 'Monthly Equivalent', 'Percentage of Revenue'];
    const rows = [
      ['Gross Invoiced Revenue', breakdown.grossInvoicedRevenue, (breakdown.grossInvoicedRevenue / 12).toFixed(2), '100%'],
      ['Allowable Business Expenses', breakdown.totalAnnualExpenses, (breakdown.totalAnnualExpenses / 12).toFixed(2), formatPercent((breakdown.totalAnnualExpenses / breakdown.grossInvoicedRevenue) * 100, 1)],
      ['Total Tax Reserve Buffer', breakdown.totalTaxReserve, (breakdown.totalTaxReserve / 12).toFixed(2), formatPercent((breakdown.totalTaxReserve / breakdown.grossInvoicedRevenue) * 100, 1)],
      ['Quarterly Tax Installment', breakdown.recommendedQuarterlyTaxPayment, (breakdown.recommendedQuarterlyTaxPayment / 3).toFixed(2), '-'],
      ['Emergency Cash Buffer', breakdown.emergencyBufferAmount, (breakdown.emergencyBufferAmount / 12).toFixed(2), formatPercent((breakdown.emergencyBufferAmount / breakdown.grossInvoicedRevenue) * 100, 1)],
      ['Safe-to-Spend Take-Home', breakdown.safeToSpendTakeHome, breakdown.monthlySafeToSpend, formatPercent((breakdown.safeToSpendTakeHome / breakdown.grossInvoicedRevenue) * 100, 1)],
    ];
    downloadCsv(headers, rows, `freelance-tax-plan-${currency}.csv`);
  };

  return (
    <div className="space-y-8">
      
      {/* Top Billing Mode Switcher */}
      <div className="glass-card p-2 max-w-xl mx-auto flex items-center gap-2 bg-slate-100/90 dark:bg-slate-900/90">
        <button
          type="button"
          onClick={() => setBillingType('rate')}
          className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            billingType === 'rate'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Hourly / Daily Billing Rate</span>
        </button>
        <button
          type="button"
          onClick={() => setBillingType('gross')}
          className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            billingType === 'gross'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Total Annual Revenue</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Inputs & Expense Builder (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-card p-6 sm:p-8 space-y-6">
            
            {/* Revenue Inputs */}
            {billingType === 'rate' ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="hourly-rate-input" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Hourly Rate ({currencyConfig.symbol})
                  </label>
                  <input
                    id="hourly-rate-input"
                    type="number"
                    value={hourlyRate || ''}
                    onChange={(e) => setHourlyRate(parseFloat(e.target.value) || 0)}
                    className="input-field text-lg font-bold"
                  />
                </div>
                <div>
                  <label htmlFor="hours-per-week-input" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Billable Hours / Wk
                  </label>
                  <input
                    id="hours-per-week-input"
                    type="number"
                    value={hoursPerWeek || ''}
                    onChange={(e) => setHoursPerWeek(parseFloat(e.target.value) || 0)}
                    className="input-field text-lg font-bold"
                  />
                </div>
                <div>
                  <label htmlFor="weeks-per-year-input" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Working Wks / Yr
                  </label>
                  <input
                    id="weeks-per-year-input"
                    type="number"
                    value={weeksPerYear || ''}
                    onChange={(e) => setWeeksPerYear(parseFloat(e.target.value) || 0)}
                    className="input-field text-lg font-bold"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <label htmlFor="gross-freelance-rev-input" className="block text-sm font-bold text-slate-900 dark:text-white">
                  Gross Annual Invoiced Revenue
                </label>
                <input
                  id="gross-freelance-rev-input"
                  type="number"
                  step="1000"
                  value={grossAnnualRevenue || ''}
                  onChange={(e) => setGrossAnnualRevenue(parseFloat(e.target.value) || 0)}
                  className="input-field text-2xl font-bold text-emerald-600 dark:text-emerald-400"
                />
              </div>
            )}

            {/* Deductible Business Expenses Section */}
            <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Allowable Business Expense Deductions
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={addExpenseItem}
                  className="btn-primary text-xs py-1 px-2.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Expense</span>
                </button>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {expenses.map((exp) => (
                  <div key={exp.id} className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                    <input
                      type="text"
                      value={exp.category}
                      onChange={(e) => updateExpense(exp.id, 'category', e.target.value)}
                      className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                    />
                    <div className="relative w-28">
                      <span className="absolute left-2 top-1 text-xs text-slate-400">{currencyConfig.symbol}</span>
                      <input
                        type="number"
                        value={exp.amount || ''}
                        onChange={(e) => updateExpense(exp.id, 'amount', parseFloat(e.target.value) || 0)}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg pl-5 pr-2 py-1 text-xs font-mono text-right focus:outline-none"
                      />
                    </div>
                    <select
                      value={exp.period}
                      onChange={(e) => updateExpense(exp.id, 'period', e.target.value as 'monthly' | 'annual')}
                      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-700 dark:text-slate-300 focus:outline-none"
                    >
                      <option value="monthly">/ mo</option>
                      <option value="annual">/ yr</option>
                    </select>
                    {expenses.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeExpenseItem(exp.id)}
                        className="p-1 text-slate-400 hover:text-rose-500"
                        title="Delete expense"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center text-xs text-slate-500 pt-1">
                <span>Total Annual Deductions:</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                  {formatCurrency(breakdown.totalAnnualExpenses, currency)} / yr
                </span>
              </div>
            </div>

            {/* Tax & Buffer Percentage Sliders */}
            <div className="space-y-4 pt-2 border-t border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Buffer Reserve Percentages
              </span>

              {/* Income Tax Buffer */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700 dark:text-slate-300">Income Tax Reserve:</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400">{incomeTaxBuffer}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="45"
                  value={incomeTaxBuffer}
                  onChange={(e) => setIncomeTaxBuffer(parseFloat(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              {/* Social Tax Buffer */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700 dark:text-slate-300">Self-Employment Social Tax (SECA/PRSI/NI):</span>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400">{socialBuffer}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={socialBuffer}
                  onChange={(e) => setSocialBuffer(parseFloat(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>

              {/* Emergency Reserve Buffer */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700 dark:text-slate-300">Rainy Day / Emergency Cushion:</span>
                  <span className="font-mono text-amber-600 dark:text-amber-400">{emergencyBuffer}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="15"
                  value={emergencyBuffer}
                  onChange={(e) => setEmergencyBuffer(parseFloat(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
              </div>

              {/* VAT Registered Checkbox */}
              <div className="pt-2 flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isVatRegistered}
                    onChange={(e) => setIsVatRegistered(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>VAT Registered (Collect &amp; Hold Output VAT)</span>
                </label>
                {isVatRegistered && (
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={vatRate}
                      onChange={(e) => setVatRate(parseFloat(e.target.value) || 0)}
                      className="w-14 p-1 text-xs text-right font-mono bg-white dark:bg-slate-900 border rounded"
                    />
                    <span className="text-xs text-slate-400">%</span>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>

        {/* Right: Take-Home & Quarterly Reserve Output (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card p-6 sm:p-8 space-y-6 bg-gradient-to-b from-white via-white to-emerald-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/20 border-emerald-500/20 shadow-xl">
            
            {/* Safe-to-Spend Hero */}
            <div className="p-5 rounded-2xl bg-emerald-600 text-white dark:bg-emerald-700 shadow-xl space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-100 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Safe-to-Spend Take-Home
              </span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight">
                  {formatCurrency(breakdown.monthlySafeToSpend, currency)}
                </span>
                <span className="text-xs text-emerald-100 font-semibold">/ month</span>
              </div>
              <p className="text-[11px] text-emerald-100/90 pt-1">
                Annual safe personal take-home: {formatCurrency(breakdown.safeToSpendTakeHome, currency)}
              </p>
            </div>

            {/* Quarterly Set-Aside Card */}
            <div className="p-4 rounded-xl bg-amber-500/10 dark:bg-slate-900 border border-amber-500/30 dark:border-slate-800 space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                Recommended Quarterly Tax Payment
              </span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
                  {formatCurrency(breakdown.recommendedQuarterlyTaxPayment, currency)}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">every 3 months</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                Total annual tax reserve: {formatCurrency(breakdown.totalTaxReserve, currency)} ({breakdown.totalTaxReservePercent.toFixed(1)}% of revenue)
              </p>
            </div>

            {/* Detailed Allocation List */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-600 dark:text-slate-400">Gross Invoiced Revenue</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {formatCurrency(breakdown.grossInvoicedRevenue, currency)}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                <span>- Allowable Expenses</span>
                <span className="font-mono font-semibold text-rose-500">
                  -{formatCurrency(breakdown.totalAnnualExpenses, currency)}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800 font-bold text-slate-800 dark:text-slate-200">
                <span>= Net Taxable Profit</span>
                <span className="font-mono">{formatCurrency(breakdown.netTaxableProfit, currency)}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800 text-amber-600 dark:text-amber-400">
                <span>- Income Tax Reserve ({incomeTaxBuffer}%)</span>
                <span className="font-mono">-{formatCurrency(breakdown.incomeTaxBufferAmount, currency)}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800 text-indigo-600 dark:text-indigo-400">
                <span>- Social Insurance Buffer ({socialBuffer}%)</span>
                <span className="font-mono">-{formatCurrency(breakdown.socialContributionBufferAmount, currency)}</span>
              </div>

              {isVatRegistered && (
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800 text-teal-600 dark:text-teal-400">
                  <span>+ Output VAT Held for Revenue</span>
                  <span className="font-mono">+{formatCurrency(breakdown.vatCollected, currency)}</span>
                </div>
              )}

              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800 text-slate-500">
                <span>- Emergency Rainy Day Reserve ({emergencyBuffer}%)</span>
                <span className="font-mono">-{formatCurrency(breakdown.emergencyBufferAmount, currency)}</span>
              </div>
            </div>

            {/* Visual Split */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Take-Home</span>
                <span>Tax Buffer</span>
                <span>Expenses</span>
              </div>
              <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex">
                <div
                  className="bg-emerald-500 h-full"
                  style={{ width: `${(breakdown.safeToSpendTakeHome / (breakdown.grossInvoicedRevenue || 1)) * 100}%` }}
                />
                <div
                  className="bg-amber-500 h-full"
                  style={{ width: `${(breakdown.totalTaxReserve / (breakdown.grossInvoicedRevenue || 1)) * 100}%` }}
                />
                <div
                  className="bg-rose-500 h-full"
                  style={{ width: `${(breakdown.totalAnnualExpenses / (breakdown.grossInvoicedRevenue || 1)) * 100}%` }}
                />
              </div>
            </div>

            {/* Action Buttons */}
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
