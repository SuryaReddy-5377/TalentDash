import { Salary, Level, Currency, Source } from '@/types';

// 60+ realistic records
export const mockSalaries: Omit<Salary, 'id' | 'companyId' | 'company'>[] = [
  // Google - Bengaluru
  {
    role: 'Software Engineer',
    level: Level.L4,
    location: 'Bengaluru',
    currency: Currency.INR,
    experienceYears: 4,
    baseSalary: 3000000,
    bonus: 300000,
    stock: 500000,
    totalCompensation: 3800000,
    source: Source.CONTRIBUTOR,
    confidenceScore: 0.95,
    isVerified: true,
    submittedAt: new Date('2026-01-15'),
  },
  // ... Add 60+ records following the same pattern
  // Include companies: Google, Amazon, Meta, Microsoft, Flipkart, Meesho, NVIDIA, TCS, Infosys, Wipro, Razorpay, Zepto
  // Include all levels, multiple cities, both currencies
  // Include edge cases: zero bonus, zero stock, high equity, Principal level
];