import { TThirdParty } from "../interfaces/third-party.interface"; 

export type TForm = {
  user_warehouse: string,
  tradename: string,
  barcode: string,
  regime_dian_id: string,
  identification_type_code: number,
  identification_number: number,
  emails: Array<any>,
  phones: Array<any>,
  name: string,
  first_name: string,
  second_name: string,
  sure_name: string,
  second_sure_name: string,
  tax_schema_dian_id: string,
  fiscal_obligation_dian_id: string,
  financial_activities: Array<any>,
  address: string,
  country_id: number,
  department_id: number,
  municipality_id: number,
  neighborhood_id: number,
};

export const parseClientsToForm = (thirdParty: TThirdParty): TForm => {

  let form = {} as TForm
  if (!thirdParty) return form;

  form.financial_activities = thirdParty.financialActivities.map((financialActivity: any) => {
    return financialActivity.dian_id;
  });

  form.tradename = thirdParty.tradename;
  if (thirdParty.person) {
    form.regime_dian_id = thirdParty.person.identification.regime_id;
    form.identification_type_code = thirdParty.person.identification.identification_type_id;
    form.identification_number = thirdParty.person.identification.identification_number;
    form.first_name = thirdParty.person.first_name;
    form.second_name = thirdParty.person.second_name;
    form.sure_name = thirdParty.person.surename;
    form.second_sure_name = thirdParty.person.second_surename;
    form.address = thirdParty.person.address?.address ?? "";
    form.country_id = thirdParty.person.address?.country?.id;
    form.department_id = thirdParty.person.address?.department?.id;
    form.municipality_id = thirdParty.person.address?.municipality?.id;
    form.neighborhood_id = thirdParty.person.address?.neighborhood?.id;
    form.emails = thirdParty.person.identification.emails;
    form.phones = thirdParty.person.identification.phones
  } else if (thirdParty.company){
    form.regime_dian_id = thirdParty.company.identification.regime_id;
    form.identification_type_code = thirdParty.company.identification.identification_type_id;
    form.identification_number = thirdParty.company.identification.identification_number;
    form.emails = thirdParty.company.identification.emails;
    form.phones = thirdParty.company.identification.phones;
    form.name = thirdParty.company.name;
    form.address = thirdParty.company.address?.address ?? "";
    form.country_id = thirdParty.company.address?.country?.id;
    form.department_id = thirdParty.company.address?.department?.id;
    form.municipality_id = thirdParty.company.address?.municipality?.id;
    form.neighborhood_id = thirdParty.company.address?.neighborhood?.id;
  } 

  form.tax_schema_dian_id = thirdParty.tax_schema_dian_id;
  form.fiscal_obligation_dian_id = thirdParty.fiscal_obligation_dian_id;
  form.user_warehouse = "0"
  
  return form
}