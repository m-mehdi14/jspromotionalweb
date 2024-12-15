export interface Store {
  id?: string;
  name: string;
  email: string;
  password?: string;
  description: string;
  image: string | null;
  postalCode: string;
  brandId?: string;
}
