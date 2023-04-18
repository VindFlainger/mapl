<template>
  <div>
    <div v-if="isLogin">
      <v-menu
          max-width="300"
          location="bottom"
      >
        <template v-slot:activator="{props}">
          <ui-avatar
              class="ml-5 pointer"
              size="40"
              v-bind="props"
          ></ui-avatar>
        </template>
        <v-card
            color="black"
            elevation="0"
            variant="outlined"
        >
          <v-card-text class="pa-1 pr-3 pl-3">

            <router-link
                v-for="link in links"
                :key="link.title"
                class="d-block text-black text-h6 text-capitalize"
                :to="link.to"
                :active-class="link.class"
                v-text="link.title"
            ></router-link>

            <router-link
                class="d-block text-black text-h6 font-weight-bold"
                v-text="$t('header.logout')"
                @click="logout"
                :to="{path: '#'}"
            ></router-link>

          </v-card-text>
        </v-card>
      </v-menu>
    </div>
    <div v-else>
<!--      <router-link
          class="text-h5 font-weight-bold text-black"
          :to="{name: 'home', query: {redirect: $route.fullPath}}"
          v-text="$t('header.login')"
      ></router-link>-->
    </div>
  </div>
</template>

<script setup>
import UiAvatar from "@/components/UI/UiAvatar.vue";
import {useStore} from "vuex";
import {computed} from "vue";
import {useI18n} from "vue-i18n";

const store = useStore()
const {t} = useI18n()

const isLogin = computed(() => store.getters.isLogin)

const links = computed(() => [
  {
    title: t('customer.menu.dashboard'),
    to: {name: 'customer-dashboard'}
  },
  {
    title: t('customer.menu.orders'),
    to: {name: 'customer-orders'}
  },
  {
    title: t('customer.menu.wishlist'),
    to: {name: 'customer-wishlist'}
  },
  {
    title: t('customer.menu.bonuses'),
    to: {name: 'customer-bonuses'}
  }
])

const logout = () => store.dispatch('logout')

</script>

<style scoped>

</style>