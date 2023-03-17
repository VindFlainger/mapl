<template>
  <v-row
      class="bg-grey-lighten-4 pa-2"
      justify="center"
      align="center" >
    <v-icon
        size="50"
        icon="mdi-emoticon-sad-outline"
    ></v-icon>
    <div class="ml-2">
      <div class="text-h6">
        <slot name="title">
          Sorry, there is no data
        </slot>
      </div>
      <div class="">
        <slot name="text"></slot>
      </div>
    </div>
  </v-row>
</template>

<script setup>

</script>

<style scoped>

</style>