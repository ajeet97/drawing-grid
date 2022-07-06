import store from '../store'

class Renderer {
  constructor(canvas) {
    if (!canvas) return
    this.c = canvas
    this.ctx = canvas.getContext('2d')
    this.ctx.imageSmoothingEnabled = true;

    this.grid = {
      w: 0, h: 0,
      cols: 0, rows: 0,
    }
  }

  get image() {
    return store.state.image
  }

  get controls() {
    return store.state.controls
  }

  setupCanvas(original = true) {
    if (!this.image) return

    const r = this.image.height / this.image.width;
    const maxWidth = (this.c.parentElement && this.c.parentElement.clientWidth) || this.image.width;

    this.c.width = original ? this.image.width : maxWidth;
    this.c.height = r * this.c.width;
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

  render() {
    if (!this.image) return
    this.ctx.clearRect(0, 0, this.c.width, this.c.height);
    this.computeGrid();
    this.drawImage();
    this.drawGrid();
  }
}

export default Renderer;
