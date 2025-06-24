import { CountryInterface, DepartmentInterface, MunicipalityInterface, NeighborhoodInterface } from "../modules/locations/interfaces/locations.interface";

export interface AddressInterface {
  id?: number;
  address: string;
  address_type: string;
  address_id: number;
  country: CountryInterface;
  department: DepartmentInterface;
  municipality: MunicipalityInterface;
  neighborhood: NeighborhoodInterface;
  third_party_id: number;
  is_active?: true;
  created_at?: string;
  updated_at?: string;
}
