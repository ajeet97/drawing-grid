<template>
  <theme-selector />
  <select-image ref="image" @change="updateImage" :visible="!$store.state.image">
    Select<br />Image
  </select-image>
  <div class="home" v-if="!!$store.state.image">
    <stats />
    <preview />
    <controls @new="selectImage"/>
  </div>
</template>

<script>
import Preview from "../components/preview2.vue";
import SelectImage from "../components/select-image.vue";
import Controls from "../components/controls/main.vue";
import ThemeSelector from '../components/theme-selector.vue';
import Stats from '../components/stats.vue';

export default {
  components: {
    SelectImage,
    Preview,
    Controls,
    ThemeSelector,
    Stats,
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
  height: 100%;
}
</style>
