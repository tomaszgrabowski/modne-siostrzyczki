import { ProductImage } from "./product-image";
import { ProductSize } from "./product-size";

export interface Product{
  id: string;
  name: string;
  description: string;
  photos: ProductImage[];
  sizes: ProductSize[];
  price: number;
}

