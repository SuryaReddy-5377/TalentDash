import { mockCompanies } from '@/lib/companies';

export function generateStaticParams() {
  return mockCompanies.map((company) => ({
    slug: company.slug,
  }));
}