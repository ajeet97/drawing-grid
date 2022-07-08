<template>
  <div v-if="controls.squareBox">
    <slider
      @update="(val) => $emit('update', { size: val / 100 })"
      :defaultVal="Math.round(controls.size * 100)"
      :min="Math.round(limits.minSize * 100)"
      :max="Math.round(limits.maxSize * 100)"
    >
      Size
    </slider>
  </div>
  <div v-else>
    <slider
      @update="(val) => $emit('update', { rows: val })"
      :defaultVal="controls.rows"
      :min="limits.minRows"
      :max="limits.maxRows"
    >
      Rows
    </slider>
    <slider
      @update="(val) => $emit('update', { cols: val })"
      :defaultVal="controls.cols"
      :min="limits.minCols"
      :max="limits.maxCols"
    >
      Cols
    </slider>
  </div>

  <Switch
    @change="(checked) => $emit('update', { squareBox: checked })"
    id="square-grid"
    :checked="controls.squareBox"
  >
    Square Grid
  </Switch>
</template>

<script>
import { mapState } from "vuex";

import Slider from "./slider.vue";
import Switch from "./switch.vue";

export default {
  emits: ["update"],
  components: { Slider, Switch },
  computed: mapState(["controls", "limits"]),
};
</script>
