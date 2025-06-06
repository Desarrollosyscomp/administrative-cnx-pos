<!-- ******************** HTML ******************** -->
<template>
  <LocationsTable @onEdit="goToEdit" @onDeactivate="unableItem" />
  <LocationsCards @onEdit="goToEdit" @onDeactivate="unableItem" />
  <div align="center" class="mt-4">
    <Paginator
      v-if="locationsStore.itemsCount > locationsStore.limit"
      :key="locationsStore.page"
      :items-per-page="locationsStore.limit"
      :max-buttons="4"
      :total-pages="locationsStore.totalPages"
      :current-page="locationsStore.page"
      @on-change-page="onChangePage"
    />
  </div>
  <div class="ma-4" v-if="locationsStore.list.length < 1">
    <Vue3Lottie :animationData="EmptyLottie" :height="200" :width="200" />
    <h3 class="text-center">No se encontraron resultados</h3>
  </div>
</template>
<!-- ******************** JS ******************** -->
<script setup lang="ts">
import { EmitInterface } from "@/interfaces/Emit.interface";

import EmptyLottie from "@/assets/lottie-files/empty.json";

import { useLocationsStore } from "../stores/locations.store";

import LocationsCards from "./LocationsCards.vue";
import LocationsTable from "./LocationsTable.vue";

const locationsStore = useLocationsStore();
const emit = defineEmits(["onEdit", "onDeactivate"]);

const goToEdit = (emitted: EmitInterface) => {
  emit("onEdit", {
    name: "LocationsList.goToEdit" + emitted.name,
    data: emitted.data,
  });
};
const unableItem = (emitted: EmitInterface) => {
  emit("onDeactivate", {
    name: "LocationsList.onDeactivatet",
    data: emitted.data,
  });
};
const onChangePage = (emitted: EmitInterface) => {
  locationsStore.page = emitted.data.page;
  locationsStore.loadPaginatedList();
};
</script>
<!-- ******************** CSS ******************** -->
<style scoped></style>
