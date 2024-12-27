import React from 'react';
import { Plus } from 'lucide-react';

interface LinkFormProps {
  onSubmit: (url: string, title: string) => Promise<void>;
}

export default function LinkForm({ onSubmit }: LinkFormProps) {
  const [url, setUrl] = React.useState('');
  const [title, setTitle] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || !title.trim()) return;

    await onSubmit(url, title);
    setUrl('');
    setTitle('');
  };

  return (
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
  );
}