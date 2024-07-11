//-- Project --//
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from "./router";
import Vue3Lottie from "vue3-lottie";
//-- Project --//

//-- Vuetify --//
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
//-- Vuetify --//

import "sweetalert2/dist/sweetalert2.min.css";
import Layout from "./components/Layout.vue";

const vuetify = createVuetify({
    icons: {
      defaultSet: "mdi",
    },
    components,
    directives,
  });

const pinia = createPinia()
const app = createApp(App);

app.component("Layout", Layout);

app.use(router);
app.use(vuetify);
app.use(Vue3Lottie);
app.use(pinia);
app.mount('#app')
