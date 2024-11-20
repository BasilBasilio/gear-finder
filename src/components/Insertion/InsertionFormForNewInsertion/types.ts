export interface InsertionData {
  id: string;
  objectId: string;
  createdAt: string;
  instrumentType: string;
  model: string;
  rentalPrice: string;
  condition: string;
  location: string;
  deliveryMethod: string;
  imageUrls: string[] | undefined;
  description: string;
  nextCursor: string;
}
