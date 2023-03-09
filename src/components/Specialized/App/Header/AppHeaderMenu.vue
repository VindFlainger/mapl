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
                class="d-block text-black text-h6"
                :to="link.to"
                :active-class="link.class"
                v-text="link.title"
            ></router-link>
            <router-link
                class="d-block text-black text-h6 font-weight-bold"
                to=""
                v-text="$t('header.logout')"
                @click="logout"
            ></router-link>
          </v-card-text>
        </v-card>
      </v-menu>
    </div>
    <div v-else>
      <router-link
          class="text-h5 font-weight-bold text-black"
          :to="{name: 'home', query: {redirect: $route.fullPath}}"
          v-text="$t('header.login')"
      ></router-link>
    </div>
  </div>
</template>

<script>
import UiAvatar from "@/components/UI/UiAvatar.vue";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "AppHeaderMenu",
  components: {UiAvatar},
  computed: {
    ...mapGetters({
      isLogin: 'isLogin',
      name: 'getName',
      avatar: 'getAvatar',
      gender: 'getGender'
    }),
    links() {
      return [
        {
          title: this.$t('header.my-account'),
          to: {name: 'customer-account'}
        },
        {
          title: this.$t('header.orders'),
          to: {name: 'customer-orders'}
        },
        {
          title: this.$t('header.reviews'),
          to: {name: 'customer-reviews'}
        },
        {
          title: this.$t('header.bonus'),
          to: {name: 'customer-bonus'}
        },
      ]
    }
  },
  methods: {
    ...mapActions({
      logout: 'logout'
    })
  }
}
</script>

<style scoped>

</style>