import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[#0A0A0F] border-t border-[#2A2A3E]">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 text-lg font-bold text-white mb-3">
              <span>📊</span>
              <span>TalentDash</span>
            </div>
            <p className="text-sm text-gray-500">
              Career intelligence platform.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-400 text-sm mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/salaries" className="hover:text-[#3B82F6] transition-colors">Salaries</Link></li>
              <li><Link href="/companies" className="hover:text-[#3B82F6] transition-colors">Companies</Link></li>
              <li><Link href="/compare" className="hover:text-[#3B82F6] transition-colors">Compare</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-400 text-sm mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li className="hover:text-[#3B82F6] transition-colors cursor-pointer">About</li>
              <li className="hover:text-[#3B82F6] transition-colors cursor-pointer">Careers</li>
              <li className="hover:text-[#3B82F6] transition-colors cursor-pointer">Blog</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-400 text-sm mb-3">Connect</h4>
            <div className="flex gap-3">
              <span className="text-xl hover:scale-110 transition-transform cursor-pointer">🐦</span>
              <span className="text-xl hover:scale-110 transition-transform cursor-pointer">📘</span>
              <span className="text-xl hover:scale-110 transition-transform cursor-pointer">🔗</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-[#2A2A3E] mt-6 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
          <p>© {new Date().getFullYear()} TalentDash. Made in India 🇮🇳</p>
          <div className="flex gap-4">
            <span className="cursor-pointer hover:text-gray-400 transition-colors">Privacy</span>
            <span className="cursor-pointer hover:text-gray-400 transition-colors">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}