<template>
  <div>
    <div>
      <h4 class="font-weight-bold text-uppercase text-h5">{{ $t('customer.wishlist.section-name') }}</h4>
    </div>

    <div class="mt-4">
      <ui-loading-status
          :loading="wishlistFetching.fetching"
          :problem="wishlistFetching.rejected"
          @retry="getWishlist"
      ></ui-loading-status>

      <ui-no-content v-if="wishlistFetching.isAllLoaded && !wishlist.length">
        <template v-slot:title>
          {{ $t('customer.wishlist.no-wishes') }}
        </template>
      </ui-no-content>

      <div>
        <div class="d-flex flex-wrap">

          <account-wishlist-item
              v-for="wish in wishlist"
              :key="wish.skuId"
              :image="wish.image"
              :name="wish.name"
              :price="wish.pricing.price"
              :sale="wish.pricing.sale"
              :product-id="wish.productId"
              :sku-id="wish.skuId"
              @delete="delFromWishlist"
          ></account-wishlist-item>

        </div>
      </div>

      <v-row justify="center">
        <ui-button-default
            class="mt-6"
            v-if="!wishlistFetching.isAllLoaded && !wishlistFetching.fetching && !wishlistFetching.rejected"
            @click="getWishlist"
        >
          {{ $t('common.buttons.load-more') }}
        </ui-button-default>
      </v-row>

    </div>

  </div>
</template>

<script setup>
import UiLoadingStatus from "@/components/UI/UiLoadingStatus.vue";
import UiButtonDefault from "@/components/UI/Buttons/UiButtonDefault.vue";
import {useI18n} from "vue-i18n";

import {useFetch} from "@/composables/useFetch";
import {onMounted, reactive} from "vue";
import {useInfinityFetching} from "@/composables/useInfinityFetching";
import {useStore} from "vuex";
import {useMeta} from "vue-meta";


import {ADD_LOADING, DEL_LOADING} from "@/store/mutation-types";
import UiNoContent from "@/components/UI/UiNoContent.vue";
import AccountWishlistItem from "@/components/Specialized/Account/Wishlist/AccountWishlistItem.vue";

const {t} = useI18n()
const {getDataAuthed, postDataAuthed} = useFetch()
const store = useStore()
useMeta({
  title: t('customer.wishlist.section-name')
})


const wishlist = reactive([])

const wishlistFetching = reactive(useInfinityFetching({limit: 10, name: 'wishlist'}))
const getWishlist = () => {
  wishlistFetching.fetch()
  getDataAuthed('/customer/account/getWishlist', {
    params: {
      limit: wishlistFetching.limit,
      offset: wishlistFetching.offset
    }
  })
      .then(resp => {
        wishlist.push(...resp.data.wishlist)
        wishlistFetching.resolve(resp.data)
      })
      .catch(() => {
        wishlistFetching.reject()
      })
}

const delFromWishlist = skuId => {
  store.commit(ADD_LOADING)
  postDataAuthed('/customer/order/delFromWishlist', {
    skuId: skuId
  })
      .then(() => {
        wishlist.splice(wishlist.indexOf(wish => wish.skuId !== skuId), 1)
        wishlistFetching.correct(-1)
        store.dispatch('addNotification', {type: 'success', message: t('customer.wishlist.wish-deleted')})
      })
      .catch(() => {
      })
      .finally(() => {
        store.commit(DEL_LOADING)
      })
}


onMounted(() => {
  getWishlist()
})

</script>

<style scoped>
</style>