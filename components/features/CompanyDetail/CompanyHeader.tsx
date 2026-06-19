import { Company } from '@/types';
import Link from 'next/link';

interface CompanyHeaderProps {
  company: Company;
}

export function CompanyHeader({ company }: CompanyHeaderProps) {
  return (
    <div className="border-b border-gray-200 pb-6">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#222222]">
            {company.name}
          </h1>
          {company.industry && (
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                {company.industry}
              </span>
              {company.headquarters && (
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  📍 {company.headquarters}
                </span>
              )}
            </div>
          )}
          <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
            {company.foundedYear && (
              <span>Founded: {company.foundedYear}</span>
            )}
            {company.headcountRange && (
              <span>Headcount: {company.headcountRange}</span>
            )}
          </div>
        </div>
        
        <Link
          href={`/compare?c1=${company.slug}`}
          className="mt-4 md:mt-0 px-6 py-2 bg-[#FF5A5F] text-white rounded-lg hover:bg-[#E04A4F] transition-colors"
        >
          Compare
        </Link>
      </div>
    </div>
  );
}