<template>
    <div class="spacer" :style="{ height: height }"></div>
  </template>
  
  <script>
  export default {
    name: "Spacer",
    props: {
      height: {
        type: String,
        default: "20vh",
      },
    },
  };
  </script>
  
  <style scoped>
  .spacer {
    width: 100%;
  }
  </style>
  