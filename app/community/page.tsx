import { prisma } from '@/lib/prisma';
import Link from 'next/link';

// Define the Company type
interface Company {
  id: string;
  slug: string;
  name: string;
  salaries: any[];
}

export default async function CommunityPage() {
  const companies: Company[] = await prisma.company.findMany({
    take: 10,
    include: {
      salaries: true,
    },
  });

  const topics = [
    { name: 'Salary Negotiation', posts: 234, icon: '💬' },
    { name: 'Career Growth', posts: 189, icon: '🚀' },
    { name: 'Interview Tips', posts: 156, icon: '🎯' },
    { name: 'Work-Life Balance', posts: 143, icon: '⚖️' },
    { name: 'Remote Work', posts: 98, icon: '🏠' },
    { name: 'Tech Stack', posts: 87, icon: '💻' },
  ];

  return (
    <main className="container-custom py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1F2937]">Community</h1>
        <p className="text-gray-600 mt-1">Anonymous professional discussions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h3 className="font-semibold mb-3">Popular Topics</h3>
          <div className="space-y-2">
            {topics.map((topic) => (
              <div key={topic.name} className="card p-4 border-green-100 flex justify-between items-center hover:shadow-md transition-all">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{topic.icon}</span>
                  <span className="font-medium text-[#1F2937]">{topic.name}</span>
                </div>
                <span className="text-sm text-gray-500">{topic.posts} posts</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Company Discussions</h3>
          <div className="space-y-2">
            {companies.map((company: Company) => (
              <Link
                key={company.id}
                href={`/community/${company.slug}`}
                className="card p-3 border-green-100 flex justify-between items-center hover:shadow-md transition-all hover:border-green-300"
              >
                <div>
                  <span className="text-sm font-medium text-[#1F2937]">{company.name}</span>
                  <span className="text-xs text-gray-400 ml-2">({company.salaries.length} discussions)</span>
                </div>
                <span className="text-xs text-green-600 font-medium">View →</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}