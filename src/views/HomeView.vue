<template>
  <div>
    <login-dialog v-model="loginView"></login-dialog>
  </div>
</template>

<script>

import LoginDialog from "@/components/Specialized/Auth/Login/LoginDialog.vue";

export default {
  name: 'HomeView',
  data() {
    return {
      loginView: false
    }
  },
  watch: {
    $route: {
      handler(v) {
        if (v.query.redirect) {
          this.loginView = true
        }
      },
      immediate: true
    }
  },
  components: {LoginDialog}
}
</script>
