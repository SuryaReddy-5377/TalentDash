import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function ReviewsPage() {
  const companies = await prisma.company.findMany({
    include: {
      salaries: true,
    },
  });

  return (
    <main className="container-custom py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#222222]">Company Reviews</h1>
        <p className="text-[#717171] mt-1">Read anonymous reviews from employees</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {companies.map((company) => {
          const rating = (Math.random() * 2 + 3).toFixed(1);
          return (
            <Link
              key={company.id}
              href={`/reviews/${company.slug}`}
              className="card p-6 hover:shadow-lg transition-all hover:border-[#FF5A5F]"
            >
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-semibold text-[#222222] hover:text-[#FF5A5F] transition-colors">
                  {company.name}
                </h2>
                <span className="text-sm font-bold text-[#FF5A5F] bg-[#FFF5F5] px-3 py-1 rounded-full">
                  ★ {rating}
                </span>
              </div>
              <p className="text-sm text-[#717171] mt-2">
                {company.salaries.length} employees reviewed
              </p>
              <div className="mt-3 flex gap-2">
                <span className="text-xs bg-[#FFF5F5] text-[#FF5A5F] px-2 py-1 rounded">Work-Life Balance</span>
                <span className="text-xs bg-[#FFF5F5] text-[#FF5A5F] px-2 py-1 rounded">Culture</span>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}