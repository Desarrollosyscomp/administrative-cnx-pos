<!-- ******************** HTML ******************** -->
<template>
  <LayoutOne>
    <v-breadcrumbs :items="['Ubicaciones', 'Gestionar']"></v-breadcrumbs>
    <v-card class="ma-2 px-4" elevation="5">
      <v-form class="ma-4">
        <v-row class="mt-10">
          <!---------- Country ---------->
          <v-col cols="12" sm="6">
            <v-select
              v-model="formData.countryId"
              :items="locationsStore.countries"
              item-title="name"
              item-value="id"
              color="#841811ff"
              density="compact"
              variant="outlined"
              label="País"
            >
            </v-select>
          </v-col>
          <!---------- Department ---------->
          <v-col cols="12" sm="6">
            <!-- <LocationsForm />  -->
            <LocationsSelect
              :title="'Departamento/Estado'"
              :items="locationsStore.departments"
              :parent-id="formData.countryId"
              :default-selected="defaultDepartmentId"
              @on-add-location="addDepartment"
              @on-update-location="updateDepartment"
              @update:model-value="setDepartmentValue"
            />
          </v-col>
        </v-row>
        <v-row>
          <!---------- Municipalities -------->
          <v-col cols="12" sm="6">
            <LocationsSelect
              :title="'Ciudad/Municipio'"
              :items="locationsStore.municipalities"
              :parent-id="formData.departmentId"
              :default-selected="defaultMunicipalityId"
              @on-add-location="addMunicipality"
              @on-update-location="updateMunicipality"
              @update:model-value="setMunicipalityValue"
            />
          </v-col>
          <!---------- Neighborhood -------->
          <v-col cols="12" sm="6">
            <LocationsSelect
              :title="'Barrio/Localidad'"
              :items="locationsStore.neighborhoods"
              :parent-id="formData.municipalityId"
              :default-selected="defaultNeighborhoodId"
              @on-add-location="addNeighborhood"
              @on-update-location="updateNeighborhood"
              @update:model-value="setNeighborhoodValue"
            />
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </LayoutOne>
</template>
<!-- ******************** JavaScript ******************** -->
<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue-demi";

import LocationsSelect from "../components/LocationsSelect.vue";
import { useLocationsStore } from "../stores/locations.store";
import { EmitInterface } from "../../../interfaces/Emit.interface";

const locationsStore = useLocationsStore();

let defaultDepartmentId = ref(0);
let defaultMunicipalityId = ref(0);
let defaultNeighborhoodId = ref(0);
const formData = reactive({
  countryId: 0,
  departmentId: 0,
  municipalityId: 0,
  neighborhoodId: 0,
});
// ********************* Departments Methods *********************
const addDepartment = async (emitted: EmitInterface) => {
  const data = {
    name: emitted.data.name,
    country_id: formData.countryId,
  };
  const _department = await locationsStore.addDepartment(data);
  await locationsStore.getDepartments(formData.countryId);
  defaultDepartmentId.value = _department.id;
};
const updateDepartment = async (emitted: EmitInterface) => {
  const id = emitted.data.id;
  const data = {
    name: emitted.data.name,
    country_id: formData.countryId,
  };
  await locationsStore.updateDepartment(id, data);
  await locationsStore.getDepartments(formData.countryId);
  defaultDepartmentId.value = formData.departmentId;
};
const setDepartmentValue = (emitted: EmitInterface) => {
  formData.departmentId = emitted.data.id;
};
// ********************* Municipalities Methods *********************
const addMunicipality = async (emitted: EmitInterface) => {
  const data = {
    name: emitted.data.name,
    department_id: formData.departmentId,
  };
  const _municipality = await locationsStore.addMunicipality(data);
  await locationsStore.getMunicipalities(formData.departmentId);
  defaultMunicipalityId.value = _municipality.id;
};
const updateMunicipality = async (emitted: EmitInterface) => {
  const id = emitted.data.id;
  const data = {
    name: emitted.data.name,
    department_id: formData.departmentId,
  };
  await locationsStore.updateMunicipality(id, data);
  await locationsStore.getMunicipalities(formData.departmentId);
  defaultMunicipalityId.value = formData.municipalityId ;
};
const setMunicipalityValue = (emitted: EmitInterface) => {
  formData.municipalityId = emitted.data.id;
};
// ********************* Neighborhoods Methods *********************
const addNeighborhood = async (emitted: EmitInterface) => {
  const data = {
    name: emitted.data.name,
    municipality_id: formData.municipalityId,
  };
  const _neighborhood = await locationsStore.addNeighborhood(data);
  await locationsStore.getNeighborhoods(formData.municipalityId);
  defaultNeighborhoodId.value = _neighborhood.id;
};

const updateNeighborhood = async (emitted: EmitInterface) => {
  const id = emitted.data.id;
  const data = {
    name: emitted.data.name,
    municipality_id: formData.municipalityId,
  };
  await locationsStore.updateNeighborhood(id, data);
  await locationsStore.getNeighborhoods(formData.municipalityId);
  defaultNeighborhoodId.value = formData.neighborhoodId;
};
const setNeighborhoodValue = (emitted: EmitInterface) => {
  formData.neighborhoodId = emitted.data.id;
};
// ********************* Watchers *********************
watch(
  () => formData.countryId,
  () => {
    formData.departmentId = 0;
    locationsStore.departments = [];
    locationsStore.getDepartments(formData.countryId);
  }
);
watch(
  () => formData.departmentId,
  () => {
    formData.municipalityId = 0;
    locationsStore.municipalities = [];
    locationsStore.getMunicipalities(formData.departmentId);
  }
);
watch(
  () => formData.municipalityId,
  () => {
    formData.neighborhoodId = 0;
    locationsStore.neighborhoods = [];
    locationsStore.getNeighborhoods(formData.municipalityId);
  }
);
onMounted(() => {
  locationsStore.getCountries();
});
</script>
<!-- ******************** CSS ******************** -->
<style scoped>
.create,
.edit {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
