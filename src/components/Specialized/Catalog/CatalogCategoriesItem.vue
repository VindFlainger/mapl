<template>
  <v-list-item
      v-if="typeof category === 'string'"
      density="compact"
  >
    <template v-slot:title>
      <div class="text-capitalize">
        {{ category}}
      </div>
    </template>
  </v-list-item>
  <v-list-group v-else append-icon="none">
    <template v-slot:activator="{props}">
      <v-list-item
          v-bind="props"
          density="compact"
      >
        <template v-slot:title>
          <div class="text-capitalize">
            {{ category.category}}
          </div>
        </template>
      </v-list-item>
    </template>
    <catalog-categories-item
        v-for="subcategory in category.subcategories"
        :key="subcategory"
        :category="subcategory"
    ></catalog-categories-item>
  </v-list-group>
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