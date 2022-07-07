<template>
  <select @change="handleChange" :value="$store.state.theme">
    <option
      v-for="i in $store.state.totalThemes"
      :key="i"
      :value="`theme-${i}`"
    >
      {{ `Theme ${i}` }}
    </option>
  </select>
</template>

<script>
export default {
  methods: {
    handleChange(e) {
      this.$store.commit("changeTheme", e.target.value);
    },
  },
};
</script>

<style scoped>
select {
  position: fixed;
  top: 0;
  right: 0;
}
</style>
