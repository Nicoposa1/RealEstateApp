import { Property } from "../Interfaces/Property";

export type RootStackParamList = {
  Home: undefined;
  Details: { propertyId: string };
  Profile: { userId: string };
  Settings: undefined;
  PropertyDetail: { property: Property };
  Map: { property: Property };
};
