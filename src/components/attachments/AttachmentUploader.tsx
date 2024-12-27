import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { ALLOWED_FILE_TYPES, isValidFileSize } from '../../utils/file';

interface AttachmentUploaderProps {
  onUpload: (files: File[]) => Promise<void>;
}

export default function AttachmentUploader({ onUpload }: AttachmentUploaderProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: async (files) => {
      const validFiles = files.filter(file => {
        if (!isValidFileSize(file)) {
          console.warn(`File ${file.name} exceeds size limit`);
          return false;
        }
        return true;
      });
      
      if (validFiles.length > 0) {
        await onUpload(validFiles);
      }
    },
    accept: ALLOWED_FILE_TYPES
  });

  return (
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
      <p className="mt-1 text-xs text-gray-500">
        Maximum file size: 5MB
      </p>
    </div>
  );
}