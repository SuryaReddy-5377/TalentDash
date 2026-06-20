import Link from 'next/link';

export default function ToolsPage() {
  const tools = [
    {
      id: 'salary-calculator',
      name: 'Salary Calculator',
      description: 'Calculate your salary based on experience, location, and role',
      icon: '💰',
      href: '/tools/salary-calculator',
    },
    {
      id: 'hike-calculator',
      name: 'Hike Calculator',
      description: 'Calculate your salary hike percentage and new salary',
      icon: '📈',
      href: '/tools/hike-calculator',
    },
    {
      id: 'equity-calculator',
      name: 'Equity Calculator',
      description: 'Calculate the value of your RSUs and ESOPs',
      icon: '🏦',
      href: '/tools/equity-calculator',
    },
    {
      id: 'offer-comparison',
      name: 'Offer Comparison',
      description: 'Compare multiple job offers side by side',
      icon: '⚖️',
      href: '/compare',
    },
  ];

  return (
    <main className="container-custom py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#222222]">Career Tools</h1>
        <p className="text-[#717171] mt-1">Tools to help you make better career decisions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            href={tool.href}
            className="card p-6 hover:shadow-lg transition-all hover:border-[#FF5A5F] group"
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">{tool.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-[#222222] group-hover:text-[#FF5A5F] transition-colors">
                  {tool.name}
                </h3>
                <p className="text-sm text-[#484848] mt-1">{tool.description}</p>
                <span className="text-sm text-[#FF5A5F] font-medium mt-2 inline-block">Try now →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}