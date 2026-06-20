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
        <h1 className="text-3xl font-bold text-[#222222]">Companies</h1>
        <p className="text-[#717171] mt-1">{companies.length} companies found</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {companies.map((company) => {
          const avgSalary = company.salaries.length > 0
            ? company.salaries.reduce((acc, s) => acc + Number(s.totalCompensation), 0) / company.salaries.length
            : 0;

          // Get company salaries for the button
          const companySalaries = company.salaries.map(s => ({
            role: s.role,
            level: s.level,
            location: s.location,
            totalCompensation: Number(s.totalCompensation)
          }));

          return (
            <div key={company.id} className="card p-6 hover:shadow-lg transition-all">
              <h2 className="text-lg font-semibold text-[#222222] hover:text-[#FF5A5F] transition-colors">
                {company.name}
              </h2>
              {company.industry && (
                <p className="text-sm text-[#484848] mt-1">{company.industry}</p>
              )}
              <div className="mt-3 flex justify-between items-center">
                <span className="text-sm text-[#717171]">
                  {company.salaries.length} salaries
                </span>
                {company.salaries.length > 0 && (
                  <span className="text-sm font-semibold text-[#FF5A5F]">
                    ₹{(avgSalary / 100000).toFixed(1)}L avg
                  </span>
                )}
              </div>
              <div className="mt-4 flex gap-3">
                <Link
                  href={`/companies/${company.slug}`}
                  className="flex-1 text-center px-4 py-2 bg-[#FF5A5F] text-white rounded-lg text-sm font-medium hover:bg-[#E04A4F] transition-all"
                >
                  View
                </Link>
                <Link
                  href={`/salaries?company=${encodeURIComponent(company.name)}`}
                  className="flex-1 text-center px-4 py-2 border border-[#EBEBEB] text-[#222222] rounded-lg text-sm font-medium hover:border-[#FF5A5F] hover:text-[#FF5A5F] transition-all"
                >
                  Salaries
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}