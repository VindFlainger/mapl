<template>
  <v-text-field
      ref="password"
      variant="underlined"
      color="black"
      :label="$t('common.inputs.password')"
      :type="passwordVisible?'text':'password'"
      :append-inner-icon="passwordVisible?'mdi-eye-outline':'mdi-eye-off-outline'"
      :maxlength="maxLength"
      :rules="[
          ...validate?[
              v => !!v || $tc('common.validation-errors.required', {param: $t('common.inputs.password')}),
              v => v && v.length >= minLength || $tc('common.validation-errors.password-length', minLength),
              v => /[!@#$%^&*()_+-<>?]/.test(v) || $tc('common.validation-errors.password-symbol'),
              v => v !== login || $tc('common.validation-errors.password-symbol'),
              ]:[],
          ...[incorrectPasswordRule]
      ]"
      validate-on="blur"
      @click:append-inner="passwordVisible = !passwordVisible"
      @focus="$emit('update:incorrect', false)"
      @blur="passwordVisible = false"
  >
  </v-text-field>
</template>

<script>

export default {
  name: "UiInputPassword",
  props: {
    minLength: {
      type: Number,
      default: 8
    },
    maxLength: {
      type: Number,
      default: 40
    },
    login: {
      type: String,
      required: false
    },
    validate: {
      type: Boolean,
      default: true
    },
    incorrect: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      passwordVisible: false
    }
  },
  computed: {
    incorrectPasswordRule() {
      return () => this.incorrect ? this.$t('common.validation-errors.password-incorrect') : true
    }
  },
  watch: {
    incorrect() {
      this.$refs.password.validate()
    }
  }
}
</script>

<style scoped>

</style>