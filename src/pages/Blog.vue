<template>
  <div class="message-board">
    <h1>Message Board</h1>

    <!-- Set Username -->
    <div class="username-container">
      <input v-model="username" placeholder="Enter your name..." />
      <button @click="saveUsername">Save</button>
    </div>

    <!-- Sort Options -->
    <div class="sort-options">
      <button @click="sortMessages('best')">Best</button>
      <button @click="sortMessages('new')">New</button>
      <button @click="sortMessages('top')">Top</button>
    </div>

    <!-- New Message Form -->
    <form @submit.prevent="submitMessage" class="message-form">
      <input v-model="newMessage" placeholder="Write your message..." required />
      <button type="submit">Post</button>
    </form>

    <!-- Messages List -->
    <div v-for="message in sortedMessages" :key="message.id" class="message-card">
      <div class="message-header">
        <p><strong>{{ message.username }}</strong> <span class="timestamp">({{ formatDate(message.createdAt) }})</span></p>
      </div>
      <p class="message-content">{{ message.text }}</p>

      <!-- Voting -->
      <div class="message-actions">
        <button @click="voteMessage(message.id, 1)">⬆ {{ message.upvotes }}</button>
        <button @click="voteMessage(message.id, -1)">⬇ {{ message.downvotes }}</button>
        <button v-if="isAdmin" @click="deleteMessage(message.id)" class="delete-btn">🗑 Delete</button>
      </div>

      <!-- Replies Section -->
      <div class="replies">
        <div v-for="reply in message.replies" :key="reply.id" class="reply">
          <p><strong>{{ reply.username }}</strong>: {{ reply.text }}</p>
        </div>

        <!-- Reply Form -->
        <form @submit.prevent="submitReply(message.id)">
          <input v-model="newReplies[message.id]" placeholder="Write a reply..." />
          <button type="submit">Reply</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";

export default {
  name: "MessageBoard",
  data() {
    return {
      messages: [],
      newMessage: "",
      newReplies: {},
      username: localStorage.getItem("username") || "Anonymous",
      isAdmin: false, // Set dynamically if using authentication
      sortType: "best",
    };
  },
  computed: {
    sortedMessages() {
      if (this.sortType === "new") {
        return [...this.messages].sort((a, b) => b.createdAt - a.createdAt);
      } else if (this.sortType === "top") {
        return [...this.messages].sort((a, b) => b.upvotes - a.upvotes);
      } else {
        return [...this.messages].sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
      }
    },
  },
  async mounted() {
    await this.fetchMessages();
  },
  methods: {
    async fetchMessages() {
      const querySnapshot = await getDocs(query(collection(db, "messageBoard"), orderBy("createdAt", "desc")));
      this.messages = await Promise.all(
        querySnapshot.docs.map(async (docSnap) => {
          const messageData = { id: docSnap.id, ...docSnap.data(), replies: [] };
          const repliesSnapshot = await getDocs(collection(docSnap.ref, "replies"));
          messageData.replies = repliesSnapshot.docs.map((replyDoc) => ({ id: replyDoc.id, ...replyDoc.data() }));
          return messageData;
        })
      );
    },
    async submitMessage() {
      if (!this.newMessage.trim()) return;
      await addDoc(collection(db, "messageBoard"), {
        username: this.username,
        text: this.newMessage,
        upvotes: 1,
        downvotes: 0,
        createdAt: new Date(),
      });
      this.newMessage = "";
      await this.fetchMessages();
    },
    async voteMessage(messageId, value) {
      const messageRef = doc(db, "messageBoard", messageId);
      const message = this.messages.find((msg) => msg.id === messageId);

      if (value === 1) {
        await updateDoc(messageRef, { upvotes: message.upvotes + 1 });
      } else {
        await updateDoc(messageRef, { downvotes: message.downvotes + 1 });
      }

      await this.fetchMessages();
    },
    async deleteMessage(messageId) {
      if (!this.isAdmin) return;
      await deleteDoc(doc(db, "messageBoard", messageId));
      await this.fetchMessages();
    },
    async submitReply(messageId) {
      if (!this.newReplies[messageId]?.trim()) return;
      await addDoc(collection(db, "messageBoard", messageId, "replies"), {
        username: this.username,
        text: this.newReplies[messageId],
        createdAt: new Date(),
      });
      this.newReplies[messageId] = "";
      await this.fetchMessages();
    },
    formatDate(date) {
      if (!date) return "";
      const d = date.toDate();
      return d.toLocaleString();
    },
    saveUsername() {
      localStorage.setItem("username", this.username);
      alert("Username saved!");
    },
    sortMessages(type) {
      this.sortType = type;
    },
  },
};
</script>

<style scoped>
.message-board {
  text-align: center;
  padding: 2rem;
}

.username-container {
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.username-container input {
  padding: 8px;
  font-size: 1rem;
  width: 200px;
}

.sort-options {
  margin-bottom: 1rem;
}

.sort-options button {
  margin-right: 5px;
}

.message-form {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.message-form input {
  padding: 10px;
  font-size: 1rem;
  width: 400px;
}

.message-card {
  background: rgba(40, 40, 40, 0.9);
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.message-content {
  font-size: 1.1rem;
  margin: 10px 0;
}

.message-actions {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
}

.replies {
  margin-top: 1rem;
  padding-left: 1rem;
  border-left: 2px solid #42b883;
}

button {
  background: #42b883;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
}

button:hover {
  background: #36a573;
}
</style>