<template>
  <v-card cols="12" sm="3" class="full-height-card" :class="[clientsStore.isValidFormFiscalInfo && 'style-card-error']">
    <v-card-text class="text-left">
      <p><b>Informacion fiscal</b></p>
      <br />
      <span class="custom-font-size">
        <b> Esquema de impuestos:</b>
        {{ clientsStore.form.tax_schema_dian_id }}</span
      >
      <v-divider></v-divider>

      <span class="custom-font-size">
        <b>Obligacion fiscal:</b>
        {{ clientsStore.form.fiscal_obligation_dian_id }}
      </span>
      <v-divider></v-divider>
      <br />
    </v-card-text>
    <v-spacer></v-spacer>
    <v-card-actions>
      <v-btn
        block
        text="Abrir formulario"
        variant="outlined"
        color="#841911"
        size="small"
        class="mt-5"
        @click="openMainInfoForm"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>
<script setup lang="ts">
// import { onMounted, ref } from "vue";
import { useClientsStore } from "../../store/useClientsStore";

const clientsStore = useClientsStore();

const openMainInfoForm = () => {
  clientsStore.toogleDialog();
  clientsStore.mode = "fiscal-info";
};

// let taxSchemas = ref([] as any);
// const setTaxSchema = async () => {
//   const tax = await clientsStore.getTaxSchema();
//   taxSchemas.value = tax;
// };

// let fiscals = ref([] as any);
// const setFiscalObligations = async () => {
//   const obligations = await clientsStore._getFicalObligations();
//   fiscals.value = obligations;
// };

// onMounted(() => {
//   setTaxSchema();
//   setFiscalObligations();
// });
</script>
<style scoped>
.custom-font-size {
  font-size: 12px;
}

.style-card-error {
  border-radius: 5px;
  border-width: 1px;
  border-color: red;
}
</style>
