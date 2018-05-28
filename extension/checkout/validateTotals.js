const Joi = require('joi')
const CheckoutError = require('./../common/Error/CheckoutError')
const {totalsSchema} = require('./jsonSchema')

/**
 * @typedef {Object} ValidateCheckoutInput
 * @property {Object} checkout
 * @property {Object[]} totals
 */

/**
 * @param {SDKContext} context
 * @param {ValidateCheckoutInput} input
 * @return {Promise<undefined>}
 */
module.exports = async (context, input) => {
  let validationResult = Joi.validate(input.totals, totalsSchema)
  if (validationResult.error) {
    context.log.warn({
      totals: input.totals,
      error: validationResult.error.details[0].message
    }, 'Checkout totals are malformed')

    throw new CheckoutError('Checkout totals are malformed')
  }
}
