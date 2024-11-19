export interface InsertionData {
  id: string;
  objectId: string;
  createdAt: string;
  instrumentType: string;
  model: string;
  description: string;
  rentalPrice: string;
  condition: string;
  location: string;
  deliveryMethod: string;
  imageUrl: string | undefined;
  notes: string;
  nextCursor: string;
}
