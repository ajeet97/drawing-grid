import defaultsDeep from 'lodash/defaultsDeep'

import store from '../store'

class Renderer {
  /**
   * @param {HTMLCanvasElement} canvas
   * @param {object} controls
   */
  constructor(canvas, controls, preview = false) {
    if (!canvas) return
    this.c = canvas
    this.ctx = canvas.getContext('2d')
    this.ctx.imageSmoothingEnabled = true;
    this.controls = store.state.controls
    this.overrideControls = controls || {}
    this.preview = preview

    this.grid = {
      w: 0, h: 0,
      cols: 0, rows: 0,
    }
    this.imageCoord = {
      x: 0, y: 0,
      w: 0, h: 0,
    }
  }

  get image() {
    return store.state.image
  }

  get showPage() {
    return this.controls.showPage && this.page.width && this.page.height
  }

  get page() {
    return { width: this.controls.pageWidth, height: this.controls.pageHeight }
  }

  calcOriginalDimensions() {
    const imgRatio = this.image.height / this.image.width
    const pageRatio = this.showPage ? this.page.height / this.page.width : imgRatio

    if (imgRatio < pageRatio) {
      this.c.width = this.image.width
      this.c.height = pageRatio * this.c.width
    } else {
      this.c.height = this.image.height
      this.c.width = this.c.height / pageRatio
    }
    this.calcImageCoord()
  }

  calcPreviewDimensions() {
    const { width, height } = this.showPage ? this.page : this.image
    const r = height / width;
    const maxWidth = (this.c.parentElement && this.c.parentElement.clientWidth) || width;
    const maxHeight = (this.c.parentElement && this.c.parentElement.clientHeight) || height;

    this.c.height = r * maxWidth > maxHeight ? maxHeight : r * maxWidth;
    this.c.width = this.c.height / r;
    this.calcImageCoord()
  }

  calcImageCoord() {
    const r = this.c.height / this.c.width
    const imgR = this.image.height / this.image.width

    if (imgR < r) {
      this.imageCoord.w = this.c.width
      this.imageCoord.h = imgR * this.c.width
      this.imageCoord.x = 0
      this.imageCoord.y = (this.c.height - this.imageCoord.h) / 2
    } else {
      this.imageCoord.w = this.c.height / imgR
      this.imageCoord.h = this.c.height
      this.imageCoord.x = (this.c.width - this.imageCoord.w) / 2
      this.imageCoord.y = 0
    }
  }

  setupCanvas() {
    if (!this.image) return

    if (this.preview) this.calcPreviewDimensions()
    else this.calcOriginalDimensions()
  }

  reset() {
    store.commit('reset', {
      width: this.c.width,
      height: this.c.height
    })
  }

  computeGrid() {
    if (this.controls.cols) {
      this.grid.w = this.c.width / this.controls.cols;
      this.grid.cols = this.controls.cols;
    }

    if (this.controls.rows) {
      this.grid.h = this.c.height / this.controls.rows;
      this.grid.rows = this.controls.rows;
    }

    if (!this.controls.rows && !this.controls.cols) {
      throw new Error("Either rows or columns must be set");
    }
  }

  drawImage() {
    this.ctx.drawImage(
      this.image,
      this.imageCoord.x, this.imageCoord.y,
      this.imageCoord.w, this.imageCoord.h,
    );
  }

  drawGrid() {
    this.ctx.strokeStyle = this.controls.lineColor;
    this.ctx.lineWidth = this.controls.lineWidth;
    this.ctx.beginPath();

    for (let i = 1; i < this.grid.rows; i++) {
      this.ctx.moveTo(0, i * this.grid.h);
      this.ctx.lineTo(this.c.width, i * this.grid.h);
    }

    for (let i = 1; i < this.grid.cols; i++) {
      this.ctx.moveTo(i * this.grid.w, 0);
      this.ctx.lineTo(i * this.grid.w, this.c.height);
    }

    this.ctx.stroke();
  }

  drawGridNumber() {
    const gridNumSize = 4 * this.c.width / 374

    const fontSize = Math.round(gridNumSize * Math.log2(this.controls.size * 40))
    const halfLine = Math.round(this.controls.lineWidth / 2)
    const offset = this.controls.gridNumOffset

    this.ctx.fillStyle = this.controls.lineColor
    this.ctx.font = `${fontSize}px Arial`
    this.ctx.textAlign = 'left'
    this.ctx.textBaseline = 'top';

    for (let r = 0; r < this.grid.rows; r++) {
      for (let c = 0; c < this.grid.cols; c++) {
        const dx = c === 0 ? 0 : 0 + halfLine
        const dy = r === 0 ? 0 : 0 + halfLine
        this.ctx.fillText(`${r + 1},${c + 1}`, c * this.grid.w + dx + offset, r * this.grid.h + dy + offset)
      }
    }
  }

  drawPage() {
    this.ctx.fillStyle = '#F5F5F5'
    this.ctx.fillRect(0, 0, this.c.width, this.c.height)
  }

  render() {
    if (!this.image) return
    this.controls = defaultsDeep({}, this.overrideControls, store.state.controls)

    if (this.controls.reset) {
      this.setupCanvas()
      this.reset()
      this.controls.reset = false;
    }

    this.ctx.clearRect(0, 0, this.c.width, this.c.height);
    this.computeGrid();
    if (this.showPage) this.drawPage();
    this.drawImage();
    this.drawGrid();
    if (this.controls.showGridNum) this.drawGridNumber();
  }
}

export default Renderer;
