import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

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

    const serializedCompanies = companies.map((company) => ({
      ...company,
      salaries: company.salaries.map((s) => ({
        totalCompensation: Number(s.totalCompensation),
      })),
    }));

    return NextResponse.json({ companies: serializedCompanies });
  } catch (error) {
    return NextResponse.json(
      { error: true, message: 'Failed to fetch companies' },
      { status: 500 }
    );
  }
}