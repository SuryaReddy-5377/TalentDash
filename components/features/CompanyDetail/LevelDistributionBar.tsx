interface LevelDistributionBarProps {
  distribution: Record<string, number>;
}

const LEVEL_COLORS: Record<string, string> = {
  'L3': 'bg-slate-400',
  'L4': 'bg-blue-400',
  'L5': 'bg-indigo-400',
  'L6': 'bg-purple-400',
  'SDE-I': 'bg-slate-400',
  'SDE-II': 'bg-blue-400',
  'SDE-III': 'bg-indigo-400',
  'Staff': 'bg-purple-600',
  'Principal': 'bg-navy-600',
  'IC4': 'bg-blue-400',
  'IC5': 'bg-indigo-400',
};

export function LevelDistributionBar({ distribution }: LevelDistributionBarProps) {
  const total = Object.values(distribution).reduce((sum, count) => sum + count, 0);
  
  if (total === 0) {
    return (
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-sm text-gray-500 text-center">No salary data available</p>
      </div>
    );
  }

  // Sort levels by count (descending)
  const sortedLevels = Object.entries(distribution).sort((a, b) => b[1] - a[1]);

  return (
    <div className="mt-6">
      <h3 className="text-sm font-medium text-gray-700 mb-3">Level Distribution</h3>
      
      <div className="flex h-6 rounded-lg overflow-hidden">
        {sortedLevels.map(([level, count]) => {
          const percentage = (count / total) * 100;
          const color = LEVEL_COLORS[level] || 'bg-gray-400';
          
          return (
            <div
              key={level}
              className={`${color} transition-all duration-300`}
              style={{ width: `${percentage}%` }}
              title={`${level}: ${count} records (${percentage.toFixed(1)}%)`}
            />
          );
        })}
      </div>
      
      <div className="flex flex-wrap gap-3 mt-3">
        {sortedLevels.map(([level, count]) => {
          const percentage = ((count / total) * 100).toFixed(1);
          const color = LEVEL_COLORS[level] || 'bg-gray-400';
          
          return (
            <div key={level} className="flex items-center gap-1.5">
              <span className={`w-3 h-3 rounded-full ${color}`} />
              <span className="text-xs text-gray-600">
                {level} ({percentage}%)
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}