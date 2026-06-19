import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  try {
    const companies = await prisma.company.findMany({
      select: { slug: true },
    });
    return companies.map((company) => ({
      slug: company.slug,
    }));
  } catch {
    return [];
  }
}

export default async function CompanyPage({ params }: { params: Promise<{ slug: string }> }) {
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

    // Calculate median
    const values = company.salaries.map(s => Number(s.totalCompensation)).sort((a, b) => a - b);
    let median = 0;
    if (values.length > 0) {
      const mid = Math.floor(values.length / 2);
      median = values.length % 2 === 0 ? (values[mid - 1] + values[mid]) / 2 : values[mid];
    }

    return (
      <main className="container-custom py-8">
        <div className="card p-6 mb-6 border-green-100">
          <h1 className="text-3xl font-bold text-[#1F2937]">{company.name}</h1>
          {company.industry && <p className="text-gray-600 mt-1">{company.industry}</p>}
          <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
            {company.headquarters && <span>📍 {company.headquarters}</span>}
            {company.foundedYear && <span>Founded {company.foundedYear}</span>}
            {company.headcountRange && <span>👥 {company.headcountRange}</span>}
          </div>
        </div>

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
            <div className="stat-label">Locations</div>
            <div className="stat-value">{new Set(company.salaries.map(s => s.location)).size}</div>
          </div>
        </div>

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
                        <span className={`badge badge-green`}>{s.level}</span>
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
    console.error('Error:', error);
    notFound();
  }
}