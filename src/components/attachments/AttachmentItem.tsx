import React from 'react';
import { File } from 'lucide-react';
import type { Attachment } from '../../types';

interface AttachmentItemProps {
  attachment: Attachment;
}

export default function AttachmentItem({ attachment }: AttachmentItemProps) {
  return (
    <a
      href={attachment.file_url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 rounded border border-gray-200 p-2 hover:bg-gray-50"
    >
      <File className="h-4 w-4 text-gray-400" />
      <span className="text-sm truncate">{attachment.file_name}</span>
    </a>
  );
}