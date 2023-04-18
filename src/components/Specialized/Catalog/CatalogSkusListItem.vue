<template>
  <div>
    <router-link :to="{name: 'product', params: {productId, skuId: id}}">
      <ui-sized-image
          :images="images"
      ></ui-sized-image>

      <h4 class="text-body-2 mt-5">
        {{ name }}
      </h4>

      <v-row>
        <ui-currency
            class="mt-2 text-body-2"
            :class="{'text-decoration-line-through': sale, 'text-grey': sale}"
            :value="price"
        ></ui-currency>

        <ui-currency
            v-if="sale"
            class="mt-2 text-body-2 ml-3 text-red"
            :value="sale"
        ></ui-currency>
      </v-row>
    </router-link>
  </div>
</template>

<script setup>
import {defineProps} from 'vue'
import UiSizedImage from "@/components/UI/UiSizedImage.vue";
import UiCurrency from "@/components/UI/Localization/UiCurrency.vue";

defineProps({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  sale: {
    type: Number,
    required: false
  },
  images: {
    type: Array,
    required: false
  },
  id: {
    type: String,
    required: true
  },
  productId: {
    type: String,
    required: true
  }
})

</script>

<style scoped>

</style>