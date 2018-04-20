const InternalError = require('./../errors/InternalError')

/**
 * @typedef {Object} SaveCheckoutInput
 * @property {ExtCheckout} checkout
 */

/**
 * Replace checkout to user storage
 *
 * @param {SDKContext} context
 * @param {SaveCheckoutInput} input
 */
module.exports = async (context, input) => {
  try {
    await context.storage.user.set('checkout', input.checkout)
  } catch (err) {
    context.log.error(err, 'Failed saving checkout to user storage')
    throw new InternalError()
  }
}
