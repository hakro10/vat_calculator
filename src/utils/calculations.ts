// Precision mathematical calculation library for vatcalcs.net

export interface VatCalculationResult {
  netAmount: number;
  vatAmount: number;
  grossAmount: number;
  vatRate: number;
  effectiveMultiplier: number;
  formulaDescription: string;
}

/**
 * Add VAT (Exclusive to Inclusive)
 * Formula: Gross = Net * (1 + Rate / 100)
 */
export function calculateVatAdd(netAmount: number, vatRate: number): VatCalculationResult {
  const safeNet = Math.max(0, netAmount || 0);
  const safeRate = Math.max(0, vatRate || 0);
  const vatAmount = safeNet * (safeRate / 100);
  const grossAmount = safeNet + vatAmount;
  const effectiveMultiplier = 1 + safeRate / 100;

  return {
    netAmount: safeNet,
    vatAmount: Number(vatAmount.toFixed(4)),
    grossAmount: Number(grossAmount.toFixed(4)),
    vatRate: safeRate,
    effectiveMultiplier: Number(effectiveMultiplier.toFixed(4)),
    formulaDescription: `${safeNet.toFixed(2)} × (1 + ${safeRate}%) = ${grossAmount.toFixed(2)}`,
  };
}

/**
 * Extract VAT (Inclusive to Exclusive)
 * Formula: Net = Gross / (1 + Rate / 100), VAT = Gross - Net
 */
export function calculateVatExtract(grossAmount: number, vatRate: number): VatCalculationResult {
  const safeGross = Math.max(0, grossAmount || 0);
  const safeRate = Math.max(0, vatRate || 0);
  const divisor = 1 + safeRate / 100;
  const netAmount = divisor > 0 ? safeGross / divisor : safeGross;
  const vatAmount = safeGross - netAmount;

  return {
    netAmount: Number(netAmount.toFixed(4)),
    vatAmount: Number(vatAmount.toFixed(4)),
    grossAmount: safeGross,
    vatRate: safeRate,
    effectiveMultiplier: Number((1 / divisor).toFixed(4)),
    formulaDescription: `${safeGross.toFixed(2)} ÷ (1 + ${safeRate}%) = ${netAmount.toFixed(2)} (VAT: ${vatAmount.toFixed(2)})`,
  };
}

// ----------------------------------------------------
// SALARY TAX TYPES & CALCULATOR
// ----------------------------------------------------

export type SalaryCountryPreset = 'ie' | 'gb' | 'us' | 'custom';
export type PayFrequency = 'annual' | 'monthly' | 'biweekly' | 'weekly' | 'daily' | 'hourly';

export interface SalaryInputs {
  grossAnnual: number;
  country: SalaryCountryPreset;
  pensionPercentage: number;
  pensionFixed: number;
  customStandardAllowance: number;
  customBasicRate: number;
  customHigherRate: number;
  customHigherThreshold: number;
  customSocialRate: number;
  hoursPerWeek?: number;
  workingDaysPerYear?: number;
}

export interface SalaryBreakdown {
  grossPay: number;
  pensionContribution: number;
  taxableIncome: number;
  incomeTax: number;
  socialContributions: number; // NI, PRSI, USC, FICA
  totalDeductions: number;
  netTakeHome: number;
  effectiveTaxRate: number;
  marginalTaxRate: number;
  payPeriods: {
    annual: number;
    monthly: number;
    biweekly: number;
    weekly: number;
    daily: number;
    hourly: number;
  };
}

