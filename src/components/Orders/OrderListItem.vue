<script setup>
import CloseIcon from '../icons/CloseIcon.vue'
import EditIcon from '../icons/EditIcon.vue'
import BackArrowIcon from '../icons/BackArrowIcon.vue'
import ConfirmIcon from '../icons/ConfirmIcon.vue'
import PricesInput from '../ui/PricesInput.vue'
import { RUB } from '../utils/RUB.js'
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
    <div class="info">
      <template v-if="!isEdit">
        <p>
          <span class="order-name">{{ order.name }}</span
          >: {{ order.prices.map((price) => RUB(price).format()).join('; ') }}
        </p>
      </template>
      <template v-else>
        <div class="edit-inputs">
          <input v-model="name" placeholder="Имя" type="text" />
          <prices-input v-model="prices" />
        </div>
      </template>
    </div>
    <span class="tag">{{ serviceFeeOnPerson.format() }}</span>
  </li>
</template>

<script>
export default {
  data() {
    return {
      isEdit: false,
      name: this.order.name,
      prices: this.order.prices.join(';')
    }
  },

  props: {
    order: {
      type: Object,
      required: true
    },
    serviceFeeOnPerson: {
      type: Object,
      required: true
    }
  },

  methods: {
    updateOrder() {
      this.isEdit = !this.isEdit
      this.$emit('updateOrder', {
        id: this.order.id,
        name: this.name,
        prices: this.prices
          .split(';')
          .map((price) => parseFloat(price.trim()))
          .map((price) => RUB(price))
      })
    }
  },

  emits: ['deleteOrder', 'updateOrder']
}
</script>

<style scoped>
.order-list-item {
  list-style: none;
  display: flex;
  position: relative;
}

.order-name {
  font-weight: 600;
  font-size: 15px;
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

.info {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 2px solid var(--color-border);
  border-radius: 10px;
  padding: 10px;
  height: 70px;
  flex: 1;
}

.control-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 50px;
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

.edit-icon:hover {
  fill: var(--color-accent);
  transition: 1s all;
}

.confirm-icon {
  cursor: pointer;
}

.confirm-icon:hover {
  fill: var(--color-accent);
  transition: 1s all;
}

.back-arrow-icon {
  cursor: pointer;
}

.back-arrow-icon:hover {
  fill: var(--color-red);
  transition: 1s all;
}

.edit-inputs {
  display: flex;
  width: 100%;
  gap: 10px;
}
</style>
