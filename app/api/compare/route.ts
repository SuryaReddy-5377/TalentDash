import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const s1 = url.searchParams.get('s1');
    const s2 = url.searchParams.get('s2');

    if (!s1 || !s2) {
      return NextResponse.json(
        { error: true, message: 'Both s1 and s2 are required' },
        { status: 400 }
      );
    }

    if (s1 === s2) {
      return NextResponse.json(
        { error: true, message: 'Cannot compare same record' },
        { status: 400 }
      );
    }

    const [record1, record2] = await Promise.all([
      prisma.salary.findUnique({ 
        where: { id: s1 }, 
        include: { company: true } 
      }),
      prisma.salary.findUnique({ 
        where: { id: s2 }, 
        include: { company: true } 
      }),
    ]);

    if (!record1 || !record2) {
      return NextResponse.json(
        { error: true, message: 'Record not found' },
        { status: 404 }
      );
    }

    const serialize = (record: any) => ({
      ...record,
      baseSalary: Number(record.baseSalary),
      bonus: Number(record.bonus),
      stock: Number(record.stock),
      totalCompensation: Number(record.totalCompensation),
    });

    return NextResponse.json({
      record1: serialize(record1),
      record2: serialize(record2),
      delta: {
        baseDelta: Number(record1.baseSalary) - Number(record2.baseSalary),
        bonusDelta: Number(record1.bonus) - Number(record2.bonus),
        stockDelta: Number(record1.stock) - Number(record2.stock),
        tcDelta: Number(record1.totalCompensation) - Number(record2.totalCompensation),
        experienceDelta: record1.experienceYears - record2.experienceYears,
      },
    });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: true, message: 'Internal server error' },
      { status: 500 }
    );
  }
}