<template>
  <v-list-item class="pa-0">
    <v-row align="center" class="border-b-md">
      <v-row class="v-col-5 flex-nowrap" align="center">
        <ui-sized-image
            :images="images"
            :image-size="512"
            max-width="100"
            width="100"
            cover
        ></ui-sized-image>


        <div class="ml-4">
          <p class="text-body2 font-weight-bold">{{ name }}</p>

          <div class="mt-3">
            <p class="text-capitalize text-grey-darken-2 font-weight-light">
              {{ t('cart.price') }}:
            </p>
            <v-row>
              <ui-currency
                  class="font-weight-bold text-red mr-3"
                  v-if="sale"
                  :value="sale"
              ></ui-currency>
              <ui-currency
                  class="font-weight-light text-grey-darken-2"
                  :class="{'text-decoration-line-through': sale}"
                  :value="price"
              ></ui-currency>
            </v-row>
          </div>
        </div>
      </v-row>

      <div class="v-col-2">
        <ui-select-default
            :items="sizing"
            :model-value="size"
            hide-details
            @update:model-value="emit('change:size', $event)"
        ></ui-select-default>
      </div>

      <div class="v-col-2">
        <ui-number-input
            :model-value="quantity"
            @update:model-value="emit('change:quantity', $event)"
            positive
        ></ui-number-input>
      </div>

      <div class="v-col-2">
        <ui-currency
            class="text-center font-weight-bold"
            :class="{'text-caption': sale, 'text-decoration-line-through': sale}"
            :value="regularPrice"></ui-currency>
        <div v-if="sale">
          <ui-currency
              class="text-red font-weight-bold text-center"
              :value="finalPrice"
          ></ui-currency>
          <p class="text-uppercase font-weight-light text-red text-center text-h6">
            {{ t('cart.sale')}}
          </p>
        </div>
      </div>

    </v-row>


  </v-list-item>
</template>

<script setup>
import {defineProps, defineEmits, computed} from 'vue'
import {useI18n} from "vue-i18n";
import UiCurrency from "@/components/UI/Localization/UiCurrency.vue";
import UiSelectDefault from "@/components/UI/Inputs/UiSelectDefault.vue";
import UiSizedImage from "@/components/UI/UiSizedImage.vue";
import UiNumberInput from "@/components/UI/Inputs/UiNumberInput.vue";

const {t} = useI18n()
const emit = defineEmits(['change:size', 'change:quantity'])

const props = defineProps({
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
  sizing: {
    type: Array,
    required: true
  },
  images: {
    type: Array,
    required: false
  },
  size: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
})

const finalPrice = computed(() => (props.sale || props.price) * props.quantity)
const regularPrice = computed(() => props.price * props.quantity)


</script>

<style scoped>

</style>