import Link from 'next/link';

export default function ToolsPage() {
  const tools = [
    {
      id: 'salary-calculator',
      name: 'Salary Calculator',
      description: 'Calculate your salary based on experience, location, and role',
      icon: '💰',
      color: 'bg-green-50 border-green-200',
      href: '/tools/salary-calculator',
    },
    {
      id: 'hike-calculator',
      name: 'Hike Calculator',
      description: 'Calculate your salary hike percentage and new salary',
      icon: '📈',
      color: 'bg-blue-50 border-blue-200',
      href: '/tools/hike-calculator',
    },
    {
      id: 'equity-calculator',
      name: 'Equity Calculator',
      description: 'Calculate the value of your RSUs and ESOPs',
      icon: '🏦',
      color: 'bg-purple-50 border-purple-200',
      href: '/tools/equity-calculator',
    },
    {
      id: 'offer-comparison',
      name: 'Offer Comparison',
      description: 'Compare multiple job offers side by side',
      icon: '⚖️',
      color: 'bg-orange-50 border-orange-200',
      href: '/compare',
    },
  ];

  return (
    <main className="container-custom py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1F2937]">Career Tools</h1>
        <p className="text-gray-600 mt-1">Tools to help you make better career decisions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            href={tool.href}
            className={`card p-6 ${tool.color} hover:shadow-lg transition-all group border-2`}
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">{tool.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-[#1F2937] group-hover:text-[#10B981] transition-colors">
                  {tool.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{tool.description}</p>
                <span className="text-sm text-green-600 font-medium mt-2 inline-block">Try now →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}