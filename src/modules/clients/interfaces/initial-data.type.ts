import { IdentificationTypeInterface } from "../../../interfaces/identification-types.interface";
import { TFinancialActivities } from "./financial-activity.type";
import { TFiscalObligation } from "./fiscal-obligation.type";
import { TRegime } from "./regime.type";
import { TTaxSchema } from "./tax-schema.type";

export type TInitialData = {
    thirdPartyFinancialActivities: TFinancialActivities[];
    taxSchemas: TTaxSchema[];
    fiscalObligations: TFiscalObligation[];
    documentTypes: IdentificationTypeInterface[];
    regimes: TRegime[];
}