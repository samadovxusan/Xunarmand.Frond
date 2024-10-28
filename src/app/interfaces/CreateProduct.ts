export interface CreateProduct {
  productName: string;
  productType: number;
  description: string;
  price: number;
  imageUrl: File | null;
  imageUrlPath: string;
}
