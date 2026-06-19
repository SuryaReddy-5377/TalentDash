import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

// Define the Company type
interface Company {
  id: string;
  slug: string;
  name: string;
  salaries: any[];
}

export async function generateStaticParams() {
  const companies = await prisma.company.findMany({
    select: { slug: true },
  });
  return companies.map((company: { slug: string }) => ({
    slug: company.slug,
  }));
}

export default async function CommunityDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  
  const company: Company | null = await prisma.company.findUnique({
    where: { slug },
    include: {
      salaries: true,
    },
  });

  if (!company) {
    notFound();
  }

  // Mock discussions
  const discussions = [
    {
      id: 1,
      title: 'How is the work culture at ' + company.name + '?',
      author: 'Anonymous',
      replies: 23,
      likes: 45,
      time: '2 hours ago',
    },
    {
      id: 2,
      title: 'Salary negotiation tips for ' + company.name,
      author: 'Senior Engineer',
      replies: 18,
      likes: 32,
      time: '5 hours ago',
    },
    {
      id: 3,
      title: 'Interview experience at ' + company.name,
      author: 'Recent Hire',
      replies: 12,
      likes: 28,
      time: '1 day ago',
    },
    {
      id: 4,
      title: 'Remote work policy at ' + company.name,
      author: 'Anonymous',
      replies: 8,
      likes: 19,
      time: '2 days ago',
    },
  ];

  return (
    <main className="container-custom py-8">
      <div className="card p-6 mb-6 border-green-100">
        <h1 className="text-3xl font-bold text-[#1F2937]">{company.name} Discussions</h1>
        <p className="text-gray-600 mt-1">{discussions.length} topics • {company.salaries.length} employees</p>
      </div>

      <div className="space-y-3">
        {discussions.map((discussion) => (
          <div key={discussion.id} className="card p-4 border-green-100 hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-[#1F2937] hover:text-green-600 cursor-pointer">
                  {discussion.title}
                </h3>
                <div className="flex gap-4 mt-1 text-sm text-gray-500">
                  <span>By {discussion.author}</span>
                  <span>•</span>
                  <span>{discussion.time}</span>
                </div>
              </div>
              <div className="flex gap-4 text-sm">
                <span className="text-gray-500">💬 {discussion.replies}</span>
                <span className="text-gray-500">❤️ {discussion.likes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}