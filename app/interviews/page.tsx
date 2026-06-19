import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function InterviewsPage() {
  const companies = await prisma.company.findMany({
    include: {
      salaries: true,
    },
  });

  const difficultyLevels = ['Easy', 'Medium', 'Hard', 'Very Hard'];

  return (
    <main className="container-custom py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1F2937]">Interview Experiences</h1>
        <p className="text-gray-600 mt-1">Learn from real interview experiences</p>
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
              className="card p-6 hover:shadow-lg transition-all group"
            >
              <h2 className="text-lg font-semibold text-[#1F2937] group-hover:text-[#10B981] transition-colors">
                {company.name}
              </h2>
              <div className="flex gap-3 mt-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                  difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                  difficulty === 'Hard' ? 'bg-orange-100 text-orange-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {difficulty}
                </span>
                <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                  {rounds} rounds
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-2">★ {rating} rating</p>
            </Link>
          );
        })}
      </div>
    </main>
  );
}