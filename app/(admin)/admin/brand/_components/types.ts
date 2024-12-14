export interface Brand {
  id: string;
  name: string;
  email: string;
  password?: string;
  description: string;
  image: string | null;
  adminId: string;
  postalCode: string;
}
