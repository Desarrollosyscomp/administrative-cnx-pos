<!-- ******************** HTML ******************** -->
<template>
  <v-card>
    <v-card-title>
      <strong>
        {{
          usersStore.moduleMode === "add"
            ? "Agregar usuario"
            : "Editar usuario"
        }}
      </strong>
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="submit" class="mt-4">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="formData.username"
              :rules="usernameRules"
              color="#841811ff"
              density="compact"
              variant="outlined"
              label="Nombre"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="formData.password"
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :rules="passwordRules"
              color="#841811ff"
              density="compact"
              variant="outlined"
              :type="visible ? 'text' : 'password'"
              prepend-inner-icon="mdi-lock-outline"
              label="password"
              @click:append-inner="visible = !visible"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-select
              v-model="formData.role_id"
              :items="roles"
              :rules="roleRules"
              item-title="name"
              item-value="id"
              color="#841811ff"
              density="compact"
              variant="outlined"
              label="Role"
            >
            </v-select>
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
            :color="usersStore.moduleMode === 'add' ? 'success' : 'primary'"
            variant="outlined"
            type="submit"
          >
            {{ usersStore.moduleMode === "add" ? "Agregar" : "Editar" }}
          </v-btn>
          <v-btn
            class="d-flex d-sm-none"
            size="small"
            :color="usersStore.moduleMode === 'add' ? 'success' : 'primary'"
            variant="outlined"
            type="submit"
          >
            <v-icon>{{
              usersStore.moduleMode === "add" ? "mdi-plus" : "mdi-pencil"
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
import { useUsersStore } from "../stores/users.store";
import * as Yup from "yup";

const swal: any = inject("$swal");
const emit = defineEmits(["onAddSuccess", "onClose"]);

const usersStore = useUsersStore();

let visible = ref(true);

let roles = ref([
  { id: 1, name: "Administrador" },
  { id: 2, name: "Usuario" },
]);

let formData = reactive({
  username: "",
  password: "",
  role_id: ""
});

const validations = {
  username: Yup.string().required("El nombre es requerido").trim(),
  password: Yup.string().required("Se necesita un password").trim(),
  role_id: Yup.number().required(
    "Seleccione un role para el usuario por favor"
  ),
};

const usernameRules = ref([
  async (value: any) => {
    try {
      await validations.username.validate(value);
      return true;
    } catch (e: any) {
      return "Error de validación en el nombre";
    }
  },
]);

const passwordRules = ref([
  async (value: any) => {
    try {
      await validations.password.validate(value);
      return true;
    } catch (e: any) {
      return "Error de validación en el password";
    }
  },
]);

const roleRules = ref([
  async (value: any) => {
    try {
      await validations.role_id.validate(value);
      return true;
    } catch (e: any) {
      return "Error de validación en el role";
    }
  },
]);

let validationSchema = Yup.object(validations);

const setForm = () => {
  if (usersStore.moduleMode !== "edit") return;
  formData.username = usersStore.selectedItem.username;
  formData.password = usersStore.selectedItem.password;
  formData.role_id = usersStore.selectedItem.role_id;
};

const close = () => {
  emit("onClose");
};

const submit = async () => {
  console.log(formData.username);
  
  await validationSchema.validate(formData);
  try {
    const addMode = usersStore.moduleMode === "add";
    let response;
    if (addMode) {
      response = await usersStore.add(formData);
    } else {
      const id = usersStore.selectedItem.id;
      response = await usersStore.edit(id, formData);
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
//   const response = await usersStore.getCompanies();
//   companies.value = response;
// };

onMounted(() => {
  //getCompany();
  setForm();
});
</script>
<!-- ******************** CSS ******************** -->
<style scoped></style>
