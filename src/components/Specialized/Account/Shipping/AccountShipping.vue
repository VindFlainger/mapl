<template>
  <div>
    <h4 class="font-weight-bold text-uppercase text-h5">{{ $t('customer.shipping.section-name') }}</h4>
  </div>
  <p class="text-caption">
    {{ $t('customer.shipping.about') }}
  </p>
  <div>
    <v-form ref="form">
      <v-row class="mt-4">
        <v-col class="pa-0">
          <h5 class="font-weight-bold text-h6">
            {{ $t('customer.shipping.contact-info') }}
          </h5>
          <ui-input-default
              class="mt-2"
              :label="$t('customer.shipping.first-name')"
              v-model="firstName"
          ></ui-input-default>
          <ui-input-default
              :label="$t('customer.shipping.last-name')"
              v-model="lastName"
          ></ui-input-default>
          <ui-input-default
              :label="$t('customer.shipping.phone')"
              v-model="phone"
              prefix="+"
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
          ></ui-select-default>
          <ui-input-default
              :label="$t('customer.shipping.city')"
              v-model="city"
          ></ui-input-default>
          <ui-input-default
              :label="$t('customer.shipping.house')"
              v-model="house"
          ></ui-input-default>
          <ui-input-default
              :label="$t('customer.shipping.postcode')"
              v-model="postcode"
          ></ui-input-default>
        </v-col>
      </v-row>
    </v-form>
    <v-row>
      <v-spacer></v-spacer>
      <ui-button-default>
        {{ $t('common.buttons.save') }}
      </ui-button-default>
    </v-row>
  </div>
</template>

<script>
import {useMeta} from "vue-meta";
import i18n from "@/i18n";
import UiInputDefault from "@/components/UI/Inputs/UiInputDefault.vue";
import UiButtonDefault from "@/components/UI/Buttons/UiButtonDefault.vue";
import UiSelectDefault from "@/components/UI/Inputs/UiSelectDefault.vue";
import requests from "@/mixins/requests";
import {mapGetters} from "vuex";

export default {
  name: "AccountShipping",
  components: {UiSelectDefault, UiButtonDefault, UiInputDefault},
  mixins: [requests],
  data() {
    return {
      firstName: '',
      lastName: '',
      phone: '',
      location: '',
      city: '',
      house: '',
      postcode: '',
      locationOptions: []
    }
  },
  methods: {
    getShipping() {
      this.getDataAuthed('/customer/account/getShipping')
          .then(resp => {
            this.firstName = resp.data.firstName
            this.lastName = resp.data.lastName
            this.phone = resp.data.phone
            this.location = resp.data.location
            this.city = resp.data.city
            this.house = resp.data.house
            this.postcode = resp.data.postcode
          })
          .catch(() => {
          })
    },
    getLocations() {
      this.getData(`/data/getLocations?language=${this.language}`)
          .then(resp => {
            this.locationOptions = resp.data
          })
          .catch(() => {
          })

    }
  },
  computed: {
    ...mapGetters({
      language: 'getLanguage'
    })
  },
  mounted() {
    this.getShipping()
    this.getLocations()
  },
  setup() {
    useMeta({
      title: i18n.global.t('customer.shipping.section-name')
    })
  }
}
</script>

<style scoped>

</style>