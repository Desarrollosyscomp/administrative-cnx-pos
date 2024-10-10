<template>
  <v-card>
    <v-app>
      <h1>Administrative Dashvoard Component Extension</h1>
      <v-app-bar 
        :elevation="2" 
        color="#4d4d4dff"
        @click.stop="drawer = !drawer"
      >
        <template v-slot:prepend>
          <v-app-bar-nav-icon>

          </v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>Application Bar</v-app-bar-title>

        <template v-slot:append>
          <v-btn icon="mdi-heart" color="red"></v-btn>

          <v-btn icon="mdi-magnify" color="black"></v-btn>

          <v-btn icon="mdi-dots-vertical" color="green"></v-btn>
        </template>
      </v-app-bar>
      <v-main>
        <v-container fluid>
          <slot></slot>
        </v-container>
      </v-main>
      <v-navigation-drawer v-model="drawer" temporary>
        <v-list-item
          style="padding: 4%"
          prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg"
          title="John Leider"
        ></v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-store"
            title="Almacenes"
            value="warehouses"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-app>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const drawer = ref(false);
</script>

<style scoped>
</style>


<!-- <v-app-bar color="rgba(132, 24, 17, 1)">
  <template v-slot:prepend>
    <v-app-bar-nav-icon
      color="white"
      @click.stop="drawer = !drawer"
    ></v-app-bar-nav-icon>
  </template>

  <v-spacer></v-spacer>

  <v-btn icon>
    <v-icon color="white">mdi-cog</v-icon>
  </v-btn>
    <v-btn icon>
      <v-icon color="white">mdi-archive</v-icon>
    </v-btn> 
  <v-btn icon>
    <v-icon color="white" @click="goTo('billings-main')"
      >mdi-currency-usd</v-icon
    >
  </v-btn>
    <v-btn icon>
      <v-icon color="white">mdi-food-fork-drink</v-icon>
    </v-btn>
</v-app-bar>  

<v-main>
  <v-container fluid>
    <slot></slot>
  </v-container>
</v-main>
<v-navigation-drawer v-model="drawer" temporary>
  <v-list-item
    style="padding: 4%"
    prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg"
    title="John Leider"
  ></v-list-item>

  <v-divider></v-divider>

  <v-list density="compact" nav>
    <v-list-item
      v-if="showOption('warehouses')"
      @click="goTo('warehouses-list')"
      prepend-icon="mdi-store"
      title="Almacenes"
      value="warehouses"
    ></v-list-item> -->
