<template>
  <div class="btn" :style="`width: ${width};`">
    <img v-if="icon" :src="icon" />
    <span><slot>Click Me</slot></span>
  </div>
</template>

<script>
export default {
  props: {
    icon: String,
    width: {
      type: String,
      default: "fit-content",
    },
  },
};
</script>

<style scoped>
.btn {
  flex: 1;
  background: var(--color-2);
  font-size: var(--font-normal);
  height: 50px;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
  transition: 0.2s;
  display: flex;
  column-gap: 5px;
  justify-content: center;
  align-items: center;
}

.btn span {
  color: var(--color-5) !important;
}

.btn:active {
  background: var(--color-1)
}

.btn img {
  width: 22px;
}

@media (max-width: 1024px) {
  .btn {
    cursor: default;
  }
}
</style>
