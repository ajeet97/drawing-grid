<template>
  <div class="color-picker" @click="pickColor">
    <input
      ref="picker"
      id="color"
      type="color"
      style="visibility: hidden; width: 0"
      :value="color"
      @change="handleColorChange"
    />
    <div class="box" :style="`background: ${color}`" />
    <div class="text"><slot>Color</slot></div>
  </div>
</template>

<script>
export default {
  emits: ["change"],
  props: {
    defaultColor: { type: String, default: "#FFF" },
  },
  data() {
    return { color: this.defaultColor };
  },
  methods: {
    pickColor() {
      this.$refs.picker.click();
    },

    handleColorChange(event) {
      this.color = event.target.value;
      this.$emit("change", this.color);
    },
  },
  watch: {
    defaultColor() {
      this.color = this.defaultColor;
    },
  },
};
</script>

<style scoped>
.color-picker {
  display: flex;
  flex-direction: row;
  height: 100%;
}

.color-picker .box {
  width: 30px;
  height: 30px;
  border-radius: 5px;
}

.color-picker .text {
  user-select: none;
  font-size: var(--font-normal);
  line-height: 28px;
  margin-left: 10px;
}
</style>
