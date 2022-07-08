<template>
  <slider
    @update="(val) => $emit('update', { pageWidth: val })"
    :defaultVal="controls.pageWidth"
    :min="5"
    :max="100"
    unit="cm"
  >
    Width
  </slider>
  <slider
    @update="(val) => $emit('update', { pageHeight: val })"
    :defaultVal="controls.pageHeight"
    :min="5"
    :max="100"
    unit="cm"
  >
    Height
  </slider>
  <Switch
    @change="(checked) => $emit('update', { showPage: checked })"
    id="show-page"
    :checked="controls.showPage"
  >
    Show Page
  </Switch>
</template>

<script>
import { mapState } from "vuex";

import Slider from "./slider.vue";
import Switch from "./switch.vue";

export default {
  emits: ["update"],
  components: { Slider, Switch },
  computed: mapState(["controls"]),
};
</script>
