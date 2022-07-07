<template>
  <div class="controls">
    <div class="container">
      <div v-if="controls.squareBox">
        <div class="info">Rows: {{ controls.rows }}</div>
        <div class="info">Cols: {{ controls.cols }}</div>
        <slider
          @update="(val) => update({ size: val })"
          :defaultVal="controls.size"
          :min="limits.minSize"
          :max="limits.maxSize"
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
      <Switch
        @change="(checked) => update({ squareBox: checked })"
        :checked="controls.squareBox"
      >
        Square Grid
      </Switch>
      <div class="btn-grp">
        <Button :icon="iconNew" @click="$store.commit('removeImage')">
          New
        </Button>
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
