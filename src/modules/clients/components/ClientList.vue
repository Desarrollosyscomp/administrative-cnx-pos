<template>
    <ClientTable class="show d-none d-sm-block" @onEdit="goToEdit" @onDesactivate="unableItem"/>
    <ClientsCards class="mobile-cards d-block d-sm-none mt-3" @onEdit="goToEdit" @onDesactivate="unableItem"/>
    <div align="center" class="mt-4">
        <Paginator v-if="clientsStore.itemsCount > clientsStore.limit" :key="clientsStore.page"
            :items-per-page="clientsStore.limit" :max-buttons="4" :total-pages="clientsStore.totalPages"
            :current-page="clientsStore.page" @on-change-page="onChangePage" />
    </div>
</template>

<script setup lang="ts">
import { EmitInterface } from '../../../interfaces/Emit.interface';
import { useClientsStore } from '../store/useClientsStore';
import ClientsCards from './ClientsCards.vue';
import ClientTable from './ClientTable.vue';
const clientsStore = useClientsStore()

const emit = defineEmits(["onEdit", "onDeactivate"]);

const onChangePage = (emitted: EmitInterface) => {
    clientsStore.page = emitted.data.page;
    clientsStore.loadPaginatedList();
};

const goToEdit = (emitted: EmitInterface) => {
  emit("onEdit", {
    name: "ThirdPartiesList.goToEdit" + emitted.name,
    data: emitted.data,
  });
};
const unableItem = (emitted: EmitInterface) => {
  emit("onDeactivate", {
    name: "ThirdPartiesList.onDeactivatet",
    data: emitted.data,
  });
};

</script>