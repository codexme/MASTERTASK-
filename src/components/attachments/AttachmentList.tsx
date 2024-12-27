import React from 'react';
import { useTaskStore } from '../../store/useTaskStore';
import { Task } from '../../types';
import { toast } from 'react-hot-toast';
import AttachmentUploader from './AttachmentUploader';
import AttachmentItem from './AttachmentItem';

interface AttachmentListProps {
  task: Task;
}

export default function AttachmentList({ task }: AttachmentListProps) {
  const { addAttachment } = useTaskStore();
  
  const handleUpload = async (files: File[]) => {
    try {
      for (const file of files) {
        await addAttachment(task.id, file);
      }
      toast.success('Files uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload files');
    }
  };

  return (
    <div className="space-y-2">
      <h4 className="font-medium">Attachments</h4>
      <AttachmentUploader onUpload={handleUpload} />
      <div className="grid gap-2 sm:grid-cols-2">
        {task.attachments.map((attachment) => (
          <AttachmentItem 
            key={attachment.id} 
            attachment={attachment} 
          />
        ))}
      </div>
    </div>
  );
}