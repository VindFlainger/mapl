<template>
  <div>
    <h4 class="font-weight-bold text-uppercase text-h6">
      {{ $t('product.other-reviews') }}
    </h4>
    <v-list class="mt-1">
      <v-list-item
          v-for="review in reviews"
          :key="review.id"
          variant="outlined"
          class="pa-2 mb-3"
      >
        <template v-slot:title>
          <h4 class="font-weight-bold text-h6">{{ review.summary }}</h4>
        </template>
        <template v-slot:prepend>
          <v-card width="150" elevation="0" class="d-flex flex-column align-center mr-2">
            <v-avatar
                :image="require('@/assets/images/defaults/defaultavatar.png')"
                :size="120"
            ></v-avatar>
            <p class="text-center font-weight-bold" style="max-width: 150px">
              {{ review.owner.name }}
            </p>
            <v-rating
                color="black mt-1"
                disabled
                :model-value="review.rating"
                density="compact"
            ></v-rating>
          </v-card>
        </template>
        <div class="d-flex">
          <p>
            {{ review.review }}
          </p>
        </div>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  name: "ProductInfoReviewsOther",
  props: {
    reviews: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>

</style>