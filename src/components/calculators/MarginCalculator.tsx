import React, { useState, useMemo } from 'react';
import { 
  Target, 
  Copy, 
  Check, 
  Printer, 
  Download, 
  DollarSign 
} from 'lucide-react';
import { calculateCommercialMargin, MarginBreakdown, MarginInputs } from '../../utils/calculations';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import { useCurrency } from '../../hooks/useCurrency';
import { copyToClipboard, downloadCsv, triggerPrint } from '../../utils/exportHelpers';

export const MarginCalculator: React.FC = () => {
  const { currency, currencyConfig } = useCurrency();
  const [mode, setMode] = useState<MarginInputs['mode']>('from_margin');
  const [unitCost, setUnitCost] = useState<number>(35);
  const [sellingPrice, setSellingPrice] = useState<number>(75);
  const [targetMargin, setTargetMargin] = useState<number>(45);
  const [vatRate, setVatRate] = useState<number>(20);
  const [overheadPerUnit, setOverheadPerUnit] = useState<number>(5);
  const [fixedMonthlyOverheads, setFixedMonthlyOverheads] = useState<number>(2000);
  const [salesVolume, setSalesVolume] = useState<number>(500);
  const [corporateTaxRate, setCorporateTaxRate] = useState<number>(12.5); // Default 12.5%
  const [copied, setCopied] = useState<boolean>(false);

  const breakdown = useMemo<MarginBreakdown>(() => {
    return calculateCommercialMargin({
      mode,
      unitCost,
      sellingPriceInput: sellingPrice,
      targetMarginPercent: targetMargin,
      salesVolumeUnits: salesVolume,
      operatingOverheadPerUnit: overheadPerUnit,
      fixedMonthlyOverheads,
      vatRatePercent: vatRate,
      isPriceVatInclusive: false,
      corporateTaxRatePercent: corporateTaxRate,
    });
  }, [
    mode,
    unitCost,
    sellingPrice,
    targetMargin,
    salesVolume,
    overheadPerUnit,
    fixedMonthlyOverheads,
    vatRate,
    corporateTaxRate,
  ]);

  const handleCopy = async () => {
    const text = `Commercial Margin & Tax Breakdown:\nUnit Cost (COGS): ${formatCurrency(breakdown.cogsPerUnit, currency)}\nNet Selling Price: ${formatCurrency(breakdown.netSellingPricePerUnit, currency)}\nRetail Shelf Price (Inc ${vatRate}% VAT): ${formatCurrency(breakdown.grossSellingPricePerUnit, currency)}\nGross Margin: ${breakdown.grossMarginPercent.toFixed(2)}%\nMarkup: ${breakdown.markupPercent.toFixed(2)}%\nNet Post-Tax Profit / Unit: ${formatCurrency(breakdown.netPostTaxProfitPerUnit, currency)} (${breakdown.netMarginPercent.toFixed(2)}% Net Margin)\nBreak-Even Volume: ${breakdown.breakEvenUnits} units/yr\nTotal Projected Net Profit (${salesVolume} units): ${formatCurrency(breakdown.totalNetProfit, currency)}\nvia vatcalcs.net`;
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleExportCsv = () => {
    const headers = ['Financial Parameter', 'Per Unit', `Total Volume (${salesVolume} units)`];
    const rows = [
      ['Unit Cost (COGS)', formatCurrency(breakdown.cogsPerUnit, currency), formatCurrency(breakdown.cogsPerUnit * salesVolume, currency)],
      ['Net Selling Price', formatCurrency(breakdown.netSellingPricePerUnit, currency), formatCurrency(breakdown.totalNetRevenue, currency)],
      ['VAT Portion', formatCurrency(breakdown.vatAmountPerUnit, currency), formatCurrency(breakdown.totalVatLiability, currency)],
      ['Gross Selling Price', formatCurrency(breakdown.grossSellingPricePerUnit, currency), formatCurrency((breakdown.totalNetRevenue + breakdown.totalVatLiability), currency)],
      ['Gross Profit', formatCurrency(breakdown.grossProfitPerUnit, currency), formatCurrency(breakdown.totalGrossProfit, currency)],
      ['Gross Margin %', `${breakdown.grossMarginPercent.toFixed(2)}%`, `${breakdown.grossMarginPercent.toFixed(2)}%`],
      ['Markup %', `${breakdown.markupPercent.toFixed(2)}%`, `${breakdown.markupPercent.toFixed(2)}%`],
      ['Operating Profit', formatCurrency(breakdown.operatingProfitPerUnit, currency), formatCurrency(breakdown.totalOperatingProfit, currency)],
      ['Corporate Tax Due', formatCurrency(breakdown.corporateTaxPerUnit, currency), formatCurrency(breakdown.totalCorporateTax, currency)],
      ['Net Post-Tax Profit', formatCurrency(breakdown.netPostTaxProfitPerUnit, currency), formatCurrency(breakdown.totalNetProfit, currency)],
      ['Net Profit Margin %', `${breakdown.netMarginPercent.toFixed(2)}%`, `${breakdown.netMarginPercent.toFixed(2)}%`],
    ];
    downloadCsv(headers, rows, `margin-tax-breakdown-${currency}.csv`);
  };

  return (
    <div className="space-y-8">
      
      {/* Mode Switcher */}
      <div className="glass-card p-2 max-w-xl mx-auto flex items-center gap-2 bg-slate-100/90 dark:bg-slate-900/90">
        <button
          type="button"
          onClick={() => setMode('from_margin')}
          className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            mode === 'from_margin'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>Find Price from Target Margin %</span>
        </button>
        <button
          type="button"
          onClick={() => setMode('from_price')}
          className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            mode === 'from_price'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Find Margin from Selling Price</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-card p-6 sm:p-8 space-y-6">
            
            {/* Direct Unit Cost & Target/Price Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="unit-cost-cogs-input" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Unit Cost (COGS) ({currencyConfig.symbol})
                </label>
                <input
                  id="unit-cost-cogs-input"
                  type="number"
                  step="1"
                  min="0.01"
                  value={unitCost || ''}
                  onChange={(e) => setUnitCost(parseFloat(e.target.value) || 0)}
                  className="input-field text-xl font-bold"
                />
              </div>

              {mode === 'from_margin' ? (
                <div className="space-y-2">
                  <label htmlFor="target-margin-pct-input" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Target Gross Margin (%)
                  </label>
                  <input
                    id="target-margin-pct-input"
                    type="number"
                    step="1"
                    min="1"
                    max="99"
                    value={targetMargin || ''}
                    onChange={(e) => setTargetMargin(parseFloat(e.target.value) || 0)}
                    className="input-field text-xl font-bold text-emerald-600 dark:text-emerald-400"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <label htmlFor="selling-price-input" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Selling Price ({currencyConfig.symbol})
                  </label>
                  <input
                    id="selling-price-input"
                    type="number"
                    step="1"
                    min="0"
                    value={sellingPrice || ''}
                    onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 0)}
                    className="input-field text-xl font-bold text-emerald-600 dark:text-emerald-400"
                  />
                </div>
              )}
            </div>

            {/* Quick Margin Chips if mode === from_margin */}
            {mode === 'from_margin' && (
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-slate-500">Quick Industry Margins:</span>
                <div className="flex flex-wrap gap-2">
                  {[20, 30, 40, 50, 60, 75].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setTargetMargin(m)}
                      className={`btn-chip ${
                        targetMargin === m
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {m}% Margin
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tax & VAT Settings */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60 space-y-4">
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                Commercial Tax Rates
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Output VAT / Sales Tax Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={vatRate}
                    onChange={(e) => setVatRate(parseFloat(e.target.value) || 0)}
                    className="w-full p-2 text-xs bg-white dark:bg-slate-900 border rounded-lg font-mono text-right"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Corporate Income Tax Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={corporateTaxRate}
                    onChange={(e) => setCorporateTaxRate(parseFloat(e.target.value) || 0)}
                    className="w-full p-2 text-xs bg-white dark:bg-slate-900 border rounded-lg font-mono text-right"
                  />
                </div>
              </div>
            </div>

            {/* Overheads & Volume Projections */}
            <div className="space-y-4 pt-2 border-t border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Operating Overheads &amp; Annual Unit Volume
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Fulfillment / Unit ({currencyConfig.symbol})
                  </label>
                  <input
                    type="number"
                    value={overheadPerUnit || ''}
                    onChange={(e) => setOverheadPerUnit(parseFloat(e.target.value) || 0)}
                    className="w-full p-2 text-xs bg-slate-50 dark:bg-slate-900 border rounded-lg font-mono text-right"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Fixed Overhead / Mo ({currencyConfig.symbol})
                  </label>
                  <input
                    type="number"
                    value={fixedMonthlyOverheads || ''}
                    onChange={(e) => setFixedMonthlyOverheads(parseFloat(e.target.value) || 0)}
                    className="w-full p-2 text-xs bg-slate-50 dark:bg-slate-900 border rounded-lg font-mono text-right"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Projected Unit Sales / Mo
                  </label>
                  <input
                    type="number"
                    value={salesVolume || ''}
                    onChange={(e) => setSalesVolume(parseFloat(e.target.value) || 1)}
                    className="w-full p-2 text-xs bg-slate-50 dark:bg-slate-900 border rounded-lg font-mono text-right"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right: Profit Metrics & Break-Even Analysis (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card p-6 sm:p-8 space-y-6 bg-gradient-to-b from-white via-white to-emerald-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/20 border-emerald-500/20 shadow-xl">
            
            {/* Required Selling Price Card */}
            <div className="p-5 rounded-2xl bg-emerald-600 dark:bg-slate-900 text-white border border-emerald-500/40 dark:border-slate-800 shadow-xl shadow-emerald-600/20 dark:shadow-none space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-100 dark:text-emerald-400">
                  Required Net Selling Price
                </span>
                <span className="badge bg-emerald-700/60 dark:bg-emerald-500/20 text-white dark:text-emerald-300 font-mono text-[11px]">
                  Gross Margin: {breakdown.grossMarginPercent.toFixed(1)}%
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
                  {formatCurrency(breakdown.netSellingPricePerUnit, currency)}
                </span>
                <span className="text-xs text-emerald-100/90 dark:text-slate-400">
                  (Markup: {breakdown.markupPercent.toFixed(1)}%)
                </span>
              </div>
              <div className="pt-2 border-t border-emerald-500/40 dark:border-slate-800 flex justify-between text-xs text-emerald-100 dark:text-slate-300">
                <span>Retail Shelf Price (Inc {vatRate}% VAT):</span>
                <span className="font-mono font-bold text-white dark:text-emerald-400">
                  {formatCurrency(breakdown.grossSellingPricePerUnit, currency)}
                </span>
              </div>
            </div>

            {/* Core Unit Metrics Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-[11px] font-semibold text-slate-500 block uppercase">Gross Profit / Unit</span>
                <span className="text-lg font-bold font-mono text-slate-900 dark:text-white">
                  {formatCurrency(breakdown.grossProfitPerUnit, currency)}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-300/60 dark:border-emerald-700/60">
                <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 block uppercase">Net Profit (Post-Tax)</span>
                <span className="text-lg font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(breakdown.netPostTaxProfitPerUnit, currency)}
                </span>
                <span className="text-[10px] text-emerald-600/80 font-mono">({breakdown.netMarginPercent.toFixed(1)}% Net Margin)</span>
              </div>
            </div>

            {/* Break-Even & Volume Aggregates */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-600 dark:text-slate-400">Annual Break-Even Units</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {formatNumber(breakdown.breakEvenUnits, 0)} units / yr
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-600 dark:text-slate-400">Total Net Revenue ({salesVolume}/mo)</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {formatCurrency(breakdown.totalNetRevenue, currency)}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800 text-teal-600 dark:text-teal-400">
                <span>Total VAT Collected</span>
                <span className="font-mono">{formatCurrency(breakdown.totalVatLiability, currency)}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800 text-amber-600 dark:text-amber-400">
                <span>Corporate Tax Liability ({corporateTaxRate}%)</span>
                <span className="font-mono">{formatCurrency(breakdown.totalCorporateTax, currency)}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800 font-bold text-emerald-600 dark:text-emerald-400 pt-1">
                <span>Total Net Profit</span>
                <span className="font-mono text-sm">{formatCurrency(breakdown.totalNetProfit, currency)}</span>
              </div>
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
