const uuidv4 = require('uuid/v4')
/**
 * Generate checkout ID
 *
 * @param {SDKContext} context
 * @param {object} input
 * @param {function} cb
 */
module.exports = function (context, input, cb) {
  context.storage.user.get('checkout', (err, checkout) => {
    if (err) cb(err)

    if (checkout) {
      return cb(null, checkout.checkoutId)
    }

    const checkoutId = uuidv4()
    context.storage.device.set('checkout', {checkoutId}, (err) => {
      if (err) return cb(err)
      cb(null, {checkoutId})
    })
  })
}