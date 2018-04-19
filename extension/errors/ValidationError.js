class ValidationError extends Error {
  constructor (error) {
    super()

    this.code = 'EINV'
    this.message = 'Validation error.'
    this.error = error
  }
}

module.exports = ValidationError
