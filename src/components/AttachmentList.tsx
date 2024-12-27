import React from 'react';
import { useTaskStore } from '../store/useTaskStore';
import { Task } from '../types';
import { useDropzone } from 'react-dropzone';
import { File, Upload } from 'lucide-react';

interface AttachmentListProps {
  task: Task;
}

export default function AttachmentList({ task }: AttachmentListProps) {
  const { addAttachment } = useTaskStore();
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: async (files) => {
      for (const file of files) {
        await addAttachment(task.id, file);
      }
    },
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'application/pdf': ['.pdf']
    }
  });

  return (
    <div className="space-y-2">
      <h4 className="font-medium">Attachments</h4>
      
      <div
        {...getRootProps()}
        className={`rounded border-2 border-dashed p-4 text-center transition-colors ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-6 w-6 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          Drop files here or click to upload
        </p>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {task.attachments.map((attachment) => (
          <a
            key={attachment.id}
            href={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/attachments/${attachment.file_url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded border border-gray-200 p-2 hover:bg-gray-50"
          >
            <File className="h-4 w-4 text-gray-400" />
            <span className="text-sm truncate">{attachment.file_name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}