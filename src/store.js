import { createStore } from 'vuex'
import pick from 'lodash/pick'

import Renderer from './lib/Renderer'

function toPrecision(num, p = 1) {
  const x = Math.pow(10, p)
  const v = Math.round(num * x)
  return v / x
}

function loadTheme() {
  return localStorage.getItem('theme') || 'theme-1'
}

function saveTheme(theme) {
  localStorage.setItem('theme', theme)
}

/** @returns {{[key: string]: value}} */
function loadControls() {
  try {
    const controls = JSON.parse(localStorage.getItem('controls') || '{}')
    return controls || {}
  } catch (err) {
    return {}
  }
}

function saveControls(controls) {
  localStorage.setItem('controls', JSON.stringify(controls))
}

const store = createStore({
  state: () => ({
    theme: loadTheme(),
    totalThemes: 5,

    image: null,
    canvas: { width: 0, height: 0 },
    controls: {
      rows: 8,
      cols: 8,
      size: 0,
      squareBox: true,
      lineColor: '#FFFFFF',
      lineWidth: 1,
      showGridNum: true,
      gridNumSize: 9,
      gridNumOffset: 1,
      ...loadControls(),
    },
    limits: {
      minCols: 3,
      maxCols: 20,

      minSize: 0,
      minRows: 0,
      maxRows: 0,
      maxSize: 0,
    },
  }),

  mutations: {
    changeTheme(state, theme) {
      state.theme = theme
      const html = document.querySelector('html')
      html.className = theme
      saveTheme(theme)
    },

    updateImage(state, image) {
      state.image = image
    },

    updateLimits(state) {
      state.limits.minSize = 1 / state.limits.maxCols
      state.limits.maxSize = 1 / state.limits.minCols

      const minSizePx = state.canvas.width * state.limits.minSize
      const maxSizePx = state.canvas.width * state.limits.maxSize

      state.limits.minRows = Math.round(state.canvas.height / maxSizePx)
      state.limits.maxRows = Math.round(state.canvas.height / minSizePx)

      state.controls.size = 1 / state.controls.cols
      state.controls.gridNumSize = 4 * state.canvas.width / 374
    },

    reset(state, { width, height }) {
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

      saveControls(pick(state.controls, [
        'squareBox',
        'lineColor',
        'lineWidth',
        'showGridNum',
      ]))

      // console.log(JSON.stringify(state.controls, null, 2))
      // console.log(JSON.stringify(state.limits, null, 2))
    },

    downloadImage(state) {
      const scale = state.image.width / state.canvas.width
      const s = 1 + (scale - 1) * 3 / 4
      const ls = 1 + (scale - 1) * 1 / 4

      const canvas = document.createElement('canvas')
      const r = new Renderer(canvas, {
        gridNumSize: state.controls.gridNumSize * s,
        gridNumOffset: state.controls.gridNumOffset * s,
        lineWidth: state.controls.lineWidth * ls,
      })
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
