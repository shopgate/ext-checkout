const {EINVAL, EINTERNAL, createCustomError} = require('../error')

/**
 * @typedef {Object} SetCartInput
 * @property {string} currency
 * @property {Array} cartItems
 * @property {Array} totals
 * @property {Object} flags
 */

/**
 * Set cart information
 *
 * @param {SDKContext} context
 * @param {SetCartInput} input
 */
module.exports = async (context, input) => {
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

  input.cartItems.map(item => ({
    id: item.product.id,
    name: item.product.name,
    type: item.type,
    unitPrice: item.product.price.unit,
    quantity: item.quantity
  }))
  .forEach(item => checkout.items.push(item))

  checkout.currency = input.currency
  checkout.total = getCartAmount(input.totals)

  try {
    await context.storage.user.set('checkout')
  } catch (err) {
    context.log.warn(err, 'User storage error')
    throw createCustomError(EINTERNAL, 'Internal error')
  }
  return {}
}

function getCartAmount (totals) {
  return totals.filter(e => e.type === 'grandTotal')[0].value
}
