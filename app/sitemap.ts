import { prisma } from '@/lib/prisma';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://talentdash.vercel.app';
  
  // Get all companies for dynamic routes
  const companies = await prisma.company.findMany({
    select: { slug: true },
  });

  // Static routes
  const staticRoutes = [
    '',
    '/salaries',
    '/companies',
    '/compare',
    '/reviews',
    '/interviews',
    '/tools',
    '/community',
    '/workplace-index',
    '/login',
    '/register',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic company routes
  const companyRoutes = companies.map((company) => ({
    url: `${baseUrl}/companies/${company.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...companyRoutes];
}