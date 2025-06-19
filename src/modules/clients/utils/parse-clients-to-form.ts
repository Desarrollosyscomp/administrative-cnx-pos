import { TThirdParty } from "../interfaces/third-party.interface"; 

export type TForm = {
  user_warehouse: string,
  tradename: string,
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
  console.log(thirdParty)
  let form = {} as TForm
  if (!thirdParty) return form;
  form.financial_activities = thirdParty.financialActivities.map((financialActivity: any) => {
    return financialActivity;
  });
  form.tradename = thirdParty.tradename;
  if (thirdParty.person) {
    form.regime_dian_id = thirdParty.person.identification.regime_dian_id;
    form.identification_type_code = thirdParty.person.identification.document_type_dian_id;
    form.identification_number = thirdParty.person.identification.document_number;
    form.first_name = thirdParty.person.first_name;
    form.second_name = thirdParty.person.second_name;
    form.sure_name = thirdParty.person.surename;
    form.second_sure_name = thirdParty.person.second_surename;
    form.address = thirdParty.person.identification.address ?? "";
    form.country_id = thirdParty.person.identification.country?.id;
    form.department_id = thirdParty.person.identification.department?.id;
    form.municipality_id = thirdParty.person.identification.municipality?.id;
    form.neighborhood_id = thirdParty.person.identification.neighborhood?.id;
    form.emails = thirdParty.person.emails;
    form.phones = thirdParty.person.phones
  } else if (thirdParty.company){
    console.log(thirdParty.company.name)
    // form.regime_dian_id = thirdParty.company.identification.regime_id;
    form.identification_type_code = thirdParty.company.identification.document_type_dian_id;
    form.identification_number = thirdParty.company.identification.document_number;
    form.emails = thirdParty.company.emails;
    form.phones = thirdParty.company.phones;
    form.name = thirdParty.company.name;
    form.address = thirdParty.company.identification?.address ?? "";
    form.country_id = thirdParty.company.identification?.country?.id;
    form.department_id = thirdParty.company.identification?.department?.id;
    form.municipality_id = thirdParty.company.identification?.municipality?.id;
    form.neighborhood_id = thirdParty.company.identification?.neighborhood?.id;
  } 

  form.tax_schema_dian_id = thirdParty.tax_schema_dian_id;
  form.fiscal_obligation_dian_id = thirdParty.fiscal_obligation_dian_id;
  form.user_warehouse = "0"
  
  return form
}