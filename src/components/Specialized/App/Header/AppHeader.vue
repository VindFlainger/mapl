<template>
  <v-app-bar density="prominent" class="app-bar" elevation="1">
    <div class="w-100 bg-black position-absolute" style="height: 40px; top: 0; left: 0;">
      <v-container class="d-flex align-center pa-0" style="height: 100%">
        <v-spacer></v-spacer>
        <ui-input-dropdown
            class="d-block text-white"
            :items="currencies"
            :modelValue="currency"
            @update:modelValue="setCurrency($event.toLowerCase())"
        ></ui-input-dropdown>
        <ui-input-dropdown
            class="d-block ml-3 text-white"
            :items="languages"
            :modelValue="language"
            @update:modelValue="setLanguage($event.toLowerCase())"
        ></ui-input-dropdown>
      </v-container>

    </div>
    <v-container class="d-flex mt-10 align-center">
      <div>
        <v-img :src="require('@/assets/images/logos/mainlogo.png')" width="200" cover></v-img>
      </div>
      <v-spacer></v-spacer>
      <v-badge>
        <template v-slot:badge>
          {{ cartItemsCount }}
        </template>
        <router-link :to="{name: 'cart'}">
          <v-icon
              class="pointer text-grey-darken-4"
              icon="mdi-cart-outline"
              size="large"
          ></v-icon>
        </router-link>
      </v-badge>
      <v-icon
          class="pointer ml-5"
          icon="mdi-heart-outline"
          size="large"
      ></v-icon>
      <app-header-menu class="ml-10">

      </app-header-menu>
    </v-container>
  </v-app-bar>

</template>

<script setup>
import AppHeaderMenu from "@/components/Specialized/App/Header/AppHeaderMenu.vue";
import UiInputDropdown from "@/components/UI/Inputs/UiInputDropdown.vue";
import {useStore} from "vuex";
import {SET_CURRENCY, SET_LANGUAGE} from "@/store/mutation-types";
import {computed} from "vue";

const store = useStore()

const currency = computed(() => store.getters.getCurrency)
const language = computed(() => store.getters.getLanguage)
const currencies = computed(() => store.getters.getCurrencies)
const languages = computed(() => store.getters.getLanguages)
const cartItemsCount = computed(() => store.getters.getCartItemsCount)

const setCurrency = currency => store.commit(SET_CURRENCY, currency)
const setLanguage = language => store.commit(SET_LANGUAGE, language)

</script>

<style scoped>
.app-bar >>> .v-toolbar__content {
  align-items: center !important;
}
</style>