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

      minRows: 0,
      maxRows: 0,
      maxCols: 0,
      minSize: 0,
      maxSize: 0,
    },
  }),

  mutations: {
    updateImage(state, image) {
      state.image = image
    },

    updateLimits(state) {
      state.limits.minSize = Math.round(state.canvas.width * 0.05)
      state.limits.maxSize = Math.round(state.canvas.width / state.limits.minCols)

      state.limits.maxCols = Math.round(state.canvas.width / state.limits.minSize)
      state.limits.minRows = Math.round(state.canvas.height / state.limits.maxSize)
      state.limits.maxRows = Math.round(state.canvas.height / state.limits.minSize)

      state.controls.size = Math.round(state.canvas.width / state.controls.cols)
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
        state.controls.cols = toPrecision(state.canvas.width / state.controls.size)
        state.controls.rows = toPrecision(state.canvas.height / state.controls.size)
      } else {
        state.controls.size = toPrecision(state.canvas.width / state.controls.cols)
      }

      // console.log(JSON.stringify(state.controls, null, 2))
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
