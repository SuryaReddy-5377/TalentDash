'use client';

import Link from 'next/link';
import { LevelBadge } from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/format';

interface Company {
  id: string;
  name: string;
  slug: string;
  normalizedName: string;
  industry?: string | null;
  headquarters?: string | null;
  foundedYear?: number | null;
  headcountRange?: string | null;
}

interface Salary {
  id: string;
  companyId: string;
  company?: Company;
  role: string;
  level: string;
  location: string;
  currency: string;  // Keep as string for now
  experienceYears: number;
  baseSalary: number;
  bonus: number;
  stock: number;
  totalCompensation: number;
}

interface CompanyDetailsProps {
  company: Company;
  salaries: Salary[];
  medianTotal: number;
  levelDistribution: Record<string, number>;
}

export function CompanyDetails({
  company,
  salaries,
  medianTotal,
  levelDistribution,
}: CompanyDetailsProps) {
  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="glass-card rounded-xl p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#222222]">
              {company.name}
            </h1>
            {company.industry && (
              <p className="text-gray-600 mt-1">{company.industry}</p>
            )}
            <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
              {company.headquarters && <span>📍 {company.headquarters}</span>}
              {company.foundedYear && <span>Founded {company.foundedYear}</span>}
              {company.headcountRange && <span>👥 {company.headcountRange}</span>}
            </div>
          </div>
          <Link
            href={`/compare`}
            className="btn-primary text-center"
          >
            Compare
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="stat-card">
          <div className="stat-label">Median Total Comp</div>
          <div className="stat-value text-[#0369A1]">
            {formatCurrency(medianTotal, 'INR' as any)} {/* ← FIX: Use 'as any' */}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Records</div>
          <div className="stat-value">
            {salaries.length}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Levels Available</div>
          <div className="stat-value">
            {Object.keys(levelDistribution).length}
          </div>
        </div>
      </div>

      {/* Level Distribution */}
      {salaries.length > 0 && (
        <div className="glass-card rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold mb-3">Level Distribution</h3>
          <div className="flex h-6 rounded-lg overflow-hidden">
            {Object.entries(levelDistribution).map(([level, count]) => {
              const percentage = (count / salaries.length) * 100;
              const colors: Record<string, string> = {
                'L3': 'bg-gray-400',
                'L4': 'bg-blue-400',
                'L5': 'bg-indigo-400',
                'L6': 'bg-purple-400',
                'SDE-I': 'bg-gray-300',
                'SDE-II': 'bg-blue-300',
                'SDE-III': 'bg-indigo-300',
                'Staff': 'bg-purple-500',
                'Principal': 'bg-gray-700',
                'IC4': 'bg-blue-300',
                'IC5': 'bg-indigo-300',
              };
              return (
                <div
                  key={level}
                  className={`${colors[level] || 'bg-gray-400'} h-full transition-all`}
                  style={{ width: `${percentage}%` }}
                  title={`${level}: ${count} records (${percentage.toFixed(1)}%)`}
                />
              );
            })}
          </div>
          <div className="flex flex-wrap gap-3 mt-3">
            {Object.entries(levelDistribution).map(([level, count]) => (
              <span key={level} className="text-xs text-gray-600 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full" style={{
                  backgroundColor: {
                    'L3': '#9ca3af',
                    'L4': '#60a5fa',
                    'L5': '#818cf8',
                    'L6': '#a78bfa',
                    'SDE-I': '#d1d5db',
                    'SDE-II': '#93c5fd',
                    'SDE-III': '#a5b4fc',
                    'Staff': '#8b5cf6',
                    'Principal': '#374151',
                    'IC4': '#93c5fd',
                    'IC5': '#a5b4fc',
                  }[level] || '#9ca3af'
                }} />
                {level} ({count})
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Salary List */}
      {salaries.length > 0 && (
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold">Salary List</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="table-modern">
              <thead>
                <tr>
                  <th>Role</th>
                  <th>Level</th>
                  <th>Location</th>
                  <th className="text-right">Total Comp</th>
                </tr>
              </thead>
              <tbody>
                {salaries.slice(0, 10).map((salary) => (
                  <tr key={salary.id}>
                    <td className="font-medium">{salary.role}</td>
                    <td><LevelBadge level={salary.level} /></td>
                    <td className="text-gray-600">{salary.location}</td>
                    <td className="text-right font-bold text-[#0369A1]">
                      {formatCurrency(salary.totalCompensation, salary.currency as any)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}