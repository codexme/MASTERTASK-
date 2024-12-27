import { supabase } from '../supabase';
import { uploadFile } from './storage';
import type { Attachment } from '../../types';

export async function createAttachment(
  taskId: string,
  fileName: string,
  fileUrl: string,
  fileType: string
): Promise<Attachment> {
  const { data, error } = await supabase
    .from('attachments')
    .insert({
      task_id: taskId,
      file_name: fileName,
      file_url: fileUrl,
      file_type: fileType,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function addTaskAttachment(taskId: string, file: File): Promise<Attachment> {
  const publicUrl = await uploadFile(file);
  
  return createAttachment(
    taskId,
    file.name,
    publicUrl,
    file.type
  );
}