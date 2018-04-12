const {EINVAL, EINTERNAL, createCustomError} = require('../error')

/**
 * @typedef {Object} SetUserInput
 * @property {string} id
 * @property {string} mail
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} gender
 * @property {string} birthday
 * @property {string} phone
 */

/**
 * Set user data to checkout
 *
 * @param {SDKContext} context
 * @param {SetUserInput} input
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

  checkout.user = {
    id: input.id,
    firstName: input.firstName,
    lastName: input.lastName,
    mail: input.mail
  }

  try {
    await context.storage.user.set('checkout')
  } catch (err) {
    context.log.warn(err, 'User storage error')
    throw createCustomError(EINTERNAL, 'Internal error')
  }
  return {}
}
