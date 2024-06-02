<script setup>
import AddIcon from '../icons/AddIcon.vue'
</script>

<template>
  <form @submit.prevent>
    <input 
        v-model="name" 
        placeholder="Имя" 
        type="text" 
    />
    <input
      v-model="prices"
      placeholder="Цены"
      type="text"
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
      prices: []
    }
  },
  methods: {
    createOrder() {
        if (!this.name || !this.prices) return

        this.$emit('createOrder', {
            name: this.name,
            prices: this.prices.split(' ').map(Number)
        })
        this.name = ''
        this.prices = ''
    }
  }
}
</script>