const CheckoutError = require('./CheckoutError')

class CheckoutInProgressError extends CheckoutError {
  constructor () {
    super()

    this.code = 'EINPROGRESS'
    this.message = 'Checkout already in progress.'
  }
}

module.exports = CheckoutInProgressError
