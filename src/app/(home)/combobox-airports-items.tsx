import { Command } from 'cmdk';
import { CheckIcon } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '~/components/ui/command';
import { Skeleton } from '~/components/ui/skeleton';
import { useAirports } from '~/hooks/use-airports';
import { cn } from '~/lib/utils';

type Props = {
  value: string;
  onChange: (val: { label: string; skyId: string; entityId: string }) => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const skeletonItems = [
  'skeleton-1',
  'skeleton-2',
  'skeleton-3',
  'skeleton-4',
  'skeleton-5',
];

const strings = {
  empty: 'No airports found.',
};

export const ComboboxAirportsItems = ({
  onChange,
  value,
  setIsOpen,
}: Props) => {
  const { airports, isLoading } = useAirports(value);

  return (
    <>
      {isLoading ? (
        <Command.Loading>
          <div className="space-y-1 p-1">
            {skeletonItems.map((skeleton) => (
              <Skeleton key={skeleton} className="h-6 rounded-sm" />
            ))}
          </div>
        </Command.Loading>
      ) : (
        <CommandEmpty>{strings.empty}</CommandEmpty>
      )}
      <CommandGroup>
        {airports?.map((airport) => (
          <CommandItem
            key={airport.presentation.suggestionTitle}
            value={airport.presentation.suggestionTitle}
            onSelect={() => {
              onChange({
                label: airport.presentation.suggestionTitle,
                entityId: airport.navigation.relevantFlightParams.entityId,
                skyId: airport.navigation.relevantFlightParams.skyId,
              });
              setIsOpen(false);
            }}
          >
            {airport.presentation.suggestionTitle}
            <CheckIcon
              className={cn(
                'ml-auto',
                value === airport.presentation.suggestionTitle
                  ? 'opacity-100'
                  : 'opacity-0'
              )}
            />
          </CommandItem>
        ))}
      </CommandGroup>
    </>
  );
};
