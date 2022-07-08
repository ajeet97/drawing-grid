<template>
  <div class="controls">
    <div class="container">
      <div v-if="controls.squareBox">
        <div class="info">Rows: {{ controls.rows }}</div>
        <div class="info">Cols: {{ controls.cols }}</div>
        <slider
          @update="(val) => update({ size: val / 100 })"
          :defaultVal="Math.round(controls.size * 100)"
          :min="Math.round(limits.minSize * 100)"
          :max="Math.round(limits.maxSize * 100)"
        >
          Size
        </slider>
      </div>
      <div v-else>
        <slider
          @update="(val) => update({ rows: val })"
          :defaultVal="controls.rows"
          :min="limits.minRows"
          :max="limits.maxRows"
        >
          Rows
        </slider>
        <slider
          @update="(val) => update({ cols: val })"
          :defaultVal="controls.cols"
          :min="limits.minCols"
          :max="limits.maxCols"
        >
          Cols
        </slider>
      </div>
      <slider
        @update="(val) => update({ lineWidth: val })"
        :defaultVal="controls.lineWidth"
        :max="10"
      >
        Line
      </slider>
      <div class="btn-grp">
        <Switch
          @change="(checked) => update({ squareBox: checked })"
          id="square-grid"
          :checked="controls.squareBox"
        >
          Square Grid
        </Switch>
        <color-picker
          @change="(lineColor) => update({ lineColor })"
          :defaultColor="controls.lineColor"
        >
          Grid Color
        </color-picker>
        <Switch
          @change="(checked) => update({ showGridNum: checked })"
          id="grid-number"
          :checked="controls.showGridNum"
        >
          Grid Number
        </Switch>
      </div>
      <div class="btn-grp">
        <Button :icon="iconNew" @click="$emit('new')">New</Button>
        <Button :icon="iconDownload" @click="$store.commit('downloadImage')">
          Download
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import Button from "./button.vue";
import ColorPicker from "./color-picker.vue";
import Slider from "./slider.vue";
import Switch from "./switch.vue";

import iconDownload from "../assets/download.png";
import iconNew from "../assets/new.png";

export default {
  emits: ["new"],

  components: {
    Button,
    ColorPicker,
    Slider,
    Switch,
  },

  data: () => ({ iconDownload, iconNew }),

  computed: mapState(["controls", "limits"]),

  methods: {
    update(controls) {
      this.$store.commit("updateControls", controls);
    },
  },
};
</script>

<style scoped>
.controls {
  width: 100%;
  padding: 8px 10px;
  background: var(--color-3);
  color: var(--color-2);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 -2px 10px var(--color-2);
  z-index: 1;
}

.controls * {
  color: var(--color-2);
}

.info {
  font-size: 18px;
}

.controls .container {
  width: 95%;
  padding: 10px;
}

.btn-grp {
  display: flex;
  flex-wrap: wrap;
  column-gap: 10px;
  margin-top: 15px;
}

.btn-grp > div {
  width: 50%;
  margin-top: 8px;
}
</style>
