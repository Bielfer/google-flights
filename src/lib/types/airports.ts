export type SearchAirports = {
  status: boolean;
  timestamp: number;
  data: Data[];
};

type Data = {
  skyId: string;
  entityId: string;
  presentation: Presentation;
  navigation: Navigation;
};

type Navigation = {
  entityId: string;
  entityType: string;
  localizedName: string;
  relevantFlightParams: RelevantFlightParams;
  relevantHotelParams: RelevantHotelParams;
};

type RelevantFlightParams = {
  skyId: string;
  entityId: string;
  flightPlaceType: string;
  localizedName: string;
};

type RelevantHotelParams = {
  entityId: string;
  entityType: string;
  localizedName: string;
};

type Presentation = {
  title: string;
  suggestionTitle: string;
  subtitle: string;
};
