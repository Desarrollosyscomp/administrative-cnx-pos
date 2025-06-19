import { TRegime } from "../modules/clients/interfaces/regime.type";
import { CountryInterface, DepartmentInterface, MunicipalityInterface, NeighborhoodInterface } from "../modules/locations/interfaces/locations.interface";

// export type TIdentificationType = {
//     id: number;
//     code: string;
//     name: string;
//     acronym: string;
//   type: number;
//   is_active: boolean;
//   created_at: string;
//   updated_at: null;
// }

export interface Identification {
  document_type_dian_id: number;
  document_number: number;
  digit: number;
  identification_type: string;
  identification_id: number;
  id: number;
  created_at: Date;
  updated_at: null;
  identificationType: IdentificationTypeInterface;
  regime: TRegime;
  regime_dian_id: string;
  address: string
  country: CountryInterface;
  department: DepartmentInterface;
  municipality: MunicipalityInterface;
  neighborhood: NeighborhoodInterface;
}

export interface IdentificationTypeInterface {
  id: number;
  name: string;
  acronym: string;
  is_active: boolean;
  created_at: string;
  updated_at: null;
}
