<!-- ******************** HTML ******************** -->
<template>
  <v-card variant="outlined">
    <v-card-title> Users </v-card-title>
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
import { useUsersStore } from "../stores/index";

const usersStore = useUsersStore();
const data = usersStore.selectedItem;
</script>

<!-- ******************** CSS ******************** -->
<style></style>
