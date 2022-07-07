<template>
  <select-image ref="image" @change="updateImage" :visible="!$store.state.image">
    Select<br />Image
  </select-image>
  <div class="home" v-if="!!$store.state.image">
    <preview />
    <controls @new="selectImage"/>
  </div>
</template>

<script>
import Preview from "../components/preview.vue";
import SelectImage from "../components/select-image.vue";
import Controls from "../components/controls.vue";
export default {
  components: {
    SelectImage,
    Preview,
    Controls,
  },

  methods: {
    updateImage(image) {
      this.$store.commit("updateImage", image);
    },

    selectImage() {
      this.$refs.image.select()
    }
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
