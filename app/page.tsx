import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function HomePage() {
  const totalCompanies = await prisma.company.count();
  const totalSalaries = await prisma.salary.count();

  return (
    <main>
      {/* Hero Section with Green Background Pattern */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-50/30 py-20">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-200 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-100 rounded-full blur-3xl"></div>
        </div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-5" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310B981' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
               backgroundSize: '60px 60px'
             }}
        ></div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-green-200 shadow-sm mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-gray-700">
                {totalSalaries.toLocaleString()}+ salary records • {totalCompanies} companies
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-[#1F2937] mb-4">
              Know Your <span className="text-green-600">Worth</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Compare salaries, company reviews, and interview experiences across 
              top companies in India. Make data-driven career decisions with confidence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/salaries" className="btn-primary">
                Explore Salaries
              </Link>
              <Link href="/companies" className="btn-outline">
                View Companies
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Row */}
      <section className="container-custom -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card p-6 text-center">
            <div className="stat-value stat-value-green">{totalSalaries.toLocaleString()}</div>
            <div className="stat-label">Salary Records</div>
          </div>
          <div className="card p-6 text-center">
            <div className="stat-value">{totalCompanies}</div>
            <div className="stat-label">Companies</div>
          </div>
          <div className="card p-6 text-center">
            <div className="stat-value">10+</div>
            <div className="stat-label">Levels</div>
          </div>
          <div className="card p-6 text-center">
            <div className="stat-value">5+</div>
            <div className="stat-label">Cities</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 container-custom">
        <h2 className="text-3xl font-bold text-center mb-4">Why TalentDash?</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Get the complete picture of your career with structured, comparable data
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-8 text-center hover:shadow-lg transition-all">
            <div className="feature-icon">💰</div>
            <h3 className="text-lg font-semibold mb-2">Salary Insights</h3>
            <p className="text-gray-600 text-sm">Compare compensation across companies, levels, and locations</p>
          </div>
          
          <div className="card p-8 text-center hover:shadow-lg transition-all">
            <div className="feature-icon">⭐</div>
            <h3 className="text-lg font-semibold mb-2">Company Reviews</h3>
            <p className="text-gray-600 text-sm">Read anonymous reviews from verified employees</p>
          </div>
          
          <div className="card p-8 text-center hover:shadow-lg transition-all">
            <div className="feature-icon">🎯</div>
            <h3 className="text-lg font-semibold mb-2">Interview Experiences</h3>
            <p className="text-gray-600 text-sm">Learn from real interview experiences and questions</p>
          </div>
        </div>
      </section>
    </main>
  );
}