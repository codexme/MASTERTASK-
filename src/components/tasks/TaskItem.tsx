import React from 'react';
import { useTaskStore } from '../../store/useTaskStore';
import { Task } from '../../types';
import { Check, Paperclip, Link as LinkIcon, ChevronDown, ChevronUp, Trash2, Clock } from 'lucide-react';
import SubtaskList from '../SubtaskList';
import AttachmentList from '../attachments/AttachmentList';
import LinkList from '../links/LinkList';
import { calculateTaskProgress } from '../../utils/task';
import { formatDueDate } from '../../utils/date';
import { toast } from 'react-hot-toast';

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const { updateTask, deleteTask } = useTaskStore();
  const [expanded, setExpanded] = React.useState(false);

  const handleToggleComplete = async () => {
    try {
      await updateTask(task.id, { completed: !task.completed });
      toast.success(task.completed ? 'Task uncompleted' : 'Task completed');
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    try {
      await deleteTask(task.id);
      toast.success('Task deleted');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const progress = calculateTaskProgress(task);
  const isOverdue = task.due_date && new Date(task.due_date) < new Date() && !task.completed;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={handleToggleComplete}
          className={`rounded-full p-1.5 transition-colors ${
            task.completed ? 'bg-green-500 text-white' : 'border border-gray-300 hover:bg-gray-50'
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
          <div className="mt-1 flex items-center gap-3 text-xs">
            <span className="text-gray-500">
              Created {new Date(task.created_at).toLocaleString()}
            </span>
            {task.due_date && (
              <span className={`flex items-center gap-1 ${isOverdue ? 'text-red-500 font-medium' : 'text-gray-500'}`}>
                <Clock className="h-3 w-3" />
                Due {formatDueDate(task.due_date)}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {task.attachments.length > 0 && (
            <div className="flex items-center gap-1 text-gray-500">
              <Paperclip className="h-4 w-4" />
              <span className="text-xs">{task.attachments.length}</span>
            </div>
          )}
          {task.links.length > 0 && (
            <div className="flex items-center gap-1 text-gray-500">
              <LinkIcon className="h-4 w-4" />
              <span className="text-xs">{task.links.length}</span>
            </div>
          )}
          <button
            onClick={handleDelete}
            className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-red-500"
            title="Delete task"
          >
            <Trash2 className="h-4 w-4" />
          </button>
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
          <div className="mt-1 text-xs text-gray-500 text-right">
            {progress}% complete
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