<template>
  <div class="about-section" :class="{ 'editing-mode': editMode }">
    <!-- Editing Mode Label -->
    <p v-if="editMode" class="editing-label">{{ $t("editingMode") }}</p>

    <h2 class="about-title">{{ $t("aboutMeTitle") }}</h2>

    <!-- Edit Mode -->
    <div v-if="editMode">
      <textarea
        ref="textarea"
        v-model="editableText"
        class="edit-input"
        @input="autoResize"
      ></textarea>
      <button @click="saveChanges" class="save-button">{{ $t("save") }}</button>
    </div>

    <!-- Display Mode: Clicking words toggles highlights -->
    <p v-else v-html="formattedText" @click="handleHighlightClick" class="about-text"></p>
  </div>
</template>

<script>
import { ref, computed, inject, nextTick } from "vue";
import { useI18n } from "vue-i18n";

export default {
  setup() {
    const { t } = useI18n();
    const isAdmin = inject("isAdmin", ref(false));
    const editMode = ref(false);
    const textarea = ref(null);

    // ✅ Dynamically update text based on language change
    const editableText = computed(() => t("aboutMe"));

    // Store highlighted words
    const highlightedWords = ref([]);

    // Auto-resize function
    const autoResize = () => {
      if (textarea.value) {
        textarea.value.style.height = "auto";
        textarea.value.style.height = textarea.value.scrollHeight + "px";
      }
    };

    // Formatting text with highlights
    const formattedText = computed(() => {
      return editableText.value
        .split(/(\s+)/)
        .map((word) => {
          if (word.match(/^\s+$/)) return word;
          const cleanedWord = word.replace(/[^\wÀ-ÿ]+/g, "");
          const isHighlighted = highlightedWords.value.includes(cleanedWord);
          return `<span class="clickable-word ${isHighlighted ? "highlight" : ""}">${word}</span>`;
        })
        .join("");
    });

    // Handle word highlighting
    const handleHighlightClick = (event) => {
      if (!isAdmin.value) return;
      if (event.target.tagName === "SPAN") {
        const clickedWord = event.target.innerText.trim().replace(/[^\wÀ-ÿ]+/g, "");
        const index = highlightedWords.value.indexOf(clickedWord);
        if (index !== -1) {
          highlightedWords.value.splice(index, 1);
        } else {
          highlightedWords.value.push(clickedWord);
        }
      }
    };

    // Toggle Edit Mode
    const toggleEditMode = () => {
      editMode.value = !editMode.value;
      if (editMode.value) {
        nextTick(autoResize);
      }
    };

    // Save Changes
    const saveChanges = () => {
      editMode.value = false;
    };

    return {
      isAdmin,
      editMode,
      editableText,
      formattedText,
      highlightedWords,
      handleHighlightClick,
      toggleEditMode,
      saveChanges,
      textarea,
      autoResize,
    };
  },
};
</script>

<style scoped>
/* 🔥 Editing Mode Glow */
.about-section.editing-mode {
  box-shadow: 0 0 25px rgba(66, 184, 131, 1);
}

/* 🏆 Main Container */
.about-section {
  position: relative;
  max-width: 1200px;
  margin: auto;
  padding: 3rem;
  background: rgba(31, 31, 31, 0.9);
  border-radius: 15px;
  box-shadow: 0 0px 35px rgba(0, 0, 0, 1.5);
  text-align: center;
  transition: all 0.3s ease-in-out;
}

/* 🔹 Title */
.about-title {
  font-size: 2.5rem; /* Bigger Title */
  font-weight: 800; /* Extra Bold */
  color: #42b883;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
}

/* 📢 About Text */
.about-text {
  font-size: 1.5rem; /* Bigger Text */
  font-weight: 600; /* Bold */
  color: #e0e0e0;
  line-height: 1.8;
  text-align: justify;

}

/* 📝 Edit Input */
.edit-input {
  width: 100%;
  min-height: 150px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 2px solid #42b883;
  border-radius: 8px;
  font-size: 1.6rem; /* Bigger Input */
  font-weight: bold;
  line-height: 1.8;
  resize: none;
  overflow: hidden;
}

/* 💾 Save Button */
.save-button {
  background: #007aff;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 1.3rem; /* Bigger Button */
  font-weight: bold;
  cursor: pointer;
  display: block;
  margin: 20px auto 0;
  transition: all 0.3s ease-in-out;
}

.save-button:hover {
  background: #005ecb;
  transform: scale(1.1);
}

/* 🎯 Highlight Effect */
.clickable-word {
  cursor: pointer;
  font-size: 1.8rem;
  font-weight: bold;
}

:deep(.highlight) {
  font-weight: bold;
  color: #42b883;
  background-color: rgba(66, 184, 131, 0.2);
  padding: 3px 6px;
  border-radius: 6px;
  cursor: pointer;
}
</style>
