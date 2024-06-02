<script setup>
import CloseIcon from '../icons/CloseIcon.vue'
import EditIcon from '../icons/EditIcon.vue'
</script>

<template>
  <ul class="order-list" v-for="order in orders" :key="order.id">
    <div class="control-panel">
      <close-icon class="close-icon" @click="$emit('deleteOrder', order.id)"/>
      <edit-icon class="edit-icon"/>
    </div>
    <li>
      <p>{{ order.name }}: {{ order.prices.join(' + ') }}</p>
    </li>
    <span class="tag">{{ serviceFeeOnPerson }}</span>
  </ul>
</template>

<script>
export default {
  props: {
    orders: {
      type: Array,
      required: true
    },
    serviceFeeOnPerson: {
      type: Number,
      required: true
    }
  }
}
</script>

<style>
li {
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-radius: 10px;
  padding: 20px;
  border: 2px solid var(--color-border);
  position: relative; /* Necessary for positioning elements relative to li */
}

ul {
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: relative; /* Ensure the ul container is relatively positioned */
}

.order-list {
  display: flex;
  flex-direction: column;
  padding: 5px;
  border-radius: 10px;
  gap: 10px;
  width: 100%;
}

.tag {
  background-color: var(--color-accent); /* Tag background color */
  color: var(--color-background-mute); /* Tag text color */
  padding: 5px 10px; /* Padding for the tag */
  border-radius: 10px 0 0 10px; /* Rounded corners */
  position: absolute; /* Position the tag absolutely */
  right: 0; /* Align it to the right */
  top: 50%; /* Center vertically */
  transform: translateY(-50%); /* Centering correction */
}

.control-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  position: absolute;
  top: 0;
  left: -7%;
  margin: 10px;
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
