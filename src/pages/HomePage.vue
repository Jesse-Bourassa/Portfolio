<template>
  <div class="home-container">
    <!-- Profile Card with fade-out effect -->
    <div
      v-animateonscroll="{ enterClass: 'animate-fadein', leaveClass: 'animate-fadeout' }"
      class="card-wrapper"
    >
      <ProfileCard />
    </div>

    <!-- Spacer to allow scrolling -->
    <div class="spacer"></div>

    <!-- About Card with fade-in effect -->
    <div
      v-animateonscroll="{ enterClass: 'animate-fadein', leaveClass: 'animate-fadeout' }"
      class="card-wrapper"
    >
      <AboutCard />
    </div>

    <!-- Spacer to allow scrolling -->
    <div class="spacer"></div>

    <!-- Projects Section -->
    <div
      v-animateonscroll="{ enterClass: 'animate-fadein', leaveClass: 'animate-fadeout' }"
      class="card-wrapper"
    >
      <div class="projects-section">
        <h2>Projects</h2>
        <div class="project-cards">
          <ProjectCard
            title="High-End Detailling"
            description="A comprehensive platform for showcasing and managing high-end auto detailing services, including appointment scheduling, service catalog, and customer reviews."
            :technologies="['SpringBoot', 'MYSQL', 'TypeScript','React','JWT Authentication']"
            liveLink="https://highend-1.onrender.com"
            repoLink="https://github.com/ZacharyLelievre/HighEnd"
          />
          <ProjectCard
            title="Omegal Remake"
            description="A remake of Omegle built to connect users through real-time text and video chat using WebRTC and WebSockets. This project helped me learn how to host applications and implement WebSocket communication for seamless, scalable interactions."
            :technologies="['HTML', 'CSS', 'JavaScript', 'WebRTC', 'WebSockets', 'Node.js', 'Express']"
            repoLink="https://github.com/Jesse-Bourassa/OmegalRemake"
          />
          <ProjectCard
            title="Pet Clinic"
            description="Developed and tested RESTful APIs for the Customer Service module in Pet Clinic using Spring Boot and MySQL. Implemented account management features, integrated Spring Data JPA, and ensured reliability through JUnit and Mockito testing."
            :technologies="['Spring Boot', 'MySQL', 'Spring Data JPA', 'JUnit', 'Mockito', 'Postman']"
            repoLink="https://github.com/cgerard321/champlain_petclinic"
          />
        </div>
      </div>
      </div>
    <!-- Experience Section -->
    <div class="spacer"></div>

    <div
        v-animateonscroll="{ enterClass: 'animate-fadeleft', leaveClass: 'animate-fadeoutleft' }"
        class="card-wrapper"
    >
      <div class="experience-section">
        <h2>Experience</h2>
        <Experience404 />
      </div>
    </div>
  </div>
</template>

<script>
import ProfileCard from "/src/components/ProfileCard.vue";
import AboutCard from "/src/components/AboutCard.vue";
import ProjectCard from "/src/components/ProjectCard.vue";
import Experience404 from "/src/components/Experience.vue"
import Spacer from "../components/Spacer.vue";

export default {
  name: "HomePage",
  components: {
    Spacer,
    ProfileCard,
    AboutCard,
    ProjectCard,
    Experience404,
  },
};
</script>

<style scoped>
/* Home container with padding */
.home-container {
  position: relative;
  padding: 2rem;
}

/* Card wrapper styling */
.card-wrapper {
  margin: 2rem;
  transition: all 0.8s ease-in-out;
}

/* Spacer to ensure scrollable content */
.spacer {
  height: 20vh; /* Adjust height to ensure enough scrolling space */
}

/* Projects Section */
.projects-section {
  text-align: center;
}

.project-cards {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
}
.project-card {
  flex: 1 1 500px;
  max-width: 600px;
  min-width: 300px;
  box-sizing: border-box;
}
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
