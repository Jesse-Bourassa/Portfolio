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
            title="ToDo App"
            description="A simple and intuitive task management app."
            :technologies="['React', 'Node.js', 'Express']"
            liveLink="https://todo-app.com"
            repoLink="https://github.com/username/todo-app"
          />
          <ProjectCard
            title="ToDo App"
            description="A simple and intuitive task management app."
            :technologies="['React', 'Node.js', 'Express']"
            liveLink="https://todo-app.com"
            repoLink="https://github.com/username/todo-app"
          />
          <ProjectCard
            title="ToDo App"
            description="A simple and intuitive task management app."
            :technologies="['React', 'Node.js', 'Express']"
            liveLink="https://todo-app.com"
            repoLink="https://github.com/username/todo-app"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileCard from "/src/components/ProfileCard.vue";
import AboutCard from "/src/components/AboutCard.vue";
import ProjectCard from "/src/components/ProjectCard.vue";

export default {
  name: "HomePage",
  components: {
    ProfileCard,
    AboutCard,
    ProjectCard,
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

/* Fade animations */
.animate-fadein {
  animation: fadein 1s forwards;
}

.animate-fadeout {
  animation: fadeout 1s forwards;
}

@keyframes fadein {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeout {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px);
  }
}
</style>
