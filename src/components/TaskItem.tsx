import React from 'react';
import { useTaskStore } from '../store/useTaskStore';
import { Task } from '../types';
import { Check, Paperclip, Link as LinkIcon, ChevronDown, ChevronUp } from 'lucide-react';
import SubtaskList from './SubtaskList';
import AttachmentList from './AttachmentList';
import LinkList from './LinkList';

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const { updateTask } = useTaskStore();
  const [expanded, setExpanded] = React.useState(false);

  const progress = task.subtasks.length
    ? Math.round((task.subtasks.filter(st => st.completed).length / task.subtasks.length) * 100)
    : 0;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={() => updateTask(task.id, { completed: !task.completed })}
          className={`rounded-full p-1 ${
            task.completed ? 'bg-green-500 text-white' : 'border border-gray-300'
          }`}
        >
          <Check className="h-4 w-4" />
        </button>
        
        <div className="flex-1">
          <h3 className={`font-medium ${task.completed ? 'text-gray-500 line-through' : ''}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className="mt-1 text-sm text-gray-600">{task.description}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {task.attachments.length > 0 && (
            <Paperclip className="h-4 w-4 text-gray-400" />
          )}
          {task.links.length > 0 && (
            <LinkIcon className="h-4 w-4 text-gray-400" />
          )}
          <button
            onClick={() => setExpanded(!expanded)}
            className="rounded p-1 hover:bg-gray-100"
          >
            {expanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {task.subtasks.length > 0 && (
        <div className="mt-2">
          <div className="h-2 rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-blue-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {expanded && (
        <div className="mt-4 space-y-4">
          <SubtaskList task={task} />
          <AttachmentList task={task} />
          <LinkList task={task} />
        </div>
      )}
    </div>
  );
}