/**
 * @typedef {Object} GetConfigResult
 * @property {string} currency
 */

/**
 * @param {SDKContext} context
 * @returns {Promise<GetConfigResult>}
 */
module.exports = async (context) => {
  return {
    config: context.config
  }
}
