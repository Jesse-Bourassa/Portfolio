<template>
  <div class="project-card">
    <!-- Admin Buttons -->
    <button v-if="isAdmin" @click="editProject" class="edit-button">
      <i class="pi pi-pencil"></i>
    </button>
    <button v-if="isAdmin" @click="showDeleteModal = true" class="delete-button">
        <i class="pi pi-trash"></i>
      </button>

    <!-- Project Details -->
    <h3 class="project-title">{{ title }}</h3>
    <p class="project-description">{{ description }}</p>

    <!-- Tech Stack -->
    <div v-if="technologies.length" class="tech-stack">
      <span v-for="tech in technologies" :key="tech" class="tech-badge">
        {{ tech }}
      </span>
    </div>

    <!-- Project Links -->
    <div class="project-links">
      <a :href="liveLink" target="_blank" rel="noopener noreferrer" class="icon-link" v-if="liveLink">
        <i class="pi pi-play"></i>
        <p>{{ $t("liveDemo") }}</p>
      </a>
      <a :href="repoLink" target="_blank" rel="noopener noreferrer" class="icon-link" v-if="repoLink">
        <i class="pi pi-github"></i>
        <p>{{ $t("github") }}</p>
      </a>
    </div>
    <teleport to="body">
      <div v-if="showDeleteModal" class="modal-overlay">
        <div class="modal">
          <h2>{{ t("confirmDeleteTitle") }}</h2>
          <p>{{ t("confirmDeleteMessage") }}</p>
          <div class="modal-buttons">
            <button @click="showDeleteModal = false">{{ t("cancel") }}</button>
            <button @click="confirmDelete" class="confirm-delete">
              {{ t("delete") }}
            </button>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
import { inject, ref } from "vue";
import { useI18n } from "vue-i18n";

export default {
  name: "ProjectCard",
  props: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    technologies: { type: Array, default: () => [] }, // ✅ Ensures it's always an array
    liveLink: { type: String, required: false },
    repoLink: { type: String, required: false }
  },
  setup(props, { emit }) {
    const { t } = useI18n();
    const isAdmin = inject("isAdmin", false);
    const showDeleteModal = ref(false);


    const editProject = () => {
      emit("edit-project");
    };

    const confirmDelete = () => {
      emit("delete-project");
      showDeleteModal.value = false;
    };


    return {
      isAdmin,
      showDeleteModal,
      editProject,
      confirmDelete,
      t
    };
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
  gap: 0rem;
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
  top: -15px;
  left: 35px;
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
.modal-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: #2e2e2e;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  width: 300px;
  box-shadow: 0 4px 10px rgba(255, 255, 255, 0.2);
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.confirm-delete {
  background: #e74c3c;
}
</style>
