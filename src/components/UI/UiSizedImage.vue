<template>
  <v-img :src="image || require('@/assets/images/defaults/defaultimage.png')">

  </v-img>
</template>

<script>
export default {
  name: "UiSizedImage",
  props: {
    images: {
      type: Array,
      default: ()=>{
        return []
      }
    },
    imageSize: {
      type: Number,
      default: 64
    }
  },
  computed: {
    image() {
      return this.images.find(image => image.size === this.imageSize)?.url
    }
  }
}
</script>

<style scoped>

</style>