<template>
  <l-base-dialog
      border
      :max-width="400"
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
  >
    <v-card
        class="rounded-xl"
        elevation="0"
    >
      <v-card-text>
        <h3 class="text-h4 sans font-weight-bold">{{ $t('login.header') }}</h3>
        <div class="mt-2">
          <v-form v-model="valid" validate-on="submit">
            <ui-input-email v-model="email"></ui-input-email>
            <ui-input-password
                :validate="false"
                v-model="password"
                v-model:incorrect="incorrectPassword"
            ></ui-input-password>
          </v-form>
          <router-link to="#">{{ $t('login.forget-password') }}</router-link>
        </div>

        <v-row justify="end" class="mt-5">
          <ui-button-default>
            {{ $t('common.buttons.sign-up') }}
          </ui-button-default>
          <v-spacer></v-spacer>
          <ui-button-default
              alternative
              :loading="loading"
              @click="login"
          >
            {{ $t('common.buttons.login') }}
          </ui-button-default>
        </v-row>
      </v-card-text>
    </v-card>
  </l-base-dialog>
</template>

<script>
import LBaseDialog from "@/components/UI/Layouts/LBaseDialog.vue";
import UiInputEmail from "@/components/UI/Inputs/UiInputEmail.vue";
import UiInputPassword from "@/components/UI/Inputs/UiInputPassword.vue";
import UiButtonDefault from "@/components/UI/Buttons/UiButtonDefault.vue";
import requests from "@/mixins/requests";

export default {
  name: "LoginDialog",
  components: {UiButtonDefault, UiInputPassword, UiInputEmail, LBaseDialog},
  mixins: [requests],
  data() {
    return {
      password: '',
      email: '',
      loading: false,
      valid: true,
      incorrectPassword: false
    }
  },
  props: {
    modelValue: Boolean
  },
  methods: {
    login() {
      if (this.valid) {
        this.loading = true
        this.postData('/auth/login', {
          login: this.email,
          password: this.password,
          device: window.navigator.userAgent
        })
            .then(resp => {
              this.$store.dispatch('login',
                  {
                    refreshToken: resp.data.refreshToken,
                    expires: resp.data.expiresIn,
                    login: this.email,
                    id: resp.data.id
                  }
              )
              this.$emit('update:modelValue', false)
              if (this.$route.query.redirect) {
                this.$router.push(this.$route.query.redirect)
              }
            })
            .catch((err) => {
              if (err.response && (err.response.data.code === 202 || err.response.data.code === 203)) {
                this.incorrectPassword = true
              }
            })
            .finally(() => this.loading = false)
      }
    }
  }
}
</script>

<style scoped>

</style>