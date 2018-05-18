/**
 * @typedef {Object} CalculateTotalsInput
 * @property {Object[]} totals
 */

/**
 * @param {SDKContext} context
 * @param {CalculateTotalsInput} input
 * @returns {Promise<CalculateTotalsResult>}
 */
module.exports = async (context, input) => {
  const totals = input.totals

  const total = input.totals
    .map(tot => tot.amount)
    .reduce(
      (sum, amount) => sum + amount,
      0
    )

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
