import { Salary } from './salary';
import { Level } from './common';

export interface Company {
  id: string;
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

export interface CompanyDetail extends Company {
  salaries: Salary[];
  medianTotalCompensation: number;
  levelDistribution: Record<Level, number>;
}