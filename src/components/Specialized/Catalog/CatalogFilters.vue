<template>
  <v-card
      max-width="300"
      min-width="300"
      min-height="600"
      variant="outlined"
      rounded="0"
  >
    <v-card-text class="pa-1">
      <v-expansion-panels :model-value="open" class="expansion" multiple>
        <v-expansion-panel
            class="mt-0"
            rounded="0"
            elevation="0"
        >
          <template v-slot:title>
            <div class="text-uppercase font-weight-bold text-6 pa-0">
              {{ t('catalog.categories') }}
            </div>
          </template>

          <template v-slot:text>
            <catalog-categories-list
                v-if="category"
                :category="category"
            ></catalog-categories-list>
          </template>
        </v-expansion-panel>

        <v-expansion-panel
            class="mt-0"
            rounded="0"
            elevation="0"
        >
          <template v-slot:title>
            <div class="text-uppercase font-weight-bold text-6 pa-0">
              {{ t('catalog.price') }}
            </div>
          </template>

          <template v-slot:text>

            <v-range-slider
                class="mt-8"
                v-model="priceRange"
                :min="minPrice"
                :max="maxPrice"
                :step="1"
                hide-details
                thumb-label="always"
            ></v-range-slider>
            <v-row align="center" class="mt-2">
              <v-card elevation="0" width="160">
                <v-row align="center">
                  <ui-number-input
                      :model-value="priceRange[0]"
                      @update:model-value="$event>=minPrice && $event <= priceRange[1]?priceRange[0] = $event:undefined"
                      positive
                  ></ui-number-input>
                  <v-spacer></v-spacer>
                  <span>-</span>
                  <v-spacer></v-spacer>
                  <ui-number-input
                      :model-value="priceRange[1]"
                      @update:model-value="$event<=maxPrice && $event >= priceRange[0]?priceRange[1] = $event:undefined"
                      positive
                  ></ui-number-input>
                </v-row>
              </v-card>
              <v-spacer></v-spacer>
              <ui-button-default @click="emit('search', priceRange[0], priceRange[1])">
                {{ t('catalog.search') }}
              </ui-button-default>
            </v-row>
          </template>
        </v-expansion-panel>

        <v-expansion-panel
            class="mt-0"
            elevation="0"
            rounded="0"
        >
          <template v-slot:title>
            <div class="text-uppercase font-weight-bold text-6 pa-0">
              {{ t('catalog.sizing') }}
            </div>
          </template>
          <template v-slot:text>
            <v-item-group v-model="sizing" multiple>
              <div class="d-flex flex-wrap">
                <v-item
                    v-slot="{ selectedClass, toggle }"
                    selected-class="bg-black text-white"
                    v-for="size in sizingFilters"
                    :key="size"
                    :value="size"
                >
                  <div
                      class="v-col-6 pa-1 catalog-filters__sizing-item"
                      :class="selectedClass"
                      @click="toggle"
                  >
                    <p class="text-uppercase border border-opacity-100 text-center pt-1 pb-1 text-subtitle-2 font-weight-bold">
                      {{ size }}
                    </p>
                  </div>
                </v-item>
              </div>
            </v-item-group>
          </template>
        </v-expansion-panel>

        <v-expansion-panel
            class="mt-0"
            elevation="0"
            rounded="0"
        >
          <template v-slot:title>
            <div class="text-uppercase font-weight-bold text-6 pa-0">
              {{ t('catalog.colors') }}
            </div>
          </template>
          <template v-slot:text>
            <v-item-group v-model="colors" multiple selected-class="catalog-filters__color_selected">
              <div class="d-flex flex-wrap">
                <v-item
                    v-slot="{ selectedClass, toggle }"
                    selected-class="bg-black text-white"
                    v-for="color in colorFilters"
                    :key="color"
                    :value="color"
                >
                  <v-avatar
                      class="ma-2"
                      :class="selectedClass"
                      size="38"
                      :color="color"
                      @click="toggle"
                  ></v-avatar>
                </v-item>
              </div>
            </v-item-group>
          </template>
        </v-expansion-panel>

        <v-expansion-panel
            class="mt-0"
            v-for="detail in detailsFilters"
            :key="detail.name"
            elevation="0"
            rounded="0"
        >

          <template v-slot:title>
            <div class="text-uppercase font-weight-bold text-6 pa-0">
              {{ detail.name }}
            </div>
          </template>

          <template v-slot:text>
            <v-checkbox
                v-for="value in detail.value"
                :key="value"
                :label="value"
                hide-details
                density="compact"
                :value="value"
                :model-value="details?.[detail.name] || []"
                @change.prevent="handleChange(detail.name, value, $event)"
            ></v-checkbox>
          </template>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>
  </v-card>
</template>

<script setup>
import {useI18n} from "vue-i18n";
import {onMounted, reactive, ref, defineEmits, defineProps} from "vue";
import CatalogCategoriesList from "@/components/Specialized/Catalog/CatalogCategoriesList.vue";
import {useFetch} from "@/composables/useFetch";
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import UiNumberInput from "@/components/UI/Inputs/UiNumberInput.vue";
import UiButtonDefault from "@/components/UI/Buttons/UiButtonDefault.vue";
import {useQuery} from "@/composables/useQuery";

const route = useRoute()
const {getData} = useFetch()
const {t} = useI18n()

const emit = defineEmits(['search'])

defineProps({
  colors: {
    type: Array,
    required: true
  },
  sizing: {
    type: Array,
    required: true
  },
  detains: {
    type: Object,
    required: true
  }
})

const open = reactive([0, 1, 2, 3])


const category = ref(null)
const getRootCategory = ctg => {
  getData('/catalog/getCategoriesToRoot', {
    params: {
      category: ctg
    }
  })
      .then(resp => {
        category.value = resp.data
      })
}


const minPrice = ref(0)
const maxPrice = ref(0)
const detailsFilters = ref([])
const colorFilters = ref([])
const sizingFilters = ref([])
const getFilters = ctg => {
  getData('/catalog/getFilters', {
    params: {
      category: ctg
    }
  })
      .then(resp => {
        colorFilters.value = resp.data.colors
        sizingFilters.value = resp.data.sizing
        detailsFilters.value = resp.data.details
        minPrice.value = resp.data.minPrice
        maxPrice.value = resp.data.maxPrice
        priceRange.value[0] = minPrice.value
        priceRange.value[1] = maxPrice.value
      })
}

const priceRange = ref([])
const sizing = useQuery('sizing', [])
const colors = useQuery('colors', [])
const details = useQuery('details', {})
const handleChange = (name, value, event) => {
  if (!details.value[name]) {
    details.value[name] = [value]
  } else {
    if (event.target.checked) {
      details.value[name].push(value)
    } else {
      details.value[name] = details.value[name].filter(detail => detail !== value)
    }
  }
}

onMounted(() => {
  getRootCategory(route.params.category)
  getFilters(route.params.category)
})

onBeforeRouteUpdate((to, from, next) => {
  if (to.params.category !== from.params.category) {
    getRootCategory(to.params.category)
    getFilters(to.params.category)
  }
  next()
})

</script>

<style scoped>
.expansion >>> .v-expansion-panel-title--active {
  height: 48px !important;
  min-height: 48px !important;
}

.expansion >>> .v-expansion-panel-text__wrapper {
  padding: 8px;
}

.catalog-filters__sizing-item {
  cursor: pointer;
  background-clip: content-box;
}

.catalog-filters__color_selected {
  box-shadow: inset 0 0 0 1px white, 0 0 0 1px #2a2929;
}


</style>