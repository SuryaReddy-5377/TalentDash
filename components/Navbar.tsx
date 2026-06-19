'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

 const checkUser = () => {
    // Check if we are running in the browser safely
    if (typeof window === 'undefined') return;

    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const parsed = JSON.parse(currentUser);
      if (!user || user.fullName !== parsed.fullName) {
        setUser(parsed);
      }
    } else {
      if (user) setUser(null);
    }
  };

  useEffect(() => {
    checkUser();
    const interval = setInterval(checkUser, 500);
    window.addEventListener('storage', checkUser);
    window.addEventListener('local-storage-login', checkUser);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', checkUser);
      window.removeEventListener('local-storage-login', checkUser);
    };
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    setUser(null);
    router.push('/');
  };

  const handleProtectedClick = (e: React.MouseEvent, href: string) => {
    const currentUserData = localStorage.getItem('currentUser');
    if (!currentUserData && href !== '/' && href !== '/login' && href !== '/register') {
      e.preventDefault();
      router.push(`/login?redirect=${href.replace('/', '')}`);
    }
  };

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

  // Dynamically switch navbar base classes depending on the active route 
  // Keeps background completely clear on the home page layout
  const isHomePage = pathname === '/';
  const navBackgroundClasses = isHomePage 
    ? "bg-transparent absolute top-0 left-0 w-full z-50" 
    : "bg-white border-b border-gray-200 sticky top-0 z-50";

  return (
    <nav className={`${navBackgroundClasses} px-6`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center h-20">
        <Link href="/" className="text-2xl font-bold text-gray-900 whitespace-nowrap tracking-tight">
          Talent<span className="text-green-600">Dash</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleProtectedClick(e, link.href)}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap ${
                pathname === link.href
                  ? 'bg-green-600 text-white'
                  : 'text-gray-700 hover:bg-black/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
          
          {/* Login / Register Actions */}
          <div className="flex items-center gap-2 ml-2 pl-2 border-l border-gray-300/50">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">👋 {user.fullName}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                    pathname === '/login'
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'text-gray-700 hover:bg-black/5'
                  }`}
                >
                  Log in
                </Link>
                
                <Link
                  href="/register"
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                    pathname === '/login'
                      ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Hamburger Menu Icon styled like your mockup */}
        <div className="lg:hidden flex items-center gap-4">
          {!user && (
            <Link
              href="/login"
              className="px-3 py-1.5 text-sm font-semibold text-gray-700 bg-white/40 backdrop-blur-sm border border-gray-300/50 rounded-lg"
            >
              Log in
            </Link>
          )}
          
          <details className="dropdown">
            <summary className="p-2 rounded-lg hover:bg-black/5 cursor-pointer list-none text-gray-900">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </summary>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-1 z-50">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleProtectedClick(e, link.href)}
                  className={`block px-4 py-2 text-sm font-semibold transition-colors ${
                    pathname === link.href
                      ? 'bg-green-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {user && (
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              )}
            </div>
          </details>
        </div>
      </div>
    </nav>
  );
}