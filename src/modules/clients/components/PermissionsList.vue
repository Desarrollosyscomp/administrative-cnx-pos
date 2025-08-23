<!-- ******************** HTML ******************** -->
<template>
  <LayoutOne>
    <div class="show d-none d-sm-block ml-5 mr-4">
      <v-row>
        <v-col>
          <v-card class="page-margins mt-n4">
            <v-card-text>
              <p class="text-h6">
                <b>
                  Asignación de permisos
                </b>
              </p>
              <div class="align-items">
                <p class="mt-1 text-grey">
                  <b>
                    Username:
                  </b>
                  {{ usernamePersonOrCompany }}
                </p>
                <div>
                  <v-btn variant="outlined" class="mt-n6 mx-3" color="#841811ff" @click="$router.go(-1)">
                    Atras
                  </v-btn>
                  <v-btn variant="outlined" class="mt-n6" color="indigo" @click="syncSystemServices">
                    Guardar
                  </v-btn>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="page-margins">
          <v-text-field class="input-styles" color="#841811ff" density="compact" variant="outlined" label="Buscar"
            append-inner-icon="mdi-magnify">
          </v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-n4">
        <v-col cols="12" md="4" v-for="(system_service) in clientsStore.system_services_paginator.list"
          :key="system_service.id">
          <v-card elevation="2" link class="border-color full-height-card page-margins"
            @click="toggleSelection(system_service)">
            <v-card-text>
              <div class="align-items">
                <p class="font-size">
                  <b>
                    {{ system_service.name }}
                  </b>
                </p>
                <span class="mt-n2">
                  <v-icon v-if="clientHasSystemService(system_service.id)" color="green" size="33">
                    mdi-check-circle-outline
                  </v-icon>
                </span>
              </div>
              <div class="mt-6">
                <!-- Mostrar las primeras 3 acciones -->
                <div v-for="(i) in [0, 1, 2]" :key="i">
                  <li v-if="system_service.functionalities[i]" class="list-style">
                    <span class="icon-style">★</span>
                    {{ system_service.functionalities[i].name }}
                  </li>
                </div>
                <!-- Mostrar 'Otros' si hay más de 3 acciones -->
                <li v-if="system_service.functionalities.length > 3" class="list-style">
                  <span class="icon-style">★</span>
                  Otros
                </li>
              </div>
            </v-card-text>
            <v-card-actions>
              <div class="mt-3 mb-n3 button-bottom">
                <v-btn variant="outlined" size="small" block color="indigo"
                  @click.stop="openSystemServiceDialog(system_service)">
                  Ver permiso
                </v-btn>
              </div>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-if="clientsStore.system_services_paginator.list.length == 0">
        <v-col>
          <Vue3Lottie :animationData="EmptyLottie" :height="180" :width="190" />
          <h3 class="text-center">No se encontraron resultados</h3>
        </v-col>
      </v-row>
    </div>
    <v-dialog max-width="400" v-model="clientsStore.openDialog" @afterLeave="onCloseDialog">
      <v-card>
        <v-container>
          <p class="text-h5 ml-4 mt-2">
            <b>
              {{ selected_system_service?.name }}
            </b>
          </p>
          <v-divider></v-divider>
          <v-card-text class=" mt-n2">
            <li v-for="(action, i) in selected_system_service.functionalities" :key="i" class="list-style-dialog">
              <span class="icon-style">★</span>
              {{ action.name }}
            </li>
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog>
  </LayoutOne>
</template>
<!-- ******************** JavaScript ******************** -->
<script setup lang="ts">
import { ref, onMounted, inject, computed } from 'vue';
import LayoutOne from '../../../Layouts/LayoutOne.vue';
import { useClientsStore } from '../store/useClientsStore';
import EmptyLottie from '../../../assets/lotties/empty.json';
import { useRoute } from 'vue-router';
import { TSystemService } from '../interfaces/system-service.type';

const swal: any = inject("swal");

const route = useRoute()

const clientsStore = useClientsStore()

const selected_system_service = ref()
// let selectPermission = ref(true)

const toggleSelection = (system_service: TSystemService) => {
    if (clientHasSystemService(system_service.id)) {
    const index = clientsStore.client_system_services.indexOf(system_service)
    clientsStore.client_system_services.splice(index, 1); // deselecciona si ya está
  } else {
    clientsStore.client_system_services.push(system_service); // selecciona si no está
  }
}

const openSystemServiceDialog = (systemService: any) => {
  selected_system_service.value = systemService
  clientsStore.toogleDialog()
}

const onCloseDialog = () => {
  clientsStore.mode = "";
};

const loadSystemServices = async () => {
  await clientsStore.loadSystemServices();
}

const syncSystemServices = async () => {
  const selected_system_services_ids = clientsStore.client_system_services.map((system_service: any) => system_service.id)
 const {error} = await clientsStore.syncSystemServices(clientsStore.selectedItem.id, selected_system_services_ids)
 if (!error) {  
   await swal.fire({
     icon: "success",
     title: "Éxito",
     text: `Servicios actualizados correctamente`,
     showConfirmButton: false,
     timer: 3000,
   });
 } else {
   await swal.fire({
     icon: "warning",
     title: "Error",
     text: `Ocurrio un error al actualizar los servicios`,
     showConfirmButton: false,
     timer: 3000,
   });
 }
}

const loadClient = async () => {
  await clientsStore.loadClient(route.params.id)
}

const loadClientSystemServices = async () => {
  await clientsStore.loadClientSystemServices(route.params.id)
}

const clientHasSystemService = (system_service_id: number) => {
  return clientsStore.client_system_services.some((system_service: any) => system_service.id == system_service_id)
}

const usernamePersonOrCompany = computed(() => {
  if (clientsStore.selectedItem.clientable_type == "person") {
    return `${clientsStore.selectedItem.person?.first_name} ${clientsStore.selectedItem.person?.surename}`;
  } else if (clientsStore.selectedItem.clientable_type == "company") {
    return clientsStore.selectedItem.company?.name;
  }
})

onMounted(async () => {
  loadClient()
  loadSystemServices()
  loadClientSystemServices()
});
</script>
<!-- ******************** CSS ******************** -->
<style scoped>
.full-height-card {
  height: 100%;
}

.page-margins {
  padding: 10px;
  margin: 10px;
}

.input-styles {
  margin-top: -20px;
  margin-bottom: -12px;
}

.font-size {
  font-size: 18px;
  color: rgb(65, 63, 63);
}

.icon-style {
  font-size: 11px;
  color: #3d4eafff;
}

.list-style {
  margin-top: 6%;
  color: rgb(130, 130, 130);
  list-style: none
}

.list-style-dialog {
  margin-top: 4%;
  color: rgb(130, 130, 130);
  list-style: none
}

.align-items {
  display: flex;
  justify-content: space-between;
}
</style>
