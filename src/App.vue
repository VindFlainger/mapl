<template>
  <metainfo>
    <template v-slot:title="{ content }">{{ content ? `${content} | Mapl` : `Mapl` }}</template>
  </metainfo>
  <app-overlay v-show="isLoading"></app-overlay>
  <alerts-box></alerts-box>
  <v-app>
    <app-header>

    </app-header>
    <v-main class="fill-height">
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>

    <app-footer>

    </app-footer>
  </v-app>
</template>

<script setup>

import {computed, onMounted} from "vue";
import {useStore} from "vuex";
import AppFooter from "@/components/Specialized/App/Footer/AppFooter.vue";
import AppHeader from "@/components/Specialized/App/Header/AppHeader.vue";
import AppOverlay from "@/components/Specialized/App/AppOverlay.vue";
import AlertsBox from "@/components/UI/Alerts/NotificationsBox.vue";

const store = useStore()

const isLogin = computed(() => store.getters.isLogin)
const isLoading = computed(() => store.getters.isLoading)

onMounted(() => {
  if (isLogin.value) {
    store.dispatch('authed')
  }
})

</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,200;0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap');
@import "@/assets/styles/styles.module.scss";
@import "@/assets/styles/reset.module.scss";


a {
  color: #007eff;
  text-decoration: none;
}


#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

::-webkit-scrollbar {
  display: none;
}

::-webkit-scrollbar-thumb {
  background: grey;
}

::-webkit-scrollbar-thumb {
  background: white;
}

</style>
