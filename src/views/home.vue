<template>
  <select-image v-if="!$store.state.image" @change="updateImage">
    Select<br />Image
  </select-image>
  <div v-else>
    <preview />
    <controls />
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
      this.$store.commit("setImage", image);
    },
  },
};
</script>
