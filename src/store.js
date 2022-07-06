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
      size: 50,
      squareBox: false,
      lineColor: '#FFFFFF',
      lineWidth: 2,
    },
    maxRows: 0,
    maxCols: 0,
    minSize: 20,
    maxSize: 200,
  }),

  mutations: {
    setImage(state, image) {
      state.image = image
    },

    removeImage(state) {
      state.image = null
    },

    updateMaxLimits(state) {
      state.maxCols = Math.round(state.canvas.width / state.minSize)
      state.maxRows = Math.round(state.canvas.height / state.minSize)
    },

    setPreviewDimensions(state, { width, height }) {
      if (!state.canvas) {
        state.canvas = { width, height }
        this.commit('updateControls', {})
        this.commit('updateMaxLimits')
      } else {
        state.canvas = { width, height }
      }
    },

    updateControls(state, controls) {
      state.controls = {
        ...state.controls,
        ...controls,
      }

      if (state.controls.squareBox) {
        state.controls.cols = toPrecision(state.canvas.width / state.controls.size)
        state.controls.rows = toPrecision(state.canvas.height / state.controls.size)
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
