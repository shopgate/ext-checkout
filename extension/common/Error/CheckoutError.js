class CheckoutError extends Error {
  constructor (cause = {message: ''}) {
    super()

    // noinspection JSUnusedGlobalSymbols
    this.cause = cause // can be used by extending classes
    this.code = 'ECHECKOUT'
    this.message = `Checkout error: ${cause.message}`
  }
}

module.exports = CheckoutError
