export type CurrencyCode = 'EUR' | 'GBP' | 'USD' | 'CAD' | 'AUD' | 'JPY' | 'CHF';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  position: 'prefix' | 'suffix';
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  EUR: { code: 'EUR', symbol: '€', name: 'Euro (EUR)', position: 'prefix' },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound (GBP)', position: 'prefix' },
  USD: { code: 'USD', symbol: '$', name: 'US Dollar (USD)', position: 'prefix' },
  CAD: { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar (CAD)', position: 'prefix' },
  AUD: { code: 'AUD', symbol: 'AU$', name: 'Australian Dollar (AUD)', position: 'prefix' },
  CHF: { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc (CHF)', position: 'prefix' },
  JPY: { code: 'JPY', symbol: '¥', name: 'Japanese Yen (JPY)', position: 'prefix' },
};

/**
 * Format a numeric amount with proper commas, decimals, and currency symbol.
 */
export function formatCurrency(
  amount: number,
  currencyCode: CurrencyCode = 'EUR',
  decimals: number = 2
): string {
  if (isNaN(amount) || !isFinite(amount)) return `${CURRENCIES[currencyCode].symbol}0.00`;
  
  const curr = CURRENCIES[currencyCode] || CURRENCIES.EUR;
  const isNegative = amount < 0;
  const absVal = Math.abs(amount);
  
  const formattedNumber = absVal.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  const sign = isNegative ? '-' : '';

  if (curr.position === 'prefix') {
    return `${sign}${curr.symbol}${formattedNumber}`;
  }
  return `${sign}${formattedNumber} ${curr.symbol}`;
}

/**
 * Format a percentage with standard symbol.
 */
export function formatPercent(value: number, decimals: number = 2): string {
  if (isNaN(value) || !isFinite(value)) return '0%';
  return `${value.toLocaleString('en-US', {
    minimumFractionDigits: Number.isInteger(value) ? 0 : decimals,
    maximumFractionDigits: decimals,
  })}%`;
}

/**
 * Format a clean number with comma separators.
 */
export function formatNumber(value: number, decimals: number = 2): string {
  if (isNaN(value) || !isFinite(value)) return '0';
  return value.toLocaleString('en-US', {
    minimumFractionDigits: Number.isInteger(value) ? 0 : decimals,
    maximumFractionDigits: decimals,
  });
}
