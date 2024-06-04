import currency from "currency.js"

export const RUB = (value) =>
    currency(value, {
        symbol: '₽',
        decimal: ',',
        separator: ' ',
        precision: 2,
    })