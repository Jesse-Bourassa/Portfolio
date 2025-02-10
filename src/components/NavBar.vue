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
          <span>Blogsss</span>
        </router-link>
      </li>

      <!-- Dashboard link visible only when logged in -->
      <li v-if="isLoggedIn">
        <router-link to="/Dashboard">
          <i class="pi pi-cog"></i>
          <span>Dashboard</span>
        </router-link>
      </li>
    </ul>

    <!-- Authentication Circle on the Right -->
    <div class="auth-circle" @click="isLoggedIn ? handleLogout() : handleLogin()">
      <i class="pi" :class="isLoggedIn ? 'pi-lock-open' : 'pi-user'"></i>
    </div>

    <!-- Error Toast -->
    <div v-if="showError" class="error-toast">
      <p>{{ errorMessage }}</p>
    </div>
  </nav>
</template>

<script>
import { ref } from 'vue';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

export default {
  name: 'NavBar',
  setup() {
    const isLoggedIn = ref(false);
    const errorMessage = ref('');
    const showError = ref(false);  // Control the error modal visibility

    const handleLogin = async () => {
      try {
        const email = prompt('Enter admin email:');
        const password = prompt('Enter admin password:');

        if (!email || !password) {
          throw new Error('Email and password are required.');
        }

        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        isLoggedIn.value = true;
        alert('Logged in as Admin!');
      } catch (error) {
        errorMessage.value = 'Login failed. Please try again.';
        showError.value = true;  // Show the error modal

        setTimeout(() => {
      showError.value = false;  // Hide error permanently
    }, 5000);
      }
    };

    const handleLogout = async () => {
      await signOut(auth);
      isLoggedIn.value = false;
      alert('Logged out successfully.');
    };

    onAuthStateChanged(auth, (user) => {
      isLoggedIn.value = !!user;
    });

    return { isLoggedIn, handleLogin, handleLogout, errorMessage, showError };
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

.error-toast {
  position: fixed;
  top: 10%;
  right: 10%;
  background: rgba(255, 50, 50, 0.9);
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 100;
  font-weight: bold;
  animation: fadeInOut 5s ease;
}

/* Fade animation */
@keyframes fadeInOut {
  0% { opacity: 0; transform: translateY(-20px); }
  10% { opacity: 1; transform: translateY(0); }
  90% { opacity: 1; }
  100% { opacity: 0; transform: translateY(-20px); }
}

</style>
