<!-- ******************** HTML ******************** -->
<template>
  <v-card>
    <v-card-title>
      <strong>
        {{
          permissionsStore.moduleMode === "add"
            ? "Agregar [[PERMISSIONS]]"
            : "Editar [[PERMISSIONS]]"
        }}
      </strong>
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="submit" class="mt-4">
        <v-row>
          <v-col cols="12">
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
            <v-select
              v-model="formData.companyId"
              :items="companies"
              :rules="companyIdRules"
              item-title="name"
              item-value="id"
              color="#841811ff"
              density="compact"
              variant="outlined"
              label="Compañia"
            >
            </v-select>
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              v-model="formData.permissionsTypeId"
              :items="typePermissions"
              :rules="permissionsTypeIdRules"
              item-title="name"
              item-value="id"
              color="#841811ff"
              density="compact"
              variant="outlined"
              label="Tipo de [[PERMISSIONS]]"
            >
            </v-select>
          </v-col>
          <v-col cols="12">
            <v-textarea
              v-model="formData.description"
              :rules="descriptionRules"
              color="#841811ff"
              variant="outlined"
              label="Descripción del [[PERMISSIONS]]"
            ></v-textarea>
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
            :color="permissionsStore.moduleMode === 'add' ? 'success' : 'primary'"
            variant="outlined"
            type="submit"
          >
            {{ permissionsStore.moduleMode === "add" ? "Agregar" : "Editar" }}
          </v-btn>
          <v-btn
            class="d-flex d-sm-none"
            size="small"
            :color="permissionsStore.moduleMode === 'add' ? 'success' : 'primary'"
            variant="outlined"
            type="submit"
          >
            <v-icon>{{
              permissionsStore.moduleMode === "add" ? "mdi-plus" : "mdi-pencil"
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
import { usePermissionsStore } from "../stores/permissions.store";
import * as Yup from "yup";

import { CompanyInterface } from "../interfaces/permissions.interface";

const swal: any = inject("$swal");
const emit = defineEmits(["onAddSuccess", "onClose"]);

const permissionsStore = usePermissionsStore();

let companies = ref([] as Array<CompanyInterface>);

let typePermissions = ref([
  { name: "Tipo 1", id: 1 },
  { name: "Tipo 2", id: 2 },
]);

let formData = reactive({
  name: "",
  description: "",
  companyId: "",
  permissionsTypeId: "",
  //is_active: true,
});

const validations = {
  name: Yup.string().required("El nombre es requerido").trim(),
  description: Yup.string().required("Se necesita una descripción").trim(),
  //companyId: Yup.number().required("Seleccione una compañia por favor"),
  permissionsTypeId: Yup.number().required(
    "Seleccione un tipo de [[PERMISSIONS]] por favor"
  ),
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

const permissionsTypeIdRules = ref([
  async (value: any) => {
    try {
      await validations.permissionsTypeId.validate(value);
      return true;
    } catch (e: any) {
      return "Error de validación del tipo de [[PERMISSIONS]]";
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
  if (permissionsStore.moduleMode !== "edit") return;
  formData.name = permissionsStore.selectedItem.name;
  formData.description = permissionsStore.selectedItem.description;
  //formData.companyId = permissionsStore.selectedItem.company_id;
  formData.permissionsTypeId = permissionsStore.selectedItem.permissions_type_id;
};

const close = () => {
  emit("onClose");
};

const submit = async () => {
  await validationSchema.validate(formData);
  try {
    const addMode = permissionsStore.moduleMode === "add";
    let response;
    if (addMode) {
      response = await permissionsStore.add(formData);
    } else {
      const id = permissionsStore.selectedItem.id;
      response = await permissionsStore.edit(id, formData);
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
//   const response = await permissionsStore.getCompanies();
//   companies.value = response;
// };

onMounted(() => {
  //getCompany();
  setForm();
});
</script>
<!-- ******************** CSS ******************** -->
<style scoped></style>
