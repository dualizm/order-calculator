<script setup>
import CloseIcon from '../icons/CloseIcon.vue'
import EditIcon from '../icons/EditIcon.vue'
</script>

<template>
  <li class="order-list-item">
    <div class="control-panel">
      <close-icon class="close-icon" @click="$emit('deleteOrder', order.id)" />
      <edit-icon class="edit-icon" v-on:click="isEdit=!isEdit" />
    </div>
    <template v-if="!isEdit">
      <p>{{ order.name }}: {{ order.prices.join(' + ') }}</p>
    </template>
    <template v-else>Editing...</template>
    <span class="tag">{{ serviceFeeOnPerson }}</span>
  </li>
</template>

<script>
export default {
  data() {
    return {
      isEdit: false,
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

</style>
