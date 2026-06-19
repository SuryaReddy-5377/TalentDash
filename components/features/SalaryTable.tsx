// components/features/SalaryTable.tsx
'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Salary, Level, Currency } from '@/types';
import { LevelBadge } from '@/components/ui/LevelBadge';
import { formatCurrency, formatExperience } from '@/lib/utils';

interface SalaryTableProps {
  initialData: Salary[];
  initialTotal?: number;
}

const LEVELS = Object.values(Level);
const CURRENCIES = [Currency.INR, Currency.USD];

export function SalaryTable({ initialData, initialTotal = 0 }: SalaryTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Filter states from URL
  const [companyFilter, setCompanyFilter] = useState(searchParams.get('company') || '');
  const [roleFilter, setRoleFilter] = useState(searchParams.get('role') || '');
  const [levelFilters, setLevelFilters] = useState<Level[]>(
    searchParams.get('level')?.split(',') as Level[] || []
  );
  const [locationFilter, setLocationFilter] = useState(searchParams.get('location') || '');
  const [currency, setCurrency] = useState<Currency>(
    (searchParams.get('currency') as Currency) || Currency.INR
  );
  const [sortBy, setSortBy] = useState<keyof Salary>('totalCompensation');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1'));
  const [debouncedCompany, setDebouncedCompany] = useState(companyFilter);
  const [debouncedRole, setDebouncedRole] = useState(roleFilter);
  
  const itemsPerPage = 25;

  // Debounce company and role filters
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedCompany(companyFilter);
    }, 300);
    return () => clearTimeout(timer);
  }, [companyFilter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedRole(roleFilter);
    }, 300);
    return () => clearTimeout(timer);
  }, [roleFilter]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedCompany) params.set('company', debouncedCompany);
    if (debouncedRole) params.set('role', debouncedRole);
    if (levelFilters.length > 0) params.set('level', levelFilters.join(','));
    if (locationFilter) params.set('location', locationFilter);
    if (currency) params.set('currency', currency);
    if (currentPage > 1) params.set('page', String(currentPage));
    
    const url = `/salaries${params.toString() ? `?${params.toString()}` : ''}`;
    router.push(url, { scroll: false });
  }, [debouncedCompany, debouncedRole, levelFilters, locationFilter, currency, currentPage, router]);

  // Filter and sort data
  const filteredData = useMemo(() => {
    let data = [...initialData];

    // Company filter
    if (debouncedCompany) {
      data = data.filter(s => 
        s.company?.name.toLowerCase().includes(debouncedCompany.toLowerCase())
      );
    }

    // Role filter
    if (debouncedRole) {
      data = data.filter(s => 
        s.role.toLowerCase().includes(debouncedRole.toLowerCase())
      );
    }

    // Level filter
    if (levelFilters.length > 0) {
      data = data.filter(s => levelFilters.includes(s.level));
    }

    // Location filter
    if (locationFilter) {
      data = data.filter(s => 
        s.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    // Sort
    data.sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortOrder === 'desc' ? bVal - aVal : aVal - bVal;
      }
      
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortOrder === 'desc' 
          ? bVal.localeCompare(aVal) 
          : aVal.localeCompare(bVal);
      }
      
      return 0;
    });

    return data;
  }, [initialData, debouncedCompany, debouncedRole, levelFilters, locationFilter, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Get unique locations for filter dropdown
  const uniqueLocations = useMemo(() => {
    const locations = new Set(initialData.map(s => s.location));
    return Array.from(locations).sort();
  }, [initialData]);

  // Handle sort click
  const handleSort = (column: keyof Salary) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  // Toggle level filter
  const toggleLevel = (level: Level) => {
    if (levelFilters.includes(level)) {
      setLevelFilters(levelFilters.filter(l => l !== level));
    } else {
      setLevelFilters([...levelFilters, level]);
    }
    setCurrentPage(1);
  };

  // Get sort icon
  const getSortIcon = (column: keyof Salary) => {
    if (sortBy !== column) return '↕';
    return sortOrder === 'desc' ? '↓' : '↑';
  };

  return (
    <div className="space-y-4">
      {/* Filter Bar */}
      <div className="flex flex-wrap gap-4 p-4 bg-white rounded-lg shadow-sm border">
        <div className="flex-1 min-w-[150px]">
          <input
            type="text"
            placeholder="Search Company..."
            value={companyFilter}
            onChange={(e) => {
              setCompanyFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]"
          />
        </div>
        
        <div className="flex-1 min-w-[150px]">
          <input
            type="text"
            placeholder="Search Role..."
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]"
          />
        </div>

        <div className="flex-1 min-w-[150px]">
          <select
            value={locationFilter}
            onChange={(e) => {
              setLocationFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]"
          >
            <option value="">All Locations</option>
            {uniqueLocations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[150px]">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as Currency)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]"
          >
            {CURRENCIES.map(curr => (
              <option key={curr} value={curr}>{curr}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Level Filters */}
      <div className="flex flex-wrap gap-2 p-4 bg-white rounded-lg shadow-sm border">
        <span className="text-sm font-medium text-gray-600 mr-2">Level:</span>
        {LEVELS.map(level => (
          <button
            key={level}
            onClick={() => toggleLevel(level)}
            className={`px-3 py-1 text-xs rounded-full border transition-colors ${
              levelFilters.includes(level)
                ? 'bg-[#FF5A5F] text-white border-[#FF5A5F]'
                : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
            }`}
          >
            {level}
          </button>
        ))}
        {levelFilters.length > 0 && (
          <button
            onClick={() => setLevelFilters([])}
            className="px-3 py-1 text-xs text-[#FF5A5F] hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {filteredData.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}–
        {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} records
      </div>

      {/* Table */}
      {filteredData.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border">
          <p className="text-gray-600">No records found for these filters.</p>
          <button
            onClick={() => {
              setCompanyFilter('');
              setRoleFilter('');
              setLevelFilters([]);
              setLocationFilter('');
              setCurrentPage(1);
            }}
            className="mt-2 text-[#FF5A5F] hover:underline"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto bg-white rounded-lg shadow-sm border">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th 
                    className="px-4 py-3 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:text-gray-900"
                    onClick={() => handleSort('companyId')}
                  >
                    Company {getSortIcon('companyId')}
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:text-gray-900"
                    onClick={() => handleSort('role')}
                  >
                    Role {getSortIcon('role')}
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-sm font-semibold text-gray-600"
                  >
                    Level
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:text-gray-900"
                    onClick={() => handleSort('location')}
                  >
                    Location {getSortIcon('location')}
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:text-gray-900"
                    onClick={() => handleSort('experienceYears')}
                  >
                    Experience {getSortIcon('experienceYears')}
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:text-gray-900"
                    onClick={() => handleSort('baseSalary')}
                  >
                    Base {getSortIcon('baseSalary')}
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:text-gray-900"
                    onClick={() => handleSort('stock')}
                  >
                    Stock {getSortIcon('stock')}
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-sm font-semibold text-[#0369A1] cursor-pointer hover:text-[#0284C7]"
                    onClick={() => handleSort('totalCompensation')}
                  >
                    Total Comp {getSortIcon('totalCompensation')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((salary) => (
                  <tr key={salary.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium">
                      {salary.company?.name || 'N/A'}
                    </td>
                    <td className="px-4 py-3 text-sm">{salary.role}</td>
                    <td className="px-4 py-3">
                      <LevelBadge level={salary.level} />
                    </td>
                    <td className="px-4 py-3 text-sm">{salary.location}</td>
                    <td className="px-4 py-3 text-sm">{formatExperience(salary.experienceYears)}</td>
                    <td className="px-4 py-3 text-sm">{formatCurrency(salary.baseSalary, currency)}</td>
                    <td className="px-4 py-3 text-sm">
                      {salary.stock > 0 ? formatCurrency(salary.stock, currency) : '—'}
                    </td>
                    <td className="px-4 py-3 text-lg font-bold text-[#0369A1]">
                      {formatCurrency(salary.totalCompensation, currency)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}