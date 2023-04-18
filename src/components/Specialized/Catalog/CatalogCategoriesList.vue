<template>
  <div v-if="typeof category === 'string'">
    <router-link
        class="text-capitalize text-black text-body-1"
        :to="{name: 'catalog', params: {category: category || 'all'}}"
        active-class="font-weight-bold"
    >
      {{ category.slice(category.lastIndexOf('/') + 1) }}
    </router-link>
  </div>
  <div v-else>
    <div>
      <router-link
          class="text-capitalize text-black text-body-1"
          :to="{name: 'catalog', params: {category: category.category || 'all'}}"
          active-class="font-weight-bold"
      >
        {{ category.category.slice(category.category.lastIndexOf('/') + 1) }}
      </router-link>
    </div>
    <div class="ml-4">
      <catalog-categories-list
          v-for="subcategory in category.subcategories"
          :key="subcategory"
          :category="typeof subcategory === 'string'? category.category + '/' + subcategory:subcategory"
      ></catalog-categories-list>
    </div>
  </div>
</template>

<script setup>
import {defineProps} from 'vue'

defineProps({
  category: {
    type: [String, Object]
  }
})

</script>

<style scoped>

</style>