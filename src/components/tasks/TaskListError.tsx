import React from 'react';

interface TaskListErrorProps {
  error: string;
}

export default function TaskListError({ error }: TaskListErrorProps) {
  return (
    <div className="flex justify-center p-8">
      <div className="text-red-500">{error}</div>
    </div>
  );
}