export function calculateSalaryTax(inputs: SalaryInputs): SalaryBreakdown {
  const gross = Math.max(0, inputs.grossAnnual || 0);
  const pensionPercentAmt = (gross * Math.max(0, inputs.pensionPercentage || 0)) / 100;
  const pensionContribution = Math.min(gross, pensionPercentAmt + Math.max(0, inputs.pensionFixed || 0));
  const taxableIncome = Math.max(0, gross - pensionContribution);

  let incomeTax = 0;
  let socialContributions = 0;
  let marginalRate = 0;

  if (inputs.country === 'ie') {
    // Ireland PAYE Model 2026:
    // Standard Rate Band: €44,000 @ 20%, Higher Rate @ 40%
    // Tax Credits: Single (€2,000) + Employee (€2,000) = €4,000
    const standardCutOff = 44000;
    const standardTax = Math.min(taxableIncome, standardCutOff) * 0.20;
    const higherTax = Math.max(0, taxableIncome - standardCutOff) * 0.40;
    const grossIncomeTax = standardTax + higherTax;
    const totalCredits = 4000;
    incomeTax = Math.max(0, grossIncomeTax - totalCredits);

    // USC (Universal Social Charge):
    // 0.5% on first €12,012
    // 2.0% on next €13,748 (up to €25,760)
    // 4.0% on next €44,284 (up to €70,044)
    // 8.0% on balance
    let usc = 0;
    if (gross > 13000) {
      const uscBand1 = Math.min(gross, 12012);
      const uscBand2 = Math.min(Math.max(0, gross - 12012), 13748);
      const uscBand3 = Math.min(Math.max(0, gross - 25760), 44284);
      const uscBand4 = Math.max(0, gross - 70044);
      usc = (uscBand1 * 0.005) + (uscBand2 * 0.02) + (uscBand3 * 0.04) + (uscBand4 * 0.08);
    }

    // PRSI (Class A: 4.1% over €352/week = €18,304/yr)
    const prsi = gross > 18304 ? gross * 0.041 : 0;
    socialContributions = usc + prsi;
    marginalRate = gross > 70044 ? (40 + 8 + 4.1) : (gross > 44000 ? (40 + 4 + 4.1) : (20 + 2 + 4.1));

  } else if (inputs.country === 'gb') {
    // UK Model:
    // Personal Allowance: £12,570 (tapers £1 for every £2 over £100,000, zero at £125,140)
    let personalAllowance = 12570;
    if (taxableIncome > 100000) {
      personalAllowance = Math.max(0, 12570 - (taxableIncome - 100000) / 2);
    }
    const taxableAfterAllowance = Math.max(0, taxableIncome - personalAllowance);

    // Basic Rate: 20% on income up to £50,270 (i.e. £37,700 taxable band)
    // Higher Rate: 40% on income from £50,271 to £125,140
    // Additional Rate: 45% on income above £125,140
    const basicLimit = 37700;
    const higherLimit = 125140 - 12570; // £112,570

    const basicTax = Math.min(taxableAfterAllowance, basicLimit) * 0.20;
    const higherTax = Math.min(Math.max(0, taxableAfterAllowance - basicLimit), Math.max(0, higherLimit - basicLimit)) * 0.40;
    const additionalTax = Math.max(0, taxableAfterAllowance - higherLimit) * 0.45;
    incomeTax = basicTax + higherTax + additionalTax;

    // National Insurance (Class 1 Employee):
    // 8% on £12,570 to £50,270, 2% above £50,270
    const niBand1 = Math.min(Math.max(0, gross - 12570), 50270 - 12570);
    const niBand2 = Math.max(0, gross - 50270);
    socialContributions = (niBand1 * 0.08) + (niBand2 * 0.02);

    marginalRate = gross > 125140 ? 47 : (gross > 100000 ? 62 : (gross > 50270 ? 42 : 28));

  } else if (inputs.country === 'us') {
    // US Model (Single Filer Approximate Federal + FICA):
    // Standard Deduction: $15,000
    const standardDeduction = 15000;
    const taxableAfterDeduction = Math.max(0, taxableIncome - standardDeduction);

    // Federal Brackets:
    // 10% up to $11,925
    // 12% to $48,475
    // 22% to $103,350
    // 24% to $197,300
    // 32% to $250,525
    // 35% to $626,350
    // 37% above $626,350
    let fedTax = 0;
    const brackets = [
      { limit: 11925, rate: 0.10 },
      { limit: 48475, rate: 0.12 },
      { limit: 103350, rate: 0.22 },
      { limit: 197300, rate: 0.24 },
      { limit: 250525, rate: 0.32 },
      { limit: 626350, rate: 0.35 },
      { limit: Infinity, rate: 0.37 },
    ];

    let prevLimit = 0;
    for (const b of brackets) {
      if (taxableAfterDeduction > prevLimit) {
        const taxableChunk = Math.min(taxableAfterDeduction - prevLimit, b.limit - prevLimit);
        fedTax += taxableChunk * b.rate;
        prevLimit = b.limit;
      } else {
        break;
      }
    }
    incomeTax = fedTax;

    // FICA (Social Security 6.2% up to $176,100 cap + Medicare 1.45% + 0.9% additional over $200k)
    const ssTax = Math.min(gross, 176100) * 0.062;
    const medTax = (gross * 0.0145) + (Math.max(0, gross - 200000) * 0.009);
    socialContributions = ssTax + medTax;
    marginalRate = gross > 626350 ? (37 + 1.45 + 0.9) : (gross > 197300 ? (24 + 1.45) : 22 + 7.65);

  } else {
    // Custom Generic Progressive Model
    const allowance = Math.max(0, inputs.customStandardAllowance || 12000);
    const taxableAfterAllowance = Math.max(0, taxableIncome - allowance);
    const basicRate = Math.max(0, inputs.customBasicRate || 20) / 100;
    const higherRate = Math.max(0, inputs.customHigherRate || 40) / 100;
    const higherThreshold = Math.max(allowance, inputs.customHigherThreshold || 50000);
    const socialRate = Math.max(0, inputs.customSocialRate || 5) / 100;

    const basicChunk = Math.min(taxableAfterAllowance, Math.max(0, higherThreshold - allowance));
    const higherChunk = Math.max(0, taxableIncome - higherThreshold);

    incomeTax = (basicChunk * basicRate) + (higherChunk * higherRate);
    socialContributions = gross * socialRate;
    marginalRate = gross > higherThreshold ? ((higherRate + socialRate) * 100) : ((basicRate + socialRate) * 100);
  }

  const totalDeductions = pensionContribution + incomeTax + socialContributions;
  const netTakeHome = Math.max(0, gross - totalDeductions);
  const effectiveTaxRate = gross > 0 ? ((incomeTax + socialContributions) / gross) * 100 : 0;

  const hoursPerWeek = inputs.hoursPerWeek || 37.5;
  const workingDays = inputs.workingDaysPerYear || 250;

  return {
    grossPay: gross,
    pensionContribution: Number(pensionContribution.toFixed(2)),
    taxableIncome: Number(taxableIncome.toFixed(2)),
    incomeTax: Number(incomeTax.toFixed(2)),
    socialContributions: Number(socialContributions.toFixed(2)),
    totalDeductions: Number(totalDeductions.toFixed(2)),
    netTakeHome: Number(netTakeHome.toFixed(2)),
    effectiveTaxRate: Number(effectiveTaxRate.toFixed(2)),
    marginalTaxRate: Number(marginalRate.toFixed(1)),
    payPeriods: {
      annual: Number(netTakeHome.toFixed(2)),
      monthly: Number((netTakeHome / 12).toFixed(2)),
      biweekly: Number((netTakeHome / 26).toFixed(2)),
      weekly: Number((netTakeHome / 52).toFixed(2)),
      daily: Number((netTakeHome / workingDays).toFixed(2)),
      hourly: Number((netTakeHome / (52 * hoursPerWeek)).toFixed(2)),
    },
  };
}

