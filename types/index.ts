// Export all types
export * from './salary';
export * from './company';
export * from './api';
export * from './common';

// Or if you have everything in one file, make sure Salary is exported
export interface Salary {
  id?: string;
  companyId: string;
  company?: Company;
  role: string;
  level: Level;
  location: string;
  currency: Currency;
  experienceYears: number;
  baseSalary: number;
  bonus: number;
  stock: number;
  totalCompensation: number;
  source: Source;
  confidenceScore: number;
  isVerified: boolean;
  submittedAt: Date;
}

export interface Company {
  id?: string;
  name: string;
  slug: string;
  normalizedName: string;
  industry?: string;
  headquarters?: string;
  foundedYear?: number | null;
  headcountRange?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum Level {
  L3 = 'L3',
  L4 = 'L4',
  L5 = 'L5',
  L6 = 'L6',
  SDE_I = 'SDE-I',
  SDE_II = 'SDE-II',
  SDE_III = 'SDE-III',
  STAFF = 'Staff',
  PRINCIPAL = 'Principal',
  IC4 = 'IC4',
  IC5 = 'IC5',
}

export enum Currency {
  INR = 'INR',
  USD = 'USD',
  GBP = 'GBP',
  EUR = 'EUR',
}

export enum Source {
  CONTRIBUTOR = 'CONTRIBUTOR',
  SCRAPED = 'SCRAPED',
  AI_INFERRED = 'AI_INFERRED',
}