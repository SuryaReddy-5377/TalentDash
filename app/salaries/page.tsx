'use client';

import { useState, useEffect } from 'react';

export default function SalariesPage() {
  const [salaries, setSalaries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/salaries')
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

  const getLevelClass = (level: string) => {
    const classes: Record<string, string> = {
      'L3': 'level-l3',
      'L4': 'level-l4',
      'L5': 'level-l5',
      'L6': 'level-l6',
      'SDE-I': 'level-sde',
      'SDE-II': 'level-sde',
      'SDE-III': 'level-sde',
      'Staff': 'level-staff',
      'Principal': 'level-principal',
    };
    return classes[level] || 'level-l3';
  };

  const filteredSalaries = salaries.filter(s => {
    const searchLower = search.toLowerCase();
    return (s.company?.name?.toLowerCase() || '').includes(searchLower) ||
           (s.role?.toLowerCase() || '').includes(searchLower);
  });

  if (loading) {
    return (
      <div className="container-custom py-8">
        <div className="text-center py-12">Loading salaries...</div>
      </div>
    );
  }

  return (
    <main className="container-custom py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1F2937]">Software Engineer Salaries</h1>
        <p className="text-gray-600 mt-1">{salaries.length} salary records</p>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search companies or roles..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table-modern">
            <thead>
              <tr>
                <th>Company</th>
                <th>Role</th>
                <th>Level</th>
                <th>Location</th>
                <th className="text-right">Base</th>
                <th className="text-right">Stock</th>
                <th className="text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {filteredSalaries.map((salary) => (
                <tr key={salary.id}>
                  <td className="font-semibold">{salary.company?.name || 'Unknown'}</td>
                  <td>{salary.role}</td>
                  <td>
                    <span className={`badge ${getLevelClass(salary.level)}`}>
                      {salary.level}
                    </span>
                  </td>
                  <td className="text-gray-600">{salary.location}</td>
                  <td className="text-right font-medium">{formatCurrency(Number(salary.baseSalary))}</td>
                  <td className="text-right text-gray-500">
                    {Number(salary.stock) > 0 ? formatCurrency(Number(salary.stock)) : '—'}
                  </td>
                  <td className="text-right">
                    <span className="text-lg font-bold text-[#10B981]">
                      {formatCurrency(Number(salary.totalCompensation))}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
          <div className="text-sm text-gray-600 text-center">
            Showing <span className="font-medium">{filteredSalaries.length}</span> records
          </div>
        </div>
      </div>
    </main>
  );
}