import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    const companies = await prisma.company.findMany({
      include: {
        salaries: true,
      },
    });
    
    return NextResponse.json({ data: companies });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ data: [] });
  }
}