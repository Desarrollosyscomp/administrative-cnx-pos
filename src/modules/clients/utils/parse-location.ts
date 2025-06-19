import { TThirdParty } from "../interfaces/third-party.interface"; 
import { THIRD_PARTY_TYPES } from "../../../utils/app-helpers/thirdTypes"; 

export const parseLocation = (thirdParty: TThirdParty) => {
if (!thirdParty) return;
if (thirdParty.clientable_type == THIRD_PARTY_TYPES.PERSON){
  return {
    country: thirdParty.person?.identification?.country ,
    department: thirdParty.person?.identification?.department ,
    municipality: thirdParty.person?.identification?.municipality ,
    neighborhood: thirdParty.person?.identification?.neighborhood ,
  }
}

else if (thirdParty.clientable_type ==  THIRD_PARTY_TYPES.COMPANY){
  return {
    country: thirdParty.company?.identification?.country,
    department: thirdParty.company?.identification?.department,
    municipality: thirdParty.company?.identification?.municipality,
    neighborhood: thirdParty.company?.identification?.neighborhood,
  }
}

}