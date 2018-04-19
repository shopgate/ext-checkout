/**
 * @typedef {Object} CalculateTotalsInput
 * @property {ExtCheckoutItem[]} items
 * @property {?ExtCheckoutShippingMethod} shippingMethod
 * @property {?ExtCheckoutPaymentMethod} paymentMethod
 */

/**
 * Calculate totals for checkout: items, fees, taxes, etc
 *
 * @param {SDKContext} context
 * @param {CalculateTotalsInput} input
 */
module.exports = async (context, input) => {
  let taxAmount = 0
  let total = 0

  total += input.items
    .map(item => item.unitPrice * item.quantity)
    .reduce(
      (sum, amount) => sum + amount,
      0
    )

  if (input.shippingMethod) {
    total += input.shippingMethod.amount
    taxAmount += input.shippingMethod.taxAmount
  }

  if (input.paymentMethod) {
    total += input.paymentMethod.amount
    taxAmount += input.paymentMethod.taxAmount
  }

  return {
    taxAmount,
    total
  }
}
