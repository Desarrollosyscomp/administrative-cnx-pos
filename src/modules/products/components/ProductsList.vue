<!-- ******************** HTML ******************** -->
<template>
  <ProductsTable @onEdit="goToEdit" @onDeactivate="unableItem" />
  <ProductsCards @onEdit="goToEdit" @onDeactivate="unableItem" />
  <div align="center" class="mt-4">
    <Paginator
      v-if="productsStore.itemsCount > productsStore.limit"
      :key="productsStore.page"
      :items-per-page="productsStore.limit"
      :max-buttons="4"
      :total-pages="productsStore.totalPages"
      :current-page="productsStore.page"
      @on-change-page="onChangePage"
    />
  </div>
  <div class="ma-4" v-if="productsStore.list.length < 1">
    <Vue3Lottie :animationData="EmptyLottie" :height="200" :width="200" />
    <h3 class="text-center">No se encontraron resultados</h3>
  </div>
</template>
<!-- ******************** JS ******************** -->
<script setup lang="ts">
import { EmitInterface } from "@/interfaces/Emit.interface";

import EmptyLottie from "@/assets/lottie-files/empty.json";

import { useProductsStore } from "../stores/products.store";

import ProductsCards from "./ProductsCards.vue";
import ProductsTable from "./ProductsTable.vue";

const productsStore = useProductsStore();
const emit = defineEmits(["onEdit", "onDeactivate"]);

const goToEdit = (emitted: EmitInterface) => {
  emit("onEdit", {
    name: "ProductsList.goToEdit" + emitted.name,
    data: emitted.data,
  });
};
const unableItem = (emitted: EmitInterface) => {
  emit("onDeactivate", {
    name: "ProductsList.onDeactivatet",
    data: emitted.data,
  });
};
const onChangePage = (emitted: EmitInterface) => {
  productsStore.page = emitted.data.page;
  productsStore.loadPaginatedList();
};
</script>
<!-- ******************** CSS ******************** -->
<style scoped></style>
