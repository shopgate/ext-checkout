class CheckoutError extends Error {
  constructor () {
    super()

    this.code = 'ECHECKOUT'
    this.message = 'Checkout error.'
  }
}

module.exports = CheckoutError
