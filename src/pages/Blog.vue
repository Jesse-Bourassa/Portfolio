<template>
  <div class="message-board">
    <h1 class="title">Message Board</h1>
    
    <form @submit.prevent="submitMessage" class="message-form">
      <input v-model="newMessage" placeholder="Write your message..." required />
      <button type="submit">Post</button>
    </form>

    <div class="message-container">
      <div v-for="message in messages" :key="message.id" 
           :class="{'message-item': true, 'pending-message': !message.approved && message.userId === currentUserId}">
        <p class="message-meta">
          <strong class="username">{{ message.username }}</strong>
          <span class="timestamp">{{ formatDate(message.createdAt) }}</span>
        </p>
        <p class="message-text">{{ message.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";
import { collection, addDoc, orderBy, query, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default {
  name: "MessageBoard",
  data() {
    return {
      messages: [],
      newMessage: "",
      currentUserId: localStorage.getItem("userId") || `guest_${Math.random().toString(36).substr(2, 9)}`,
      currentUsername: "Anonymous",
      isAdmin: false,
    };
  },
  async mounted() {
    localStorage.setItem("userId", this.currentUserId); // Store guest ID so it persists
    this.checkUser();
    this.listenForMessages();
  },
  methods: {
    listenForMessages() {
      const q = query(collection(db, "messageBoard"), orderBy("createdAt", "desc"));
      onSnapshot(q, (snapshot) => {
        this.messages = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter(
            (message) => 
              message.approved ||  // Approved messages visible to all
              message.userId === this.currentUserId ||  // Users see their own pending messages
              this.isAdmin  // Admin sees everything
          );
      });
    },
    async submitMessage() {
      if (!this.newMessage.trim()) return;

      await addDoc(collection(db, "messageBoard"), {
        userId: this.currentUserId,  // Keeps track of who posted the message
        username: this.currentUsername,  // Displays the user's name
        text: this.newMessage,
        createdAt: new Date(),
        approved: false,  // Message is pending until an admin approves it
      });

      this.newMessage = "";
    },
    formatDate(date) {
      if (!date) return "";
      return new Date(date.seconds * 1000).toLocaleTimeString();
    },
    checkUser() {
      const auth = getAuth();
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          this.currentUserId = user.uid;
          this.currentUsername = user.displayName || user.email.split("@")[0]; // Use display name or email prefix
          const idTokenResult = await user.getIdTokenResult();
          const adminEmails = ["jesse.bou@outlook.com", "am@am.com"];
          this.isAdmin = adminEmails.includes(user.email);
        } else {
          this.currentUserId = localStorage.getItem("userId") || `guest_${Math.random().toString(36).substr(2, 9)}`;
          localStorage.setItem("userId", this.currentUserId);
          this.currentUsername = "Anonymous";
          this.isAdmin = false;
        }
      });
    }
  }
};
</script>

<style scoped>
.message-board {
  text-align: center;
  padding: 2rem;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.message-form input {
  padding: 10px;
  font-size: 1rem;
  width: 600px;
}

.message-container {
  background: rgba(40, 40, 40, 0.9);
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  width: 200%;
  height: 72%;
  overflow-y: auto;
  text-align: left;
}

.message-item {
  padding: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 1.2rem;
}

.pending-message {
  opacity: 0.5;
  filter: grayscale(50%);
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
</style>
