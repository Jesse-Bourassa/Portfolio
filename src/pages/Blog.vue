<template>
  <div class="message-board">
    <h1 class="title">{{ $t("messageBoard") }}</h1>

    <form @submit.prevent="submitMessage" class="message-form">
      <input v-model="newMessage" :placeholder="$t('writeMessage')" required />
      <button type="submit">{{ $t("post") }}</button>
    </form>

    <div class="message-container">
      <!-- Use the computed property 'messages' here -->
      <div
        v-for="message in messages"
        :key="message.id"
        :class="{
          'message-item': true,
          'pending-message': !message.approved && (message.userId === currentUserId || isAdmin)
        }"
      >
        <p class="message-meta">
          <strong class="username">{{ message.username }}</strong>
          <span class="timestamp">{{ formatDate(message.createdAt) }}</span>
           
          <!-- Admin Delete Button -->
          <button v-if="isAdmin" @click="deleteMessage(message.id)" class="delete-btn">
            {{ $t("delete") }}
          </button>
        </p>
        <p class="message-text">{{ message.text }}</p>
        <p
          v-if="!message.approved && (message.userId === currentUserId || isAdmin)"
          class="pending-label"
        >
          {{ $t("pendingApproval") }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
  onSnapshot
} from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import { useI18n } from "vue-i18n";

export default {
  name: "MessageBoard",
  setup() {
    const { t } = useI18n(); // Access translations
    return { t };
  },
  data() {
    return {
      // We'll store all Firestore messages here unfiltered
      rawMessages: [],
      newMessage: "",
      currentUserId:
        localStorage.getItem("userId") || `guest_${Math.random().toString(36).substr(2, 9)}`,
      currentUsername: this.$t("anonymous"),
      isAdmin: false
    };
  },
  computed: {
    // This computed property filters rawMessages based on user and admin status
    messages() {
      return this.rawMessages.filter((message) => {
        return (
          message.approved ||
          message.userId === this.currentUserId ||
          this.isAdmin
        );
      });
    }
  },
  mounted() {
    localStorage.setItem("userId", this.currentUserId);
    this.checkUser();
    this.listenForMessages();
  },
  methods: {
    listenForMessages() {
      const q = query(collection(db, "messageBoard"), orderBy("createdAt", "desc"));
      onSnapshot(q, (snapshot) => {
        // Simply store ALL messages in rawMessages, no filtering here
        this.rawMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
      });
    },
    async submitMessage() {
      if (!this.newMessage.trim()) return;

      await addDoc(collection(db, "messageBoard"), {
        userId: this.currentUserId,
        username: this.currentUsername,
        text: this.newMessage,
        createdAt: new Date(),
        approved: false
      });

      this.newMessage = "";
    },
    async deleteMessage(messageId) {
      await deleteDoc(doc(db, "messageBoard", messageId));
    },
    formatDate(date) {
      if (!date) return "";
      return new Date(date.seconds * 1000).toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit"
      });
    },
    checkUser() {
      const auth = getAuth();
      auth.onAuthStateChanged((user) => {
        if (user) {
          this.currentUserId = user.uid;
          this.currentUsername = user.displayName || user.email.split("@")[0];
          const adminEmails = ["jesse.bou@outlook.com", "am@am.com"];
          this.isAdmin = adminEmails.includes(user.email);
        } else {
          this.currentUserId =
            localStorage.getItem("userId") ||
            `guest_${Math.random().toString(36).substr(2, 9)}`;
          localStorage.setItem("userId", this.currentUserId);
          this.currentUsername = this.$t("anonymous");
          this.isAdmin = false;
        }
      });
    },
    async logout() {
      const auth = getAuth();
      await signOut(auth);

      // Clear localStorage user ID
      localStorage.removeItem("userId");

      // Reset local data
      this.currentUserId = `guest_${Math.random().toString(36).substr(2, 9)}`;
      this.currentUsername = this.$t("anonymous");
      this.isAdmin = false;

      // Optionally re-run checkUser or just rely on this reset
      // this.checkUser();
    }
  }
};
</script>

<style scoped>
.message-board {
  text-align: center;
  padding: 2rem;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Form Input: Use 100% width with a max-width */
.message-form input {
  padding: 10px;
  font-size: 1rem;
  width: 100%;
  max-width: 600px;
  box-sizing: border-box;
}

/* Message Container: Use full width of container with a max-width */
.message-container {
  background: rgba(40, 40, 40, 0.9);
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  width: 100%;
  max-width: 800px;
  /* Let height adjust automatically (or use a max-height if desired) */
  max-height: 70vh;
  overflow-y: auto;
  text-align: left;
}

/* Message Items */
.message-item {
  padding: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 1.2rem;
}

.pending-message {
  opacity: 0.5;
  filter: grayscale(50%);
}

.pending-label {
  font-size: 1.1rem;
  color: #f39c12;
  font-weight: bold;
  margin-top: 4px;
}

.message-meta {
  font-size: 1.4rem;
  color: #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.username {
  font-weight: bold;
  font-size: 1.5rem;
}

.timestamp {
  font-size: 1.3rem;
  color: #aaa;
}

.message-text {
  font-size: 1.6rem;
  color: #fff;
  margin: 8px 0 0 0;
}

.delete-btn {
  background: red;
  color: white;
  border: none;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 1rem;
}

/* RESPONSIVE MEDIA QUERIES */

/* For tablets (max-width: 768px) */
@media (max-width: 768px) {
  .message-board {
    padding: 1rem;
  }
  .message-form input {
    font-size: 0.9rem;
  }
  .message-meta {
    font-size: 1.2rem;
  }
  .username {
    font-size: 1.3rem;
  }
  .timestamp {
    font-size: 1.1rem;
  }
  .message-text {
    font-size: 1.4rem;
  }
}

/* For phones (max-width: 480px) */
@media (max-width: 480px) {
  .message-board {
    padding: 0.5rem;
  }
  .message-form input {
    font-size: 0.8rem;
  }
  .message-meta {
    font-size: 1rem;
  }
  .username {
    font-size: 1.1rem;
  }
  .timestamp {
    font-size: 1rem;
  }
  .message-text {
    font-size: 1.2rem;
  }
}
</style>