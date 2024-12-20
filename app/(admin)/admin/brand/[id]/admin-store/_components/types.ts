export interface Store {
  id: string;
  name: string;
  email: string;
  password?: string;
  description: string;
  image: string | null;
  brandId: string;
  postalCode: string;
}

export interface Flyer {
  id: string;
  title: string;
  description: string;
  image: string | null;
  brandId: string;
  storeIds?: string[]; // Optional for targeting specific stores
  validFrom: string; // Start date of the flyer
  validTo: string; // End date of the flyer
}
