<!-- ******************** HTML ******************** -->
<template>
  <div class="show d-none d-sm-block">
    <v-table>
      <thead>
        <tr>
          <th class="text-left font-weight-black">NOMBRE</th>
          <th class="text-center font-weight-black">REGISTRO</th>
          <th class="text-right font-weight-black">ESTADO</th>
          <th class="text-right font-weight-black">ACCIONES</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list" :key="index">
          <td class="text-left text-truncate" style="max-width: 20px">
            {{ item.client }}
          </td>
          <td class="text-center text-truncate" style="max-width: 20px">
            {{ item.registerDate }}
          </td>
          <td class="text-right">
            <v-badge
              :color="item.status == 'activo' ? 'success' : '#841811ff'"
              class="mr-12 mb-1"
            >
              <template v-slot:badge>
                <span class="pa-2">{{
                  item.status
                }}</span>
              </template>
            </v-badge>
          </td>
          <td class="text-right">
            <div>
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    class="mt-2 ml-4"
                    color="#841811ff"
                    variant="outlined"
                    size="x-small"
                  >
                    <!-- <span v-if="isMobile">
                      <v-icon> mdi-format-list-bulleted </v-icon>
                      </span> 
                      <span v-else> OPCIONES </span>
                    -->
                    <span> OPCIONES </span>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item v-for="(optionsItem, optionIndex) in opitonsItems" :key="index">
                    <v-list-item-title>
                        <a type="button" @click="openOption(item.id, optionIndex)">
                        {{ optionsItem.title }}
                      </a>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>
    <v-dialog v-model="dialog" width="768">
      <!-- @update:modelValue="changeValue" -->
        <v-sheet>
          <CustomersEnterpriseForm v-if="customersStore.moduleMode === 'enterpriseHandle'" />
          <!-- <ThirdPartiesForm
            @onClose="onClose"
            @onAddSuccess="onAddSuccess"
            v-if="
              thirdPartiesStore.moduleMode === 'add' ||
              thirdPartiesStore.moduleMode === 'edit'
            "
          />
          <ThirdPartiesSearcher
            v-if="thirdPartiesStore.moduleMode === 'advancedSearch'"
            @onSearch="performSearch"
            @onClose="onClose"
          /> -->
        </v-sheet>
      </v-dialog>
  </div>
</template>
<!-- ******************** JavaScript ******************** -->
<script setup lang="ts">
// import { useCustomersStore } from "../stores/customers.store";
// import { CustomersInterface } from "../interfaces/customers.interface";
import { ref } from "vue";
import CustomersEnterpriseForm from "./CustomersEnterpriseForm.vue";
import { useCustomersStore } from "../stores/customers.store";

const customersStore = useCustomersStore();

let list = ref([
  { id: 1, client: "John Doe", registerDate: Date(),status: "activo"},
  { id: 2, client: "Jane Doe", registerDate: Date(),status: "inactivo"},
  { id: 3, client: "Jame Doe", registerDate: Date(),status: "inactivo"},
  { id: 4, client: "Jane Doe", registerDate: Date(),status: "activo"},
  { id: 5, client: "Jane Doe", registerDate: Date(),status: "inactivo"}
]);

const opitonsItems = ref([
  { id:1, title: "Detalles cliente" },
  { id:2, title: "Detalles servicio" },
  { id:3, title: "Gestion de empresas" },
]);

let dialog = ref(false);

const emit = defineEmits(["onEdit", "onDeactivate"]);

const openOption = (thirdId: number, optionIndex: number) => {
  dialog.value = true;
  if (optionIndex === 2) {
    customersStore.moduleMode = "enterpriseHandle"
    customersStore.selectedItem.id = thirdId;
  }
}

</script>
<!-- ******************** CSS ******************** -->
<style scoped></style>