// ----------------------------------------------------
// FREELANCE & SELF-EMPLOYED BUFFER CALCULATOR
// ----------------------------------------------------

export interface FreelanceExpenseItem {
  id: string;
  category: string;
  amount: number;
  period: 'monthly' | 'annual';
}

export interface FreelanceInputs {
  billingType: 'rate' | 'gross';
  hourlyRate: number;
  billableHoursPerWeek: number;
  weeksPerYear: number;
  grossAnnualRevenue: number;
  expenses: FreelanceExpenseItem[];
  pensionContributionAnnual: number;
  isVatRegistered: boolean;
  vatRate: number;
  incomeTaxBufferPercent: number;
  socialContributionPercent: number; // e.g. 15.3% SECA or 9% UK Class 4 or 4% Class S
  rainyDayEmergencyBufferPercent: number;
}

export interface FreelanceBreakdown {
  grossInvoicedRevenue: number;
  vatCollected: number;
  totalClientBillings: number;
  totalAnnualExpenses: number;
  netTaxableProfit: number;
  incomeTaxBufferAmount: number;
  socialContributionBufferAmount: number;
  totalTaxReserve: number;
  totalTaxReservePercent: number;
  emergencyBufferAmount: number;
  safeToSpendTakeHome: number;
  monthlySafeToSpend: number;
  recommendedQuarterlyTaxPayment: number;
}

