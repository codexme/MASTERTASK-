import type { Task } from '../types';

export function calculateTaskProgress(task: Task): number {
  if (!task.subtasks.length) return task.completed ? 100 : 0;
  const completedSubtasks = task.subtasks.filter(st => st.completed).length;
  return Math.round((completedSubtasks / task.subtasks.length) * 100);
}

export function sortTasksByDate(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export function isTaskOverdue(task: Task): boolean {
  if (!task.due_date || task.completed) return false;
  return new Date(task.due_date) < new Date();
}

export function getTaskStatus(task: Task): {
  label: string;
  color: string;
} {
  if (task.completed) {
    return { label: 'Completed', color: 'text-green-500' };
  }
  if (isTaskOverdue(task)) {
    return { label: 'Overdue', color: 'text-red-500' };
  }
  if (task.due_date) {
    return { label: 'In Progress', color: 'text-blue-500' };
  }
  return { label: 'No Due Date', color: 'text-gray-500' };
}