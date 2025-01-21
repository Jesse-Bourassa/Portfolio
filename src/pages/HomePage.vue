<script>
export default {
  data() {
    return {
      welcomeMessage: 'First Vue page!',
      counter: 0, //
    };
  },
  methods: {
    incrementCounter() {
      this.counter++;
    },
  },
};
</script>

<template>
  <div>
    <h1>{{ welcomeMessage }}</h1>
    <p>Counter: {{ counter }}</p>
    <button @click="incrementCounter">Increase Counter</button>
  </div>
</template>