<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h2>Gestión de empresas</h2>
          </v-card-title>
          <v-card-subtitle class="d-flex mt-2">
              <h3 class="ml-4">Empresas</h3>
              <v-spacer></v-spacer>
              <v-btn 
                class="mr-4"
                color="#841811ff"
                variant="outlined"
                size="x-small"
                @click="activateForm = !activateForm"
              >
                  Agregar empresa
              </v-btn>
          </v-card-subtitle>
          <v-card-text>
              <v-card v-if="activateForm" class="my-4">
                <v-card-text>
                    <v-form @submit.prevent="submit">
                        <v-text-field
                            v-model="formData.name"
                            :rules="nameRules"
                            color="#841811ff"
                            density="compact"
                            variant="outlined"
                            label="Razón social"
                        ></v-text-field>
                        <v-text-field
                            v-model="formData.tradename"
                            :rules="tradeNameRules"
                            color="#841811ff"
                            density="compact"
                            variant="outlined"
                            label="Nombre comercial"
                        ></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
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
                        class="mr-4 d-none d-sm-flex"
                        size="small"
                        color="green"
                        variant="outlined"
                        @click="submit"
                    >
                        Guardar
                    </v-btn>
                </v-card-actions>
              </v-card>
              <v-table class="mt-6">
                  <thead>
                      <tr>
                      <th class="text-left font-weight-black">EMPRESA</th>
                      <th class="text-center font-weight-black">REGISTRO</th>
                      <th class="text-center font-weight-black">ESTADO</th>
                      <th class="text-right font-weight-black">OPCIONES</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="(item, index) in fakeData" :key="index">
                      <td class="text-left text-truncate" style="max-width: 20px">
                          {{ item.tradeName }}
                      </td>
                      <td class="text-center text-truncate" style="max-width: 20px">
                          {{ item.register }}
                      </td>
                      <td class="text-right">
                          <v-badge
                          :color="item.is_active ? 'success' : '#841811ff'"
                          class="mr-12 mb-1"
                          >
                          <template v-slot:badge>
                              <span class="pa-2">{{
                              item.is_active ? "Activo" : "Inactivo"
                              }}</span>
                          </template>
                          </v-badge>
                      </td>
                      <td class="text-right">
                          <v-tooltip text="Opciones" location="bottom">
                            <template v-slot:activator="{ props }">
                                <v-btn
                                v-bind="props"
                                class="ma-2"
                                variant="text"
                                icon="mdi-eye"
                                color="primary"
                                @click="showEnterprise()"
                                >
                                </v-btn>
                            </template>
                          </v-tooltip>
                          <!-- <v-tooltip v-if="item.is_active" text="Editar" location="top">
                          <template v-slot:activator="{ props }">
                              <v-btn
                              v-bind="props"
                              class=""
                              variant="text"
                              icon="mdi-pencil"
                              size="small"
                              color="blue-lighten-2"
                              >
                              @click="goToEdit(item)" 
                              </v-btn>
                          </template>
                          </v-tooltip>
                          <v-tooltip
                          :text="item.is_active ? 'Desactivar' : 'Restaurar'"
                          location="top"
                          >
                          <template v-slot:activator="{ props }">
                              <v-btn
                              v-bind="props"
                              class=""
                              size="small"
                              variant="text"
                              :icon="item.is_active ? 'mdi-delete' : 'mdi-restore'"
                              :color="item.is_active ? 'red-lighten-2' : 'blue-lighten-2'"
                              >
                               @click="unableItem(item)" 
                              </v-btn>
                          </template>
                          </v-tooltip> -->
                      </td>
                      </tr>
                  </tbody>
              </v-table>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        
      </v-col>
    </v-row>
  </v-container>
</template>
  
<script lang="ts" setup>
import { inject, reactive, ref } from 'vue';
import * as Yup from "yup";
import { useCustomersStore } from '../stores/customers.store';

const swal: any = inject("$swal");

const customersStore = useCustomersStore();

let activateForm = ref(false);

let formData = reactive({
  name: "",
  tradename: "",
  client_id: 0
});

let fakeData = ref([
  {
    id: 1,
    tradeName: "TradeName 1",
    register: '08/11/20204',
    companyName: "Company Name 1",
    is_active: true,
  },
  {
    id: 2,
    tradeName: "TradeName 2",
    register: '08/11/20204',
    companyName: "Company Name 2",
    is_active: false,
  },
  {
    id: 3,
    tradeName: "TradeName 3",
    register: '08/11/20204',
    companyName: "Company Name 3",
    is_active: true,
  }
])

const validations = {
  name: Yup.string().required("La razón social es requerido").trim(),
  tradename: Yup.string().required("El nombre comercial es requerido").trim(),
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

const tradeNameRules = ref([
  async (value: any) => {
    try {
      await validations.tradename.validate(value);
      return true;
    } catch (e: any) {
      return "Error de validación en el nombre";
    }
  },
]);

const showEnterprise = () => {
  console.log('Show options for enterprise');  
}

const close = () => {
  activateForm.value = false;
};

let validationSchema = Yup.object(validations);

const submit = async () => {
  
  await validationSchema.validate(formData);
  formData.client_id = customersStore.selectedItem.id;

  const response = await customersStore.addCompany(formData);
  console.log('Response:', response);
  customersStore.moduleMode = "";
  if (response.status === 201) {
    swal.fire({
      icon: "success",
      title: "¡Éxito!",
      text: "Agregado con éxito",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    swal.fire({
      title: "Error",
      text: "Ha ocurrido un error al guardar el registro",
      icon: "error",
    });
  }
};

</script>
  
<style scoped> 
</style>
  