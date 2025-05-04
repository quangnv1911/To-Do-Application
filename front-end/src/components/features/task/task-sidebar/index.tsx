/* eslint-disable @typescript-eslint/no-explicit-any */
import { Calendar, CheckCircle, Clock, Filter, Home, MoreHorizontal, Pencil, Plus, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { FC, useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CategoryCreateDialog } from '../../category/category-create-dialog';
import { CategoryEditDialog } from '../../category/category-edit-dialog';
import { TagCreateDialog } from '../../tag/tag-create-dialog';
import { TagEditDialog } from '../../tag/tag-edit-dialog';
import { DeleteConfirmationDialog } from '@/components/common/delete-confirm';

const mockCategories = [
  { id: '1', name: 'Work', color: 'blue', count: 3 },
  { id: '2', name: 'Personal', color: 'green', count: 2 },
  { id: '3', name: 'Health', color: 'purple', count: 1 },
  { id: '4', name: 'Finance', color: 'yellow', count: 1 },
];

const mockTags = [
  { id: '1', name: 'urgent' },
  { id: '2', name: 'meeting' },
  { id: '3', name: 'shopping' },
  { id: '4', name: 'bills' },
  { id: '5', name: 'appointment' },
];

// Helper function to get the correct color class based on the color name
const getColorClass = (color: string) => {
  const colorMap = {
    blue: 'bg-blue-500 dark:bg-blue-400',
    green: 'bg-green-500 dark:bg-green-400',
    purple: 'bg-purple-500 dark:bg-purple-400',
    yellow: 'bg-yellow-500 dark:bg-yellow-400',
    red: 'bg-red-500 dark:bg-red-400',
    pink: 'bg-pink-500 dark:bg-pink-400',
    indigo: 'bg-indigo-500 dark:bg-indigo-400',
    orange: 'bg-orange-500 dark:bg-orange-400',
  };
  return colorMap[color] || 'bg-gray-500 dark:bg-gray-400';
};

interface TaskSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const TaskSidebar: FC<TaskSidebarProps> = ({ isOpen = false, onClose }) => {
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [showTagDialog, setShowTagDialog] = useState(false);
  const [showCategoryEditDialog, setShowCategoryEditDialog] = useState(false);
  const [showTagEditDialog, setShowTagEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Selected items for editing or deleting
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [selectedTag, setSelectedTag] = useState<any>(null);
  const [deleteType, setDeleteType] = useState<'category' | 'tag'>('category');
  const [deleteItemName, setDeleteItemName] = useState('');

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (isOpen && onClose && window.innerWidth < 640) {
        const target = e.target as HTMLElement;
        if (!target.closest('.sidebar-content') && !target.closest('button[data-toggle-sidebar]')) {
          onClose();
        }
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen, onClose]);

  // Handle category edit
  const handleEditCategory = (category: any) => {
    setSelectedCategory(category);
    setShowCategoryEditDialog(true);
  };

  // Handle tag edit
  const handleEditTag = (tag: any) => {
    setSelectedTag(tag);
    setShowTagEditDialog(true);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = (type: 'category' | 'tag', name: string) => {
    setDeleteType(type);
    setDeleteItemName(name);
    setShowDeleteDialog(true);
  };

  // Handle actual deletion
  const handleDelete = () => {
    // Here you would handle the actual deletion
    // For now, we'll just close the dialog
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 sm:hidden" onClick={onClose} aria-hidden="true" />}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-[280px] border-r shadow-lg bg-white dark:bg-muted dark:text-white transform transition-transform duration-300 ease-in-out sm:relative sm:z-0 sm:translate-x-0 sm:w-[240px] lg:w-[300px] sidebar-content ${
          isOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'
        }`}
      >
        {/* Close button - mobile only */}
        <Button variant="ghost" size="icon" className="absolute right-2 top-2 sm:hidden" onClick={onClose}>
          <X className="h-5 w-5" />
          <span className="sr-only">Đóng sidebar</span>
        </Button>

        <ScrollArea className="h-full">
          <div className="p-4">
            <div className="flex items-center gap-2 py-2">
              <Home className="h-5 w-5" />
              <span className="font-medium">Dashboard</span>
            </div>

            <Separator className="my-4" />

            {/* Views section */}
            <div className="space-y-1">
              <h3 className="mb-2 text-sm font-semibold">Views</h3>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <CheckCircle className="h-4 w-4" />
                All Tasks
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Clock className="h-4 w-4" />
                Today
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Calendar className="h-4 w-4" />
                Upcoming
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Filter className="h-4 w-4" />
                Completed
              </Button>
            </div>

            <Separator className="my-4" />

            {/* Categories section */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">Categories</h3>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setShowCategoryDialog(true)}>
                  <span className="sr-only">Add category</span>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {mockCategories.map((category) => (
                <div key={category.id} className="flex items-center">
                  <Button variant="ghost" className="flex-1 justify-start gap-2">
                    <span className={`h-2 w-2 rounded-full ${getColorClass(category.color)}`} />
                    {category.name}
                    <Badge className="ml-auto">{category.count}</Badge>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={(e) => e.stopPropagation()}>
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">More options for {category.name}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="z-50">
                      <DropdownMenuItem onClick={() => handleEditCategory(category)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteConfirm('category', category.name)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            {/* Tags section */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">Tags</h3>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setShowTagDialog(true)}>
                  <span className="sr-only">Add tag</span>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {mockTags.map((tag) => (
                  <div key={tag.id} className="relative group">
                    <Badge variant="outline" className="bg-background dark:bg-background pr-7">
                      {tag.name}
                    </Badge>
                    <div className="absolute right-1 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center gap-0.5">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0 hover:bg-muted"
                        onClick={() => handleEditTag(tag)}
                      >
                        <Pencil className="h-3 w-3" />
                        <span className="sr-only">Edit {tag.name}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => handleDeleteConfirm('tag', tag.name)}
                      >
                        <Trash2 className="h-3 w-3" />
                        <span className="sr-only">Delete {tag.name}</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Dialogs */}
      <CategoryCreateDialog open={showCategoryDialog} onOpenChange={setShowCategoryDialog} />
      <CategoryEditDialog
        open={showCategoryEditDialog}
        onOpenChange={setShowCategoryEditDialog}
        category={selectedCategory}
      />
      <TagCreateDialog open={showTagDialog} onOpenChange={setShowTagDialog} />
      <TagEditDialog open={showTagEditDialog} onOpenChange={setShowTagEditDialog} tag={selectedTag} />
      <DeleteConfirmationDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        title={`Delete ${deleteType === 'category' ? 'Category' : 'Tag'}`}
        description={`Are you sure you want to delete "${deleteItemName}"? This action cannot be undone.`}
        onConfirm={handleDelete}
      />
    </>
  );
};
