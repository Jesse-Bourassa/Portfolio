<template>
  <div>
    <!-- Navigation Bar -->
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
export default {
  components: {
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

div {
  margin-top: 80px;
}

</style>