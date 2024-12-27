import React from 'react';
import { X, Paperclip, Link as LinkIcon } from 'lucide-react';
import { useTaskStore } from '../../store/useTaskStore';
import AttachmentUploader from '../attachments/AttachmentUploader';
import LinkForm from '../links/LinkForm';

interface CreateTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateTaskDialog({ isOpen, onClose }: CreateTaskDialogProps) {
  const { addTask } = useTaskStore();
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [dueDate, setDueDate] = React.useState('');
  const [showAttachments, setShowAttachments] = React.useState(false);
  const [showLinks, setShowLinks] = React.useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await addTask({
        title,
        description,
        due_date: dueDate || undefined,
        completed: false,
      });
      
      // Reset form and close dialog
      setTitle('');
      setDescription('');
      setDueDate('');
      onClose();
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Create New Task</h2>
          <button
            onClick={onClose}
            className="rounded p-1 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Due Date */}
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
              Due Date *
            </label>
            <input
              type="datetime-local"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Optional Sections */}
          <div className="space-y-4">
            {/* Attachments Section */}
            <div>
              <button
                type="button"
                onClick={() => setShowAttachments(!showAttachments)}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
              >
                <Paperclip className="h-4 w-4" />
                Add Attachments (Optional)
              </button>
              {showAttachments && (
                <div className="mt-2">
                  <AttachmentUploader taskId="" />
                </div>
              )}
            </div>

            {/* Links Section */}
            <div>
              <button
                type="button"
                onClick={() => setShowLinks(!showLinks)}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
              >
                <LinkIcon className="h-4 w-4" />
                Add Links (Optional)
              </button>
              {showLinks && (
                <div className="mt-2">
                  <LinkForm onSubmit={() => {}} />
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}