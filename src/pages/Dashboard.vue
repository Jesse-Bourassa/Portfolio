<template>
  <div class="dashboard">
    <h1>Admin Dashboard</h1>
    <div class="pending-messages">
      <h2>Pending Messages</h2>
      <div v-for="message in pendingMessages" :key="message.id" class="message-item">
        <p class="message-meta">
          <strong class="username">{{ message.username }}</strong>
          <span class="timestamp">{{ formatDate(message.createdAt) }}</span>
        </p>
        <p class="message-text">{{ message.text }}</p>
        <button @click="approveMessage(message.id)" class="approve-btn">Approve</button>
        <button @click="deleteMessage(message.id)" class="delete-btn">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";
import { collection, getDocs, updateDoc, deleteDoc, doc, query, where, onSnapshot } from "firebase/firestore";

export default {
  name: "AdminDashboard",
  data() {
    return {
      pendingMessages: []
    };
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
  padding: 2rem;
  color: white;
}
.pending-messages {
  margin-top: 2rem;
  background: rgba(40, 40, 40, 0.9);
  padding: 1rem;
  border-radius: 8px;
  width: 60%;
  margin-left: auto;
  margin-right: auto;
}
.message-item {
  padding: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 1.2rem;
}
.message-meta {
  font-size: 1.4rem;
  color: #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
.approve-btn {
  background: green;
  color: white;
  border: none;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 1rem;
}
.delete-btn {
  background: red;
  color: white;
  border: none;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 1rem;
}
</style>
