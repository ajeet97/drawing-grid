<template>
  <div class="container left">
    <Button :icon="iconPageSize" @click="toggleControls('page')" />
    <Button :icon="iconLineWidth" @click="toggleControls('line')" />
    <Button :icon="iconGridSizeEdit" @click="toggleControls('grid')" />
  </div>
  <div class="container right">
    <Button :icon="iconNew" @click="$emit('new')" />
    <Button
      :icon="iconDownload"
      :loading="downloading"
      @click="$store.commit('downloadImage')"
    />
  </div>
  <div class="overlay">
    <div ref="controls" class="controls">
      <div class="close" @click="closeControls"><img :src="iconDown" /></div>

      <grid-size-edit v-if="activeControls === 'grid'" @update="update" />
      <grid-line-edit v-else-if="activeControls === 'line'" @update="update" />
      <page-size-edit v-else-if="activeControls === 'page'" @update="update" />
      <b v-else style="color: var(--color-5); font-size: var(--font-large)">
        Coming Soon
      </b>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import Button from "./button.vue";

import GridSizeEdit from "./grid-size-edit.vue";
import GridLineEdit from "./grid-line-edit.vue";
import PageSizeEdit from "./page-size-edit.vue";

import iconPageSize from "../../assets/page-size.png";
import iconLineWidth from "../../assets/line-width.png";
import iconGridSizeEdit from "../../assets/grid-edit.png";
import iconDownload from "../../assets/download.png";
import iconNew from "../../assets/new.png";
import iconDown from "../../assets/down.png";

export default {
  emits: ["new"],

  components: {
    Button,
    GridSizeEdit,
    GridLineEdit,
    PageSizeEdit,
  },

  computed: mapState(["downloading", "controls", "limits"]),

  data: () => ({
    iconPageSize,
    iconLineWidth,
    iconGridSizeEdit,
    iconDownload,
    iconNew,
    iconDown,

    activeControls: "",
    showingControls: false,
  }),

  methods: {
    update(controls) {
      this.$store.commit("updateControls", controls);
    },

    toggleControls(activeControls) {
      this.activeControls = activeControls;
      if (this.showingControls) this.closeControls();
      else this.openControls();
    },

    openControls() {
      const c = this.$refs.controls;
      c.parentElement.style.visibility = "visible";
      c.style.visibility = "visible";
      setTimeout(() => {
        c.style.bottom = "0";
        c.style.opacity = "1";
        this.showingControls = true;
      }, 10)
    },

    closeControls() {
      const c = this.$refs.controls;
      c.style.bottom = "-200px";
      c.opacity = "0";
      setTimeout(() => {
        c.parentElement.style.visibility = "hidden";
        c.style.visibility = "hidden";
        this.showingControls = false;
      }, 300);
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  position: fixed;
  bottom: 20px;
}

.container.left {
  left: 20px;
}

.container.right {
  right: 20px;
}

.overlay {
  visibility: hidden;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  transition: all 0s;
}

.controls {
  visibility: hidden;
  position: fixed;
  opacity: 0;
  bottom: -200px;
  width: 100%;
  z-index: 99;
  background: var(--color-3);
  padding: 30px 20px;
  color: var(--color-2);
  box-shadow: 0 -2px 10px var(--color-2);

  transition: visibility 0s, bottom .3s ease-out, opacity .3s ease-out;
}

.controls .close {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 40px;
  background: var(--color-3);
  padding: 2px 10px;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
}

.controls .close img {
  width: 30px;
  height: 30px;
}

.controls * {
  color: var(--color-2);
}

.info {
  font-size: var(--font-small);
}

@media (max-width: 1024px) {
  .controls .close {
    cursor: default;
  }
}
</style>
