<template>
  <l-base-dialog
      border
      :max-width="400"
  >
    <v-card
        class="rounded-xl"
        elevation="0"
    >
      <v-card-text>
        <h3 class="text-h4 sans font-weight-bold">{{ $t('login.header') }}</h3>
        <div class="mt-2">
          <form @submit.prevent="login">

            <v-text-field
                variant="underlined"
                color="black"
                :label="$t('common.labels.email')"
                :model-value="email.value.value"
                :error-messages="email.errorMessage.value"
                @change="email.handleChange"
                id="email"
                autofocus
            ></v-text-field>

            <v-text-field
                variant="underlined"
                color="black"
                :label="$t('common.labels.password')"
                :model-value="password.value.value"
                :error-messages="incorrectPassword?t('common.validation-errors.password-incorrect'):undefined || password.errorMessage.value"
                @change="password.handleChange"
                :type="passwordVisible?'text':'password'"
                :append-inner-icon="passwordVisible?'mdi-eye-outline':'mdi-eye-off-outline'"
                @click:append-inner="passwordVisible = !passwordVisible"
                @blur="passwordVisible = false"
                id="password"
                autofocus
            ></v-text-field>

            <router-link to="#" class="mt-2">{{ $t('login.forget-password') }}</router-link>

            <v-row justify="end" class="mt-5">
              <ui-button-default>
                {{ $t('common.buttons.sign-up') }}
              </ui-button-default>
              <v-spacer></v-spacer>
              <ui-button-default
                  type="submit"
                  alternative
                  :loading="loading"
                  :disabled="meta.dirty && false"
              >
                {{ $t('common.buttons.login') }}
              </ui-button-default>
            </v-row>


          </form>
        </div>
      </v-card-text>
    </v-card>
  </l-base-dialog>
</template>

<script setup>
import {ref, defineEmits} from "vue";

import LBaseDialog from "@/components/UI/Layouts/LBaseDialog.vue";
import UiButtonDefault from "@/components/UI/Buttons/UiButtonDefault.vue";
import {useField, useForm} from "vee-validate";
import {string, object} from "yup";
import {useI18n} from "vue-i18n";
import {axiosBase} from "../../../../../utils/axiosMiddlaware";
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";


const {t} = useI18n()
const store = useStore()
const route = useRoute()
const router = useRouter()

const emit = defineEmits([])


const schema = object({
  email: string().required(t('common.validation-errors.required')).email(t('common.validation-errors.email-invalid')),
  password: string().required(t('common.validation-errors.required'))
})

const {handleSubmit, meta} = useForm({
  validationSchema: schema
})

const email = useField('email')
const password = useField('password')


const incorrectPassword = ref(false)
const loading = ref(false)
const passwordVisible = ref(false)


const login = handleSubmit(() => {
  loading.value = true
  incorrectPassword.value = false

  axiosBase.post('/auth/login', {
    login: email.value.value,
    password: password.value.value,
    device: window.navigator.userAgent
  })
      .then(resp => {
        return store.dispatch('login',
            {
              refreshToken: resp.data.refreshToken,
              expires: resp.data.expiresIn,
              login: email.value.value,
              id: resp.data.id
            }
        )
      })
      .then(() => {
        emit('update:model-value', false)

        if (route.query.redirect) {
          router.push(route.query.redirect)
        }
      })
      .catch((err) => {
        if (err.response && (err.response.data.code === 202 || err.response.data.code === 203)) {
          incorrectPassword.value = true
          password.value.value = ""
        }
      })
      .finally(() => {
        loading.value = false
      })
})


</script>

<style scoped>

</style>