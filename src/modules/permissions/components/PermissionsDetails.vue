<!-- ******************** HTML ******************** -->
<template>
  <v-card variant="outlined">
    <v-card-title> permissions </v-card-title>
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
import { usePermissionsStore } from "../stores/index";

const permissionsStore = usePermissionsStore();
const data = permissionsStore.selectedItem;
</script>

<!-- ******************** CSS ******************** -->
<style></style>
