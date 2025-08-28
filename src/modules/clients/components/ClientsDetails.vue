<template>
  <LayoutOne>
    <v-container class="pa-3" fluid>
      <v-row>
        <v-col cols="12" md="4">
          <v-card elevation="3" class="full-height-card">
            <v-card-text class="pa-5">
              <div align="center">
                <v-skeleton-loader
                  type="image"
                  v-if="!clientsStore.selectedItem?.name"
                ></v-skeleton-loader>
                <v-avatar color="brown" size="120" v-else>
                  <span class="text-h3">{{ parsedPerfilName() }}</span>
                </v-avatar>
                <p class="text-h6 mt-2">
                  <b>
                    {{ parsedNameClient() }}
                  </b>
                </p>
                <p
                  class="text-h7"
                  :class="
                    clientsStore.selectedItem?.is_active ? 'active' : 'inactive'
                  "
                >
                  {{
                    clientsStore.selectedItem?.is_active ? "Activo" : "Inactivo"
                  }}
                </p>
              </div>
              <v-skeleton-loader
                type="paragraph"
                v-if="!clientsStore.selectedItem?.name"
              ></v-skeleton-loader>
              <div class="align-buttons mt-2 mb-5" v-else>
                <v-btn
                  variant="outlined"
                  color="#841811ff"
                  density="compact"
                  @click="unableItem(clientsStore.selectedItem)"
                >
                  {{
                    clientsStore.selectedItem?.is_active
                      ? "Inactivar"
                      : "Restaurar"
                  }}
                </v-btn>
                <v-btn
                  variant="outlined"
                  color="#4caf50"
                  density="compact"
                  v-if="clientsStore.selectedItem?.is_active == true"
                  @click="goToEdit()"
                >
                  Editar
                </v-btn>
                <v-btn
                  variant="outlined"
                  color="#3e97ffff"
                  density="compact"
                  @click="onPermissions()"
                  v-if="credentialsObject?.client?.is_active == true"
                >
                  Permisos
                </v-btn>
              </div>
              <v-divider></v-divider>
              <!-- <v-skeleton-loader type="paragraph" v-if="!credentialsObject?.schema?.name"></v-skeleton-loader> -->
              <div class="mt-5">
                <span class="color-font">
                  <v-locale-provider locale="es">
                    <v-expansion-panels>
                      <v-expansion-panel>
                        <v-expansion-panel-title>
                          <b> Licencia </b>
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                          <v-form @submit.prevent="sendLicense">
                            <v-date-input
                            class="mt-2 mb-n2"
                            label="Fecha inicio licencia"
                            clearable
                              variant="outlined"
                              density="compact"
                              location="end center"
                              :rules="initDateRules"
                              v-model="licenseForm.init_date"
                              :disabled="disableForm"
                            ></v-date-input>
                            <v-date-input
                              class="mt-2"
                              label="Fecha fin licencia"
                              clearable
                              variant="outlined"
                              density="compact"
                              location="end center"
                              :rules="endDateRules"
                              v-model="licenseForm.end_date"
                              :disabled="disableForm"
                              ></v-date-input>
                              <p v-if="!credentialsObject" class="text-red mt-n2" style="font-size: 12px">
                                Se necesita crear una base de datos para
                                modificar la licencia
                              </p>
                              <div align="end">
                                <v-btn
                                variant="outlined"
                                color="success"
                                density="compact"
                                type="submit"
                                :disabled="disableForm || !isFormChangedLicense || clickLicense"
                              >
                                Guardar</v-btn
                              >
                            </div>
                          </v-form>
                        </v-expansion-panel-text>
                      </v-expansion-panel>
                      <v-expansion-panel>
                        <v-expansion-panel-title>
                          <b> Base de datos </b>
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                          <span
                            class="color-font"
                            v-if="credentialsObject?.schema?.name"
                          >
                            {{
                              credentialsObject?.schema?.name ?? "No asignada"
                            }}
                          </span>
                          <span
                            class="text-blue"
                            v-else-if="!credentialsObject"
                            @click="openCreateSchemaSwal"
                            style="cursor: pointer"
                          >
                            {{ "Crear base de datos" }}
                          </span>
                        </v-expansion-panel-text>
                      </v-expansion-panel>
                      <v-expansion-panel>
                        <v-expansion-panel-title>
                          <b> URL del cliente </b>
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                          <span
                            class="color-font"
                          >
                            {{
                              clientsStore.selectedItemTaxxaInfo?.url
                            }}
                          </span>
                        </v-expansion-panel-text>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </v-locale-provider>
                </span>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card elevation="3">
            <v-card-text>
              <p class="text-h6">
                <b> Proveedor de facturación electrónica </b>
              </p>
            </v-card-text>
          </v-card>
          <br />
          <v-row>
            <v-col>
              <v-card class="full-height-card" elevation="3">
                <v-card-text>
                  <v-row>
                    <v-col cols="12" md="5" class="pa-5 mx-n1">
                      <p class="font-size">
                        <b> Seleccionar Proveedor </b>
                      </p>
                      <br />
                      <v-select
                        variant="outlined"
                        density="compact"
                        label="Seleccionar"
                        disabled
                        :items="clientsStore.electronic_invoice_providers"
                        item-title="name"
                        item-value="id"
                        v-model="clientsStore.electronic_invoice_providers"
                      >
                      </v-select>
                      <v-skeleton-loader
                        type="image"
                        v-if="!clientsStore.selectedItem?.name"
                      ></v-skeleton-loader>
                      <div align="center" class="mt-n5" v-else>
                        <img
                          src="../../../assets/images/Invoice-rafiki.svg"
                          width="210px"
                        />
                      </div>
                    </v-col>
                    <v-divider vertical></v-divider>
                    <v-col cols="12" md="7" class="pa-5">
                      <p class="font-size">
                        <b> Credenciales </b>
                      </p>
                      <v-alert
                        v-if="!credentialsObject?.database"
                        type="warning"
                        variant="outlined"
                        density="compact"
                        class="mt-2"
                      >
                        Se necesita crear una base de datos para poder
                        configurar el proveedor de facturación electrónica.
                      </v-alert>
                      <br />
                      <div>
                        <v-skeleton-loader
                          type="card"
                          v-if="!clientsStore.selectedItem?.name"
                        ></v-skeleton-loader>
                        <v-form @submit.prevent="submitForm" v-else>
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
                            label="Email proveido por Taxxa"
                            prepend-inner-icon="mdi-email"
                            variant="outlined"
                            density="compact"
                            class="mb-3"
                            v-model="formData.email"
                            :rules="emailRules"
                            type="email"
                            :disabled="disableForm"
                          >
                          </v-text-field>
                          <v-text-field
                            label="Contraseña"
                            prepend-inner-icon="mdi-lock"
                            variant="outlined"
                            density="compact"
                            class="mb-3"
                            :type="visible ? 'text' : 'password'"
                            v-model="formData.password"
                            :append-inner-icon="
                              visible ? 'mdi-eye-off' : 'mdi-eye'
                            "
                            @click:append-inner="visible = !visible"
                            :rules="passwordRules"
                            :disabled="disableForm"
                          >
                          </v-text-field>
                          <v-text-field
                            label="URL"
                            prepend-inner-icon="mdi-link-variant"
                            variant="outlined"
                            density="compact"
                            class="mb-3"
                            v-model="formData.url"
                            :rules="urlRules"
                            :disabled="disableForm"
                          >
                          </v-text-field>
                          <v-text-field
                            label="URL de token"
                            prepend-inner-icon="mdi-link-lock"
                            variant="outlined"
                            density="compact"
                            class="mb-3"
                            v-model="formData.login_url"
                            :rules="loginUrlRules"
                            :disabled="disableForm"
                          >
                          </v-text-field>
                          <div class="justify-end d-flex mt-n2">
                            <v-btn
                              variant="outlined"
                              :color="
                                clientsStore.moduleMode == 'add'
                                  ? 'success'
                                  : 'primary'
                              "
                              type="submit"
                              :disabled="!isFormChanged"
                            >
                              {{
                                clientsStore.moduleMode == "add"
                                  ? "Guardar"
                                  : "Editar"
                              }}
                            </v-btn>
                          </div>
                        </v-form>
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </LayoutOne>
</template>
<!-- ******************** JavaScript ******************** -->
<script setup lang="ts">
import { useRoute } from "vue-router";
import LayoutOne from "../../../Layouts/LayoutOne.vue";
import router from "../../../router";
import { TThirdParty } from "../interfaces/third-party.interface";
import { useClientsStore } from "../store/useClientsStore";
import { computed, inject, onMounted, reactive, ref } from "vue";
const emit = defineEmits(["onAddUser", "onClose", "onDesactivate"]);
const clientsStore = useClientsStore();
const swal: any = inject("swal");
import * as Yup from "yup";
import { VDateInput } from "vuetify/labs/VDateInput";
import { useAppStore } from "../../../stores/app-store";
const appStore = useAppStore();
const route = useRoute();
let visible = ref(false);
let showValidationErrors = ref(false);
let message = ref("");

