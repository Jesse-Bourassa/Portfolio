<template>
  <div>
    <CustomParticles />
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import CustomParticles from './components/Particles.vue'

export default {
  components: {
    CustomParticles,
    NavBar,
  },
  data() {
    return {
      welcomeMessage: 'This is your first Vue page!'
    };
  }
};
</script>

<style scoped>

/* Hide scrollbar for all browsers */
body {
  overflow-y: scroll; /* Keeps content scrollable */
}

body::-webkit-scrollbar {
  width: 0; /* Removes scrollbar width */
  height: 0; /* Removes horizontal scrollbar (if needed) */
}

body {
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
}


</style>