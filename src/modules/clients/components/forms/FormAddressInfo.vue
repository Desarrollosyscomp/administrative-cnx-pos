<template>
  <v-form >
    <v-row>
      <v-col cols="12">
        <LocationsComponent />
      </v-col>
    </v-row>
    <v-spacer></v-spacer>
    <v-row>
      <v-col cols="12" class="mt-n6">
        <SyncThirdPartiesContact />
      </v-col>
    </v-row>
    <v-row>
      <v-col md="12">
        <v-btn rounded="xs" size="large" block color="#841811ff" variant="outlined" class="mt-n3" density="compact"
          type="submit">Modificar</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import LocationsComponent from '../../../../components/location-component/LocationsComponent.vue';
import SyncThirdPartiesContact from '../SyncThirdPartiesContact.vue';

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
