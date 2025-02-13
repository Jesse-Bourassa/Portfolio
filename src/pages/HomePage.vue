<template>
  <div class="home-container">
    <!-- Profile Card with fade-out effect -->
    <div
      v-animateonscroll="{ enterClass: 'animate-fadein'}"
      class="card-wrapper"
    >
      <ProfileCard />
    </div>

    <!-- Spacer -->
    <div class="spacer"></div>

    <!-- About Card with fade-in effect -->
    <div
      v-animateonscroll="{ enterClass: 'animate-fadein'}"
      class="card-wrapper"
    >
      <AboutCard />
    </div>

    <!-- Spacer -->
    <div class="spacer"></div>

    <!-- Projects Section -->
    <div 
    v-animateonscroll="{ enterClass: 'animate-fadein'}"
    class="card-wrapper" >
      <div class="projects-section">
        <h2>{{ $t("projects") }}</h2>
        <!-- "Add Project" Button -->
        <button
  v-if="isAdmin" 
  class="add-project-button" 
  @click="openAddProjectForm"
>
{{ $t("addProject") }}
</button>

        <!-- Add / Edit Project Form -->
        <div v-if="showAddForm" class="project-form">
          <h3>{{ editing ? $t("editProject") : $t("addNewProject") }}</h3>
          <form @submit.prevent="submitProject">
            <input v-model="form.title" :placeholder="$t('projectTitle')" required />
            <textarea v-model="form.description" :placeholder="$t('description')" required></textarea>

            <input v-model="form.technologies" :placeholder="$t('technologies')" />

            <input v-model="form.repoLink" :placeholder="$t('githubLink')" />
            <input v-model="form.liveLink" :placeholder="$t('demoLink')" />
            <div class="form-buttons">
              <button type="submit">{{ editing ? $t("updateProject") : $t("addProject") }}</button>
              <button type="button" @click="cancelAddProject">{{ $t("cancel") }}</button>
            </div>
          </form>
        </div>

        <!-- Projects List -->
        <div class="project-cards">
          <div
            class="project-item"
            v-for="project in projects"
            :key="project.id"
          >
         
            

            <ProjectCard
              :title="project.title"
              :description="project.description"
              :technologies="project.technologies"
              :repoLink="project.repoLink"
              :liveLink="project.liveLink"
              :isAdmin="isAdmin"
              @edit-project="editProject(project)"
              @delete-project="deleteProject(project.id)"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Spacer -->
    <div class="spacer"></div>

    <!-- Experience Section -->
    <div
      v-animateonscroll="{ enterClass: 'animate-fadeleft', leaveClass: 'animate-fadeoutleft' }"
      class="card-wrapper"
    >
      <div class="experience-section">
        <h2>{{ $t("experienceTitle") }}</h2>
        <Experience404 />
      </div>
    </div>
  </div>
</template>

<script>
import ProfileCard from "/src/components/ProfileCard.vue";
import AboutCard from "/src/components/AboutCard.vue";
import ProjectCard from "/src/components/ProjectCard.vue";
import Experience404 from "/src/components/Experience.vue";
import Spacer from "../components/Spacer.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default {
  name: "HomePage",
  components: {
    Spacer,
    ProfileCard,
    AboutCard,
    ProjectCard,
    Experience404,
  },
  data() {
    return {
      isAdmin: false,
      showAddForm: false,
      editing: false,
      projects: [],
      form: {
        id: "",
        title: "",
        description: "",
        technologies: "",
        repoLink: "",
        liveLink: "",
      },
    };
  },
  mounted() {
    this.fetchProjects();
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // Optionally, add more logic to check if the user is an admin.
      this.isAdmin = true; // The user is logged in, so show the button.
    } else {
      this.isAdmin = false; // No user is logged in, hide the button.
    }
  });
  },
  methods: {
    async fetchProjects() {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        this.projects = querySnapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
      } catch (error) {
        console.error("Error fetching projects from DB:", error);
      }
    },
    openAddProjectForm() {
      this.showAddForm = true;
      if (!this.editing) {
        this.clearForm();
      }
    },
    async submitProject() {
      const projectData = {
        title: this.form.title,
        description: this.form.description,
        technologies: this.form.technologies
          .split(",")
          .map((tech) => tech.trim())
          .filter((tech) => tech.length),
        repoLink: this.form.repoLink,
        liveLink: this.form.liveLink,
      };

      try {
        if (this.editing && this.form.id) {
          const projectRef = doc(db, "projects", this.form.id);
          await updateDoc(projectRef, projectData);
          const index = this.projects.findIndex(
            (project) => project.id === this.form.id
          );
          if (index !== -1) {
            this.projects.splice(index, 1, { id: this.form.id, ...projectData });
          }
        } else {
          const docRef = await addDoc(collection(db, "projects"), projectData);
          projectData.id = docRef.id;
          this.projects.push(projectData);
        }
        this.clearForm();
        this.showAddForm = false;
        this.editing = false;
      } catch (error) {
        console.error("Error saving project to DB:", error);
      }
    },
    
    editProject(project) {
      this.form.id = project.id;
      this.form.title = project.title;
      this.form.description = project.description;
      this.form.technologies = project.technologies.join(", ");
      this.form.repoLink = project.repoLink;
      this.form.liveLink = project.liveLink;
      this.editing = true;
      this.showAddForm = true;
    },
    async deleteProject(id) {
      try {
        await deleteDoc(doc(db, "projects", id));
        this.projects = this.projects.filter((project) => project.id !== id);
      } catch (error) {
        console.error("Error deleting project from DB:", error);
      }
    },
    cancelAddProject() {
      this.clearForm();
      this.showAddForm = false;
      this.editing = false;
    },
    clearForm() {
      this.form = {
        id: "",
        title: "",
        description: "",
        technologies: "",
        repoLink: "",
        liveLink: "",
      };
    },
  },
};
</script>

<style scoped>
.home-container {
  position: relative;
  padding: 2rem;
}

.card-wrapper {
  margin: 2rem;
  transition: all 0.8s ease-in-out;
}

.spacer {
  height: 20vh;
}

.projects-section {
  text-align: center;

  padding: 10px;
}

.projects-section h2 {
  font-size: 3rem; 
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 5rem;
}

.add-project-button {
  padding: 1rem 2rem; 
  font-size: 1.2rem;
  margin-bottom: 5rem;
  font-weight: bold;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}
.add-project-button:hover {
  background-color: #36a573;
}

.project-form {
  background-color: #1f1f1f;
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 1rem;
}
.project-form form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.project-form input,
.project-form textarea {
  padding: 0.8rem;
  border-radius: 5px;
  border: none;
}
.form-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}
.project-form button {
  width: 150px;
  padding: 0.8rem;
  border: none;
  background-color: #42b883;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.project-form button:hover {
  background-color: #36a573;
}

.project-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 4rem;
  justify-content: center;
  align-items: stretch;
}
.project-item {
  position: relative;
}

/* Inline admin button styles (if you keep them) */
.edit-button {
  position: absolute;
  top: -15px;
  left: -15px;
  background-color: #42b883;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  z-index: 10;
}

.edit-button i {
  color: white;
  font-size: 1.2rem;
}

.edit-button:hover {
  background-color: #36a573;
  transform: scale(1.1);
}

.delete-button {
  position: absolute;
  top: -15px;
  right: -15px;
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