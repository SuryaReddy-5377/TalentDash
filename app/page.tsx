'use client';

import Link from 'next/link';

export default function HomePage() {
  const totalSalaries = 379;
  const totalCompanies = 20;

  return (
    <main>
      {/* Hero Section - Clean, White */}
      <section className="bg-white py-20 border-b border-[#EBEBEB]">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#F7F7F7] px-4 py-2 rounded-full border border-[#EBEBEB] mb-6">
              <span className="w-2 h-2 bg-[#FF5A5F] rounded-full"></span>
              <span className="text-sm font-medium text-[#484848]">
                {totalSalaries.toLocaleString()}+ salary records • {totalCompanies} companies
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#222222] tracking-tight mb-4">
              Know Your <span className="text-[#FF5A5F]">Worth</span>
            </h1>
            
            <p className="text-lg md:text-xl text-[#484848] mb-8 max-w-3xl mx-auto leading-relaxed">
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
      <section className="container-custom -mt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card p-6 text-center">
            <div className="stat-value stat-value-primary">{totalSalaries.toLocaleString()}</div>
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
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#222222] mb-4">
          Why TalentDash?
        </h2>
        <p className="text-center text-[#484848] mb-12 max-w-2xl mx-auto">
          Get the complete picture of your career with structured, comparable data
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-8 text-center hover:shadow-lg transition-all">
            <div className="feature-icon">💰</div>
            <h3 className="text-lg font-semibold text-[#222222] mb-2">Salary Insights</h3>
            <p className="text-[#484848] text-sm">Compare compensation across companies, levels, and locations</p>
          </div>
          
          <div className="card p-8 text-center hover:shadow-lg transition-all">
            <div className="feature-icon">⭐</div>
            <h3 className="text-lg font-semibold text-[#222222] mb-2">Company Reviews</h3>
            <p className="text-[#484848] text-sm">Read anonymous reviews from verified employees</p>
          </div>
          
          <div className="card p-8 text-center hover:shadow-lg transition-all">
            <div className="feature-icon">🎯</div>
            <h3 className="text-lg font-semibold text-[#222222] mb-2">Interview Experiences</h3>
            <p className="text-[#484848] text-sm">Learn from real interview experiences and questions</p>
          </div>
        </div>
      </section>
    </main>
  );
}