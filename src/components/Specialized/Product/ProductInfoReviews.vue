<template>
  <div>
    <product-info-reviews-my
        v-if="showReviewForm"
        :review="myReview"
        @save-review="$emit('save-review', $event)"
    ></product-info-reviews-my>
    <product-info-reviews-other
        :reviews="othersReviews"
    ></product-info-reviews-other>
  </div>
</template>

<script>
import ProductInfoReviewsMy from "@/components/Specialized/Product/ProductInfoReviewsMy.vue";
import ProductInfoReviewsOther from "@/components/Specialized/Product/ProductInfoReviewsOther.vue";

export default {
  name: "ProductInfoReviews",
  components: {ProductInfoReviewsOther, ProductInfoReviewsMy},
  props: {
    myReview: {
      type: Object,
      required: false
    },
    othersReviews: {
      type: Array,
      default: () => []
    },
    showReviewForm: {
      type: Boolean,
      required: false
    }
  }
}
</script>

<style scoped>

</style>