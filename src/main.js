import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'primeicons/primeicons.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'swiper/css';

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

const app = createApp(App)
app.use(PrimeVue, { theme: {
    preset: Aura,
    options: {
        darkModeSelector: 'none',
    }
} })
app.use(router)

app.mount('#app')
