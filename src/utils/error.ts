// Centralized error handling utilities
export function handleApiError(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'An unexpected error occurred';
}

export function isApiError(error: unknown): error is Error {
  return error instanceof Error;
}