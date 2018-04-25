module.exports = {
  EINTERNAL: 'EINTERNAL',
  EINVAL: 'EINVAL',

  createCustomError: (code, message) => {
    const error = new Error()
    error.code = code
    error.message = message
    return error
  }
}
