// ==================== ARRANQUE DEL FRONT ADMINISTRATIVO ====================
// Crea la app Vue 3 con Vuetify (iconos MDI, idioma español), Pinia, router y Lottie,
// y registra globalmente los componentes Layout y Paginator.
//-- Project --//
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import Vue3Lottie from "vue3-lottie";

//-- Vuetify --//
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
//-- Vuetify --//
import "./style.css";
//-- Project --//

import "sweetalert2/dist/sweetalert2.min.css";

import Layout from "./Layouts/LayoutOne.vue";
//@ts-ignore
import Paginator from "./components/Paginator.vue";
import { VDateInput } from "vuetify/labs/VDateInput";
import { es } from "vuetify/locale";

// -------------------- Configuración de Vuetify: iconos, componentes (incluye VDateInput) y locale es --------------------
const vuetify = createVuetify({
  icons: {
    defaultSet: "mdi",
  },
  components: {
    VDateInput,
    ...components,
  },
  locale: {
    locale: "es",
    fallback: "es",
    messages: { es },
  },
  // components,
  directives,
});

const pinia = createPinia();
const app = createApp(App);

// -------------------- Componentes globales disponibles en cualquier vista --------------------
app.component("Layout", Layout);
app.component("Paginator", Paginator);
app.component("Vue3Lottie", Vue3Lottie);

app.use(router);
app.use(vuetify);
app.use(Vue3Lottie);
app.use(pinia);
app.mount("#app");
