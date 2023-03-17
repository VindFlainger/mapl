<template>
  <div class="ma-16">
      {{ test}}
  </div>
</template>

<script setup>
import {useI18n} from "vue-i18n";

const { t } = useI18n()


const test = t('common.inputs.password')
</script>

<style scoped>

</style>