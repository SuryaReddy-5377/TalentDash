import { Salary } from '@/types';
import { LevelBadge } from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/format';

interface SalaryRowProps {
  salary: Salary;
}

export function SalaryRow({ salary }: SalaryRowProps) {
  const hasBonus = salary.bonus > 0;
  const hasStock = salary.stock > 0;

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3">
        <span className="font-medium text-[#222222]">
          {salary.company?.name || 'Unknown'}
        </span>
      </td>
      <td className="px-4 py-3 text-gray-700">{salary.role}</td>
      <td className="px-4 py-3">
        <LevelBadge level={salary.level} />
      </td>
      <td className="px-4 py-3 text-gray-600">{salary.location}</td>
      <td className="px-4 py-3 text-gray-600">{salary.experienceYears} yrs</td>
      <td className="px-4 py-3 text-right font-medium">
        {formatCurrency(salary.baseSalary, salary.currency)}
      </td>
      <td className="px-4 py-3 text-right text-gray-600">
        {hasStock ? formatCurrency(salary.stock, salary.currency) : '—'}
      </td>
      <td className="px-4 py-3 text-right">
        <span className="text-lg font-bold text-[#0369A1]">
          {formatCurrency(salary.totalCompensation, salary.currency)}
        </span>
      </td>
    </tr>
  );
}