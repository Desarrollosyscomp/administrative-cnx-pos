<!-- ******************** HTML ******************** -->
<template>
  <v-row>
    <v-col cols="12" sm="6">
      <LocationsSelect
      :key="keys.countryKey"
        :title="'Pais'"
        :items="countries"
        @update:model-value="onUpdatedCountry"
        :default-selected="defaultCountryId"
        :disabled="disabled"
      />
    </v-col>
    <v-col cols="12" sm="6">
      <LocationsSelect
        :key="keys.departmentsKey"
        :title="'Departamento/Estado'"
        :items="locationsComponentStore.departments"
        @update:model-value="onUpdateDepartment"
        :default-selected="defaultDepartmentId"
        :disabled="disabled"
      />
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" sm="6" >
      <LocationsSelect
        :key="keys.municipalitiesKey"
        :title="'Municipio'"
        :items="locationsComponentStore.municipalities"
        @update:model-value="onUpdateMunicipality"
        :default-selected="defaultMunicipalityId"
        :disabled="disabled"
        />
    </v-col>
    <v-col cols="12" sm="6">
      <LocationsSelect
        :key="keys.neighborhoodsKey"
        :title="'Barrio'"
        :items="locationsComponentStore.neighborhoods"
        @update:model-value="onUpdateNeighborhood"
        :default-selected="defaultNeighborhoodId"
        :disabled="disabled"
      />
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12">
      <v-text-field
        v-model="formData.address"
        :disabled="disabled"
        color="#841811ff"
        density="compact"
        variant="outlined"
        label="Dirección"
      ></v-text-field>
    </v-col>
  </v-row>
</template>
<!-- ******************** JS ******************** -->
<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import LocationsSelect from "../../modules/locations/components/LocationsSelect.vue"; 
import { useLocationsComponentStore } from "./stores/locations-component.store"; 
import { EmitInterface } from "../../interfaces/Emit.interface"; 

const keys = reactive({
  countryKey: 0,
  departmentsKey: 0,
  municipalitiesKey: 0,
  neighborhoodsKey: 0,
});
const locationsComponentStore = useLocationsComponentStore();

const emit = defineEmits(["onUpdate", "on-update-address"]);

const countries = ref([]);
const departments = ref([]);
const municipalities = ref([]);
const neighborhoods = ref([]);

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  defaultSelected: {
    type: Object,
    default: () => ({
      country: 0,
      department: 0,
      municipality: 0,
      neighborhood: 0,
      address: ''
    })
  }
});

const formData = reactive({
  country: {},
  department: {},
  municipality: {},
  neighborhood: {},
  address: "",
});

// const validations = {
//   countryId: Yup.number().required("Este campo es requerido"),
//   departmentId: Yup.number().required("Este campo es requerido"),
//   municipalityId: Yup.number().required("Este campo es requerido"),
//   address: Yup.string().trim(),
// };

// const countryIdRules = ref([
//   async (value: any) => {
//     try {
//       await validations.countryId.validate(value);
//       return true;
//     } catch (e: any) {
//       return "Error de validación en el campo";
//     }
//   },
// ]);

// const addressRules = ref([
//   async (value: any) => {
//     try {
//       await validations.address.validate(value);
//       return true;
//     } catch (e: any) {
//       return "Error de validación en el campo";
//     }
//   },
// ]);
watch(
  () => formData.address,
  async () => {
    emitAddress();
  }
);

let defaultCountryId = ref(0);
let defaultDepartmentId = ref(0);
let defaultMunicipalityId = ref(0);
let defaultNeighborhoodId = ref(0);

const loadDepartments = async (country_id: number) => {
  departments.value = await locationsComponentStore.getDepartments(country_id);
};

const loadMunicipalities = async (department_id: number) => {
  municipalities.value = await locationsComponentStore.getMunicipalities(department_id);
};

const loadNeighborhoods = async (municipality_id: number) => {
  neighborhoods.value = await locationsComponentStore.getNeighborhoods(municipality_id);
};

const onUpdatedCountry = async (emitted: EmitInterface) => {
  defaultDepartmentId.value = 0;
  defaultMunicipalityId.value = 0;
  defaultNeighborhoodId.value = 0;
  keys.departmentsKey++;
  keys.municipalitiesKey++;
  keys.neighborhoodsKey++;
  formData.country = emitted.data.location
  loadDepartments(emitted.data.location.id);
  formData.department = {};
  departments.value = [];
  formData.municipality = {};
  municipalities.value = [];
  formData.neighborhood = {}; 
  neighborhoods.value = [];
  emitForm();

};

const onUpdateDepartment = async (emitted: EmitInterface) => {
  defaultMunicipalityId.value = 0;
  defaultNeighborhoodId.value = 0;
  keys.municipalitiesKey++;
  keys.neighborhoodsKey++;
  loadMunicipalities(emitted.data.location.id);
  formData.municipality = {};
  municipalities.value = [];
  formData.neighborhood = {};
  neighborhoods.value = [];
  formData.department = emitted.data.location
  emitForm();
};



const onUpdateMunicipality = async(emitted: EmitInterface) => {
  defaultNeighborhoodId.value = 0;
  keys.neighborhoodsKey++;
  formData.municipality = emitted.data.location
  loadNeighborhoods(emitted.data.location.id);
  formData.neighborhood = {};
  neighborhoods.value = [];
  emitForm();
  
};

const onUpdateNeighborhood = (emitted: EmitInterface) => {
  formData.neighborhood = emitted.data.location
  emitForm();
};
const emitForm = () => {
  emit("onUpdate", {
    name: "ThirdPartiesLocation.onUpdate",
    data: {
      country: formData.country,
      department: formData.department,
      municipality: formData.municipality,
      neighborhood: formData.neighborhood,
    },
  });
};
const emitAddress = () => {
  emit("on-update-address", {
    name: "ThirdPartiesLocation.onUpdateAddress",
    data: {
      address: formData.address,
    },
  });
};

const setForm = () => {
  defaultCountryId.value = props.defaultSelected.country?.id ?? 0;
  defaultDepartmentId.value = props.defaultSelected.department?.id ?? 0;
  defaultMunicipalityId.value = props.defaultSelected.municipality?.id ?? 0;
  defaultNeighborhoodId.value = props.defaultSelected.neighborhood?.id ?? 0;
  formData.country = props.defaultSelected.country;
  formData.department = props.defaultSelected.department;
  formData.municipality = props.defaultSelected.municipality;
  formData.neighborhood = props.defaultSelected.neighborhood;
  loadDepartments(defaultCountryId.value);
  loadMunicipalities(defaultDepartmentId.value)
  loadNeighborhoods(defaultMunicipalityId.value)
  keys.countryKey++;
  keys.departmentsKey++;
  keys.municipalitiesKey++;
  keys.neighborhoodsKey++;
  formData.address = props.defaultSelected.address ?? "";
};

onMounted(async () => {
  countries.value = await locationsComponentStore.getCountries();
  setForm();
});
</script>
<!-- ******************** CSS ******************** -->
<style scoped></style>
