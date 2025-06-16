import { TRegime } from "../modules/clients/interfaces/regime.type";
import { TEmail } from "./email.interface";
import { TPhone } from "./phone.interface";


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
  identification_type_id: number;
  identification_number: number;
  digit: number;
  identification_type: string;
  identification_id: number;
  id: number;
  created_at: Date;
  updated_at: null;
  identificationType: IdentificationTypeInterface;
  emails: Array<TEmail>; 
  phones: Array<TPhone>;
  regime: TRegime;
  regime_id: string;
}

export interface IdentificationTypeInterface {
  id: number;
  name: string;
  acronym: string;
  is_active: boolean;
  created_at: string;
  updated_at: null;
}
