<template>
  <div class="error-404-container">
    <div class="error-card">
      <h1>Error 404: Experience Not Found</h1>
      <p>
        I'm currently a student honing my skills and actively looking for an
        internship or entry-level opportunity to kickstart my career.
      </p>
      <p>
        If you're looking for someone passionate about learning and growing,
        let's connect!
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Experience404",
};
</script>

<style scoped>
.error-404-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  min-height: 300px;
}

.error-card {
  background-color: rgba(255, 77, 77, 0.66); /* Red card */
  color: #ffffff;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.error-card h1 {
  font-size: 2rem;
  margin-bottom: 12px;
}

.error-card p {
  font-size: 1rem;
  margin: 8px 0;
}
</style>