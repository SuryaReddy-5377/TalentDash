import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    const company = await prisma.company.findUnique({
      where: { slug },
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

    // Calculate median - Fixed types
    const values = company.salaries.map((s: any) => Number(s.totalCompensation)).sort((a: number, b: number) => a - b);
    let median = 0;
    if (values.length > 0) {
      const mid = Math.floor(values.length / 2);
      median = values.length % 2 === 0 ? (values[mid - 1] + values[mid]) / 2 : values[mid];
    }

    // Level distribution
    const distribution: Record<string, number> = {};
    for (const s of company.salaries) {
      distribution[s.level] = (distribution[s.level] || 0) + 1;
    }

    return NextResponse.json({
      company,
      medianTotalCompensation: median,
      levelDistribution: distribution,
    });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: true, message: 'Internal server error' },
      { status: 500 }
    );
  }
}