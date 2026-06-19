'use client';

import { Salary } from '@/types';
import { formatCurrency } from '@/lib/format';

interface CompareViewProps {
  record1: Salary | null;
  record2: Salary | null;
}

export function CompareView({ record1, record2 }: CompareViewProps) {
  if (!record1 || !record2) {
    return (
      <div className="text-center py-12">
        <p className="text-text-secondary">Select two records to compare</p>
        <div className="mt-4 flex gap-4 justify-center">
          <div className="card p-4 w-64">Select Record 1</div>
          <div className="card p-4 w-64">Select Record 2</div>
        </div>
      </div>
    );
  }

  const delta = {
    baseDelta: record1.baseSalary - record2.baseSalary,
    bonusDelta: record1.bonus - record2.bonus,
    stockDelta: record1.stock - record2.stock,
    tcDelta: record1.totalCompensation - record2.totalCompensation,
    experienceDelta: record1.experienceYears - record2.experienceYears,
  };

  const winner = delta.tcDelta > 0 ? record1 : record2;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Compare Salaries</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Record 1 */}
        <div className="card">
          <div className="card-body">
            <h3 className="font-semibold">{record1.company?.name || 'Company 1'}</h3>
            <div className="mt-2 space-y-1 text-sm">
              <p>Role: {record1.role}</p>
              <p>Level: {record1.level}</p>
              <p>Location: {record1.location}</p>
              <p>Experience: {record1.experienceYears} years</p>
              <p className="font-bold text-brand-blue">
                TC: {formatCurrency(record1.totalCompensation, record1.currency)}
              </p>
            </div>
          </div>
        </div>

        {/* Delta */}
        <div className="card bg-gray-50">
          <div className="card-body text-center">
            <h3 className="font-semibold mb-4">Difference</h3>
            <div className="space-y-2 text-sm">
              <p className={delta.tcDelta > 0 ? 'text-green-600' : 'text-red-600'}>
                TC: {delta.tcDelta > 0 ? '+' : ''}{formatCurrency(delta.tcDelta, record1.currency)}
              </p>
              <p className={delta.baseDelta > 0 ? 'text-green-600' : 'text-red-600'}>
                Base: {delta.baseDelta > 0 ? '+' : ''}{formatCurrency(delta.baseDelta, record1.currency)}
              </p>
              <p className={delta.bonusDelta > 0 ? 'text-green-600' : 'text-red-600'}>
                Bonus: {delta.bonusDelta > 0 ? '+' : ''}{formatCurrency(delta.bonusDelta, record1.currency)}
              </p>
            </div>
            {winner && (
              <div className="mt-4">
                <span className="badge badge-primary">
                  🏆 Higher TC: {winner.company?.name}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Record 2 */}
        <div className="card">
          <div className="card-body">
            <h3 className="font-semibold">{record2.company?.name || 'Company 2'}</h3>
            <div className="mt-2 space-y-1 text-sm">
              <p>Role: {record2.role}</p>
              <p>Level: {record2.level}</p>
              <p>Location: {record2.location}</p>
              <p>Experience: {record2.experienceYears} years</p>
              <p className="font-bold text-brand-blue">
                TC: {formatCurrency(record2.totalCompensation, record2.currency)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}