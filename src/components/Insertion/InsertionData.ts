export interface Location {
  label: string;
  lat: number;
  lng: number;
}

export interface InsertionData {
  id: string;
  objectId: string;
  createdAt: string;
  instrumentType: string;
  model: string;
  rentalPrice: string;
  condition: string;
  location: Location;
  deliveryMethod: string;
  imageUrls: string[] | undefined;
  description: string;
  nextCursor: string;
}
