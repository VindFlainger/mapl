<template>
  <v-select
      class="input"
      variant="outlined"
      density="compact"
      rounded="0"
      @focus="focused = true"
      @blur="focused = false"
  >
    <template v-slot:label="{label}">
      <span v-if="label">
        {{ label }} {{ required ? (focused) ? '' : '*' : '' }}
      </span>
    </template>
  </v-select>
</template>

<script>
export default {
  name: "UiSelectDefault",
  props: {
    required: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      focused: false
    }
  }
}
</script>

<style scoped>
.input >>> .v-field__outline {
  --v-field-border-opacity: 1
}

.input >>> .v-field__outline__start {
  border-radius: 0 !important;
}

.input >>> .v-field__outline__end {
  border-radius: 0 !important;
}

.input >>> label {
  color: black !important;
  opacity: 1 !important;
  font-weight: lighter;
}

</style>