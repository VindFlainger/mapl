<template>
  <div>
    <h4 class="font-weight-bold text-h6 text-uppercase"> {{ $t('product.your-review') }}</h4>
    <div class="pa-3">
      <v-form ref="form">
        <div>
          <v-rating
              class="mt-n1 ml-n2"
              v-model="rating" length="5"
          ></v-rating>
        </div>
        <ui-input-text
            variant="outlined"
            density="compact"
            v-model="summary"
            :label="$t('common.inputs.summary')"
            :rules="[v => !!v || $tc('common.validation-errors.required', {param: $t('common.inputs.summary')})]"
            maxlength="70"
        ></ui-input-text>
        <v-textarea
            variant="outlined"
            color="black"
            v-model="text"
            no-resize
            :label="$t('common.inputs.review')"
            :rules="[v => !!v || $tc('common.validation-errors.required', {param: $t('common.inputs.review')})]"
            maxlength="1000"
        ></v-textarea>
        <v-row>
          <v-spacer></v-spacer>
          <ui-button-default
              width="100"
              @click="saveReview"
              :loading="saveReviewLoading.value"
          >
            {{ $t('common.buttons.save') }}
          </ui-button-default>
        </v-row>
      </v-form>
    </div>

  </div>
</template>

<script>
import UiInputText from "@/components/UI/Inputs/UiInputText.vue";
import UiButtonDefault from "@/components/UI/Buttons/UiButtonDefault.vue";

export default {
  name: "ProductInfoReviewsMy",
  components: {UiButtonDefault, UiInputText},
  props: {
    review: {
      type: Object,
      required: false,
    }
  },
  data() {
    return {
      summary: '',
      text: '',
      rating: 55
    }
  },
  watch: {
    review: {
      handler(review) {
        this.summary = review?.summary
        this.text = review?.review
        this.rating = review?.rating
      },
      immediate: true
    }
  },
  methods: {
    saveReview() {
      if (this.$refs.form.validate()) {
        this.$emit('save-review', {
          summary: this.summary,
          review: this.text,
          rating: this.rating
        })
      }
    }
  },
  inject: ['saveReviewLoading']
}
</script>

<style scoped>

</style>