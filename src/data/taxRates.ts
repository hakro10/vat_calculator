import { CurrencyCode } from '../utils/formatters';

export interface TaxPreset {
  id: string;
  name: string;
  countryCode: string;
  currency: CurrencyCode;
  flag: string;
  standardRate: number;
  rates: {
    label: string;
    rate: number;
    description?: string;
  }[];
}

export const COUNTRY_TAX_PRESETS: TaxPreset[] = [
  {
    id: 'ie',
    name: 'Ireland',
    countryCode: 'IE',
    currency: 'EUR',
    flag: '🇮🇪',
    standardRate: 23,
    rates: [
      { label: 'Standard (23%)', rate: 23, description: 'General goods, electronics, consulting, luxury' },
      { label: 'Reduced (13.5%)', rate: 13.5, description: 'Fuel, electricity, domestic services, building work' },
      { label: 'Second Reduced (9%)', rate: 9, description: 'Periodicals, ebooks, selected sporting facilities' },
      { label: 'Livestock (4.8%)', rate: 4.8, description: 'Livestock and agriculture supplies' },
      { label: 'Zero (0%)', rate: 0, description: 'Basic groceries, oral medicines, books, exports' },
    ],
  },
  {
    id: 'gb',
    name: 'United Kingdom',
    countryCode: 'GB',
    currency: 'GBP',
    flag: '🇬🇧',
    standardRate: 20,
    rates: [
      { label: 'Standard (20%)', rate: 20, description: 'Most goods and commercial services' },
      { label: 'Reduced (5%)', rate: 5, description: 'Domestic energy, children car seats, mobility aids' },
      { label: 'Zero (0%)', rate: 0, description: 'Most food, books, newspapers, children clothes' },
    ],
  },
  {
    id: 'de',
    name: 'Germany',
    countryCode: 'DE',
    currency: 'EUR',
    flag: '🇩🇪',
    standardRate: 19,
    rates: [
      { label: 'Standard (19%)', rate: 19, description: 'General merchandise and services' },
      { label: 'Reduced (7%)', rate: 7, description: 'Foodstuffs, books, cultural events, short-term lodging' },
      { label: 'Zero (0%)', rate: 0, description: 'Solar panels, intra-community supplies, exports' },
    ],
  },
  {
    id: 'fr',
    name: 'France',
    countryCode: 'FR',
    currency: 'EUR',
    flag: '🇫🇷',
    standardRate: 20,
    rates: [
      { label: 'Standard (20%)', rate: 20, description: 'General goods and services' },
      { label: 'Intermediate (10%)', rate: 10, description: 'Restaurants, transport, home renovation' },
      { label: 'Reduced (5.5%)', rate: 5.5, description: 'Basic food, energy, books, hygiene products' },
      { label: 'Super Reduced (2.1%)', rate: 2.1, description: 'Reimbursable medicines, TV licenses, press' },
    ],
  },
  {
    id: 'es',
    name: 'Spain',
    countryCode: 'ES',
    currency: 'EUR',
    flag: '🇪🇸',
    standardRate: 21,
    rates: [
      { label: 'Standard (21%)', rate: 21, description: 'Most products and professional services' },
      { label: 'Reduced (10%)', rate: 10, description: 'Hospitality, passenger transport, non-basic foods' },
      { label: 'Super Reduced (4%)', rate: 4, description: 'Staple groceries, medicines, books, subsidized housing' },
    ],
  },
  {
    id: 'it',
    name: 'Italy',
    countryCode: 'IT',
    currency: 'EUR',
    flag: '🇮🇹',
    standardRate: 22,
    rates: [
      { label: 'Standard (22%)', rate: 22, description: 'General goods and commercial services' },
      { label: 'Reduced (10%)', rate: 10, description: 'Hotel lodging, restaurant services, energy' },
      { label: 'Super Reduced (5%)', rate: 5, description: 'Social healthcare, select food staples' },
      { label: 'Minimum (4%)', rate: 4, description: 'Basic food items, press, educational materials' },
    ],
  },
  {
    id: 'nl',
    name: 'Netherlands',
    countryCode: 'NL',
    currency: 'EUR',
    flag: '🇳🇱',
    standardRate: 21,
    rates: [
      { label: 'Standard (21%)', rate: 21, description: 'Standard consumer goods & services' },
      { label: 'Reduced (9%)', rate: 9, description: 'Food, beverages, pharmaceuticals, books, hotels' },
      { label: 'Zero (0%)', rate: 0, description: 'Cross-border transport, international trade' },
    ],
  },
  {
    id: 'be',
    name: 'Belgium',
    countryCode: 'BE',
    currency: 'EUR',
    flag: '🇧🇪',
    standardRate: 21,
    rates: [
      { label: 'Standard (21%)', rate: 21, description: 'General sales & services' },
      { label: 'Intermediate (12%)', rate: 12, description: 'Restaurant food, social housing, coal' },
      { label: 'Reduced (6%)', rate: 6, description: 'Basic food, water, books, hotels, renovation' },
      { label: 'Zero (0%)', rate: 0, description: 'Daily newspapers, recycled goods' },
    ],
  },
  {
    id: 'se',
    name: 'Sweden',
    countryCode: 'SE',
    currency: 'EUR',
    flag: '🇸🇪',
    standardRate: 25,
    rates: [
      { label: 'Standard (25%)', rate: 25, description: 'Most goods and standard commercial operations' },
      { label: 'Reduced (12%)', rate: 12, description: 'Foodstuffs, restaurant meals, hotel stays' },
      { label: 'Reduced (6%)', rate: 6, description: 'Public transport, books, newspapers, cultural admissions' },
    ],
  },
  {
    id: 'pl',
    name: 'Poland',
    countryCode: 'PL',
    currency: 'EUR',
    flag: '🇵🇱',
    standardRate: 23,
    rates: [
      { label: 'Standard (23%)', rate: 23, description: 'Standard rate for goods and services' },
      { label: 'Reduced (8%)', rate: 8, description: 'Hospitality, transport, home construction' },
      { label: 'Reduced (5%)', rate: 5, description: 'Basic groceries, books, hygienic items' },
      { label: 'Zero (0%)', rate: 0, description: 'Export supplies, intra-EU goods' },
    ],
  },
  {
    id: 'pt',
    name: 'Portugal',
    countryCode: 'PT',
    currency: 'EUR',
    flag: '🇵🇹',
    standardRate: 23,
    rates: [
      { label: 'Standard (23%)', rate: 23, description: 'Mainland standard tax rate' },
      { label: 'Intermediate (13%)', rate: 13, description: 'Wine, agricultural equipment, musical events' },
      { label: 'Reduced (6%)', rate: 6, description: 'Basic food, medical drugs, public transport, lodging' },
    ],
  },
  {
    id: 'us',
    name: 'United States (Sales Tax)',
    countryCode: 'US',
    currency: 'USD',
    flag: '🇺🇸',
    standardRate: 8.25,
    rates: [
      { label: 'Avg California (8.85%)', rate: 8.85, description: 'State base 7.25% + local county average' },
      { label: 'New York City (8.875%)', rate: 8.875, description: 'NY State 4% + NYC 4.5% + MTA 0.375%' },
      { label: 'Texas (8.25%)', rate: 8.25, description: 'State 6.25% + typical city 2%' },
      { label: 'Florida (7.0%)', rate: 7.0, description: 'State base 6.0% + county surtax' },
      { label: 'Illinois / Chicago (10.25%)', rate: 10.25, description: 'Combined state, county, and city sales tax' },
      { label: 'Zero Tax State (0%)', rate: 0, description: 'Delaware, Montana, New Hampshire, Oregon, Alaska' },
    ],
  },
  {
    id: 'ca',
    name: 'Canada (GST / HST / PST)',
    countryCode: 'CA',
    currency: 'CAD',
    flag: '🇨🇦',
    standardRate: 13,
    rates: [
      { label: 'Ontario HST (13%)', rate: 13, description: 'Harmonized Sales Tax (Federal + Provincial)' },
      { label: 'Atlantic HST (15%)', rate: 15, description: 'NB, NL, NS, PEI Harmonized Sales Tax' },
      { label: 'Quebec GST+QST (14.975%)', rate: 14.975, description: 'Federal GST 5% + Quebec QST 9.975%' },
      { label: 'BC / MB / SK GST+PST (11-12%)', rate: 12, description: 'Federal GST 5% + Provincial PST 7%' },
      { label: 'Alberta / Territories GST (5%)', rate: 5, description: 'Federal GST only (0% provincial sales tax)' },
    ],
  },
  {
    id: 'au',
    name: 'Australia (GST)',
    countryCode: 'AU',
    currency: 'AUD',
    flag: '🇦🇺',
    standardRate: 10,
    rates: [
      { label: 'Standard GST (10%)', rate: 10, description: 'Nationwide Goods and Services Tax' },
      { label: 'GST-Free (0%)', rate: 0, description: 'Fresh food, medical, health, education, exports' },
    ],
  },
];
