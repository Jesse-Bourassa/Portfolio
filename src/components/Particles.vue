<script setup>
import { loadFull } from "tsparticles";

const particlesInit = async (engine) => {
  console.log("Particles engine initialized", engine);
  try {
    await loadFull(engine); // Ensure the full engine is loaded
  } catch (err) {
    console.error("Error loading tsParticles engine:", err);
  }
};

const particlesLoaded = (container) => {
  console.log("Particles container loaded", container);
};
</script>

<template>
  <div id="app">
    <Particles
        id="tsparticles"
        :particlesInit="particlesInit"
        :particlesLoaded="particlesLoaded"
        :options="{
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: { enable: true, mode: 'push' },
            onHover: { enable: false }, // Remove hover for a simpler effect
            resize: true,
          },
          modes: {
            push: { quantity: 2 },
          },
        },
        particles: {
          color: {
            value: ['#ffffff', '#f7e94d', '#6bff6e'], // Softer colors
          },
          move: {
            enable: true,
            speed: 2, // Slower for smoother motion
            direction: 'none',
            random: true,
            straight: false,
            outModes: { default: 'out' },
          },
          number: {
            density: { enable: true, area: 800 },
            value: 80, // Fewer particles for subtlety
          },
          opacity: {
            value: { min: 0.1, max: 0.4 }, // Lower opacity
            random: true,
          },
          size: {
            value: { min: 3, max: 8 }, // Larger particles for visibility
            random: true,
          },
        },
        detectRetina: true,
      }"
    />
  </div>
</template>

<style>
/* General styles for particles container */
#tsparticles {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1; /* Keep particles in the background */
  filter: blur(3px); /* Blur effect for particles */
}



/* Glow Effect for Text */
#title {
  color: #ffffff;
  font-size: 3rem;
  font-family: 'Arial', sans-serif;
  z-index: 1;
  text-shadow: 0 0 20px #ff6b6b, 0 0 40px #6b6bff, 0 0 60px #ffffff;
}
</style>