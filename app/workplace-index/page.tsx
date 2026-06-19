import { prisma } from '@/lib/prisma';

export default async function WorkplaceIndexPage() {
  const companies = await prisma.company.findMany({
    include: {
      salaries: true,
    },
  });

  // Generate mock scores
  const scoredCompanies = companies.map((company) => {
    const culture = Math.floor(Math.random() * 3) + 3;
    const compensation = Math.floor(Math.random() * 3) + 3;
    const growth = Math.floor(Math.random() * 3) + 3;
    const diversity = Math.floor(Math.random() * 3) + 3;
    const wfh = Math.floor(Math.random() * 3) + 3;
    const total = culture + compensation + growth + diversity + wfh;
    
    return {
      ...company,
      scores: { culture, compensation, growth, diversity, wfh },
      total,
    };
  });

  const sortedCompanies = scoredCompanies.sort((a, b) => b.total - a.total);

  return (
    <main className="container-custom py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1F2937]">Workplace Index</h1>
        <p className="text-gray-600 mt-1">Ranking companies on culture, compensation, growth, diversity, and WFH</p>
      </div>

      <div className="card overflow-hidden border-green-100">
        <div className="overflow-x-auto">
          <table className="table-modern">
            <thead>
              <tr>
                <th>#</th>
                <th>Company</th>
                <th className="text-center">Culture</th>
                <th className="text-center">Compensation</th>
                <th className="text-center">Growth</th>
                <th className="text-center">D&I</th>
                <th className="text-center">WFH</th>
                <th className="text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {sortedCompanies.map((company, index) => (
                <tr key={company.id} className={index < 3 ? 'bg-green-50' : ''}>
                  <td className="font-bold">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                  </td>
                  <td className="font-semibold">{company.name}</td>
                  <td className="text-center">{'⭐'.repeat(company.scores.culture)}</td>
                  <td className="text-center">{'⭐'.repeat(company.scores.compensation)}</td>
                  <td className="text-center">{'⭐'.repeat(company.scores.growth)}</td>
                  <td className="text-center">{'⭐'.repeat(company.scores.diversity)}</td>
                  <td className="text-center">{'⭐'.repeat(company.scores.wfh)}</td>
                  <td className="text-right font-bold text-green-600">{company.total}/25</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}