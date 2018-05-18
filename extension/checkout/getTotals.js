/**
 * @typedef {Object} CalculateTotalsInput
 * @property {ExtCheckoutItem[]} items
 * @property {?ExtCheckoutShippingMethod} shippingMethod
 * @property {?ExtCheckoutPaymentMethod} paymentMethod
 *
 * @typedef {Object} CalculateTotalsResult
 * @property {string} currency
 * @property {number} taxAmount
 * @property {number} total
 */

/**
 * Calculate totals for checkout: items, fees, taxes, etc
 *
 * @param {SDKContext} context
 * @param {CalculateTotalsInput} input
 * @returns {Promise<CalculateTotalsResult>}
 */
module.exports = async (context, input) => {
  let taxAmount = 0
  let total = 0
  const totals = []

  total += input.items
    .map(item => item.unitPrice * item.quantity)
    .reduce(
      (sum, amount) => sum + amount,
      0
    )

  totals.push({
    id: 'subtotal',
    label: 'Subtotal',
    amount: total
  })

  const coupon = input.items
    .filter(item => item.type === 'coupon')
    .map(item => item.unitPrice * item.quantity)
    .reduce(
      (sum, amount) => sum + amount,
      0
    )

  if (coupon) {
    totals.push({
      id: 'coupon',
      label: 'Coupon',
      amount: coupon
    })
  }

  if (input.shippingMethod) {
    total += input.shippingMethod.amount
    taxAmount += input.shippingMethod.taxAmount

    totals.push({
      id: 'shipping',
      label: 'Shipping',
      amount: input.shippingMethod.amount
    })
  }

  if (input.paymentMethod) {
    total += input.paymentMethod.amount
    taxAmount += input.paymentMethod.taxAmount

    totals.push({
      id: 'payment',
      label: 'Payment',
      amount: input.paymentMethod.amount
    })
  }

  total += taxAmount

  totals.push({
    id: 'tax',
    label: 'Tax',
    amount: taxAmount
  }, {
    id: 'total',
    label: 'Total',
    amount: total
  })

  return {
    currency: context.config.currency,
    taxAmount,
    total,
    totals
  }
}
