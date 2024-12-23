export interface CouponGift {
  id: string;
  name: string;
  code: string;
  discount: string;
  image: string | null;
  brandId: string;
  startDate: string;
  endDate: string;
  usageLimit: number;
}
