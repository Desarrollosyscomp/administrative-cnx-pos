<!-- ******************** HTML ******************** -->
<template>
  <div class="show d-none d-sm-block">
    <v-table>
      <thead>
        <tr>
          <th class="text-left font-weight-black">NOMBRE</th>
          <th class="text-center font-weight-black">DESCRIPCION</th>
          <th class="text-right font-weight-black">ESTADO</th>
          <th class="text-right font-weight-black">ACCIONES</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in productsStore.list" :key="index">
          <td class="text-left text-truncate" style="max-width: 20px">
            {{ item.name }}
          </td>
          <td class="text-center text-truncate" style="max-width: 20px">
            {{ item.description }}
          </td>
          <td class="text-right">
            <v-badge
              :color="item.is_active ? 'success' : '#841811ff'"
              class="mr-12 mb-1"
            >
              <template v-slot:badge>
                <span class="pa-2">{{
                  item.is_active ? "Activo" : "Inactivo"
                }}</span>
              </template>
            </v-badge>
          </td>
          <td class="text-right">
            <!-- <v-tooltip text="Deatlles" location="bottom">
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  class="ma-2"
                  variant="text"
                  icon="mdi-eye"
                  color="blue-lighten-2"
                  @click="showRecord(item)"
                >
                </v-btn>
              </template>
            </v-tooltip> -->
            <v-tooltip v-if="item.is_active" text="Editar" location="top">
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  class=""
                  variant="text"
                  icon="mdi-pencil"
                  size="small"
                  color="blue-lighten-2"
                  @click="goToEdit(item)"
                >
                </v-btn>
              </template>
            </v-tooltip>
            <v-tooltip
              :text="item.is_active ? 'Desactivar' : 'Restaurar'"
              location="top"
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  class=""
                  size="small"
                  variant="text"
                  :icon="item.is_active ? 'mdi-delete' : 'mdi-restore'"
                  :color="item.is_active ? 'red-lighten-2' : 'blue-lighten-2'"
                  @click="unableItem(item)"
                >
                </v-btn>
              </template>
            </v-tooltip>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
<!-- ******************** JavaScript ******************** -->
<script setup lang="ts">
import { useProductsStore } from "../stores/products.store";
import { ProductsInterface } from "../interfaces/products.interface";

const productsStore = useProductsStore();
const emit = defineEmits(["onEdit", "onDeactivate"]);

const goToEdit = (products: ProductsInterface) => {
  emit("onEdit", {
    name: "ProductsTable.goToEdit",
    data: { products },
  });
};
const unableItem = async (item: ProductsInterface) => {
  emit("onDeactivate", {
    name: "ProductsTable.deactivate",
    data: { item },
  });
};
</script>
<!-- ******************** CSS ******************** -->
<style scoped></style>
