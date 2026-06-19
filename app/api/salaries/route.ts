import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const salaries = await prisma.salary.findMany({
      include: {
        company: true,
      },
      orderBy: {
        totalCompensation: 'desc',
      },
      take: 100,
    });

    // Convert BigInt to Number for JSON serialization
    const serializedSalaries = salaries.map((salary) => ({
      ...salary,
      baseSalary: Number(salary.baseSalary),
      bonus: Number(salary.bonus),
      stock: Number(salary.stock),
      totalCompensation: Number(salary.totalCompensation),
      confidenceScore: Number(salary.confidenceScore),
    }));

    return NextResponse.json({ data: serializedSalaries });
  } catch (error) {
    console.error('Error fetching salaries:', error);
    return NextResponse.json({ data: [] });
  }
}