<template>
  <v-col
      class="wish__card v-col-4"
  >
    <router-link :to="{name: 'product', params: {id: productId}, query: {sku: skuId}}">
      <ui-sized-image
          width="100%"
          height="300"
          cover
          :image-size="512"
          :images="image"
      ></ui-sized-image>
    </router-link>
    <div class="mt-2 wish__content">
      <router-link
          class="text-subtitle-2 text-black"
          :to="{name: 'product', params: {id: productId}, query: {sku: skuId}}"
      >
        {{ name }}
      </router-link>

      <v-row>
        <ui-currency
            :class="{'text-decoration-line-through text-grey-darken-1': sale}"
            :value="price"
        ></ui-currency>
        <ui-currency
            v-if="sale"
            class="ml-3 text-red"
            :value="sale"
        ></ui-currency>
      </v-row>
    </div>


    <v-row class="wish__actions pa-4 align-end">
      <ui-button-default width="45%" @click="emit('delete', skuId)">
        {{ $t('common.buttons.remove') }}
      </ui-button-default>

      <v-spacer></v-spacer>
      <ui-button-default
          alternative
          width="45%"
          :to="{name: 'product', params: {id: productId}, query: {sku: skuId}}"
      >
        {{ $t('common.buttons.view') }}
      </ui-button-default>
    </v-row>

  </v-col>
</template>

<script setup>
import {defineProps, defineEmits} from 'vue'
import UiSizedImage from "@/components/UI/UiSizedImage.vue";
import UiCurrency from "@/components/UI/Localization/UiCurrency.vue";
import UiButtonDefault from "@/components/UI/Buttons/UiButtonDefault.vue";

defineProps({
  name: {
    type: String,
    required: true
  },
  productId: {
    type: String,
    required: true
  },
  skuId: {
    type: String,
    required: true
  },
  image: {
    type: Array,
    required: false
  },
  price: {
    type: Number,
    required: true
  },
  sale: {
    type: Number,
    required: false
  }
})

const emit = defineEmits(['delete'])


</script>

<style scoped>
.wish__card {
  position: relative;
}

.wish__card:hover {
  box-shadow: 0 0 3px grey;
}

.wish__card:hover::after {
  content: "";
  height: 15px;
  position: absolute;
  background: white;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 12;
}

.wish__card:hover .wish__actions {
  display: flex;
}

.wish__actions {
  display: none;
  position: absolute;
  height: 60px;
  background: white;
  z-index: 10;
  left: 0;
  bottom: -50px;
  width: 100%;
  box-shadow: 0 0 3px grey;
}

</style>