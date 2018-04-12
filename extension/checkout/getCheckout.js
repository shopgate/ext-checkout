const {EINVAL, EINTERNAL, createCustomError} = require('../error')

/**
 * Get checkout info
 *
 * @param {SDKContext} context
 */
module.exports = async (context) => {
  /** @type {ExtCheckout} */
  let checkout
  try {
    checkout = await context.storage.user.get('checkout')
  } catch (err) {
    context.log.warn(err, 'User storage error')
    throw createCustomError(EINTERNAL, 'Internal error')
  }

  if (!checkout) {
    throw createCustomError(EINVAL, 'Checkout is not started yet.')
  }

  return {checkout}
}
