const CheckoutError = require('./CheckoutError')

class UnauthorizedError extends CheckoutError {
  constructor (cause = {message: ''}) {
    super(cause)

    this.code = 'EACCESS'
    this.message = 'Permission denied'
  }
}

module.exports = UnauthorizedError
