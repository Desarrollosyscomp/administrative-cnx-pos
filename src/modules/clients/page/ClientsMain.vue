<template>
  <LayoutOne>
    <v-breadcrumbs :items="['Creacion de Clientes', 'Listar']"></v-breadcrumbs>
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
        <div class="ml-2 mb-n2 mt-3">
          <v-switch
            v-model="clientsStore.is_active"
            color="#841811ff"
            :label="clientsStore.is_active ? 'Activos' : 'Inactivos'"
          ></v-switch>
        </div>
        <ClientList @onEdit="onEdit" @onDeactivate="unableItem" />
      </v-card-text>
    </v-card>
    <v-dialog
      width="540"
      v-model="clientsStore.openDialog"
      @update:modelValue="changeValue"
    >
    <div>
      <v-card>
        <v-card-text>
          <EIPSelector v-if="clientsStore.moduleMode === 'set-eip'" />
          <TaxxaForm v-if="clientsStore.moduleMode === 'set-taxxa-info'" />
          <!-- 
            <UsersForm v-if="usersStore.moduleMode === 'add'" />
            <UsersEdit v-if="usersStore.moduleMode === 'edit'" />
            <UsersPermissions v-if="usersStore.moduleMode === 'permissions'" />
            -->
          </v-card-text>
        </v-card>
      </div>
    </v-dialog>
  </LayoutOne>
</template>

<script setup lang="ts">
// import { EmitInterface } from "../../../interfaces/Emit.interface";
import { inject, ref, watch } from "vue";
import LayoutOne from "../../../Layouts/LayoutOne.vue";
import router from "../../../router";
import ClientList from "../components/ClientList.vue";
import { useClientsStore } from "../store/useClientsStore";
import { EmitInterface } from "../../../interfaces/Emit.interface";
import TaxxaForm from "../components/forms/TaxxaForm.vue";
import EIPSelector from "../components/forms/EIPSelector.vue";

const clientsStore = useClientsStore();

let switchValue = ref(true);
const swal: any = inject("swal");

const openAddForm = () => {
  clientsStore.moduleMode = "add";
  router.push("/client/form");
};

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
    clientsStore.loadPaginatedList();
  }
);
const changeValue = () => {
  clientsStore.moduleMode = "";
  clientsStore.selectedItem = {};
};
</script>

<style scoped>
.full-height-card {
  height: 100%;
}
</style>
