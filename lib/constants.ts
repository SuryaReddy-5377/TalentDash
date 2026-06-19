import { Level, Currency } from '@/types';

export const LEVELS: Level[] = [
  Level.L3, 
  Level.L4, 
  Level.L5, 
  Level.L6,
  Level.SDE_I, 
  Level.SDE_II, 
  Level.SDE_III,
  Level.STAFF, 
  Level.PRINCIPAL,
  Level.IC4, 
  Level.IC5
];

export const LEVEL_DISPLAY: Record<Level, string> = {
  [Level.L3]: 'L3 (Entry)',
  [Level.L4]: 'L4 (Mid)',
  [Level.L5]: 'L5 (Senior)',
  [Level.L6]: 'L6 (Lead)',
  [Level.SDE_I]: 'SDE-I',
  [Level.SDE_II]: 'SDE-II',
  [Level.SDE_III]: 'SDE-III',
  [Level.STAFF]: 'Staff Engineer',
  [Level.PRINCIPAL]: 'Principal Engineer',
  [Level.IC4]: 'IC4',
  [Level.IC5]: 'IC5',
};

export const CURRENCIES: Currency[] = [
  Currency.INR, 
  Currency.USD, 
  Currency.GBP, 
  Currency.EUR
];

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  [Currency.INR]: '₹',
  [Currency.USD]: '$',
  [Currency.GBP]: '£',
  [Currency.EUR]: '€',
};

export const CURRENCY_CONVERSION: Record<Currency, number> = {
  [Currency.INR]: 1,
  [Currency.USD]: 0.012,
  [Currency.GBP]: 0.0095,
  [Currency.EUR]: 0.011,
};

export const INDIAN_CITIES = [
  'Bengaluru',
  'Mumbai',
  'Delhi',
  'Hyderabad',
  'Pune',
  'Chennai',
  'Kolkata',
  'Ahmedabad',
  'Noida',
  'Gurgaon',
];

export const DEFAULT_PAGE_SIZE = 25;
export const MAX_PAGE_SIZE = 100;

export const CACHE_TTL = {
  SALARIES: 300,
  COMPANY: 3600,
  COMPARE: 86400,
};