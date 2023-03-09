<template>
  <v-text-field
      variant="underlined"
      color="black"
      :label="$t('common.inputs.email')"
      :rules="[
          v => !!v || $t('common.validation-errors.required', {param: $t('common.inputs.email')}),
          v => $vl.isEmail(v) || $t('common.validation-errors.email-invalid')
      ]"
      validate-on="blur"
      id="email"
      autofocus
  >
  </v-text-field>
</template>

<script>
export default {
  name: "UiInputEmail",
}
</script>

<style scoped>

</style>