<template>
  <v-row>
    <v-col cols="12" md="5" class="pa-6 mx-n1">
      <p class="font-size text-center">
        <b> Formulario inicio sesion web reporter </b>
      </p>
      <br />
      <v-skeleton-loader
        type="image"
        v-if="!clientsStore.selectedItem?.name"
      ></v-skeleton-loader>
      <div class="align-items" v-else>
        <div align="center" class="mt-7">
          <img src="../../../assets/images/report-bro.svg" width="210px" />
        </div>
        <v-btn
          v-if="clientsStore.selectedWebUtilitiesInfo.conxposUtilityAuth"
          variant="outlined"
          :color="
            clientsStore.selectedWebUtilitiesInfo.conxposUtilityAuth.status == 1
              ? 'error'
              : 'success'
          "
          type="submit"
          @click="inactiveWebUtilitiesAndDatabase"
          block
        >
          {{
            clientsStore.selectedWebUtilitiesInfo.conxposUtilityAuth.status == 1
              ? "Inactivar"
              : "Activar"
          }}
        </v-btn>
      </div>
    </v-col>
    <v-divider vertical></v-divider>
    <v-col cols="12" md="7" class="pa-5 mt-n5">
      <v-alert
        v-if="!credentialsObject?.database"
        type="warning"
        variant="outlined"
        density="compact"
        class="mt-2"
      >
        Se necesita crear una base de datos para poder configurar las
        herramientas web.
      </v-alert>
      <br />

      <div>
        <v-alert
          v-if="message"
          class="mb-4"
          type="error"
          variant="outlined"
          density="compact"
        >
          {{ message }}
        </v-alert>
        <v-form @submit.prevent="submitDatabaseName">
          <v-text-field
            label="Nombre de base de datos"
            :rules="databaseNameRules"
            prepend-inner-icon="mdi-database-edit"
            variant="outlined"
            density="compact"
            class="mb-3"
            v-model="databaseNameObject.databaseName"
            type="email"
            :disabled="disableForm"
            append-inner-icon="mdi-file-document-outline"
            @click:append-inner="submitDatabaseName"
          >
          </v-text-field>
        </v-form>
        <v-form @submit.prevent="submitForm">
          <v-text-field
            label="Ip base de datos"
            prepend-inner-icon="mdi-database"
            variant="outlined"
            density="compact"
            class="mb-3"
            v-model="formDataUtilities.databaseIP"
            :rules="databaseIPRules"
            type="email"
            :disabled="disableForm"
          >
          </v-text-field>
          <v-text-field
            label="Nombre de usuario"
            prepend-inner-icon="mdi-account"
            variant="outlined"
            density="compact"
            class="mb-3"
            v-model="formDataUtilities.username"
            :rules="usernameRules"
            type="email"
            :disabled="disableForm"
          >
          </v-text-field>
          <v-text-field
            v-if="!isSetForm"
            label="Contraseña"
            prepend-inner-icon="mdi-lock"
            variant="outlined"
            density="compact"
            :type="visible ? 'text' : 'password'"
            v-model="formDataUtilities.password"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="visible = !visible"
            :rules="passwordRules"
            :disabled="disableForm"
          >
          </v-text-field>
          <div class="justify-end d-flex mt-1">
            <v-btn
              variant="outlined"
              color="success"
              type="submit"
              :disabled="!isFormChanged"
              block
            >
              Guardar
            </v-btn>
          </div>
        </v-form>
        <v-form @submit.prevent="submitNewPassword">
          <br />
          <v-row v-if="isSetForm">
            <v-col cols="12" md="6">
              <v-text-field
                label="Nueva contraseña"
                prepend-inner-icon="mdi-lock"
                variant="outlined"
                density="compact"
                :type="visiblePassword ? 'text' : 'password'"
                v-model="formDataUtilitiesPassword.newPassword"
                :append-inner-icon="visiblePassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="visiblePassword = !visiblePassword"
                :rules="newPasswordRules"
                :disabled="disableForm"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="Confirmar contraseña"
                prepend-inner-icon="mdi-lock"
                variant="outlined"
                density="compact"
                :type="visibleConfirmPassword ? 'text' : 'password'"
                v-model="formDataUtilitiesPassword.confirmPassword"
                :append-inner-icon="
                  visibleConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'
                "
                @click:append-inner="
                  visibleConfirmPassword = !visibleConfirmPassword
                "
                :rules="confirmPasswordRules"
                :disabled="disableForm"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <div class="justify-end mt-1" v-if="isSetForm">
            <v-btn
              variant="outlined"
              color="success"
              type="submit"
              block
              :disabled="disableForm"
            >
              Guardar nueva contraseña
            </v-btn>
          </div>
        </v-form>
      </div>
    </v-col>
  </v-row>
