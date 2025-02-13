<template>
  <div class="error-404-container">
    <div class="error-card">
      <h1>Error 404: Experience Not Found</h1>

      <!-- Display Experience Text -->
      <div v-if="!isEditing">
        <p>{{ experienceText }}</p>
      </div>

      <!-- Edit Experience Form -->
      <div v-else>
        <textarea v-model="newExperienceText"></textarea>
        <div class="form-buttons">
          <button @click="saveExperience">Save</button>
          <button @click="cancelEdit">Cancel</button>
        </div>
      </div>

      <!-- Edit Button (Only for Admins) -->
      <button v-if="isAdmin && !isEditing" @click="startEditing" class="edit-button">
        <i class="pi pi-pencil"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { inject } from "vue";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default {
  name: "Experience404",
  // Instead of hardcoding, inject the isAdmin value:
  inject: ["isAdmin"],
  data() {
    return {
      isEditing: false,
      experienceText:
        "I'm currently a student honing my skills and actively looking for an internship or entry-level opportunity to kickstart my career.",
      newExperienceText: "",
    };
  },
  mounted() {
    this.fetchExperience();
  },
  methods: {
    async fetchExperience() {
      try {
        const docRef = doc(db, "experience", "main");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          this.experienceText = docSnap.data().text;
        }
      } catch (error) {
        console.error("Error fetching experience:", error);
      }
    },
    startEditing() {
      this.newExperienceText = this.experienceText;
      this.isEditing = true;
    },
    async saveExperience() {
      try {
        const docRef = doc(db, "experience", "main");
        await setDoc(docRef, { text: this.newExperienceText }, { merge: true });
        this.experienceText = this.newExperienceText;
        this.isEditing = false;
      } catch (error) {
        console.error("Error saving experience:", error);
      }
    },
    cancelEdit() {
      this.isEditing = false;
    },
  },
};
</script>

<style scoped>
/* (Your existing CSS remains unchanged) */
.error-404-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  min-height: 300px;
}

.error-card {
  position: relative;
  background-color: rgba(255, 77, 77, 0.66);
  color: #ffffff;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.error-card h1 {
  font-size: 2rem;
  margin-bottom: 12px;
}

.error-card p {
  font-size: 1rem;
  margin: 8px 0;
}

.edit-button {
  position: absolute;
  top: -15px; /* Centers vertically */
  left: -20px; /* Moves it outside to the left */
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

.form-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 10px;
}

.form-buttons button {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.form-buttons button:hover {
  background-color: #36a573;
}

textarea {
  width: 100%;
  height: 80px;
  border-radius: 8px;
  padding: 10px;
  border: none;
  background-color: #2a2a2a;
  color: white;
  font-size: 1rem;
  resize: none;
}
</style>