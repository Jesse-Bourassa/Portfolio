import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
 import Particles from 'vue3-particles'
 import i18n from './i18n'; // Importing the updated i18n.ts
 import scrollAnimation from './scrollAnimation';


 
const app = createApp(App);
app.use(router);
app.use(PrimeVue, {
    theme: {
      preset: Aura,
    },
  });
  app.use(Particles)
  app.use(i18n);
  app.directive('scroll-animation', scrollAnimation)
  app.mount('#app');
