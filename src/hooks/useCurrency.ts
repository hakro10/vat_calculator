import { useState, useEffect } from 'react';
import { CurrencyCode, CURRENCIES } from '../utils/formatters';

const STORAGE_KEY = 'vatcalcs_currency';

export function useCurrency(defaultCurrency: CurrencyCode = 'EUR') {
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY) as CurrencyCode | null;
      if (stored && CURRENCIES[stored]) return stored;
    }
    return defaultCurrency;
  });

  const setCurrency = (code: CurrencyCode) => {
    if (CURRENCIES[code]) {
      setCurrencyState(code);
      try {
        localStorage.setItem(STORAGE_KEY, code);
      } catch {
        // ignore
      }
    }
  };

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as CurrencyCode | null;
      if (stored && CURRENCIES[stored]) {
        setCurrencyState(stored);
      }
    } catch {
      // ignore
    }
  }, []);

  return {
    currency,
    setCurrency,
    currencyConfig: CURRENCIES[currency] || CURRENCIES.EUR,
  };
}
