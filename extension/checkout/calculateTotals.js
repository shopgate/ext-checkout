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

  total += input.items
    .map(item => item.unitPrice * item.quantity)
    .reduce(
      (sum, amount) => sum + amount,
      0
    )

  if (input.shippingMethod) {
    total += input.shippingMethod.amount
    taxAmount += input.shippingMethod.taxAmount || 0
  }

  if (input.paymentMethod) {
    total += input.paymentMethod.amount
    taxAmount += input.paymentMethod.taxAmount || 0
  }

  return {
    currency: context.config.currency,
    taxAmount,
    total
  }
}
