import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import AnimateOnScroll from 'primevue/animateonscroll';
import Particles from 'vue3-particles';


const app = createApp(App);
app.use(router);
app.use(PrimeVue, {
    theme: {
      preset: Aura,
    },
  });
app.use(Particles);
  app.directive('animateonscroll', AnimateOnScroll);
app.mount('#app');
