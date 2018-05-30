/**
 * @typedef {Object} GetCurrencyResult
 * @property {string} currency
 */

/**
 * @param {SDKContext} context
 * @returns {Promise<GetCurrencyResult>}
 */
module.exports = async (context) => {
  return {
    currency: context.config.currency
  }
}
