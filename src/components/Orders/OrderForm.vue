<script setup>
import AddIcon from '../icons/AddIcon.vue'
import PricesInput from '../ui/PricesInput.vue'
</script>

<template>
  <form @submit.prevent>
    <input
      v-model.trim="name" 
      placeholder="Имя" 
      type="text" 
    />
    <prices-input
      v-model="prices"
    />
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
      prices: '',
    }
  },
  methods: {
    createOrder() {
        if (!this.name || !this.prices) return

        const prices = this.prices.split(',').some(price => isNaN(Number(price)))
        if(prices) return

        this.$emit('createOrder', {
            name: this.name,
            prices: this.prices.split(',').map(Number)
        })
        this.name = ''
        this.prices = ''
    }
  }
}
</script>