</template>
<!-- ******************** JavaScript ******************** -->
<script setup lang="ts">
import { useRoute } from "vue-router";
// import router from "../../../router";
// import { TThirdParty } from "../interfaces/third-party.interface";
import { useClientsStore } from "../store/useClientsStore";
import { computed, inject, onMounted, reactive, ref, watch } from "vue";
const emit = defineEmits(["onAddUser", "onClose", "onDesactivate"]);
const clientsStore = useClientsStore();
const swal: any = inject("swal");
import * as Yup from "yup";
// import { useAppStore } from "../../../stores/app-store";
// import { useAppStore } from "../../../stores/app-store";
// const appStore = useAppStore();
const route = useRoute();
let visible = ref(false);
let visiblePassword = ref(false);
let visibleConfirmPassword = ref(false);
// const appStore = useAppStore();
const isDatabaseNameSave = ref(false);
// let showValidationErrors = ref(false);
let message = ref("");

const formDataUtilities = reactive({
  databaseIP: "",
  username: "",
  password: "",
  status: 1,
});
const formDataUtilitiesPassword = reactive({
  newPassword: "",
  confirmPassword: "",
});
const databaseNameObject = reactive({
  databaseName: "",
});
const isSetForm = ref(false);

const validationDatabaseName = {
  databaseName: Yup.string()
    .required("El nombre de la base de datos es requerido")
    .trim(),
};
const validations = {
  databaseIP: Yup.string()
    .required("La ip de la base de datos es requerida")
    .trim(),
  username: Yup.string().required("El nombre de usuario es requerido"),
  password: Yup.string().when([], {
    is: () => clientsStore.moduleMode != "edit",
    then: (schema) => schema.required("La contraseña es requerida"),
    otherwise: (schema) => schema.notRequired(),
  }),
};
const validationsPassword = {
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
        return value === this.parent.newPassword;
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

const databaseIPRules = ref([
  async (value: any) => {
    try {
      await validations.databaseIP.validate(value);
      return true;
    } catch (e: any) {
      return e.message;
    }
  },
]);
const databaseNameRules = ref([
  async (value: any) => {
    try {
      await validationDatabaseName.databaseName.validate(value);
      return true;
    } catch (e: any) {
      return e.message;
    }
  },
]);

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
      await validations.password.validate(value);
      return true;
    } catch (e: any) {
      return e.message;
    }
  },
]);

const newPasswordRules = ref([
  async (value: any) => {
    try {
      await validationsPassword.newPassword.validate(value);
      return true;
    } catch (e: any) {
      return e.message;
    }
  },
]);
const confirmPasswordRules = ref([
  async () => {
    if (
      formDataUtilitiesPassword.newPassword ==
      formDataUtilitiesPassword.confirmPassword
    )
      return true;
    return "Las contraseñas no coinciden";
  },
]);
let validationSchema = Yup.object(validations);
let validationSchemaPassword = Yup.object(validationsPassword);
// let validationSchemaDatabaseName = Yup.object(validationDatabaseName);

