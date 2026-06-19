import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function CompaniesPage() {
  const companies = await prisma.company.findMany({
    include: {
      salaries: true,
    },
  });

  return (
    <main className="container-custom py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1F2937]">Companies</h1>
        <p className="text-gray-600 mt-1">{companies.length} companies found</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {companies.map((company) => (
          <Link
            key={company.id}
            href={`/companies/${company.slug}`}
            className="card p-6 hover:shadow-lg transition-all group"
          >
            <h2 className="text-lg font-semibold text-[#1F2937] group-hover:text-[#10B981] transition-colors">
              {company.name}
            </h2>
            {company.industry && (
              <p className="text-sm text-gray-600 mt-1">{company.industry}</p>
            )}
            <div className="mt-3 flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {company.salaries.length} salaries
              </span>
              <span className="text-green-600 text-sm font-medium">View →</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}