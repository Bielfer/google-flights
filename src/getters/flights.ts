import queryString from 'query-string';
import { apiBaseUrl } from '~/lib/constants';
import { SearchFlight, SearchParams } from '~/lib/types';

const key = process.env.RAPID_API_KEY!;

export const searchFlights = async (queryParams: SearchParams) => {
  const url = queryString.stringifyUrl({
    url: `${apiBaseUrl}/searchFlightsWebComplete`,
    query: { ...queryParams, limit: 20 },
  });

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': key,
      'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
    },
  });

  const data = (await res.json()) as SearchFlight;

  let flights = Array.isArray(data.data.itineraries)
    ? data.data.itineraries
    : data.data.itineraries.results;

  // filter out different airlines, would need to have a better handling to allow in the application
  flights = flights.filter((itinerary) =>
    itinerary.legs.every(
      (leg) =>
        leg.carriers.marketing[0].id ===
        itinerary.legs[0].carriers.marketing[0].id
    )
  );

  return flights;
};
