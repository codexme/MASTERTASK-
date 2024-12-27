import { supabase } from '../supabase';
import { DEMO_USER_ID } from '../constants';
import type { Task } from '../../types';

export async function fetchTasks() {
  const { data, error } = await supabase
    .from('tasks')
    .select(`
      *,
      subtasks(*),
      links(*),
      attachments(*)
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createTask(task: Partial<Task>) {
  const { data, error } = await supabase
    .from('tasks')
    .insert({ ...task, user_id: DEMO_USER_ID })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateTask(id: string, updates: Partial<Task>) {
  const { error } = await supabase
    .from('tasks')
    .update(updates)
    .eq('id', id);

  if (error) throw error;
}

export async function deleteTask(id: string) {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id);

  if (error) throw error;
}