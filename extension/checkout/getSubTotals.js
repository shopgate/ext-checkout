/**
 * @typedef {Object} CalculateTotalsInput
 * @property {ExtCheckoutItem[]} items
 *
 * @typedef {Object} CalculateTotalsResult
 * @property {string} currency
 * @property {Object[]} totals
 */

/**
 * Calculate totals for checkout: items, fees, taxes, etc
 *
 * @param {SDKContext} context
 * @param {CalculateTotalsInput} input
 * @returns {Promise<CalculateTotalsResult>}
 */
module.exports = async (context, input) => {
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

  return {
    currency: context.config.currency,
    taxAmount: 0,
    total: total,
    totals
  }
}
