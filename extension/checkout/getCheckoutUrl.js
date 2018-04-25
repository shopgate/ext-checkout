/**
 * @typedef {Object} GetCheckoutUrlResult
 * @property {string} url
 *
 * @return {Promise<GetCheckoutUrlResult>}
 */
module.exports = async () => {
  return {url: '/checkoutNative'}
}
