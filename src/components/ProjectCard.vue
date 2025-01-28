<template>
  <div class="project-card">
    <h3 class="project-title">{{ title }}</h3>
    <p class="project-description">{{ description }}</p>
    <div class="tech-stack">
      <span v-for="tech in technologies" :key="tech" class="tech-badge">
        {{ tech }}
      </span>
    </div>
    <div class="project-links">
      <a :href="liveLink" target="_blank" class="icon-link" v-if="liveLink">
        <i class="pi pi-play"></i>
        <p>Live Demo</p>
      </a>
      <a :href="repoLink" target="_blank" class="icon-link" v-if="repoLink">
        <i class="pi pi-github"></i>
        <p>GitHub</p>
      </a>
    </div>
  </div>
</template>
  
  <script>
  export default {
    name: "ProjectCard",
    props: {
      title: { type: String, required: true },
      description: { type: String, required: true },
      technologies: { type: Array, required: true },
      liveLink: { type: String, required: false },
      repoLink: { type: String, required: false },
    },
  };
  </script>
  
  <style scoped>
  .project-card {
  background-color: #1f1f1f;
  padding: 2rem; /* Increased padding for more content space */
  border-radius: 15px; /* Slightly larger rounding for better appearance */
  max-width: 900px; /* Increased width */
  height: auto; /* Adjust height dynamically based on content */
  text-align: center;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3); /* Enhanced shadow for depth */
}

.project-card h3 {
  margin-bottom: 1rem;
  font-size: 2rem; /* Increased title font size */
}

.project-card p {
  margin-bottom: 1.5rem;
  color: #b0b0b0;
  font-size: 1.5rem; /* Slightly larger text */
}

.project-card .technologies {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem; /* Added more spacing below technologies */
}

.project-card .button-group {
  display: flex;
  justify-content: space-between;
  gap: 1rem; /* Increased spacing between buttons */
}

.project-card button {
  font-size: 1rem; /* Larger button text */
  padding: 0.7rem 1.5rem; /* Bigger buttons */
  border-radius: 10px; /* Smooth rounded corners */
}
  
  .project-card:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.5);
  }
  
  .project-title {
  font-size: 2.5rem; /* Increased font size for larger text */
  margin-bottom: 1rem;
  color: #42b883; /* Green color for the title */
  font-weight: bold; /* Make the text bold for emphasis */
  text-align: center; /* Center-align the title */
}

  
  .project-description {
    margin-bottom: 1rem;
    color: #b0b0b0;
  }
  
  .tech-stack {
    margin-bottom: 1rem;
  }
  
  .tech-badge {
  display: inline-block;
  margin: 0.4rem; /* Slightly increased margin for spacing */
  padding: 0.5rem 0.8rem; /* Increased padding for larger badges */
  background-color: #2a2a2a;
  border-radius: 8px; /* Larger rounding for smoother appearance */
  color: #42b883;
  font-size: 1.1rem; /* Increased font size */
  font-weight: bold; /* Make the text more prominent */
}

  
  .view-button {
    display: inline-block;
    margin: 0.3rem;
    padding: 0.5rem 1rem;
    background-color: #42b883;
    color: white;
    border-radius: 6px;
    text-decoration: none;
    font-size: 1rem;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }
  
  .view-button:hover {
    background-color: #36a573;
    transform: translateY(-3px);
  }
  .project-links {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;
}

.icon-link {
  text-align: center;
  color: #ffffff;
  text-decoration: none;
  transition: transform 0.3s ease, color 0.3s ease;
}

.icon-link i {
  font-size: 2.5rem; /* Icon size */
  color: #42b883; /* Icon color */
}

.icon-link:hover i {
  color: #36a573;
  transform: scale(1.2); /* Slight zoom on hover */
}

.icon-link p {
  margin-top: 0.5rem;
  font-size: 1rem;
  color: #cccccc;
}
  </style>
  