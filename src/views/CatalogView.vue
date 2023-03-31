<template>
  <v-row class="flex-nowrap align-start">
    <catalog-filters @search="getProducts"></catalog-filters>
    <catalog-skus
        class="pa-3 v-col"
        :skus="skus"
        :total-pages="productsFetching.totalPages.value"
        :page="productsFetching.page.value"
        :show="show"
        @change-page="productsFetching.changePage($event)"
    ></catalog-skus>
  </v-row>
</template>

<script setup>
import CatalogFilters from "@/components/Specialized/Catalog/CatalogFilters.vue";
import CatalogSkus from "@/components/Specialized/Catalog/CatalogSkus.vue";
import {onMounted, ref} from "vue";
import {usePaginationFetching} from "@/composables/usePaginationFetching";
import {useFetch} from "@/composables/useFetch";
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import {useComputedQuery} from "@/composables/useComputedQuery";

const {getData} = useFetch()
const route = useRoute()


const show = 10
const skus = ref([])


const productsFetching = usePaginationFetching({onPage: show})
const page = useComputedQuery('page', productsFetching.page)
productsFetching.changePage(page)

const getProducts = (minPrice, maxPrice) => {
  productsFetching.fetch()
  getData('catalog/getProducts', {
    params: {
      category: route.params.category,
      limit: productsFetching.limit.value,
      offset: productsFetching.offset.value,
      ...minPrice ? {minPrice} : {},
      ...maxPrice ? {maxPrice} : {},
      sizing: route.query.sizing
    }
  })
      .then(resp => {
        skus.value = resp.data.skus
        productsFetching.resolve(resp.data)
      })
      .catch(() => {
        productsFetching.reject()
      })
}

onMounted(() => {
  getProducts(page)
})

onBeforeRouteUpdate((to, from, next) => {
  getProducts()
  next()
})

</script>

<style scoped>

</style>