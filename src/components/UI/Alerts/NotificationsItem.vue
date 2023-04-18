<template>
  <v-card
      class="pa-2 bg-white"
      variant="outlined"
      rounded="0"

  >
    <v-row align="center" class="flex-nowrap">
      <v-icon
          :icon="icon"
          :color="color"
          size="35"
      >

      </v-icon>
      <h4 class="text-uppercase font-weight-bold ml-2 text-subtitle-2" style="letter-spacing: 1px !important;">
        {{ props.message }}
      </h4>
    </v-row>
  </v-card>
</template>

<script setup>
import {computed, defineProps} from 'vue'

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: v => ['error', 'success', 'warn'].includes(v)
  },
  message: {
    type: String,
    required: true
  }
})

const icon = computed(() => {
  switch (props.type) {
    case 'error':
      return 'mdi-close-octagon-outline'
    case 'warn':
      return 'mdi-alert-octagon-outline'
    case 'success':
      return 'mdi-check-all'
  }
  return ''
})

const color = computed(() => {
  switch (props.type) {
    case 'error':
      return 'red'
    case 'warn':
      return 'orange'
    case 'success':
      return 'green'
  }
  return ''
})


</script>

<style scoped>

</style>