import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { FC, useState } from 'react';

interface SelectDateProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export const SelectDate: FC<SelectDateProps> = ({ date, setDate }: SelectDateProps) => {
  const [calendarOpen, setCalendarOpen] = useState(false);

  return (
    <Popover modal open={calendarOpen} onOpenChange={() => setCalendarOpen(true)}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            'w-full flex items-center h-[36] px-4 py-2 rounded-md border border-neutral-200 bg-white text-neutral-950 shadow-sm',
            'hover:bg-accent hover:text-accent-foreground transition-colors',
            'text-sm border-opacity-50',
            !date && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          <span className="flex-grow text-left">{date ? date.toLocaleDateString() : 'Chọn ngày'}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          className="rounded-md border"
          mode="single"
          selected={date}
          onSelect={(newDate) => {
            setDate(newDate);
            setCalendarOpen(false);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
