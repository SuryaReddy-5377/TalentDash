import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-primary-accent">
          TalentDash
        </Link>
        <nav className="flex gap-6">
          <Link href="/salaries" className="text-sm hover:text-primary-accent">
            Salaries
          </Link>
          <Link href="/companies" className="text-sm hover:text-primary-accent">
            Companies
          </Link>
          <Link href="/compare" className="text-sm hover:text-primary-accent">
            Compare
          </Link>
        </nav>
      </div>
    </header>
  );
}