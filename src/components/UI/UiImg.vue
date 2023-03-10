<template>
  <v-img
      :src="sizedImage"
      :class="{ pointer: !!to}"
      @click="clicked"
  ></v-img>
</template>

<script>
export default {
  name: "UiImg",
  props: {
    images: {
      type: Array,
      required: false
    },
    size: {
      type: Number,
      default: 64
    },
    to: {
      type: Object,
      required: false
    }
  },
  computed: {
    sizedImage() {
      return this.images?.find(image => image.size === this.size)?.url
    }
  },
  methods: {
    clicked() {
      if (this.to) {
        this.$router.push(this.to)
      }
    }
  }
}
</script>

<style scoped>
</style>