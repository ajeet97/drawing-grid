<template>
  <div class="select-button" ontouchstart="" @click="selectImage">
    <slot>Select</slot>
  </div>
  <input
    ref="fileInput"
    type="file"
    style="display: none"
    accept="image/jpeg, image/png"
    @change="handleFileChange"
  />
</template>

<script>
export default {
  emits: ['change'],

  methods: {
    selectImage() {
      this.$refs.fileInput.click();
    },

    readImageFile(file) {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = e => resolve(e.target.result)
        reader.onerror = (err) => {
          alert('Could not read image file: ' + err.message)
          resolve(null)
        }
        reader.readAsDataURL(file)
      })
    },

    async loadImage(file) {
      const dataUrl = await this.readImageFile(file)
      if (!dataUrl) return null

      return new Promise((resolve) => {
        const image = new Image()
        image.onload = () => resolve(image)
        image.onerror = (err) => {
          alert('Could not load image: ' + err.message)
          resolve(null)
        }
        image.src = dataUrl
      })
    },

    async handleFileChange(event) {
      const [file] = event.target.files;
      const image = file
        ? await this.loadImage(file)
        : null;
      this.$emit('change', image)
    }
  },
};
</script>

<style scoped>
.select-button {
  width: 100%;
  height: 100%;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  background: var(--color-3);
  color: var(--color-5);
  font-size: 50px;
  font-weight: bold;
  user-select: none;
  cursor: pointer;
  transition: all 0.2s;
}

.select-button:active {
  background: var(--color-2);
}

@media (max-width: 1024px) {
  .select-button {
    cursor: default;
  }
}
</style>
