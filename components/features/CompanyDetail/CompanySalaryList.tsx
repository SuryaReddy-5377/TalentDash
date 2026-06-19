import { Salary } from '@/types';
import { LevelBadge } from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/format';

interface CompanySalaryListProps {
  salaries: Salary[];
}

export function CompanySalaryList({ salaries }: CompanySalaryListProps) {
  if (salaries.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg border border-gray-200 text-center">
        <p className="text-gray-500">No salary records available for this company.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Role</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Level</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Location</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Experience</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">Base</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">Bonus</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">Stock</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-[#0369A1]">Total Comp</th>
            </tr>
          </thead>
          <tbody>
            {salaries.map((salary) => (
              <tr key={salary.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-medium text-[#222222]">{salary.role}</td>
                <td className="px-4 py-3">
                  <LevelBadge level={salary.level} />
                </td>
                <td className="px-4 py-3 text-gray-600">{salary.location}</td>
                <td className="px-4 py-3 text-gray-600">{salary.experienceYears}y</td>
                <td className="px-4 py-3 text-right font-medium">
                  {formatCurrency(salary.baseSalary, salary.currency)}
                </td>
                <td className="px-4 py-3 text-right text-gray-600">
                  {salary.bonus > 0 ? formatCurrency(salary.bonus, salary.currency) : '—'}
                </td>
                <td className="px-4 py-3 text-right text-gray-600">
                  {salary.stock > 0 ? formatCurrency(salary.stock, salary.currency) : '—'}
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="text-lg font-bold text-[#0369A1]">
                    {formatCurrency(salary.totalCompensation, salary.currency)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}