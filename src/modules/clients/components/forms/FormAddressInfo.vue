<template>
  <v-form @submit.prevent="onsubmit">
    <v-row>
      <v-col cols="12">
        <LocationsComponent :default-selected="{
          country: clientsStore.selectedCountry,
          department: clientsStore.selectedDepartment,
          municipality: clientsStore.selectedMunicipality,
          neighborhood: clientsStore.selectedNeighborhood,
          address: clientsStore.form.address
        }" @onUpdate="onUpdateLocation" @on-update-address="onUpdateAddress" />
        <div align="center" v-if="show_error_message">
          <span class="text-red">Debe ingresarse un país, departamento y municipio válidos</span>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col md="12">
        <v-btn rounded="xs" size="large" block color="#841811ff" variant="outlined" class="mt-n3" density="compact"
          type="submit">Agregar</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import LocationsComponent from '../../../../components/location-component/LocationsComponent.vue';
import { EmitInterface } from '../../../../interfaces/Emit.interface';
import { useClientsStore } from '../../store/useClientsStore';
const clientsStore = useClientsStore()

let location = reactive({
  country: {},
  municipality: {},
  department: {},
  neighborhood: {},
});


const locationValidations = computed(() => {
  return (
    clientsStore.form.country_id &&
    clientsStore.form.department_id &&
    clientsStore.form.municipality_id
  );
});

const onUpdateLocation = (emitted: EmitInterface) => {

  clientsStore.form.neighborhood_id =
    emitted.data.neighborhood?.id ?? clientsStore.form.neighborhood_id;

    clientsStore.form.municipality_id =
    emitted.data.municipality?.id ?? clientsStore.form.municipality_id;
    
    clientsStore.form.department_id =
    emitted.data.department?.id ?? clientsStore.form.department_id;
    
    clientsStore.form.country_id =
      emitted.data.country?.id ?? clientsStore.form.country_id;
      
  location.country = emitted.data.country ?? {};
  location.department = emitted.data.department ?? {};
  location.municipality = emitted.data.municipality ?? {};
  location.neighborhood = emitted.data.neighborhood ?? {};
};

const onUpdateAddress = (emitted: EmitInterface) => {
  clientsStore.form.address = emitted.data.address;
};

let show_error_message = ref(false)

const onsubmit = () => {
  // isSubmitting.value = true;
  // Verifica que todas las validaciones estén completas
  if (!locationValidations.value) {
    show_error_message.value = true
    return
  };
  clientsStore.selectedCountry = location.country;
  clientsStore.selectedDepartment = location.department;
  clientsStore.selectedMunicipality = location.municipality;
  clientsStore.selectedNeighborhood = location.neighborhood;
  clientsStore.toogleDialog();
  clientsStore.isValidFormAddressContactInfo = false;
};


</script>

<style scoped>
.custom-font-size {
  font-size: 12px;
}

.align-components {
  width: 50%;
  display: inline-block;
}
</style>
