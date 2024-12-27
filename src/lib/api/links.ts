import { supabase } from '../supabase';

export async function createLink(taskId: string, url: string, title: string) {
  const { data, error } = await supabase
    .from('links')
    .insert({ task_id: taskId, url, title })
    .select()
    .single();

  if (error) throw error;
  return data;
}