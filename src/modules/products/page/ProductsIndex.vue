<!-- ******************** HTML ******************** -->
<template>
  <Layout>
    <!-- <h2 class="ma-2">Almacenes/Listar</h2>  -->
    <v-breadcrumbs
      :items="['[[PRODUCTS]]', 'Listar']"
    ></v-breadcrumbs>
    <v-card class="ma-2 px-4" elevation="5">
      <v-card-title class="mr-5 mt-4">
        <div class="d-flex flex-column flex-sm-row">
          <v-text-field
            class="ma-2 w-100"
            color="#841811ff"
            density="compact"
            variant="outlined"
            label="Buscar"
            append-inner-icon="mdi-magnify"
            v-model="productsStore.search"
            @keyup.enter="simpleSearch"
          >
          </v-text-field>

          <div class="d-flex">
            <div class="text-center">
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    class="mt-2 ml-4"
                    color="#841811ff"
                    variant="outlined"
                    :size="buttonSize"
                  >
                    <span v-if="isMobile">
                      <v-icon> mdi-format-list-bulleted </v-icon>
                    </span>
                    <span v-else> OPCIONES </span>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item v-for="(item, index) in items" :key="index">
                    <v-list-item-title v-if="item.title !== 'Exportar'">
                      <a type="button" @click="openAdvancedSearcher">
                        {{ item.title }}
                      </a>
                    </v-list-item-title>
                    <v-list-item-title v-else>
                      <a type="button">
                        {{ item.title }}
                      </a>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>

            <v-spacer></v-spacer>

            <v-btn
              class="mt-2 ml-2"
              variant="outlined"
              color="success"
              @click="addModal"
              :size="buttonSize"
            >
              <span v-if="isMobile">
                <v-icon>mdi-plus</v-icon>
              </span>
              <span v-else> AÑADIR </span>
            </v-btn>
          </div>
        </div>
      </v-card-title>
      <v-card-text class="mb-2">
        <div class="d-flex ma-4">
          <v-switch
            @click="switchActiveList"
            v-model="productsStore.is_active"
            :indeterminate="productsStore.is_active == null"
            color="#841811ff"
            :label="
              productsStore.is_active == null
                ? 'Todos'
                : productsStore.is_active
                ? 'Activos'
                : 'Inactivos'
            "
          ></v-switch>

          <!-- pop-over -->
          <div class="text-center">
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              location="end"
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  class="mt-3"
                  color="grey-darken-3"
                  variant="outlined"
                  v-bind="props"
                  size="small"
                >
                  <span v-if="isMobile">
                    <v-icon>mdi-tune</v-icon>
                  </span>
                  <span v-else>Ver filtros</span>
                </v-btn>
              </template>

              <v-card min-width="230" title="Filtros">
                <div v-if="productsStore.advancedSearchActive">
                  <v-divider></v-divider>

                  <v-list>
                    <v-list-item
                      v-if="productsStore.search !== ''"
                      title="Busqueda"
                      :subtitle="productsStore.search"
                    />
                    <v-list-item
                      title="Estado"
                      :subtitle="
                        productsStore.is_active !== null
                          ? productsStore.is_active
                            ? 'Activo'
                            : 'Inactivo'
                          : 'Todos'
                      "
                    />
                    <v-list-item
                      v-if="productsStore.initDate !== ''"
                      title="Fecha inicial"
                      :subtitle="productsStore.initDate"
                    />
                    <v-list-item
                      v-if="productsStore.endDate !== ''"
                      title="Fecha final"
                      :subtitle="productsStore.endDate"
                    />
                  </v-list>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="#841811ff"
                      variant="outlined"
                      size="small"
                      @click="cleanerSearch"
                    >
                      Resetear
                    </v-btn>
                  </v-card-actions>
                </div>
                <div v-else>
                  <Vue3Lottie
                    :animationData="EmptyLottie"
                    :height="180"
                    :width="180"
                  />
                  <h4 class="text-center mb-4">No hay filtros</h4>
                </div>
              </v-card>
            </v-menu>
          </div>
          <!-- pop-over -->
        </div>

        <ProductsList @onEdit="onEdit" @onDeactivate="unableItem" />
        <!--
          @onShowRecord="onShowRecord" 
        -->
      </v-card-text>
      <v-dialog v-model="dialog" @update:modelValue="changeValue" width="768">
        <v-sheet>
          <ProductsForm @onClose="onClose"
          @onAddSuccess="onAddSuccess" v-if="
          productsStore.moduleMode === 'add' ||
          productsStore.moduleMode === 'edit' " />
          <!-- <ProductsDetails v-if="productsStore.moduleMode === 'details'" /> -->
          <ProductsSearcher
          v-if="productsStore.moduleMode === 'advancedSearch'"
          @onSearch="performSearch" @onClose="onClose" />
        </v-sheet>
      </v-dialog>
    </v-card>
  </Layout>
</template>

<!-- ******************** JavaScript ******************** -->
<script setup lang="ts">
import { inject, ref, onMounted, onUnmounted, computed, watch } from "vue-demi";
// Components
// import ProductsDetails from "../components/";
import ProductsForm from "../components/ProductsForm.vue";
import ProductsList from "../components/ProductsList.vue";
import ProductsSearcher from "../components/ProductsSearcher.vue";

