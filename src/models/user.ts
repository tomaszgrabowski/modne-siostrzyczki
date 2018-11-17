import { DeliveryAddress } from "./delivery-address";
export interface User {
  id: string;
  name: string;
  surname: string;
  address: DeliveryAddress;
  email: string;
  phone: string;
  token?: string
}