const submitForm = async () => {
  if (isDatabaseNameSave.value) {
    message.value = "Por favor, guarde el nombre de la base de datos";
    return;
  }
  await validationSchema.validate(formDataUtilities);
  const addMode = clientsStore.moduleMode == "add";
  let _data;
  if (addMode) {
    const { error, data } = await clientsStore.createAuthWebUtilities(
      formDataUtilities
    );
    if (error) {
      message.value = `${data.error}.`;
      return;
    }
    _data = data;
  } else {
    const { error, data } = await clientsStore.editAuthWebUtilities({
      databaseIP: formDataUtilities.databaseIP,
      username: formDataUtilities.username,
    });
    console.log(data.error);
    if (error) {
      message.value = `${data.error}.`;
      return;
    }
    setForm();
    _data = data;
  }
  if (_data) {
    await swal.fire({
      icon: "success",
      text: addMode
        ? "Usuario guardado correctamente"
        : "Usuario actualizado correctamente",
      showConfirmButton: false,
      timer: 2000,
    });
    await setForm();
    loadWebUtilities();
    formOrigin.value =
      authcredentialsObject.value?.database_ip +
      authcredentialsObject.value?.username;
  }
};
const submitDatabaseName = async () => {
  // await validationSchema.validate(formDataUtilities);
  const addMode = clientsStore.moduleModeWebUtilities == "add";
  console.log(clientsStore.moduleModeWebUtilities);
  let _data;
  if (addMode) {
    console.log("estoy en add");
    const { error, data } = await clientsStore.sendDatabaseName(
      databaseNameObject.databaseName
    );
    console.log(data);
    if (error) {
      message.value = `${data.error}.`;
      return;
    }
    _data = data;
  } else {
    console.log("estoy en edit");
    const response = await clientsStore.editDatabaseName(
      databaseNameObject.databaseName
    );
    console.log(response);
    if (response.error) {
      message.value = `${response.data.error}.`;
      return;
    }
    _data = response.data;
  }
  console.log(_data);
  if (_data) {
    await swal.fire({
      icon: "success",
      text: addMode
        ? "Nombre de base de datos guardado correctamente"
        : "Nombre de base de datos actualizado correctamente",
      showConfirmButton: false,
      timer: 2000,
    });
    await setDatabaseName();
    await loadWebUtilitiesDatabase();
    // formOrigin.value =
    //   authcredentialsObject.value?.database_ip +
    //   authcredentialsObject.value?.username;
  }
};
const submitNewPassword = async () => {
  await validationSchemaPassword.validate(formDataUtilitiesPassword);
  const response = await clientsStore.resetPasswordWebUtilities(
    formDataUtilitiesPassword
  );
  if (response.error) {
    message.value = `${response.data.message}.`;
    return;
  }
  if (response.data) {
    await swal.fire({
      icon: "success",
      text: "Contraseña actualizada correctamente",
      showConfirmButton: false,
      timer: 2000,
    });
    formDataUtilitiesPassword.newPassword = "";
    formDataUtilitiesPassword.confirmPassword = "";
  }
};

const setForm = async (): Promise<void> => {
  const response = await clientsStore.setAuthWebUtilities(route.params.id);
  if (!response.data.utilitiesAuth.conxposUtilityAuth) return;
  isSetForm.value = true;
  formDataUtilities.databaseIP =
    response.data.utilitiesAuth.conxposUtilityAuth.database_ip;
  formDataUtilities.username =
    response.data.utilitiesAuth.conxposUtilityAuth.username;

  clientsStore.selectedWebUtilitiesInfo = response.data.utilitiesAuth;
};
const setDatabaseName = async () => {
  const response = await clientsStore.setDatabaseWebUtilities(route.params.id);
  console.log(response.data.utilitiesDatabase);
  if (!response.data) return;
  databaseNameObject.databaseName =
    response.data.utilitiesDatabase?.database_name ?? "";
  clientsStore.selectedWebUtilitiesDatabase = response.data.utilitiesDatabase;
};

const loadElectronicInvoiceProviders = async () => {
  await clientsStore.loadElectronicInvoiceProviders();
};

