import React from 'react';
import { useTaskStore } from '../../store/useTaskStore';
import TaskItem from './TaskItem';
import TaskListEmpty from './TaskListEmpty';
import TaskListError from './TaskListError';
import TaskListLoading from './TaskListLoading';
import CreateTaskDialog from './CreateTaskDialog';
import { Plus, ListTodo } from 'lucide-react';

export default function TaskList() {
  const { tasks, loading, error } = useTaskStore();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  if (error) return <TaskListError error={error} />;
  if (loading) return <TaskListLoading />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ListTodo className="h-5 w-5 text-blue-500" />
          <h2 className="text-lg font-semibold text-gray-900">My Tasks</h2>
          <span className="ml-2 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
            {tasks.length}
          </span>
        </div>
        <button
          onClick={() => setIsDialogOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Task
        </button>
      </div>

      <CreateTaskDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />

      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
        {tasks.length === 0 && <TaskListEmpty />}
      </div>
    </div>
  );
}