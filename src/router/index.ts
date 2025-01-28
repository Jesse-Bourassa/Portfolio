import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import Blog from '../pages/Blog.vue';

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/Blog', name: 'Blog', component: Blog }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;