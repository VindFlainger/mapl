<template>
  <div>
    <div>
      <h4 class="font-weight-bold text-uppercase text-h5">{{ $t('customer.reviews.section-name') }}</h4>
    </div>
  </div>
</template>

<script>
import {useMeta} from "vue-meta";
import i18n from "@/i18n";

export default {
  name: "AccountDashboard",
  setup() {
    useMeta({
      title: i18n.global.t('customer.reviews.section-name')
    })
  }
}
</script>

<style scoped>

</style>