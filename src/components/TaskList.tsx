import React from 'react';
import { useTaskStore } from '../store/useTaskStore';
import TaskItem from './TaskItem';
import { Plus } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function TaskList() {
  const { tasks, loading, error, addTask } = useTaskStore();
  const [newTaskTitle, setNewTaskTitle] = React.useState('');

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    
    try {
      await addTask({
        title: newTaskTitle,
        description: '',
        completed: false,
      });
      setNewTaskTitle('');
    } catch (err) {
      toast.error('Failed to add task');
    }
  };

  if (error) {
    return (
      <div className="flex justify-center p-8">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="text-gray-500">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleAddTask} className="flex gap-2">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
        >
          <Plus className="h-5 w-5" />
        </button>
      </form>
      
      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
        {tasks.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No tasks yet. Add your first task above!
          </div>
        )}
      </div>
    </div>
  );
}