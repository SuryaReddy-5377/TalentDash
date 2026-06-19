'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Level } from '@/types';

interface SalaryFiltersProps {
  onFilter: (filters: any) => void;
}

const LEVELS = ['L3', 'L4', 'L5', 'L6', 'SDE-I', 'SDE-II', 'SDE-III', 'Staff', 'Principal'];

export function SalaryFilters({ onFilter }: SalaryFiltersProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [company, setCompany] = useState(searchParams.get('company') || '');
  const [role, setRole] = useState(searchParams.get('role') || '');
  const [selectedLevels, setSelectedLevels] = useState<string[]>(
    searchParams.get('level')?.split(',') || []
  );
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [currency, setCurrency] = useState(searchParams.get('currency') || 'INR');

  // Debounce filter changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const filters = {
        company: company.trim(),
        role: role.trim(),
        levels: selectedLevels,
        location: location.trim(),
        currency,
      };
      
      onFilter(filters);
      
      // Update URL
      const params = new URLSearchParams();
      if (company) params.set('company', company);
      if (role) params.set('role', role);
      if (selectedLevels.length > 0) params.set('level', selectedLevels.join(','));
      if (location) params.set('location', location);
      if (currency !== 'INR') params.set('currency', currency);
      
      router.replace(`/salaries?${params.toString()}`);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [company, role, selectedLevels, location, currency, onFilter, router]);

  const toggleLevel = (level: string) => {
    setSelectedLevels(prev =>
      prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  return (
    <div className="p-4 border-b border-gray-200 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Search company..."
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent"
        />
        <input
          type="text"
          placeholder="Search role..."
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent"
        />
        <input
          type="text"
          placeholder="Location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent"
        />
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent"
        >
          <option value="INR">INR</option>
          <option value="USD">USD</option>
          <option value="GBP">GBP</option>
          <option value="EUR">EUR</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-gray-600 font-medium mr-2">Level:</span>
        {LEVELS.map((level) => (
          <button
            key={level}
            onClick={() => toggleLevel(level)}
            className={`px-3 py-1 text-sm rounded-full border transition-colors ${
              selectedLevels.includes(level)
                ? 'bg-[#FF5A5F] text-white border-[#FF5A5F]'
                : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
            }`}
          >
            {level}
          </button>
        ))}
        {selectedLevels.length > 0 && (
          <button
            onClick={() => setSelectedLevels([])}
            className="px-3 py-1 text-sm text-[#FF5A5F] hover:underline"
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}