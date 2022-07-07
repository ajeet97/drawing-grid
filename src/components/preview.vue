<template>
  <div style="width: 100%">
    <canvas ref="canvas" width="100%" />
  </div>
</template>

<script>
import Renderer from '../lib/Renderer'

export default {
  emits: ["change"],

  data: () => ({
    r: null,
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
    this.r = new Renderer(this.$refs.canvas);
    const onResize = () => {
      this.setup();
      this.render();
    }
    window.addEventListener("resize", onResize);
    onResize();
  },

  methods: {
    setup() {
      this.r.setupCanvas(false)
      this.$store.commit('resizeCanvas', {
        width: this.r.c.width,
        height: this.r.c.height,
      })
    },

    render() {
      this.r.render()
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
    '$store.state.controls': function() {
      this.render();
    },
  },
};
</script>
