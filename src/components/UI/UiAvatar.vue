<template>
  <v-avatar :image="image || require('@/assets/images/defaults/defaultavatar.png')">

  </v-avatar>
</template>

<script>
export default {
  name: "UiAvatar",
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
      return this.images.find(image => image.size === this.imageSize)
    }
  }
}
</script>

<style scoped>

</style>