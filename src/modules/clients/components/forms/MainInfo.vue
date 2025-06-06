<template>
  <v-card class="full-height-card" :class="[clientsStore.isValidFormMainInfo && 'style-card-error']">
    <v-card-text>
      <p><b>Informacion principal</b></p>

      <br />
      <span class="custom-font-size">
        <b> Nombres: </b>
        {{ clientsStore.form.first_name }}
        <br />
      </span>
      <v-divider></v-divider>

      <span class="custom-font-size">
        <b> Tipo de  documento: </b>
        {{ clientsStore.form.identification_number }}</span
      >
      <v-divider></v-divider>
      <span class="custom-font-size">
        <b> Numero documento: </b>
        {{ clientsStore.form.identification_number }}</span
      >
      <v-divider></v-divider>

      <br />
      <v-btn
        block
        text="Abrir formulario"
        variant="outlined"
        color="#841911"
        size="small"
        @click="openMainInfoForm"
      ></v-btn>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
import { onMounted, reactive,  watch } from "vue";
import { useClientsStore } from "../../store/useClientsStore";
// import { useIdentificationTypesStore } from "@/modules/identification-types/stores/identification-types.store";
// import { useRegimesStore } from "@/modules/regimes/stores/regimes.store";

const clientsStore = useClientsStore();
// let menu = ref(false);
// const identificationStore = useIdentificationTypesStore();
// const regimenStore = useRegimesStore();

type formDataType = {
  _chars: null | string;
};

let form = reactive<formDataType>({
  _chars: null,
});

const openMainInfoForm = () => {
  clientsStore.toogleDialog();
  clientsStore.mode = "main-info";
  clientsStore.isOpenDialog = true;
};

// const getRandomChar = () => {
//   const n = randomNumber(65, 90);
//   return String.fromCharCode(n);
// };

// const generateRandomBarcode = () => {
//   let chars = "";
//   for (let i = 0; i < 3; i++) {
//     chars += getRandomChar();
//   }
//   let date = Math.ceil(Date.now() / 1000000);
//   console.log(date);
//   date = date - 1741000;
//   form._chars = `${chars}${date}`;
// };

// let identify = ref();
// const setIdentification = async () => {
//   const identifications = await identificationStore.getAllIdentificationTypes();
//   clientsStore.identificationTypes = identifications;
//   identify.value = identifications;
// };

// let arrayRegimes = ref();
// const setRegimes = async () => {
//   const regimes = await regimenStore.getAllRegimes();
//   clientsStore.regimes = regimes;
//   arrayRegimes.value = regimes;
// };

watch(
  () => clientsStore.form.barcode,
  () => {
    if (clientsStore.moduleMode == "edit") {
      form._chars = clientsStore.form.barcode;
    }
  }
);

// const onsubmit = () => {
//   clientsStore.form.barcode = form._chars;
//   menu.value = false;
//   console.log(clientsStore.form.barcode);
// };

onMounted(() => {
  // setIdentification();
  // setRegimes();
  // setBarcode();
});
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
