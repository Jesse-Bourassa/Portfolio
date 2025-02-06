<script>
import 'primeicons/primeicons.css'
</script>

<template>
  <div class="social-links">
    <div class="icon-link">
      <a href="https://www.linkedin.com/in/jesse-bourassa-73b059292/" target="_blank">
        <i class="pi pi-linkedin"></i>
      </a>
      <p>LinkedIn</p>
    </div>
    <div class="icon-link">
      <a href="https://github.com/Jesse-Bourassa" target="_blank">
        <i class="pi pi-github"></i>
      </a>
      <p>GitHub</p>
    </div>
    <div class="icon-link">
      <a href="mailto:jesse.bou@outlook.com">
        <i class="pi pi-envelope"></i>
      </a>
      <p>Email</p>
    </div>
  </div>
</template>

<style scoped>
.social-links {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 2rem;
}

.icon-link {
  text-align: center;
  color: #ffffff;
}

.icon-link i {
  font-size: 3rem;
  color: #42b883; 
  transition: color 0.3s ease, transform 0.3s ease;
}

.icon-link:hover i {
  color: #36a573;
  transform: scale(1.2);
}

.icon-link p {
  margin-top: 0.5rem;
  font-size: 1rem;
  color: #cccccc;
}
</style>
