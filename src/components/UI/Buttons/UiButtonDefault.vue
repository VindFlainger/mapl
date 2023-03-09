<template>
  <v-btn
      class="rounded-0"
      :class="{'bg-black': alternative, 'border-md': !alternative}"
      style="border-color: black !important;"
      :variant="alternative?undefined:'outlined'"
  >
    <div
        class="font-weight-black"
        :class="{'text-white': alternative}"
    >
      <slot>

      </slot>
    </div>
  </v-btn>
</template>

<script>
export default {
  name: "UiButtonDefault",
  props: {
    alternative: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
</style>