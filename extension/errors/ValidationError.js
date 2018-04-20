const CheckoutError = require('./CheckoutError')

class ValidationError extends CheckoutError {
  constructor (error) {
    super()

    this.code = 'EINV'
    this.message = 'Validation error.'
    this.error = error
  }
}

module.exports = ValidationError
