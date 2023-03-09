<template>
  <p>
    {{ $n(value, 'currency', currency) }}
  </p>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "UiCurrency",
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      currency: 'getCurrency'
    })
  }
}
</script>

<style scoped>

</style>