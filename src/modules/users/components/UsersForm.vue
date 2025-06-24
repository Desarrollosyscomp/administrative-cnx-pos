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
      <v-form @submit.prevent="submit">
        <v-alert v-if="message" class="mb-4" type="error" variant="outlined" density="compact">
          {{ message }}
        </v-alert>
        <v-text-field label="Nombre de usuario" prepend-inner-icon="mdi-email" variant="outlined" density="compact"
          class="mb-2" v-model="formData.username" :rules="usernameRules">
        </v-text-field>
        <v-text-field label="Contraseña" prepend-inner-icon="mdi-lock" variant="outlined" density="compact" class="mb-2"
          :type="visible ? 'text' : 'password'" v-model="formData.password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" @click:append-inner="visible = !visible"
          :rules="passwordRules">
        </v-text-field>
        <v-text-field label="Confirmar contraseña" prepend-inner-icon="mdi-lock" variant="outlined" density="compact"
          class="mb-2" :type="visible1 ? 'text' : 'password'" v-model="formData.confirmPassword"
          :append-inner-icon="visible1 ? 'mdi-eye-off' : 'mdi-eye'" @click:append-inner="visible1 = !visible1"
          :rules="confirmPasswordRules">
        </v-text-field>
        <v-btn variant="outlined" color="success" block type="submit" :isDisabled="!showSaveButton">
          Guardar
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
const usersStore = useUsersStore();
const swal: any = inject("swal");

let visible = ref(false);
let visible1 = ref(false);
let showValidationErrors = ref(false);
let thirdId = ref(0);
let message = ref("");

let formData = reactive({
  username: "",
  password: "",
  confirmPassword: "",
});

const validations = {
  username: Yup.string().required("El nombre de usuario es requerido").trim(),
  confirmPassword: Yup.string().required("La confirmación de contraseña es requerida").trim().test(
    "is-valid-confirm-password",
    "Las contraseñas no coinciden",
    function (value) {
      if (!value || value.length === 0) {
        return true; // No valida si está vacío
      }
      return value === this.parent.password; // Compara con la contraseña ingresada
    }
  ),
  password: Yup.string().trim().test(
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
      await validations.username.validate(value);
      return true;
    } catch (e: any) {
      return e.message;
    }
  },
]);

const passwordRules = ref([
  async (value: any) => {
    try {
      if (usersStore.moduleMode == "add")
        validations.password = validations.password.required(
          "La contraseña es requerida"
        );
      await validations.password.validate(value);
      return true;
    } catch (e: any) {
      return e.message;
    }
  },
]);

const confirmPasswordRules = ref([
  async () => {
    if (formData.password == formData.confirmPassword) return true;
    return "Las contraseñas no coinciden";
  },
]);

let validationSchema = Yup.object(validations);

// const getOne = () => {
//   if (usersStore.moduleMode !== "edit") return;
//   usersStore
//     .getOne(usersStore.selectedItem.id)
//     .then((user:any) => {
//       formData.username = user.username;
//       formData.password = user.password;
//       formData.confirmPassword = user.password;
//       thirdId.value = user.thirdPartyId || 0;
//     })
//     .catch((error:any) => {
//       console.error("Error al obtener el usuario:", error);
//     });
// };

const setForm = () => {
  if (usersStore.moduleMode !== "edit") return;
  console.log("usersStore.selectedItem", usersStore.selectedItem);
  formData.username = usersStore.selectedItem.username;
  // formData.password = usersStore.selectedItem.password;
};

const submit = async () => {
  try {
    await validationSchema.validate(formData);
    const { error, data } = await usersStore.add(formData);
    if (error) {
      console.log(data)
      message.value = data;
      return;
    }
    if (data) {
      usersStore.toogleDialog();
      await swal.fire({
        icon: "success",
        text: "Usuario agregado con éxito",
        showConfirmButton: false,
        timer: 1000,
      });
    }

  } catch (e) {
    console.log("Error de validación:", e);
    showValidationErrors.value = true;
  }
};

const showSaveButton = computed(() => {
  let passwordIsValid = true;
  let thirdPartyIdIsValid = thirdId.value != 0;

  if (usersStore.moduleMode == "add") {
    passwordIsValid = !!formData.password;
  }

  passwordIsValid =
    passwordIsValid ||
    (formData.password.length >= 6 && formData.password.length <= 20);
  return (
    formData.username &&
    passwordIsValid &&
    thirdPartyIdIsValid &&
    formData.password == formData.confirmPassword
  );
});
onMounted(async () => {
  // identification_type_id.value = await identificationTypeStore.getAllIdentificationTypes();
  setForm();
});
</script>
<!-- ******************** CSS ******************** -->
<style scoped></style>
