<template>
  <v-row justify="center">
    <div v-if="loading">
      <v-progress-circular
          size="63"
          width="10"
          indeterminate
      ></v-progress-circular>
      <p class="text-capitalize mt-2 font-weight-bold text-h6 ml-n2">
        {{ $t('common.labels.loading') }}...
      </p>
    </div>

    <div class="d-flex flex-column align-center justify-center"
         v-if="problem"
    >
      <v-icon
          size="60"
          color="red"
          icon="mdi-wifi-arrow-up-down"
      ></v-icon>
      <p class="text-red font-weight-bold text-capitalize text-h6 ml-2">
        {{ $t('common.labels.problem') }}
      </p>
      <v-btn
          class="font-weight-black mt-1 ml-1"
          variant="outlined"
          color="red"
          rounded="0"
          @click="$emit('retry')"
      >
        {{ $t('common.buttons.retry') }}
      </v-btn>
    </div>
  </v-row>
</template>

<script>
export default {
  name: "UiLoadingStatus",
  props: {
    problem: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

</style>