<template>
  <LayoutOne>
    <v-container class="pa-3" fluid>
      <v-row>
        <v-col cols="12" md="4">
          <v-card elevation="3">
            <v-card-text class="pa-5">
              <div align="center">
                <v-skeleton-loader type="image" v-if="!credentialsObject?.schema?.name"></v-skeleton-loader>
                <v-avatar color="brown" size="120" v-else>
                  <span class="text-h3">{{ parsedPerfilName() }}</span>
                </v-avatar>
                <p class="text-h6 mt-2">
                  <b>
                    {{ parsedNameClient() }}
                  </b>
                </p>
                <p class="text-h7" :class="credentialsObject?.client?.is_active ? 'active' : 'inactive'">
                  {{ credentialsObject?.client?.is_active ? "Activo" : "Inactivo" }}
                </p>
              </div>
              <div class="align-buttons mt-2 mb-3">
                <v-btn variant="outlined" color="#841811ff" density="compact"
                  @click="unableItem(clientsStore.list.find((item: any) => item.id == clientsStore.selectedItem.id))">
                  {{ credentialsObject?.client?.is_active ? "Inactivar" : "Restaurar" }}
                </v-btn>
                <v-btn variant="outlined" color="#4caf50" density="compact"
                  v-if="credentialsObject?.client?.is_active == true" @click="goToEdit()">
                  Editar
                </v-btn>
                <v-btn variant="outlined" color="#3e97ffff" density="compact">
                  Permisos
                </v-btn>
              </div>
              <v-divider></v-divider>
              <v-skeleton-loader type="paragraph" v-if="!credentialsObject?.schema?.name"></v-skeleton-loader>
              <div class="mt-3" v-else>
                <p>
                  <b>
                    Fecha inicio licencia:
                  </b>
                </p>
                <span class="color-font">
                  23 de junio de 2025
                </span>
                <p>
                  <b>
                    Fecha fin licencia:
                  </b>
                </p>
                <span class="color-font">
                  8 de agosto de 2025
                </span>
                <p>
                  <b>
                    Base de datos:
                  </b>
                </p>
                <span class="color-font" v-if="credentialsObject?.schema?.name">
                  {{ credentialsObject?.schema?.name }}
                </span>
                <span class="text-blue" v-else @click="openCreateSchemaSwal" style="cursor: pointer;">
                  {{ 'Crear base de datos' }}
                </span>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card elevation="3">
            <v-card-text>
              <p class="text-h6">
                <b>
                  Proveedor de facturacion electrónica
                </b>
              </p>
            </v-card-text>
          </v-card>
          <br>
          <v-row>
            <v-col>
              <v-card class="full-height-card" elevation="3">
                <v-card-text>
                  <v-row>
                    <v-col cols="12" md="5" class="pa-5">
                      <p class="font-size">
                        <b>
                          Seleccionar Proveedor
                        </b>
                      </p>
                      <br>
                      <v-select variant="outlined" density="compact" label="Seleccionar" disabled
                        :items="clientsStore.electronic_invoice_providers" item-title='name' item-value='id'
                        v-model="clientsStore.electronic_invoice_providers">
                      </v-select>
                      <div align="center" class="mt-n5">
                        <img src="../../../assets/images/Invoice-rafiki.svg" width="210px">
                      </div>
                    </v-col>
                    <v-divider vertical></v-divider>
                    <v-col cols="12" md="7" class="pa-5">
                      <p class="font-size">
                        <b>
                          Credenciales
                        </b>
                      </p>
                      <br>
                      <div>
                        <v-skeleton-loader type="card" v-if="!credentialsObject?.schema?.name"></v-skeleton-loader>
                        <v-form @submit.prevent="submit" v-else>
                          <v-alert v-if="message" class="mb-4" type="error" variant="outlined" density="compact">
                            {{ message }}
                          </v-alert>
                          <v-text-field label="Email proveido por Taxxa" prepend-inner-icon="mdi-email"
                            variant="outlined" density="compact" class="mb-3" v-model="formData.email"
                            :rules="emailRules" type="email" :disabled="!credentialsObject?.schema?.name">
                          </v-text-field>
                          <v-text-field label="Contraseña" prepend-inner-icon="mdi-lock" variant="outlined"
                            density="compact" class="mb-3" :type="visible ? 'text' : 'password'"
                            v-model="formData.password" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                            @click:append-inner="visible = !visible" :rules="passwordRules"
                            :disabled="!credentialsObject?.schema?.name">
                          </v-text-field>
                          <v-text-field label="URL" prepend-inner-icon="mdi-lock" variant="outlined" density="compact"
                            class="mb-3" v-model="formData.url" :rules="urlRules"
                            :disabled="!credentialsObject?.schema?.name">
                          </v-text-field>
                          <div class="justify-end d-flex ">
                            <v-btn variant="outlined" color="success" type="submit">
                              Guardar
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
import { useRoute } from 'vue-router';
import LayoutOne from '../../../Layouts/LayoutOne.vue';
import router from '../../../router';
import { TThirdParty } from '../interfaces/third-party.interface';
import { useClientsStore } from '../store/useClientsStore';
import { computed, inject, onMounted, reactive, ref } from "vue";
const emit = defineEmits(["onAddUser", "onClose", "onDesactivate"]);
const clientsStore = useClientsStore();
const swal: any = inject("swal");
import * as Yup from "yup";
const route = useRoute();
let visible = ref(false);
let showValidationErrors = ref(false);
// let thirdId = ref(0);
let message = ref("");
let formData = reactive({
  email: "",
  password: "",
  url: "",
});

