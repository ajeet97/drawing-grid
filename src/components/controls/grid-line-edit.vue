<template>
  <slider
    @update="(val) => $emit('update', { lineWidth: val })"
    :defaultVal="controls.lineWidth"
    :max="10"
  >
    Line
  </slider>
  <div class="grp">
    <Switch
      @change="(checked) => $emit('update', { showGridNum: checked })"
      id="grid-number"
      :checked="controls.showGridNum"
    >
      Grid Number
    </Switch>
    <color-picker
      @change="(lineColor) => $emit('update', { lineColor })"
      :defaultColor="controls.lineColor"
    >
      Grid Color
    </color-picker>
  </div>
</template>

<script>
import { mapState } from "vuex";

import ColorPicker from "./color-picker.vue";
import Slider from "./slider.vue";
import Switch from "./switch.vue";

export default {
  emits: ["update"],
  components: { ColorPicker, Slider, Switch },
  computed: mapState(["controls"]),
};
</script>

<style scoped>
.grp {
  display: flex;
  flex-wrap: wrap;
  column-gap: 10px;
  margin-top: 15px;
  align-items: center;
  justify-content: center;
}

.grp > div {
  width: calc(50% - 5px);
  margin-top: 8px;
}
</style>
