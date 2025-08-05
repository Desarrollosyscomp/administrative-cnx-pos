<template>
  <ClientTable class="show d-none d-sm-block" @onEdit="goToEdit" @onDesactivate="unableItem" @on-set-database="onSetDatabase" @on-set-eip="onSetEIP"/>
  <ClientsCards class="mobile-cards d-block d-sm-none mt-3" @on-edit="goToEdit" @on-desactivate="unableItem" />
  <div align="center" class="mt-4">

    <Paginator v-if="clientsStore.itemsCount > clientsStore.limit" :key="clientsStore.page"
      :items-per-page="clientsStore.limit" :max-buttons="4" :total-pages="clientsStore.totalPages"
      :current-page="clientsStore.page" @on-change-page="onChangePage" />
  </div>

  <div class="ma-4" v-if="clientsStore.list.length < 1">
    <Vue3Lottie :animationData="EmptyLottie" :height="300" :width="300" />
    <h3 class="text-center">No se encontraron resultados</h3>
  </div>
</template>

<script setup lang="ts">
import { EmitInterface } from '../../../interfaces/Emit.interface';
import { useClientsStore } from '../store/useClientsStore';
import ClientsCards from './ClientsCards.vue';
import ClientTable from './ClientTable.vue';
import EmptyLottie from "../../../assets/lotties/empty.json";
import { useAppStore } from '../../../stores/app-store';
const clientsStore = useClientsStore()
const appStore = useAppStore()

const emit = defineEmits(["onEdit", "onDeactivate", "on-action"]);

const onChangePage = (emitted: EmitInterface) => {
  if (clientsStore.page !== emitted.data.page) {
    clientsStore.page = emitted.data.page;
    appStore.afterLoading(clientsStore.loadPaginatedList);
  }
};

const goToEdit = (emitted: EmitInterface) => {
  emit("onEdit", {
    name: "ThirdPartiesList.goToEdit." + emitted.name,
    data: emitted.data,
  });
};

const unableItem = (emitted: EmitInterface) => {
  emit("onDeactivate", {
    name: "ThirdPartiesList.onDesactivate." + emitted.name,
    data: emitted.data,
  });
};

const onSetDatabase = (emitted: EmitInterface) => {
  clientsStore.openDialog = true;
  clientsStore.moduleMode = "set-database";
  clientsStore.selectedItem = emitted.data.item;
};

const onSetEIP = (emitted: EmitInterface) => {
  clientsStore.openDialog = true;
  clientsStore.moduleMode = "set-eip";
  clientsStore.selectedItem = emitted.data.item;
};

</script>