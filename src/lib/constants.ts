export const flightTypes = {
  oneWay: 'one-way',
  roundTrip: 'round-trip',
} as const;

export type FlightType = (typeof flightTypes)[keyof typeof flightTypes];

export const flightTypesValues = Object.values(
  flightTypes
) as unknown as readonly [FlightType, ...FlightType[]];

export const flightCabinClasses = {
  economy: 'economy',
  premiumEconomy: 'premium_economy',
  business: 'business',
  first: 'first',
} as const;

export type FlightCabinClass =
  (typeof flightCabinClasses)[keyof typeof flightCabinClasses];

export const flightCabinClassesValues = Object.values(
  flightCabinClasses
) as unknown as readonly [FlightCabinClass, ...FlightCabinClass[]];

export const apiBaseUrl = 'https://sky-scrapper.p.rapidapi.com/api/v2/flights';
