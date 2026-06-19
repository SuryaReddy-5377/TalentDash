import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function CompanyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const company = await prisma.company.findUnique({
    where: { slug },
    include: { salaries: true },
  });

  if (!company) notFound();

  return (
    <div>
      <h1>{company.name}</h1>
      {/* Rest of your component */}
    </div>
  );
}