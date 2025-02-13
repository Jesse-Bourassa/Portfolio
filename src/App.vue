<template>
  <div>
    <CustomParticles />
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import { ref, provide } from 'vue';
import NavBar from './components/NavBar.vue';
import CustomParticles from './components/Particles.vue';

export default {
  name: 'App',
  components: {
    CustomParticles,
    NavBar,
  },
  setup() {
    // Create the shared isAdmin state and initialize it from localStorage
    const isAdmin = ref(localStorage.getItem('isAdmin') === 'true');

    // Provide isAdmin so that any descendant can inject it
    provide('isAdmin', isAdmin);

    return { isAdmin };
  },
};
</script>

<style scoped>
/* (Your existing CSS remains unchanged) */
body {
  overflow-y: scroll;
}

body::-webkit-scrollbar {
  width: 0;
  height: 0;
}

body {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>