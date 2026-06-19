import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ role: string }>;
}

export async function generateStaticParams() {
  try {
    const salaries = await prisma.salary.findMany({
      select: { role: true },
      distinct: ['role'],
      take: 10,
    });
    
    return salaries.map((salary) => ({
      role: encodeURIComponent(salary.role),
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { role } = await params;
  const decodedRole = decodeURIComponent(role);
  return {
    title: `${decodedRole} Salaries in India | TalentDash`,
    description: `Compare ${decodedRole} salaries across top companies in India.`,
  };
}

export default async function SalaryRolePage({ params }: PageProps) {
  const { role } = await params;
  const decodedRole = decodeURIComponent(role);
  
  // Fix: Remove 'mode' option and use contains with Prisma's built-in case sensitivity
  const salaries = await prisma.salary.findMany({
    where: {
      role: {
        contains: decodedRole,
        // mode: 'insensitive' is not supported in this version
      },
    },
    include: {
      company: true,
    },
    orderBy: {
      totalCompensation: 'desc',
    },
    take: 50,
  });

  if (!salaries || salaries.length === 0) {
    notFound();
  }

  const formatCurrency = (amount: number) => {
    if (!amount) return '₹0';
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)} L`;
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <main className="container-custom py-8">
      <h1 className="text-3xl font-bold text-[#1F2937] mb-2">
        {decodedRole} Salaries
      </h1>
      <p className="text-gray-600 mb-6">{salaries.length} records found</p>
      
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table-modern">
            <thead>
              <tr>
                <th>Company</th>
                <th>Level</th>
                <th>Location</th>
                <th className="text-right">Total Comp</th>
              </tr>
            </thead>
            <tbody>
              {salaries.map((salary) => (
                <tr key={salary.id}>
                  <td className="font-semibold">{salary.company?.name || 'Unknown'}</td>
                  <td>
                    <span className="badge badge-green">{salary.level}</span>
                  </td>
                  <td className="text-gray-600">{salary.location}</td>
                  <td className="text-right font-bold text-green-600">
                    {formatCurrency(Number(salary.totalCompensation))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}