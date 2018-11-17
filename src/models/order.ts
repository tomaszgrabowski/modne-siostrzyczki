import { Product } from "./product";
import { User } from "./user";
import { DeliveryAddress } from "./delivery-address";

export interface Order{
  id: string;
  date: string;
  products: Product[];
  user?: User;
  deliveryAddress?: DeliveryAddress;
}