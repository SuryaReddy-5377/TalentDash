import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
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

    // Convert BigInt to Number for JSON serialization
    const serializedSalaries = company.salaries.map((s: any) => ({
      ...s,
      baseSalary: typeof s.baseSalary === 'bigint' ? Number(s.baseSalary) : s.baseSalary,
      bonus: typeof s.bonus === 'bigint' ? Number(s.bonus) : s.bonus,
      stock: typeof s.stock === 'bigint' ? Number(s.stock) : s.stock,
      totalCompensation: typeof s.totalCompensation === 'bigint' ? Number(s.totalCompensation) : s.totalCompensation,
    }));

    // Compute median
    const totalCompValues = serializedSalaries
      .map((s: any) => Number(s.totalCompensation))
      .sort((a: number, b: number) => a - b);
    
    let medianTotal = 0;
    if (totalCompValues.length > 0) {
      const mid = Math.floor(totalCompValues.length / 2);
      if (totalCompValues.length % 2 === 0) {
        medianTotal = (totalCompValues[mid - 1] + totalCompValues[mid]) / 2;
      } else {
        medianTotal = totalCompValues[mid];
      }
    }

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
    }, {
      headers: {
        'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
      },
    });

  } catch (error) {
    console.error('Company API error:', error);
    return NextResponse.json(
      { error: true, message: 'Internal server error' },
      { status: 500 }
    );
  }
}