const formData = reactive({
  email: "",
  password: "",
  url: "",
  login_url: "",
});

type TLicenseForm = {
  init_date: Date | null;
  end_date: Date | null;
};
const licenseForm = reactive<TLicenseForm>({
  init_date: null,
  end_date: null,
});

const validations = {
  email: Yup.string()
    .required("El email es requerido")
    .trim()
    .email(
      "El correo debe contener un @ y un dominio válido como .com, .co, etc."
    ),
  password: Yup.string().required("La contraseña es requerida"),
  url: Yup.string()
    .required("La URL es requerida")
    .trim()
    .matches(/^https:\/\//, "La URL debe comenzar con https://"),
  login_url: Yup.string()
    .required("El login URL es requerido")
    .trim()
};
const validationLicense = {
  init_date: Yup.date()
    .required("La fecha de inicio es requerida"),
  end_date: Yup.date()
    .required("La fecha de fin es requerida")
    .min(Yup.ref("init_date"), "La fecha de finalización debe ser posterior a la fecha de inicio"),
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
    if (!formData.url) return "La URL es requerida";
    return true;
  },
  async () => {
    if (!formData.url.startsWith("https://")) {
      return "La URL debe comenzar con https://";
    }
    return true;
  },
]);

const loginUrlRules = ref([
  async () => {
    if (!formData.login_url) return "El URL de token es requerido";
    return true;
  },
  async () => {
    if (!formData.login_url.startsWith("https://")) {
      return "El login URL debe comenzar con https://";
    }
    return true;
  },
]);

