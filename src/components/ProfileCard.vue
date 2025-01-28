<template>
  <div class="profile-section">
    <img src="/src/assets/Jesse-Day2.jpg" alt="Profile Picture" class="profile-picture" />
    <h1>Jesse Bourassa</h1>
    <p class="tagline">Full-Stack Developer | Creative Thinker</p>
    <SocialLinks />
  </div>
</template>

<script>
import SocialLinks from "./SocialLinks.vue";

export default {
  name: "ProfileCard",
  components: {
    SocialLinks,
  },
};
</script>

<style scoped>
.profile-section {
  max-width: 1500px;
  margin: auto;
  padding: 5rem;
  background: rgba(31, 31, 31, 0.9);
  border-radius: 15px;
  box-shadow: 0 0px 30px rgba(0, 0, 0, 1.5);
  overflow: hidden;
}

.profile-picture {
  width: 400px;
  height: 400px;
  border-radius: 50%;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.6);
}

.profile-section h1 {
  font-size: 3rem;
  margin-top: 1.5rem;
}

.profile-section .tagline {
  font-size: 1.5rem;
  margin-top: 1rem;
  color: #cccccc;
}

.profile-picture:hover {
  transform: scale(1.15);
}

</style>
