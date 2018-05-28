/**
 * @typedef {Object} CalculateTotalsResult
 * @property {string} currency
 * @property {Object[]} totals
 */

/**
 * @param {SDKContext} context
 * @returns {Promise<CalculateTotalsResult>}
 */
module.exports = async (context) => {
  return {
    currency: context.config.currency,
    totals: []
  }
}
