<!-- ******************** HTML ******************** -->
<template>
    <v-container>
      <v-row>
        <v-col>
          <div class="mb-5">
            <p class="text-h5 text-left">
              <b>
                {{
                  clientsStore.moduleMode === "add"
                    ? "Agregar Usuario"
                    : "Editar Usuario"
                }}
              </b>
            </p>
          </div>
        </v-col>
        <v-col>
          <div class="d-flex justify-end">
            <v-icon color="#841811ff" @click="clientsStore.toogleDialog">
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
          <v-text-field label="Email proveido por Taxxa" prepend-inner-icon="mdi-email" variant="outlined" density="compact"
            class="mb-2" v-model="formData.email" :rules="emailRules">
          </v-text-field>
          <v-text-field label="Contraseña" prepend-inner-icon="mdi-lock" variant="outlined" density="compact" class="mb-2"
            :type="visible ? 'text' : 'password'" v-model="formData.password"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" @click:append-inner="visible = !visible"
            :rules="passwordRules">
          </v-text-field>
          <v-text-field label="URL" prepend-inner-icon="mdi-lock" variant="outlined" density="compact"
            class="mb-2" v-model="formData.url"
            :rules="urlRules">
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
  import { useClientsStore } from "../../store/useClientsStore";
  
  const emit = defineEmits(["onAddUser", "onClose"]);
  const clientsStore = useClientsStore();
  const swal: any = inject("swal");
  
  let visible = ref(false);
  let showValidationErrors = ref(false);
  let thirdId = ref(0);
  let message = ref("");
  
  let formData = reactive({
    email: "",
    password: "",
    url: "",
  });
  
  const validations = {
    email: Yup.string().required("El nombre de usuario es requerido").trim(),
    password: Yup.string().required(),
    url: Yup.string().required("La URL es requerida").trim(),
  };
  
  const emailRules = ref([
    async (value: any) => {
      try {
        await validations.email.validate(value);
        return true;
      } catch (e: any) {
        return e.message;
      }
    },
  ]);
  
  const passwordRules = ref([
    async (value: any) => {
      try {
        if (clientsStore.moduleMode == "add")
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
  
  const urlRules = ref([  
    async () => {
      if (formData.url) return true;
      return "La URL es requerida";
    },
  ]);
  
  let validationSchema = Yup.object(validations);
  
  // const getOne = () => {
  //   if (usersStore.moduleMode !== "edit") return;
  //   usersStore
  //     .getOne(usersStore.selectedItem.id)
  //     .then((user:any) => {
  //       formData.email = user.email;
  //       formData.password = user.password;
  //       formData.confirmPassword = user.password;
  //       thirdId.value = user.thirdPartyId || 0;
  //     })
  //     .catch((error:any) => {
  //       console.error("Error al obtener el usuario:", error);
  //     });
  // };
  
  const setForm = () => {
    if (clientsStore.moduleMode !== "edit") return;
    console.log("clientsStore.selectedItem", clientsStore.selectedItem);
    formData.email = clientsStore.selectedItem.email;
    // formData.password = usersStore.selectedItem.password;
  };
  
  const submit = async () => {
    try {
      await validationSchema.validate(formData);
      const { error, data } = await clientsStore.saveTaxxaInfo(formData);
      if (error) {
        console.log(data)
        message.value = data;
        return;
      }
      if (data) {
        clientsStore.toogleDialog();
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
  
    if (clientsStore.moduleMode == "add") {
      passwordIsValid = !!formData.password;
    }
  
    passwordIsValid =
      passwordIsValid ||
      (formData.password.length >= 6 && formData.password.length <= 20);
    return (
      formData.email &&
      passwordIsValid &&
      thirdPartyIdIsValid &&
      formData.password == formData.password
    );
  });
  onMounted(async () => {
    // identification_type_id.value = await identificationTypeStore.getAllIdentificationTypes();
    setForm();
  });
  </script>
  <!-- ******************** CSS ******************** -->
  <style scoped></style>
  