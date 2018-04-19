const uuidv4 = require('uuid/v4')

/**
 * Generate UUID v4
 */
module.exports = async () => {
  return {
    checkoutId: uuidv4()
  }
}
