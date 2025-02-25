<template>
  <nav class="navbar">
    <!-- LEFT: If you want a brand, place it here. Otherwise, empty. -->
    <div class="nav-left"></div>

    <!-- CENTER: Desktop Nav (absolutely centered) -->
    <ul class="nav-center desktop-only">
      <li>
        <router-link to="/">
          <i class="pi pi-home"></i>
          <span>{{ t("home") }}</span>
        </router-link>
      </li>
      <li>
        <router-link to="/Blog">
          <i class="pi pi-user"></i>
          <span>{{ t("messageBoard") }}</span>
        </router-link>
      </li>
      <li v-if="isAdmin">
        <router-link to="/Dashboard">
          <i class="pi pi-cog"></i>
          <span>{{ t("dashboard") }}</span>
        </router-link>
      </li>
    </ul>

    <!-- RIGHT: Desktop "Contact Me," language toggle, auth circle, hamburger -->
    <div class="nav-right">
      <button @click="openContactModal" class="contact-btn desktop-only">
  {{ t("contactMe") }}
</button>
      <button @click="toggleLanguage" class="lang-toggle">
        {{ locale === "en" ? "🇫🇷 FR" : "🇬🇧 EN" }}
      </button>
      <div class="auth-circle" @click="isAdmin ? handleLogout() : openLoginModal()">
        <i class="pi" :class="isAdmin ? 'pi-lock-open' : 'pi-user'"></i>
      </div>
      <!-- Hamburger (mobile only) -->
      <button class="hamburger mobile-only" @click="toggleMobileMenu">
        <i class="pi pi-bars"></i>
      </button>
    </div>

    <!-- MOBILE MENU DROPDOWN -->
    <transition name="slide-fade">
      <ul v-if="showMobileMenu" class="nav-links-mobile">
        <li>
          <router-link to="/" @click="toggleMobileMenu">
            <i class="pi pi-home"></i>
            <span>{{ t("home") }}</span>
          </router-link>
        </li>
        <li>
          <router-link to="/Blog" @click="toggleMobileMenu">
            <i class="pi pi-user"></i>
            <span>{{ t("messageBoard") }}</span>
          </router-link>
        </li>
        <li v-if="isAdmin">
          <router-link to="/Dashboard" @click="toggleMobileMenu">
            <i class="pi pi-cog"></i>
            <span>{{ t("dashboard") }}</span>
          </router-link>
        </li>
        <li>
          <button @click="openContactModal" class="contact-btn desktop-only">
  {{ t("contactMe") }}
</button>
        </li>
      </ul>
    </transition>

    <!-- LOGIN MODAL -->
    <div v-if="showLoginModal" class="custom-modal-overlay">
      <div class="custom-modal">
        <h2>{{ t("adminLogin") }}</h2>
        <input
          type="email"
          v-model="loginEmail"
          :placeholder="t('enterEmail')"
        />
        <input
          type="password"
          v-model="loginPassword"
          :placeholder="t('enterPassword')"
        />
        <div class="modal-buttons">
          <button @click="closeLoginModal">{{ t("cancel") }}</button>
          <button @click="confirmLogin">{{ t("login") }}</button>
        </div>
        <div v-if="showError" class="error-toast">
          {{ t("loginError") }}
        </div>
      </div>
    </div>
    
    <div v-if="showContactModal" class="custom-modal-overlay" @click.self="closeContactModal">
  <div class="custom-modal">
    <h2>{{ t("contactMe") }}</h2>
    <input type="email" v-model="contactEmail" :placeholder="t('yourEmail')" />
    <input type="text" v-model="contactSubject" :placeholder="t('subject')" />
    <textarea v-model="contactMessage" :placeholder="t('message')"></textarea>
    <div class="modal-buttons">
      <button @click="closeContactModal">{{ t("cancel") }}</button>
      <button @click="submitContactForm">{{ t("send") }}</button>
    </div>
  </div>
</div>

  </nav>
</template>

