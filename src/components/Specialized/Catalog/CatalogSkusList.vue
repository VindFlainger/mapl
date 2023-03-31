<template>
  <div class="d-flex flex-wrap">
    <catalog-skus-list-item
        class="v-col-3 pa-2 mb-5"
        v-for="sku in skus"
        :key="sku._id"
        :images="sku.images?.[0]"
        :name="sku.name"
        :sale="sku.pricing.sale"
        :price="sku.pricing.price"
        :product-id="sku.productId"
        :id="sku._id"
    ></catalog-skus-list-item>
  </div>
</template>

<script setup>
import {defineProps} from 'vue'
import CatalogSkusListItem from "@/components/Specialized/Catalog/CatalogSkusListItem.vue";

defineProps({
  skus: {
    type: Array,
    default: () => []
  }
})


</script>

<style scoped>

</style>