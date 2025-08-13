<template>
  <Layout>
    <div align="center">
      <Vue3Lottie :animationData="WelcomeLottie" :height="520" :width="600" class="d-none d-sm-block lottie-style" />
      <P class="text-style d-none d-sm-block">
        <b>
          ~ BIENVENIDO ~
        </b>
      </P>
      <P class="d-none d-sm-block h6-style">
        ¿Qué quieres hacer el dia de hoy?
      </P>
      <div class="d-none d-sm-block ">
        <v-btn class="mt-5 style-button" color="primary" size="large" @click="openModalCreateUser">
          Crear usuario
        </v-btn>
        <v-btn class="mt-5 mx-4 ml-7 style-button" color="primary" size="large" variant="outlined"
          @click="$router.push('/client/form')">
          Crear cliente
        </v-btn>
      </div>
      <Vue3Lottie :animationData="WelcomeLottie" :height="300" :width="300" class="d-block d-sm-none lottie-style-sm" />
      <P class="text-style-sm d-block d-sm-none">
        <b>
          ~ BIENVENIDO ~
        </b>
      </P>
      <div class="d-block d-sm-none">
        <v-btn class="mt-5 style-button" color="primary" size="large" @click="openModalCreateUser">
          Crear usuario
        </v-btn>
        <v-btn class="mt-5 mx-4 style-button" color="primary" size="large" variant="outlined"
          @click="$router.push('/client/form')">
          Crear cliente
        </v-btn>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import WelcomeLottie from "../assets/lotties/welcome.json";
import Layout from "../Layouts/LayoutOne.vue";
import router from "../router";
import { useUsersStore } from "../modules/users/stores/users.store";
const usersStore = useUsersStore();

const openModalCreateUser = () => {
  router.push("/users/list");
  usersStore.toogleDialog()
  usersStore.moduleMode = 'add'
};

</script>

<style scoped>
.read-the-docs {
  color: #888;
}

@keyframes fadeInZoom {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.text-style {
  font-size: 2rem;
  color: #333;
  margin-top: -60px;
  animation: fadeInZoom 0.8s ease-out forwards;
}

.h6-style {
  font-size: 18px;
  color: #333;
  margin-top: -8px;
  animation: fadeInZoom 0.8s ease-out forwards;
}

.text-style-sm {
  text-align: center;
  font-size: 25px;
  color: #333;
  margin-top: -20px;
  animation: fadeInZoom 0.8s ease-out forwards;
}

.lottie-style {
  margin-top: -50px;
}
.lottie-style-sm {
  margin-top: 20px;
}

.style-button {
  width: 200px;
  height: 60px;
  font-size: 14px;
  margin-top: 20px;
  display: inline-flex;
  animation: fadeInZoom 0.8s ease-out forwards !important;
}
</style>
