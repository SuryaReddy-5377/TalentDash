'use client';

interface CompareViewProps {
  record1: any;
  record2: any;
}

export function CompareView({ record1, record2 }: CompareViewProps) {
  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    }
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)} L`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const getDeltaColor = (delta: number) => {
    if (delta > 0) return 'text-green-600';
    if (delta < 0) return 'text-red-600';
    return 'text-gray-500';
  };

  const formatDelta = (delta: number) => {
    const prefix = delta > 0 ? '+' : '';
    return `${prefix}${formatCurrency(Math.abs(delta))}`;
  };

  // Helper function to safely get nested value
  const getValue = (record: any, field: string) => {
    if (field === 'company') return record.company?.name || 'N/A';
    if (field === 'role') return record.role || 'N/A';
    if (field === 'level') return record.level || 'N/A';
    if (field === 'location') return record.location || 'N/A';
    if (field === 'experienceYears') return `${record.experienceYears || 0} years`;
    if (field === 'baseSalary' || field === 'bonus' || field === 'stock' || field === 'totalCompensation') {
      return formatCurrency(record[field] || 0);
    }
    return record[field] || 'N/A';
  };

  const fields = [
    { key: 'company', label: 'Company' },
    { key: 'role', label: 'Role' },
    { key: 'level', label: 'Level' },
    { key: 'location', label: 'Location' },
    { key: 'experienceYears', label: 'Experience' },
    { key: 'baseSalary', label: 'Base Salary' },
    { key: 'bonus', label: 'Bonus' },
    { key: 'stock', label: 'Stock' },
    { key: 'totalCompensation', label: 'Total Compensation' },
  ];

  const tc1 = Number(record1?.totalCompensation || 0);
  const tc2 = Number(record2?.totalCompensation || 0);
  const tcDelta = tc1 - tc2;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Winner Badge */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Comparison</h2>
        {tcDelta > 0 ? (
          <span className="px-3 py-1 bg-[#0369A1] text-white text-sm font-medium rounded-full">
            📈 Record 1 pays more
          </span>
        ) : tcDelta < 0 ? (
          <span className="px-3 py-1 bg-[#0369A1] text-white text-sm font-medium rounded-full">
            📈 Record 2 pays more
          </span>
        ) : (
          <span className="px-3 py-1 bg-gray-500 text-white text-sm font-medium rounded-full">
            Equal pay
          </span>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Field
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Record 1
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Record 2
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Delta
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {fields.map((field) => {
              const val1 = getValue(record1, field.key);
              const val2 = getValue(record2, field.key);
              
              // Calculate delta for numeric fields
              let delta: number | null = null;
              let deltaDisplay: string | null = null;
              
              if (['baseSalary', 'bonus', 'stock', 'totalCompensation'].includes(field.key)) {
                const num1 = Number(record1?.[field.key] || 0);
                const num2 = Number(record2?.[field.key] || 0);
                delta = num1 - num2;
                if (delta !== 0) {
                  deltaDisplay = formatDelta(delta);
                }
              }

              return (
                <tr key={field.key} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-700">
                    {field.label}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {field.key === 'totalCompensation' ? (
                      <span className="font-bold text-[#0369A1] text-lg">{val1}</span>
                    ) : (
                      val1
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {field.key === 'totalCompensation' ? (
                      <span className="font-bold text-[#0369A1] text-lg">{val2}</span>
                    ) : (
                      val2
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {deltaDisplay && delta !== null ? (
                      <span className={`font-medium ${getDeltaColor(delta)}`}>
                        {deltaDisplay}
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}