import EmptyLottie from "@/assets/lottie-files/search.json";

import { EmitInterface } from "@/interfaces/Emit.interface";

import { useProductsStore } from "../stores/products.store";
import { useAppStore } from "@/stores/app-store";

const productsStore = useProductsStore();
const appStore = useAppStore();

const swal: any = inject("$swal");

const isMobile = ref(window.innerWidth <= 574);

let dialog = ref(false);
let switchValue = ref(true);
let items = ref([{ title: "Exportar" }, { title: "Busqueda avanzada" }]);
// pop-over
let menu = ref(false);
// pop-over
let elementsForPage = ref(10);
// let amountUsers = ref([10, 25, 50]);
let elementRows = ref(0);
// Methods
const buttonSize = computed(() => (isMobile.value ? "small" : "default"));

const updateIsMobile = () => {
  isMobile.value = window.innerWidth <= 574;
};
const pagination = async () => {
  try {
    await productsStore.loadPaginatedList();
  } catch (error) {
    console.error(error);
  }
};
const simpleSearch = () => {
  appStore.afterLoading(async () => {
    productsStore.page = 1;
    productsStore.is_active = switchValue.value;
    productsStore.advancedSearchActive = false;
    productsStore.search = productsStore.search.trim();
    await productsStore.loadPaginatedList();
  });
  //console.log(search.value.trim());
};
const cleanerSearch = () => {
  appStore.afterLoading(async () => {
    productsStore.page = 1;
    productsStore.advancedSearchActive = false;
    productsStore.search = "";
    await productsStore.loadPaginatedList();
    menu.value = false;
  });
};
// const onShowRecord = (emitted: EmitInterface) => {
//   productsStore.selectedItem = emitted.data.products;
//   dialog.value = true;
// };
const addModal = () => {
  productsStore.moduleMode = "add";
  dialog.value = true;
};
const onAddSuccess = () => {
  productsStore.moduleMode = "";
  dialog.value = false;
};
const onEdit = (emitted: EmitInterface) => {
  productsStore.moduleMode = "edit";
  productsStore.selectedItem = emitted.data.products;
  dialog.value = true;
};
const unableItem = (emitted: EmitInterface) => {
  const action = !emitted.data.item.is_active ? "Restaurar" : "Desactivar";
  const successMessage = !emitted.data.item.is_active
    ? "Restaurado con éxito"
    : "Desactivado con éxito";
  swal
    .fire({
      title: `${action}`,
      text: `¿Está seguro que desea ${action.toLowerCase()} este [[PRODUCTS]]?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4CAF50",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar",
    })
    .then(async (result: any) => {
      if (result.isConfirmed) {
        productsStore.selectedItem = emitted.data.item;
        const response = await productsStore.delete();
        productsStore.selectedItem = {};
        pagination();
        //@ts-ignore
        if (response.status == 200) {
          swal.fire("", successMessage, "success");
        } else {
          swal.fire("", "Ocurrió un error", "danger");
        }
      }
    });
};
const openAdvancedSearcher = () => {
  productsStore.search = "";
  productsStore.moduleMode = "advancedSearch";
  dialog.value = true;
};
const performSearch = async (searchValue: object) => {
  console.log(searchValue);
  await productsStore.loadPaginatedList();
  dialog.value = false;
};
const onClose = () => {
  productsStore.moduleMode = "";
  dialog.value = false;
};
const changeValue = (value: boolean) => {
  if (value) return;
  productsStore.moduleMode = "";
  productsStore.selectedItem = {};
};

//////CRUD SECTIONS////
// const showRecord = ( products: ProductsInterface) => {
//   productsStore.moduleMode = 'details';
//   emit('onShowRecord', {
//     name: 'ProductsTable.showRecord',
//     data: { products }
//   });
// };
watch(
  () => elementRows,
  () => {
    if (elementRows.value === 10) {
      elementsForPage.value = 10;
      pagination();
    } else if (elementRows.value === 25) {
      elementsForPage.value = 25;
      pagination();
    } else if (elementRows.value === 50) {
      elementsForPage.value = 50;
      pagination();
    }
  }
);

const switchActiveList = () => {
  productsStore.advancedSearchActive = false;
  productsStore.is_active = !productsStore.is_active;

  pagination();
};
// watch (switchValue, () => {
//   productsStore.advancedSearchActive = false
//   pagination()
//   // if (switchValue.value) {
//   //   productsStore.is_active = true;
//   //   pagination();
//   // } else {
//   //   productsStore.is_active = false;
//   //   pagination();
//   // }
// });

watch(
  () => productsStore.advancedSearchActive,
  () => {
    if (productsStore.advancedSearchActive) {
      if (productsStore.is_active !== null) {
        switchValue.value = productsStore.is_active;

        pagination();
      }
    }
  }
);

onMounted(() => {
  window.addEventListener("resize", updateIsMobile);
  pagination();
});

onUnmounted(() => {
  window.removeEventListener("resize", updateIsMobile);
});
</script>

<!-- ******************** CSS ******************** -->
<style scoped>
h4 {
  color: #841811ff;
}
</style>
