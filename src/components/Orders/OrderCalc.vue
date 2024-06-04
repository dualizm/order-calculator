<script setup>
import CopyIcon from '../icons/CopyIcon.vue'
import OrderForm from './OrderForm.vue'
import OrderList from './OrderList.vue'
</script>

<template>
  <main>
    <section>
      <header>Информация</header>
      <div class="info">
        <label>Скидка на заказ:</label>
        <input v-model.number="discount" type="text" placeholder="Скидка на заказ" />
        <label>Сервисный сбор:</label>
        <input v-model.number="serviceFee" type="text" placeholder="Сервисный сбор" />
      </div>
    </section>

    <section>
      <header>
        <label>Заказы</label>
        <order-form @createOrder="createOrder" />
      </header>
      <order-list
        :orders="orders"
        :serviceFeeOnPerson="serviceFeeOnPerson()"
        @deleteOrder="deleteOrder"
        @updateOrder="updateOrder"
      />
    </section>

    <section>
      <header>
        <label>Итог</label>
        <button title="Скопировать" @click="copyToBuffer"><CopyIcon /></button>
      </header>
      <div class="info">
        <label>Переводить на</label>
        <input v-model="targetMoney" type="text" placeholder="Банк, телефон..." />
        <p>Сумма заказа: {{ totalSum }}</p>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      orders: [],
      discount: 0,
      serviceFee: 0,
      totalSum: 0,
      targetMoney: ''
    }
  },

  methods: {
    serviceFeeOnPerson() {
      return this.serviceFee / (this.orders.length || 1)
    },

    calculateDiscount(value, percent) {
      return value * (percent / 100)
    },

    calculateTotal() {
      if (this.orders.length === 0) {
        this.totalSum = 0
        return
      }

      const sum = this.orders
        .map((order) => order.prices)
        .flat()
        .reduce((a, b) => a + b, 0)

      const discountAmount = this.calculateDiscount(sum, this.discount)
      this.totalSum = sum - discountAmount + Number(this.serviceFee)
    },

    createOrder(order) {
      this.orders.push({
        ...order,
        id: Date.now()
      })

      this.calculateTotal()
    },

    copyToBuffer() {
      const formatPrices = (prices) =>
        prices.map((v) => v - this.calculateDiscount(v, this.discount)).join(' + ')
      const formatTotal = (prices) =>
        prices.reduce((a, b) => a + b, 0) -
        this.calculateDiscount(
          prices.reduce((a, b) => a + b, 0),
          this.discount
        ) +
        this.serviceFeeOnPerson()
      const formatServiceFee = () =>
        this.serviceFee !== 0 ? ` + ${this.serviceFeeOnPerson()}` : ``

      navigator?.clipboard.writeText(
        [
          `Сервисный сбор: ${this.serviceFee}`,
          `Скидка на заказ: ${this.discount}%`,
          `Заказы:`,
          `${this.orders
            .map(
              (order) =>
                `${order.name}: ${formatPrices(order.prices) + formatServiceFee()} = ${formatTotal(order.prices)}`
            )
            .join('\n')}`,
          '',
          `Отправить деньги на: ${this.targetMoney}`,
          `Итого: ${this.totalSum}`
        ].join('\n')
      )
    },

    deleteOrder(id) {
      this.orders = this.orders.filter((order) => order.id !== id)

      this.calculateTotal()
    },

    updateOrder(updatedOrder) {
      const index = this.orders.findIndex((order) => order.id === updatedOrder.id)
      if (index !== -1) {
        this.orders.splice(index, 1, updatedOrder)
        this.calculateTotal()
      }
    }
  },

  watch: {
    serviceFee() {
      this.calculateTotal()
    },

    discount() {
      this.calculateTotal()
    }
  }
}
</script>

<style scoped>
main {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: space-around;
}

header {
  display: flex;
  font-size: 30px;
  text-align: center;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
  gap: 15px;
}

form {
  display: flex;
  align-items: center;
  gap: 15px;
}

section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
}

.info {
  display: flex;
  flex-direction: column;
  border: 2px solid var(--color-border);
  padding: 10px;
  border-radius: 10px;
  gap: 10px;
}
</style>
