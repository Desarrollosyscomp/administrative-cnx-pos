<!-- ******************** HTML ******************** -->
<template>
  <__name__(pascalCase)Table @onEdit="goToEdit" @onDeactivate="unableItem" />
  <__name__(pascalCase)Cards @onEdit="goToEdit" @onDeactivate="unableItem" />
  <div align="center" class="mt-4">
    <Paginator
      v-if="__name__(camelCase)Store.itemsCount > __name__(camelCase)Store.limit"
      :key="__name__(camelCase)Store.page"
      :items-per-page="__name__(camelCase)Store.limit"
      :max-buttons="4"
      :total-pages="__name__(camelCase)Store.totalPages"
      :current-page="__name__(camelCase)Store.page"
      @on-change-page="onChangePage"
    />
  </div>
  <div class="ma-4" v-if="__name__(camelCase)Store.list.length < 1">
    <Vue3Lottie :animationData="EmptyLottie" :height="200" :width="200" />
    <h3 class="text-center">No se encontraron resultados</h3>
  </div>
</template>
<!-- ******************** JS ******************** -->
<script setup lang="ts">
import { EmitInterface } from "@/interfaces/Emit.interface";

import EmptyLottie from "@/assets/lottie-files/empty.json";

import { use__name__(pascalCase)Store } from "../stores/__name__(kebabCase).store";

import __name__(pascalCase)Cards from "./__name__(pascalCase)Cards.vue";
import __name__(pascalCase)Table from "./__name__(pascalCase)Table.vue";

const __name__(camelCase)Store = use__name__(pascalCase)Store();
const emit = defineEmits(["onEdit", "onDeactivate"]);

const goToEdit = (emitted: EmitInterface) => {
  emit("onEdit", {
    name: "__name__(pascalCase)List.goToEdit" + emitted.name,
    data: emitted.data,
  });
};
const unableItem = (emitted: EmitInterface) => {
  emit("onDeactivate", {
    name: "__name__(pascalCase)List.onDeactivatet",
    data: emitted.data,
  });
};
const onChangePage = (emitted: EmitInterface) => {
  __name__(camelCase)Store.page = emitted.data.page;
  __name__(camelCase)Store.loadPaginatedList();
};
</script>
<!-- ******************** CSS ******************** -->
<style scoped></style>
