import type React from 'react';

import { FC, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface CategoryCreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const colorOptions = [
  { value: 'blue', label: 'Blue', bgClass: 'bg-blue-500 dark:bg-blue-400' },
  { value: 'green', label: 'Green', bgClass: 'bg-green-500 dark:bg-green-400' },
  { value: 'red', label: 'Red', bgClass: 'bg-red-500 dark:bg-red-400' },
  { value: 'yellow', label: 'Yellow', bgClass: 'bg-yellow-500 dark:bg-yellow-400' },
  { value: 'purple', label: 'Purple', bgClass: 'bg-purple-500 dark:bg-purple-400' },
  { value: 'pink', label: 'Pink', bgClass: 'bg-pink-500 dark:bg-pink-400' },
  { value: 'indigo', label: 'Indigo', bgClass: 'bg-indigo-500 dark:bg-indigo-400' },
  { value: 'orange', label: 'Orange', bgClass: 'bg-orange-500 dark:bg-orange-400' },
];

export const CategoryCreateDialog: FC<CategoryCreateDialogProps> = ({
  open,
  onOpenChange,
}: CategoryCreateDialogProps) => {
  const [categoryName, setCategoryName] = useState('');
  const [selectedColor, setSelectedColor] = useState('blue');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenChange(false);
    setCategoryName('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription>Create a new category to organize your tasks.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="categoryName">Category Name</Label>
              <Input
                id="categoryName"
                placeholder="Enter category name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Color</Label>
              <RadioGroup value={selectedColor} onValueChange={setSelectedColor} className="grid grid-cols-4 gap-2">
                {colorOptions.map((color) => (
                  <div key={color.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={color.value} id={`color-${color.value}`} className="sr-only" />
                    <Label
                      htmlFor={`color-${color.value}`}
                      className="flex cursor-pointer items-center space-x-2 rounded-md border p-2 hover:bg-muted"
                    >
                      <span className={`h-4 w-4 rounded-full ${color.bgClass}`} />
                      <span className="text-sm">{color.label}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Category</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
