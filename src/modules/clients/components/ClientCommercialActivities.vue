<template>
  <v-card class="full-height-card" :class="[clientsStore.isValidFormComercialActivities && 'style-card-error']">
    <v-card-text>
      <div class="align-components">
        <p><b>Actividades Comerciales</b></p>
      </div>
<v-tabs
      v-model="tab"
      align-tabs="center"
      color="#841811ff"
    >
      <v-tab :value="1" class="custom-font-size">Actividades</v-tab>
      <v-tab :value="2" class="custom-font-size">Seleccionar</v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item
        :value="1"
      >
        <v-container fluid>
          <div
          v-for="(financial, i) in clientsStore.financialActivitiesListTest"
          :key="i" class="mb-3"
          >
           <span class="font-weight-black custom-font-size align-components mt-2">
              {{ financial.code }}
            </span>

            <div align="end" class="align-components">
              <v-btn
                icon="mdi-delete"
                variant="text"
                size="x-small"
                color="#841811ff"
                @click="deleteActivitie(i)"
              >
              </v-btn>
            </div>
            <v-divider></v-divider>
          </div>
        </v-container>
      </v-tabs-window-item>
      <v-tabs-window-item
        :value="2"
      >
        <v-container fluid>
          <div
          v-for="(financial, i) in clientsStore.financialActivitiesListTest"
          :key="i" class="mb-3"
          >
            <span class="font-weight-black custom-font-size align-components mt-2">
              {{ financial.name }}
            </span>
              <div align="end" class="align-components">
              <v-btn
                icon="mdi-hand-back-right-outline"
                variant="text"
                size="x-small"
                color="#841811ff"
                @click="selectionActivities(financial)"
              >
              </v-btn>
            </div>
            <v-divider></v-divider>

          </div>

        </v-container>
      </v-tabs-window-item>
    </v-tabs-window>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
// import { useAppStore } from "../../../stores/app-store"; 
import { ref } from "vue";
import { useClientsStore } from "../store/useClientsStore";

// const appStore = useAppStore();
const clientsStore = useClientsStore();

 let tab = ref();
// const simpleSearch = () => {
//   appStore.afterLoading(async () => {
//     clientsStore.page = 1;
//     clientsStore.advancedSearchActive = false;
//     clientsStore.search = clientsStore.search.trim();
//     await clientsStore.loadPaginatedFinancialActivities();
//   });
// };


const selectionActivities = (financialActivity: any) => {
  clientsStore.selectedFinancialActivities.push(financialActivity);
  // clientsStore.form.financial_activities.push(financialActivity)
  clientsStore.loadPaginatedFinancialActivities(clientsStore.selectedFinancialActivities);
  clientsStore.isValidFormComercialActivities = false;
};

const deleteActivitie = (financialActivityIndex: number) => {
  clientsStore.selectedFinancialActivities.splice(financialActivityIndex, 1);
  // clientsStore.form.financial_activities.splice(financialActivityIndex, 1)
  console.log(clientsStore.form.financial_activities);
  clientsStore.loadPaginatedFinancialActivities(clientsStore.selectedFinancialActivities);
};

// watch(()=>clientsStore.selectedFinancialActivities,(v)=>{
//   clientsStore.loadPaginatedFinancialActivities(v);
//   console.log(v);
// })

// const onChangePage = (emitted: EmitInterface) => {
//   clientsStore.page = emitted.data.page;
//   clientsStore.loadPaginatedFinancialActivities(clientsStore.selectedFinancialActivities);
// };

// onMounted(() => {
//   clientsStore.loadPaginatedFinancialActivities(clientsStore.selectedFinancialActivities);
// });
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
</style>
