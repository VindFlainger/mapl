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
        <product-info-reviews-my
            v-if="isLogin && resolvedFirst"
            :review="myReview"
            @save-review="$emit('save-review', $event)"
        ></product-info-reviews-my>

        <product-info-reviews-other
            :reviews="othersReviews"
        ></product-info-reviews-other>

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

      </template>

    </v-expansion-panel>


  </v-expansion-panels>
</template>

<script>
import {mapGetters} from "vuex";
import requests from "@/mixins/requests";
import UiLoadingStatus from "@/components/UI/UiLoadingStatus.vue";
import {computed} from "vue";
import ProductInfoAbout from "@/components/Specialized/Product/ProductInfoAbout.vue";
import {useInfinityFetching} from "@/composables/useInfinityFetching";
import UiButtonDefault from "@/components/UI/Buttons/UiButtonDefault.vue";
import ProductInfoReviewsOther from "@/components/Specialized/Product/ProductInfoReviewsOther.vue";
import ProductInfoReviewsMy from "@/components/Specialized/Product/ProductInfoReviewsMy.vue";

export default {
  name: "ProductInfo",
  components: {
    ProductInfoReviewsMy,
    ProductInfoReviewsOther,
    UiButtonDefault,
    ProductInfoAbout,
    UiLoadingStatus
  },
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
      this.fetch()
      this.getData(`/catalog/getReviews`,
          null,
          false,
          {
            params: {
              productId: this.$route.params.id,
              limit: this.limit,
              offset: this.offset,
              ...this.userId ? {ownerId: this.userId} : {}
            }
          }
      )
          .then(resp => {
            this.othersReviews.push(...resp.data.others)
            this.myReview = resp.data.my
            this.resolve(resp.data)
          })
          .catch(() => {
            this.reject()
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
    const {
      resolved,
      rejected,
      fetching,
      reject,
      fetch,
      resolve,
      isAllLoaded,
      limit,
      offset,
      resolvedFirst
    } = useInfinityFetching({limit: 10})

    return {
      resolved,
      rejected,
      fetching,
      reject,
      fetch,
      resolve,
      isAllLoaded,
      limit,
      offset,
      resolvedFirst
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