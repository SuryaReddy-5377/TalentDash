import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    const required = ['company', 'role', 'level', 'location', 'currency', 'experienceYears', 'baseSalary', 'confidenceScore'];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { error: true, field, message: `Field '${field}' is required` },
          { status: 400 }
        );
      }
    }

    // Normalize company name
    const normalizedName = body.company
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, ' ');

    // Find or create company
    let company = await prisma.company.findUnique({
      where: { normalizedName },
    });

    if (!company) {
      const slug = normalizedName.replace(/\s+/g, '-');
      company = await prisma.company.create({
        data: {
          name: body.company,
          slug,
          normalizedName,
        },
      });
    }

    // Recompute total compensation
    const totalCompensation = Number(body.baseSalary) + (Number(body.bonus) || 0) + (Number(body.stock) || 0);

    // Create salary
    const salary = await prisma.salary.create({
      data: {
        companyId: company.id,
        role: body.role,
        level: body.level,
        location: body.location,
        currency: body.currency,
        experienceYears: Number(body.experienceYears),
        baseSalary: Number(body.baseSalary),
        bonus: Number(body.bonus) || 0,
        stock: Number(body.stock) || 0,
        totalCompensation: totalCompensation,
        source: body.source || 'CONTRIBUTOR',
        confidenceScore: Number(body.confidenceScore),
        isVerified: body.isVerified || false,
      },
      include: { company: true },
    });

    return NextResponse.json({
      ...salary,
      baseSalary: Number(salary.baseSalary),
      bonus: Number(salary.bonus),
      stock: Number(salary.stock),
      totalCompensation: Number(salary.totalCompensation),
    }, { status: 201 });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: true, message: 'Internal server error' },
      { status: 500 }
    );
  }
}