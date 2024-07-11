<!-- ******************** HTML ******************** -->
<template>
  <Layout>
    <!-- <h2 class="ma-2">Almacenes/Listar</h2>  -->
    <v-breadcrumbs
      :items="['[[__name__(constantCase)]]', 'Listar']"
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
            v-model="__name__(camelCase)Store.search"
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
            v-model="__name__(camelCase)Store.is_active"
            :indeterminate="__name__(camelCase)Store.is_active == null"
            color="#841811ff"
            :label="
              __name__(camelCase)Store.is_active == null
                ? 'Todos'
                : __name__(camelCase)Store.is_active
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
                <div v-if="__name__(camelCase)Store.advancedSearchActive">
                  <v-divider></v-divider>

                  <v-list>
                    <v-list-item
                      v-if="__name__(camelCase)Store.search !== ''"
                      title="Busqueda"
                      :subtitle="__name__(camelCase)Store.search"
                    />
                    <v-list-item
                      title="Estado"
                      :subtitle="
                        __name__(camelCase)Store.is_active !== null
                          ? __name__(camelCase)Store.is_active
                            ? 'Activo'
                            : 'Inactivo'
                          : 'Todos'
                      "
                    />
                    <v-list-item
                      v-if="__name__(camelCase)Store.initDate !== ''"
                      title="Fecha inicial"
                      :subtitle="__name__(camelCase)Store.initDate"
                    />
                    <v-list-item
                      v-if="__name__(camelCase)Store.endDate !== ''"
                      title="Fecha final"
                      :subtitle="__name__(camelCase)Store.endDate"
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

        <__name__(pascalCase)List @onEdit="onEdit" @onDeactivate="unableItem" />
        <!--
          @onShowRecord="onShowRecord" 
        -->
      </v-card-text>
      <v-dialog v-model="dialog" @update:modelValue="changeValue" width="768">
        <v-sheet>
          <__name__(pascalCase)Form @onClose="onClose"
          @onAddSuccess="onAddSuccess" v-if="
          __name__(camelCase)Store.moduleMode === 'add' ||
          __name__(camelCase)Store.moduleMode === 'edit' " />
          <!-- <__name__(pascalCase)Details v-if="__name__(camelCase)Store.moduleMode === 'details'" /> -->
          <__name__(pascalCase)Searcher
          v-if="__name__(camelCase)Store.moduleMode === 'advancedSearch'"
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
// import __name__(pascalCase)Details from "../components/";
import __name__(pascalCase)Form from "../components/__name__(pascalCase)Form.vue";
import __name__(pascalCase)List from "../components/__name__(pascalCase)List.vue";
import __name__(pascalCase)Searcher from "../components/__name__(pascalCase)Searcher.vue";

import EmptyLottie from "@/assets/lottie-files/search.json";

import { EmitInterface } from "@/interfaces/Emit.interface";

import { use__name__(pascalCase)Store } from "../stores/__name__(kebabCase).store";
import { useAppStore } from "@/stores/app-store";

const __name__(camelCase)Store = use__name__(pascalCase)Store();
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
    await __name__(camelCase)Store.loadPaginatedList();
  } catch (error) {
    console.error(error);
  }
};
const simpleSearch = () => {
  appStore.afterLoading(async () => {
    __name__(camelCase)Store.page = 1;
    __name__(camelCase)Store.is_active = switchValue.value;
    __name__(camelCase)Store.advancedSearchActive = false;
    __name__(camelCase)Store.search = __name__(camelCase)Store.search.trim();
    await __name__(camelCase)Store.loadPaginatedList();
  });
  //console.log(search.value.trim());
};
const cleanerSearch = () => {
  appStore.afterLoading(async () => {
    __name__(camelCase)Store.page = 1;
    __name__(camelCase)Store.advancedSearchActive = false;
    __name__(camelCase)Store.search = "";
    await __name__(camelCase)Store.loadPaginatedList();
    menu.value = false;
  });
};
// const onShowRecord = (emitted: EmitInterface) => {
//   __name__(camelCase)Store.selectedItem = emitted.data.__name__(camelCase);
//   dialog.value = true;
// };
const addModal = () => {
  __name__(camelCase)Store.moduleMode = "add";
  dialog.value = true;
};
const onAddSuccess = () => {
  __name__(camelCase)Store.moduleMode = "";
  dialog.value = false;
};
const onEdit = (emitted: EmitInterface) => {
  __name__(camelCase)Store.moduleMode = "edit";
  __name__(camelCase)Store.selectedItem = emitted.data.__name__(camelCase);
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
      text: `¿Está seguro que desea ${action.toLowerCase()} este [[__name__(constantCase)]]?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4CAF50",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar",
    })
    .then(async (result: any) => {
      if (result.isConfirmed) {
        __name__(camelCase)Store.selectedItem = emitted.data.item;
        const response = await __name__(camelCase)Store.delete();
        __name__(camelCase)Store.selectedItem = {};
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
  __name__(camelCase)Store.search = "";
  __name__(camelCase)Store.moduleMode = "advancedSearch";
  dialog.value = true;
};
const performSearch = async (searchValue: object) => {
  console.log(searchValue);
  await __name__(camelCase)Store.loadPaginatedList();
  dialog.value = false;
};
const onClose = () => {
  __name__(camelCase)Store.moduleMode = "";
  dialog.value = false;
};
const changeValue = (value: boolean) => {
  if (value) return;
  __name__(camelCase)Store.moduleMode = "";
  __name__(camelCase)Store.selectedItem = {};
};

//////CRUD SECTIONS////
// const showRecord = ( __name__(camelCase): __name__(pascalCase)Interface) => {
//   __name__(camelCase)Store.moduleMode = 'details';
//   emit('onShowRecord', {
//     name: '__name__(pascalCase)Table.showRecord',
//     data: { __name__(camelCase) }
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
  __name__(camelCase)Store.advancedSearchActive = false;
  __name__(camelCase)Store.is_active = !__name__(camelCase)Store.is_active;

  pagination();
};
// watch (switchValue, () => {
//   __name__(camelCase)Store.advancedSearchActive = false
//   pagination()
//   // if (switchValue.value) {
//   //   __name__(camelCase)Store.is_active = true;
//   //   pagination();
//   // } else {
//   //   __name__(camelCase)Store.is_active = false;
//   //   pagination();
//   // }
// });

watch(
  () => __name__(camelCase)Store.advancedSearchActive,
  () => {
    if (__name__(camelCase)Store.advancedSearchActive) {
      if (__name__(camelCase)Store.is_active !== null) {
        switchValue.value = __name__(camelCase)Store.is_active;

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
