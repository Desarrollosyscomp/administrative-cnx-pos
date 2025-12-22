<template>
<v-card
  class="full-height-card card-flex"
  :class="[clientsStore.isValidFormLocationInfo && 'style-card-error']"
>
  <v-card-text class="card-content">
    <p><b>Información residencial</b></p>

    <br />
    <span class="custom-font-size">
      <b> País: </b>
      {{ clientsStore.selectedCountry?.name ?? "" }}
    </span>
    <v-divider />

    <span class="custom-font-size">
      <b> Departamento: </b>
      {{ clientsStore.selectedDepartment?.name ?? "" }}
    </span>
    <v-divider />

    <span class="custom-font-size">
      <b> Municipio: </b>
      {{ clientsStore.selectedMunicipality?.name ?? "" }}
    </span>
    <v-divider />

    <span class="custom-font-size">
      <b> Dirección: </b>
      {{ clientsStore.form.address }}
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
import { useClientsStore } from "../../store/useClientsStore";

const clientsStore = useClientsStore();
const openMainInfoForm = () => {
  clientsStore.toogleDialog();
  clientsStore.mode = "address-info";
  clientsStore.isOpenDialog = true;
};
</script>

<style scoped>
.custom-font-size {
  font-size: 12px;
}

.enable-font-color {
  color: #841811ff;
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
  flex: 1; /* 🔑 ocupa todo el espacio disponible */
}

.card-actions-bottom {
  margin-top: auto; /* 🔑 empuja el botón abajo */
}
</style>
