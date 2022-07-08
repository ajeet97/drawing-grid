import store from '../store'

class Renderer {
  /**
   * @param {HTMLCanvasElement} canvas
   * @param {object} controls
   */
  constructor(canvas, controls) {
    if (!canvas) return
    this.c = canvas
    this.ctx = canvas.getContext('2d')
    this.ctx.imageSmoothingEnabled = true;
    this.controls = store.state.controls
    this.overrideControls = controls || {}

    this.grid = {
      w: 0, h: 0,
      cols: 0, rows: 0,
    }
  }

  get image() {
    return store.state.image
  }

  setupCanvas(preview = false) {
    if (!this.image) return

    if (!preview) {
      this.c.width = this.image.width
      this.c.height = this.image.height
      return;
    }

    const r = this.image.height / this.image.width;
    const maxWidth = (this.c.parentElement && this.c.parentElement.clientWidth) || this.image.width;
    const maxHeight = (this.c.parentElement && this.c.parentElement.clientHeight) || this.image.height;

    this.c.height = r * maxWidth > maxHeight ? maxHeight : r * maxWidth;
    this.c.width = this.c.height / r;
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
    this.ctx.drawImage(this.image, 0, 0, this.c.width, this.c.height);
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
    const fontSize = Math.round(this.controls.gridNumSize * Math.log2(this.controls.size * 40))
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

  render() {
    if (!this.image) return
    this.controls = {
      ...store.state.controls,
      ...this.overrideControls,
    }

    this.ctx.clearRect(0, 0, this.c.width, this.c.height);
    this.computeGrid();
    this.drawImage();
    this.drawGrid();
    if (this.controls.showGridNum) this.drawGridNumber();
  }
}

export default Renderer;
