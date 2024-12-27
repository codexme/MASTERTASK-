// Authentication validation utilities
export function validatePassword(password: string): string | null {
  if (password.length < 8) {
    return 'Password must be at least 8 characters long';
  }
  
  if (!/\d/.test(password)) {
    return 'Password must contain at least one number';
  }
  
  if (!/[a-zA-Z]/.test(password)) {
    return 'Password must contain at least one letter';
  }
  
  return null;
}

export function validateEmail(email: string): string | null {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  return null;
}

export function validateName(name: string): string | null {
  if (name.trim().length < 2) {
    return 'Name must be at least 2 characters long';
  }
  return null;
}