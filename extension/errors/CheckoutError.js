class CheckoutError extends Error {
  constructor (cause = {message: ''}) {
    super()

    this.cause = cause
    this.code = 'ECHECKOUT'
    this.message = `Checkout error: ${cause.message}`
  }
}

module.exports = CheckoutError
