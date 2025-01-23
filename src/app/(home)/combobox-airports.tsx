import { ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { Button } from '~/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import { ComboboxAirportsItems } from './combobox-airports-items';
import { cn } from '~/lib/utils';
import { Command, CommandInput, CommandList } from '~/components/ui/command';

type Props = {
  className?: string;
  onChange: (val: { label: string; skyId: string; entityId: string }) => void;
  formValue: string;
};

const strings = {
  placeholder: 'Search for airport',
};

export const ComboboxAirports = ({ className, formValue, onChange }: Props) => {
  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          className={cn('justify-between', className)}
        >
          <p className="truncate">{formValue || strings.placeholder}</p>
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-52 p-0" align="start">
        <Command>
          <CommandInput
            value={value}
            onValueChange={(val) => setValue(val)}
            placeholder={strings.placeholder}
            className="h-9"
          />
          <CommandList>
            <ComboboxAirportsItems
              onChange={onChange}
              setIsOpen={setIsOpen}
              value={value}
            />
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
