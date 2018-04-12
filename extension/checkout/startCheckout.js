const uuidv4 = require('uuid/v4')
const {EINTERNAL, createCustomError} = require('../error')

/**
 * Prepare default checkout container.
 * Generate checkout ID
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

  if (checkout) {
    return checkout
  }

  checkout = {
    user: null, // fill in later
    items: [], // fill in later
    shippingAddress: null, // fill in later
    billingAddress: null, // fill in later
    shippingMethod: null, // fill in later
    paymentMethod: null, // fill in later
    transactions: [], // fill in later
    customFields: [], // fill in later
    checkoutId: uuidv4(),
    orderId: null,
    currency: null, // fill in later
    taxAmount: null, // fill in later
    total: null // fill in later
  }

  try {
    await context.storage.user.set('checkout', checkout)
  } catch (err) {
    context.log.warn(err, 'User storage error')
    throw createCustomError(EINTERNAL, 'Internal error')
  }
  return checkout
}
