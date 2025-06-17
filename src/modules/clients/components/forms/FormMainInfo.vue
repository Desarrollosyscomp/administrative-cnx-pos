<template>
  <v-form @submit.prevent="submitForm">
    <v-row>
      <v-col>
        <v-select
          label="Tipo de documento"
          variant="outlined"
          density="compact"
          v-model="mainForm.documentType"
          :items="clientsStore.identificationTypes"
          item-title="name"
          item-value="dian_id"
          :rules="documentTypeRules"
        ></v-select>
      </v-col>

      <v-col>
        <v-text-field
          label="Numero de documento"
          variant="outlined"
          v-model="mainForm.documentNumber"
          density="compact"
          type="text"
          minlength="6"
          maxlength="18"
          :rules="documentNumberRules"
        ></v-text-field>
      </v-col>
    </v-row>
    <div v-if="isCompany">
      <v-row>
        <v-col>
          <v-text-field
            label="Razón social"
            variant="outlined"
            v-model="mainForm.name"
            density="compact"
            type="text"
            minlength="2"
            maxlength="70"
            :rules="nameRules"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            label="Nombre comercial"
            variant="outlined"
            v-model="mainForm.tradename"
            density="compact"
            type="text"
            minlength="2"
            maxlength="35"
          ></v-text-field>
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            label="Primer nombre"
            variant="outlined"
            v-model="mainForm.firstName"
            density="compact"
            type="text"
            minlength="1"
            maxlength="15"
            :rules="firstNameRules"
          ></v-text-field>
        </v-col>

        <v-col>
          <v-text-field
            label="Segundo nombre"
            variant="outlined"
            v-model="mainForm.secondName"
            density="compact"
            type="text"
            minlength="1"
            maxlength="15"
            :rules="seconNameRules"
          >
          </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            label="Primer apellido"
            variant="outlined"
            v-model="mainForm.surename"
            density="compact"
            type="text"
            minlength="2"
            maxlength="15"
            :rules="surenameRules"
          >
          </v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            label="Segundo apellido"
            variant="outlined"
            v-model="mainForm.second_surename"
            density="compact"
            type="text"
            minlength="2"
            maxlength="15"
            :rules="secondSurenameRules"
          ></v-text-field>
        </v-col>
      </v-row>
    </div>
    <v-row>
      <v-col>
        <v-select
          label="Regimen"
          variant="outlined"
          v-model="mainForm.regimen"
          density="compact"
          :items="clientsStore.regimes"
          item-title="name"
          item-value="dian_id"
          :rules="regimenRules"
        ></v-select>
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
import { inject, onMounted, reactive, computed, ref } from "vue";
import { useClientsStore } from "../../store/useClientsStore";
import {
  isCompanyDocumentType,
  isPersonDocumentType,
  mainInfoValidations,
} from "../../validations/validations";
import { isValidCompanyName, isValidDocumentNumber, isValidName, validationMainInfoExport } from "../../validations/extraValidations";
const clientsStore = useClientsStore();
const swal: any = inject("swal");


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
  name: "asdg",
  documentType: "50",
  documentNumber: "123124",
  regimen: '48',
});

const firstNameRules = ref([
  async () => {
    const message = "El primer nombre es obligatorio";
    try {
      const isPerson = isPersonDocumentType(mainForm.documentType ?? "");
      if (!isPerson) {
        return true;
      }
      // Si es documento de persona y el nombre está vacío, mostrar error
      if (!mainForm.firstName) {
        return message;
      }

      if (!isValidName(mainForm.firstName)) {
        return "El nombre tiene un formato inválido";
      }
      return true;
    } catch (e: any) {
      return message;
    }
  },
]);

const surenameRules = ref([
  async () => {
    const message = "El primer apellido es obligatorio";
    try {
      const isPerson = isPersonDocumentType(mainForm.documentType ?? "");
      if (!isPerson) {
        return true;
      }
      // Si es documento de persona y el nombre está vacío, mostrar error
      if (!mainForm.surename) {
        return message;
      }

      if (!isValidName(mainForm.surename)) {
        return "El apellido tiene un formato inválido";
      }

      return true;
    } catch (e: any) {
      return message;
    }
  },
]);

const seconNameRules = ref([
  async () => {
    // Si el campo está vacío, no aplicar reglas
    if (!mainForm.secondName || mainForm.secondName.trim() === "") {
      return true;
    }
    if (!isValidName(mainForm.secondName)) {
      return "El segundo nombre tiene un formato inválido";
    }
    return true;
  },
]);

const secondSurenameRules = ref([
  async () => {
    // Si el campo está vacío, no aplicar reglas
    if (!mainForm.second_surename || mainForm.second_surename.trim() === "") {
      return true;
    }
    if (!isValidName(mainForm.second_surename)) {
      return "El apellido tiene un formato inválido";
    }
    return true;
  },
]);

const documentTypeRules = ref([
  async (value: any) => {
    try {
      await mainInfoValidations.documentType.validate(value);
      return true;
    } catch (e: any) {
      return "El tipo de documento es requerido";
    }
  },
]);

const documentNumberRules = ref([
  async (value: any) => {
    try {
      await mainInfoValidations.documentNumber.validate(value);

      const regex = /^[a-zA-Z0-9-]+$/;
      if (!regex.test(value)) {
        return "Solo se permiten números y una letra si la requiere";
      } else if (!isValidDocumentNumber(value)) {
        return "El número de documento no tiene un formato válido";
      }
      return true;
    } catch (e: any) {
      return "El numero de documento es requerido";
    }
  },
]);
const regimenRules = ref([
  async (value: any) => {
    try {
      await mainInfoValidations.regimen.validate(value);
      return true;
    } catch (e: any) {
      return "El regimen es requerido";
    }
  },
]);
const nameRules = ref([
  async () => {
    const message = "La razon social es requerida";
    try {
      const isCompany = isCompanyDocumentType(mainForm.documentType ?? "");
      if (!isCompany) {
        return true;
      }
      if (!mainForm.name) {
        return message;
      }

      if (!isValidCompanyName(mainForm.name)) {
        return "La razon social tiene un formato inválido";
      }

      return true;
    } catch (e: any) {
      return message;
    }
  },
]);
const submitForm = async () => {
  try{
    
    await validationMainInfoExport(mainForm)

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
  }catch(e: any){
    console.log(e.message);
  }
};

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
setForm
//computed function to determinate if document type is company
const isCompany = computed(() => {
  if(mainForm.documentType)
    return isCompanyDocumentType(mainForm.documentType);

  return false
});

onMounted(() => {
  //setForm();
});
</script>

<style scoped></style>
