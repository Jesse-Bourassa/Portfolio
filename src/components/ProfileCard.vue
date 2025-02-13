<template>
<div class="profile-section" :class="{ 'edit-mode': editMode }">    <!-- Edit Button (Only for Admins) -->
    

    <p v-if="editMode" class="editing-label">{{ $t('editingMode') }}</p>


    <!-- Profile Picture -->
    <label v-if="editMode" for="profile-upload" class="profile-edit">
      <input type="file" id="profile-upload" @change="uploadImage" accept="image/*" hidden />
      <img :src="profileImage" alt="Profile Picture" class="profile-picture" />
    </label>
    <img v-else :src="profileImage" alt="Profile Picture" class="profile-picture" />

    <!-- Name and Tagline -->
    <h1 v-if="!editMode">{{ profileName }}</h1>
    <input v-else v-model="profileName" class="edit-input name-input" />

    <p v-if="!editMode" class="tagline">{{ $t('profileTagline') }}</p>
    <input v-else v-model="profileTagline" class="edit-input tagline-input" />

    <SocialLinks />

    <!-- CV Buttons -->
    <div class="cv-buttons">
      <a href="/src/assets/Jesse_Bourassa_Resume(English).pdf" download class="cv-button">
        <i class="pi pi-download"></i> {{ $t('downloadEnglishCV') }}
      </a>
      <a href="/src/assets/Jesse_Bourassa_Resume(French).pdf" download class="cv-button">
        <i class="pi pi-download"></i> {{ $t('downloadFrenchCV') }}
      </a>
    </div>

    <!-- Save Button -->
    <button v-if="editMode" @click="saveChanges" class="save-button">{{ $t('save') }}</button>
  </div>
</template>

<script>
import { inject, ref, watchEffect, onMounted } from "vue";
import SocialLinks from "./SocialLinks.vue";
// Import the Firestore instance and functions from Firebase
import { db } from "../firebase"; // Ensure the path is correct for your project
import { doc, getDoc, setDoc } from "firebase/firestore";

export default {
  name: "ProfileCard",
  components: { SocialLinks },
  setup() {
    

    
    // Inject the reactive admin state
    const isAdmin = inject("isAdmin", ref(false));

    // Default profile values
    const profileName = ref("Jesse Bourassa");
    const profileTagline = ref("Full-Stack Developer | Creative Thinker");
    const profileImage = ref("/src/assets/Jesse-Day2.jpg");
    const editMode = ref(false);

    // Define a fixed document ID for your profile data
    const profileDocId = "profile";

    // Save profile data to Firestore
    const saveChanges = async () => {
      try {
        await setDoc(doc(db, "profiles", profileDocId), {
          name: profileName.value,
          tagline: profileTagline.value,
          image: profileImage.value,
        });
        editMode.value = false;
      } catch (error) {
        console.error("Error saving profile data:", error);
      }
    };

    // Load profile data from Firestore
    const loadProfile = async () => {
      try {
        const docRef = doc(db, "profiles", profileDocId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          profileName.value = data.name || "Jesse Bourassa";
          profileTagline.value = data.tagline || "Full-Stack Developer | Creative Thinker";
          profileImage.value = data.image || "/src/assets/Jesse-Day2.jpg";
        } else {
          console.log("No profile data found. Using default values.");
        }
      } catch (error) {
        console.error("Error loading profile data:", error);
      }
    };

    // When uploading an image, update the profile image and save changes
    const uploadImage = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = async () => {
          profileImage.value = reader.result;
          await saveChanges();
        };
        reader.readAsDataURL(file);
      }
    };

    // Watch for changes in isAdmin (for debugging purposes)
    watchEffect(() => {
      console.log("Admin status changed:", isAdmin.value);
    });

    // Load profile data when the component mounts
    onMounted(() => {
      loadProfile();
    });

    return {
      isAdmin,
      profileName,
      profileTagline,
      profileImage,
      editMode,
      saveChanges,
      uploadImage,
    };
  },
  methods: {
  changeLanguage(lang) {
    this.$i18n.locale = lang;
    localStorage.setItem("lang", lang);
  }
}
};

</script>

<style scoped>
.profile-section {
  position: relative; /* Ensures the edit button is positioned inside */
  max-width: 600px;
  margin: auto;
  padding: 2rem;
  background: rgba(31, 31, 31, 0.9);
  border-radius: 15px;
  box-shadow: 0 0px 30px rgba(0, 0, 0, 1.5);
  overflow: visible;
  text-align: center;
}

/* Adjust profile picture */
.profile-picture {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.6);
  transition: all 0.3s ease-in-out;
}

