<!-- ******************** HTML ******************** -->
<template>
  <v-card variant="outlined">
    <v-card-title> Locations </v-card-title>
    <v-card-text>
      <!-- post content -->
      <ul>
        <li>Nombres: {{ data.name }}</li>
        <li>Descripción: {{ data.description }}</li>
      </ul>
      <!-- <p>{{userData}}</p> -->
      <!-- post action -->
    </v-card-text>
  </v-card>
</template>

<!-- ******************** JavaScript ******************** -->
<script setup>
import { useLocationsStore } from "../stores/index";

const locationsStore = useLocationsStore();
const data = locationsStore.selectedItem;
</script>

<!-- ******************** CSS ******************** -->
<style></style>
