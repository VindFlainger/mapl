<template>
  <div>
    <div>
      <h4 class="font-weight-bold text-uppercase text-h5">{{ $t('customer.reviews.section-name') }}</h4>
    </div>

    <div class="mt-4">
      <v-list class="mt-1">
        <v-list-item
            v-for="review in reviews"
            :key="review.id"
            variant="outlined"
            class="pa-2 mb-3"
        >
          <template v-slot:title>
            <router-link
                class="font-weight-bold text-h6 text-uppercase text-black"
                :to="{name: 'product', params: {id: review.product.id}}"
            >
              {{ review.product.name }}
            </router-link>
          </template>

          <template v-slot:prepend>
            <v-card width="150" elevation="0" class="d-flex flex-column align-center mr-2" rounded="0">
              <ui-img
                  :to="{name: 'product', params: {id: review.product.id}}"
                  width="90%"
                  rounded="0"
                  cover
                  :images="review.product.previewImage"
                  :size="64"
              ></ui-img>
            </v-card>
          </template>

          <v-card class="pa-3" elevation="0" variant="outlined" rounded="0">
            <h5 class="font-weight-bold text-h6">
              {{ review.summary }}
            </h5>
            <p>
              {{ review.review }}
            </p>
            <v-row align="center">
              <v-rating
                  color="black mt-1"
                  disabled
                  :model-value="review.rating"
                  density="compact"
              ></v-rating>
              <v-spacer></v-spacer>
              <p>
                {{ $day(review.updatedAt).format('DD.MM.YYYY  HH:mm') }}
              </p>
            </v-row>
          </v-card>
        </v-list-item>
      </v-list>

      <ui-loading-status
          :problem="reviewsFetching.rejected"
          :loading="reviewsFetching.fetching"
          @retry="getReviews"
      ></ui-loading-status>

      <v-row justify="center">
        <ui-button-default
            v-if="!reviewsFetching.isAllLoaded && !reviewsFetching.fetching && !reviewsFetching.rejected"
            @click="getReviews"
        >
          {{ $t('common.buttons.load-more') }}
        </ui-button-default>
      </v-row>

    </div>
  </div>
</template>

<script setup>
import {onMounted, reactive} from "vue";

import UiImg from "@/components/UI/UiImg.vue";
import UiButtonDefault from "@/components/UI/Buttons/UiButtonDefault.vue";
import UiLoadingStatus from "@/components/UI/UiLoadingStatus.vue";

import {useInfinityFetching} from "@/composables/useInfinityFetching";
import {useMeta} from "vue-meta";
import {useI18n} from "vue-i18n";
import {useFetch} from "@/composables/useFetch";

const {t} = useI18n()
const {getDataAuthed} = useFetch()

useMeta({
  title: t('customer.reviews.section-name')
})

const reviews = reactive([])
const reviewsFetching = reactive(useInfinityFetching({limit: 10, name: 'reviews'}))

const getReviews = () => {
  reviewsFetching.fetch()
  getDataAuthed('/customer/account/getReviews',
      {
        params: {
          offset: reviewsFetching.offset,
          limit: reviewsFetching.limit
        }
      }
  )
      .then(resp => {
        reviews.push(...resp.data.reviews)
        reviewsFetching.resolve(resp.data)
      })
      .catch(() => {
        reviewsFetching.reject()
      })
}

onMounted(() => {
  getReviews()
})
</script>

<style scoped>

</style>