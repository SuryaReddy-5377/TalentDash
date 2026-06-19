'use client';

interface CompanyDetailsProps {
  company: any;
  salaries: any[];
  medianTotal: number;
  levelDistribution: Record<string, number>;
}

export function CompanyDetails({ 
  company, 
  salaries, 
  medianTotal, 
  levelDistribution 
}: CompanyDetailsProps) {
  
  const formatCurrency = (amount: number) => {
    if (!amount || amount === 0) return '₹0';
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    }
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)} L`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const getLevelColor = (level: string) => {
    const colors: Record<string, string> = {
      'L3': 'bg-slate-200 text-slate-700',
      'L4': 'bg-blue-200 text-blue-700',
      'L5': 'bg-indigo-200 text-indigo-700',
      'L6': 'bg-purple-200 text-purple-700',
      'SDE-I': 'bg-slate-200 text-slate-700',
      'SDE-II': 'bg-blue-200 text-blue-700',
      'SDE-III': 'bg-indigo-200 text-indigo-700',
      'Staff': 'bg-purple-200 text-purple-700',
      'Principal': 'bg-navy-200 text-navy-700',
      'IC4': 'bg-blue-200 text-blue-700',
      'IC5': 'bg-indigo-200 text-indigo-700',
    };
    return colors[level] || 'bg-gray-200 text-gray-700';
  };

  const totalRecords = salaries?.length || 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#222222] mb-2">{company?.name || 'Company'}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-sm text-gray-500">Median Total Comp</p>
          <p className="text-xl font-bold text-[#0369A1]">
            {totalRecords > 0 ? formatCurrency(medianTotal) : 'N/A'}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-sm text-gray-500">Total Records</p>
          <p className="text-xl font-bold">{totalRecords}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-sm text-gray-500">Levels</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {Object.entries(levelDistribution || {}).map(([level, count]) => (
              <span key={level} className={`px-2 py-0.5 rounded text-xs ${getLevelColor(level)}`}>
                {level}: {count}
              </span>
            ))}
            {Object.keys(levelDistribution || {}).length === 0 && (
              <span className="text-gray-400 text-sm">No data</span>
            )}
          </div>
        </div>
      </div>

      {salaries && salaries.length > 0 ? (
        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left text-sm font-medium text-gray-500">Role</th>
                <th className="p-3 text-left text-sm font-medium text-gray-500">Level</th>
                <th className="p-3 text-left text-sm font-medium text-gray-500">Location</th>
                <th className="p-3 text-left text-sm font-medium text-gray-500">Exp</th>
                <th className="p-3 text-left text-sm font-medium text-gray-500">Base</th>
                <th className="p-3 text-left text-sm font-medium text-gray-500">Stock</th>
                <th className="p-3 text-left text-sm font-medium text-gray-500">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {salaries.map((salary: any) => (
                <tr key={salary.id} className="hover:bg-gray-50">
                  <td className="p-3 text-sm">{salary.role}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(salary.level)}`}>
                      {salary.level}
                    </span>
                  </td>
                  <td className="p-3 text-sm">{salary.location}</td>
                  <td className="p-3 text-sm">{salary.experienceYears}y</td>
                  <td className="p-3 text-sm">{formatCurrency(salary.baseSalary)}</td>
                  <td className="p-3 text-sm">{salary.stock ? formatCurrency(salary.stock) : '—'}</td>
                  <td className="p-3 text-sm font-bold text-[#0369A1]">
                    {formatCurrency(salary.totalCompensation)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          No salary records found for this company
        </div>
      )}
    </div>
  );
}