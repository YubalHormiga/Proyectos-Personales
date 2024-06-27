//main.js

import "./assets/main.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { VueFire, VueFireAuth } from "vuefire";
import { firebaseApp } from "./config/firebase";
import { plugin, defaultConfig } from "@formkit/vue";
import "@formkit/themes/genesis";

import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
const $toast = useToast({
  duration: 1000,
  position: "top",
});

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.provide("toast", $toast);
app.use(createPinia());
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
});

app.use(plugin, defaultConfig);
app.use(router);

app.mount("#app");
