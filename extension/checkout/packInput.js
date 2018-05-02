/**
 * @typedef {Object} PackResult
 * @property {Object} data
 */

/**
 * @param {SDKContext} context
 * @param {Object} input
 * @returns {Promise<PackResult>}
 */
module.exports = async (context, input) => {
  return {
    data: input
  }
}
