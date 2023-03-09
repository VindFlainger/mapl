<template>
  <v-item-group
      selected-class="outlined"
      class="d-flex"
      mandatory
  >
    <v-item
        v-for="color in colors"
        :key="color"
        :value="color"
        v-slot="{selectedClass, toggle}"
    >
      <v-avatar
          class="ma-1"
          :class="['d-flex align-center', selectedClass]"
          dark
          size="20"
          :color="color"
          @click="toggle"
      ></v-avatar>
    </v-item>
  </v-item-group>
</template>

<script>
export default {
  name: "UiInputColor",
  props: {
    colors: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.outlined {
  box-shadow: 0 0 0 1px white, 0 0 0 2px black;
}
</style>