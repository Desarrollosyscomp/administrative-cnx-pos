import { TThirdParty } from "../interfaces/third-party.interface"; 
import { THIRD_PARTY_TYPES } from "../../../utils/app-helpers/thirdTypes"; 

export const parseLocation = (thirdParty: TThirdParty) => {
if (!thirdParty) return;
if (thirdParty.third_type == THIRD_PARTY_TYPES.PERSON){
  return {
    country: thirdParty.person?.address?.country ,
    department: thirdParty.person?.address?.department ,
    municipality: thirdParty.person?.address?.municipality ,
    neighborhood: thirdParty.person?.address?.neighborhood ,
  }
}

else if (thirdParty.third_type ==  THIRD_PARTY_TYPES.COMPANY){
  return {
    country: thirdParty.company?.address?.country,
    department: thirdParty.company?.address?.department,
    municipality: thirdParty.company?.address?.municipality,
    neighborhood: thirdParty.company?.address?.neighborhood,
  }
}

}