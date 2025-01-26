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
        <a :href="liveLink" target="_blank" class="view-button" v-if="liveLink">Live Demo</a>
        <a :href="repoLink" target="_blank" class="view-button" v-if="repoLink">GitHub</a>
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
    font-size: 1.5rem;
    margin-bottom: 1rem;
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
    margin: 0.3rem;
    padding: 0.3rem 0.6rem;
    background-color: #2a2a2a;
    border-radius: 5px;
    color: #42b883;
    font-size: 0.9rem;
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
  </style>
  