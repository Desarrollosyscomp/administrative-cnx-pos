<template>
    <v-card class="full-height-card" :class="[clientsStore.isValidFormMainInfo && 'style-card-error']">
        <v-card-text>
            <p><b>Informacion de empresa</b></p>

            <br />
            <span class="custom-font-size">
                <b> Razon social: </b>
                {{ clientsStore.form.first_name }}
                <br />
            </span>
            <v-divider></v-divider>

            <span class="custom-font-size">
                <b> Nombre comercial: </b>
                {{ clientsStore.form.identification_number }}</span>
            <v-divider></v-divider>
            <span class="custom-font-size">
                <b> Regimen: </b>
                {{ clientsStore.form.identification_number }}</span>
            <v-divider></v-divider>

            <br />
            <v-btn block text="Abrir formulario" variant="outlined" color="#841911" size="small"
                @click="openMainInfoForm"></v-btn>
        </v-card-text>
    </v-card>

</template>
<script setup lang="ts">
import { useClientsStore } from "../../store/useClientsStore";

const clientsStore = useClientsStore();
const openMainInfoForm = () => {
  clientsStore.toogleDialog();
  clientsStore.mode = "company-info";
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
</style>