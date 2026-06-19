import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const company = await prisma.company.findUnique({
      where: { slug: slug },
      include: {
        salaries: {
          orderBy: { totalCompensation: 'desc' },
        },
      },
    });

    if (!company) {
      return NextResponse.json(
        { error: true, message: 'Company not found' },
        { status: 404 }
      );
    }

    // Convert BigInt to Number
    const serializedSalaries = company.salaries.map((s: any) => ({
      ...s,
      baseSalary: Number(s.baseSalary),
      bonus: Number(s.bonus),
      stock: Number(s.stock),
      totalCompensation: Number(s.totalCompensation),
    }));

    // Calculate median
    const values = serializedSalaries
      .map((s: any) => Number(s.totalCompensation))
      .sort((a: number, b: number) => a - b);
    
    let medianTotal = 0;
    if (values.length > 0) {
      const mid = Math.floor(values.length / 2);
      medianTotal = values.length % 2 === 0 
        ? (values[mid - 1] + values[mid]) / 2 
        : values[mid];
    }

    // Level distribution
    const levelDistribution: Record<string, number> = {};
    for (const salary of serializedSalaries) {
      levelDistribution[salary.level] = (levelDistribution[salary.level] || 0) + 1;
    }

    return NextResponse.json({
      company: {
        id: company.id,
        name: company.name,
        slug: company.slug,
        industry: company.industry,
        headquarters: company.headquarters,
        foundedYear: company.foundedYear,
        headcountRange: company.headcountRange,
      },
      salaries: serializedSalaries,
      medianTotalCompensation: medianTotal,
      levelDistribution,
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: true, message: 'Internal server error' },
      { status: 500 }
    );
  }
}