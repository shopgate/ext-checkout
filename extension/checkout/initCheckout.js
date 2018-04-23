const uuidv4 = require('uuid/v4')
const InternalError = require('./../errors/InternalError')
const CheckoutInProgressError = require('./../errors/CheckoutInProgressError')
const CheckoutError = require('./../errors/CheckoutError')

/**
 * Check if checkout already submitted with same data
 * Generate checkoutId UUID v4
 * @param {SDKContext} context
 */
module.exports = async (context) => {
  if (!context.meta.userId) {
    context.log.warn('User is not logged in to process checkout')
    throw new CheckoutError()
  }

  let checkout
  try {
    checkout = await context.storage.user.get('checkout')
  } catch (err) {
    context.log.error(err, `Failed to load checkout from user storage`)
    throw new InternalError()
  }

  // Already in progress by other call
  if (checkout) {
    throw new CheckoutInProgressError()
  }

  checkout = {
    checkoutId: uuidv4()
  }

  try {
    await context.storage.user.set('checkout', checkout)
  } catch (err) {
    context.log.error(err, `Failed to load checkout from user storage`)
    throw new InternalError()
  }

  return checkout
}
