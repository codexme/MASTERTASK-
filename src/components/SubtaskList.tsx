import React from 'react';
import { useTaskStore } from '../store/useTaskStore';
import { Task } from '../types';
import { Plus, Check } from 'lucide-react';

interface SubtaskListProps {
  task: Task;
}

export default function SubtaskList({ task }: SubtaskListProps) {
  const { addSubtask, updateSubtask } = useTaskStore();
  const [newSubtask, setNewSubtask] = React.useState('');

  const handleAddSubtask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubtask.trim()) return;
    
    await addSubtask(task.id, newSubtask);
    setNewSubtask('');
  };

  return (
    <div className="space-y-2">
      <h4 className="font-medium">Subtasks</h4>
      
      <form onSubmit={handleAddSubtask} className="flex gap-2">
        <input
          type="text"
          value={newSubtask}
          onChange={(e) => setNewSubtask(e.target.value)}
          placeholder="Add a subtask..."
          className="flex-1 rounded border border-gray-300 px-3 py-1 text-sm focus:border-blue-500 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded bg-gray-100 px-3 py-1 text-sm hover:bg-gray-200 focus:outline-none"
        >
          <Plus className="h-4 w-4" />
        </button>
      </form>

      <div className="space-y-1">
        {task.subtasks.map((subtask) => (
          <div key={subtask.id} className="flex items-center gap-2">
            <button
              onClick={() => updateSubtask(subtask.id, !subtask.completed)}
              className={`rounded-full p-1 ${
                subtask.completed ? 'bg-green-500 text-white' : 'border border-gray-300'
              }`}
            >
              <Check className="h-3 w-3" />
            </button>
            <span className={subtask.completed ? 'text-gray-500 line-through' : ''}>
              {subtask.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}