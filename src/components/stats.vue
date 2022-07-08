<template>
  <div class="stats">
    <div class="row">
      <div class="info">Rows: {{ controls.rows }}</div>
      <div class="info">Cols: {{ controls.cols }}</div>
    </div>
    <template v-if="controls.showPage">
      <div v-if="controls.squareBox" class="info row">
        Size: {{ pageGridWidth }} cm
      </div>
      <div class="row" v-else>
        <div class="info">Width: {{ pageGridWidth }} cm</div>
        <div class="info">Height: {{ pageGridHeight }} cm</div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";

function toPrecision(num, p = 1) {
  const x = Math.pow(10, p);
  const v = Math.round(num * x);
  return v / x;
}

export default {
  computed: {
    ...mapState(["controls"]),
    pageGridWidth() {
      return toPrecision(this.controls.pageWidth / this.controls.cols);
    },
    pageGridHeight() {
      return toPrecision(this.controls.pageHeight / this.controls.rows);
    },
  },
};
</script>

<style scoped>
* {
  color: var(--color-5);
}

.stats {
  position: fixed;
  top: 0;
  left: 0;
  padding: 10px 15px;
  border-radius: 2px;
  background: var(--color-3);
}

.info {
  font-size: var(--font-small);
}

.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  column-gap: 10px;
}
</style>
