export function validateTaskInput(title: string, dueDate: string | null): string | null {
  if (!title.trim()) {
    return 'Title is required';
  }

  if (dueDate) {
    const dueDateTime = new Date(dueDate);
    if (dueDateTime < new Date()) {
      return 'Due date cannot be in the past';
    }
  }

  return null;
}

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isValidFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.some(type => file.type.startsWith(type));
};

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const isValidFileSize = (file: File): boolean => {
  return file.size <= MAX_FILE_SIZE;
};