export function calculateFreelanceTax(inputs: FreelanceInputs): FreelanceBreakdown {
  let grossRevenue = 0;
  if (inputs.billingType === 'rate') {
    grossRevenue = Math.max(0, inputs.hourlyRate || 0) * 
                   Math.max(0, inputs.billableHoursPerWeek || 0) * 
                   Math.max(0, inputs.weeksPerYear || 0);
  } else {
    grossRevenue = Math.max(0, inputs.grossAnnualRevenue || 0);
  }

  // Calculate annual expenses
  const totalAnnualExpenses = (inputs.expenses || []).reduce((sum, item) => {
    const amt = Math.max(0, item.amount || 0);
    return sum + (item.period === 'monthly' ? amt * 12 : amt);
  }, 0);

  const pension = Math.max(0, inputs.pensionContributionAnnual || 0);
  const netTaxableProfit = Math.max(0, grossRevenue - totalAnnualExpenses - pension);

  const vatRate = inputs.isVatRegistered ? Math.max(0, inputs.vatRate || 0) : 0;
  const vatCollected = (grossRevenue * vatRate) / 100;
  const totalClientBillings = grossRevenue + vatCollected;

  const incomeTaxBufferRate = Math.max(0, inputs.incomeTaxBufferPercent || 25) / 100;
  const socialRate = Math.max(0, inputs.socialContributionPercent || 10) / 100;
  const emergencyRate = Math.max(0, inputs.rainyDayEmergencyBufferPercent || 5) / 100;

  const incomeTaxBufferAmount = netTaxableProfit * incomeTaxBufferRate;
  const socialContributionBufferAmount = netTaxableProfit * socialRate;
  const totalTaxReserve = incomeTaxBufferAmount + socialContributionBufferAmount + (inputs.isVatRegistered ? vatCollected : 0);
  const totalTaxReservePercent = grossRevenue > 0 ? (totalTaxReserve / grossRevenue) * 100 : 0;

  const emergencyBufferAmount = netTaxableProfit * emergencyRate;
  const safeToSpendTakeHome = Math.max(0, netTaxableProfit - incomeTaxBufferAmount - socialContributionBufferAmount - emergencyBufferAmount);

  return {
    grossInvoicedRevenue: Number(grossRevenue.toFixed(2)),
    vatCollected: Number(vatCollected.toFixed(2)),
    totalClientBillings: Number(totalClientBillings.toFixed(2)),
    totalAnnualExpenses: Number(totalAnnualExpenses.toFixed(2)),
    netTaxableProfit: Number(netTaxableProfit.toFixed(2)),
    incomeTaxBufferAmount: Number(incomeTaxBufferAmount.toFixed(2)),
    socialContributionBufferAmount: Number(socialContributionBufferAmount.toFixed(2)),
    totalTaxReserve: Number(totalTaxReserve.toFixed(2)),
    totalTaxReservePercent: Number(totalTaxReservePercent.toFixed(2)),
    emergencyBufferAmount: Number(emergencyBufferAmount.toFixed(2)),
    safeToSpendTakeHome: Number(safeToSpendTakeHome.toFixed(2)),
    monthlySafeToSpend: Number((safeToSpendTakeHome / 12).toFixed(2)),
    recommendedQuarterlyTaxPayment: Number((totalTaxReserve / 4).toFixed(2)),
  };
}

// ----------------------------------------------------
// CAPITAL GAINS TAX (CGT) CALCULATOR
// ----------------------------------------------------

export interface CapitalGainsInputs {
  assetType: 'shares' | 'property' | 'crypto' | 'collectibles' | 'other';
  purchasePrice: number;
  salePrice: number;
  purchaseIncidentalCosts: number; // Stamp duty, legal, broker fees
  saleIncidentalCosts: number;     // Estate agent, advertising, legal fees
  improvementCosts: number;        // Allowable capital renovations
  lossesBroughtForward: number;    // Prior year capital losses
  annualExemptionAllowance: number;// e.g. Ireland €1,270, UK £3,000
  cgtRatePercent: number;          // e.g. Ireland 33%, UK 20%/24%, US 15%/20%
}

export interface CapitalGainsBreakdown {
  grossProceeds: number;
  totalAcquisitionCost: number;
  totalAllowableDeductions: number;
  grossCapitalGainOrLoss: number;
  isLoss: boolean;
  netGainAfterLosses: number;
  exemptionUtilized: number;
  taxableCapitalGain: number;
  cgtPayable: number;
  netPostTaxProceeds: number;
  effectiveCgtRate: number;
  netRoiPercent: number;
}

