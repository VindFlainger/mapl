<template>
  <div>
    <h4 class="font-weight-bold text-uppercase text-h5">{{ $t('customer.shipping.section-name') }}</h4>
  </div>
  <p class="text-caption">
    {{ $t('customer.shipping.about') }}
  </p>
  <div>
    <ui-loading-status
        :problem="shippingFetching.rejected"
        :loading="shippingFetching.fetching"
        @retry="getShipping"
    ></ui-loading-status>

    <v-form ref="form" v-if="shippingFetching.resolved">
      <v-row class="mt-4">
        <v-col class="pa-0">
          <h5 class="font-weight-bold text-h6">
            {{ $t('customer.shipping.contact-info') }}
          </h5>
          <ui-input-default
              class="mt-2"
              :label="$t('customer.shipping.first-name')"
              v-model="firstName"
              :rules="[
                  v => !!v || this.$tc('common.validation-errors.required', {param:$t('customer.shipping.first-name') })
              ]"
              maxlength="30"
          ></ui-input-default>
          <ui-input-default
              :label="$t('customer.shipping.last-name')"
              v-model="lastName"
              :rules="[
                  v => !!v || this.$tc('common.validation-errors.required', {param:$t('customer.shipping.last-name') })
              ]"
              maxlength="30"
          ></ui-input-default>
          <ui-input-default
              :label="$t('customer.shipping.phone')"
              v-model="phone"
              prefix="+"
              :rules="[
                   v => !!v || this.$tc('common.validation-errors.required', {param:$t('customer.shipping.phone') }),
                   v => v && v.length >= 9 && this.$vl.isMobilePhone(v, 'be-BY') || this.$t('common.validation-errors.phone-invalid')
              ]"
          ></ui-input-default>
        </v-col>
        <v-col class="pa-0 ml-10">
          <h5 class="font-weight-bold text-h6">
            {{ $t('customer.shipping.address') }}
          </h5>
          <ui-select-default
              class="mt-2"
              :label="$t('customer.shipping.location')"
              :items="locationOptions"
              v-model="location"
              :rules="[
                  v => !!v || this.$tc('common.validation-errors.required', {param:$t('customer.shipping.location')})
              ]"
          ></ui-select-default>
          <ui-input-default
              :label="$t('customer.shipping.city')"
              v-model="city"
              :rules="[
                  v => !!v || this.$tc('common.validation-errors.required', {param:$t('customer.shipping.city')})
              ]"
          ></ui-input-default>
          <ui-input-default
              :label="$t('customer.shipping.street')"
              v-model="street"
              :rules="[
                  v => !!v || this.$tc('common.validation-errors.required', {param:$t('customer.shipping.street')})
              ]"
          ></ui-input-default>
          <ui-input-default
              :label="$t('customer.shipping.house')"
              v-model="house"
              :rules="[
                  v => !!v || this.$tc('common.validation-errors.required', {param:$t('customer.shipping.house')})
              ]"
          ></ui-input-default>
          <ui-input-default
              :label="$t('customer.shipping.postcode')"
              v-model="postcode"
              :rules="[
                  v => !!v || this.$tc('common.validation-errors.required', {param:$t('customer.shipping.postcode')}),
                  v => v && this.$vl.isPostalCode(v, 'BY') || this.$tc('common.validation-errors.postcode-invalid')

              ]"
          ></ui-input-default>
        </v-col>
      </v-row>
      <v-row>
        <v-spacer></v-spacer>
        <ui-button-default @click="setShipping">
          {{ $t('common.buttons.save') }}
        </ui-button-default>
      </v-row>
    </v-form>
  </div>
</template>

<script setup>
import {computed, onMounted, reactive, ref} from "vue";

import UiInputDefault from "@/components/UI/Inputs/UiInputDefault.vue";
import UiButtonDefault from "@/components/UI/Buttons/UiButtonDefault.vue";
import UiSelectDefault from "@/components/UI/Inputs/UiSelectDefault.vue";
import UiLoadingStatus from "@/components/UI/UiLoadingStatus.vue";

import {useMeta} from "vue-meta";
import {useStore} from "vuex";
import {useI18n} from "vue-i18n";
import {useFetching} from "@/composables/useFetching";
import {useFetch} from "@/composables/useFetch";
import {ADD_LOADING, DEL_LOADING} from "@/store/mutation-types";

const {t} = useI18n()
const store = useStore()
const form = ref(null)
const {postDataAuthed, getData, getDataAuthed} = useFetch()

useMeta({
  title: t('customer.shipping.section-name')
})


const firstName = ref('')
const lastName = ref('')
const phone = ref('')
const location = ref('')
const city = ref('')
const street = ref('')
const house = ref('')
const postcode = ref('')

const shippingFetching = reactive(useFetching('shipping'))
const getShipping = () => {
  shippingFetching.fetch()
  getDataAuthed('/customer/account/getShipping')
      .then(resp => {
        firstName.value = resp.data.firstName
        lastName.value = resp.data.lastName
        phone.value = resp.data.phone
        location.value = resp.data.location
        city.value = resp.data.city
        street.value = resp.data.street
        house.value = resp.data.house
        postcode.value = resp.data.postcode
        shippingFetching.resolve()
      })
      .catch(() => {
        shippingFetching.reject()
      })
}

const setShipping = () => {
  store.commit(ADD_LOADING)
  if (form.value.validate()) {
    postDataAuthed(`/customer/account/setShipping`, {
          firstName: firstName.value,
          lastName: lastName.value,
          phone: phone.value,
          location: location.value,
          city: city.value,
          street: street.value,
          house: house.value,
          postcode: postcode.value
        },
        null
        ,
        {
          handleSuccess: true,
          successMessage: t('customer.shipping.shipping-changed'),
          handleError: true
        }
    )
        .catch(() => {
        })
        .finally(() => store.commit(DEL_LOADING))
  }
}


const language = computed(() => store.getters.getLanguage)
const locationOptions = ref('')
const getLocations = () => {
  getData(`/data/getLocations?language=${language.value}`)
      .then(resp => {
        locationOptions.value = resp.data
      })
      .catch(() => {
      })
}


onMounted(() => {
  getShipping()
  getLocations()
})


</script>

<style scoped>

</style>