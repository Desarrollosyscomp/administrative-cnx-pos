<!-- ******************** HTML ******************** -->
<template>
  <UsersTable @onEdit="goToEdit" @onDeactivate="unableItem"  />
  <UsersCards @onEdit="goToEdit" @onDeactivate="unableItem" />
  <div align="center" class="mt-4">
    <Paginator
      v-if="usersStore.itemsCount > usersStore.limit"
      :key="usersStore.page"
      :items-per-page="usersStore.limit"
      :max-buttons="4"
      :total-pages="usersStore.totalPages"
      :current-page="usersStore.page"
      @on-change-page="onChangePage"
    />
  </div>
    <div class="ma-4" v-if="usersStore.list.length < 1">
    <Vue3Lottie :animationData="EmptyLottie" :height="300" :width="300" />
    <h3 class="text-center">No se encontraron resultados</h3>
  </div>

</template>
<!-- ******************** JS ******************** -->
<script setup lang="ts">
import EmptyLottie from "../../../assets/lotties/empty.json";

import { EmitInterface } from "../../../interfaces/Emit.interface";
import { useUsersStore } from "../stores/users.store";

import UsersCards from "./UsersCards.vue";
import UsersTable from "./UsersTable.vue";

import { onMounted } from "vue-demi";

const usersStore = useUsersStore();
const emit = defineEmits(["onEdit", "onDeactivate", "onAddEnterprise"]);


const goToEdit = (emitted: EmitInterface) => {
  emit("onEdit", {
    name: "UsersList.goToEdit" + emitted.name,
    data: emitted.data,
  });
};
const unableItem = (emitted: EmitInterface) => {
  emit("onDeactivate", {
    name: "UsersList.onDeactivatet",
    data: emitted.data,
  });
};
const onChangePage = (emitted: EmitInterface) => {
  usersStore.page = emitted.data.page;
  usersStore.loadPaginatedList();
};

onMounted(async () => {
  usersStore.loadPaginatedList();
});
</script>
<!-- ******************** CSS ******************** -->
<style scoped></style>
