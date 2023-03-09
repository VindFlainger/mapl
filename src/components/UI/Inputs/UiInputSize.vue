<template>
  <v-item-group
      mandatory
      selected-class="sizing_selected"
  >
    <v-row>
      <v-item
          v-for="sz in sizes"
          :key="sz.size"
          :value="sz.size"
          v-slot="{selectedClass, toggle}"
      >
        <p class="sizing" :class="[selectedClass]" @click="toggle">
          {{ sz.size }}
        </p>
      </v-item>
    </v-row>
  </v-item-group>
</template>

<script>
export default {
  name: "UiInputSize",
  props: {
    sizes: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.sizing {
  height: 40px;
  line-height: 20px;
  padding: 10px 20px 10px 20px;
  margin: 4px;
  border: 1px solid dimgrey;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
}

.sizing_selected {
  background: #eae9e9;
}
</style>