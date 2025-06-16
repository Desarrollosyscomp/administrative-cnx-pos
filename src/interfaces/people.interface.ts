import { AddressInterface } from "./address.interface";
import { Identification } from "./identification-types.interface";

export interface PersonInterface {
  id: number;
  first_name: string;
  second_name: string;
  surename: string;
  second_surename: string;
  description: null;
  is_active: number;
  createdAt: string;
  updatedAt: string;
  people_type_id: number;
  identification: Identification;
  address: AddressInterface;
}
