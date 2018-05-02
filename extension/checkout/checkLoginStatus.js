const UnauthorizedError = require('./../common/Error/UnauthorizedError')

/**
 * Blocks unauthorized access
 *
 * @param {SDKContext} context
 * @throws {UnauthorizedError}
 * @returns {Promise<undefined>}
 */
module.exports = async (context) => {
  if (!context.meta.userId) {
    context.log.warn('User is not logged in.')
    throw new UnauthorizedError()
  }
}
