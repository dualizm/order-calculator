<script setup>
import CloseIcon from '../icons/CloseIcon.vue'
import EditIcon from '../icons/EditIcon.vue'
import BackArrowIcon from '../icons/BackArrowIcon.vue'
import ConfirmIcon from '../icons/ConfirmIcon.vue'
import PricesInput from '../ui/PricesInput.vue'
</script>

<template>
  <li class="order-list-item" :key="order.id">
    <div class="control-panel">
      <template v-if="!isEdit">
        <close-icon class="close-icon" @click="$emit('deleteOrder', order.id)" />
        <edit-icon class="edit-icon" @click="isEdit = !isEdit" />
      </template>
      <template v-else>
        <back-arrow-icon class="back-arrow-icon" @click="isEdit = !isEdit" />
        <confirm-icon class="confirm-icon" @click="updateOrder" />
      </template>
    </div>
    <template v-if="!isEdit">
      <p>{{ order.name }}: {{ order.prices.join(', ') }}</p>
    </template>
    <template v-else>
      <div class="edit-inputs">
        <input v-model="name" placeholder="Имя" type="text" />
        <prices-input v-model="prices" />
      </div>
    </template>
    <span class="tag">{{ serviceFeeOnPerson }}</span>
  </li>
</template>

<script>
export default {
  data() {
    return {
      isEdit: false,
      name: this.order.name,
      prices: this.order.prices.toString()
    }
  },

  props: {
    order: {
      type: Object,
      required: true
    },
    serviceFeeOnPerson: {
      type: Number,
      required: true
    }
  },

  methods: {
    updateOrder() {
      this.isEdit = !this.isEdit
      this.$emit('updateOrder', {
        id: this.order.id,
        name: this.name,
        prices: this.prices.split(',').map(price => parseFloat(price.trim()))
      })
    }
  },

  emits: ['deleteOrder', 'updateOrder'],
}
</script>

<style>
.order-list-item {
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-radius: 10px;
  padding: 20px;
  border: 2px solid var(--color-border);
  position: relative;
}

.tag {
  background-color: var(--color-accent);
  color: var(--color-background-mute);
  padding: 5px 10px;
  border-radius: 10px 0 0 10px;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.control-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  position: absolute;
  top: 6%;
  left: -7%;
  z-index: 1;
}

.close-icon {
  cursor: pointer;
}

.edit-icon {
  cursor: pointer;
}

.close-icon:hover {
  fill: var(--color-red);
  transition: 1s all;
}

.edit-icon:hover path {
  fill: var(--color-accent);
  transition: 1s all;
}

.confirm-icon {
  cursor: pointer;
}

.confirm-icon:hover path {
  fill: var(--color-accent);
  transition: 1s all;
}

.back-arrow-icon {
  cursor: pointer;
}

.back-arrow-icon:hover path {
  fill: var(--color-red);
  transition: 1s all;
}

.edit-inputs {
  display: flex;
  align-items: left;
  gap: 15px;
}
</style>
