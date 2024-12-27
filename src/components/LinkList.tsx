import React from 'react';
import { useTaskStore } from '../store/useTaskStore';
import { Task } from '../types';
import { Link as LinkIcon, Plus } from 'lucide-react';

interface LinkListProps {
  task: Task;
}

export default function LinkList({ task }: LinkListProps) {
  const { addLink } = useTaskStore();
  const [url, setUrl] = React.useState('');
  const [title, setTitle] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || !title.trim()) return;

    await addLink(task.id, url, title);
    setUrl('');
    setTitle('');
  };

  return (
    <div className="space-y-2">
      <h4 className="font-medium">Links</h4>

      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Link title..."
          className="w-full rounded border border-gray-300 px-3 py-1 text-sm focus:border-blue-500 focus:outline-none"
        />
        <div className="flex gap-2">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://..."
            className="flex-1 rounded border border-gray-300 px-3 py-1 text-sm focus:border-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            className="rounded bg-gray-100 px-3 py-1 text-sm hover:bg-gray-200 focus:outline-none"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </form>

      <div className="space-y-1">
        {task.links.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded border border-gray-200 p-2 hover:bg-gray-50"
          >
            <LinkIcon className="h-4 w-4 text-gray-400" />
            <span className="text-sm">{link.title}</span>
          </a>
        ))}
      </div>
    </div>
  );
}