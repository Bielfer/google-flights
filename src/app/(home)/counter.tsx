import { MinusIcon, PlusIcon } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';

type Props = {
  className?: string;
  title: string;
  description?: string;
  min?: number;
  max?: number;
  value: number;
  onChange: (val: number) => void;
  onBlur: () => void;
};

export const Counter = ({
  className,
  title,
  description,
  min = 0,
  max = 99,
  value,
  onChange,
  onBlur,
}: Props) => {
  const isRemoveDisabled = value - 1 < min;
  const isAddDisabled = value + 1 > max;

  const handleRemoveOne = () => {
    if (isRemoveDisabled) return;

    onChange(value - 1);
  };

  const handleAddOne = () => {
    if (isAddDisabled) return;

    onChange(value + 1);
  };

  return (
    <div className={cn('flex items-center justify-between', className)}>
      <div>
        <p className="font-medium">{title}</p>
        {!!description && (
          <p className="text-xs text-slate-500">{description}</p>
        )}
      </div>

      <div className="flex items-center gap-x-3">
        <Button
          disabled={isRemoveDisabled}
          variant="outline"
          className="size-8"
          onClick={handleRemoveOne}
          onBlur={onBlur}
        >
          <MinusIcon />
        </Button>
        <p>{value}</p>
        <Button
          disabled={isAddDisabled}
          variant="outline"
          className="size-8"
          onClick={handleAddOne}
          onBlur={onBlur}
        >
          <PlusIcon />
        </Button>
      </div>
    </div>
  );
};
