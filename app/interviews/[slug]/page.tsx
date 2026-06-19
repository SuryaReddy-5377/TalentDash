import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const companies = await prisma.company.findMany({
    select: { slug: true },
  });
  return companies.map((company) => ({
    slug: company.slug,
  }));
}

export default async function InterviewDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const company = await prisma.company.findUnique({
    where: { slug },
  });

  if (!company) notFound();

  const interviews = [
    {
      id: 1,
      role: 'Software Engineer',
      difficulty: 'Medium',
      rounds: 4,
      rating: 4.0,
      experience: 'I had 4 rounds of interviews. First was a coding round with DSA questions. Second was system design. Third was hiring manager. Fourth was HR.',
      questions: ['Design a URL shortener', 'Find the longest substring', 'Explain your previous projects'],
      offer: 'Selected',
    },
    {
      id: 2,
      role: 'Product Manager',
      difficulty: 'Hard',
      rounds: 5,
      rating: 3.5,
      experience: '5 rounds including case studies, product design, and leadership interviews. Very thorough process.',
      questions: ['Product strategy for a new feature', 'How to improve user engagement', 'Market analysis'],
      offer: 'Rejected',
    },
    {
      id: 3,
      role: 'Data Analyst',
      difficulty: 'Easy',
      rounds: 3,
      rating: 4.5,
      experience: '3 rounds - SQL, Python, and business case. Pretty straightforward.',
      questions: ['SQL queries', 'Python data analysis', 'Business metrics'],
      offer: 'Selected',
    },
  ];

  return (
    <main className="container-custom py-8">
      <div className="card p-6 mb-6 border-green-100">
        <h1 className="text-3xl font-bold text-[#1F2937]">{company.name} Interviews</h1>
        <p className="text-gray-600 mt-1">{interviews.length} interview experiences</p>
      </div>

      <div className="space-y-4">
        {interviews.map((interview) => (
          <div key={interview.id} className="card p-6 border-green-100">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-[#1F2937]">{interview.role}</h3>
                <div className="flex gap-2 mt-1">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    interview.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                    interview.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    interview.difficulty === 'Hard' ? 'bg-orange-100 text-orange-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {interview.difficulty}
                  </span>
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                    {interview.rounds} rounds
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    interview.offer === 'Selected' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {interview.offer}
                  </span>
                </div>
              </div>
              <span className="text-lg font-bold text-green-600">★ {interview.rating}</span>
            </div>
            <p className="text-gray-600 mt-3">{interview.experience}</p>
            <div className="mt-3">
              <p className="text-sm font-medium text-gray-700">Common Questions:</p>
              <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                {interview.questions.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}