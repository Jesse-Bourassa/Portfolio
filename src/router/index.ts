import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import About from '../pages/About.vue';

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/about', name: 'About', component: About }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;