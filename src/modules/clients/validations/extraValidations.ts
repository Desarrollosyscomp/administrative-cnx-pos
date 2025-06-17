import {
  // contactValidations,
  fiscalValidations,
  isPersonDocumentType,
  mainInfoValidations,
} from "./validations";
import * as Yup from "yup";

export const isValidDocumentNumber = (value: string): boolean => {
  const patterns = [
    /^[A-Z]{2,4}\d{6,12}$/, // PPT123456789, PEP123456789, AB1234567
    /^\d{6,12}[A-Z]$/, // 12345678-A
    /^\d{6,12}\d$/, // 123456789-0
    /^\d{6,12}$/, // 1234567890
    /^[A-Z]{4}\d{6}[A-Z]+$/, // ABCD123456XYZ
    /^[A-Z]{4}\d{6}[A-Z]{4}\d{2}$/, // ABCD123456HXYZMN00
    /^\d{2}-\d{6,8}$/, // 12-3456789
    /^\d{2}-\d{6,8}\d$/, // 20-12345678-9
  ];

  return patterns.some((pattern) => pattern.test(value));
};

export const isValidName = (value: string): boolean => {
  // Permitir solo letras, apóstrofe (') y backtick (`), sin espacios ni otros caracteres especiales
  if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ'`]+$/.test(value)) return false;

  // Bloquear nombres con demasiadas consonantes seguidas (más de 4)
  if (/[bcdfghjklmnpqrstvwxyz]{4,}/i.test(value)) return false;

  // Bloquear nombres con demasiadas vocales seguidas (más de 4)
  if (/[aeiouáéíóú]{4,}/i.test(value)) return false;

  // Bloquear repeticiones excesivas de la misma letra (más de 3 veces seguidas)
  if (/(.)\1{3,}/.test(value)) return false;

  // Bloquear nombres demasiado cortos (menos de 2 letras)
  if (value.length < 2) return false;

  return true;
};

export const isValidCompanyName = (value: string): boolean => {
  // Permitir solo letras, apóstrofe (') y backtick (`), sin espacios ni otros caracteres especiales
  if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ'` ]+$/.test(value)) return false;

  // Bloquear nombres con demasiadas consonantes seguidas (más de 4)
  if (/[bcdfghjklmnpqrstvwxyz]{4,}/i.test(value)) return false;

  // Bloquear nombres con demasiadas vocales seguidas (más de 4)
  if (/[aeiouáéíóú]{4,}/i.test(value)) return false;

  // Bloquear repeticiones excesivas de la misma letra (más de 3 veces seguidas)
  if (/(.)\1{3,}/.test(value)) return false;

  // Bloquear nombres demasiado cortos (menos de 2 letras)
  if (value.length < 2) return false;

  return true;
};

export const extraValidations = (data: any): boolean => {
  let isPerson = isPersonDocumentType(data.documentType ?? "");

  if (isPerson) {
    if (!isValidName(data.firstName ?? "")) {
      throw new Error("El primer nombre no tiene un formato válido.");
    }
    if (!isValidName(data.surename ?? "")) {
      throw new Error("El apellido no tiene un formato válido.");
    }
  } else {
    if (!isValidDocumentNumber(data.documentNumber ?? "")) {
      throw new Error("El número de documento no tiene un formato válido.");
    }
  }
  if (data.secondName?.trim()) {
    if (!isValidName(data.secondName ?? "")) {
      throw new Error("El segundo nombre no tiene un formato válido.");
    }
  }

  if (data.secondSurename?.trim()) {
    if (!isValidName(data.second_surename ?? "")) {
      throw new Error("El segundo apellido no tiene un formato válido.");
    }
  }
  return true;
};

export const extraValidationsSimpleForm = (data: any): boolean => {
  if (!isValidName(data.first_name ?? "")) {
    throw new Error("El primer nombre no tiene un formato válido.");
  }
  if (!isValidName(data.surename ?? "")) {
    throw new Error("El apellido no tiene un formato válido.");
  }
  if (data.second_name?.trim()) {
    if (!isValidName(data.second_name ?? "")) {
      throw new Error("El segundo nombre no tiene un formato válido.");
    }
  }
  if (data.second_surename?.trim()) {
    if (!isValidName(data.second_surename ?? "")) {
      throw new Error("El segundo apellido no tiene un formato válido.");
    }
  }
  return true;
};

export const emailRegex = (value: string): boolean => {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!pattern.test(value)) {
    return false;
  }

  if (value.length <= 7) {
    return false;
  }

  return true;
};

export const isValidPhoneNumber = (value: string): boolean => {
  // Expresión regular para validar el formato permitido
  const pattern = /^[0-9()+\- ]+$/;

  // Verificar que solo contenga caracteres permitidos
  if (!pattern.test(value)) {
    return false;
  }

  // Eliminar caracteres especiales para verificar solo los dígitos
  const cleanValue = value.replace(/[()+\-\s]/g, "");

  // Verificar que tenga más de 7 dígitos
  if (cleanValue.length <= 7) {
    return false;
  }

  // Verificar que no sea una secuencia de números repetidos (ej: 1111111111)
  if (/^(\d)\1+$/.test(cleanValue)) {
    return false;
  }

  return true;
};

export const extraValidationPhone = (phone: any) => {
  if (!isValidPhoneNumber(phone)) {
    throw new Error("El número de telefono no tiene un formato válido.");
  }
  return true;
};
export const extraValidationEmail = (email: any) => {
  if (!emailRegex(email)) {
    throw new Error("El correo no tiene un formato válido.");
  }
  return true;
};

let validationSchema = Yup.object(mainInfoValidations);
let validationSchemaFiscal = Yup.object(fiscalValidations);
export const validationMainInfoExport = async (data: any) => {
  extraValidations(data)
  await validationSchema.validate(data);
};

export const validationFiscalInfoExport = async (data: any) => {
  await validationSchemaFiscal.validate(data);
};


// export const validationContactInfoExport = async (data: any) => {
//   if (data.phones.length === 0 || data.emails.length === 0) {
//     throw new Error("El array de telefono o correo no estan vacios.");
//   } else {
//     return true;
//   }
// };

export const validationLocationInfoExport = async (data: any) => {
  if (
    data.country_id == "" ||
    data.department_id == "" ||
    data.municipality_id == ""
  ) {
    throw new Error(
      "Debe seleccionar al menos un pais, departamento y municipio."
    );
  }
  return true
};
export const validationContactInfoExport = async (data: any) => {
  if (data.phones.length === 0 || data.emails.length === 0) {
    throw new Error("El array de telefono o correo no estan vacios.");
  }
  return true;
};

export const validationComercialActivitiesInfoExport = async (data: any) => {
  if (data.financial_activities.length === 0) {
    throw new Error("Debe seleccionar al menos una actividad comercial.");
  } else {
    return true;
  }
};


