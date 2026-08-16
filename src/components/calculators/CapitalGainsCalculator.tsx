import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  Copy, 
  Check, 
  Printer, 
  Download, 
  Building2, 
  Coins, 
  LineChart 
} from 'lucide-react';
import { calculateCapitalGains, CapitalGainsBreakdown, CapitalGainsInputs } from '../../utils/calculations';
import { formatCurrency } from '../../utils/formatters';
import { useCurrency } from '../../hooks/useCurrency';
import { copyToClipboard, downloadCsv, triggerPrint } from '../../utils/exportHelpers';

export const CapitalGainsCalculator: React.FC = () => {
  const { currency, currencyConfig } = useCurrency();
  const [assetType, setAssetType] = useState<CapitalGainsInputs['assetType']>('property');
  const [purchasePrice, setPurchasePrice] = useState<number>(250000);
  const [salePrice, setSalePrice] = useState<number>(380000);
  const [purchaseCosts, setPurchaseCosts] = useState<number>(8000);
  const [saleCosts, setSaleCosts] = useState<number>(6500);
  const [improvementCosts, setImprovementCosts] = useState<number>(20000);
  const [lossesBroughtForward, setLossesBroughtForward] = useState<number>(0);
  const [annualExemption, setAnnualExemption] = useState<number>(1270); // Default Irish €1,270
  const [cgtRate, setCgtRate] = useState<number>(33); // Default Irish 33%
  const [copied, setCopied] = useState<boolean>(false);

  const breakdown = useMemo<CapitalGainsBreakdown>(() => {
    return calculateCapitalGains({
      assetType,
      purchasePrice,
      salePrice,
      purchaseIncidentalCosts: purchaseCosts,
      saleIncidentalCosts: saleCosts,
      improvementCosts,
      lossesBroughtForward,
      annualExemptionAllowance: annualExemption,
      cgtRatePercent: cgtRate,
    });
  }, [
    assetType,
    purchasePrice,
    salePrice,
    purchaseCosts,
    saleCosts,
    improvementCosts,
    lossesBroughtForward,
    annualExemption,
    cgtRate,
  ]);

  const handleCopy = async () => {
    const text = `Capital Gains Tax (CGT) Calculation:\nAsset Type: ${assetType.toUpperCase()}\nSale Proceeds: ${formatCurrency(breakdown.grossProceeds, currency)}\nTotal Acquisition Cost: ${formatCurrency(breakdown.totalAcquisitionCost, currency)}\nAllowable Deductions: ${formatCurrency(breakdown.totalAllowableDeductions, currency)}\nGross Capital Gain: ${formatCurrency(breakdown.grossCapitalGainOrLoss, currency)}\nAnnual Exemption Utilized: ${formatCurrency(breakdown.exemptionUtilized, currency)}\nTaxable Capital Gain: ${formatCurrency(breakdown.taxableCapitalGain, currency)}\nTotal CGT Due (${cgtRate}%): ${formatCurrency(breakdown.cgtPayable, currency)}\nNet Post-Tax Proceeds: ${formatCurrency(breakdown.netPostTaxProceeds, currency)}\nNet ROI: ${breakdown.netRoiPercent.toFixed(2)}%\nvia vatcalcs.net`;
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleExportCsv = () => {
    const headers = ['Metric', 'Amount', 'Currency'];
    const rows = [
      ['Gross Sale Proceeds', breakdown.grossProceeds, currency],
      ['Original Purchase Price', purchasePrice, currency],
      ['Purchase Costs (Legal/Stamp)', purchaseCosts, currency],
      ['Capital Improvement Costs', improvementCosts, currency],
      ['Disposal Costs (Agent/Fees)', saleCosts, currency],
      ['Gross Capital Gain / Loss', breakdown.grossCapitalGainOrLoss, currency],
      ['Exemption Allowance Applied', breakdown.exemptionUtilized, currency],
      ['Taxable Capital Gain', breakdown.taxableCapitalGain, currency],
      ['CGT Rate', `${cgtRate}%`, '-'],
      ['Total CGT Payable', breakdown.cgtPayable, currency],
      ['Net Post-Tax Cash Proceeds', breakdown.netPostTaxProceeds, currency],
      ['Net Return on Investment (ROI)', `${breakdown.netRoiPercent.toFixed(2)}%`, '-'],
    ];
    downloadCsv(headers, rows, `cgt-calculation-${currency}.csv`);
  };

  const applyRegionalPreset = (region: 'ie' | 'uk_property' | 'uk_shares' | 'us_long' | 'us_short') => {
    if (region === 'ie') {
      setAnnualExemption(1270);
      setCgtRate(33);
    } else if (region === 'uk_property') {
      setAnnualExemption(3000);
      setCgtRate(24);
    } else if (region === 'uk_shares') {
      setAnnualExemption(3000);
      setCgtRate(20);
    } else if (region === 'us_long') {
      setAnnualExemption(0);
      setCgtRate(15);
    } else if (region === 'us_short') {
      setAnnualExemption(0);
      setCgtRate(24);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Asset Type Selector */}
      <div className="glass-card p-2 max-w-2xl mx-auto flex flex-wrap items-center gap-1.5 bg-slate-100/90 dark:bg-slate-900/90">
        {[
          { id: 'property', label: '🏠 Real Estate', icon: Building2 },
          { id: 'shares', label: '📈 Shares & Stocks', icon: LineChart },
          { id: 'crypto', label: '🪙 Cryptocurrency', icon: Coins },
          { id: 'collectibles', label: '🎨 Collectibles', icon: TrendingUp },
        ].map((item) => {
          const isSelected = assetType === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setAssetType(item.id as CapitalGainsInputs['assetType'])}
              className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Inputs & Deductions Builder (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-card p-6 sm:p-8 space-y-6">
            
            {/* Sale & Purchase Prices */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="cgt-sale-price-input" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Sale / Disposal Price ({currencyConfig.symbol})
                </label>
                <input
                  id="cgt-sale-price-input"
                  type="number"
                  step="1000"
                  value={salePrice || ''}
                  onChange={(e) => setSalePrice(parseFloat(e.target.value) || 0)}
                  className="input-field text-xl font-bold text-emerald-600 dark:text-emerald-400"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="cgt-purchase-price-input" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Original Purchase Price ({currencyConfig.symbol})
                </label>
                <input
                  id="cgt-purchase-price-input"
                  type="number"
                  step="1000"
                  value={purchasePrice || ''}
                  onChange={(e) => setPurchasePrice(parseFloat(e.target.value) || 0)}
                  className="input-field text-xl font-bold"
                />
              </div>
            </div>

            {/* Allowable Costs Breakdown */}
            <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Allowable Deductions &amp; Enhancements
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Purchase Legal &amp; Stamp
                  </label>
                  <input
                    type="number"
                    value={purchaseCosts || ''}
                    onChange={(e) => setPurchaseCosts(parseFloat(e.target.value) || 0)}
                    className="w-full p-2 text-xs bg-slate-50 dark:bg-slate-900 border rounded-lg font-mono text-right"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Capital Improvements
                  </label>
                  <input
                    type="number"
                    value={improvementCosts || ''}
                    onChange={(e) => setImprovementCosts(parseFloat(e.target.value) || 0)}
                    className="w-full p-2 text-xs bg-slate-50 dark:bg-slate-900 border rounded-lg font-mono text-right"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Sale &amp; Agent Fees
                  </label>
                  <input
                    type="number"
                    value={saleCosts || ''}
                    onChange={(e) => setSaleCosts(parseFloat(e.target.value) || 0)}
                    className="w-full p-2 text-xs bg-slate-50 dark:bg-slate-900 border rounded-lg font-mono text-right"
                  />
                </div>
              </div>
            </div>

            {/* Regional Presets & Exemption Rules */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60 space-y-3">
              <span className="text-xs font-bold text-slate-900 dark:text-white block">
                Statutory CGT Rates &amp; Exemption Presets:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => applyRegionalPreset('ie')}
                  className="btn-chip bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-emerald-500"
                >
                  🇮🇪 Ireland (33% • €1,270 Exemption)
                </button>
                <button
                  type="button"
                  onClick={() => applyRegionalPreset('uk_property')}
                  className="btn-chip bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-emerald-500"
                >
                  🇬🇧 UK Property (24% • £3,000 Exemption)
                </button>
                <button
                  type="button"
                  onClick={() => applyRegionalPreset('uk_shares')}
                  className="btn-chip bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-emerald-500"
                >
                  🇬🇧 UK Shares (20% • £3,000 Exemption)
                </button>
                <button
                  type="button"
                  onClick={() => applyRegionalPreset('us_long')}
                  className="btn-chip bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-emerald-500"
                >
                  🇺🇸 US Long-Term (15%)
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Annual Exemption ({currencyConfig.symbol})
                  </label>
                  <input
                    type="number"
                    value={annualExemption || ''}
                    onChange={(e) => setAnnualExemption(parseFloat(e.target.value) || 0)}
                    className="w-full p-2 text-xs bg-white dark:bg-slate-900 border rounded-lg font-mono text-right"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    CGT Tax Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={cgtRate || ''}
                    onChange={(e) => setCgtRate(parseFloat(e.target.value) || 0)}
                    className="w-full p-2 text-xs bg-white dark:bg-slate-900 border rounded-lg font-mono text-right"
                  />
                </div>
              </div>
            </div>

            {/* Prior Year Losses */}
            <div className="space-y-1">
              <label htmlFor="prior-losses-input" className="block text-xs font-semibold text-slate-600 dark:text-slate-400">
                Prior Year Allowable Capital Losses Brought Forward ({currencyConfig.symbol}):
              </label>
              <input
                id="prior-losses-input"
                type="number"
                value={lossesBroughtForward || ''}
                onChange={(e) => setLossesBroughtForward(parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                className="input-field py-2 text-sm text-right"
              />
            </div>

          </div>
        </div>

        {/* Right: Results & Proceeds Breakdown (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card p-6 sm:p-8 space-y-6 bg-gradient-to-b from-white via-white to-emerald-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/20 border-emerald-500/20 shadow-xl">
            
            {/* Gain/Loss Hero Display */}
            <div className={`p-5 rounded-2xl text-white shadow-xl space-y-1 ${breakdown.isLoss ? 'bg-rose-600' : 'bg-emerald-600 dark:bg-slate-900 border border-emerald-500/40 dark:border-slate-800 shadow-emerald-600/20 dark:shadow-none'}`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-100 dark:text-emerald-400">
                  {breakdown.isLoss ? 'Capital Loss' : 'Gross Capital Gain'}
                </span>
                <span className="badge bg-emerald-700/60 dark:bg-emerald-500/20 text-white dark:text-emerald-300 font-mono text-[11px]">
                  Net ROI: {breakdown.netRoiPercent.toFixed(1)}%
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
                  {formatCurrency(breakdown.grossCapitalGainOrLoss, currency)}
                </span>
              </div>
            </div>

            {/* Tax Due Card */}
            {!breakdown.isLoss && (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300/60 dark:border-emerald-700/60 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 block">
                    Total CGT Due ({cgtRate}%)
                  </span>
                  <span className="text-2xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(breakdown.cgtPayable, currency)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block uppercase">Taxable Gain</span>
                  <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                    {formatCurrency(breakdown.taxableCapitalGain, currency)}
                  </span>
                </div>
              </div>
            )}

            {/* Step-by-Step Breakdown Table */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-600 dark:text-slate-400">Gross Sale Proceeds</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {formatCurrency(breakdown.grossProceeds, currency)}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800 text-rose-500">
                <span>- Base Acquisition Cost (Purchase + Legal + Extension)</span>
                <span className="font-mono">-{formatCurrency(breakdown.totalAcquisitionCost, currency)}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800 text-rose-500">
                <span>- Sale &amp; Estate Agent Costs</span>
                <span className="font-mono">-{formatCurrency(saleCosts, currency)}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800 text-emerald-600 dark:text-emerald-400 font-semibold">
                <span>- Annual Exemption Allowance Utilized</span>
                <span className="font-mono">-{formatCurrency(breakdown.exemptionUtilized, currency)}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800 font-bold text-slate-900 dark:text-white pt-1">
                <span>= Net Post-Tax Cash Proceeds in Hand</span>
                <span className="font-mono text-sm text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(breakdown.netPostTaxProceeds, currency)}
                </span>
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
