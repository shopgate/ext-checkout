const InternalError = require('./../errors/InternalError')
/**
 * @typedef {Object} BackupCheckoutInput
 * @property {string} orderId
 */
/**
 * Set orderId to checkout abd backup
 *
 * @param {SDKContext} context
 * @param {BackupCheckoutInput} input
 */
module.exports = async (context, input) => {
  let checkout

  // 1. Get a checkout
  try {
    checkout = await context.storage.user.get('checkout')
  } catch (err) {
    context.log.error(err, 'Failed to load a checkout from user storage')
    throw new InternalError()
  }

  checkout.orderId = input.orderId

  // 2. Set orderId and backup a checkout
  try {
    await context.storage.user.set('checkout_bak', checkout)
  } catch (err) {
    context.log.error(err, 'Failed to backup checkout to user storage')
    throw new InternalError()
  }

  // 3. Delete a checkout
  try {
    await context.storage.user.del('checkout')
  } catch (err) {
    context.log.error(err, 'Failed to delete a checkout from user storage')
    throw new InternalError()
  }
}
