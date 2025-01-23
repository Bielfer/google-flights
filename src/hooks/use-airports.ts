import useSWR from 'swr';
import { getAirportsAction } from '~/actions/flights';

export const useAirports = (query: string) => {
  const { data, error, isLoading } = useSWR(
    query.length > 0 ? `/airports/${query}` : null,
    () => getAirportsAction(query),
    { dedupingInterval: 10000, focusThrottleInterval: 10000 }
  );

  return {
    airports: data,
    isLoading,
    isError: error,
  };
};
