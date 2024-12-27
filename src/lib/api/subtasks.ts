import { supabase } from '../supabase';

export async function createSubtask(taskId: string, title: string) {
  const { data, error } = await supabase
    .from('subtasks')
    .insert({ task_id: taskId, title })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateSubtask(id: string, completed: boolean) {
  const { error } = await supabase
    .from('subtasks')
    .update({ completed })
    .eq('id', id);

  if (error) throw error;
}