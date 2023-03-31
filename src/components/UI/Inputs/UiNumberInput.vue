<template>
  <v-row class="ui-number-input flex-grow-0">
    <ui-input-default
        class="ui-number-input__input"
        :required="false"
        type="number"
        hide-details
        :model-value="modelValue"
        @change="emit('update:model-value', Number($event.target.value))"
        @keydown="preserveMinus"
    ></ui-input-default>
    <v-row class="flex-column ui-number-input__controls">
      <v-btn
          class="ui-number-input__control"
          icon="mdi-plus"
          density="compact"
          variant="flat"
          style="height: 19px"
          @click="emit('update:model-value', modelValue+1)"
      ></v-btn>
      <v-btn
          class="ui-number-input__control"
          icon="mdi-minus"
          density="compact"
          variant="flat"
          style="height: 19px"
          @click="emit('update:model-value', positive?(modelValue-1<=0)?1:modelValue-1:modelValue-1)"
      ></v-btn>
    </v-row>
  </v-row>
</template>

<script setup>
import UiInputDefault from "@/components/UI/Inputs/UiInputDefault.vue";
import {defineProps, defineEmits} from 'vue'

const props = defineProps({
  modelValue: {
    type: Number
  },
  positive: {
    type: Boolean,
    default: false
  }
})

const preserveMinus = event => {
  if (props.positive && event.key === "-") {
    event.preventDefault()
  }
}

const emit = defineEmits(['update:model-value'])

</script>

<style scoped>

.ui-number-input__input {
  max-width: 40px;
  width: 40px;
  appearance: none;
}

.ui-number-input__controls {
  border: 1px solid black;
  border-left: none;
  max-width: 20px;
}

.ui-number-input__control >>> .v-btn__overlay {
  display: none !important;
}
</style>