<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            Gestión de empresas
          </v-card-title>
          <v-card-sutitle class="d-flex">
              Empresas
              <v-spacer></v-spacer>
              <v-btn 
                color="#841811ff"
                variant="outlined"
                size="small"
                @click="activateForm = !activateForm"
              >
                  Agregar empresa
              </v-btn>
          </v-card-sutitle>
          <v-card-body>
              <v-card v-if="activateForm">
                <v-card-text>
                    <v-form @submit.prevent="submit">
                        <v-text-field
                            v-model="formData.tradeName"
                            :rules="tradeNameRules"
                            color="#841811ff"
                            density="compact"
                            variant="outlined"
                            label="Razón social"
                        ></v-text-field>
                        <v-text-field
                            v-model="formData.companyName"
                            :rules="companyNameRules"
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
                <v-btn color="primary">Guardar</v-btn>
                </v-card-actions>
              </v-card>
              <v-table>
                  <thead>
                      <tr>
                      <th class="text-left font-weight-black">EMPRESA</th>
                      <th class="text-center font-weight-black">REGISTRO</th>
                      <th class="text-center font-weight-black">ESTADO</th>
                      <th class="text-right font-weight-black">OPCIONES</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="(item, index) in usersStore.list" :key="index">
                      <td class="text-left text-truncate" style="max-width: 20px">
                          {{ item.username }}
                      </td>
                      <!-- <td class="text-center text-truncate" style="max-width: 20px">
                          {{ item.description }}
                      </td> -->
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
                          <v-tooltip text="Empresas" location="bottom">
                          <template v-slot:activator="{ props }">
                              <v-btn
                              v-bind="props"
                              class="ma-2"
                              variant="text"
                              icon="mdi-factory"
                              color="green"
                              >
                              <!-- @click="addEnterprise(item)" -->
                              </v-btn>
                          </template>
                          </v-tooltip>
                          <v-tooltip v-if="item.is_active" text="Editar" location="top">
                          <template v-slot:activator="{ props }">
                              <v-btn
                              v-bind="props"
                              class=""
                              variant="text"
                              icon="mdi-pencil"
                              size="small"
                              color="blue-lighten-2"
                              >
                              <!-- @click="goToEdit(item)" -->
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
                              <!-- @click="unableItem(item)" -->
                              </v-btn>
                          </template>
                          </v-tooltip>
                      </td>
                      </tr>
                  </tbody>
              </v-table>
          </v-card-body>
        </v-card>
      </v-col>
      <v-col cols="12">
        
      </v-col>
    </v-row>
  </v-container>
</template>
  
<script lang="ts" setup>
import { inject, reactive, ref } from 'vue';
import { useUsersStore } from '../stores/users.store';
import * as Yup from "yup";

const swal: any = inject("$swal");

const usersStore = useUsersStore();

let activateForm = ref(false);
let formData = reactive({
  tradeName: "",
  companyName: ""
});

let userId = ref(0);

const validations = {
    tradeName: Yup.string().required("La razón social es requerido").trim(),
    companyName: Yup.string().required("El nombre comercial es requerido").trim(),
};

const tradeNameRules = ref([
  async (value: any) => {
    try {
      await validations.tradeName.validate(value);
      return true;
    } catch (e: any) {
      return "Error de validación en el nombre";
    }
  },
]);

const companyNameRules = ref([
  async (value: any) => {
    try {
      await validations.companyName.validate(value);
      return true;
    } catch (e: any) {
      return "Error de validación en el nombre";
    }
  },
]);

const close = () => {
  activateForm.value = false;
};

let validationSchema = Yup.object(validations);

const submit = async () => {
  
  await validationSchema.validate(formData);
  userId.value = usersStore.selectedItem.id;
  

//   try {
//     const addMode = usersStore.moduleMode === "add";
//     let response;
//     if (addMode) {
//       response = await usersStore.add(formData);
//     } else {
//       const id = usersStore.selectedItem.id;
//       response = await usersStore.edit(id, formData);
//     }
//     if (response.status === 201) {
//       swal.fire({
//         icon: "success",
//         text: addMode ? "Agregado con éxito" : "Actulizado con éxito",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     } else {
//       swal.fire({
//         icon: "success",
//         text: "Agregado!!",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     }
//   } catch (error) {
//     swal.fire({
//       icon: "warning",
//       text: "Ocurrió un error",
//       showConfirmButton: false,
//       timer: 1500,
//     });
//   }
};

</script>
  
<style scoped> 
</style>
  