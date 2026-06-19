// components/ui/LevelBadge.tsx
import { Level } from '@/types';

const levelColors: Record<Level, string> = {
  'L3': 'bg-slate-200 text-slate-700',
  'L4': 'bg-blue-200 text-blue-700',
  'L5': 'bg-indigo-200 text-indigo-700',
  'L6': 'bg-purple-200 text-purple-700',
  'SDE-I': 'bg-slate-200 text-slate-700',
  'SDE-II': 'bg-blue-200 text-blue-700',
  'SDE-III': 'bg-indigo-200 text-indigo-700',
  'Staff': 'bg-purple-200 text-purple-700',
  'Principal': 'bg-navy-200 text-navy-700',
  'IC4': 'bg-blue-200 text-blue-700',
  'IC5': 'bg-indigo-200 text-indigo-700',
};

interface LevelBadgeProps {
  level: Level;
}

export function LevelBadge({ level }: LevelBadgeProps) {
  return (
    <span className={`px-2 py-1 rounded-md text-xs font-medium ${levelColors[level]}`}>
      {level}
    </span>
  );
}