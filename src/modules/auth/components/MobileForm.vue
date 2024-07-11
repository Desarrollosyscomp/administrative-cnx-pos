<template>
  <div class="pa-4 pt-16" align="center">
    <v-img
      width="40%"
      src="src/assets/logos/logo.jpg"
      @load="onLoadedImage"
    ></v-img>

    <h2 class="my-2 text-grey-darken-3">Iniciar Sesión</h2>
    <v-form @submit.prevent="submit" class="mt-6">
      <v-text-field
        bg-color="white"
        v-model="formData.username"
        :rules="usernameRules"
        variant="outlined"
        label="Nombre de usuario"
      ></v-text-field>
      <v-text-field
        class="mt-4"
        bg-color="white"
        type="password"
        variant="outlined"
        v-model="formData.password"
        label="Contraseña"
      ></v-text-field>
      <br />
      <v-btn type="submit" variant="outlined"> Entrar </v-btn>
    </v-form>
  </div>
</template>
<script setup lang="ts">
import { useAppStore } from "@/stores/app-store";
import { ref, reactive } from "vue-demi";
import { useRouter } from "vue-router";
import * as Yup from "yup";
import { useAuthStore } from "../store/useStoreAuth";

const router = useRouter();

let formData = reactive({
  username: "luis",
  password: "pos123..",
});
const validations = {
  username: Yup.string().required(),
  password: Yup.string().required(),
};
let validationSchema = Yup.object(validations);
const usernameRules = ref([
  async (value: any) => {
    try {
      await validations.username.validate(value);
      return true;
    } catch (e: any) {
      return "El username no es válido";
    }
  },
]);

const onLoadedImage = () => {
  const appStore = useAppStore();
  appStore.showSplashScreen = false;
};
const submit = async () => {
  const appStore = useAppStore();
  appStore.showLoadingScreen = true;
  try {
    await validationSchema.validate(formData);
    const authStore = useAuthStore();
    const { isLogged } = await authStore.login(
      formData.username,
      formData.password
    );
    console.log(isLogged);
    if (isLogged) {
      router.push("/");
    }
    appStore.showLoadingScreen = false;
  } catch (e: any) {
    console.log(e.message);
    appStore.showLoadingScreen = false;
  }
};
</script>