const validations = {
  email: Yup.string().required("El email es requerido").trim()
    .email("El correo debe contener un @ y un dominio válido como .com, .co, etc."),
  password: Yup.string().required("La contraseña es requerida"),
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

const setForm = () => {
  // if (clientsStore.moduleMode !== "edit") return;
  console.log("clientsStore.selectedItem", clientsStore.selectedItemTaxxaInfo);
  formData.email = credentialsObject.value?.taxxaTenant?.email;
  formData.password = credentialsObject.value?.taxxaTenant?.password;
  formData.url = credentialsObject.value?.taxxaTenant?.url;
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
        text: "Credenciales de Taxxa guardadas correctamente",
        showConfirmButton: false,
        timer: 1000,
      });
    }

  } catch (e) {
    console.log("Error de validación:", e);
    showValidationErrors.value = true;
  }
};

// const showSaveButton = computed(() => {
//   let passwordIsValid = true;
//   let thirdPartyIdIsValid = thirdId.value != 0;

//   if (clientsStore.moduleMode == "add") {
//     passwordIsValid = !!formData.password;
//   }

//   passwordIsValid =
//     passwordIsValid ||
//     (formData.password.length >= 6 && formData.password.length <= 20);
//   return (
//     formData.email &&
//     passwordIsValid &&
//     thirdPartyIdIsValid &&
//     formData.password == formData.password
//   );
// });

const loadElectronicInvoiceProviders = async () => {
  await clientsStore.loadElectronicInvoiceProviders()
}

const loadClientDetails = async () => {
  await clientsStore.loadClientDetails(route.params.id as string);
}

const parsedNameClient = () => {
  let client = clientsStore.selectedItem;
  if (client?.clientable_type == 'person') {
    return `${client.person?.first_name} ${client.person?.surename}`;
  }
  else if (client?.clientable_type == 'company') {
    return client?.company?.name;
  }
  return 'N/A';
}

const parsedPerfilName = () => {
  let client = clientsStore.selectedItem;
  if (client?.clientable_type == 'person') {
    return `${client.person?.first_name[0]}${client.person?.surename[0]}`;
  }
  else if (client?.clientable_type == 'company') {
    return client.company?.name.split(" ").map((word: any) => word[0]).join("").toUpperCase();
  }
}

const goToEdit = () => {
  clientsStore.moduleMode = "edit"
  router.push("/client/form/" + route.params.id);
};

const unableItem = (item: TThirdParty) => {
  const action = !item.is_active ? "Restaurar" : "Desactivar";
  const successMessage = !item.is_active
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
        const response = await clientsStore.delete();
        clientsStore.selectedItem = {};
        if (response.data.status == 200) {
          await swal.fire({
            icon: "success",
            text: successMessage,
            showConfirmButton: false,
            timer: 1000,
          });
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

const openCreateSchemaSwal = () => {
  swal.fire({
    title: "Crear base de datos",
    text: "¿Está seguro que desea crear una nueva base de datos para este cliente?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#4CAF50",
    cancelButtonColor: "#d33",
    confirmButtonText: '<span style="color: white;">Sí</span>',
    cancelButtonText: '<span style="color: white;">Cancelar</span>',
  })
    .then(async (result: any) => {
      if (result.isConfirmed) {
        const response = await clientsStore.createSchema();
        if (response.data.status == 200) {
          await swal.fire({
            icon: "success",
            text: "Base de datos creada con éxito",
            showConfirmButton: false,
            timer: 1000,
          });
          loadClientDetails();
        } else {
          await swal.fire({
            icon: "error",
            text: "Ocurrió un error al crear la base de datos",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      }
    });
};

const credentialsObject = computed(() => {
  return clientsStore.selectedItemTaxxaInfo?.tenantWithClient;
});

const loadClient = () => {
  return clientsStore.loadClient(route.params.id as string);
}

onMounted(async () => {
  await loadClientDetails()
  await loadElectronicInvoiceProviders()
  await loadClient();
  setForm();
});


</script>
<style>
.full-height-card {
  height: 100%;
}

.align-buttons{
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
