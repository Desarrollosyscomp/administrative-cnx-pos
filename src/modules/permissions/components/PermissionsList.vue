<!-- ******************** HTML ******************** -->
<template>
  <PermissionsTable @onEdit="goToEdit" @onDeactivate="unableItem" />
  <PermissionsCards @onEdit="goToEdit" @onDeactivate="unableItem" />
  <div align="center" class="mt-4">
    <Paginator
      v-if="permissionsStore.itemsCount > permissionsStore.limit"
      :key="permissionsStore.page"
      :items-per-page="permissionsStore.limit"
      :max-buttons="4"
      :total-pages="permissionsStore.totalPages"
      :current-page="permissionsStore.page"
      @on-change-page="onChangePage"
    />
  </div>
  <!-- <div class="ma-4" v-if="permissionsStore.list.length < 1">
    <Vue3Lottie :animationData="EmptyLottie" :height="200" :width="200" />
    <h3 class="text-center">No se encontraron resultados</h3>
  </div> -->
</template>
<!-- ******************** JS ******************** -->
<script setup lang="ts">
import { EmitInterface } from "../../../interfaces/Emit.interface"; 


import { usePermissionsStore } from "../stores/permissions.store";

import PermissionsCards from "./PermissionsCards.vue";
import PermissionsTable from "./PermissionsTable.vue";

const permissionsStore = usePermissionsStore();
const emit = defineEmits(["onEdit", "onDeactivate"]);

const goToEdit = (emitted: EmitInterface) => {
  emit("onEdit", {
    name: "PermissionsList.goToEdit" + emitted.name,
    data: emitted.data,
  });
};
const unableItem = (emitted: EmitInterface) => {
  emit("onDeactivate", {
    name: "PermissionsList.onDeactivatet",
    data: emitted.data,
  });
};
const onChangePage = (emitted: EmitInterface) => {
  permissionsStore.page = emitted.data.page;
  permissionsStore.loadPaginatedList();
};
</script>
<!-- ******************** CSS ******************** -->
<style scoped></style>