const loadWebUtilities = async () => {
  console.log(clientsStore.selectedWebUtilitiesInfo.conxposUtilityAuth == null);
  if (clientsStore.selectedWebUtilitiesInfo.conxposUtilityAuth) {
    console.log("edit");
    clientsStore.moduleMode = "edit";
  } else {
    console.log("add");
    clientsStore.moduleMode = "add";
  }
};

const loadWebUtilitiesDatabase = async () => {
  console.log(clientsStore.selectedWebUtilitiesDatabase == null);
  if (clientsStore.selectedWebUtilitiesDatabase) {
    console.log("edit");
    clientsStore.moduleModeWebUtilities = "edit";
  } else {
    console.log("add");
    clientsStore.moduleModeWebUtilities = "add";
  }
};
const credentialsObject = computed(() => {
  return clientsStore.selectedItemTaxxaInfo?.data?.tenantWithClient;
});
const authcredentialsObject = computed(() => {
  return clientsStore.selectedWebUtilitiesInfo.conxposUtilityAuth;
});

const loadClient = () => {
  return clientsStore.loadClient(route.params.id as string);
};

// const onPermissions = () => {
//   router.push("/client/" + route.params.id + "/permissions");
// };

let formOrigin = ref<string>("");

const setFormWatcher = () => {
  // if (credentialsObject.value?.taxxaTenant) {
  //   formOrigin.value = `${credentialsObject.value?.taxxaTenant?.email}${credentialsObject.value?.taxxaTenant?.password}${credentialsObject.value?.taxxaTenant?.url}${credentialsObject.value?.taxxaTenant?.login_url}`;
  // }
  console.log(authcredentialsObject.value);
  if (authcredentialsObject.value) {
    formOrigin.value = `${authcredentialsObject.value?.database_ip}${authcredentialsObject.value?.username}`;
  }
};

const formEdit = computed(() => {
  return formDataUtilities.databaseIP + formDataUtilities.username;
});

const isFormChanged = computed(() => {
  return formOrigin.value !== formEdit.value;
});

const disableForm = computed(() => {
  if (!credentialsObject.value) {
    return true;
  }
  if (clientsStore.selectedItem.is_active == false) {
    return true;
  }
  if (clientsStore.selectedWebUtilitiesInfo.conxposUtilityAuth?.status == 0) {
    return true;
  }
  return false;
});

const inactiveDatabase = async () => {
  const response = await clientsStore.inactiveWebUtilitiesDatabase(
    !clientsStore.selectedWebUtilitiesDatabase.is_active
  );
  if (response.error) {
    message.value = `${response.data.error}.`;
    return;
  }
};

const inactiveWebUtilitiesAndDatabase = async () => {
  console.log(!clientsStore.selectedWebUtilitiesInfo.conxposUtilityAuth.status);
  console.log(!clientsStore.selectedWebUtilitiesDatabase.is_active);
  const response = await clientsStore.inactiveWebUtilities(
    !clientsStore.selectedWebUtilitiesInfo.conxposUtilityAuth.status
  );
  if (response.error) {
    message.value = `${response.data.error}.`;
    return;
  }
  await inactiveDatabase();
  await swal.fire({
    icon: "success",
    text: "Heramienta web para cliente inactivada correctamente",
    showConfirmButton: false,
    timer: 2000,
  });
  await setForm();
  await setDatabaseName();
};

watch(message, () => {
  if (message.value) {
    setTimeout(() => {
      message.value = "";
    }, 2000);
  }
});

onMounted(async () => {
  clientsStore.moduleMode = "add";
  setForm();
  await setDatabaseName();
  await loadElectronicInvoiceProviders();
  await loadClient();
  setFormWatcher();
  loadWebUtilities();
  loadWebUtilitiesDatabase();
});
</script>
<style>
.full-height-card {
  height: 100%;
}

.align-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.font-size {
  font-size: 16px;
}

.color-font {
  color: gray;
}

.active {
  color: #4caf50;
}

.inactive {
  color: #841811ff;
}

.align-items {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 55px;
}
</style>
