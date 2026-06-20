'use client';

import { useState, useEffect } from 'react';

export default function ComparePage() {
  const [salaries, setSalaries] = useState<any[]>([]);
  const [record1, setRecord1] = useState<any>(null);
  const [record2, setRecord2] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/salaries?limit=100')
      .then(res => res.json())
      .then(data => {
        setSalaries(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const formatCurrency = (amount: number) => {
    if (!amount) return '₹0';
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)} L`;
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  if (loading) {
    return (
      <div className="container-custom py-8">
        <div className="text-center py-12 text-[#484848]">Loading...</div>
      </div>
    );
  }

  return (
    <main className="container-custom py-8">
      <h1 className="text-3xl font-bold text-[#222222] mb-8">Compare Salaries</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="card p-4">
          <label className="block text-sm font-medium text-[#484848] mb-2">Salary Record 1</label>
          <select
            className="w-full p-3 border border-[#EBEBEB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent bg-white text-[#222222]"
            onChange={(e) => {
              const selected = salaries.find(s => s.id === e.target.value);
              setRecord1(selected);
            }}
          >
            <option value="">Select a salary</option>
            {salaries.map((s) => (
              <option key={s.id} value={s.id}>
                {s.company?.name} - {s.role} - {formatCurrency(Number(s.totalCompensation))}
              </option>
            ))}
          </select>
        </div>

        <div className="card p-4">
          <label className="block text-sm font-medium text-[#484848] mb-2">Salary Record 2</label>
          <select
            className="w-full p-3 border border-[#EBEBEB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent bg-white text-[#222222]"
            onChange={(e) => {
              const selected = salaries.find(s => s.id === e.target.value);
              setRecord2(selected);
            }}
          >
            <option value="">Select a salary</option>
            {salaries.map((s) => (
              <option key={s.id} value={s.id}>
                {s.company?.name} - {s.role} - {formatCurrency(Number(s.totalCompensation))}
              </option>
            ))}
          </select>
        </div>
      </div>

      {record1 && record2 && (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table-modern">
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Record 1</th>
                  <th>Record 2</th>
                  <th>Delta</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-semibold text-[#222222]">Company</td>
                  <td className="text-[#484848]">{record1.company?.name}</td>
                  <td className="text-[#484848]">{record2.company?.name}</td>
                  <td>—</td>
                </tr>
                <tr>
                  <td className="font-semibold text-[#222222]">Role</td>
                  <td className="text-[#484848]">{record1.role}</td>
                  <td className="text-[#484848]">{record2.role}</td>
                  <td>—</td>
                </tr>
                <tr>
                  <td className="font-semibold text-[#222222]">Level</td>
                  <td className="text-[#484848]">{record1.level}</td>
                  <td className="text-[#484848]">{record2.level}</td>
                  <td>—</td>
                </tr>
                <tr>
                  <td className="font-semibold text-[#222222]">Location</td>
                  <td className="text-[#484848]">{record1.location}</td>
                  <td className="text-[#484848]">{record2.location}</td>
                  <td>—</td>
                </tr>
                <tr>
                  <td className="font-semibold text-[#222222]">Base Salary</td>
                  <td className="text-[#484848]">{formatCurrency(Number(record1.baseSalary))}</td>
                  <td className="text-[#484848]">{formatCurrency(Number(record2.baseSalary))}</td>
                  <td className={Number(record1.baseSalary) - Number(record2.baseSalary) > 0 ? 'text-[#008A05] font-semibold' : 'text-[#D93025] font-semibold'}>
                    {Number(record1.baseSalary) - Number(record2.baseSalary) > 0 ? '+' : ''}
                    {formatCurrency(Number(record1.baseSalary) - Number(record2.baseSalary))}
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold text-[#222222]">Stock</td>
                  <td className="text-[#484848]">{record1.stock > 0 ? formatCurrency(Number(record1.stock)) : '—'}</td>
                  <td className="text-[#484848]">{record2.stock > 0 ? formatCurrency(Number(record2.stock)) : '—'}</td>
                  <td className={Number(record1.stock) - Number(record2.stock) > 0 ? 'text-[#008A05] font-semibold' : 'text-[#D93025] font-semibold'}>
                    {Number(record1.stock) - Number(record2.stock) > 0 ? '+' : ''}
                    {formatCurrency(Number(record1.stock) - Number(record2.stock))}
                  </td>
                </tr>
                <tr className="bg-[#FFF5F5] font-bold">
                  <td className="font-bold text-[#FF5A5F]">Total Compensation</td>
                  <td className="text-[#FF5A5F]">{formatCurrency(Number(record1.totalCompensation))}</td>
                  <td className="text-[#FF5A5F]">{formatCurrency(Number(record2.totalCompensation))}</td>
                  <td className={Number(record1.totalCompensation) - Number(record2.totalCompensation) > 0 ? 'text-[#008A05]' : 'text-[#D93025]'}>
                    {Number(record1.totalCompensation) - Number(record2.totalCompensation) > 0 ? '+' : ''}
                    {formatCurrency(Number(record1.totalCompensation) - Number(record2.totalCompensation))}
                    {Number(record1.totalCompensation) > Number(record2.totalCompensation) && 
                      <span className="ml-2 text-xs winner-badge">Winner 🏆</span>
                    }
                    {Number(record1.totalCompensation) < Number(record2.totalCompensation) && 
                      <span className="ml-2 text-xs bg-[#FFF5F5] text-[#FF5A5F] px-2 py-1 rounded-full">Higher TC</span>
                    }
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {(!record1 || !record2) && (
        <div className="text-center py-12 text-[#717171] card p-8">
          Select two salary records to compare
        </div>
      )}
    </main>
  );
}