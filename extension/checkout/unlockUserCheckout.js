const InternalError = require('./../common/Error/InternalError')

/**
 * Deletes the checkout to lift the checkout lock on the device or user
 *
 * @param {SDKContext} context
 * @throws {InternalError}
 * @returns {Promise<undefined>}
 */
module.exports = async (context) => {
  const storageName = 'user'
  try {
    await context.storage[storageName].del('checkoutLock')
  } catch (err) {
    context.log.error(err, `Failed to delete the checkout from '${storageName}' storage`)
    throw new InternalError()
  }
}
