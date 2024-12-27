import React from 'react';
import { useTaskStore } from '../../store/useTaskStore';
import { Task } from '../../types';
import LinkForm from './LinkForm';
import LinkItem from './LinkItem';

interface LinkListProps {
  task: Task;
}

export default function LinkList({ task }: LinkListProps) {
  const { addLink } = useTaskStore();

  const handleAddLink = async (url: string, title: string) => {
    await addLink(task.id, url, title);
  };

  return (
    <div className="space-y-2">
      <h4 className="font-medium">Links</h4>
      <LinkForm onSubmit={handleAddLink} />
      <div className="space-y-1">
        {task.links.map((link) => (
          <LinkItem key={link.id} link={link} />
        ))}
      </div>
    </div>
  );
}