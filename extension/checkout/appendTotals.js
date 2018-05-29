/**
 * @typedef {Object} AppendTotalsInput
 * @property {Object} checkout
 * @property {string} currency
 * @property {number} total
 * @property {Object[]} totals
 */

/**
 * @param {SDKContext} context
 * @param {AppendTotalsInput} input
 * @returns {Promise<{checkout: Object}>}
 */
module.exports = async (context, input) => {
  return {
    checkout: {
      ...input.checkout,
      currency: input.currency,
      total: input.total,
      totals: input.totals
    }
  }
}
