<template>
  <v-card class="full-height-card" :class="[clientsStore.isValidFormLocationInfo && 'style-card-error']">
    <v-card-text>
      <p><b>Información residencial</b></p>

      <br />
      <span class="custom-font-size">
        <b> País: </b>
        {{ clientsStore.selectedCountry?.name ?? '' }}
        <br />
      </span>
      <v-divider></v-divider>
      <span class="custom-font-size">
        <b> Departamento: </b>
        {{ clientsStore.selectedDepartment?.name ?? '' }}
        <br />
      </span>
      <v-divider></v-divider>
      <span class="custom-font-size">
        <b> Municipio: </b>
        {{ clientsStore.selectedMunicipality?.name ?? '' }}
        <br />
      </span>
      <v-divider></v-divider>
      <span class="custom-font-size">
        <b> Barrio: </b>
        {{ clientsStore.selectedNeighborhood?.name ?? '' }}
        <br />
      </span>
      <v-divider></v-divider>

      <span class="custom-font-size">
        <b> Dirección: </b>
        {{ clientsStore.form.address }}</span>
      <v-divider></v-divider>
    </v-card-text>
    <v-spacer></v-spacer>
    <v-card-actions>
      <v-btn block text="Abrir formulario" variant="outlined" color="#841911" size="small" class=""
        @click="openMainInfoForm"></v-btn>
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

.align-components {
  width: 50%;
  display: inline-block;
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
</style>