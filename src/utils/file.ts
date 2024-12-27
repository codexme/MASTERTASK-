// File handling utilities
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const ALLOWED_FILE_TYPES = {
  'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
  'application/pdf': ['.pdf']
} as const;

export function isValidFileSize(file: File): boolean {
  return file.size <= MAX_FILE_SIZE;
}

export function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || '';
}

export function generateUniqueFileName(file: File): string {
  const ext = getFileExtension(file.name);
  const randomString = Math.random().toString(36).slice(2);
  return `${randomString}.${ext}`;
}