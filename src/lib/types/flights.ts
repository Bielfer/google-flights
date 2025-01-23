export type SearchFlights = {
  status: boolean;
  message: string;
  data: Data;
};

type Data = {
  context: DataContext;
  itineraries: Itinerary[] | { results: Itinerary[] };
  carHire: CarHire;
};

type CarHire = {
  context: CarHireContext;
  results: any[];
  buckets: any[];
};

type CarHireContext = {
  status: string;
  sessionId: string;
  totalResults: number;
};

type DataContext = {
  status: string;
  sessionId: string;
  count: number;
};

type Itinerary = {
  id: string;
  price: ItineraryPrice;
  legs: Leg[];
  isSelfTransfer: boolean;
  isProtectedSelfTransfer: boolean;
  farePolicy: FarePolicy;
  fareAttributes: FareAttributes;
  isMashUp: boolean;
  hasFlexibleOptions: boolean;
  score: number;
  pricingOptions: PricingOption[];
  eco?: Eco;
  tags?: string[];
};

type Eco = {
  ecoContenderDelta: number;
};

type FareAttributes = {};

type FarePolicy = {
  isChangeAllowed: boolean;
  isPartiallyChangeable: boolean;
  isCancellationAllowed: boolean;
  isPartiallyRefundable: boolean;
};

type Leg = {
  id: string;
  origin: LegDestination;
  destination: LegDestination;
  durationInMinutes: number;
  stopCount: number;
  isSmallestStops: boolean;
  departure: Date;
  arrival: Date;
  timeDeltaInDays: number;
  carriers: Carriers;
  segments: Segment[];
};

type Carriers = {
  marketing: Ting[];
  operationType: OperationType;
  operating?: Ting[];
};

type Ting = {
  id: number;
  alternateId?: string;
  logoUrl?: string;
  name: string;
};

enum OperationType {
  FullyOperated = 'fully_operated',
  NotOperated = 'not_operated',
  PartiallyOperated = 'partially_operated',
}

type LegDestination = {
  id: string;
  entityId: string;
  name: string;
  displayCode: string;
  city: string;
  country: string;
  isHighlighted: boolean;
};

type Segment = {
  id: string;
  origin: SegmentDestination;
  destination: SegmentDestination;
  departure: Date;
  arrival: Date;
  durationInMinutes: number;
  flightNumber: string;
  marketingCarrier: TingCarrier;
  operatingCarrier: TingCarrier;
};

type SegmentDestination = {
  flightPlaceId: string;
  displayCode: string;
  parent: Parent;
  name: string;
  type: DestinationType;
  country: string;
};

type Parent = {
  flightPlaceId: string;
  displayCode: string;
  name: string;
  type: ParentType;
};

enum ParentType {
  City = 'City',
}

enum DestinationType {
  Airport = 'Airport',
}

type TingCarrier = {
  id: number;
  name: string;
  alternateId: string;
  allianceId: number;
  displayCode: string;
};

type ItineraryPrice = {
  raw: number;
  formatted: string;
  pricingOptionId: string;
};

type PricingOption = {
  agentIds: string[];
  price: ItemPrice;
  items: Item[];
  pricingOptionId: string;
  fareAttributes: FareAttributes;
  unpricedType?: string;
};

type Item = {
  price: ItemPrice;
  segmentIds: string[];
  bookingProposition: BookingProposition;
  agentId: string;
  url: string;
};

enum BookingProposition {
  Pbook = 'PBOOK',
}

type ItemPrice = {
  updateStatus: UpdateStatus;
  amount: number;
};

enum UpdateStatus {
  Current = 'current',
}
