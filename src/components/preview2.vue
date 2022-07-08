<template>
  <div class="preview">
    <canvas ref="canvas" />
  </div>
</template>

<script>
import Renderer from "../lib/Renderer";

export default {
  emits: ["change"],

  data: () => ({
    r: new Renderer(null, null, true),
    c: null,
    ctx: null,
    grid: {
      w: 0,
      h: 0,
      cols: 0,
      rows: 0,
    },
  }),

  mounted() {
    this.r = new Renderer(this.$refs.canvas, {}, true);
    window.addEventListener("resize", this.reset);
    this.reset();
  },

  methods: {
    render() {
      this.r.render();
    },

    reset() {
      this.r.setupCanvas();
      this.r.reset();
      this.render();
    },

    // invertRow(imageData, row, lineWidth = 1) {
    //   row = Math.round(row)
    //   const rowSize = imageData.width * 4;
    //   const half = Math.floor(lineWidth / 2);
    //   for (let line = 0; line < lineWidth; line++) {
    //     const x = row * rowSize + line * rowSize - half * rowSize;
    //     for (let i = 0; i < rowSize; i += 4) {
    //       imageData.data[x + i] = 255 - imageData.data[x + i]; // R
    //       imageData.data[x + i + 1] = 255 - imageData.data[x + i + 1]; // G
    //       imageData.data[x + i + 2] = 255 - imageData.data[x + i + 2]; // B
    //     }
    //   }
    // },
  },

  watch: {
    "$store.state.image": function () {
      this.reset();
    },

    "$store.state.controls": function () {
      this.render();
    },
  },
};
</script>

<style scoped>
.preview {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-4);
}
</style>
