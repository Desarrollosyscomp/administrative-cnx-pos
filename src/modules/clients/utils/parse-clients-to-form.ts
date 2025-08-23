import { TEmail } from "../../../interfaces/email.interface";
import { TPhone } from "../../../interfaces/phone.interface";
import { TFinancialActivities } from "../interfaces/financial-activity.type";
import { TThirdParty } from "../interfaces/third-party.interface"; 

export type TForm = {
  user_warehouse: string,
  tradename: string,
  regime_dian_id: string,
  identification_type_code: number,
  identification_number: number,
  emails: Array<TEmail>,
  phones: Array<TPhone>,
  name: string,
  first_name: string,
  second_name: string,
  sure_name: string,
  second_sure_name: string,
  tax_schema_dian_id: string,
  fiscal_obligation_dian_id: string,
  financial_activities: Array<TFinancialActivities>,
  address: string,
  country_id: number,
  department_id: number,
  municipality_id: number,
  neighborhood_id: number,
};

export const parseClientsToForm = (client: TThirdParty): TForm => {
  let form = {} as TForm
  if (!client) return form;
  form.financial_activities = client.financialActivities.map((financialActivity: any) => {
    return financialActivity;
  });
  form.tradename = client.tradename;
  if (client.person) {
    form.regime_dian_id = client.person.identification?.regime_dian_id ?? '';
    form.identification_type_code = client.person.identification?.document_type_dian_id ?? '';
    form.identification_number = client.person.identification?.document_number ?? '';
    form.first_name = client.person.first_name;
    form.second_name = client.person.second_name;
    form.sure_name = client.person.surename;
    form.second_sure_name = client.person.second_surename;
    form.address = client.person.identification?.address ?? "";
    form.country_id = client.person.identification?.country?.id;
    form.department_id = client.person.identification?.department?.id;
    form.municipality_id = client.person.identification?.municipality?.id;
    form.neighborhood_id = client.person.identification?.neighborhood?.id;
    form.emails = client.person.emails;
    form.phones = client.person.phones
  } else if (client.company){
    form.regime_dian_id = client.company.identification?.regime_dian_id;
    form.identification_type_code = client.company.identification?.document_type_dian_id;
    form.identification_number = client.company.identification?.document_number;
    form.emails = client.company.emails;
    form.phones = client.company.phones;
    form.name = client.company.name;
    form.address = client.company.identification?.address ?? "";
    form.country_id = client.company.identification?.country?.id;
    form.department_id = client.company.identification?.department?.id;
    form.municipality_id = client.company.identification?.municipality?.id;
    form.neighborhood_id = client.company.identification?.neighborhood?.id;
  } 

  form.tax_schema_dian_id = client.tax_schema_dian_id;
  form.fiscal_obligation_dian_id = client.fiscal_obligation_dian_id;
  form.user_warehouse = "0"
  
  return form
}