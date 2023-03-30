<template>
  <v-card
      max-width="300"
      width="300"
      min-height="600"
      variant="outlined"
      rounded="0"
  >
    <v-card-text class="pa-1">
      <v-expansion-panels>
        <v-expansion-panel rounded="0" elevation="0">
          <template v-slot:title>
            <div class="text-uppercase font-weight-bold text-6 pa-0">
              {{ t('catalog.categories') }}
            </div>
          </template>

          <v-list>
            <catalog-categories-item :category="category">

            </catalog-categories-item>
          </v-list>


        </v-expansion-panel>


      </v-expansion-panels>
    </v-card-text>
  </v-card>
</template>

<script setup>
import {useI18n} from "vue-i18n";
import CatalogCategoriesItem from "@/components/Specialized/Catalog/CatalogCategoriesItem.vue";
import {reactive} from "vue";

const category = reactive({
  "category": "all",
  "subcategories": [
    {
      "category": "men",
      "subcategories": [
        "shoes",
        {
          "category": "clothes",
          "subcategories": [
            "softshells",
            "swimwear",
            "shorts",
            "jackets&vests",
            "tops"
          ]
        },
        "sports",
        "luggage",
        "accessories"
      ]
    },
    "women"
  ]
})


const {t} = useI18n()

</script>

<style scoped>

</style>