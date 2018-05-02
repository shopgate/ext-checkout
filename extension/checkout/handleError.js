const CheckoutError = require('./../common/Error/CheckoutError')
const unlockUserCheckout = require('./ext-checkout/extension/checkout/unlockUserCheckout')

/**
 * Remove checkout from a storage to unlock a try
 *
 * @param {?Error} error
 * @param {SDKContext} context
 * @throws {CheckoutError}
 * @returns {Promise<undefined>}
 */
module.exports = async (error, context) => {
  // If no error occurred, do nothing
  if (!error) {
    return
  }

  try {
    context.log.error(error, 'An error was caught while processing the checkout. Unlocking checkout.')
    await unlockUserCheckout(context)
  } catch (err) {
    context.log.error(err, 'Failed to unlock the checkout')
  }

  // Own error. Rethrow
  if (error instanceof CheckoutError) {
    throw error
  }

  // Outer error. log and throw own error
  throw new CheckoutError(error)
}
