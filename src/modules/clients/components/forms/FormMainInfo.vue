<template>
  <v-form @submit.prevent="submitForm">

    <v-row>
      <v-col>
        <v-select label="Tipo de documento" variant="outlined" density="compact" v-model="mainForm.documentType"
          :items="clientsStore.identificationTypes" item-title="name" item-value="dian_id"></v-select>
      </v-col>

      <v-col>
        <v-text-field label="Numero de documento" variant="outlined" v-model="mainForm.documentNumber" density="compact"
          type="text" minlength="6" maxlength="18"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field label="Primer nombre" variant="outlined" v-model="mainForm.firstName" density="compact"
          type="text" minlength="1" maxlength="15"></v-text-field>
      </v-col>

      <v-col>
        <v-text-field label="Segundo nombre" variant="outlined" v-model="mainForm.secondName" density="compact"
          type="text" minlength="1" maxlength="15">
        </v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <v-text-field label="Primer apellido" variant="outlined" v-model="mainForm.surename" density="compact"
          type="text" minlength="2" maxlength="15">
        </v-text-field>
      </v-col>
      <v-col>
        <v-text-field label="Segundo apellido" variant="outlined" v-model="mainForm.second_surename" density="compact"
          type="text" minlength="2" maxlength="15"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field label="Razón social" variant="outlined" v-model="mainForm.name" density="compact" type="text"
          minlength="2" maxlength="70"></v-text-field>
      </v-col>
      <v-col>
        <v-text-field label="Nombre comercial" variant="outlined" v-model="mainForm.tradename" density="compact"
          type="text" minlength="2" maxlength="35"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-select label="Regimen" variant="outlined" v-model="mainForm.regimen" density="compact"
          :items="clientsStore.regimes" item-title="name" item-value="dian_id"></v-select>
      </v-col>
    </v-row>

    <v-row>
      <v-col md="12">
        <v-btn rounded="xs" size="large" block color="#841811ff" variant="outlined" class="mt-n3" density="compact"
          type="submit">Modificar</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import { inject, onMounted, reactive } from 'vue';
import { useClientsStore } from '../../store/useClientsStore';

const clientsStore = useClientsStore()
const swal: any = inject('swal')

type MainFormType = {
  firstName: string;
  secondName: string;
  surename: string;
  second_surename: string;
  name: string;
  tradename: string;
  documentType: null | string;
  documentNumber: null | string;
  regimen: null | string;
};

let mainForm = reactive<MainFormType>({
  firstName: "",
  secondName: "",
  surename: "",
  second_surename: "",
  tradename: "",
  name: "",
  documentType: null,
  documentNumber: "",
  regimen: null,
});

const submitForm = async () => {
  clientsStore.form.regime_dian_id = mainForm.regimen;
  clientsStore.selectedItem.regimen = mainForm.regimen;
  clientsStore.form.first_name = mainForm.firstName;
  clientsStore.selectedItem.first_name = mainForm.firstName;
  clientsStore.form.second_name = mainForm.secondName;
  clientsStore.selectedItem.second_name = mainForm.secondName;
  clientsStore.form.sure_name = mainForm.surename;
  clientsStore.selectedItem.sure_name = mainForm.secondName;
  clientsStore.form.second_sure_name = mainForm.second_surename;
  clientsStore.form.identification_type_code = mainForm.documentType;
  clientsStore.form.identification_number = mainForm.documentNumber;
  clientsStore.form.tradename = mainForm.tradename;
  clientsStore.form.name = mainForm.name;
  clientsStore.toogleDialog();
  swal.fire({
    icon: "success",
    text: "Campos completados",
    showConfirmButton: false,
    timer: 1500,
  });
}

const setForm = () => {
  mainForm.regimen = clientsStore.form.regime_dian_id;
  mainForm.documentType = clientsStore.form.identification_type_code;
  mainForm.firstName = clientsStore.form.first_name;
  mainForm.secondName = clientsStore.form.second_name;
  mainForm.surename = clientsStore.form.sure_name;
  mainForm.second_surename = clientsStore.form.second_sure_name;
  mainForm.name = clientsStore.form.name;
  mainForm.documentNumber = clientsStore.form.identification_number;
  mainForm.tradename = clientsStore.form.tradename;
};

onMounted(() => {
setForm()
})
</script>

<style scoped></style>
