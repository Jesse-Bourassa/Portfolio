<template>
  <div class="dashboard">
    <h1 class="title">{{ $t("adminDashboard") }}</h1>
    <div class="pending-messages">
      <h2>{{ $t("pendingMessages") }}</h2>
      <div v-if="pendingMessages.length" class="messages-container">
        <div v-for="message in pendingMessages" :key="message.id" class="message-item">
          <p class="message-meta">
            <strong class="username">{{ message.username }}</strong>
            <span class="timestamp">{{ formatDate(message.createdAt) }}</span>
          </p>
          <p class="message-text">{{ message.text }}</p>
          <div class="button-group">
            <button @click="approveMessage(message.id)" class="approve-btn">{{ $t("approve") }}</button>
            <button @click="deleteMessage(message.id)" class="delete-btn">{{ $t("delete") }}</button>
          </div>
        </div>
      </div>
      <p v-else class="no-messages">{{ $t("noMessages") }}</p>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";
import { collection, updateDoc, deleteDoc, doc, query, where, onSnapshot } from "firebase/firestore";
import { useI18n } from "vue-i18n";

export default {
  name: "AdminDashboard",
  data() {
    return {
      pendingMessages: []
    };
  },
  setup() {
    const { t } = useI18n(); // Use translation
    return { t };
  },
  async mounted() {
    this.fetchPendingMessages();
  },
  methods: {
    fetchPendingMessages() {
      const q = query(collection(db, "messageBoard"), where("approved", "==", false));
      onSnapshot(q, (snapshot) => {
        this.pendingMessages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      });
    },
    async approveMessage(messageId) {
      await updateDoc(doc(db, "messageBoard", messageId), { approved: true });
    },
    async deleteMessage(messageId) {
      await deleteDoc(doc(db, "messageBoard", messageId));
    },
    formatDate(date) {
      if (!date) return "";
      return new Date(date.seconds * 1000).toLocaleTimeString();
    }
  }
};
</script>

<style scoped>
.dashboard {
  text-align: center;
  padding: 4rem 2rem;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* Instead of fixed height, use a min-height */
  min-height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.title {
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 2.5rem;
}

/* Pending Messages Container */
.pending-messages {
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 15px;
  width: 95%;
  max-width: 1000px;
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.pending-messages h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
}

/* Messages Container */
.messages-container {
  max-height: 500px;
  overflow-y: auto;
  padding: 1.5rem;
}

/* Individual Message Items */
.message-item {
  padding: 1.8rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  font-size: 1.4rem;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  margin-bottom: 1.5rem;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.3);
  transition: 0.3s ease-in-out;
}

.message-meta {
  font-size: 1.5rem;
  color: #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.username {
  font-weight: bold;
  font-size: 1.6rem;
  color: #fff;
}

.timestamp {
  font-size: 1.2rem;
  color: #bbb;
}

.message-text {
  font-size: 1.8rem;
  color: #fff;
  margin: 15px 0;
}

/* Button Group */
.button-group {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1rem;
}

.approve-btn,
.delete-btn {
  padding: 14px 28px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.3rem;
  font-weight: bold;
  transition: 0.3s ease-in-out;
  border: none;
}

.approve-btn {
  background: #28a745;
  color: white;
}

.approve-btn:hover {
  background: #1e7d34;
}

.delete-btn {
  background: #dc3545;
  color: white;
}

.delete-btn:hover {
  background: #b52b37;
}

.no-messages {
  font-size: 1.6rem;
  color: #ccc;
  text-align: center;
  margin-top: 1.5rem;
}

/* RESPONSIVE STYLES */

/* Tablet (max-width: 768px) */
@media (max-width: 768px) {
  .dashboard {
    padding: 3rem 1.5rem;
  }
  .title {
    font-size: 2.8rem;
    margin-bottom: 2rem;
  }
  .pending-messages {
    padding: 1.5rem;
    margin-bottom: 2rem;
  }
  .pending-messages h2 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }
  .message-item {
    padding: 1.2rem;
    font-size: 1.3rem;
  }
  .message-meta {
    font-size: 1.3rem;
  }
  .username {
    font-size: 1.4rem;
  }
  .timestamp {
    font-size: 1rem;
  }
  .message-text {
    font-size: 1.6rem;
  }
  .approve-btn, .delete-btn {
    padding: 12px 24px;
    font-size: 1.1rem;
  }
}

/* Phone (max-width: 480px) */
@media (max-width: 480px) {
  .dashboard {
    padding: 2rem 1rem;
  }
  .title {
    font-size: 2.4rem;
    margin-bottom: 1.5rem;
  }
  .pending-messages {
    padding: 1rem;
    margin-bottom: 1.5rem;
  }
  .pending-messages h2 {
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }
  .message-item {
    padding: 1rem;
    font-size: 1.2rem;
  }
  .message-meta {
    font-size: 1.2rem;
  }
  .username {
    font-size: 1.3rem;
  }
  .timestamp {
    font-size: 0.9rem;
  }
  .message-text {
    font-size: 1.4rem;
  }
  .approve-btn, .delete-btn {
    padding: 10px 20px;
    font-size: 1rem;
  }
  .no-messages {
    font-size: 1.4rem;
  }
}
</style>
