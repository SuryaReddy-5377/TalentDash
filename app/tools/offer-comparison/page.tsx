'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function OfferComparisonPage() {
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
      <main className="container-custom py-8">
        <div className="text-center py-12">Loading...</div>
      </main>
    );
  }

  return (
    <main className="container-custom py-8">
      <h1 className="text-3xl font-bold text-[#1F2937] mb-8">Offer Comparison</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="card p-4 border-green-100">
          <label className="block text-sm font-medium text-gray-700 mb-2">Offer 1</label>
          <select
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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

        <div className="card p-4 border-green-100">
          <label className="block text-sm font-medium text-gray-700 mb-2">Offer 2</label>
          <select
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
        <div className="card overflow-hidden border-green-100">
          <div className="overflow-x-auto">
            <table className="table-modern">
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Offer 1</th>
                  <th>Offer 2</th>
                  <th>Delta</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-semibold">Company</td>
                  <td>{record1.company?.name}</td>
                  <td>{record2.company?.name}</td>
                  <td>—</td>
                </tr>
                <tr>
                  <td className="font-semibold">Role</td>
                  <td>{record1.role}</td>
                  <td>{record2.role}</td>
                  <td>—</td>
                </tr>
                <tr>
                  <td className="font-semibold">Level</td>
                  <td>{record1.level}</td>
                  <td>{record2.level}</td>
                  <td>—</td>
                </tr>
                <tr>
                  <td className="font-semibold">Location</td>
                  <td>{record1.location}</td>
                  <td>{record2.location}</td>
                  <td>—</td>
                </tr>
                <tr>
                  <td className="font-semibold">Base Salary</td>
                  <td>{formatCurrency(Number(record1.baseSalary))}</td>
                  <td>{formatCurrency(Number(record2.baseSalary))}</td>
                  <td className={Number(record1.baseSalary) - Number(record2.baseSalary) > 0 ? 'text-green-600' : 'text-red-500'}>
                    {Number(record1.baseSalary) - Number(record2.baseSalary) > 0 ? '+' : ''}
                    {formatCurrency(Number(record1.baseSalary) - Number(record2.baseSalary))}
                  </td>
                </tr>
                <tr className="bg-green-50 font-bold">
                  <td className="font-bold text-green-600">Total Compensation</td>
                  <td className="text-green-600">{formatCurrency(Number(record1.totalCompensation))}</td>
                  <td className="text-green-600">{formatCurrency(Number(record2.totalCompensation))}</td>
                  <td className={Number(record1.totalCompensation) - Number(record2.totalCompensation) > 0 ? 'text-green-600' : 'text-red-500'}>
                    {Number(record1.totalCompensation) - Number(record2.totalCompensation) > 0 ? '+' : ''}
                    {formatCurrency(Number(record1.totalCompensation) - Number(record2.totalCompensation))}
                    {Number(record1.totalCompensation) > Number(record2.totalCompensation) && 
                      <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Winner 🏆</span>
                    }
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  );
}