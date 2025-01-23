'use server';

import queryString from 'query-string';
import { apiBaseUrl } from '~/lib/constants';
import { SearchAirports } from '~/lib/types/airports';

const key = process.env.RAPID_API_KEY!;

export const getAirportsAction = async (query: string) => {
  const url = queryString.stringifyUrl({
    url: `${apiBaseUrl}/v1/flights/searchAirport`,
    query: { query },
  });

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': key,
      'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
    },
  });

  const data = (await res.json()) as SearchAirports;
  console.log(data);
  return data.data;
};
