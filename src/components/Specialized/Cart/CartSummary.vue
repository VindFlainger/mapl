<template>
  <v-card
      class="ml-7 cart-summary"
      width="300"
      min-height="350"
      max-height="350"
      variant="flat"
      rounded="0"
      color="grey-lighten-2"
  >
    <v-card-text>
      <h3 class="text-capitalize text-h5 font-weight-bold text-grey-darken-4">
        {{ t('cart.summary') }}
      </h3>

      <div class="mt-4">
        <v-row class="text-capitalize text-subtitle-1">
          <span>{{ t('cart.regular') }}</span>
          <v-spacer></v-spacer>
          <ui-currency :value="regularPrice"></ui-currency>
        </v-row>
        <v-row class="text-capitalize text-subtitle-1">
          <span>{{ t('cart.sale') }}</span>
          <v-spacer></v-spacer>
          <ui-currency :value="-sale" class="text-red"></ui-currency>
        </v-row>
        <v-row class="text-capitalize text-h5 border-t-md">
          <span>{{ t('cart.total') }}</span>
          <v-spacer></v-spacer>
          <ui-currency :value="total"></ui-currency>
        </v-row>
      </div>

      <div class="mt-16">
        <router-link :to="{name: 'order'}">
          <ui-button-default
              width="100%"
              alternative
              min-height="50"
          >
            {{ t('cart.checkout') }}
          </ui-button-default>
        </router-link>
        <router-link :to="{name: 'catalog'}">
          <ui-button-default
              class="mt-4 text-black"
              width="100%"
              min-height="50"
          >
            {{ t('cart.continue-shopping') }}
          </ui-button-default>
        </router-link>
      </div>

    </v-card-text>


  </v-card>
</template>

<script setup>
import {defineProps} from 'vue'
import {useI18n} from "vue-i18n";
import UiButtonDefault from "@/components/UI/Buttons/UiButtonDefault.vue";
import UiCurrency from "@/components/UI/Localization/UiCurrency.vue";

const {t} = useI18n()


defineProps({
  regularPrice: {
    type: Number,
    required: true
  },
  sale: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
})


</script>

<style scoped>
</style>