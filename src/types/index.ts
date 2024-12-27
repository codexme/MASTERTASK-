export interface User {
  id: string;
  email: string;
  points: number;
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  completed_at?: string;
  due_date?: string;
  user_id: string;
  attachments: Attachment[];
  links: Link[];
  subtasks: Subtask[];
  points: number;
  created_at: string;
  updated_at: string;
}

export interface Subtask {
  id: string;
  task_id: string;
  title: string;
  completed: boolean;
}

export interface Attachment {
  id: string;
  task_id: string;
  file_name: string;
  file_url: string;
  file_type: string;
}

export interface Link {
  id: string;
  task_id: string;
  url: string;
  title: string;
}