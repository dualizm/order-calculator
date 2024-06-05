<script setup>
import AddIcon from '../icons/AddIcon.vue'
import PricesInput from '../ui/PricesInput.vue'
import { RUB } from '../utils/RUB.js'
</script>

<template>
  <form @submit.prevent>
    <input ref="name-input" v-model.trim="name" placeholder="Имя" type="text" />
    <prices-input v-model="prices" />
    <button title="Добавить" @click="createOrder">
      <AddIcon />
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      prices: ''
    }
  },
  methods: {
    createOrder() {
      if (!this.name || !this.prices) return

      const parsedPrices = this.prices.split(';').map((price) => parseFloat(price.trim()))
      if (parsedPrices.some((price) => isNaN(price))) return

      this.$emit('createOrder', {
        name: this.name,
        prices: parsedPrices.map((price) => RUB(price))
      })
      this.name = ''
      this.prices = ''

      this.$refs['name-input'].focus()
    }
  }
}
</script>
