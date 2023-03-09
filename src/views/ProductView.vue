<template>
  <div class="ma-4">
    <product-skus
        v-if="activeSku"
        :description="description"
        :name="name"
        v-model:active-sku="activeSku"
        v-model:active-size="activeSize"
        :details="details"
        :features="features"
        :label="label"
        :skus="skus"
    ></product-skus>
    <product-info
        class="mt-6"
        :description="description"
        :features="features"
        :details="details"
        :name="name"
    ></product-info>
  </div>
</template>

<script>
import ProductSkus from "@/components/Specialized/Product/ProductSkus.vue";
import requests from "@/mixins/requests";
import ProductInfo from "@/components/Specialized/Product/ProductInfo.vue";
import {mapGetters} from "vuex";

export default {
  name: "ProductView",
  components: {ProductInfo, ProductSkus},
  mixins: [requests],
  data() {
    return {
      name: '',
      label: '',
      description: '',
      details: [],
      features: [],
      skus: [],
      activeSku: null,
      activeSize: '',
    }
  },
  computed: {
    ...mapGetters({
      userId: 'getUserId'
    })
  },
  mounted() {
    this.getProductInfo()
  },
  methods: {
    getProductInfo() {
      this.getData(`/catalog/getProductInfo?productId=${this.$route.params.id}`)
          .then((resp) => {
            this.name = resp.data.name
            this.label = resp.data.label
            this.description = resp.data.description
            this.details = resp.data.details
            this.features = resp.data.features
            this.skus = resp.data.skus
            this.activeSku = resp.data.skus[0]
            this.reviews = resp.data.reviews
          })
          .catch(() => {
          })
    },
  }
}
</script>

<style scoped>

</style>