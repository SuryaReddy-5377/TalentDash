import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/login/', '/register/'],
    },
    sitemap: `${process.env.NEXT_PUBLIC_APP_URL || 'https://talentdash.vercel.app'}/sitemap.xml`,
  };
}