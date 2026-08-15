import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Minus, 
  Copy, 
  Check, 
  Printer, 
  Download, 
  RotateCcw, 
  Globe, 
  Sliders, 
  ListPlus, 
  Trash2
} from 'lucide-react';
import { calculateVatAdd, calculateVatExtract, VatCalculationResult } from '../../utils/calculations';
import { formatCurrency, formatPercent } from '../../utils/formatters';
import { useCurrency } from '../../hooks/useCurrency';
import { COUNTRY_TAX_PRESETS, TaxPreset } from '../../data/taxRates';
import { copyToClipboard, downloadCsv, triggerPrint } from '../../utils/exportHelpers';

export type VatMode = 'add' | 'extract';

export interface BulkItem {
  id: string;
  name: string;
  amount: number;
  rate: number;
}

export const VatCalculator: React.FC = () => {
  const { currency, currencyConfig } = useCurrency();
  const [mode, setMode] = useState<VatMode>('add');
  const [amount, setAmount] = useState<number>(100);
  const [selectedRate, setSelectedRate] = useState<number>(23);
  const [selectedCountryId, setSelectedCountryId] = useState<string>('ie');
  const [copied, setCopied] = useState<boolean>(false);
  const [showBulkMode, setShowBulkMode] = useState<boolean>(false);
  const [bulkItems, setBulkItems] = useState<BulkItem[]>([
    { id: '1', name: 'Product / Service A', amount: 150, rate: 23 },
    { id: '2', name: 'Shipping / Handling', amount: 25, rate: 13.5 },
  ]);

  // Current country preset
  const currentCountry = useMemo<TaxPreset>(() => {
    return COUNTRY_TAX_PRESETS.find(c => c.id === selectedCountryId) || COUNTRY_TAX_PRESETS[0];
  }, [selectedCountryId]);

  // Single calculation result
  const result = useMemo<VatCalculationResult>(() => {
    if (mode === 'add') {
      return calculateVatAdd(amount, selectedRate);
    } else {
      return calculateVatExtract(amount, selectedRate);
    }
  }, [mode, amount, selectedRate]);

  // Bulk calculation totals
  const bulkTotals = useMemo(() => {
    return bulkItems.reduce(
      (acc, item) => {
        const itemRes = mode === 'add'
          ? calculateVatAdd(item.amount, item.rate)
          : calculateVatExtract(item.amount, item.rate);
        return {
          totalNet: acc.totalNet + itemRes.netAmount,
          totalVat: acc.totalVat + itemRes.vatAmount,
          totalGross: acc.totalGross + itemRes.grossAmount,
        };
      },
      { totalNet: 0, totalVat: 0, totalGross: 0 }
    );
  }, [bulkItems, mode]);

  // Copy result handler
  const handleCopy = async () => {
    const text = mode === 'add'
      ? `VAT Calculation (Added):\nNet Amount: ${formatCurrency(result.netAmount, currency)}\nVAT (${result.vatRate}%): ${formatCurrency(result.vatAmount, currency)}\nGross Total: ${formatCurrency(result.grossAmount, currency)}\nvia vatcalcs.net`
      : `VAT Calculation (Extracted):\nGross Total: ${formatCurrency(result.grossAmount, currency)}\nVAT (${result.vatRate}%): ${formatCurrency(result.vatAmount, currency)}\nNet Amount: ${formatCurrency(result.netAmount, currency)}\nvia vatcalcs.net`;
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Export CSV
  const handleExportCsv = () => {
    if (showBulkMode) {
      const headers = ['Item Name', 'Input Amount', 'VAT Rate (%)', 'Net Amount', 'VAT Amount', 'Gross Amount'];
      const rows = bulkItems.map((item) => {
        const res = mode === 'add' ? calculateVatAdd(item.amount, item.rate) : calculateVatExtract(item.amount, item.rate);
        return [item.name, item.amount, `${item.rate}%`, res.netAmount, res.vatAmount, res.grossAmount];
      });
      downloadCsv(headers, rows, `vat-bulk-calculation-${currency}.csv`);
    } else {
      const headers = ['Calculation Mode', 'VAT Rate (%)', 'Net Amount', 'VAT Amount', 'Gross Amount', 'Currency'];
      const rows = [[
        mode === 'add' ? 'Add VAT (Exclusive to Inclusive)' : 'Extract VAT (Inclusive to Exclusive)',
        `${result.vatRate}%`,
        result.netAmount,
        result.vatAmount,
        result.grossAmount,
        currency
      ]];
      downloadCsv(headers, rows, `vat-calculation-${result.vatRate}pct.csv`);
    }
  };

  // Bulk item handlers
  const addBulkItem = () => {
    setBulkItems(prev => [
      ...prev,
      { id: Date.now().toString(), name: `Item ${prev.length + 1}`, amount: 50, rate: selectedRate }
    ]);
  };

  const removeBulkItem = (id: string) => {
    setBulkItems(prev => prev.filter(item => item.id !== id));
  };

  const updateBulkItem = (id: string, field: keyof BulkItem, val: string | number) => {
    setBulkItems(prev => prev.map(item => item.id === id ? { ...item, [field]: val } : item));
  };

  // Reset
  const handleReset = () => {
    setAmount(100);
    setSelectedRate(currentCountry.standardRate);
  };

  return (
    <div className="space-y-8">
      {/* Mode Switcher Buttons */}
      <div className="glass-card p-2 max-w-xl mx-auto flex items-center gap-2 bg-slate-100/90 dark:bg-slate-900/90">
        <button
          type="button"
          onClick={() => setMode('add')}
          className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            mode === 'add'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>Add VAT (Exclusive $\to$ Inclusive)</span>
        </button>
        <button
          type="button"
          onClick={() => setMode('extract')}
          className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            mode === 'extract'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Minus className="w-4 h-4" />
          <span>Extract VAT (Inclusive $\to$ Exclusive)</span>
        </button>
      </div>

      {/* Main Calculation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Inputs & Preset Selector (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-card p-6 sm:p-8 space-y-6">
            
            {/* Amount Input */}
            <div className="space-y-2">
              <label htmlFor="vat-amount-input" className="block text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between">
                <span>{mode === 'add' ? 'Net Amount (Before VAT)' : 'Gross Total (Including VAT)'}</span>
                <span className="text-xs font-mono font-normal text-slate-500 dark:text-slate-400">
                  Currency: {currencyConfig.name}
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-lg font-bold text-slate-400 dark:text-slate-500 font-mono">
                  {currencyConfig.symbol}
                </div>
                <input
                  id="vat-amount-input"
                  type="number"
                  step="any"
                  min="0"
                  value={amount === 0 ? '' : amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  className="input-field pl-12 text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400"
                />
              </div>
            </div>

            {/* Country Selector Dropdown */}
            <div className="space-y-2">
              <label htmlFor="country-preset-select" className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                <span>Regional Tax Authority Presets</span>
              </label>
              <select
                id="country-preset-select"
                value={selectedCountryId}
                onChange={(e) => {
                  const newCId = e.target.value;
                  setSelectedCountryId(newCId);
                  const found = COUNTRY_TAX_PRESETS.find(c => c.id === newCId);
                  if (found) setSelectedRate(found.standardRate);
                }}
                className="w-full bg-slate-50 dark:bg-slate-950/70 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                {COUNTRY_TAX_PRESETS.map((preset) => (
                  <option key={preset.id} value={preset.id}>
                    {preset.flag} {preset.name} (Standard {preset.standardRate}%)
                  </option>
                ))}
              </select>
            </div>

            {/* Quick-Select Rate Chips */}
            <div className="space-y-2.5">
              <span className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                {currentCountry.name} Rate Tiers:
              </span>
              <div className="flex flex-wrap gap-2">
                {currentCountry.rates.map((r, idx) => {
                  const isSelected = selectedRate === r.rate;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedRate(r.rate)}
                      title={r.description}
                      className={`btn-chip flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-500'
                      }`}
                    >
                      <span>{r.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Tax Rate Slider & Input */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Custom Tax Rate (%)</span>
                </span>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    value={selectedRate}
                    onChange={(e) => setSelectedRate(parseFloat(e.target.value) || 0)}
                    className="w-20 px-2 py-1 text-right font-mono font-bold text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                  <span className="font-mono text-sm text-slate-500">%</span>
                </div>
              </div>

              <input
                type="range"
                min="0"
                max="50"
                step="0.5"
                value={selectedRate}
                onChange={(e) => setSelectedRate(parseFloat(e.target.value))}
                className="w-full accent-emerald-600 dark:accent-emerald-500 cursor-pointer"
              />

              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>0% (Zero/Exempt)</span>
                <span>12.5%</span>
                <span>20% (UK)</span>
                <span>23% (IE)</span>
                <span>50%</span>
              </div>
            </div>

            {/* Quick Utility Actions Bar */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
              <button
                type="button"
                onClick={() => setShowBulkMode(!showBulkMode)}
                className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                <ListPlus className="w-4 h-4" />
                <span>{showBulkMode ? 'Hide Multi-Item Calculator' : 'Calculate Multiple Line Items'}</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

          </div>

          {/* Bulk Line Items Section (Collapsible) */}
          {showBulkMode && (
            <div className="glass-card p-6 space-y-4 border-emerald-500/30 dark:border-emerald-500/30 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Multi-Item Invoice Tally
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Add multiple invoice rows with different tax rates.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addBulkItem}
                  className="btn-primary text-xs py-1.5 px-3"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Line</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {bulkItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => updateBulkItem(item.id, 'name', e.target.value)}
                      placeholder="Item description"
                      className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                    />
                    <div className="relative w-28">
                      <span className="absolute left-2 top-1.5 text-xs text-slate-400">{currencyConfig.symbol}</span>
                      <input
                        type="number"
                        step="any"
                        value={item.amount || ''}
                        onChange={(e) => updateBulkItem(item.id, 'amount', parseFloat(e.target.value) || 0)}
                        placeholder="0.00"
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg pl-6 pr-2 py-1.5 text-xs font-mono text-slate-800 dark:text-slate-200 focus:outline-none text-right"
                      />
                    </div>
                    <div className="relative w-20">
                      <input
                        type="number"
                        step="0.5"
                        value={item.rate}
                        onChange={(e) => updateBulkItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg pr-4 pl-1.5 py-1.5 text-xs font-mono text-slate-800 dark:text-slate-200 focus:outline-none text-right"
                      />
                      <span className="absolute right-1.5 top-1.5 text-xs text-slate-400">%</span>
                    </div>
                    {bulkItems.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeBulkItem(item.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors"
                        title="Delete row"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Bulk Aggregate Summary */}
              <div className="mt-4 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-900/60 grid grid-cols-3 gap-2 text-center">
                <div>
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">Total Net</span>
                  <span className="font-mono font-bold text-sm text-slate-900 dark:text-white">
                    {formatCurrency(bulkTotals.totalNet, currency)}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">Total VAT</span>
                  <span className="font-mono font-bold text-sm text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(bulkTotals.totalVat, currency)}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">Total Gross</span>
                  <span className="font-mono font-bold text-sm text-slate-900 dark:text-white">
                    {formatCurrency(bulkTotals.totalGross, currency)}
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Right Side: Interactive Result Breakdown & Export Card (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="glass-card p-6 sm:p-8 space-y-6 bg-gradient-to-b from-white via-white to-emerald-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/20 border-emerald-500/20 dark:border-emerald-500/30 shadow-xl">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Calculation Summary
                </h3>
              </div>
              <span className="badge bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-mono">
                {selectedRate}% {currentCountry.name}
              </span>
            </div>

            {/* Three Value Display: Net, VAT, Gross */}
            <div className="space-y-4">
              
              {/* Net */}
              <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    Net Amount (Excl. VAT)
                  </span>
                  <span className="text-xl sm:text-2xl font-bold font-mono text-slate-800 dark:text-slate-100">
                    {formatCurrency(result.netAmount, currency)}
                  </span>
                </div>
                <span className="text-xs font-mono px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                  {result.grossAmount > 0 ? formatPercent((result.netAmount / result.grossAmount) * 100, 1) : '100%'}
                </span>
              </div>

              {/* VAT Amount */}
              <div className="p-4 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-300/60 dark:border-emerald-700/60 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider block">
                    VAT Tax Portion ({result.vatRate}%)
                  </span>
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(result.vatAmount, currency)}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-emerald-200/60 dark:bg-emerald-800/60 text-emerald-800 dark:text-emerald-200">
                  +{formatPercent(result.vatRate, 1)}
                </span>
              </div>

              {/* Gross Total */}
              <div className="p-4 rounded-xl bg-slate-900 text-white dark:bg-slate-950 border border-slate-800 flex items-center justify-between shadow-lg">
                <div>
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    Gross Total (Incl. VAT)
                  </span>
                  <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">
                    {formatCurrency(result.grossAmount, currency)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block uppercase">Multiplier</span>
                  <span className="text-xs font-mono font-bold text-slate-200">×{result.effectiveMultiplier}</span>
                </div>
              </div>

            </div>

            {/* Visual Ratio Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                <span>Net ({result.grossAmount > 0 ? ((result.netAmount / result.grossAmount) * 100).toFixed(1) : 100}%)</span>
                <span>VAT ({result.grossAmount > 0 ? ((result.vatAmount / result.grossAmount) * 100).toFixed(1) : 0}%)</span>
              </div>
              <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex">
                <div
                  className="bg-indigo-500 h-full transition-all duration-300"
                  style={{ width: `${result.grossAmount > 0 ? (result.netAmount / result.grossAmount) * 100 : 100}%` }}
                  title="Net portion"
                />
                <div
                  className="bg-emerald-500 h-full transition-all duration-300"
                  style={{ width: `${result.grossAmount > 0 ? (result.vatAmount / result.grossAmount) * 100 : 0}%` }}
                  title="VAT portion"
                />
              </div>
            </div>

            {/* Formula Step Callout */}
            <div className="p-3 rounded-xl bg-slate-100/80 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300 space-y-1">
              <span className="font-bold text-slate-800 dark:text-slate-200 block">Calculation Method:</span>
              <p className="font-mono text-[11px] text-emerald-700 dark:text-emerald-400">
                {result.formulaDescription}
              </p>
            </div>

            {/* Action Buttons: Copy, Export CSV, Print */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              <button
                type="button"
                onClick={handleCopy}
                className="btn-secondary text-xs py-2.5 px-3 flex items-center justify-center gap-1.5"
                title="Copy formatted result to clipboard"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>

              <button
                type="button"
                onClick={handleExportCsv}
                className="btn-secondary text-xs py-2.5 px-3 flex items-center justify-center gap-1.5"
                title="Download CSV spreadsheet"
              >
                <Download className="w-3.5 h-3.5" />
                <span>CSV</span>
              </button>

              <button
                type="button"
                onClick={triggerPrint}
                className="btn-secondary text-xs py-2.5 px-3 flex items-center justify-center gap-1.5"
                title="Print tax invoice sheet"
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
