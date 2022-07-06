<template>
  <div class="controls">
    <div class="container">
      <div v-if="$store.state.controls.squareBox">
        <div class="info">Rows: {{ $store.state.controls.rows }}</div>
        <div class="info">Cols: {{ $store.state.controls.cols }}</div>
        <slider
          @update="(val) => update({ size: val })"
          :defaultVal="$store.state.controls.size"
          :min="$store.state.minSize"
          :max="$store.state.maxSize"
        >
          Size
        </slider>
      </div>
      <div v-else>
        <slider
          @update="(val) => update({ rows: val })"
          :defaultVal="$store.state.controls.rows"
          :min="2"
          :max="$store.state.maxRows"
        >
          Rows
        </slider>
        <slider
          @update="(val) => update({ cols: val })"
          :defaultVal="$store.state.controls.cols"
          :min="2"
          :max="$store.state.maxCols"
        >
          Cols
        </slider>
      </div>
      <slider
        @update="(val) => update({ lineWidth: val })"
        :defaultVal="$store.state.controls.lineWidth"
        :max="10"
      >
        Line
      </slider>
      <Switch
        @change="(checked) => update({ squareBox: checked })"
        :checked="$store.state.controls.squareBox"
      >
        Square Grid
      </Switch>
      <div class="btn-grp">
        <Button :icon="iconNew" @click="$store.commit('removeImage')">New</Button>
        <Button :icon="iconDownload" @click="$store.commit('downloadImage')">Download</Button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "./button.vue";
import Slider from "./slider.vue";
import Switch from "./switch.vue";

import iconDownload from "../assets/download.png";
import iconNew from "../assets/new.png";

export default {
  components: {
    Button,
    Slider,
    Switch,
  },

  data: () => ({ iconDownload, iconNew }),

  methods: {
    update(controls) {
      this.$store.commit("updateControls", controls);
    },
  },
};
</script>

<style scoped>
.controls {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 30px 0;
  background: var(--color-3);
  color: var(--color-2);
  display: flex;
  align-items: center;
  justify-content: center;
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
  column-gap: 10px;
  margin-top: 10px;
}
</style>
