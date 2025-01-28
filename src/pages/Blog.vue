<template>
    <div class="blog-section">
      <h1>Welcome to My Blog</h1>
      <p class="tagline">Here you'll find posts about my projects, coding tips, and more!</p>
      <div class="blog-posts">
        <!-- Add dynamic blog post cards here -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Blog",
  };
  </script>
  
  <style scoped>
  /* Blog section container */
  .blog-section {
    max-width: 1500px;
    margin: auto;
    padding: 5rem;
    background: rgba(31, 31, 31, 0.9);
    border-radius: 15px;
    box-shadow: 0 0px 30px rgba(0, 0, 0, 1.5);
    overflow: hidden;
    text-align: center;
    color: #fff;
  }
  
  /* Title */
  .blog-section h1 {
    font-size: 3rem;
    margin-top: 1rem;
    color: #42b883; /* Match the green accent color */
  }
  
  /* Tagline */
  .blog-section .tagline {
    font-size: 1.5rem;
    margin-top: 1rem;
    color: #cccccc; /* Subtle gray color */
  }
  
  /* Blog posts container */
  .blog-posts {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
    margin-top: 2rem;
  }
  </style>
  