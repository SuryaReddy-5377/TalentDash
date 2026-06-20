'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function SalariesContent() {
  const searchParams = useSearchParams();
  const [salaries, setSalaries] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedCompany, setSelectedCompany] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState<string[]>([]);

  const levels = ['L3', 'L4', 'L5', 'L6', 'SDE-I', 'SDE-II', 'SDE-III', 'Staff', 'Principal'];

  // Get company filter from URL
  useEffect(() => {
    const companyParam = searchParams.get('company');
    if (companyParam) {
      setSelectedCompany(companyParam);
    }
  }, [searchParams]);

  useEffect(() => {
    fetch('/api/salaries')
      .then(res => res.json())
      .then(data => {
        const salaryData = data.data || [];
        setSalaries(salaryData);
        // Get unique companies - FIX: properly type the data
        const uniqueCompanies: string[] = [];
        salaryData.forEach((s: any) => {
          if (s.company?.name && !uniqueCompanies.includes(s.company.name)) {
            uniqueCompanies.push(s.company.name);
          }
        });
        setCompanies(uniqueCompanies);
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
    const matchesSearch = (s.company?.name?.toLowerCase() || '').includes(searchLower) ||
                         (s.role?.toLowerCase() || '').includes(searchLower);
    const matchesLevel = selectedLevel === 'all' || s.level === selectedLevel;
    const matchesCompany = selectedCompany === 'all' || s.company?.name === selectedCompany;
    return matchesSearch && matchesLevel && matchesCompany;
  });

  if (loading) {
    return (
      <div className="container-custom py-8">
        <div className="text-center py-12 text-[#484848]">Loading salaries...</div>
      </div>
    );
  }

  return (
    <main className="container-custom py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#222222]">Software Engineer Salaries</h1>
        <p className="text-[#717171] mt-1">{salaries.length} salary records</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search companies or roles..."
          className="search-input flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        
        <select
          className="select-primary"
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
        >
          <option value="all">All Companies</option>
          {companies.map((company) => (
            <option key={company} value={company}>{company}</option>
          ))}
        </select>

        <select
          className="select-primary"
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
        >
          <option value="all">All Levels</option>
          {levels.map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
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
                  <td className="font-semibold text-[#222222]">{salary.company?.name || 'Unknown'}</td>
                  <td className="text-[#484848]">{salary.role}</td>
                  <td>
                    <span className={`badge ${getLevelClass(salary.level)}`}>
                      {salary.level}
                    </span>
                  </td>
                  <td className="text-[#484848]">{salary.location}</td>
                  <td className="text-right font-medium text-[#222222]">{formatCurrency(Number(salary.baseSalary))}</td>
                  <td className="text-right text-[#717171]">
                    {Number(salary.stock) > 0 ? formatCurrency(Number(salary.stock)) : '—'}
                  </td>
                  <td className="text-right">
                    <span className="text-lg font-bold text-[#FF5A5F]">
                      {formatCurrency(Number(salary.totalCompensation))}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-[#EBEBEB] bg-[#F7F7F7] rounded-b-xl">
          <div className="text-sm text-[#717171] text-center">
            Showing <span className="font-medium text-[#222222]">{filteredSalaries.length}</span> records
          </div>
        </div>
      </div>
    </main>
  );
}

export default function SalariesPage() {
  return (
    <Suspense fallback={<div className="container-custom py-8"><div className="text-center py-12 text-[#484848]">Loading...</div></div>}>
      <SalariesContent />
    </Suspense>
  );
}