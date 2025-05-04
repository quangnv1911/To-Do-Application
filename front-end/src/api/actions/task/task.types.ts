export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: string;
  dueDate: string;
  category: string;
  tags: string[];
}
