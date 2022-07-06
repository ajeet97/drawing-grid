<template>
  <div class="slider">
    <div class="label"><slot /></div>
    <input
      type="range"
      :min="min"
      :max="max"
      :step="step"
      :value="value"
      @input="handleInput"
    />
    <div class="value">{{ value }}{{ unit }}</div>
  </div>
</template>

<script>
export default {
  props: {
    min: { type: Number, default: 1 },
    max: { type: Number, default: 50 },
    step: { type: Number, default: 1 },
    defaultVal: { type: Number, default: 4 },
    unit: { type: String, default: "" },
  },

  emits: ["update"],

  data() {
    return {
      value: this.defaultVal,
    };
  },

  methods: {
    handleInput(event) {
      this.value = Number(event.target.value);
      this.$emit("update", this.value);
    },
  },
};
</script>

<style scoped>
.slider {
  display: flex;
  align-items: center;
  font-size: 20px;
  margin: 3px 0;
}

.slider .label {
  color: var(--color-1);
  padding: 5px 0;
  padding-right: 10px;
  width: 100px;
}

.slider .value {
  color: var(--color-1);
  padding: 5px 0;
  padding-left: 10px;
  width: 80px;
}

.slider input {
  appearance: none;
  width: 100%;
  height: 8px;
  background: var(--color-1);
  border-radius: 5px;
  outline: none;
}
.slider input::-webkit-slider-thumb {
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: var(--color-2);
}

.slider input::-moz-range-thumb {
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: var(--color-2);
}
</style>
