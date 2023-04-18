<template>
  <div>
    <login-dialog v-model="loginView"></login-dialog>
  </div>
</template>

<script setup>
import {ref, watch} from "vue";

import LoginDialog from "@/components/Specialized/Auth/Login/LoginDialog.vue";
import {useRoute} from "vue-router";

const route = useRoute()

const loginView = ref(false)

watch(
    route,
    () => {
      if (route.query.redirect) {
        loginView.value = true
      }
    }, {
      immediate: true
    })
</script>
