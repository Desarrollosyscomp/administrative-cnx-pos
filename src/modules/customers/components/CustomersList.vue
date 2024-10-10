<!-- ******************** HTML ******************** -->
<template>
  <CustomersTable @onEdit="goToEdit" @onDeactivate="unableItem" />
  <CustomersCards @onEdit="goToEdit" @onDeactivate="unableItem" />
  <div align="center" class="mt-4">
    <Paginator
      v-if="customersStore.itemsCount > customersStore.limit"
      :key="customersStore.page"
      :items-per-page="customersStore.limit"
      :max-buttons="4"
      :total-pages="customersStore.totalPages"
      :current-page="customersStore.page"
      @on-change-page="onChangePage"
    />
  </div>
  <div class="ma-4" v-if="customersStore.list.length < 1">
    <Vue3Lottie :animationData="EmptyLottie" :height="200" :width="200" />
    <h3 class="text-center">No se encontraron resultados</h3>
  </div>
</template>
<!-- ******************** JS ******************** -->
<script setup lang="ts">
import { EmitInterface } from "@/interfaces/Emit.interface";

import EmptyLottie from "@/assets/lottie-files/empty.json";

import { useCustomersStore } from "../stores/customers.store";

import CustomersCards from "./CustomersCards.vue";
import CustomersTable from "./CustomersTable.vue";

const customersStore = useCustomersStore();
const emit = defineEmits(["onEdit", "onDeactivate"]);

const goToEdit = (emitted: EmitInterface) => {
  emit("onEdit", {
    name: "CustomersList.goToEdit" + emitted.name,
    data: emitted.data,
  });
};
const unableItem = (emitted: EmitInterface) => {
  emit("onDeactivate", {
    name: "CustomersList.onDeactivatet",
    data: emitted.data,
  });
};
const onChangePage = (emitted: EmitInterface) => {
  customersStore.page = emitted.data.page;
  customersStore.loadPaginatedList();
};
</script>
<!-- ******************** CSS ******************** -->
<style scoped></style>
