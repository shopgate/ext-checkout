/**
 * @typedef {Object} CalculateTotalInput
 * @property {Object[]} totals
 */

/**
 * @param {SDKContext} context
 * @param {CalculateTotalInput} input
 * @returns {Promise<{total: number}>}
 */
module.exports = async (context, input) => {
  const totals = input.totals

  let total = input.totals
    .map(tot => tot.amount)
    .reduce(
      (sum, amount) => sum + amount,
      0
    )

  total = Math.round(total * 100) / 100

  totals.push({
    id: 'total',
    label: 'Total',
    amount: total
  })

  return {
    total,
    totals
  }
}
