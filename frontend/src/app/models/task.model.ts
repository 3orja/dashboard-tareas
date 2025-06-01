export interface Task {
  id?: number;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: Date;
  priority?: 'low' | 'medium' | 'high';
  createdAt?: Date;
}