import { SearchXIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '~/components/ui/button';
import { routes } from '~/lib/routes';

type Props = {
  className?: string;
};

const strings = {
  noFlights: {
    title: 'No flights available',
    description:
      'These destinations have no available flights on the date you provided. You should try other destinations or dates.',
    button: 'Try again',
  },
};

export const NoFlights = ({ className }: Props) => {
  return (
    <div className="mx-auto max-w-sm pt-16 text-center">
      <SearchXIcon className="mx-auto size-12 text-slate-400" />
      <h3 className="mt-2 text-sm font-semibold text-slate-900">
        {strings.noFlights.title}
      </h3>
      <p className="mt-1 text-sm text-slate-500">
        {strings.noFlights.description}
      </p>
      <div className="mt-6">
        <Button asChild>
          <Link href={routes.home}>{strings.noFlights.title}</Link>
        </Button>
      </div>
    </div>
  );
};
