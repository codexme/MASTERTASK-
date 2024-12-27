import { supabase } from '../supabase';
import { generateUniqueFileName } from '../../utils/file';

const BUCKET_NAME = 'attachments';

export async function uploadFile(file: File): Promise<string> {
  try {
    const fileName = generateUniqueFileName(file);
    
    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, file);

    if (uploadError) {
      console.error('Upload error:', uploadError);
      throw new Error('Failed to upload file');
    }
    
    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName);

    return publicUrl;
  } catch (error) {
    console.error('Storage error:', error);
    throw new Error('Failed to process file');
  }
}