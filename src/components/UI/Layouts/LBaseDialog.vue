<template>
  <v-dialog
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      transition="dialog-top-transition"
  >
    <slot></slot>
  </v-dialog>
</template>

<script>
export default {
  name: "LBaseDialog",
  props: {
    modelValue: Boolean
  },
}
</script>

<style scoped>

</style>