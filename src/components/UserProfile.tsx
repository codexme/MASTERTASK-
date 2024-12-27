import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Trophy } from 'lucide-react';
import BadgeList from './badges/BadgeList';

export default function UserProfile() {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">{user.email}</h2>
          <div className="mt-1 flex items-center gap-2">
            <Trophy className="h-4 w-4 text-yellow-500" />
            <span className="text-sm text-gray-600">{user.points} points</span>
          </div>
        </div>
      </div>

      <BadgeList badges={user.badges} />
    </div>
  );
}