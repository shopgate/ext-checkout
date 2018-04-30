const InternalError = require('./../common/Error/InternalError')
const CheckoutInProgressError = require('./../common/Error/CheckoutInProgressError')

/**
 * Compares the current lock id with the one, that was assigned at the beginning and block further
 * execution, if the lock id was overwritten.
 * This step should not be executed directly after the lock placement to ensure proper behavior.
 *
 * @param {SDKContext} context
 * @param {Object} input
 * @param {ExtCheckoutLock} input.checkoutLock
 * @throws {CheckoutInProgressError|InternalError}
 * @returns {Promise<null>}
 */
module.exports = async (context, input) => {
  const storageName = 'user'
  const dataStorageKey = 'checkoutLock'
  const currentLock = input.checkoutLock

  /** @type {ExtCheckoutLock} */
  let initialLock
  try {
    initialLock = await context.storage[storageName].get(dataStorageKey)
  } catch (err) {
    context.log.error(err, `Failed to load checkout lock timestamp from '${storageName}' storage`)
    throw new InternalError()
  }

  // make sure the checkout was locked before
  if (!initialLock) {
    context.log.error('Step "checkConcurrency" was called without properly locking the checkout before. This could either be a problem with the pipeline or a storage timing issue.')
    throw new InternalError()
  }

  // prevent concurrent checkouts, by comparing the current lock id with what was saved before
  if (initialLock.id !== currentLock.id) {
    throw new CheckoutInProgressError()
  }
}
