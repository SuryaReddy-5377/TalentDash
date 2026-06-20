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
    <nav className="bg-white border-b border-[#EBEBEB] px-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-16">
        <Link href="/" className="text-xl font-bold text-[#222222] tracking-tight">
          Talent<span className="text-[#FF5A5F]">Dash</span>
        </Link>
        
        <div className="hidden lg:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === link.href
                  ? 'bg-[#FF5A5F] text-white'
                  : 'text-[#484848] hover:bg-[#F2F2F2] hover:text-[#222222]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-[#F2F2F2]"
        >
          <svg className="w-6 h-6 text-[#222222]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden py-2 border-t border-[#EBEBEB]">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === link.href
                  ? 'bg-[#FF5A5F] text-white'
                  : 'text-[#484848] hover:bg-[#F2F2F2] hover:text-[#222222]'
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