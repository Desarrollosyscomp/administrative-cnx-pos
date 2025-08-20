<template>
  <v-card class="full-height-card" :class="[clientsStore.isValidFormComercialActivities && 'style-card-error']">
    <v-card-text>
      <div class="align-components">
        <p><b>Actividades Comerciales</b></p>
      </div>

      <div class="align-components custom-font-size" align="end"
        v-if="clientsStore.selectedFinancialActivities.length < 1">
        <p class="text-red">Seleccione al menos una actividad comercial</p>
      </div>

      <v-tabs v-model="tab" align-tabs="center" color="#841811ff">
        <v-tab :value="1" class="custom-font-size">Actividades</v-tab>
        <v-tab :value="2" class="custom-font-size">Seleccionar</v-tab>
      </v-tabs>

      <v-text-field class="w-50 mt-4 mb-n3" color="#841811ff" density="compact" variant="outlined" label="Buscar"
        v-model="clientsStore.search" append-inner-icon="mdi-magnify" @keyup.enter="simpleSearch">
      </v-text-field>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item :value="1">
          <p><b> Nombre de actividades seleccionada: </b></p>
          <v-container fluid>
            <div v-for="(financial, i) in clientsStore.form.financial_activities" :key="i" class="mb-2">
              <span class=" custom-font-size align-components mt-2">
                {{ financial.name }}
              </span>

              <div align="end" class="align-components">
                <v-btn icon="mdi-delete" variant="text" size="x-small" color="#841811ff" @click="deleteActivitie(i)">
                </v-btn>
              </div>
              <v-divider></v-divider>
            </div>
            <div class="ma-4" v-if="clientsStore.form.financial_activities.length < 1">
              <Vue3Lottie :animationData="EmptyLottie" :height="180" :width="190" />
              <h3 class="text-center">No se encontraron resultados</h3>
            </div>
          </v-container>
        </v-tabs-window-item>
        <v-tabs-window-item :value="2">
          <p><b> Actividades para seleccionar: </b></p>
          <v-container fluid>
            <div v-for="(financial, i) in clientsStore.financial_activities_list" :key="i" class="mb-3">
              <span class=" custom-font-size align-components mt-2">
                {{ financial.name }}
              </span>
              <div align="end" class="align-components">
                <v-btn icon="mdi-hand-back-right-outline" variant="text" size="x-small" color="#841811ff"
                  @click="selectionActivities(financial)">
                </v-btn>
              </div>
              <v-divider></v-divider>

            </div>
            <div class="ma-4" v-if="clientsStore.financial_activities_list.length < 1">
              <Vue3Lottie :animationData="EmptyLottie" :height="180" :width="190" />
              <h3 class="text-center">No se encontraron resultados</h3>
            </div>
          </v-container>
          <div align="center" class="mt-4">
            <Paginator v-if="
              clientsStore.itemsCount > clientsStore.limit
            " :key="clientsStore.page" :items-per-page="clientsStore.limit" :max-buttons="4"
              :total-pages="clientsStore.totalPages" :current-page="clientsStore.page" @on-change-page="onChangePage" />
          </div>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
// import { useAppStore } from "../../../stores/app-store"; 
import { onMounted, ref, watch } from "vue";
import { useClientsStore } from "../store/useClientsStore";
import { EmitInterface } from "../../../interfaces/Emit.interface";
import EmptyLottie from "../../../assets/lotties/empty.json";

// const appStore = useAppStore();
const clientsStore = useClientsStore();

let tab = ref();

const simpleSearch = async () => {
  clientsStore.page = 1;
  clientsStore.advancedSearchActive = false;
  clientsStore.search = clientsStore.search.trim();
  await clientsStore.loadPaginatedFinancialActivities();
};

const selectionActivities = (financialActivity: any) => {
  clientsStore.selectedFinancialActivities.push(financialActivity);
  clientsStore.form.financial_activities.push(financialActivity)
  clientsStore.loadPaginatedFinancialActivities(clientsStore.selectedFinancialActivities);
  clientsStore.isValidFormComercialActivities = false;
};

const deleteActivitie = (financialActivityIndex: number) => {
  clientsStore.selectedFinancialActivities.splice(financialActivityIndex, 1);
  clientsStore.form.financial_activities.splice(financialActivityIndex, 1)
  clientsStore.loadPaginatedFinancialActivities(clientsStore.selectedFinancialActivities);
};

watch(() => clientsStore.selectedFinancialActivities, (v) => {
  clientsStore.loadPaginatedFinancialActivities(v);
})

const onChangePage = (emitted: EmitInterface) => {
  clientsStore.page = emitted.data.page;
  clientsStore.loadPaginatedFinancialActivities(clientsStore.selectedFinancialActivities);
};

onMounted(() => {
  clientsStore.loadPaginatedFinancialActivities(clientsStore.selectedFinancialActivities);
});
</script>

<style scoped>
.custom-font-size {
  font-size: 10px;
}

.align-components {
  width: 50%;
  display: inline-block;
}

.style-card-error {
  border-radius: 5px;
  border-width: 1px;
  border-color: red;
}

.full-height-card {
    height: 100%;
}
</style>
