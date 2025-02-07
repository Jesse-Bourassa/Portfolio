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
          <span>ALLO ZacharyLelievre</span>
        </router-link>
      </li>
    </ul>

    <!-- Circle on the Right -->
    <div class="auth-circle">
      <i class="pi pi-user"></i>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
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
</style>