<script>
import { inject, ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import emailjs from "emailjs-com";


export default {
  name: "NavBar",
  setup() {
    const isAdmin = inject("isAdmin");
    const { t, locale } = useI18n();

    const showContactModal = ref(false);
    const contactEmail = ref("");
    const contactSubject = ref("");
    const contactMessage = ref("");

    const openContactModal = () => {
      console.log("Opening Contact Modal..."); // Debugging log

      showContactModal.value = true;
    };
    const closeContactModal = () => {
      showContactModal.value = false;
      contactEmail.value = "";
      contactSubject.value = "";
      contactMessage.value = "";
    };

    const submitContactForm = () => {
      if (!contactEmail.value || !contactSubject.value || !contactMessage.value) {
        alert("Please fill in all fields.");
        return;
      }

      // Replace with your EmailJS service details
      const serviceID = "service_t242dhs"; 
      const templateID = "template_pzau1x6"; 
      const userID = "yWes8mfgaVRTMi-pq"; 

      const templateParams = {
        to_email: "jesse.bou@outlook.com",
        from_email: contactEmail.value, // Sender's email
        subject: contactSubject.value,  // Subject entered by user
        message: contactMessage.value,  // Message entered by user
      };

      emailjs
        .send(serviceID, templateID, templateParams, userID)
        .then(
          () => {
            alert("Message sent successfully!");
            closeContactModal();
          },
          (error) => {
            console.error("Failed to send email:", error);
            alert("Failed to send message.");
          }
        );
    };

    // Login modal
    const loginEmail = ref("");
    const loginPassword = ref("");
    const showLoginModal = ref(false);
    const showError = ref(false);
    const errorMessage = ref("");

    // Mobile menu
    const showMobileMenu = ref(false);
    const toggleMobileMenu = () => {
      showMobileMenu.value = !showMobileMenu.value;
    };

    // i18n
    locale.value = localStorage.getItem("lang") || "en";
    const toggleLanguage = () => {
      locale.value = locale.value === "en" ? "fr" : "en";
      localStorage.setItem("lang", locale.value);
    };

    // Login
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
        if (["jesse.bou@outlook.com", "am@am.com"].includes(user.email)) {
          localStorage.setItem("isAdmin", "true");
          isAdmin.value = true;
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
      isAdmin.value = false;
    };

    // Check user
    onMounted(() => {
      onAuthStateChanged(auth, (user) => {
        if (user && ["jesse.bou@outlook.com", "am@am.com"].includes(user.email)) {
          localStorage.setItem("isAdmin", "true");
          isAdmin.value = true;
        } else {
          localStorage.removeItem("isAdmin");
          isAdmin.value = false;
        }
      });
    });

    return {
      t,
      locale,
      isAdmin,
      loginEmail,
      loginPassword,
      showLoginModal,
      showError,
      errorMessage,
      showMobileMenu,
      toggleMobileMenu,
      toggleLanguage,
      openLoginModal,
      closeLoginModal,
      confirmLogin,
      handleLogout,
      showContactModal,
      contactEmail,
      contactSubject,
      contactMessage,
      openContactModal,
      closeContactModal,
      submitContactForm,
    };
  },
};
</script>

<style>
/* Navbar container: brand on left, center nav, right side */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  /* Let’s give a fixed height if you want a known size, e.g.: */
  height: 60px; 
  display: flex;
  align-items: center;
  padding: 0 2rem; 
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  z-index: 10;
}

/* 1) Left side is empty (or brand). We can hide or show brand if you want. */
.nav-left {
  width: 0; /* or some small width if you want a brand icon */
}

/* 2) The center nav is absolutely centered in the .navbar */
.nav-center {
  position: absolute; 
  left: 50%; 
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

/* The typical link styling for the center nav. */
.nav-center li a {
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: background 0.3s;
}
.nav-center li a:hover {
  background: rgba(255,255,255,0.15);
  color: #42b883;
}

/* 3) The right side is pinned to the right by using margin-left: auto. */
.nav-right {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* Contact Me button (desktop only) */
.contact-btn.desktop-only {
  /* your existing button styles */
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
}
.contact-btn.desktop-only:hover {
  background: #42b883;
  color: #fff;
}

/* Contact Me button (desktop only) */
.contact-btn {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  text-decoration: none;
  padding: 8px 16px;
  font-size: 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}
.contact-btn:hover {
  background: #42b883;
  color: #fff;
}

/* Language toggle */
.lang-toggle {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: none;
  padding: 8px 16px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.3s;
}
.lang-toggle:hover {
  background: #42b883;
}

/* Auth circle */
.auth-circle {
  background: rgba(255, 255, 255, 0.1);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}
.auth-circle:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(255, 255, 255, 0.2);
}
.auth-circle i {
  color: #fff;
  font-size: 1.2rem;
}

/* Hamburger (mobile only) */
.hamburger {
  background: none;
  border: none;
  color: #fff;
  font-size: 1.6rem;
  cursor: pointer;
  transition: transform 0.2s;
}
.hamburger:hover {
  transform: scale(1.1);
}

/* Mobile Nav */
.nav-links-mobile {
  position: absolute;
  top: 70px;
  right: 1rem;
  background: rgba(0, 0, 0, 0.85);
  list-style: none;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  width: 200px;
}
.nav-links-mobile li a {
  display: block;
  color: #fff;
  text-decoration: none;
  padding: 0.65rem 1rem;
  border-radius: 6px;
  transition: background 0.3s;
}
.nav-links-mobile li a:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #42b883;
}

/* Slide-fade for mobile menu */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.desktop-only {
  display: flex; /* or inline-flex */
}
.mobile-only {
  display: none;
}
/* Breakpoints */
@media (max-width: 992px) {
  /* Hide the center nav */
  .mobile-only {
    display: block !important;
  }
  .desktop-only {
    display: none !important;
  }

  /* The navbar becomes a normal flex container, 
     so we can center the right side horizontally */
  .navbar {
    justify-content: center !important;
  }

  /* Remove margin-left: auto from .nav-right */
  .nav-right {
    margin-left: 0 !important;
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  /* Hide the center nav altogether */
  .nav-center {
    display: none !important;
  }

  /* Let the .navbar content be centered in a normal flex layout */
  .navbar {
    justify-content: center; 
  }

  /* Remove the auto margin from .nav-right so it doesn't push to the edge */
  .nav-right {
    margin-left: 0;
    gap: 0.5rem; /* maybe reduce gap if it’s too wide */
  }
}


/* MODAL & ERROR TOAST EXACTLY AS YOU HAVE THEM */
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
  background: rgba(0, 0, 0, 0.4);
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
  border: 0px solid transparent;
  background-clip: padding-box;
  background-origin: border-box;
  background-image: linear-gradient(#2e2e2e, #2e2e2e),
    linear-gradient(135deg, #42b883, #3edc81, #50f98e);
  animation: green-glow 3s infinite;
}

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
  transition: background 0.3s;
  font-size: 1rem;
}

.modal-buttons button:hover {
  background: #42b883;
  color: #fff;
}
</style>