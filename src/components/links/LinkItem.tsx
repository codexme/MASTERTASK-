import React from 'react';
import { Link as LinkIcon } from 'lucide-react';
import { Link } from '../../types';

interface LinkItemProps {
  link: Link;
}

export default function LinkItem({ link }: LinkItemProps) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 rounded border border-gray-200 p-2 hover:bg-gray-50"
    >
      <LinkIcon className="h-4 w-4 text-gray-400" />
      <span className="text-sm">{link.title}</span>
    </a>
  );
}