'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const totalSalaries = 379; 
  const totalCompanies = 20;

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setIsLoggedIn(true);
    }
    
    const checkAuth = () => {
      setIsLoggedIn(!!localStorage.getItem('currentUser'));
    };
    window.addEventListener('local-storage-login', checkAuth);
    return () => window.removeEventListener('local-storage-login', checkAuth);
  }, []);

  return (
    <main 
      className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage: `url('/hero-sofa.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dynamic Overlay: Darker on the left side to make sure text is completely clear and readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/40 to-transparent z-0"></div>

      <div className="relative z-10 w-full">
        {/* Hero Section Container */}
        <div className="w-full min-h-screen flex items-center pt-24 pb-16">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="max-w-3xl w-full">
              
              {/* Badge Counter */}
              <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 sm:px-6 py-2 rounded-full border border-gray-200 shadow-sm mb-6 sm:mb-8">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-sm sm:text-base font-medium text-gray-800">
                  {totalSalaries.toLocaleString()}+ salary records • {totalCompanies} companies
                </span>
              </div>
              
              {/* Heading */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight mb-4 sm:mb-6">
                Know Your <span className="text-green-600 font-extrabold">Worth</span>
              </h1>
              
              {/* Subtitle - Increased text contrast against background */}
              <p className="text-base sm:text-xl lg:text-2xl text-gray-950 font-medium mb-8 sm:mb-10 max-w-2xl leading-relaxed drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                Compare salaries, company reviews, and interview experiences across 
                top companies in India. Make data-driven career decisions with confidence.
              </p>
              
              {/* Responsive Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                <Link 
                  href={isLoggedIn ? "/salaries" : "/login?redirect=salaries"} 
                  className="bg-green-600 hover:bg-green-700 text-white text-center px-8 py-3.5 sm:py-4 rounded-xl font-bold transition-all text-base sm:text-lg shadow-sm hover:shadow-md tracking-wide"
                >
                  Explore Salaries →
                </Link>
                <Link 
                  href={isLoggedIn ? "/companies" : "/login?redirect=companies"} 
                  className="border-2 border-green-600 text-green-700 hover:bg-green-600/10 text-center px-8 py-3.5 sm:py-4 rounded-xl font-bold transition-all text-base sm:text-lg bg-white/30 backdrop-blur-sm tracking-wide"
                >
                  View Companies
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative" style={{ marginTop: '-60px' }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-5 text-center shadow-lg border border-green-100">
              <div className="text-2xl sm:text-3xl font-bold text-green-600">{totalSalaries.toLocaleString()}</div>
              <div className="text-xs sm:text-sm text-gray-500">Salary Records</div>
            </div>
            <div className="bg-white rounded-xl p-5 text-center shadow-lg border border-green-100">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900">{totalCompanies}</div>
              <div className="text-xs sm:text-sm text-gray-500">Companies</div>
            </div>
            <div className="bg-white rounded-xl p-5 text-center shadow-lg border border-green-100">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900">10+</div>
              <div className="text-xs sm:text-sm text-gray-500">Levels</div>
            </div>
            <div className="bg-white rounded-xl p-5 text-center shadow-lg border border-green-100">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900">5+</div>
              <div className="text-xs sm:text-sm text-gray-500">Cities</div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Explore. Compare. Grow.</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-2 text-sm sm:text-base">
              Discover real salary insights, read reviews, prepare for interviews, and find the right opportunities — all in one place.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-green-100 hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">💰</div>
              <h3 className="text-lg font-semibold text-gray-900">Salary Insights</h3>
              <p className="text-gray-500 text-sm mt-1">Compare compensation across companies, levels, and locations</p>
            </div>
            
            <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-green-100 hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">⭐</div>
              <h3 className="text-lg font-semibold text-gray-900">Company Reviews</h3>
              <p className="text-gray-500 text-sm mt-1">Read anonymous reviews from verified employees</p>
            </div>
            
            <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-green-100 hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">🎯</div>
              <h3 className="text-lg font-semibold text-gray-900">Interview Experiences</h3>
              <p className="text-gray-500 text-sm mt-1">Learn from real interview experiences and questions</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}