const initDateRules = ref([
  async (value: any) => {
    try {
      await validationLicense.init_date.validate(value);
      return true;
    } catch (e: any) {
      return e.message;
    }
  },
]);

let validationSchemaLicense = Yup.object(validationLicense);
const endDateRules = ref([
  async () => {
    try {
      await validationSchemaLicense.validate(licenseForm);
      return true;
    } catch (e: any) {
      return e.message;
    }
  },
]);

let validationSchema = Yup.object(validations);

const setForm = () => {
  if (!credentialsObject.value) return;
  formData.email = credentialsObject.value?.taxxaTenant?.email;
  formData.password = credentialsObject.value?.taxxaTenant?.password;
  formData.url = credentialsObject.value?.taxxaTenant?.url;
  formData.login_url = credentialsObject.value?.taxxaTenant?.login_url;
};

const submitForm = async () => {
  try {
    await validationSchema.validate(formData);
    const addMode = clientsStore.moduleMode == "add";
    let _data;
    if (addMode) {
      const { error, data } = await clientsStore.saveTaxxaInfo(formData);
      if (error) {
        message.value = data;
        return;
      }
      _data = data;
    } else {
      const { error, data } = await clientsStore.editCredentials(
        route.params.id as string,
        formData
      );
      if (error) {
        message.value = data;
        return;
      }
      _data = data;
    }
    if (_data) {
      clientsStore.toogleDialog();
      await swal.fire({
        icon: "success",
        text: addMode
          ? "Credenciales de Taxxa guardadas correctamente"
          : "Credenciales de Taxxa actualizadas correctamente",
        showConfirmButton: false,
        timer: 1000,
      });
      await loadTenantDetails();
      formOrigin.value =
        credentialsObject.value?.taxxaTenant?.email +
        credentialsObject.value?.taxxaTenant?.password +
        credentialsObject.value?.taxxaTenant?.url +
        credentialsObject.value?.taxxaTenant?.login_url;
    }
  } catch (e) {
    showValidationErrors.value = true;
  }
};

