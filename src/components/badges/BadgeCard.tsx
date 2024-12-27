import React from 'react';
import { Award } from 'lucide-react';
import { Badge } from '../../types';

interface BadgeCardProps {
  badge: Badge;
}

export default function BadgeCard({ badge }: BadgeCardProps) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-gray-200 p-2">
      <Award className="h-5 w-5 text-blue-500" />
      <div>
        <p className="text-sm font-medium">{badge.name}</p>
        <p className="text-xs text-gray-500">{badge.description}</p>
      </div>
    </div>
  );
}