import { Currency } from '@/types';

export function safeNumber(value: any): number {
  if (typeof value === 'bigint') {
    return Number(value);
  }
  if (typeof value === 'number') {
    return value;
  }
  if (typeof value === 'string') {
    return parseFloat(value) || 0;
  }
  return 0;
}

export function formatCurrency(amount: number | bigint, currency: string): string {
  const numAmount = typeof amount === 'bigint' ? Number(amount) : amount;
  
  if (currency === 'USD') {
    return `$${(numAmount / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  
  if (currency === 'GBP') {
    return `£${(numAmount / 100).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  
  if (currency === 'EUR') {
    return `€${(numAmount / 100).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  
  // INR - Indian format with lakhs/crores
  if (numAmount >= 10000000) {
    return `₹${(numAmount / 10000000).toFixed(2)} Cr`;
  }
  if (numAmount >= 100000) {
    return `₹${(numAmount / 100000).toFixed(1)} L`;
  }
  return `₹${numAmount.toLocaleString('en-IN')}`;
}

export function formatExperience(years: number): string {
  if (years === 0) return 'Fresher';
  if (years === 1) return '1 year';
  return `${years} years`;
}

export function convertCurrency(amount: number | bigint, from: Currency, to: Currency): number {
  const numAmount = typeof amount === 'bigint' ? Number(amount) : amount;
  
  const rates: Record<Currency, number> = {
    INR: 1,
    USD: 0.012,
    GBP: 0.0096,
    EUR: 0.011,
  };
  
  if (from === to) return numAmount;
  return (numAmount / rates[from]) * rates[to];
}