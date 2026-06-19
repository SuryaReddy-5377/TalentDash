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

export default async function ReviewDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const company = await prisma.company.findUnique({
    where: { slug },
    include: {
      salaries: true,
    },
  });

  if (!company) notFound();

  // Generate mock reviews
  const reviews = [
    {
      id: 1,
      author: 'Anonymous Employee',
      rating: 4.5,
      title: 'Great work culture and benefits',
      content: 'Excellent work-life balance with great benefits. The team is supportive and the management is transparent.',
      date: '2 weeks ago',
      pros: 'Good salary, flexible timings',
      cons: 'Slow promotion cycle',
    },
    {
      id: 2,
      author: 'Senior Engineer',
      rating: 4.0,
      title: 'Good place to learn and grow',
      content: 'Great learning opportunities with cutting-edge technology. The office environment is modern and collaborative.',
      date: '1 month ago',
      pros: 'Learning opportunities, modern tech stack',
      cons: 'Long working hours sometimes',
    },
    {
      id: 3,
      author: 'Product Manager',
      rating: 3.5,
      title: 'Decent company with good perks',
      content: 'Good perks and benefits. The work is interesting but can be stressful at times.',
      date: '2 months ago',
      pros: 'Good benefits, interesting work',
      cons: 'Stressful during deadlines',
    },
  ];

  const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <main className="container-custom py-8">
      <div className="card p-6 mb-6 border-green-100">
        <h1 className="text-3xl font-bold text-[#1F2937]">{company.name} Reviews</h1>
        <div className="flex items-center gap-4 mt-2">
          <span className="text-2xl font-bold text-green-600">★ {avgRating}</span>
          <span className="text-gray-500">{reviews.length} reviews</span>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="card p-6 border-green-100">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-[#1F2937]">{review.title}</h3>
                <p className="text-sm text-gray-500">{review.author} • {review.date}</p>
              </div>
              <span className="text-lg font-bold text-green-600">★ {review.rating}</span>
            </div>
            <p className="text-gray-600 mt-3">{review.content}</p>
            <div className="flex gap-4 mt-3 text-sm">
              <span className="text-green-600">✅ {review.pros}</span>
              <span className="text-red-500">⚠️ {review.cons}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}