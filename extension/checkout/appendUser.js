/**
 * @typedef {Object} AppendUserInput
 * @property {Object} checkout
 * @property {string} id
 * @property {string} mail
 * @property {string} firstName
 * @property {string} lastName
 */

/**
 * @param {SDKContext} context
 * @param {AppendUserInput} input
 * @returns {Promise<{checkout: Object}>}
 */
module.exports = async (context, input) => {
  return {
    checkout: {
      ...input.checkout,
      user: {
        id: input.id,
        mail: input.mail,
        firstName: input.firstName,
        lastName: input.lastName
      }
    }
  }
}
