'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  const links = [
    { href: '/', label: 'Home' },
    { href: '/salaries', label: 'Salaries' },
    { href: '/companies', label: 'Companies' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/interviews', label: 'Interviews' },
    { href: '/compare', label: 'Compare' },
    { href: '/tools', label: 'Tools' },
    { href: '/community', label: 'Community' },
    { href: '/workplace-index', label: 'Workplace' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 px-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-16">
        <Link href="/" className="text-xl font-bold text-gray-900 whitespace-nowrap">
          Talent<span className="text-green-600">Dash</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-1 overflow-x-auto">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                pathname === link.href
                  ? 'bg-green-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden py-2 border-t border-gray-100">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === link.href
                  ? 'bg-green-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}