import { createRouter, createWebHistory } from 'vue-router';
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from "../firebase" // Import the auth object

import HomePage from '../pages/HomePage.vue';
import Blog from '../pages/Blog.vue';
import Dashboard from '../pages/Dashboard.vue';

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/Blog', name: 'Blog', component: Blog },
  { path: '/Dashboard', component: Dashboard, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  onAuthStateChanged(auth, (user) => {
    if (to.meta.requiresAuth && !user) {
      next('/');  // Redirect if not logged in
    } else {
      next();     // Proceed if logged in
    }
  });
});

export default router;