/* When editing, add a glow */
.profile-edit img {
  box-shadow: 0 0 12px #42b883;
  cursor: pointer;
}

/* Name and tagline */
.profile-section h1 {
  font-size: 2.5rem; /* Reduce font size */
  margin-top: 20px;
}

.profile-section .tagline {
  font-size: 1.2rem;
  margin-top: 10px;
  color: #cccccc;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .profile-section {
    padding: 2rem;
    max-width: 90%;
  }

  .profile-picture {
    width: 180px;
    height: 180px;
  }

  .profile-section h1 {
    font-size: 2rem;
    margin-top: 15px; /* Adds space between elements */

  }

  .profile-section .tagline {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .profile-section {
    padding: 1.5rem;
  }

  .profile-picture {
    width: 150px;
    height: 150px;
  }

  .profile-section h1 {
    font-size: 1.8rem;
    margin-top: 15px; /* Adds space between elements */

  }

  .profile-section .tagline {
    font-size: 0.9rem;
  }
}
.profile-picture:hover {
  transform: scale(1.15);
}

.cv-buttons {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.cv-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  background-color: #42b883;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.cv-button i {
  font-size: 1.5rem;
}

.cv-button:hover {
  background-color: #36a573;
  transform: scale(1.05);
  box-shadow: 0 6px 15px rgba(66, 184, 131, 0.7);
}
.edit-button {
  position: absolute;
  top: -15px; /* Move it slightly outside the card */
  left: -15px; /* Move it slightly outside the card */
  background: #42b883;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 50%; /* Makes it circular */
  width: 40px; /* Fixed width */
  height: 40px; /* Fixed height */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
  border: 3px solid rgba(255, 255, 255, 0.2); /* Optional: Add a slight border for contrast */
}

.edit-button:hover {
  background: #36a573;
  transform: scale(1.1);
}

/* Name Input */
/* Name Input */
.name-input {
  font-size: 2rem;
  font-weight: bold;
  background: rgba(255, 255, 255, 0.1); /* Light background */
  border: 2px solid #42b883; /* Green border */
  border-radius: 8px;
  color: white;
  text-align: center;
  width: 100%;
  padding: 8px;
  margin-top: 20px;
  margin-bottom: 20px;
  outline: none;
  transition: all 0.3s ease-in-out;
}

.name-input:focus {
  background: rgba(66, 184, 131, 0.2); /* Darker green highlight */
  border: 2px solid #36a573;
}

/* Tagline Input */
.tagline-input {
  font-size: 1.2rem;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid #42b883;
  border-radius: 8px;
  color: white;
  text-align: center;
  width: 100%;
  padding: 8px;
  outline: none;
  transition: all 0.3s ease-in-out;
}

.tagline-input:focus {
  background: rgba(66, 184, 131, 0.2);
  border: 2px solid #36a573;
}

/* Remove input focus border */
.edit-input:focus {
  outline: none;
  border-bottom: 2px solid #42b883;
}

/* Save Button */
/* Save Button */
.save-button {
  background: #007aff; /* Bright blue to stand out */
  color: white;
  border: none;
  padding: 12px 20px; /* Slightly bigger */
  border-radius: 25px; /* More rounded */
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  display: block;
  margin: 20px auto 0; /* Center the button */
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 4px 10px rgba(0, 122, 255, 0.3);
}

/* Hover effect */
.save-button:hover {
  background: #005ecb; /* Darker blue */
  box-shadow: 0px 6px 15px rgba(0, 122, 255, 0.5);
  transform: scale(1.05);
}
/* Editing Mode Label */
.editing-label {
  position: absolute;
  top: -100px; /* Move it higher above the card */
  left: 50%;
  transform: translateX(-50%); /* Center it */
  background: rgba(66, 184, 131, 0.9); /* Bright green background */
  color: white;
  font-size: 1.5rem; /* Bigger text */
  font-weight: bold;
  padding: 8px 20px;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 4px 10px rgba(66, 184, 131, 0.5);
  animation: fadeIn 0.3s ease-in-out;
}

/* Optional: Subtle Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

.profile-section.edit-mode {
  box-shadow: 0 0 10px #42b883, 0 0 30px rgba(66, 184, 131, 0.6), 0 0 50px rgba(66, 184, 131, 0.4);
  animation: green-glow 1.5s infinite alternate ease-in-out;
}

/* Smooth glowing animation */
@keyframes green-glow {
  0% {
    box-shadow: 0 0 15px rgba(66, 184, 131, 0.6);
  }
  100% {
    box-shadow: 0 0 30px rgba(66, 184, 131, 0.8), 0 0 50px rgba(66, 184, 131, 0.5);
  }
}

</style>