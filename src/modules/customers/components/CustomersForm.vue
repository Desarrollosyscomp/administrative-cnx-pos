<!-- ******************** HTML ******************** -->
<template>
  <v-card>
    <v-card-title>
      <strong>
        {{
          customersStore.moduleMode === "add"
            ? "Agregar Clientes"
            : "Editar Clientes"
        }}
      </strong>
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="submit" class="mt-4">
        <v-row>
          <v-col  cols="12"  sm="6">
            <v-switch
            :label="
              formData.is_natural
                ? 'Registrar persona'
                : 'Registrar empresa'
            "
              color="#841811ff"
            >
            </v-switch>
          </v-col>
        </v-row>
        <v-row>   
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="formData.name"
              :rules="nameRules"
              color="#841811ff"
              density="compact"
              variant="outlined"
              label="Nombre"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="formData.secondName"
              :rules="nameRules"
              color="#841811ff"
              density="compact"
              variant="outlined"
              label="Segundo Nombre"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="formData.name"
              :rules="nameRules"
              color="#841811ff"
              density="compact"
              variant="outlined"
              label="Primer Apellido"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="formData.name"
              :rules="nameRules"
              color="#841811ff"
              density="compact"
              variant="outlined"
              label="Segundo Apellido"
            ></v-text-field>
          </v-col>
          <!-- v-model="formdata.identification_type_id"
          :rules="identification_type_idRules"
          :items="identification_type_id" -->
          <!-- item-title="name"
          item-value="id" -->
          <v-select
            color="#841811ff"
            density="compact"
            variant="outlined"
            label="Tipo de documento"
          >
          </v-select>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="formData.name"
              :rules="nameRules"
              color="#841811ff"
              density="compact"
              variant="outlined"
              label="Número de documento"
            ></v-text-field>
          </v-col>
        </v-row>
        <div class="d-flex justify-end mt-4">
          <v-btn
            class="mr-4 d-none d-sm-flex"
            size="small"
            color="#841811ff"
            variant="outlined"
            @click="close"
          >
            Cancelar
          </v-btn>
          <v-btn
            class="mr-4 d-flex d-sm-none"
            size="small"
            color="#841811ff"
            variant="outlined"
            @click="close"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <br />
          <v-btn
            class="d-none d-sm-flex"
            size="small"
            :color="customersStore.moduleMode === 'add' ? 'success' : 'primary'"
            variant="outlined"
            type="submit"
          >
            {{ customersStore.moduleMode === "add" ? "Agregar" : "Editar" }}
          </v-btn>
          <v-btn
            class="d-flex d-sm-none"
            size="small"
            :color="customersStore.moduleMode === 'add' ? 'success' : 'primary'"
            variant="outlined"
            type="submit"
          >
            <v-icon>{{
              customersStore.moduleMode === "add" ? "mdi-plus" : "mdi-pencil"
            }}</v-icon>
          </v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<!-- ******************** JavaScript ******************** -->
<script setup lang="ts">
import { inject, onMounted, reactive, ref } from "vue-demi";
import { useCustomersStore } from "../stores/customers.store";
import * as Yup from "yup";

const swal: any = inject("$swal");
const emit = defineEmits(["onAddSuccess", "onClose"]);

const customersStore = useCustomersStore();

let formData = reactive({
  is_natural: true,
  name: "",
  secondName: "",
  sureName: "",
  secondSureName: "",
});

const validations = {
  name: Yup.string().required("El nombre es requerido").trim(),
  secondName: Yup.string().required("El segundo nombre es requerido").trim(),
  sureName: Yup.string().required("El primer apellido es requerido").trim(),
  secondSureName: Yup.string().required("El segundo apellido es requerido").trim(),  
};

const nameRules = ref([
  async (value: any) => {
    try {
      await validations.name.validate(value);
      return true;
    } catch (e: any) {
      return "Error de validación en el nombre";
    }
  },
]);

const descriptionRules = ref([
  async (value: any) => {
    try {
      await validations.description.validate(value);
      return true;
    } catch (e: any) {
      return "Error de validación en la descripción";
    }
  },
]);

const customersTypeIdRules = ref([
  async (value: any) => {
    try {
      await validations.customersTypeId.validate(value);
      return true;
    } catch (e: any) {
      return "Error de validación del tipo de [[CUSTOMERS]]";
    }
  },
]);

const companyIdRules = ref([
  async (value: any) => {
    try {
      await validations.companyId.validate(value);
      return true;
    } catch (e: any) {
      return "Error de validación en la compañía";
    }
  },
]);

let validationSchema = Yup.object(validations);

const setForm = () => {
  if (customersStore.moduleMode !== "edit") return;
  formData.name = customersStore.selectedItem.name;
  formData.description = customersStore.selectedItem.description;
  //formData.companyId = customersStore.selectedItem.company_id;
  formData.customersTypeId = customersStore.selectedItem.customers_type_id;
};

const close = () => {
  emit("onClose");
};

const submit = async () => {
  await validationSchema.validate(formData);
  try {
    const addMode = customersStore.moduleMode === "add";
    let response;
    if (addMode) {
      response = await customersStore.add(formData);
    } else {
      const id = customersStore.selectedItem.id;
      response = await customersStore.edit(id, formData);
    }
    emit("onAddSuccess");
    if (response.status === 201) {
      swal.fire({
        icon: "success",
        text: addMode ? "Agregado con éxito" : "Actulizado con éxito",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      swal.fire({
        icon: "success",
        text: "Agregado!!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } catch (error) {
    swal.fire({
      icon: "warning",
      text: "Ocurrió un error",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
// const getCompany = async () => {
//   const response = await customersStore.getCompanies();
//   companies.value = response;
// };

onMounted(() => {
  //getCompany();
  setForm();
});
</script>
<!-- ******************** CSS ******************** -->
<style scoped></style>
