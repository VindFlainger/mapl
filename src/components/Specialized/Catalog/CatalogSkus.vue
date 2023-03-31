<template>
  <div>
    <v-row>
      
    </v-row>
    <catalog-skus-list
        :total-pages="totalPages"
        :page="page"
        :skus="skus"
    ></catalog-skus-list>

    <v-row justify="space-between" align="center">
      <div>
        <span class="text-uppercase  text-overline">{{ t('catalog.show') }}:</span>
        <div class="d-inline ml-3 border-md pa-1 text-overline">
          {{ show }}
        </div>
      </div>

      <v-spacer></v-spacer>
      <v-pagination
          class="pa-2 flex-grow-1 pagination"
          :total-visible="5"
          density="comfortable"
          :length="totalPages"
          :model-value="page"
          @update:model-value="emit('change-page', $event)"
      ></v-pagination>
    </v-row>

  </div>
</template>

<script setup>
import {defineProps, defineEmits} from 'vue'
import CatalogSkusList from "@/components/Specialized/Catalog/CatalogSkusList.vue";
import {useI18n} from "vue-i18n";

const {t} = useI18n()


defineProps({
  skus: {
    type: Array,
    default: () => []
  },
  page: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  },
  show: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['change-page'])

</script>

<style scoped>
.pagination >>> .v-pagination__list {
  justify-content: end;
}

.catalog-skus__limit {
  max-width: 40px;
  max-height: 40px;
}
</style>