<template>
  <div>
    <p class="font-weight-bold text-uppercase">
      {{ $t('product.description') }}
    </p>
    <p class="text-black">
      {{ description }}
    </p>

    <div class="mt-4">
      <p class="font-weight-bold">
        {{ name }} - <span class="text-uppercase">{{ $t('product.features') }}</span>:
      </p>
      <ul class="ml-5">
        <li
            v-for="feature in features"
            :key="feature"
            v-text="feature"
        ></li>
      </ul>
    </div>

    <div class="mt-4">
      <p class="font-weight-bold text-uppercase">
        {{ $t('product.detailed') }} {{ name }}
      </p>
      <ul class="ml-5">
        <li
            v-for="detail in details"
            :key="detail.name"
        >
          {{ detail.name }}: {{ detail.value.join(', ') }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductInfoAbout",
  props: {
    details: {
      type: Array,
      default: () => []
    },
    features: {
      type: Array,
      default: () => []
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    }
  }
}
</script>

<style scoped>

</style>