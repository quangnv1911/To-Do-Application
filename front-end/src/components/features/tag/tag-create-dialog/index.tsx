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
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface TagCreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TagCreateDialog: FC<TagCreateDialogProps> = ({ open, onOpenChange }: TagCreateDialogProps) => {
  const [tagName, setTagName] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const handleAddTag = () => {
    if (tagName.trim() && !tags.includes(tagName.trim())) {
      setTags([...tags, tagName.trim()]);
      setTagName('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the actual tag creation
    // For now, we'll just close the dialog
    onOpenChange(false);
    setTags([]);
    setTagName('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Tags</DialogTitle>
          <DialogDescription>Create new tags to categorize your tasks.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="tagName">Tag Name</Label>
              <div className="flex space-x-2">
                <Input
                  id="tagName"
                  placeholder="Enter tag name"
                  value={tagName}
                  onChange={(e) => setTagName(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <Button type="button" onClick={handleAddTag} disabled={!tagName.trim()}>
                  Add
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Press Enter to add multiple tags quickly</p>
            </div>

            {tags.length > 0 && (
              <div className="space-y-2">
                <Label>Added Tags</Label>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 rounded-full hover:bg-muted"
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove {tag}</span>
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={tags.length === 0}>
              Save Tags
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
