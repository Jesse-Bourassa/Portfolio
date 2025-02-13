<template>
  <div class="project-card">
    <button v-if="isAdmin" @click="editProject" class="edit-button">
      <i class="pi pi-pencil"></i>
    </button>
    <button v-if="isAdmin" @click="deleteProject" class="delete-button">
      <i class="pi pi-trash"></i>
    </button>

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
import { inject } from "vue";
export default {
  name: "ProjectCard",
  // Instead of receiving isAdmin as a prop, inject it:
  inject: ["isAdmin"],
  props: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    technologies: { type: Array, required: true },
    liveLink: { type: String, required: false },
    repoLink: { type: String, required: false }
  },
  methods: {
    editProject() {
      this.$emit("edit-project");
    },
    deleteProject() {
      this.$emit("delete-project");
    }
  }
};
</script>

<style scoped>

.project-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #1f1f1f;
  padding: 1rem;
  border-radius: 15px;
  width: 100%;
  min-height: 100%;
  text-align: center;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  gap: 0rem; /* Ensures spacing */
  max-width: 1200px;
}

.project-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #42b883;
  font-weight: bold;
  text-align: center;
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
  margin: 0.4rem;
  padding: 0.5rem 0.8rem;
  background-color: #2a2a2a;
  border-radius: 8px;
  color: #42b883;
  font-size: 1.1rem;
  font-weight: bold;
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
  font-size: 2.5rem;
  color: #42b883;
}

.icon-link:hover i {
  color: #36a573;
  transform: scale(1.2);
}

.icon-link p {
  margin-top: 0.5rem;
  font-size: 1rem;
  color: #cccccc;
}

.edit-button {
  position: absolute;
  top: -15px;
  left: -15px;
  background: #42b883;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
}

.edit-button:hover {
  background: #36a573;
  transform: scale(1.1);
}

.delete-button {
  position: absolute;
  top: -15px; /* Moves delete button below edit button */
  left: 35px; /* Align with the edit button */
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.delete-button i {
  color: white;
  font-size: 1.2rem;
}

.delete-button:hover {
  background: #c0392b;
  transform: scale(1.1);
}
</style>