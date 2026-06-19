export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  try {
    const companies = await prisma.company.findMany({
      select: { slug: true },
    });
    return companies.map((company) => ({
      slug: company.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function CompanyPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  
  try {
    const company = await prisma.company.findUnique({
      where: { slug: slug },
      include: {
        salaries: {
          orderBy: { totalCompensation: 'desc' },
        },
      },
    });

    if (!company) {
      notFound();
    }

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

    // Calculate median
    const values = company.salaries.map(s => Number(s.totalCompensation)).sort((a, b) => a - b);
    let median = 0;
    if (values.length > 0) {
      const mid = Math.floor(values.length / 2);
      median = values.length % 2 === 0 ? (values[mid - 1] + values[mid]) / 2 : values[mid];
    }

    // Level distribution
    const distribution: Record<string, number> = {};
    for (const s of company.salaries) {
      distribution[s.level] = (distribution[s.level] || 0) + 1;
    }

    return (
      <main className="container-custom py-8">
        {/* Company Header - Green theme */}
        <div className="card p-6 mb-6 border-green-100">
          <h1 className="text-3xl font-bold text-[#1F2937]">{company.name}</h1>
          {company.industry && <p className="text-gray-600 mt-1">{company.industry}</p>}
          <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
            {company.headquarters && <span>📍 {company.headquarters}</span>}
            {company.foundedYear && <span>Founded {company.foundedYear}</span>}
            {company.headcountRange && <span>👥 {company.headcountRange}</span>}
          </div>
        </div>

        {/* Stats - Green theme */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="stat-card border-green-100">
            <div className="stat-label">Median Total Comp</div>
            <div className="stat-value text-green-600">{formatCurrency(median)}</div>
          </div>
          <div className="stat-card border-green-100">
            <div className="stat-label">Total Records</div>
            <div className="stat-value">{company.salaries.length}</div>
          </div>
          <div className="stat-card border-green-100">
            <div className="stat-label">Levels Available</div>
            <div className="stat-value">{Object.keys(distribution).length}</div>
          </div>
        </div>

        {/* Level Distribution - Green theme */}
        {company.salaries.length > 0 && (
          <div className="card p-6 mb-6 border-green-100">
            <h3 className="font-semibold mb-3">Level Distribution</h3>
            <div className="flex h-6 rounded-lg overflow-hidden">
              {Object.entries(distribution).map(([level, count]) => {
                const pct = (count / company.salaries.length) * 100;
                const bgColors: Record<string, string> = {
                  'L3': 'bg-green-200',
                  'L4': 'bg-green-300',
                  'L5': 'bg-green-400',
                  'L6': 'bg-green-500',
                  'SDE-I': 'bg-green-200',
                  'SDE-II': 'bg-green-300',
                  'SDE-III': 'bg-green-400',
                  'Staff': 'bg-green-500',
                  'Principal': 'bg-green-700',
                };
                return (
                  <div 
                    key={level} 
                    className={`${bgColors[level] || 'bg-green-300'} h-full transition-all`} 
                    style={{ width: `${pct}%` }}
                    title={`${level}: ${count} records (${pct.toFixed(1)}%)`}
                  />
                );
              })}
            </div>
            <div className="flex flex-wrap gap-3 mt-3">
              {Object.entries(distribution).map(([level, count]) => (
                <span key={level} className="text-xs text-gray-600">
                  {level} ({count})
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Salary List - Green theme */}
        {company.salaries.length > 0 && (
          <div className="card overflow-hidden border-green-100">
            <div className="p-4 border-b border-green-100 bg-green-50/30">
              <h3 className="font-semibold">Salary List</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="table-modern">
                <thead>
                  <tr>
                    <th>Role</th>
                    <th>Level</th>
                    <th>Location</th>
                    <th className="text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {company.salaries.slice(0, 10).map((s) => (
                    <tr key={s.id}>
                      <td className="font-medium">{s.role}</td>
                      <td>
                        <span className={`badge ${getLevelClass(s.level)}`}>
                          {s.level}
                        </span>
                      </td>
                      <td className="text-gray-600">{s.location}</td>
                      <td className="text-right font-bold text-green-600">
                        {formatCurrency(Number(s.totalCompensation))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    );
  } catch (error) {
    console.error('Error in CompanyPage:', error);
    notFound();
  }
}