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



</style>