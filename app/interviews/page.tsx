import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function InterviewsPage() {
  const companies = await prisma.company.findMany({
    include: {
      salaries: true,
    },
  });

  const difficultyLevels = ['Easy', 'Medium', 'Hard', 'Very Hard'];
  const difficultyColors: Record<string, string> = {
    'Easy': 'difficulty-easy',
    'Medium': 'difficulty-medium',
    'Hard': 'difficulty-hard',
    'Very Hard': 'difficulty-very-hard',
  };

  return (
    <main className="container-custom py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#222222]">Interview Experiences</h1>
        <p className="text-[#717171] mt-1">Learn from real interview experiences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {companies.slice(0, 6).map((company, index) => {
          const difficulty = difficultyLevels[Math.floor(Math.random() * difficultyLevels.length)];
          const rounds = Math.floor(Math.random() * 3) + 3;
          const rating = (Math.random() * 2 + 3).toFixed(1);
          
          return (
            <Link
              key={company.id}
              href={`/interviews/${company.slug}`}
              className="card p-6 hover:shadow-lg transition-all hover:border-[#FF5A5F]"
            >
              <h2 className="text-lg font-semibold text-[#222222] hover:text-[#FF5A5F] transition-colors">
                {company.name}
              </h2>
              <div className="flex gap-3 mt-2">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${difficultyColors[difficulty]}`}>
                  {difficulty}
                </span>
                <span className="text-xs bg-[#FFF5F5] text-[#FF5A5F] px-2 py-1 rounded-full">
                  {rounds} rounds
                </span>
              </div>
              <p className="text-sm text-[#717171] mt-2">
                ★ <span className="text-[#FF5A5F] font-bold">{rating}</span> rating
              </p>
            </Link>
          );
        })}
      </div>
    </main>
  );
}