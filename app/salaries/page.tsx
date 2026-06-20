'use client';

import { useState, useEffect } from 'react';

export default function SalariesPage() {
  const [salaries, setSalaries] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    level: '',
    location: '',
    experienceYears: '',
    currency: 'INR',
    baseSalary: '',
    bonus: '',
    stock: '',
  });

  const levels = ['L3', 'L4', 'L5', 'L6', 'SDE-I', 'SDE-II', 'SDE-III', 'Staff', 'Principal'];
  const currencies = ['INR', 'USD', 'GBP', 'EUR'];
  const locations = ['Bengaluru', 'Mumbai', 'Hyderabad', 'Delhi', 'Pune', 'Chennai', 'Remote'];

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      company: formData.company,
      role: formData.role,
      level: formData.level,
      location: formData.location,
      currency: formData.currency,
      experienceYears: parseInt(formData.experienceYears),
      baseSalary: parseInt(formData.baseSalary),
      bonus: parseInt(formData.bonus) || 0,
      stock: parseInt(formData.stock) || 0,
      confidenceScore: 0.9,
      source: 'CONTRIBUTOR',
      isVerified: false,
    };

    try {
      const response = await fetch('/api/ingest-salary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('✅ Salary submitted successfully! Thank you for contributing.');
        setShowModal(false);
        // Reset form
        setFormData({
          company: '',
          role: '',
          level: '',
          location: '',
          experienceYears: '',
          currency: 'INR',
          baseSalary: '',
          bonus: '',
          stock: '',
        });
        // Refresh data
        const refreshRes = await fetch('/api/salaries');
        const refreshData = await refreshRes.json();
        setSalaries(refreshData.data || []);
      } else {
        const error = await response.json();
        alert(`❌ Error: ${error.message || 'Failed to submit salary'}`);
      }
    } catch (error) {
      alert('❌ Error submitting salary. Please try again.');
    }
  };

  const filteredSalaries = salaries.filter(s => {
    const searchLower = search.toLowerCase();
    const matchesSearch = (s.company?.name?.toLowerCase() || '').includes(searchLower) ||
                         (s.role?.toLowerCase() || '').includes(searchLower);
    const matchesLevel = selectedLevel === 'all' || s.level === selectedLevel;
    return matchesSearch && matchesLevel;
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
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#222222]">Software Engineer Salaries</h1>
          <p className="text-[#717171] mt-1">{salaries.length} salary records</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#FF5A5F] hover:bg-[#E04A4F] text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-sm hover:shadow-md"
        >
          + Contribute Salary
        </button>
      </div>

      {/* Search and Level Filter */}
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

      {/* Contribute Salary Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#222222]">Contribute a Salary</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-[#717171] hover:text-[#222222] text-2xl"
              >
                ×
              </button>
            </div>
            
            <p className="text-[#484848] mb-6">
              Help others negotiate better by anonymously sharing your compensation data.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#484848] mb-1">
                    Company Name <span className="text-[#FF5A5F]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Google, Amazon"
                    className="w-full px-4 py-2 border border-[#EBEBEB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#484848] mb-1">
                    Job Title / Role <span className="text-[#FF5A5F]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Software Engineer"
                    className="w-full px-4 py-2 border border-[#EBEBEB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#484848] mb-1">
                    Level <span className="text-[#FF5A5F]">*</span>
                  </label>
                  <select
                    required
                    className="w-full px-4 py-2 border border-[#EBEBEB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]"
                    value={formData.level}
                    onChange={(e) => setFormData({...formData, level: e.target.value})}
                  >
                    <option value="">Select level...</option>
                    {levels.map((level) => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#484848] mb-1">
                    Location (City) <span className="text-[#FF5A5F]">*</span>
                  </label>
                  <select
                    required
                    className="w-full px-4 py-2 border border-[#EBEBEB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                  >
                    <option value="">Select location...</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#484848] mb-1">
                    Total Experience (Years) <span className="text-[#FF5A5F]">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    max="50"
                    placeholder="e.g. 5"
                    className="w-full px-4 py-2 border border-[#EBEBEB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]"
                    value={formData.experienceYears}
                    onChange={(e) => setFormData({...formData, experienceYears: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#484848] mb-1">
                    Currency <span className="text-[#FF5A5F]">*</span>
                  </label>
                  <select
                    required
                    className="w-full px-4 py-2 border border-[#EBEBEB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]"
                    value={formData.currency}
                    onChange={(e) => setFormData({...formData, currency: e.target.value})}
                  >
                    {currencies.map((cur) => (
                      <option key={cur} value={cur}>{cur}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#484848] mb-1">
                    Base Salary <span className="text-[#FF5A5F]">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    placeholder="e.g. 4000000 for 40 Lakhs"
                    className="w-full px-4 py-2 border border-[#EBEBEB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]"
                    value={formData.baseSalary}
                    onChange={(e) => setFormData({...formData, baseSalary: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#484848] mb-1">Yearly Bonus</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    className="w-full px-4 py-2 border border-[#EBEBEB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]"
                    value={formData.bonus}
                    onChange={(e) => setFormData({...formData, bonus: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#484848] mb-1">Yearly Stock / RSU</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    className="w-full px-4 py-2 border border-[#EBEBEB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]"
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                  />
                </div>
              </div>

              <div className="bg-[#FFF5F5] p-3 rounded-lg text-sm text-[#484848]">
                <p>💡 Total Compensation is calculated automatically (Base + Bonus + Stock).</p>
                <p className="mt-1">For INR, enter the exact amount (e.g. 4000000 for 40 Lakhs).</p>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#FF5A5F] hover:bg-[#E04A4F] text-white py-3 rounded-xl font-semibold transition-all"
                >
                  Submit Salary
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 border border-[#EBEBEB] hover:bg-[#F7F7F7] text-[#484848] py-3 rounded-xl font-semibold transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}