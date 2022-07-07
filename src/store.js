import { createStore } from 'vuex'

import Renderer from './lib/Renderer'

function toPrecision(num, p = 1) {
  const x = Math.pow(10, p)
  const v = Math.round(num * x)
  return v / x
}

const store = createStore({
  state: () => ({
    image: null,
    canvas: null,
    controls: {
      rows: 8,
      cols: 8,
      size: 0,
      squareBox: true,
      lineColor: '#FFFFFF',
      lineWidth: 2,
    },
    limits: {
      minCols: 3,
      minSize: 0.05,

      minRows: 0,
      maxRows: 0,
      maxCols: 0,
      maxSize: 0,
    },
  }),

  mutations: {
    updateImage(state, image) {
      state.image = image
    },

    updateLimits(state) {
      state.limits.maxSize = 1 / state.limits.minCols

      const minSizePx = Math.round(state.canvas.width * state.limits.minSize)
      const maxSizePx = Math.round(state.canvas.width * state.limits.maxSize)

      state.limits.maxCols = Math.round(state.canvas.width / minSizePx)
      state.limits.minRows = Math.round(state.canvas.height / maxSizePx)
      state.limits.maxRows = Math.round(state.canvas.height / minSizePx)

      // state.controls.size = Math.round(state.canvas.width / state.controls.cols)
      state.controls.size = 1 / state.controls.cols
    },

    resizeCanvas(state, { width, height }) {
      state.canvas = { width, height }
      this.commit('updateLimits')
      this.commit('updateControls', {})
    },

    updateControls(state, controls) {
      state.controls = {
        ...state.controls,
        ...controls,
      }

      if (state.controls.squareBox) {
        state.controls.cols = toPrecision(1 / state.controls.size)
        state.controls.rows = toPrecision(state.canvas.height / (state.canvas.width * state.controls.size))
      } else {
        // state.controls.size = toPrecision(state.canvas.width / state.controls.cols)
        state.controls.size = 1 / state.controls.cols
      }

      // console.log(JSON.stringify(state.controls, null, 2))
      // console.log(JSON.stringify(state.limits, null, 2))
    },

    downloadImage() {
      const canvas = document.createElement('canvas')
      const r = new Renderer(canvas)
      r.setupCanvas()
      r.render()

      const dataUrl = r.c.toDataURL('image/png');
      const a = document.createElement('a')
      a.href = dataUrl
      a.download = 'download.png'
      a.click()
    },
  }
})

export default store
