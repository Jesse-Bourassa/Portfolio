<template>
  <nav class="navbar">
    <!-- Centered Navigation Links -->
    <ul class="nav-links">
      <li>
        <router-link to="/">
          <i class="pi pi-home"></i>
          <span>Home</span>
        </router-link>
      </li>
      <li>
        <router-link to="/Blog">
          <i class="pi pi-user"></i>
          <span>Message Board</span>
        </router-link>
      </li>

      <!-- Dashboard link visible only when logged in -->
      <li v-if="isAdmin">
        <router-link to="/Dashboard">
          <i class="pi pi-cog"></i>
          <span>Dashboard</span>
        </router-link>
      </li>
    </ul>

    <!-- Authentication Circle -->
    <div class="auth-circle" @click="isAdmin ? handleLogout() : openLoginModal()">
      <i class="pi" :class="isAdmin ? 'pi-lock-open' : 'pi-user'"></i>
    </div>

    <!-- Login Modal -->
    <div v-if="showLoginModal" class="custom-modal-overlay">
      <div class="custom-modal">
        <h2>Admin Login</h2>
        <input type="email" v-model="loginEmail" placeholder="Enter admin email" />
        <input type="password" v-model="loginPassword" placeholder="Enter password" />
        <div class="modal-buttons">
          <button @click="closeLoginModal">Cancel</button>
          <button @click="confirmLogin">Login</button>
        </div>
        <div v-if="showError" class="error-toast">
          {{ errorMessage }}
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { inject, ref, onMounted } from "vue";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

export default {
  name: "NavBar",
  setup() {
    // Inject the isAdmin state provided from App.vue
    const isAdmin = inject("isAdmin");

    const loginEmail = ref("");
    const loginPassword = ref("");
    const showLoginModal = ref(false);
    const errorMessage = ref("");
    const showError = ref(false);

    const openLoginModal = () => {
      showLoginModal.value = true;
    };

    const closeLoginModal = () => {
      showLoginModal.value = false;
      loginEmail.value = "";
      loginPassword.value = "";
    };

    const confirmLogin = async () => {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          loginEmail.value,
          loginPassword.value
        );
        const user = userCredential.user;

        if (user.email === "jesse.bou@outlook.com" || user.email === "am@am.com") {
          localStorage.setItem("isAdmin", "true");
          isAdmin.value = true; // This updates the reactive shared state
          closeLoginModal();
        } else {
          throw new Error("Unauthorized user.");
        }
      } catch (error) {
        errorMessage.value = "Login failed. Please check your credentials.";
        showError.value = true;
        setTimeout(() => {
          showError.value = false;
        }, 4000);
      }
    };

    const handleLogout = async () => {
      await signOut(auth);
      localStorage.removeItem("isAdmin");
      isAdmin.value = false; // Update the shared state
    };

    onMounted(() => {
      onAuthStateChanged(auth, (user) => {
        if (user && (user.email === "jesse.bou@outlook.com" || user.email === "am@am.com")) {
          localStorage.setItem("isAdmin", "true");
          isAdmin.value = true;
        } else {
          localStorage.removeItem("isAdmin");
          isAdmin.value = false;
        }
      });
    });

    // No longer need to call provide("isAdmin", isAdmin) here since it's provided in App.vue

    return {
      isAdmin,
      loginEmail,
      loginPassword,
      showLoginModal,
      errorMessage,
      showError,
      openLoginModal,
      closeLoginModal,
      confirmLogin,
      handleLogout,
    };
  },
};
</script>

<style scoped>
/* Navbar Container */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between; /* Push nav-links and auth-circle apart */
  padding: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

/* Navigation Links */
.nav-links {
  list-style: none;
  margin: 0 auto; /* Center the links horizontally */
  padding: 0;
  display: flex;
  gap: 2rem;
}

.nav-links li {
  display: flex;
  align-items: center;
}

.nav-links a {
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.nav-links a:hover {
  color: #42b883;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0px 2px 20px rgba(66, 184, 131, 0.5);
}

/* Authentication Circle on the Right */
.auth-circle {
  background: rgba(255, 255, 255, 0.1);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.auth-circle:hover {
  transform: scale(1.1);
  box-shadow: 0px 4px 8px rgba(255, 255, 255, 0.2);
}

.auth-circle i {
  color: #fff;
  font-size: 1.2rem;
}

/* Icon Styling */
.pi {
  font-size: 1.2rem;
}

/* Error Toast */
.error-toast {
  position: absolute;
  bottom: -80px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 77, 77, 0.9);
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 100;
  font-weight: bold;
  opacity: 0;
  animation: pop-up-bob-smooth 4s ease-in-out;
}

/* Smooth Floaty Pop Up and Bob Animation */
@keyframes pop-up-bob-smooth {
  0% {
  opacity: 1;
    transform: translate(-50%, 400px);
  }
  10% {
    transform: translate(-50%, 10px);
  }
  20% {
    transform: translate(-50%, 20px);
  }
  30% {
    transform: translate(-50%, 15px);
  }
  40% {
    transform: translate(-50%, 20px);
  }
  50% {
    transform: translate(-50%, 15px);
  }
  60% {
    transform: translate(-50%, 20px);
  }
  70% {
    transform: translate(-50%, 15px);
  }
  80% {
    transform: translate(-50%, 0px);
  }
  90% {
    transform: translate(-50%, 400px);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, 400px);
  }
}
.custom-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4); /* Reduced darkness */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.custom-modal {
  position: relative;
  background: #2e2e2e;
  padding: 2.5rem;
  border-radius: 16px;
  text-align: center;
  width: 500px;
  max-width: 90%;
  animation: fadeIn 0.3s ease;

  /* Glowing gradient border */
  border: 0px solid transparent;
  background-clip: padding-box;
  background-origin: border-box;
  background-image: linear-gradient(#2e2e2e, #2e2e2e), 
                    linear-gradient(135deg, #42b883, #3edc81, #50f98e);
  animation: green-glow 3s infinite;
}

/* Add an animation to make the gradient glow */
@keyframes green-glow {
  0% {
    box-shadow: 0 0 8px rgba(66, 184, 131, 0.6);
  }
  50% {
    box-shadow: 0 0 16px rgba(62, 220, 129, 1);
  }
  100% {
    box-shadow: 0 0 8px rgba(66, 184, 131, 0.6);
  }
}

.custom-modal h2 {
  color: #fff;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  text-shadow: 0 0 12px rgba(255, 255, 255, 0.8);
}
.custom-modal input {
  width: 100%;
  padding: 1rem;
  margin: 1rem 0;
  border: none;
  border-radius: 8px;
  background: #444;
  color: #fff;
  font-size: 1rem;
}

.modal-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
}

.modal-buttons button {
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.modal-buttons button:hover {
  background: #42b883;
  color: #fff;
}
</style>
