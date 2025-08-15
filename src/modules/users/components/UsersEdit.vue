<!-- ******************** HTML ******************** -->
<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="mb-5">
          <p class="text-h5 text-left">
            <b>
              {{
                usersStore.moduleMode === "add"
                  ? "Agregar Usuario"
                  : "Editar Usuario"
              }}
            </b>
          </p>
        </div>
      </v-col>
      <v-col>
        <div class="d-flex justify-end">
          <v-icon color="#841811ff" @click="usersStore.toogleDialog">
            mdi-close
          </v-icon>
        </div>
      </v-col>
    </v-row>
    <div>
      <v-form @submit.prevent="submitNewUsername">
        <v-alert
          v-if="message"
          class="mb-4"
          type="error"
          variant="outlined"
          density="compact"
        >
          {{ message }}
        </v-alert>
        <v-text-field
          label="Nombre de usuario"
          prepend-inner-icon="mdi-email"
          variant="outlined"
          density="compact"
          v-model="formData.username"
          :rules="usernameRules"
        >
        </v-text-field>
        <v-btn
          variant="outlined"
          color="success"
          block
          class="mb-5 mt-n2"
          type="submit"
          :disabled="isDisabledUsername || !isFormChanged"
        >
          Guardar nombre de usuario
        </v-btn>
      </v-form>
    </div>
    <div>
      <v-form @submit.prevent="submitNewPassword">
        <v-alert
          v-if="messageCurrentPassword"
          class="mb-4"
          type="error"
          variant="outlined"
          density="compact"
        >
          {{ messageCurrentPassword }}
        </v-alert>
        <v-text-field
          label="Contraseña actual "
          prepend-inner-icon="mdi-lock"
          variant="outlined"
          density="compact"
          class="mb-2"
          :type="visible ? 'text' : 'password'"
          v-model="formData.currentPassword"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="visible = !visible"
          :rules="currentPasswordRules"
        >
        </v-text-field>
        <v-text-field
          label="Nueva contraseña"
          prepend-inner-icon="mdi-lock"
          variant="outlined"
          density="compact"
          class="mb-2"
          :type="visible1 ? 'text' : 'password'"
          v-model="formData.newPassword"
          :append-inner-icon="visible1 ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="visible1 = !visible1"
          :rules="newPasswordRules"
        >
        </v-text-field>
        <v-text-field
          label="Confirmar contraseña"
          prepend-inner-icon="mdi-lock"
          variant="outlined"
          density="compact"
          class="mb-2"
          :type="visible2 ? 'text' : 'password'"
          v-model="formData.confirmPassword"
          :append-inner-icon="visible2 ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="visible2 = !visible2"
          :rules="confirmPasswordRules"
        >
        </v-text-field>
        <v-btn
          variant="outlined"
          color="success"
          block
          type="submit"
          :disabled="isDisabledPassword"
        >
          Guardar contraseña
        </v-btn>
      </v-form>
    </div>
  </v-container>
</template>

<!-- ******************** JavaScript ******************** -->
<script setup lang="ts">
import { computed, inject, onMounted, reactive, ref } from "vue-demi";
import * as Yup from "yup";

import { useUsersStore } from "../stores/users.store";

const emit = defineEmits(["onAddUser", "onClose"]);
const swal: any = inject("swal");
const usersStore = useUsersStore();
let isDisabledUsername = ref(false);
let isDisabledPassword = ref(false);

let visible = ref(false);
let visible1 = ref(false);
let visible2 = ref(false);
let message = ref("");
let messageCurrentPassword = ref("");

let formData = reactive({
  username: "",
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});
const validationUsername = {
  username: Yup.string().required("El nombre es requerido").trim(),
};
const validations = {
  currentPassword: Yup.string()
    .required("La contraseña actual es requerida")
    .trim(),
  confirmPassword: Yup.string()
    .required("La confirmación de contraseña es requerida")
    .trim()
    .test(
      "is-valid-confirm-password",
      "Las contraseñas no coinciden",
      function (value) {
        if (!value || value.length === 0) {
          return true; // No valida si está vacío
        }
        return value === this.parent.newPassword; // Compara con la contraseña ingresada
      }
    ),
  newPassword: Yup.string()
    .trim()
    .test(
      "is-valid-password",
      "La contraseña debe tener entre 6 y 20 caracteres",
      function (value) {
        if (!value || value.length === 0) {
          return true; // No valida si está vacío
        }
        return value.length >= 6 && value.length <= 20;
      }
    ),
};

const usernameRules = ref([
  async (value: any) => {
    try {
      await validationUsername.username.validate(value);
      return true;
    } catch (e: any) {
      return e.message;
    }
  },
]);

const currentPasswordRules = ref([
  async (value: any) => {
    try {
      if (usersStore.moduleMode == "add")
        validations.currentPassword = validations.currentPassword.required(
          "La contraseña es requerida"
        );
      await validations.currentPassword.validate(value);
      return true;
    } catch (e: any) {
      return e.message;
    }
  },
]);

const newPasswordRules = ref([
  async (value: any) => {
    try {
      validations.newPassword = validations.newPassword.required(
        "La contraseña es requerida"
      );
      await validations.newPassword.validate(value);
      return true;
    } catch (e: any) {
      return e.message;
    }
  },
]);

const confirmPasswordRules = ref([
  async () => {
    if (formData.newPassword == formData.confirmPassword) return true;
    return "Las contraseñas no coinciden";
  },
]);

let validationSchema = Yup.object(validations);
let validationUsernameSchema = Yup.object(validationUsername);

const setForm = () => {
  if (usersStore.moduleMode !== "edit") return;
  formData.username = usersStore.selectedItem.username;
};

const submitNewUsername = async () => {
  try {
    isDisabledUsername.value = true;
    await validationUsernameSchema.validate({ username: formData.username });
    const id = usersStore.selectedItem.id;
    const { error, data } = await usersStore.updateUsername(id, {
      username: formData.username,
    });

    if (error) {
      message.value = data;
      return;
    }
    if (data) {
      usersStore.toogleDialog();
      await swal.fire({
        icon: "success",
        title: "Éxito",
        text: `El nombre de usuario ha sido actualizado a ${formData.username}`,
        showConfirmButton: false,
        timer: 1000,
      });
    }
  } catch (e) {
    console.log("Error de validación:", e);
  }
  isDisabledUsername.value = false;
};

const submitNewPassword = async () => {
  try {
    isDisabledPassword.value = true;
    const { currentPassword, newPassword, confirmPassword } = formData;
    await validationSchema.validate({
      currentPassword,
      newPassword,
      confirmPassword,
    });
    const id = usersStore.selectedItem.id;

    const { error, data } = await usersStore.updatePassword(id, {
      currentPassword,
      newPassword,
      confirmPassword,
    });

    if (error) {
      messageCurrentPassword.value = data;
      return;
    }
    if (data) {
      usersStore.toogleDialog();
      await swal.fire({
        icon: "success",
        title: "Éxito",
        text: "La contraseña ha sido actualizada correctamente",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  } catch (e) {
    console.log("Error de validación:", e);
  }
  isDisabledPassword.value = false;
};

let formOrigin = ref<string>("");

const setFormWatcher = () => {
  if (usersStore.selectedItem) {
    formOrigin.value = `${usersStore.selectedItem?.username}`;
  }
};
const formEdit = computed(() => {
  return formData.username;
});

const isFormChanged = computed(() => {
  return formOrigin.value !== formEdit.value;
});

onMounted(async () => {
  setForm();
  setFormWatcher();
});
</script>
<!-- ******************** CSS ******************** -->
<style scoped></style>
