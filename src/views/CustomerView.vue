<template>
  <v-row class="pa-4">
    <v-card
        width="270"
        height="280"
        elevation="0"
        color="grey-lighten-2"
        rounded="0"
    >
      <v-card-text>
        <div
            class="position-relative"
            v-for="link in links"
            :key="link.name"
        >
          <router-link
              class="d-block font-weight-bold text-black text-uppercase pa-1 text-subtitle-1"
              active-class="link_active"
              :to="link.link"
              v-text="link.name"
          ></router-link>
        </div>
      </v-card-text>
    </v-card>
    <v-col class="pa-0 ml-6">
      <router-view>

      </router-view>
    </v-col>
  </v-row>
</template>

<script setup>
import {computed} from "vue";
import {useI18n} from "vue-i18n";
const {t} = useI18n()

const links = computed(() => [
  {
    name: t('customer.menu.dashboard'),
    link: {name: 'customer-dashboard'}
  },
  {
    name: t('customer.menu.shipping'),
    link: {name: 'customer-shipping'}
  },
  {
    name: t('customer.menu.orders'),
    link: {name: 'customer-orders'}
  },
  {
    name: t('customer.menu.newsletter'),
    link: {name: 'customer-newsletter'}
  },
  {
    name: t('customer.menu.reviews'),
    link: {name: 'customer-reviews'}
  },
  {
    name: t('customer.menu.wishlist'),
    link: {name: 'customer-wishlist'}
  },
  {
    name: t('customer.menu.bonuses'),
    link: {name: 'customer-bonuses'}
  },
])


</script>

<style scoped>
.link_active::before {
  content: "";
  position: absolute;
  left: -16px;
  height: 80%;
  width: 2px;
  background: black;
}

</style>