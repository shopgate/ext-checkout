/**
 * @typedef {Object} GetTaxTotalsInput
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

  const totals = input.totals

  let beforeTaxes = input.totals
    .map(tot => tot.amount)
    .reduce(
      (sum, amount) => sum + amount,
      0
    )

  const taxRate = 19
  const taxAmount = Math.round(beforeTaxes * taxRate / 100)

  totals.push({
    id: 'tax',
    label: 'Tax',
    amount: taxAmount
  })

  return {
    taxAmount,
    totals
  }
}
