<script setup>
import OrderListItem from './OrderListItem.vue'
</script>

<template>
  <transition-group name="orders">
    <ul class="order-list" key="orders">
      <order-list-item
        v-for="order in orders"
        :key="order.id"
        :order="order"
        :serviceFeeOnPerson="serviceFeeOnPerson"
        @deleteOrder="$emit('deleteOrder', order.id)"
        @updateOrder="$emit('updateOrder', $event)"
      />
    </ul>
  </transition-group>
</template>

<script>
export default {
  props: {
    orders: {
      type: Array,
      required: true
    },
    serviceFeeOnPerson: {
      required: true
    }
  },

  emits: ['deleteOrder', 'updateOrder']
}
</script>

<style scoped>
.orders-item {
  display: inline-block;
  margin-right: 10px;
}

.orders-enter-active,
.orders-leave-active {
  transition: all 1s ease;
}

.orders-enter-from,
.orders-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.order-list {
  display: flex;
  flex-direction: column;
  padding: 5px;
  border-radius: 10px;
  gap: 10px;
  width: 100%;
  position: relative;
}
</style>
