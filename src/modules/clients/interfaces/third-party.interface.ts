import { AddressInterface } from "../../../interfaces/address.interface";
import { Identification} from "../../../interfaces/identification-types.interface";
import { PersonInterface } from "../../../interfaces/people.interface";
import { TFinancialActivities } from "./financial-activity.type";

export interface Company {
  id?: number;
  is_active: boolean;
  legal_representative_id: number;
  identification: Identification;
  name: string;
  address: AddressInterface;
  created_at: string;
  updated_at: string;
}

export interface TThirdParty {
  id: number;
  resolution_type_id: number;
  tradename: string;
  third_type: string;
  price_list_id: number;
  third_id: number;
  tax_schema_dian_id: string;
  financialActivities: Array<TFinancialActivities>;
  fiscal_obligation_dian_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  company?: Company;
  person?: PersonInterface;
}
