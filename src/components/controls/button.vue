<template>
  <div class="btn ripple" ontouchstart="">
    <img
      v-if="icon"
      :class="{ loading }"
      :src="loading ? iconLoading : icon"
      :style="`width: ${iconSize}; height: ${iconSize};`"
    />
    <template v-else>-</template>
  </div>
</template>

<script>
import iconLoading from "../../assets/loading.png";

export default {
  props: {
    icon: String,
    iconSize: {
      type: String,
      default: "50%",
    },
    loading: Boolean,
  },

  data: () => ({ iconLoading }),
};
</script>

<style scoped>
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--color-1);
  color: var(--color-5);
  cursor: pointer;
}

.ripple, .ripple:hover {
  background-position: center;
  background: var(--color-1)
    radial-gradient(circle, transparent 1%, var(--color-1) 1%) center/15000%;
  transition: background 0.4s ease-out;
}

.ripple:active {
  background-color: rgba(255, 255, 255, 0.5);
  background-size: 100%;
  transition: background 0s ease-out;
}

.btn img.loading {
  animation: rotate 1s infinite linear;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

@media (max-width: 1024px) {
  .btn {
    cursor: default;
  }
}
</style>
