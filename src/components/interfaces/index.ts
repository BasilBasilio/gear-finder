export interface UserLogIn {
  email: string;
  password: string;
}

export interface UserSignIn {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface InsertionData {
  instrumentType: string;
  model: string;
  description: string;
  rentalPrice: string;
  condition: string;
  location: string;
  deliveryMethod: string;
  notes: string;
  images?: FileList;
}
