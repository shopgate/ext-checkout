const CheckoutError = require('./CheckoutError')

class InternalError extends CheckoutError {
  constructor (cause) {
    super()

    this.cause = cause
    this.code = 'EINTERNAL'
    this.message = `An internal error occurred ${cause.message}`
  }
}

module.exports = InternalError