export function calculateCapitalGains(inputs: CapitalGainsInputs): CapitalGainsBreakdown {
  const purchase = Math.max(0, inputs.purchasePrice || 0);
  const sale = Math.max(0, inputs.salePrice || 0);
  const buyCosts = Math.max(0, inputs.purchaseIncidentalCosts || 0);
  const sellCosts = Math.max(0, inputs.saleIncidentalCosts || 0);
  const improvements = Math.max(0, inputs.improvementCosts || 0);
  const priorLosses = Math.max(0, inputs.lossesBroughtForward || 0);
  const exemptionLimit = Math.max(0, inputs.annualExemptionAllowance || 0);
  const taxRate = Math.max(0, inputs.cgtRatePercent || 0) / 100;

  const totalAcquisitionCost = purchase + buyCosts + improvements;
  const totalAllowableDeductions = buyCosts + improvements + sellCosts;
  const grossCapitalGainOrLoss = sale - purchase - totalAllowableDeductions;
  const isLoss = grossCapitalGainOrLoss <= 0;

  let netGainAfterLosses = 0;
  let exemptionUtilized = 0;
  let taxableCapitalGain = 0;
  let cgtPayable = 0;

  if (!isLoss) {
    netGainAfterLosses = Math.max(0, grossCapitalGainOrLoss - priorLosses);
    exemptionUtilized = Math.min(netGainAfterLosses, exemptionLimit);
    taxableCapitalGain = Math.max(0, netGainAfterLosses - exemptionUtilized);
    cgtPayable = taxableCapitalGain * taxRate;
  }

  const netPostTaxProceeds = sale - sellCosts - cgtPayable;
  const effectiveCgtRate = grossCapitalGainOrLoss > 0 ? (cgtPayable / grossCapitalGainOrLoss) * 100 : 0;
  const totalInvested = purchase + buyCosts + improvements;
  const netProfit = netPostTaxProceeds - (purchase + buyCosts + improvements);
  const netRoiPercent = totalInvested > 0 ? (netProfit / totalInvested) * 100 : 0;

  return {
    grossProceeds: sale,
    totalAcquisitionCost: Number(totalAcquisitionCost.toFixed(2)),
    totalAllowableDeductions: Number(totalAllowableDeductions.toFixed(2)),
    grossCapitalGainOrLoss: Number(grossCapitalGainOrLoss.toFixed(2)),
    isLoss,
    netGainAfterLosses: Number(netGainAfterLosses.toFixed(2)),
    exemptionUtilized: Number(exemptionUtilized.toFixed(2)),
    taxableCapitalGain: Number(taxableCapitalGain.toFixed(2)),
    cgtPayable: Number(cgtPayable.toFixed(2)),
    netPostTaxProceeds: Number(netPostTaxProceeds.toFixed(2)),
    effectiveCgtRate: Number(effectiveCgtRate.toFixed(2)),
    netRoiPercent: Number(netRoiPercent.toFixed(2)),
  };
}

// ----------------------------------------------------
// COMMERCIAL MARGIN & TAX CALCULATOR
// ----------------------------------------------------

export interface MarginInputs {
  mode: 'from_price' | 'from_margin'; // find margin from price, or price from target margin
  unitCost: number;                  // Cost of Goods Sold (COGS)
  sellingPriceInput?: number;        // Net or Gross selling price
  targetMarginPercent?: number;      // e.g. 40%
  salesVolumeUnits: number;          // Volume for total business projection
  operatingOverheadPerUnit: number;  // Shipping, packaging, support
  fixedMonthlyOverheads: number;     // Rent, software, salaries
  vatRatePercent: number;            // Sales Tax / VAT rate
  isPriceVatInclusive: boolean;      // Whether selling price includes VAT
  corporateTaxRatePercent: number;   // e.g. 12.5% (IE), 25% (UK/US)
}

export interface MarginBreakdown {
  netSellingPricePerUnit: number;
  vatAmountPerUnit: number;
  grossSellingPricePerUnit: number;
  cogsPerUnit: number;
  grossProfitPerUnit: number;
  grossMarginPercent: number;
  markupPercent: number;
  operatingCostPerUnit: number;
  operatingProfitPerUnit: number;
  corporateTaxPerUnit: number;
  netPostTaxProfitPerUnit: number;
  netMarginPercent: number;
  // Volume Aggregates
  totalNetRevenue: number;
  totalVatLiability: number;
  totalGrossProfit: number;
  totalOperatingProfit: number;
  totalCorporateTax: number;
  totalNetProfit: number;
  breakEvenUnits: number;
}

