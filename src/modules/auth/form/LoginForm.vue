<template>
    <v-card class="v-card" elevation="0">
        <div class="custom-border">
            <v-card-text>
                <p class="text-h3 text-black mb-7">
                    <b>
                        Iniciar sesión
                    </b>
                </p>
                <v-form>
                    <v-text-field label="Usuario" type="text" variant="outlined" density="compact" required
                        append-inner-icon="mdi-email" class="border-color" v-model="formLogin.user"></v-text-field>
                    <v-text-field label="Contraseña" :type="isVisible ? 'text' : 'password'" variant="outlined" density="compact" required
                        :append-inner-icon="isVisible ? 'mdi-lock-off':'mdi-lock'" class="border-color" v-model="formLogin.password"
                        @click:append-inner="isVisible = !isVisible"></v-text-field>
                    <div align="start">
                        <v-btn variant="plain" density="compact" class="text-black mt-n3 mb-2 ml-n4"
                            @click="goTo('forgot-password')">
                            <b>
                                ¿Olvidaste tu contraseña?
                            </b>
                        </v-btn>
                    </div>
                    <div align="end">
                        <v-btn color="white" variant="outlined" class="change-color" @click="submitForm">Entrar</v-btn>
                    </div>
                </v-form>
            </v-card-text>
        </div>
    </v-card>
    <div id="image"></div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import router from '../../../router';
import { useAuthStore } from '../store/useStoreAuth';
import { ref } from 'vue';

const authStore = useAuthStore();
let isVisible = ref(false);

const formLogin = reactive({
    user: 'admin',
    password: 'admin123..',
});

const submitForm = async () => {
let res = await authStore.login(formLogin);
    if (res) {
        router.push({ name: "Home" });
    } else {
        console.error("Login failed");
    }

};

const goTo = (routeName: string) => {
    router.push({ name: routeName });
};


</script>
<style scoped>
.v-card {
    background-color: rgba(255, 255, 255, 0);
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 6;
    margin-top: 32vh;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
}

.border-color {
    color: rgb(0, 0, 0);
    border-radius: 10px !important;
    border-color: rgb(0, 0, 0) !important;
}

.change-color {
    border-radius: 10px !important;
    border-color: #000000 !important;
    color: #000000 !important;
}

#image {
    background-image: url('/src/assets/images/plant-login.png');
    background-color: #00000000;
    background-position: center;
    position: absolute;
    left: -11%;
    width: 20vw;
    height: 20vh;
    background-size: contain;
    background-repeat: no-repeat;
    z-index: -1;
}
</style>