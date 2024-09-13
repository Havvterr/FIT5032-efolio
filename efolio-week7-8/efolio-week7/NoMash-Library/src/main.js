import 'bootstrap/dist/css/bootstrap.min.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import { initializeApp } from 'firebase/app';

const app = createApp(App);
app.use(PrimeVue, { theme: { preset: Aura } });
app.use(router);

const firebaseConfig = {
  apiKey: 'AIzaSyCb0h0TVx67K2j_urrMUm5x8-Eq3Zqqcco',
  authDomain: 'week7-zehui-zhang.firebaseapp.com',
  projectId: 'week7-zehui-zhang',
  storageBucket: 'week7-zehui-zhang.appspot.com',
  messagingSenderId: '1009190896499',
  appId: '1:1009190896499:web:eb1f83ae920bbc0ec4bb06'
};

initializeApp(firebaseConfig);

app.mount('#app');