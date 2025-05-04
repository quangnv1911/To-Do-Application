import { Task } from '@/api/actions/task/task.types';
import { FC, useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TaskHeader } from '../task-header';
import { TaskSidebar } from '../task-sidebar';
import { TaskList } from '../task-list';
import { TaskCreateDialog } from '../task-create-dialog';

export const TaskDashboard: FC = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock data - this would normally come from your backend
  const mockTasks: Task[] = [
    {
      id: '1',
      title: 'Complete project proposal',
      description: 'Draft the initial project proposal with timeline and budget',
      completed: false,
      priority: 'high',
      dueDate: '2023-12-15',
      category: 'work',
      tags: ['proposal', 'urgent'],
    },
    {
      id: '2',
      title: 'Buy groceries',
      description: 'Milk, eggs, bread, and vegetables',
      completed: true,
      priority: 'medium',
      dueDate: '2023-12-10',
      category: 'personal',
      tags: ['shopping'],
    },
    {
      id: '3',
      title: 'Schedule dentist appointment',
      description: "Call Dr. Smith's office for a checkup",
      completed: false,
      priority: 'low',
      dueDate: '2023-12-20',
      category: 'health',
      tags: ['appointment'],
    },
    {
      id: '4',
      title: 'Prepare presentation slides',
      description: 'Create slides for the quarterly review meeting',
      completed: false,
      priority: 'high',
      dueDate: '2023-12-14',
      category: 'work',
      tags: ['meeting', 'presentation'],
    },
    {
      id: '5',
      title: 'Pay utility bills',
      description: 'Electricity, water, and internet bills',
      completed: false,
      priority: 'medium',
      dueDate: '2023-12-25',
      category: 'finance',
      tags: ['bills', 'monthly'],
    },
  ];

  return (
    <div className="flex h-screen flex-col">
      <TaskHeader onCreateTask={() => setShowCreateDialog(true)} />
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile sidebar toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-4 z-30 sm:hidden"
          onClick={() => setSidebarOpen(true)}
          data-toggle-sidebar
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Mở menu</span>
        </Button>

        <TaskSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="sm:hidden h-8"></div> {/* Spacing for mobile toggle button */}
          <TaskList tasks={mockTasks} />
        </main>
      </div>
      <TaskCreateDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
    </div>
  );
};
