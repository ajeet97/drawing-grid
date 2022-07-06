<template>
  <home />
</template>

<script>
import home from "./views/home.vue";

export default {
  name: "App",
  components: {
    home,
  },
};
</script>

<style>
/* add more themes */
:root {
  --color-1: #05386B;
  --color-2: #379683;
  --color-3: #5CDB95;
  --color-4: #8EE4AF;
  --color-5: #EDF5E1;
}

* {
  box-sizing: border-box;
  color: var(--color-1);
}

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background: var(--color-3);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}
</style>
