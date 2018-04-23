const CheckoutError = require('./../errors/CheckoutError')

/**
 * Remove checkout from a storage to unlock a try
 *
 * @param {?Error} error
 * @param {SDKContext} context
 */
module.exports = async (error, context) => {
  // If no error occurred, do nothing
  if (!error) {
    return
  }

  try {
    await context.storage.user.del('checkout')
  } catch (err) {
    context.log.error(err, 'Failed to delete a checkout from user storage')
  }

  // Own error. Rethrow
  if (error instanceof CheckoutError) {
    throw error
  }

  // Outer error. log and throw own error
  context.log.error(error, 'Error is catched when processing checkout. Unlock checkout')
  throw new CheckoutError(error)
}
