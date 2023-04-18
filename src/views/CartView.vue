<template>
  <h2 class="text-uppercase text-center text-h3 font-weight-regular mt-4">
    {{ t('cart.section-name') }}
  </h2>

  <v-row class="mt-10 position-relative">
    <cart-list
        :items="cartItems"
        @edit-cart-item="editCartItem"
    ></cart-list>

    <cart-summary
        class="cart-view__summary"
        :regularPrice="regularPrice"
        :sale="sale"
        :total="total"
    ></cart-summary>
  </v-row>
</template>

<script setup>
import CartList from "@/components/Specialized/Cart/CartList.vue";
import {computed} from "vue";
import {useStore} from "vuex";
import {useI18n} from "vue-i18n";
import {ADD_LOADING, DEL_LOADING} from "@/store/mutation-types";
import CartSummary from "@/components/Specialized/Cart/CartSummary.vue";

const store = useStore()
const {t} = useI18n()


const cartItems = computed(() => store.getters.getCartItems)
const addLoading = () => store.commit(ADD_LOADING)
const delLoading = () => store.commit(DEL_LOADING)
const editCartItem = (item) => {
  addLoading()
  store.dispatch('editCartItem', item)
      .finally(() => {
        delLoading()
      })
}

const regularPrice = computed(() => {
  return cartItems.value.reduce((acc, item) => {
    return acc + item.quantity * item.sku.pricing.price
  }, 0)
})

const total = computed(() => {
  return cartItems.value.reduce((acc, item) => {
    return acc + item.quantity * (item.sku.pricing.sale || item.sku.pricing.price)
  }, 0)
})

const sale = computed(() => regularPrice.value - total.value)

</script>

<style scoped>
.cart-view__summary {
  position: sticky;
  top: 134px;
}
</style>