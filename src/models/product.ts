import { ProductImage } from "./product-image";
import { ProductSize } from "./product-size";
import { Category } from "./category";

export interface Product{
  _id: string,
  name: string;
  description: string;
  photos: ProductImage[];
  sizes: ProductSize[];
  price: number;
  date: string;
  category: Category;
  promo: boolean;
  choosenSize?: string;
  choosenId?: string;
}

