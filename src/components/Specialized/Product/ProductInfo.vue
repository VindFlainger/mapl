<template>
  <v-expansion-panels
      variant="accordion"
      multiple
      v-model="opened"
  >
    <v-expansion-panel elevation="0">
      <template v-slot:title>
        <p class="text-overline font-weight-bold">
          {{ $t('product.about') }}
        </p>
      </template>

      <template v-slot:text>
        <product-info-about
            :name="name"
            :details="details"
            :features="features"
            :description="description"
        ></product-info-about>
      </template>
    </v-expansion-panel>


    <v-expansion-panel elevation="0">
      <template v-slot:title>
        <p class="text-overline font-weight-bold">
          {{ $t('product.delivery') }}
        </p>
      </template>
    </v-expansion-panel>


    <v-expansion-panel
        elevation="0"
        @group:selected.once="getReviews"
    >
      <template v-slot:title>
        <p class="text-overline font-weight-bold">
          {{ $t('product.reviews') }}
        </p>
      </template>

      <template v-slot:text>
        <ui-loading-status
            :problem="state.matches('reviews.rejected')"
            :loading="state.matches('reviews.fetching')"
            @retry="getReviews"
        ></ui-loading-status>

        <product-info-reviews
            v-if="state.matches('reviews.resolved')"
            :others-reviews="othersReviews"
            :my-review="myReview"
            :show-review-form="isLogin"
            @save-review="saveReview"
        ></product-info-reviews>
      </template>

    </v-expansion-panel>


  </v-expansion-panels>
</template>

<script>
import ProductInfoReviews from "@/components/Specialized/Product/ProductInfoReviews.vue";
import {mapGetters} from "vuex";
import requests from "@/mixins/requests";
import useFetching from "@/composables/useFetching";
import UiLoadingStatus from "@/components/UI/UiLoadingStatus.vue";
import {computed} from "vue";
import ProductInfoAbout from "@/components/Specialized/Product/ProductInfoAbout.vue";

export default {
  name: "ProductInfo",
  components: {ProductInfoAbout, UiLoadingStatus, ProductInfoReviews},
  mixins: [requests],
  data() {
    return {
      opened: [0],
      othersReviews: [],
      myReview: null,
      saveReviewLoading: false
    }
  },
  props: {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    details: {
      type: Array,
      default: () => []
    },
    features: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapGetters(
        {
          isLogin: 'isLogin',
          userId: 'getUserId'
        }
    ),
  },
  methods: {
    getReviews() {
      this.send('REVIEWS_FETCH')
      this.getData(`/catalog/getReviews`,
          null,
          false,
          {
            params: {
              productId: this.$route.params.id,
              ...this.userId ? {ownerId: this.userId} : {}
            }
          }
      )
          .then(resp => {
            this.othersReviews = resp.data.others
            this.myReview = resp.data.my
            this.send('REVIEWS_RESOLVE')
          })
          .catch(() => {
            this.send('REVIEWS_REJECT')
          })
    },
    saveReview(review) {
      this.saveReviewLoading = true
      this.postDataAuthed('/customer/reviews/addReview', {
        productId: this.$route.params.id,
        ...review
      })
          .then(() => {
            this.myReview.review = review.review
            this.myReview.summary = review.summary
            this.myReview.rating = review.rating
          })
          .catch(() => {
          })
          .finally(() => {
            this.saveReviewLoading = false
          })
    }
  },
  setup() {
    const {send, state} = useFetching(['reviews'])
    return {
      send,
      state
    }
  },
  provide() {
    return {
      saveReviewLoading: computed(() => this.saveReviewLoading)
    }
  }
}
</script>

<style scoped>

</style>