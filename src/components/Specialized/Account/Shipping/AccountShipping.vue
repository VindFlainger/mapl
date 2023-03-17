<template>
  <div>
    <h4 class="font-weight-bold text-uppercase text-h5">{{ $t('customer.shipping.section-name') }}</h4>
  </div>
  <p class="text-caption">
    {{ $t('customer.shipping.about') }}
  </p>
  <div>
    <ui-loading-status
      :problem="rejected"
      :loading="fetching"
      @retry="getShipping"
    ></ui-loading-status>

    <v-form ref="form" v-if="resolved">
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

<script>
import {useMeta} from "vue-meta";
import i18n from "@/i18n";
import UiInputDefault from "@/components/UI/Inputs/UiInputDefault.vue";
import UiButtonDefault from "@/components/UI/Buttons/UiButtonDefault.vue";
import UiSelectDefault from "@/components/UI/Inputs/UiSelectDefault.vue";
import requests from "@/mixins/requests";
import {mapGetters} from "vuex";
import {useFetching} from "@/composables/useFetching";
import UiLoadingStatus from "@/components/UI/UiLoadingStatus.vue";

export default {
  name: "AccountShipping",
  components: {UiLoadingStatus, UiSelectDefault, UiButtonDefault, UiInputDefault},
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
      street: '',
      locationOptions: []
    }
  },
  methods: {
    getShipping() {
      this.fetch()
      this.getDataAuthed('/customer/account/getShipping')
          .then(resp => {
            this.firstName = resp.data.firstName
            this.lastName = resp.data.lastName
            this.phone = resp.data.phone
            this.location = resp.data.location
            this.city = resp.data.city
            this.street = resp.data.street
            this.house = resp.data.house
            this.postcode = resp.data.postcode
            this.resolve()
          })
          .catch(() => {
            this.reject()
          })
    },
    getLocations() {
      this.getData(`/data/getLocations?language=${this.language}`)
          .then(resp => {
            this.locationOptions = resp.data
          })
          .catch(() => {
          })
    },
    setShipping() {
      if (this.$refs.form.validate()) {
        this.postDataAuthed(`/customer/account/setShipping`, {
          firstName: this.firstName,
          lastName: this.lastName,
          phone: this.phone,
          location: this.location,
          city: this.city,
          street: this.street,
          house: this.house,
          postcode: this.postcode
        })
            .then(() => {
            })
            .catch(() => {
            })
      }
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

    const {
      reject,
      resolved,
      fetch,
      fetching,
      rejected,
      resolve
    } = useFetching('shipping')

    return {
      reject,
      resolved,
      fetch,
      fetching,
      rejected,
      resolve
    }
  }
}
</script>

<style scoped>

</style>