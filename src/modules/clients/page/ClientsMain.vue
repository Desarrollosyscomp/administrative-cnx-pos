<template>
  <LayoutOne>
    <v-breadcrumbs :items="['Creacion de Clientes', 'Listar']"></v-breadcrumbs>
    <v-card class="ma-2 px-3 full-height-card" elevation="5">
      <v-card-title class="mr-1 mt-4 mb-n7">
        <div class="d-flex flex-column flex-sm-row">
          <v-text-field class="ma-2 w-100 " color="#841811ff" density="compact" variant="outlined" label="Buscar"
            append-inner-icon="mdi-magnify">
          </v-text-field>
          <v-btn class="mt-2 ml-2" variant="outlined" color="success" @click="openAddForm">
            <span> AÑADIR</span>
          </v-btn>
        </div>
      </v-card-title>
      <v-card-text class="mb-1">
        <div class="ml-2 mb-n2">
          <v-switch @click="switchActiveList" v-model="clientsStore.is_active" color="#841811ff" :label="clientsStore.is_active == null
            ? 'Activos'
            : 'Inactivos'
            "></v-switch>
        </div>
        <ClientList />
      </v-card-text>


    </v-card>

  </LayoutOne>
</template>

<script setup lang="ts">
import LayoutOne from "../../../Layouts/LayoutOne.vue";
import router from "../../../router";
import ClientList from "../components/ClientList.vue";
import { useClientsStore } from "../store/useClientsStore";

const clientsStore = useClientsStore();
const openAddForm = () => {
  clientsStore.moduleMode = "add";
  router.push("/client/form");
};

const switchActiveList = () => {
  clientsStore.advancedSearchActive = false;
  clientsStore.is_active = !clientsStore.is_active;
  // pagination();
};
</script>
