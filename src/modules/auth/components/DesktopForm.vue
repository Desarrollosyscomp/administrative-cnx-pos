<template>
  <div align="center" class="pa-4">
    <v-card width="90%" class="mt-12" elevation="20">
      <v-card-text>
        <v-row>
          <v-col class="hidden-md-and-down d-flex align-center">
            <v-img
              @load="onLoadedImage"
              width="100%"
              src="src/assets/logos/logo.jpg"
            ></v-img>
          </v-col>
          <v-divider vertical class="d-none d-sm-none"></v-divider>
          <v-col class="py-12 px-8 d-flex align-center text-center">
            <div align="center" style="width: 100%">
              <div style="width: 80%">
                <h2 class="my-4 text-grey-darken-3">Iniciar Sesión</h2>

                <v-form @submit.prevent="submit" class="mt-1">
                  <div class="mb-3">
                    <v-text-field
                      v-model="formData.username"
                      clearable
                      label="Nombre de usuario"
                      :rules="usernameRules"
                      variant="outlined"
                    ></v-text-field>
                  </div>
                  <div class="mb-3">
                    <v-text-field
                      v-model="formData.password"
                      clearable
                      type="password"
                      label="Contraseña"
                      variant="outlined"
                    ></v-text-field>
                    <v-btn type="submit" class="mb-3" variant="outlined"
                      >Entrar</v-btn
                    >
                    <div class="">
                      <a href="#" class="">¿Olvidaste tu contraseña?</a>
                    </div>
                  </div>
                </v-form>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
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
