<script setup>
import CopyIcon from '../icons/CopyIcon.vue'
import OrderForm from './OrderForm.vue'
import OrderList from './OrderList.vue'
import { RUB } from '../utils/RUB.js'
</script>

<template>
  <main>
    <section>
      <header>Информация</header>
      <div class="info">
        <label>Скидка на заказ:</label>
        <input v-model.number="discount" type="text" placeholder="Скидка на заказ" />
        <label>Стоимость доставки:</label>
        <input v-model.number="deliveryPrice" type="text" placeholder="Стоимость доставки" />
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
      deliveryPrice: RUB(0),
      serviceFee: RUB(0),
      totalSum: RUB(0),
      targetMoney: ''
    }
  },

  methods: {
    serviceFeeOnPerson() {
      return RUB(this.serviceFee)
        .add(this.deliveryPrice)
        .divide(this.orders.length || 1)
    },

    calculateDiscount(value, percent) {
      return value.multiply(percent / 100)
    },

    calculateTotal() {
      if (this.orders.length === 0) {
        this.totalSum = RUB(0)
        return
      }

      const sum = this.orders
        .map((order) => order.prices)
        .flat()
        .reduce((a, b) => a.add(b), RUB(0))

      const discountAmount = this.calculateDiscount(sum, this.discount)
      this.totalSum = sum.subtract(discountAmount).add(this.serviceFee).add(this.deliveryPrice)
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
        prices
          .map((v) =>
            RUB(v)
              .subtract(this.calculateDiscount(RUB(v), this.discount))
              .format()
          )
          .join(' + ')

      const formatTotal = (prices) =>
        prices
          .reduce((a, b) => a.add(b), RUB(0))
          .subtract(
            this.calculateDiscount(
              prices.reduce((a, b) => a.add(b), RUB(0)),
              this.discount
            )
          )
          .add(this.serviceFeeOnPerson())
          .format()

      const formatServiceFee = () =>
        this.serviceFee.value !== 0 ? ` + ${this.serviceFeeOnPerson().format()}` : ``

      navigator?.clipboard.writeText(
        [
          `Стоимость доставки: ${RUB(this.deliveryPrice).format()}`,
          `Сервисный сбор: ${RUB(this.serviceFee).format()}`,
          `Скидка на заказ: ${this.discount}%`,
          'Заказы\n',
          `${this.orders
            .map(
              (order) =>
                `${order.name}: ${formatPrices(order.prices) + formatServiceFee()} = ${formatTotal(order.prices)}`
            )
            .join('\n')}`,
          `Отправить деньги на: ${this.targetMoney}`,
          `Итого: ${this.totalSum.format()}`,
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
    },

    deliveryPrice() {
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
