import { createStore } from 'vuex'
import pick from 'lodash/pick'
import defaultsDeep from 'lodash/defaultsDeep'

import Renderer from './lib/Renderer'

function toPrecision(num, p = 1) {
  const x = Math.pow(10, p)
  const v = Math.round(num * x)
  return v / x
}

/** @returns {{[key: string]: value}} */
function loadState() {
  try {
    const state = JSON.parse(localStorage.getItem('state') || '{}')
    return state || {}
  } catch (err) {
    return {}
  }
}

function saveState(state) {
  localStorage.setItem('state', JSON.stringify(pick(state, [
    'theme',
    'controls.squareBox',
    'controls.lineColor',
    'controls.lineWidth',
    'controls.showGridNum',
    'controls.showPage',
    'controls.pageWidth',
    'controls.pageHeight',
  ])))
}

const store = createStore({
  state: () => defaultsDeep(loadState(), {
    theme: 'theme-1',
    totalThemes: 5,

    image: null,
    canvas: { width: 0, height: 0 },
    controls: {
      rows: 8,
      cols: 8,
      size: 0,
      squareBox: true,

      lineColor: '#000000',
      lineWidth: 1,

      showGridNum: true,
      gridNumOffset: 1,

      showPage: false,
      pageWidth: 21,
      pageHeight: 29,
    },
    limits: {
      minCols: 3,
      maxCols: 20,

      minSize: 0,
      minRows: 0,
      maxRows: 0,
      maxSize: 0,
    },

    reset: false,
    downloading: false,
  }),

  mutations: {
    changeTheme(state, theme) {
      state.theme = theme
      const html = document.querySelector('html')
      html.className = theme
      saveState(state)
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
      if (
        ('showPage' in controls)
        || ('pageWidth' in controls)
        || ('pageHeight' in controls)
      ) {
        controls.reset = true
      } else {
        controls.reset = false
      }

      state.controls = {
        ...state.controls,
        ...controls,
      }

      if (state.controls.squareBox) {
        state.controls.cols = toPrecision(1 / state.controls.size)
        state.controls.rows = toPrecision(state.canvas.height / (state.canvas.width * state.controls.size))
      } else {
        state.controls.size = 1 / state.controls.cols
      }

      saveState(state)

      // console.log(JSON.stringify(state.controls, null, 2))
      // console.log(JSON.stringify(state.limits, null, 2))
    },

    downloadImage(state) {
      state.downloading = true
      setImmediate(() => {
        const scale = state.image.width / state.canvas.width
        const s = 1 + (scale - 1) * 3 / 4
        const ls = 1 + (scale - 1) * 1 / 4

        const canvas = document.createElement('canvas')
        const r = new Renderer(canvas, {
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
        state.downloading = false
      })
    },
  }
})

export default store
