'use client';

import { useState } from 'react';
import { LevelBadge } from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/format';

// Make the props more flexible
interface SalaryTableProps {
  initialData: any[]; // Accept any array
}

export function SalaryTable({ initialData }: SalaryTableProps) {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;
  
  // Filter data safely
  const filtered = initialData.filter((s) => {
    const companyName = s.company?.name || s.company?.name || '';
    const role = s.role || '';
    const searchLower = search.toLowerCase();
    return companyName.toLowerCase().includes(searchLower) || 
           role.toLowerCase().includes(searchLower);
  });

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentData = filtered.slice(startIndex, endIndex);

  if (totalItems === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-4xl mb-3">🔍</div>
        <p className="text-gray-500 font-medium">No records found</p>
        <p className="text-sm text-gray-400 mt-1">Try adjusting your search</p>
      </div>
    );
  }

  return (
    <div>
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-100">
        <input
          type="text"
          placeholder="Search companies or roles..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full px-4 py-3 pl-11 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent transition-all bg-white"
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23868e96' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='m21 21-4.35-4.35'/%3E%3C/svg%3E")`, 
            backgroundPosition: '16px center', 
            backgroundRepeat: 'no-repeat', 
            backgroundSize: '20px' 
          }}
        />
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50/80 border-b border-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Company</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Level</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Base</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Comp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {currentData.map((salary) => (
              <tr key={salary.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-3">
                  <span className="font-semibold text-[#222222]">
                    {salary.company?.name || salary.companyName || 'Unknown'}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-700">{salary.role || '-'}</td>
                <td className="px-4 py-3">
                  <LevelBadge level={salary.level || 'L3'} />
                </td>
                <td className="px-4 py-3 text-gray-600">{salary.location || '-'}</td>
                <td className="px-4 py-3 text-right font-medium text-gray-700">
                  {formatCurrency(salary.baseSalary || 0, salary.currency || 'INR')}
                </td>
                <td className="px-4 py-3 text-right text-gray-500">
                  {salary.stock && salary.stock > 0 ? formatCurrency(salary.stock, salary.currency || 'INR') : '—'}
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="text-lg font-bold text-[#0369A1]">
                    {formatCurrency(salary.totalCompensation || 0, salary.currency || 'INR')}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalItems > 0 && (
        <div className="px-4 py-3 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/50 rounded-b-xl">
          <div className="text-sm text-gray-600">
            Showing <span className="font-medium">{startIndex + 1}</span>–<span className="font-medium">{endIndex}</span> of <span className="font-medium">{totalItems}</span> records
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-200 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white hover:border-gray-300 transition-all text-sm font-medium text-gray-700"
            >
              ← Previous
            </button>
            <span className="px-4 py-2 text-sm font-medium text-gray-600 bg-white rounded-lg border border-gray-200">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-200 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white hover:border-gray-300 transition-all text-sm font-medium text-gray-700"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}