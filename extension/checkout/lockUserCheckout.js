const uuidv4 = require('uuid/v4')
const InternalError = require('./../common/Error/InternalError')
const CheckoutInProgressError = require('./../common/Error/CheckoutInProgressError')

/**
 * @typedef {Object} LockUserCheckoutInput
 * @property {number} lockDuration
 */

/**
 * @typedef {Object} LockUserCheckoutOutput
 * @property {ExtCheckoutLock} checkoutLock
 */

/**
 * Locks down a checkout to a max of once every 20 seconds on a single device or user
 *
 * @param {SDKContext} context
 * @param {LockUserCheckoutInput} input
 * @throws {CheckoutInProgressError|InternalError}
 * @returns {Promise<LockUserCheckoutOutput>}
 */
module.exports = async (context, input) => {
  const storageName = 'user'
  const dataStorageKey = 'checkoutLock'
  const lockDuration = input.lockDuration * 1000 // convert seconds to milliseconds

  /** @type {ExtCheckoutLock} */
  let previousLock
  try {
    previousLock = await context.storage[storageName].get(dataStorageKey)
  } catch (err) {
    context.log.error(err, `Failed to load checkout lock timestamp from '${storageName}' storage`)
    throw new InternalError()
  }

  // test if checkout was locked before and if the lock is still valid
  if (previousLock) {
    const timeNow = (new Date()).getTime()
    if (timeNow < previousLock.time) {
      throw new CheckoutInProgressError()
    }
  }

  const checkoutLock = {
    id: uuidv4(),
    time: (new Date()).getTime() + lockDuration // set in future till when lock is valid
  }

  try {
    await context.storage[storageName].set(dataStorageKey, checkoutLock)
  } catch (err) {
    context.log.error(err, `Failed to save checkout lock timestamp to '${storageName}' storage`)
    throw new InternalError()
  }

  return {checkoutLock}
}
