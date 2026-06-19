import { Salary, Currency } from '@/types';
import { formatCurrency } from '@/lib/format';

interface CompanyStatsProps {
  salaries: any[]; // Use any[] temporarily to handle both Prisma and frontend types
  medianTotal: number;
  levelDistribution: Record<string, number>;
}

export function CompanyStats({ salaries, medianTotal, levelDistribution }: CompanyStatsProps) {
  const totalRecords = salaries.length;
  
  // Calculate min and max TC
  const tcValues = salaries.map(s => Number(s.totalCompensation));
  const minTC = tcValues.length > 0 ? Math.min(...tcValues) : 0;
  const maxTC = tcValues.length > 0 ? Math.max(...tcValues) : 0;
  
  // Find the most common level
  let mostCommonLevel = 'N/A';
  let maxCount = 0;
  for (const [level, count] of Object.entries(levelDistribution)) {
    if (count > maxCount) {
      maxCount = count;
      mostCommonLevel = level;
    }
  }

  // Get currency from first salary, fallback to INR
  // Handle both string and enum types
  const currency = salaries.length > 0 ? (salaries[0].currency as Currency) : Currency.INR;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <p className="text-sm text-gray-500 mb-1">Median Total Comp</p>
        <p className="text-2xl font-bold text-[#0369A1]">
          {medianTotal > 0 ? formatCurrency(medianTotal, currency) : '—'}
        </p>
      </div>
      
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <p className="text-sm text-gray-500 mb-1">Total Records</p>
        <p className="text-2xl font-bold text-[#222222]">{totalRecords}</p>
      </div>
      
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <p className="text-sm text-gray-500 mb-1">Most Common Level</p>
        <p className="text-2xl font-bold text-[#222222]">{mostCommonLevel}</p>
      </div>
      
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <p className="text-sm text-gray-500 mb-1">Compensation Range</p>
        <p className="text-lg font-semibold text-[#222222]">
          {minTC > 0 ? formatCurrency(minTC, currency) : '—'}
          <span className="text-sm text-gray-400 mx-1">to</span>
          {maxTC > 0 ? formatCurrency(maxTC, currency) : '—'}
        </p>
      </div>
    </div>
  );
}