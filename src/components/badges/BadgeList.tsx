import React from 'react';
import { Badge } from '../../types';
import BadgeCard from './BadgeCard';

interface BadgeListProps {
  badges: Badge[];
}

export default function BadgeList({ badges }: BadgeListProps) {
  if (!badges?.length) return null;

  return (
    <div className="mt-4">
      <h3 className="text-sm font-medium text-gray-700">Badges</h3>
      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {badges.map((badge) => (
          <BadgeCard key={badge.id} badge={badge} />
        ))}
      </div>
    </div>
  );
}