const uuidv4 = require('uuid/v4')
const InternalError = require('./../common/Error/InternalError')
const CheckoutInProgressError = require('./../common/Error/CheckoutInProgressError')

/**
 * Locks down a checkout to a max of once every 20 seconds on a single device or user
 *
 * @param {SDKContext} context
 * @param {Object} input
 * @param {number} input.lockDuration
 * @throws {CheckoutInProgressError|InternalError}
 * @returns {Promise<ExtCheckoutLock>}
 */
module.exports = async (context, input) => {
  const storageName = 'user'
  const dataStorageKey = 'checkoutLock'
  const lockDuration = input.lockDuration * 1000 // convert seconds to milliseconds

  const lockId = uuidv4()
  const timestamp = Math.floor(Date.now() / 1000) * 1000

  /** @type {ExtCheckoutLock} */
  let previousLock
  try {
    previousLock = await context.storage[storageName].get(dataStorageKey)
  } catch (err) {
    context.log.error(err, `Failed to load checkout lock timestamp from '${storageName}' storage`)
    throw new InternalError()
  }

  // test if checkout was locked before and if the lock is still valid
  if (previousLock && timestamp - previousLock.timestamp < lockDuration) {
    throw new CheckoutInProgressError()
  }

  const checkoutLock = {
    id: lockId,
    timestamp
  }

  try {
    await context.storage[storageName].set(dataStorageKey, checkoutLock)
  } catch (err) {
    context.log.error(err, `Failed to save checkout lock timestamp to '${storageName}' storage`)
    throw new InternalError()
  }

  return {checkoutLock}
}
