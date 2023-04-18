<template>
  <v-card
      elevation="0"
      rounded="0"
      class="alert-box"
      width="325"
      style="background: none !important;"
  >
    <transition-group name="alerts">
      <notifications-item
          v-for="alert in alerts"
          :key="alert.id"
          class="ma-2"
          :message="alert.message"
          :type="alert.type"
      ></notifications-item>
    </transition-group>
  </v-card>
</template>

<script setup>
import {useStore} from "vuex";
import {computed} from "vue";
import NotificationsItem from "@/components/UI/Alerts/NotificationsItem.vue";

const store = useStore()

const alerts = computed(() => store.getters.getNotifications)

</script>

<style scoped>
.alert-box {
  z-index: 10000;
  position: fixed;
  bottom: 5px;
  right: 5px;
}
.alerts-enter-active {
  transition: .8s linear;
  transform: translateY(200px);
}
.alerts-leave-active {
  transition: .8s linear;
  transform: translateX(0);
}
.alerts-enter-to {
  transform: translateY(0);
}
.alerts-leave-to {
  transform: translateX(300px);
}
</style>