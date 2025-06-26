<!-- ******************** HTML ******************** -->
<template>
  <LayoutOne>
    <div class="show d-none d-sm-block ml-5 mr-4">
      <v-row>
        <v-col>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card class="page-margins mt-n4">
            <v-card-text>
              <p class="text-h6">
                <b>
                  Asignacion de permisos
                </b>
              </p>
              <div class="align-items">
                <p class="mt-1 text-grey">
                  <b>
                    Username:
                  </b>
                  Fernanda
                </p>
                <v-btn :disabled="selectedPermission.length == 0" variant="outlined" class="mt-n6" color="indigo">
                  Guardar
                </v-btn>
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
        <v-col cols="12" md="4" v-for="(permission, i) in clientsStore.system_services_paginator.list" :key="i">
          <v-card elevation="2" link class="border-color full-height-card page-margins" @click="toggleSelection(i)">
            <v-card-text>
              <div class="align-items">
                <p class="font-size">
                  <b>
                    {{ permission.name }}
                  </b>
                </p>
                <span class="mt-n2">
                  <v-icon v-if="selectedPermission.includes(i)" color="green" size="33">
                    mdi-check-circle-outline
                  </v-icon>
                </span>
              </div>
              <div class="mt-6" v-if=false>
                <!-- Mostrar las primeras 3 acciones -->
                <li v-for="(action, i) in permission.actions.slice(0, 3)" :key="i" class="list-style">
                  <span class="icon-style">★</span>
                  {{ action }}
                </li>

                <!-- Mostrar 'Otros' si hay más de 3 acciones -->
                <li v-if="permission.actions.length > 3" class="list-style">
                  <span class="icon-style">★</span>
                  Otros
                </li>
              </div>
            </v-card-text>
            <v-card-actions>
              <div class="mt-3 mb-n3 button-bottom">
                <v-btn variant="outlined" size="small" block color="indigo"
                  @click.stop="openPermissionDialog(permission)">
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
              {{ onePermissionInfo?.moduleName }}
            </b>
          </p>
          <v-divider></v-divider>
          <v-card-text class=" mt-n2">
            <li v-for="(action, i) in onePermissionInfo.actions" :key="i" class="list-style-dialog">
              <span class="icon-style">★</span>
              {{ action }}
            </li>
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog>
  </LayoutOne>
</template>
<!-- ******************** JavaScript ******************** -->
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import LayoutOne from '../../../Layouts/LayoutOne.vue';
import { useClientsStore } from '../store/useClientsStore';
import EmptyLottie from '../../../assets/lotties/empty.json';

const clientsStore = useClientsStore()

const onePermissionInfo = ref()
// let selectPermission = ref(true)

let selectedPermission = ref<number[]>([])
const toggleSelection = (index: number) => {
  const i = selectedPermission.value.indexOf(index);
  if (i > -1) {
    selectedPermission.value.splice(i, 1); // deselecciona si ya está
  } else {
    selectedPermission.value.push(index); // selecciona si no está
  }
}

const openPermissionDialog = (permission: any) => {
  onePermissionInfo.value = permission
  clientsStore.toogleDialog()
}

const onCloseDialog = () => {
  clientsStore.mode = "";
};

const loadSystemServices = async () => {
  await clientsStore.loadSystemServices();
}
onMounted(async () => {
  loadSystemServices()
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
