import { Bell, Moon, Plus, Search, Sun, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FC } from 'react';
import themeStore from '@/stores/themeState';

interface TaskHeaderProps {
  onCreateTask: () => void;
}

export const TaskHeader: FC<TaskHeaderProps> = ({ onCreateTask }: TaskHeaderProps) => {
  const { setTheme, theme } = themeStore();
  return (
    <header className="sticky top-0 z-10 border-b bg-background px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">Task Manager</h1>
          <div className="hidden md:block">
            <div className="relative ml-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search tasks..." className="w-[200px] pl-8 md:w-[300px]" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={onCreateTask} size="sm" className="gap-1">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Task</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-800 p-2 rounded-full transition"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            <Sun className="h-6 w-6 dark:hidden" />
            <Moon className="h-6 w-6  hidden dark:block" />
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="mt-2 md:hidden">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search tasks..." className="w-full pl-8" />
        </div>
      </div>
    </header>
  );
};
