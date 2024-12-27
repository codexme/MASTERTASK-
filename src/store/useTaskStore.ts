import { create } from 'zustand';
import type { Task } from '../types';
import * as tasksApi from '../lib/api/tasks';
import * as subtasksApi from '../lib/api/subtasks';
import * as linksApi from '../lib/api/links';
import * as attachmentsApi from '../lib/api/attachments';

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  addTask: (task: Partial<Task>) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  addSubtask: (taskId: string, title: string) => Promise<void>;
  updateSubtask: (id: string, completed: boolean) => Promise<void>;
  addLink: (taskId: string, url: string, title: string) => Promise<void>;
  addAttachment: (taskId: string, file: File) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  loading: false,
  error: null,

  fetchTasks: async () => {
    set({ loading: true, error: null });
    try {
      const tasks = await tasksApi.fetchTasks();
      set({ tasks, loading: false });
    } catch (error) {
      console.error('Error fetching tasks:', error);
      set({ error: 'Failed to fetch tasks', loading: false });
    }
  },

  addTask: async (task) => {
    set({ error: null });
    try {
      const newTask = await tasksApi.createTask(task);
      set({ tasks: [{ ...newTask, subtasks: [], links: [], attachments: [] }, ...get().tasks] });
    } catch (error) {
      console.error('Error adding task:', error);
      set({ error: 'Failed to add task' });
      throw error;
    }
  },

  updateTask: async (id, updates) => {
    set({ error: null });
    try {
      await tasksApi.updateTask(id, updates);
      set({
        tasks: get().tasks.map((task) =>
          task.id === id ? { ...task, ...updates } : task
        ),
      });
    } catch (error) {
      console.error('Error updating task:', error);
      set({ error: 'Failed to update task' });
      throw error;
    }
  },

  deleteTask: async (id) => {
    set({ error: null });
    try {
      await tasksApi.deleteTask(id);
      set({ tasks: get().tasks.filter((task) => task.id !== id) });
    } catch (error) {
      console.error('Error deleting task:', error);
      set({ error: 'Failed to delete task' });
      throw error;
    }
  },

  addSubtask: async (taskId, title) => {
    set({ error: null });
    try {
      const newSubtask = await subtasksApi.createSubtask(taskId, title);
      set({
        tasks: get().tasks.map((task) =>
          task.id === taskId
            ? { ...task, subtasks: [...task.subtasks, newSubtask] }
            : task
        ),
      });
    } catch (error) {
      console.error('Error adding subtask:', error);
      set({ error: 'Failed to add subtask' });
      throw error;
    }
  },

  updateSubtask: async (id, completed) => {
    set({ error: null });
    try {
      await subtasksApi.updateSubtask(id, completed);
      set({
        tasks: get().tasks.map((task) => ({
          ...task,
          subtasks: task.subtasks.map((st) =>
            st.id === id ? { ...st, completed } : st
          ),
        })),
      });
    } catch (error) {
      console.error('Error updating subtask:', error);
      set({ error: 'Failed to update subtask' });
      throw error;
    }
  },

  addLink: async (taskId, url, title) => {
    set({ error: null });
    try {
      const newLink = await linksApi.createLink(taskId, url, title);
      set({
        tasks: get().tasks.map((task) =>
          task.id === taskId
            ? { ...task, links: [...task.links, newLink] }
            : task
        ),
      });
    } catch (error) {
      console.error('Error adding link:', error);
      set({ error: 'Failed to add link' });
      throw error;
    }
  },

  addAttachment: async (taskId, file) => {
    set({ error: null });
    try {
      const newAttachment = await attachmentsApi.addTaskAttachment(taskId, file);
      set({
        tasks: get().tasks.map((task) =>
          task.id === taskId
            ? { ...task, attachments: [...task.attachments, newAttachment] }
            : task
        ),
      });
    } catch (error) {
      console.error('Error adding attachment:', error);
      set({ error: 'Failed to add attachment' });
      throw error;
    }
  },
}));