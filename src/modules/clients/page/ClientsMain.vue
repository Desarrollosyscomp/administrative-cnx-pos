<template>
  <LayoutOne>
    <v-breadcrumbs :items="['Creación de Clientes', 'Listar']"></v-breadcrumbs>
    <v-card class="ma-2 px-3 full-height-card" elevation="5">
      <v-card-title class="mr-1 mt-4 mb-n7">
        <div class="d-flex flex-column flex-sm-row">
          <v-text-field
            class="ma-2 w-100"
            color="#841811ff"
            density="compact"
            variant="outlined"
            label="Buscar"
            append-inner-icon="mdi-magnify"
            v-model="clientsStore.search"
            @keyup.enter="simpleSearch"
          >
          </v-text-field>

          <v-menu
            v-model="openDialogFilter"
            :close-on-content-click="false"
            location="end"
          >
            <template v-slot:activator="{ props }">
              <v-btn variant="outlined" color="#841811ff" class="ma-2" v-bind="props">
                Filtros
              </v-btn>
            </template>

            <v-card min-width="300">
              <v-card-text>
                <p class="font-size">
                  <b> Filtro de busqueda </b>
                </p>
                <br />
                <v-select
                  :items="items"
                  item-value="id"
                  item-title="type"
                  variant="outlined"
                  label="Seleccione un tipo"
                  density="compact"
                  v-model="selectFilter"
                >
                </v-select>
                <v-btn color="success" variant="outlined" block @click="filterSubmit">
                  Buscar
                </v-btn>
              </v-card-text>
            </v-card>
          </v-menu>

          <v-btn
            class="mt-2 ml-2"
            variant="outlined"
            color="success"
            @click="openAddForm"
          >
            <span> AÑADIR</span>
          </v-btn>
        </div>
      </v-card-title>
      <v-card-text class="mb-1">
        <div class="ml-2 mb-n2 mt-3" >
          <v-switch
            v-model="clientsStore.is_active"
            color="#841811ff"
            :label="clientsStore.is_active ? 'Activos' : 'Inactivos'"
          ></v-switch>
        </div>
        <!-- <v-chip
          v-if="clientsStore.client_status"
          :color="clientsStore.client_status == 1 ? 'success' : 'error'"
          class="ma-2"
          closable
          @click:close="selectFilter = null"
        >
          {{ clientsStore.client_status == 1 ? 'Proximos a vencer' : 'Vencidos' }}
        </v-chip> -->

        <ClientList @onEdit="onEdit" @onDeactivate="unableItem" />
      </v-card-text>
    </v-card>
    <v-dialog
      width="540"
      v-model="clientsStore.openDialog"
    >
      <div>
        <v-card>
          <v-card-text>
            <EIPSelector v-if="clientsStore.moduleMode === 'set-eip'" />
            <TaxxaForm v-if="clientsStore.moduleMode === 'set-taxxa-info'" />
          </v-card-text>
        </v-card>
      </div>
    </v-dialog>
  </LayoutOne>
</template>

<script setup lang="ts">
// import { EmitInterface } from "../../../interfaces/Emit.interface";
import { inject, onBeforeMount, onMounted, ref, watch } from "vue";
import LayoutOne from "../../../Layouts/LayoutOne.vue";
import router from "../../../router";
import ClientList from "../components/ClientList.vue";
import { useClientsStore } from "../store/useClientsStore";
import { EmitInterface } from "../../../interfaces/Emit.interface";
import TaxxaForm from "../components/forms/TaxxaForm.vue";
import EIPSelector from "../components/forms/EIPSelector.vue";
import { useAppStore } from "../../../stores/app-store";

const clientsStore = useClientsStore();
const appStore = useAppStore();

let switchValue = ref(true);
const swal: any = inject("swal");
const openDialogFilter = ref(false);
const openAddForm = () => {
  clientsStore.moduleMode = "add";
  router.push("/client/form");
};

const items = [
  { id: null, type: "Todos" },
  { id: 1, type: "Proximos a vencer" },
  { id: 2, type: "Vencidos" },
];
// const openFilter = () => {
//   clientsStore.moduleMode = "filter";
//   openDialogFilter.value = true;
// };

const onEdit = (emitted: EmitInterface) => {
  clientsStore.moduleMode = "edit";
  clientsStore.selectedItem = emitted.data;
};

const unableItem = (emitted: EmitInterface) => {
  const action = !emitted.data.item.is_active ? "Restaurar" : "Desactivar";
  const successMessage = !emitted.data.item.is_active
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
        clientsStore.selectedItem = emitted.data.item;
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

const simpleSearch = async () => {
  clientsStore.page = 1;
  clientsStore.is_active = switchValue.value;
  clientsStore.search = clientsStore.search.trim();
  await clientsStore.loadPaginatedList();
};

watch(
  () => clientsStore.is_active,
  () => {
    appStore.afterLoading(clientsStore.loadPaginatedList);
  }
);
const onCloseDialog = async () => {
  clientsStore.openDialog = false;
  clientsStore.moduleMode = "";
  clientsStore.selectedItem = {};
};

const selectFilter = ref(null)

const filterSubmit = async () => {
  clientsStore.client_status = selectFilter.value
  selectFilter.value = null
  openDialogFilter.value = false
  return await clientsStore.loadPaginatedList()
}
onBeforeMount(() => {
  clientsStore.client_status = selectFilter.value
  onCloseDialog()
})

onMounted(async () => {
  clientsStore.client_status = selectFilter.value
  appStore.afterLoading(clientsStore.loadPaginatedList);
})
</script>

<style scoped>
.full-height-card {
  height: 100%;
}
</style>
