<template>
  <nav class="navbar">
    <ul class="nav-links">
      <li>
        <router-link to="/">
          <i class="pi pi-home"></i>
          <span>Home</span>
        </router-link>
      </li>
      <li>
        <router-link to="/about">
          <i class="pi pi-user"></i>
          <span>About</span>
        </router-link>
      </li>
      <li>
        <router-link to="/projects">
          <i class="pi pi-folder"></i>
          <span>Projects</span>
        </router-link>
      </li>
      <li>
        <router-link to="/contact">
          <i class="pi pi-envelope"></i>
          <span>Contact</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style scoped>
.navbar {
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

.nav-links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
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

.nav-links a span {
  display: inline-block;
}

.pi {
  font-size: 1.2rem;
}
</style>
