<!-- ******************** HTML ******************** -->
<template>
  <v-card>
    <v-card-title>Busqueda Avanzada</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="submit" class="mt-4">
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="formData.search"
              color="#841811ff"
              density="compact"
              variant="outlined"
              label="Busqueda"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              v-model="formData.isActive"
              :items="status"
              item-title="name"
              item-value="id"
              color="#841811ff"
              density="compact"
              variant="outlined"
              label="Estado del [[LOCATIONS]]"
            >
            </v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="formData.initDate"
              color="#841811ff"
              density="compact"
              variant="outlined"
              label="Fecha Inicio"
              type="date"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="formData.endDate"
              color="#841811ff"
              density="compact"
              variant="outlined"
              label="Fecha Final"
              type="date"
            ></v-text-field>
          </v-col>
        </v-row>
        <div class="d-flex justify-end mt-4">
          <v-btn
            class="mr-4 d-none d-sm-flex"
            size="small"
            color="#841811ff"
            variant="outlined"
            @click="close"
          >
            Cancelar
          </v-btn>
          <v-btn
            class="mr-4 d-flex d-sm-none"
            size="small"
            color="#841811ff"
            variant="outlined"
            @click="close"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <br />
          <v-btn
            class="d-none d-sm-flex"
            color="success"
            variant="outlined"
            type="submit"
            size="small"
          >
            Buscar
          </v-btn>
          <v-btn
            class="d-flex d-sm-none"
            color="success"
            variant="outlined"
            type="submit"
            size="small"
          >
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<!-- ******************** JavaScript ******************** -->
<script setup lang="ts">
import { reactive, ref } from "vue-demi";
import { useLocationsStore } from "../stores/locations.store";
// import * as Yup from "yup";
import { useAppStore } from "@/stores/app-store";

const appStore = useAppStore();
const locationsStore = useLocationsStore();

const emit = defineEmits(["onClose", "onSearch"]);

let status = ref([
  { name: "Todos", id: null },
  { name: "Activo", id: true },
  { name: "Inactivo", id: false }
]);

let formData = reactive({
  search: "",
  isActive: true,
  initDate: "",
  endDate: "",
});

const submit = async () => {
  try {
    appStore.afterLoading(async () => {
      locationsStore.advancedSearchActive = true
      locationsStore.search = formData.search;
      locationsStore.isActive = formData.isActive;
      locationsStore.initDate = formData.initDate;
      locationsStore.endDate = formData.endDate;
      locationsStore.page = 1;
      await locationsStore.loadPaginatedList();
      locationsStore.search = '';
    });
    emit("onClose");

  } catch (e: any) {
    console.log("Validation failed");
  }
};
const close = () => {
  emit("onClose");
};
</script>

<!-- ******************** CSS ******************** -->
<style></style>
