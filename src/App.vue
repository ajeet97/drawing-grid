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
  mounted() {
    this.$store.commit('changeTheme', this.$store.state.theme)
  }
};
</script>

<style>
/* add more themes */
:root, :root.theme-1 {
  --color-1: #05386b;
  --color-2: #379683;
  --color-3: #5cdb95;
  --color-4: #8ee4af;
  --color-5: #edf5e1;
}

:root.theme-2 {
  --color-1: #2e1114;
  --color-2: #501b1d;
  --color-3: #64485c;
  --color-4: #83677b;
  --color-5: #adadad;
}

:root.theme-3 {
  --color-1: #5d001e;
  --color-2: #9a1750;
  --color-3: #ee4c7c;
  --color-4: #e3afbc;
  --color-5: #e3e2df;
}

:root.theme-4 {
  --color-1: #0b0c10;
  --color-2: #1f2833;
  --color-3: #c5c6c7;
  --color-4: #45a29e;
  --color-5: #66fcf1;
}

:root.theme-5 {
  /* --color-1: #e7717d; */
  --color-1: #50392b;
  --color-2: #7e685a;
  --color-3: #c2b9b0;
  --color-4: #c2cad0;
  --color-5: #ffffff;
  /* --color-5: #afd275; */
}

* {
  box-sizing: border-box;
  color: var(--color-1);
}

html,
body {
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
