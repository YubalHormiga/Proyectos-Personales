import './assets/main.css'
import 'primevue/resources/themes/lara-light-teal/theme.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { plugin, defaultConfig } from '@formkit/vue'
import{ useToast } from 'vue-toast-notification'
import config from '../formkit.config'
import PrimeVue from 'primevue/config';

import App from './App.vue'
import router from './router'

import 'vue-toast-notification/dist/theme-sugar.css'

const $toast =useToast({
    duration: 3000,
    position:'top-right'
})

const app = createApp(App)
app.provide('toast', $toast)
app.use(createPinia())
app.use(plugin, defaultConfig(config))
app.use(PrimeVue);
app.use(router)


app.mount('#app')
