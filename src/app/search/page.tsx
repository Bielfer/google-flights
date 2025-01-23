import { format } from 'date-fns';
import { PlaneLandingIcon, PlaneTakeoffIcon } from 'lucide-react';
import { type Metadata } from 'next';
import Link from 'next/link';
import { Button } from '~/components/ui/button';
import { searchFlights } from '~/getters/flights';
import { SearchParams } from '~/lib/types';
import { cn, formatBuyTicketsUrl, formatPrice } from '~/lib/utils';
import { NoFlights } from './no-flights';

export const metadata: Metadata = {
  title: 'Search',
  description: 'In this page you can see the best results for your search',
};

type Props = {
  searchParams: Promise<SearchParams>;
};

const strings = {
  logo: 'logo',
  buyNow: 'Buy now',
  roundTrip: 'Round trip to',
  oneWay: 'Flight to',
};

const PageSearch = async ({ searchParams }: Props) => {
  const awaitedParams = await searchParams;

  const flights = await searchFlights(awaitedParams);

  if (flights.length === 0) return <NoFlights />;

  const cityDestinationName = flights[0].legs[0].destination.city;
  const isRoundTrip = !!awaitedParams.returnDate;

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-2xl px-4 py-16 md:px-6 lg:px-8">
        <h1 className="mb-10 text-center text-4xl font-semibold">
          {`${isRoundTrip ? strings.roundTrip : strings.oneWay} ${cityDestinationName}`}
        </h1>

        <div className="flex flex-col gap-y-6">
          {flights.map((flight) => {
            const linkToCarrier = flight.pricingOptions?.[0].items?.[0].url;

            return (
              <div
                key={flight.id}
                className="flex flex-col items-center rounded-md bg-white shadow sm:flex-row sm:p-6"
              >
                <div className="grow space-y-6 py-6 sm:py-0">
                  {flight.legs.map((leg, legIdx) => (
                    <div
                      key={leg.id}
                      className={cn(
                        'flex flex-col gap-6 pr-6 sm:flex-row sm:items-center sm:justify-between',
                        legIdx > 0 && 'sm:justify-end'
                      )}
                    >
                      <img
                        src={leg.carriers.marketing[0].logoUrl}
                        alt={`${leg.carriers.marketing[0].name} ${strings.logo}`}
                        className={cn(
                          'size-12 object-cover object-center',
                          legIdx > 0 && 'hidden'
                        )}
                      />
                      <div className="flex items-center gap-x-5">
                        <div className="text-right">
                          <p className="text-xs text-slate-600">
                            {format(new Date(leg.departure), 'dd/MM')}
                          </p>
                          <p className="text-lg">
                            {format(new Date(leg.departure), 'H:mm')}
                          </p>
                          <p className="text-sm text-slate-600">
                            {leg.origin.displayCode}
                          </p>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <PlaneTakeoffIcon className="size-4 text-slate-400" />
                          <div className="h-px w-10 bg-slate-300" />
                          <PlaneLandingIcon className="size-4 text-slate-400" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-600">
                            {format(new Date(leg.arrival), 'dd/MM')}
                          </p>
                          <p className="text-lg">
                            {format(new Date(leg.arrival), 'H:mm')}
                          </p>
                          <p className="text-sm text-slate-600">
                            {leg.destination.displayCode}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex w-full shrink-0 items-center justify-end gap-x-6 gap-y-4 border-t p-6 sm:w-auto sm:flex-col sm:border-l sm:border-t-0">
                  <p className="text-center text-xl">
                    {formatPrice(flight.price.raw)}
                  </p>

                  {!!linkToCarrier && (
                    <Button asChild>
                      <Link
                        href={formatBuyTicketsUrl(linkToCarrier)}
                        prefetch={false}
                        target="_blank"
                      >
                        {strings.buyNow}
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default PageSearch;
