import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';

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
        {/* Company Header */}
        <div className="card p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#222222]">{company.name}</h1>
              {company.industry && <p className="text-[#484848] mt-1">{company.industry}</p>}
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-[#717171]">
                {company.headquarters && <span>📍 {company.headquarters}</span>}
                {company.foundedYear && <span>Founded {company.foundedYear}</span>}
                {company.headcountRange && <span>👥 {company.headcountRange}</span>}
              </div>
            </div>
            <Link href={`/salaries?company=${encodeURIComponent(company.name)}`} className="btn-primary">
              View All Salaries
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="stat-card">
            <div className="stat-label">Median Total Comp</div>
            <div className="stat-value text-[#FF5A5F]">{formatCurrency(median)}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Total Records</div>
            <div className="stat-value">{company.salaries.length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Levels Available</div>
            <div className="stat-value">{Object.keys(distribution).length}</div>
          </div>
        </div>

        {/* Level Distribution - Coral Red theme */}
        {company.salaries.length > 0 && (
          <div className="card p-6 mb-6">
            <h3 className="font-semibold text-[#222222] mb-3">Level Distribution</h3>
            <div className="flex h-6 rounded-lg overflow-hidden">
              {Object.entries(distribution).map(([level, count]) => {
                const pct = (count / company.salaries.length) * 100;
                const bgColors: Record<string, string> = {
                  'L3': 'bg-gray-300',
                  'L4': 'bg-blue-300',
                  'L5': 'bg-indigo-300',
                  'L6': 'bg-purple-300',
                  'SDE-I': 'bg-gray-300',
                  'SDE-II': 'bg-blue-300',
                  'SDE-III': 'bg-indigo-300',
                  'Staff': 'bg-purple-400',
                  'Principal': 'bg-gray-700',
                };
                return (
                  <div 
                    key={level} 
                    className={`${bgColors[level] || 'bg-gray-300'} h-full transition-all`} 
                    style={{ width: `${pct}%` }}
                    title={`${level}: ${count} records (${pct.toFixed(1)}%)`}
                  />
                );
              })}
            </div>
            <div className="flex flex-wrap gap-3 mt-3">
              {Object.entries(distribution).map(([level, count]) => (
                <span key={level} className="text-xs text-[#717171]">
                  {level} ({count})
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Salary List - Coral Red theme */}
        {company.salaries.length > 0 && (
          <div className="card overflow-hidden">
            <div className="p-4 border-b border-[#EBEBEB] bg-[#FFF5F5]">
              <h3 className="font-semibold text-[#222222]">Salary List</h3>
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
                      <td className="font-medium text-[#222222]">{s.role}</td>
                      <td>
                        <span className={`badge ${getLevelClass(s.level)}`}>
                          {s.level}
                        </span>
                      </td>
                      <td className="text-[#484848]">{s.location}</td>
                      <td className="text-right font-bold text-[#FF5A5F]">
                        {formatCurrency(Number(s.totalCompensation))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 border-t border-[#EBEBEB] bg-[#F7F7F7] rounded-b-xl">
              <Link 
                href={`/salaries?company=${encodeURIComponent(company.name)}`}
                className="text-sm text-[#FF5A5F] font-medium hover:underline"
              >
                View all {company.salaries.length} salaries →
              </Link>
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