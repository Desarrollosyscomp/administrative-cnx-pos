<template>
  <v-form @submit.prevent="submitForm">
    <v-row>
      <v-col cols="12" md="6">
        <v-select
          density="compact"
          label="Esquema de impuestos"
          variant="outlined"
          :items="parsedTaxSchema"
          item-value="customValue"
          item-title="customTitle"
          v-model="formData.tax_schema"
          :rules="taxSchemaRules"
        >
        </v-select>
      </v-col>
      <v-col>
        <v-select
          density="compact"
          label="Obligacion fiscal"
          variant="outlined"
          :items="parsedFiscalObligation"
          item-value="customValue"
          item-title="customTitle"
          v-model="formData.fiscal_obligation"
          :rules="fiscalObligationRules"
        >
        </v-select>
      </v-col>
    </v-row>

    <v-row>
      <v-col md="12">
        <v-btn
          rounded="xs"
          size="large"
          block
          color="#841811ff"
          variant="outlined"
          class="mt-n3"
          density="compact"
          type="submit"
          >Modificar</v-btn
        >
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import { fiscalValidations } from "../../validations/validations";
import {  computed, inject,  onMounted,  reactive, ref, } from "vue";
import { useClientsStore } from "../../store/useClientsStore";
import { validationFiscalInfoExport } from "../../validations/extraValidations";

const swal: any = inject("swal");
const clientsStore = useClientsStore();

type formDataType = {
  tax_schema: null | string;
  fiscal_obligation: null | string;
};

let formData = reactive<formDataType>({
  tax_schema: null,
  fiscal_obligation: null,
});


const taxSchemaRules = ref([
  async (value: any) => {
    try {
      await fiscalValidations.tax_schema.validate(value);
      return true;
    } catch (e: any) {
      return "El esquema de impuestos es requerido";
    }
  },
]);
const fiscalObligationRules = ref([
  async (value: any) => {
    try {
      await fiscalValidations.fiscal_obligation.validate(value);
      return true;
    } catch (e: any) {
      return "La obligacion fiscal es requerida";
    }
  },
]);


const submitForm = async () => {
  try {
    await validationFiscalInfoExport(formData)
    if (typeof formData.tax_schema == "string") {
      clientsStore.form.tax_schema_dian_id =
        formData.tax_schema.split(",")[0];
      clientsStore.taxSchemaName = formData.tax_schema.split(",")[1];
    }
    if (typeof formData.fiscal_obligation == "string") {
      clientsStore.form.fiscal_obligation_dian_id =
        formData.fiscal_obligation.split(",")[0];

        console.log(typeof clientsStore.form.fiscal_obligation_dian_id)
      clientsStore.nameFiscalObligations =
        formData.fiscal_obligation.split(",")[1];
      clientsStore.toogleDialog();
    }
    clientsStore.isValidFormFiscalInfo = false;
    swal.fire({
      icon: "success",
      text: "Campos completados",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (e:any){
    console.log(e.message)   
  }
};

let taxSchemas = ref([] as any);
const setTaxSchema = async () => {
  const tax = await clientsStore.taxSchemas;
  taxSchemas.value = tax;
};

const parseTaxSchemaValue = (taxSchema: any) => {
  return taxSchema.dian_id + "," + taxSchema.name;
};

const parsedTaxSchema = computed(() => {
  if (!taxSchemas.value) return [];
  return taxSchemas.value.map((taxSchema: any) => {
    return {
      ...taxSchema,
      customTitle: taxSchema.dian_id + " - " + taxSchema.description,
      customValue: parseTaxSchemaValue(taxSchema),
    };
  });
});

let fiscals = ref([] as any);
const setFiscalObligations = async () => {
  const obligations = await clientsStore.fiscalObligations;
  fiscals.value = obligations;
};

const parseFiscalObligationValue = (fiscal: any) => {
  return fiscal.dian_id + "," + fiscal.name;
};

const parsedFiscalObligation = computed(() => {
  if (fiscals.value.lenght == 0) return [];
  return fiscals.value.map((fiscal: any) => {
    return {
      ...fiscal,
      customTitle: fiscal.name,
      customValue: parseFiscalObligationValue(fiscal),
    };
  });
});

const setForm = () => {
  let res = taxSchemas.value.find(
    (taxSchema: any) =>
      taxSchema.dian_id == clientsStore.form.tax_schema_dian_id
  );
  let res2 = fiscals.value.find((fiscal: any) => {
    return (
      fiscal.dian_id == clientsStore.form.fiscal_obligation_dian_id
    );
  });
  if (!res) return;
  formData.tax_schema = parseTaxSchemaValue(res);
  formData.fiscal_obligation = parseFiscalObligationValue(res2);
};

onMounted(async () => {
  await setTaxSchema();
  await setFiscalObligations();
  setForm();
});

</script>

<style scoped></style>
