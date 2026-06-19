export function LevelBadge({ level }: { level: string }) {
  const colors: Record<string, string> = {
    'L3': 'bg-gray-200 text-gray-800',
    'L4': 'bg-blue-200 text-blue-800',
    'L5': 'bg-indigo-200 text-indigo-800',
    'L6': 'bg-purple-200 text-purple-800',
    'SDE-I': 'bg-gray-200 text-gray-800',
    'SDE-II': 'bg-blue-200 text-blue-800',
    'SDE-III': 'bg-indigo-200 text-indigo-800',
    'Staff': 'bg-purple-200 text-purple-800',
    'Principal': 'bg-gray-800 text-white',
    'IC4': 'bg-blue-200 text-blue-800',
    'IC5': 'bg-indigo-200 text-indigo-800',
  };
  
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${colors[level] || 'bg-gray-200 text-gray-800'}`}>
      {level}
    </span>
  );
}