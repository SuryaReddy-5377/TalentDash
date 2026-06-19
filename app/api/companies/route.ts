import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const companies = await prisma.company.findMany({
      include: {
        salaries: {
          select: {
            totalCompensation: true,
          },
        },
      },
    });

    // Serialize the data (convert BigInt to Number)
    const serializedCompanies = companies.map((company) => ({
      ...company,
      salaries: company.salaries.map((s) => ({
        totalCompensation: typeof s.totalCompensation === 'bigint' 
          ? Number(s.totalCompensation) 
          : s.totalCompensation,
      })),
    }));

    return NextResponse.json({ companies: serializedCompanies });
  } catch (error) {
    console.error('Companies API error:', error);
    return NextResponse.json(
      { error: true, message: 'Failed to fetch companies' },
      { status: 500 }
    );
  }
}