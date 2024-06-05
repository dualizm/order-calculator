<template>
  <input
    v-model.trim="localPrices"
    placeholder="Цены 20;30.5;40"
    type="text"
    :class="{ 'invalid-prices': hasInvalidPrices }"
  />
</template>

<script>
export default {
  name: 'PriceInput',
  props: {
    modelValue: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      localPrices: this.modelValue
    }
  },
  computed: {
    hasInvalidPrices() {
      return this.localPrices.split(';').some((price) => isNaN(price))
    }
  },
  watch: {
    localPrices(newVal) {
      this.$emit('update:modelValue', newVal)
    },
    modelValue(newVal) {
      this.localPrices = newVal
    }
  }
}
</script>

<style scoped>
.invalid-prices {
  border-color: red;
}
</style>
