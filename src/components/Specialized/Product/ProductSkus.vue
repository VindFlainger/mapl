<template>
  <v-row>
    <v-card elevation="0" width="440">
      <v-carousel show-arrows="hover" cycle height="550">
        <v-carousel-item
            v-for="image in largeImages"
            :key="image"
            :src="image"
            cover
        ></v-carousel-item>
      </v-carousel>
    </v-card>
    <v-col class="ml-10">
      <v-card max-width="600" elevation="0" rounded="0">
        <h3 class="text-start text-h5 font-weight-bold text-uppercase">
          {{ name }}
        </h3>

        <div class="mt-3">
          <v-row>
            <ui-currency
                class="font-weight-bold text-h6 d-inline"
                :class="{'text-red': activeSku.pricing.sale}"
                :value="activeSku.pricing.sale || activeSku.pricing.price"
            ></ui-currency>
            <ui-currency
                v-if="activeSku.pricing.sale"
                class="text-body-1 d-inline ml-4 text-decoration-line-through text-grey-darken-1 font-weight-regular"
                :value="activeSku.pricing.price"
            ></ui-currency>
          </v-row>
          <v-card
              class="d-flex align-center"
              color="red"
              max-width="380"
              elevation="0"
              :rounded="0"
          >
            <v-card
                class="position-absolute d-flex align-center"
                height="100%"
                min-width="60"
                elevation="0"
                color="red-darken-4"
                rounded="0"
            >
              <v-avatar
                  size="40"
                  class="ma-3 mr-0"
                  variant="text"
                  height="100%"
                  rounded="0"
                  color="red-darken-4"
                  style="filter: invert(1)"
                  :image="require('@/assets/images/marketing/percent-promotion.png')"
              ></v-avatar>
            </v-card>
            <div class="text-overline text-body-2 ml-16 pa-2" style="line-height: 130%">
              {{ $t('product.promotion-tip') }}
            </div>
          </v-card>
        </div>

        <div class="mt-5">
          <p class="text-start text-uppercase">
            <span class="text-grey-darken-2"> {{ $t('product.color') }}: </span>{{ activeSku.color }}
          </p>
          <ui-input-color
              :colors="colors"
              :model-value="activeSku.color"
              @update:model-value="changeColor"
          ></ui-input-color>
        </div>

        <div class="mt-5">
          <p class="text-start text-uppercase ">
            <span class="text-grey-darken-2"> {{ $t('product.size') }}:  </span> {{ activeSize }}
          </p>
          <ui-input-size
              :model-value="activeSize"
              @update:model-value="$emit('update:active-size', $event)"
              :sizes="activeSku.sizing"
          ></ui-input-size>
        </div>

        <ui-button-default
            v-if="quantity"
            class="text-h6 text-h6 text-uppercase mt-4"
            alternative
            width="100%"
            height="50"
        >
          <div class="font-weight-bold font">
            {{ $t('product.add-to-cart') }}
          </div>
        </ui-button-default>
        <ui-button-default
            v-else
            class="text-h6 text-h6 text-uppercase mt-4"
            alternative
            width="100%"
            height="50"
        >
          <div class="font-weight-bold font">
            {{ $t('product.notify') }}
          </div>
        </ui-button-default>
      </v-card>

    </v-col>
  </v-row>
</template>

<script>
import UiInputColor from "@/components/UI/Inputs/UiInputColor.vue";
import UiCurrency from "@/components/UI/Localization/UiCurrency.vue";
import UiInputSize from "@/components/UI/Inputs/UiInputSize.vue";
import UiButtonDefault from "@/components/UI/Buttons/UiButtonDefault.vue";

export default {
  name: "ProductSkus",
  components: {UiButtonDefault, UiInputSize, UiCurrency, UiInputColor},
  props: {
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: false
    },
    skus: {
      type: Array,
      required: true
    },
    activeSku: {
      type: Object,
      required: true
    },
    activeSize: {
      type: String,
      required: true
    }
  },
  computed: {
    largeImages() {
      return this.activeSku.images
          .map(image => image
              .find(crop => crop.size === 64).url)

    },
    colors() {
      return this.skus.map(sku => sku.color)
    },
    quantity() {
      return this.activeSku.sizing.find(sz => sz.size === this.activeSize)?.totalQuantity
    }
  },
  methods: {
    changeColor(color) {
      this.$emit('update:activeSku', this.skus.find(sku => sku.color === color))
    }
  },
  watch: {
    activeSku: {
      handler(val) {
        const size = val?.sizing[0]?.size
        this.$emit('update:active-size', size)
      },
      immediate: true
    }
  },
}
</script>

<style scoped>

</style>