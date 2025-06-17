import * as Yup from "yup";
export const COMPANY_DIAN_IDS: Array<string> = ["50", "31"];
export const isCompanyDocumentType = (documentType: string) => {
  return COMPANY_DIAN_IDS.includes(documentType);
};

export const isPersonDocumentType = (documentType: string) => {
  return !isCompanyDocumentType(documentType);
};

export const mainInfoValidations = {
  firstName: Yup.mixed().when(["documentType"], {
    is: (documentType: string) => {
      return isPersonDocumentType(documentType);
    },
    then: ()=>Yup.string().required("El primer nombre es requerido"),
    otherwise:()=> Yup.mixed().notRequired(),
  }),

  surename: Yup.mixed().when(["documentType"], {
    is: (documentType: string) => {
      return isPersonDocumentType(documentType);
    },
    then: ()=> Yup.string().required("El primer nombre es requerido"),
    otherwise: ()=> Yup.mixed().notRequired(),
  }),
  
  documentType: Yup.string().required("El tipo de documento es requerido"),
  name: Yup.mixed().when(["documentType"], {
    is: (documentType: string) => {
      return isCompanyDocumentType(documentType);
    },
    then:()=> Yup.string().required("La razon social es requerida"),
    otherwise:()=> Yup.mixed().notRequired(),
  }),
  documentNumber: Yup.string().required("El numero de documento es requerido"),
  regimen: Yup.string().required("El regimen es requerido"),
};

export const fiscalValidations = {
  tax_schema: Yup.string().required("El esquema de impuestos es requerido"),
  fiscal_obligation: Yup.string().required("La obligacion fiscal es requerida"),
};

export const contactValidations = {
  phone: Yup.string().required("El telefono es requerido"),
  email: Yup.string().required("El correo es requerido"),
};


export default {
  // ...mainInfoValidations,
  //...fiscalValidations,
  //...contactValidations,
};
 