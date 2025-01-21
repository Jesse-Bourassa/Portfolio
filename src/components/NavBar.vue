<template>
    <nav>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: "NavBar",
  };
  </script>
  
  <style scoped>
  /* Navigation Bar Styling */
  nav {
    background-color: #333;
    padding: 1rem;
    position: fixed; /* Makes the nav bar stick to the top */
    top: 0; /* Aligns it at the top */
    left: 0; /* Aligns it to the left */
    width: 100%; /* Ensures it spans the full width of the page */
    z-index: 10; /* Keeps it above other elements */
  }
  nav ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: 1rem;
    justify-content: center; /* Centers the nav items horizontally */
  }
  nav ul li {
    display: inline;
  }
  nav ul li a {
    color: white;
    text-decoration: none;
    font-weight: bold;
  }
  nav ul li a:hover {
    color: #42b883;
  }
  </style>