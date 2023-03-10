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
          :problem="rejected"
          :loading="fetching"
          @retry="getReviews"
      ></ui-loading-status>

      <v-row justify="center">
        <ui-button-default
            v-if="!isAllLoaded && !fetching && !rejected"
            @click="getReviews"
        >
          {{ $t('common.buttons.load-more') }}
        </ui-button-default>
      </v-row>

    </div>
  </div>
</template>

<script>
import requests from "@/mixins/requests";
import UiImg from "@/components/UI/UiImg.vue";
import UiLoadingStatus from "@/components/UI/UiLoadingStatus.vue";
import {useInfinityFetching} from "@/composables/useInfinityFetching";
import UiButtonDefault from "@/components/UI/Buttons/UiButtonDefault.vue";
import {useMeta} from "vue-meta";
import i18n from "@/i18n";

export default {
  name: "AccountReviews",
  components: {UiButtonDefault, UiLoadingStatus, UiImg},
  mixins: [requests],
  data() {
    return {
      reviews: []
    }
  },
  mounted() {
    this.getReviews()
  },
  methods: {
    getReviews() {
      this.fetch()
      this.getDataAuthed('/customer/account/getReviews',
          null,
          {
            params: {
              offset: this.offset,
              limit: this.limit
            }
          }
      )
          .then(resp => {
            this.reviews.push(...resp.data.reviews)
            this.resolve(resp.data)
          })
          .catch(() => {
            this.reject()
          })
    }
  },
  setup() {
    useMeta({
      title: i18n.global.t('customer.reviews.section-name')
    })

    const {
      rejected,
      resolved,
      fetching,
      fetch,
      resolve,
      reject,
      isAllLoaded,
      offset,
      limit
    } = useInfinityFetching({limit: 10, name: 'reviews'})

    return {
      rejected,
      resolved,
      fetching,
      fetch,
      resolve,
      reject,
      isAllLoaded,
      offset,
      limit,
    }
  },
}
</script>

<style scoped>

</style>