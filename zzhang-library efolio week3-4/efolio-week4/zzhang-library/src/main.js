import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
/*import './style.css'*/
import 'bootstrap/dist/css/bootstrap.min.css'
import PrimeVue from 'primevue/config'
import Aura from '@PrimeVue/themes/aura'

const app = createApp(App)
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})

app.mount('#app')
