'use client';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Calendar } from '~/components/ui/calendar';
import { FormControl } from '~/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import { cn } from '~/lib/utils';

type Props = {
  value?: Date;
  onChange: (...event: any[]) => void;
  placeholder: string;
  handleDisabled: (date: Date) => boolean;
  disabled?: boolean;
  defaultMonth?: Date;
};

export const FormCalendar = ({
  value,
  onChange,
  placeholder,
  handleDisabled,
  disabled,
  defaultMonth,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            disabled={disabled}
            variant="outline"
            className={cn(
              'pl-3 text-left font-normal w-full',
              !value && 'text-muted-foreground'
            )}
          >
            {value ? format(value, 'PPP') : <span>{placeholder}</span>}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          defaultMonth={defaultMonth}
          mode="single"
          selected={value}
          onSelect={(...props) => {
            onChange(...props);
            setIsOpen(false);
          }}
          disabled={handleDisabled}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
