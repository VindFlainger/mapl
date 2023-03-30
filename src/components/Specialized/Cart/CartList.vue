<template>
  <div class="flex-grow-1">
    <v-row class="border-b-md">
      <h3 class="text-uppercase text-grey-darken-3 v-col-5">
        {{ t('cart.product') }}
      </h3>
      <h3 class="text-uppercase text-grey-darken-3 v-col-2">
        {{ t('cart.size') }}
      </h3>
      <h3 class="text-uppercase text-grey-darken-3 v-col-2">
        {{ t('cart.quantity') }}
      </h3>
      <h3 class="text-uppercase text-grey-darken-3 v-col-2">
        {{ t('cart.total') }}
      </h3>
    </v-row>
    <v-list>
      <cart-list-item
          v-for="item in items"
          :key="item.skuId"
          :size="item.size"
          :sizing="item.sku.sizing"
          :price="item.sku.pricing.price"
          :sale="item.sku.pricing.sale"
          :name="item.sku.name"
          :quantity="item.quantity"
          :images="item.sku.images?.[0]"
          @change:size="emit('edit-cart-item', {
          skuId: item.skuId,
          size: $event,
          quantity: 1
        })"
          @change:quantity="emit('edit-cart-item', {
          skuId: item.skuId,
          size: item.size,
          quantity: $event
        })"
      ></cart-list-item>

    </v-list>
  </div>
</template>

<script setup>
import {defineProps, defineEmits} from 'vue'
import CartListItem from "@/components/Specialized/Cart/CartListItem.vue";
import {useI18n} from "vue-i18n";
const {t} = useI18n()

const emit = defineEmits(['edit-cart-item'])

defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

</script>

<style scoped>

</style>