export function calculateCommercialMargin(inputs: MarginInputs): MarginBreakdown {
  const cost = Math.max(0.01, inputs.unitCost || 0);
  const vatRate = Math.max(0, inputs.vatRatePercent || 0) / 100;
  const corpTaxRate = Math.max(0, inputs.corporateTaxRatePercent || 0) / 100;
  const overheadPerUnit = Math.max(0, inputs.operatingOverheadPerUnit || 0);
  const fixedMonthly = Math.max(0, inputs.fixedMonthlyOverheads || 0);
  const volume = Math.max(1, inputs.salesVolumeUnits || 1);

  let netPrice = 0;

  if (inputs.mode === 'from_margin') {
    const targetMargin = Math.min(99.9, Math.max(0.1, inputs.targetMarginPercent || 40)) / 100;
    // Price = Cost / (1 - Margin)
    netPrice = cost / (1 - targetMargin);
  } else {
    const inputPrice = Math.max(0, inputs.sellingPriceInput || 0);
    if (inputs.isPriceVatInclusive) {
      netPrice = vatRate > 0 ? inputPrice / (1 + vatRate) : inputPrice;
    } else {
      netPrice = inputPrice;
    }
  }

  const vatAmount = netPrice * vatRate;
  const grossPrice = netPrice + vatAmount;

  const grossProfitPerUnit = netPrice - cost;
  const grossMarginPercent = netPrice > 0 ? (grossProfitPerUnit / netPrice) * 100 : 0;
  const markupPercent = cost > 0 ? (grossProfitPerUnit / cost) * 100 : 0;

  // Fixed overhead allocated per unit
  const fixedPerUnit = (fixedMonthly * 12) / (volume * 12);
  const totalOpCostPerUnit = overheadPerUnit + fixedPerUnit;
  const operatingProfitPerUnit = grossProfitPerUnit - totalOpCostPerUnit;
  const corporateTaxPerUnit = Math.max(0, operatingProfitPerUnit) * corpTaxRate;
  const netPostTaxProfitPerUnit = operatingProfitPerUnit - corporateTaxPerUnit;
  const netMarginPercent = netPrice > 0 ? (netPostTaxProfitPerUnit / netPrice) * 100 : 0;

  // Volume Aggregates
  const totalNetRevenue = netPrice * volume;
  const totalVatLiability = vatAmount * volume;
  const totalGrossProfit = grossProfitPerUnit * volume;
  const totalOperatingProfit = operatingProfitPerUnit * volume;
  const totalCorporateTax = corporateTaxPerUnit * volume;
  const totalNetProfit = netPostTaxProfitPerUnit * volume;

  // Break-even units: Fixed Costs / (Net Price - Variable Cost per unit)
  const contributionMarginPerUnit = netPrice - cost - overheadPerUnit;
  const annualFixed = fixedMonthly * 12;
  const breakEvenUnits = contributionMarginPerUnit > 0 ? Math.ceil(annualFixed / contributionMarginPerUnit) : 0;

  return {
    netSellingPricePerUnit: Number(netPrice.toFixed(2)),
    vatAmountPerUnit: Number(vatAmount.toFixed(2)),
    grossSellingPricePerUnit: Number(grossPrice.toFixed(2)),
    cogsPerUnit: Number(cost.toFixed(2)),
    grossProfitPerUnit: Number(grossProfitPerUnit.toFixed(2)),
    grossMarginPercent: Number(grossMarginPercent.toFixed(2)),
    markupPercent: Number(markupPercent.toFixed(2)),
    operatingCostPerUnit: Number(totalOpCostPerUnit.toFixed(2)),
    operatingProfitPerUnit: Number(operatingProfitPerUnit.toFixed(2)),
    corporateTaxPerUnit: Number(corporateTaxPerUnit.toFixed(2)),
    netPostTaxProfitPerUnit: Number(netPostTaxProfitPerUnit.toFixed(2)),
    netMarginPercent: Number(netMarginPercent.toFixed(2)),
    totalNetRevenue: Number(totalNetRevenue.toFixed(2)),
    totalVatLiability: Number(totalVatLiability.toFixed(2)),
    totalGrossProfit: Number(totalGrossProfit.toFixed(2)),
    totalOperatingProfit: Number(totalOperatingProfit.toFixed(2)),
    totalCorporateTax: Number(totalCorporateTax.toFixed(2)),
    totalNetProfit: Number(totalNetProfit.toFixed(2)),
    breakEvenUnits,
  };
}
