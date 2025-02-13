<template>
  <div class="about-section" :class="{ 'editing-mode': editMode }">
    <!-- Edit Button -->
    <button v-if="isAdmin" @click="toggleEditMode" class="edit-button">
      <i class="pi pi-pencil"></i>
    </button>

    <!-- Editing Mode Label -->
    <p v-if="editMode" class="editing-label">Editing Mode</p>

    <h2>About Me</h2>

    <!-- Editable Mode -->
    <div v-if="editMode">
      <textarea 
        ref="textarea"
        v-model="editableText"
        class="edit-input"
        @input="autoResize"
      ></textarea>
      <!-- Removed the highlight button -->
      <button @click="saveChanges" class="save-button">Save</button>
    </div>

    <!-- Display Mode: Clicking on any word toggles its highlight -->
    <p v-else v-html="formattedText" @click="handleHighlightClick"></p>
  </div>
</template>

<script>
import { ref, computed, inject, onMounted, nextTick } from "vue";
import { db } from "../firebase"; // Adjust path as necessary
import { doc, getDoc, setDoc } from "firebase/firestore";

export default {
  setup() {
    const isAdmin = inject("isAdmin", ref(false));
    const editMode = ref(false);
    const textarea = ref(null);
    const editableText = ref(
      `I'm Jesse Bourassa, a Full-Stack Developer with a strong ability to quickly adapt to new technologies and frameworks. While I don't specialize in a single domain, I pride myself on being a versatile and fast learner, capable of working across various programming languages and tools to meet the needs of any project.`
    );
    
    // Store highlighted words (store "clean" words without punctuation)
    const highlightedWords = ref([]);

    // Auto-resize function to expand the textarea as text grows
    const autoResize = () => {
      const element = textarea.value;
      if (element) {
        element.style.height = "auto"; // Reset height
        element.style.height = element.scrollHeight + "px"; // Set new content height
      }
    };

    // Computed property that wraps each word in a span.
    // We split by spaces (preserving whitespace) and conditionally add the "highlight" class.
    const formattedText = computed(() => {
      return editableText.value.split(/(\s+)/).map(word => {
        // Preserve whitespace as-is
        if (word.match(/^\s+$/)) return word;
        // Remove punctuation from the word for checking if it's highlighted
        const cleanedWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
        const isHighlighted = highlightedWords.value.includes(cleanedWord);
        return `<span class="clickable-word ${isHighlighted ? 'highlight' : ''}">${word}</span>`;
      }).join('');
    });

    // Toggle highlight when clicking on a word in display mode
    const handleHighlightClick = (event) => {
      // Ensure a word span was clicked
      if (event.target.tagName === 'SPAN') {
        const clickedWord = event.target.innerText.trim();
        // Remove punctuation for consistency
        const cleanedWord = clickedWord.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
        const index = highlightedWords.value.indexOf(cleanedWord);
        if (index !== -1) {
          // If already highlighted, remove it
          highlightedWords.value.splice(index, 1);
        } else {
          // Otherwise, add the word to the highlights
          highlightedWords.value.push(cleanedWord);
        }
      }
    };

    // Save changes to Firestore
    const saveChanges = async () => {
      const dataToSave = {
        text: editableText.value,
        highlights: highlightedWords.value,
      };

      try {
        await setDoc(doc(db, "pages", "about"), dataToSave);
        console.log("Saved to Firestore");
        editMode.value = false;
      } catch (error) {
        console.error("Error saving data:", error);
      }
    };

    // Load saved data from Firestore when the component mounts
    onMounted(async () => {
      try {
        const docRef = doc(db, "pages", "about");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          editableText.value = data.text;
          highlightedWords.value = data.highlights || [];
          // Ensure textarea resizes after content is rendered
          nextTick(() => autoResize());
        }
      } catch (error) {
        console.error("Error loading data from Firestore:", error);
      }
    });

    // Toggle Edit Mode and resize textarea if entering edit mode
    const toggleEditMode = () => {
      editMode.value = !editMode.value;
      if (editMode.value) {
        nextTick(() => autoResize());
      }
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
/* Highlighted words style */
:deep(.highlight) {
  font-weight: bold;
  color: #42b883;
  background-color: rgba(66, 184, 131, 0.2);
  padding: 2px 4px;
  border-radius: 4px;
  cursor: pointer;
}

/* Optional: Make all word spans look clickable */
.clickable-word {
  cursor: pointer;
}

.about-section {
  position: relative;
  max-width: 900px;
  margin: auto;
  padding: 3rem;
  background: rgba(31, 31, 31, 0.9);
  border-radius: 15px;
  box-shadow: 0 0px 30px rgba(0, 0, 0, 1.5);
  text-align: center;
  transition: all 0.3s ease-in-out;
}

/* Editing Mode Glow */
.about-section.editing-mode {
  box-shadow: 0 0 20px rgba(66, 184, 131, 0.8);
}

/* Edit Input */
.edit-input {
  width: 100%;
  min-height: 120px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 2px solid #42b883;
  border-radius: 8px;
  font-size: 1.2rem;
  line-height: 1.8;
  resize: none; /* Prevent manual resizing */
  overflow: hidden; /* Hide scrollbars */
}

/* Save Button */
.save-button {
  background: #007aff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  display: block;
  margin: 20px auto 0;
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 4px 10px rgba(0, 122, 255, 0.3);
}

.save-button:hover {
  background: #005ecb;
  box-shadow: 0px 6px 15px rgba(0, 122, 255, 0.5);
  transform: scale(1.05);
}

/* Edit Button */
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

/* Editing Mode Label */
.editing-label {
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(66, 184, 131, 0.9);
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 8px 20px;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 4px 10px rgba(66, 184, 131, 0.5);
  animation: fadeIn 0.3s ease-in-out;
}
</style>