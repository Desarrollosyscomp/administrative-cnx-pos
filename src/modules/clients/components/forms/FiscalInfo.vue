<template>
  <v-card
    class="full-height-card card-flex"
    :class="[clientsStore.isValidFormFiscalInfo && 'style-card-error']"
  >
    <v-card-text class="card-content text-left">
      <p><b>Información fiscal</b></p>
      <br />

      <span class="custom-font-size">
        <b> Esquema de impuestos:</b>
        {{ clientsStore.parsedTaxSchema() }}
      </span>
      <v-divider />

      <span class="custom-font-size">
        <b> Obligación fiscal:</b>
        {{ clientsStore.parsedFiscalObligation() }}
      </span>
      <v-divider />
    </v-card-text>

    <v-card-actions class="card-actions-bottom">
      <v-btn
        block
        text="Abrir formulario"
        variant="outlined"
        color="#841911"
        size="small"
        @click="openMainInfoForm"
      />
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

.full-height-card {
  height: 100%;
}
.card-flex {
  display: flex;
  flex-direction: column;
}

.card-content {
  flex: 1;
}

.card-actions-bottom {
  margin-top: auto;
}

.custom-font-size {
  font-size: 12px;
}

.style-card-error {
  border-radius: 5px;
  border-width: 1px;
  border-color: red;
}
</style>