const loadElectronicInvoiceProviders = async () => {
  await clientsStore.loadElectronicInvoiceProviders();
};

const loadTenantDetails = async () => {
  await clientsStore.loadTenantDetails(route.params.id as string);
  if (credentialsObject.value?.taxxaTenant) {
    clientsStore.moduleMode = "edit";
  } else {
    clientsStore.moduleMode = "add";
  }
};

const parsedNameClient = () => {
  let client = clientsStore.selectedItem;
  if (client?.clientable_type == "person") {
    return `${client.person?.first_name} ${client.person?.surename}`;
  } else if (client?.clientable_type == "company") {
    return client?.company?.name;
  }
  return;
};

const parsedPerfilName = () => {
  let client = clientsStore.selectedItem;
  if (client?.clientable_type == "person") {
    return `${client.person?.first_name[0]}${client.person?.surename[0]}`;
  } else if (client?.clientable_type == "company") {
    return client.company?.name
      .split(" ")
      .map((word: any) => word[0])
      .join("")
      .toUpperCase();
  }
};

const goToEdit = () => {
  clientsStore.moduleMode = "edit";
  router.push("/client/form/" + route.params.id);
};

const unableItem = (item: TThirdParty) => {
  const action = !item?.is_active ? "Restaurar" : "Desactivar";
  const successMessage = !item?.is_active
    ? "Restaurado con éxito"
    : "Desactivado con éxito";
  swal
    .fire({
      title: `${action}`,
      text: `¿Está seguro que desea ${action.toLowerCase()} este usuario?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4CAF50",
      cancelButtonColor: "#d33",
      confirmButtonText: '<span style="color: white;">Sí</span>',
      cancelButtonText: '<span style="color: white;">Cancelar</span>',
    })
    .then(async (result: any) => {
      if (result.isConfirmed) {
        clientsStore.selectedItem = item;
        const response = await clientsStore.delete(item?.id);
        if (response.data.status == 200) {
          await swal.fire({
            icon: "success",
            text: successMessage,
            showConfirmButton: false,
            timer: 1000,
          });
          router.push("/client/list");
        } else {
          await swal.fire({
            icon: "warning",
            text: "Ocurrio un error ",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      }
    });
};

const personOrCompany = () => {
  let client = clientsStore.selectedItem;
  if (client?.clientable_type == "person") {
    return `${client.person?.first_name} ${client.person?.surename}`;
  } else if (client?.clientable_type == "company") {
    return client.company?.name;
  }
};

const openCreateSchemaSwal = async () => {
  const { value: username, isConfirmed } = await swal.fire({
    title: "Crear base de datos",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#4CAF50",
    cancelButtonColor: "#d33",
    input: "text",
    inputLAbel: "Escribe aqui",
    html: `Ingrese el nombre del cliente para confirmar <br> <b> "${personOrCompany()}" </b>`,
    confirmButtonText: '<span style="color: white;">Crear</span>',
    cancelButtonText: '<span style="color: white;">Cancelar</span>',
    inputValidator: (value: any) => {
      if (!value) {
        return "Debe escribir el nombre del cliente para poder crear la base de datos";
      }
    },
  });
  if (isConfirmed) {
    let person = `${clientsStore.selectedItem?.person?.first_name} ${clientsStore.selectedItem?.person?.surename}`;
    let company = clientsStore.selectedItem?.company?.name;
    if (username !== company && username !== person) {
      await swal.fire({
        icon: "error",
        text: "Error, nombre de cliente inválido",
        showConfirmButton: false,
        timer: 1000,
      });
      return;
    }

    appStore.afterLoading(async () => {
      const { data } = await clientsStore.createSchema();
      if (data) {
        await swal.fire({
          icon: "success",
          text: "Base de datos creada con éxito",
          showConfirmButton: false,
          timer: 1000,
        });
        await loadTenantDetails();
      } else {
        await swal.fire({
          icon: "error",
          text: "Ocurrió un error al crear la base de datos",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  }
};

const credentialsObject = computed(() => {
  console.log(clientsStore.selectedItemTaxxaInfo.data);
  return clientsStore.selectedItemTaxxaInfo?.data?.tenantWithClient;
});

const loadClient = () => {
  return clientsStore.loadClient(route.params.id as string);
};

const onPermissions = () => {
  router.push("/client/" + route.params.id + "/permissions");
};

let formOrigin = ref<string>("");

const setFormWatcher = () => {
  if (credentialsObject.value?.taxxaTenant) {
    formOrigin.value = `${credentialsObject.value?.taxxaTenant?.email}${credentialsObject.value?.taxxaTenant?.password}${credentialsObject.value?.taxxaTenant?.url}${credentialsObject.value?.taxxaTenant?.login_url}`;
  }
};

const formEdit = computed(() => {
  return formData.email + formData.password + formData.url + formData.login_url;
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
  return false;
});

let clickLicense = ref<boolean>(false);
const sendLicense = async () => {
  try {
    await validationSchemaLicense.validate(licenseForm);
    clickLicense.value = true;
    const { error, data } = await clientsStore.createLicense({
      tenant_id: clientsStore.selectedItemTaxxaInfo?.tenantWithClient.id,
      ...licenseForm,
    });
    if (!error) {
      // clickLicense.value = false;
    await swal.fire({
      icon: "success",
      text: "Licencia creada con éxito",
      showConfirmButton: false,
      timer: 1200,
    }); 
    await loadTenantDetails();
    // clickLicense.value = false;
  } else {
    await swal.fire({
      icon: "error",
      text: data.error,
      showConfirmButton: false,
      timer: 1200,
    });
  }
  } catch (error) {
    await swal.fire({
      icon: "error",
      text: 'Error interno',
      showConfirmButton: false,
      timer: 1200,
    });
    showValidationErrors.value = true;
  }
};

let formOriginLicense = ref<string>("");
const setLicense = async () => {
  console.log(clientsStore.selectedItemTaxxaInfo?.data?.tenantWithClient);
  const response = await clientsStore.getLicense(
    clientsStore.selectedItemTaxxaInfo?.data?.tenantWithClient.id
  );
  if (response.data) {
    licenseForm.init_date= response.data.init_date;
    licenseForm.end_date= response.data.end_date;
    formOriginLicense.value = `${licenseForm.init_date}${licenseForm.end_date}`;
  }
}
  
const isFormChangedLicense = computed(():boolean => {
  const value = `${licenseForm.init_date}${licenseForm.end_date}`;
  clickLicense.value = false;
  return formOriginLicense.value !== value;
});

onMounted(async () => {
  console.log(credentialsObject.value);  
  await loadTenantDetails(); 
  await loadElectronicInvoiceProviders();
  await loadClient();
  await setFormWatcher();
  setForm();
  await setLicense();
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
</style>
