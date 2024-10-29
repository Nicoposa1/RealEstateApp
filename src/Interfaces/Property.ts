interface Location {
  latitude: number;
  longitude: number;
}

interface Agent {
  name: string;
  agency: string;
  phone: string;
  mlsId: string;
}

export interface Property {
  [x: string]: any;
  id: string;
  price: string;
  estimatedMonthly: string;
  address: string;
  zipCode: string;
  imageUrl: string[];
  location: Location;
  beds: number;
  baths: number;
  sqft: number;
  yearBuilt: number;
  status: string;
  mlsNumber: string;
  neighborhood: string;
  county: string;
  agent: Agent;
  description: string;
}